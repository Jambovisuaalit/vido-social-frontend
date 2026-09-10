-- Fail closed across the shared VIDO public schema and add server-only lead throttling.

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'profiles',
    'media_assets',
    'announcements',
    'opening_hour_exceptions',
    'second_hand_items',
    'second_hand_item_images',
    'audit_logs',
    'vido_leads'
  ]
  loop
    if to_regclass(format('public.%I', table_name)) is not null then
      execute format('alter table public.%I enable row level security', table_name);
      execute format('revoke all privileges on table public.%I from anon, authenticated', table_name);
    end if;
  end loop;
end
$$;

do $$
begin
  if to_regclass('public.profiles') is not null then
    drop policy if exists profiles_update_own on public.profiles;
    create policy profiles_update_own
      on public.profiles
      for update
      to authenticated
      using ((select auth.uid()) is not null and (select auth.uid()) = id)
      with check ((select auth.uid()) is not null and (select auth.uid()) = id);
  end if;
end
$$;

do $$
declare
  function_name text;
begin
  foreach function_name in array array[
    'audit_and_metadata_trigger',
    'is_staff',
    'prevent_role_escalation',
    'set_updated_at'
  ]
  loop
    if to_regprocedure(format('public.%I()', function_name)) is not null then
      execute format('alter function public.%I() set search_path = pg_catalog, public', function_name);
      execute format('revoke execute on function public.%I() from public, anon, authenticated', function_name);
    end if;
  end loop;
end
$$;

alter default privileges for role postgres in schema public
  revoke execute on functions from public;

create table if not exists public.vido_lead_rate_limits (
  client_hash text primary key,
  window_started_at timestamptz not null default statement_timestamp(),
  request_count bigint not null default 1,
  constraint vido_lead_rate_limits_hash_format
    check (client_hash ~ '^[a-f0-9]{64}$'),
  constraint vido_lead_rate_limits_positive_count
    check (request_count > 0)
);

alter table public.vido_lead_rate_limits enable row level security;
revoke all privileges on table public.vido_lead_rate_limits from anon, authenticated;

create or replace function public.reserve_vido_lead_slot(
  p_client_hash text,
  p_window_seconds integer,
  p_limit integer
)
returns boolean
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  v_request_count bigint;
begin
  if p_client_hash !~ '^[a-f0-9]{64}$'
     or p_window_seconds not between 60 and 86400
     or p_limit not between 1 and 100 then
    return false;
  end if;

  insert into public.vido_lead_rate_limits as limits (
    client_hash,
    window_started_at,
    request_count
  )
  values (
    p_client_hash,
    statement_timestamp(),
    1
  )
  on conflict (client_hash) do update
    set window_started_at = case
          when limits.window_started_at <= statement_timestamp() - make_interval(secs => p_window_seconds)
            then statement_timestamp()
          else limits.window_started_at
        end,
        request_count = case
          when limits.window_started_at <= statement_timestamp() - make_interval(secs => p_window_seconds)
            then 1
          else least(limits.request_count + 1, p_limit::bigint + 1)
        end
  returning request_count into v_request_count;

  return v_request_count <= p_limit;
end;
$$;

revoke execute on function public.reserve_vido_lead_slot(text, integer, integer)
  from public, anon, authenticated;
grant execute on function public.reserve_vido_lead_slot(text, integer, integer)
  to service_role;

comment on table public.vido_lead_rate_limits is
  'Server-only, hashed request counters for the public VIDO lead form.';
comment on function public.reserve_vido_lead_slot(text, integer, integer) is
  'Atomically reserves a server-only lead submission slot for a hashed client fingerprint.';

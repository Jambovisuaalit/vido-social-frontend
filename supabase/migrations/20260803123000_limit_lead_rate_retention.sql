create index if not exists vido_lead_rate_limits_window_started_at_idx
  on public.vido_lead_rate_limits (window_started_at);

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

  delete from public.vido_lead_rate_limits
  where window_started_at < statement_timestamp() - interval '24 hours';

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

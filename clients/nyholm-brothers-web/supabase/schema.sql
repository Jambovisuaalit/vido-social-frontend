-- Nyholm Brothers lead intake schema.
-- Applied to Supabase project dbfvptbhxqgsanwnwgxy with migration name:
-- create_nyholm_leads

create schema if not exists private;
revoke all on schema private from public;
revoke all on schema private from anon, authenticated;

create table if not exists public.nyholm_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'new'
    check (status in ('new', 'contacted', 'qualified', 'won', 'lost', 'spam')),
  name text not null
    check (char_length(name) between 2 and 120),
  email text not null
    check (char_length(email) between 5 and 160),
  phone text not null
    check (char_length(phone) between 5 and 40),
  service_interest text not null
    check (char_length(service_interest) between 2 and 120),
  city text not null
    check (char_length(city) between 2 and 100),
  message text not null default ''
    check (char_length(message) <= 2000),
  consent boolean not null
    check (consent is true),
  consent_version text not null
    check (char_length(consent_version) between 1 and 40),
  source text not null default 'website'
    check (char_length(source) between 1 and 120),
  landing_page text
    check (landing_page is null or char_length(landing_page) <= 500),
  utm_source text
    check (utm_source is null or char_length(utm_source) <= 160),
  utm_medium text
    check (utm_medium is null or char_length(utm_medium) <= 160),
  utm_campaign text
    check (utm_campaign is null or char_length(utm_campaign) <= 160),
  utm_content text
    check (utm_content is null or char_length(utm_content) <= 160),
  utm_term text
    check (utm_term is null or char_length(utm_term) <= 160),
  user_agent text
    check (user_agent is null or char_length(user_agent) <= 500),
  ip_hash text not null
    check (char_length(ip_hash) = 64)
);

comment on table public.nyholm_leads is
  'Private Nyholm Brothers website leads. Writes only through the submit-nyholm-lead Edge Function.';
comment on column public.nyholm_leads.ip_hash is
  'HMAC-SHA256 of requester IP for abuse throttling; raw IP is never stored.';

alter table public.nyholm_leads enable row level security;
alter table public.nyholm_leads force row level security;

revoke all on table public.nyholm_leads from public;
revoke all on table public.nyholm_leads from anon, authenticated;
grant select, insert, update, delete on table public.nyholm_leads to service_role;

create index if not exists nyholm_leads_created_at_idx
  on public.nyholm_leads (created_at desc);
create index if not exists nyholm_leads_status_created_at_idx
  on public.nyholm_leads (status, created_at desc);
create index if not exists nyholm_leads_ip_hash_created_at_idx
  on public.nyholm_leads (ip_hash, created_at desc);

create or replace function private.enforce_nyholm_lead_rate_limit()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  recent_count integer;
begin
  select count(*)
    into recent_count
    from public.nyholm_leads
   where ip_hash = new.ip_hash
     and created_at > now() - interval '1 hour';

  if recent_count >= 5 then
    raise exception 'RATE_LIMIT_EXCEEDED'
      using errcode = 'P0001';
  end if;

  return new;
end;
$$;

revoke all on function private.enforce_nyholm_lead_rate_limit() from public;
revoke all on function private.enforce_nyholm_lead_rate_limit() from anon, authenticated;
grant execute on function private.enforce_nyholm_lead_rate_limit() to service_role;

drop trigger if exists enforce_nyholm_lead_rate_limit
  on public.nyholm_leads;
create trigger enforce_nyholm_lead_rate_limit
before insert on public.nyholm_leads
for each row
execute function private.enforce_nyholm_lead_rate_limit();

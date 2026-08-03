create extension if not exists pgcrypto;

create table if not exists public.vido_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  company text,
  email text,
  phone text,
  message text,
  consent boolean not null default false,
  consent_version text,
  service_interest text,
  source text not null default 'vido_site',
  landing_page text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  status text not null default 'NEW',
  user_agent text
);

alter table public.vido_leads enable row level security;

create index if not exists vido_leads_created_at_idx on public.vido_leads (created_at desc);
create index if not exists vido_leads_status_idx on public.vido_leads (status);

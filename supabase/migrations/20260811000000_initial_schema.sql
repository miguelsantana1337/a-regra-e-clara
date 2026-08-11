create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  email text not null unique check (char_length(email) <= 180),
  whatsapp text not null check (char_length(whatsapp) <= 32),
  marketing_consent boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.diagnostics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  discipline smallint not null check (discipline between 0 and 20),
  principles smallint not null check (principles between 0 and 20),
  relationships smallint not null check (relationships between 0 and 20),
  health smallint not null check (health between 0 and 20),
  work_money smallint not null check (work_money between 0 and 20),
  total smallint not null check (total between 0 and 100),
  primary_areas jsonb not null default '[]'::jsonb,
  general_level text not null check (
    general_level in ('asking_attention', 'needs_adjustments', 'good_structure')
  ),
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  price_in_cents integer not null check (price_in_cents >= 0),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id),
  product_id uuid not null references public.products(id),
  provider text not null,
  provider_reference text,
  amount_in_cents integer not null check (amount_in_cents >= 0),
  status text not null,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create table if not exists public.entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id),
  product_id uuid not null references public.products(id),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  session_id text not null check (char_length(session_id) <= 128),
  user_id uuid references public.users(id) on delete set null,
  diagnostic_id uuid references public.diagnostics(id) on delete set null,
  name text not null check (char_length(name) <= 80),
  properties jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_diagnostics_user_id
  on public.diagnostics(user_id);
create index if not exists idx_diagnostics_created_at
  on public.diagnostics(created_at desc);
create index if not exists idx_purchases_user_id
  on public.purchases(user_id);
create index if not exists idx_events_name_created_at
  on public.events(name, created_at desc);
create index if not exists idx_events_session_id
  on public.events(session_id);

alter table public.users enable row level security;
alter table public.diagnostics enable row level security;
alter table public.products enable row level security;
alter table public.purchases enable row level security;
alter table public.entitlements enable row level security;
alter table public.events enable row level security;

insert into public.products (slug, name, price_in_cents, active)
values ('kit-a-regra-e-clara', 'Kit A Regra é Clara', 2700, true)
on conflict (slug) do update set
  name = excluded.name,
  price_in_cents = excluded.price_in_cents,
  active = excluded.active;

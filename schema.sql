-- ============================================================
-- Varsity Outdoor Management — Supabase Schema
-- Run this in the Supabase SQL editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- PROFILES (extends auth.users)
-- ============================================================
create table if not exists public.profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  role text not null check (role in ('owner', 'customer')) default 'customer',
  full_name text not null,
  phone text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (user_id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    coalesce(new.raw_user_meta_data->>'role', 'customer')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- CUSTOMERS
-- ============================================================
create table if not exists public.customers (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references public.profiles(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text not null,
  address text not null,
  city text not null,
  state text not null default 'OH',
  zip text not null,
  property_size text not null check (property_size in (
    'under-1/4-acre', '1/4-to-1/2-acre', '1/2-to-1-acre', '1-to-3-acres', '3+-acres'
  )) default 'under-1/4-acre',
  property_type text not null check (property_type in ('residential', 'commercial')) default 'residential',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists customers_email_idx on public.customers(email);
create index if not exists customers_city_idx on public.customers(city);
create index if not exists customers_property_type_idx on public.customers(property_type);

-- ============================================================
-- JOBS
-- ============================================================
create table if not exists public.jobs (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid references public.customers(id) on delete cascade not null,
  service_type text not null check (service_type in (
    'lawn-mowing', 'landscaping', 'snow-removal', 'irrigation',
    'tree-shrub-care', 'hardscaping', 'fertilization', 'seasonal-cleanup'
  )),
  status text not null check (status in (
    'scheduled', 'in_progress', 'completed', 'invoiced', 'cancelled'
  )) default 'scheduled',
  scheduled_date date not null,
  scheduled_time text,
  completed_at timestamptz,
  address text not null,
  city text not null,
  state text not null default 'OH',
  zip text not null,
  notes text,
  internal_notes text,
  crew_size integer not null default 1 check (crew_size between 1 and 20),
  estimated_hours numeric(5,2),
  actual_hours numeric(5,2),
  price numeric(10,2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists jobs_customer_id_idx on public.jobs(customer_id);
create index if not exists jobs_scheduled_date_idx on public.jobs(scheduled_date);
create index if not exists jobs_status_idx on public.jobs(status);
create index if not exists jobs_service_type_idx on public.jobs(service_type);

-- ============================================================
-- JOB PHOTOS
-- ============================================================
create table if not exists public.job_photos (
  id uuid primary key default uuid_generate_v4(),
  job_id uuid references public.jobs(id) on delete cascade not null,
  url text not null,
  type text not null check (type in ('before', 'after', 'during')),
  caption text,
  created_at timestamptz not null default now()
);

create index if not exists job_photos_job_id_idx on public.job_photos(job_id);

-- ============================================================
-- QUOTES
-- ============================================================
create table if not exists public.quotes (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid references public.customers(id) on delete set null,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  address text not null,
  city text not null,
  state text not null default 'OH',
  zip text not null,
  property_size text not null,
  property_type text not null check (property_type in ('residential', 'commercial')) default 'residential',
  services text[] not null default '{}',
  frequency text,
  details text,
  has_fence boolean not null default false,
  has_gate boolean not null default false,
  gate_code text,
  has_irrigation boolean not null default false,
  snow_removal_priority text check (snow_removal_priority in ('standard', 'priority')),
  is_commercial boolean not null default false,
  status text not null check (status in (
    'pending', 'sent', 'viewed', 'accepted', 'declined'
  )) default 'pending',
  estimated_price_low numeric(10,2),
  estimated_price_high numeric(10,2),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists quotes_status_idx on public.quotes(status);
create index if not exists quotes_email_idx on public.quotes(email);
create index if not exists quotes_created_at_idx on public.quotes(created_at desc);
create index if not exists quotes_is_commercial_idx on public.quotes(is_commercial);

-- ============================================================
-- QUOTE SERVICES (junction — for detailed per-service notes)
-- ============================================================
create table if not exists public.quote_services (
  id uuid primary key default uuid_generate_v4(),
  quote_id uuid references public.quotes(id) on delete cascade not null,
  service_type text not null,
  notes text
);

create index if not exists quote_services_quote_id_idx on public.quote_services(quote_id);

-- ============================================================
-- INVOICES
-- ============================================================
create table if not exists public.invoices (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid references public.customers(id) on delete cascade not null,
  job_id uuid references public.jobs(id) on delete set null,
  invoice_number text not null unique,
  status text not null check (status in ('pending', 'paid', 'overdue')) default 'pending',
  due_date date not null,
  paid_at timestamptz,
  subtotal numeric(10,2) not null default 0,
  tax numeric(10,2) not null default 0,
  total numeric(10,2) not null default 0,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists invoices_customer_id_idx on public.invoices(customer_id);
create index if not exists invoices_status_idx on public.invoices(status);
create index if not exists invoices_due_date_idx on public.invoices(due_date);

-- Auto-number invoices
create sequence if not exists invoice_number_seq start with 1001;

create or replace function public.generate_invoice_number()
returns trigger as $$
begin
  if new.invoice_number is null or new.invoice_number = '' then
    new.invoice_number := 'VOM-' || extract(year from now()) || '-' || lpad(nextval('invoice_number_seq')::text, 4, '0');
  end if;
  return new;
end;
$$ language plpgsql;

create trigger set_invoice_number
  before insert on public.invoices
  for each row execute procedure public.generate_invoice_number();

-- ============================================================
-- INVOICE ITEMS
-- ============================================================
create table if not exists public.invoice_items (
  id uuid primary key default uuid_generate_v4(),
  invoice_id uuid references public.invoices(id) on delete cascade not null,
  description text not null,
  quantity numeric(8,2) not null default 1,
  unit_price numeric(10,2) not null,
  total numeric(10,2) generated always as (quantity * unit_price) stored
);

create index if not exists invoice_items_invoice_id_idx on public.invoice_items(invoice_id);

-- ============================================================
-- MESSAGES (owner-customer messaging)
-- ============================================================
create table if not exists public.messages (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid references public.customers(id) on delete cascade not null,
  sender_role text not null check (sender_role in ('owner', 'customer')),
  content text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists messages_customer_id_idx on public.messages(customer_id);
create index if not exists messages_read_at_idx on public.messages(read_at) where read_at is null;

-- ============================================================
-- SERVICE AREAS
-- ============================================================
create table if not exists public.service_areas (
  id uuid primary key default uuid_generate_v4(),
  city text not null,
  state text not null default 'OH',
  zip text not null,
  active boolean not null default true
);

insert into public.service_areas (city, state, zip, active) values
  ('Columbus', 'OH', '43215', true),
  ('Dublin', 'OH', '43016', true),
  ('Westerville', 'OH', '43081', true),
  ('Hilliard', 'OH', '43026', true),
  ('Grove City', 'OH', '43123', true),
  ('Gahanna', 'OH', '43230', true),
  ('New Albany', 'OH', '43054', true),
  ('Pickerington', 'OH', '43147', true)
on conflict do nothing;

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.customers enable row level security;
alter table public.jobs enable row level security;
alter table public.job_photos enable row level security;
alter table public.quotes enable row level security;
alter table public.quote_services enable row level security;
alter table public.invoices enable row level security;
alter table public.invoice_items enable row level security;
alter table public.messages enable row level security;
alter table public.service_areas enable row level security;

-- Helper function to get current user's role
create or replace function public.get_my_role()
returns text as $$
  select role from public.profiles where user_id = auth.uid() limit 1;
$$ language sql security definer stable;

-- Helper function to get customer's customer_id
create or replace function public.get_my_customer_id()
returns uuid as $$
  select c.id from public.customers c
  inner join public.profiles p on p.id = c.profile_id
  where p.user_id = auth.uid()
  limit 1;
$$ language sql security definer stable;

-- PROFILES policies
create policy "Users can view own profile" on public.profiles
  for select using (user_id = auth.uid());

create policy "Users can update own profile" on public.profiles
  for update using (user_id = auth.uid());

create policy "Owners can view all profiles" on public.profiles
  for select using (public.get_my_role() = 'owner');

-- CUSTOMERS policies
create policy "Owners can manage all customers" on public.customers
  for all using (public.get_my_role() = 'owner');

create policy "Customers can view own record" on public.customers
  for select using (profile_id = (
    select id from public.profiles where user_id = auth.uid()
  ));

-- JOBS policies
create policy "Owners can manage all jobs" on public.jobs
  for all using (public.get_my_role() = 'owner');

create policy "Customers can view own jobs" on public.jobs
  for select using (customer_id = public.get_my_customer_id());

-- JOB PHOTOS policies
create policy "Owners can manage all photos" on public.job_photos
  for all using (public.get_my_role() = 'owner');

create policy "Customers can view own job photos" on public.job_photos
  for select using (
    job_id in (select id from public.jobs where customer_id = public.get_my_customer_id())
  );

-- QUOTES policies
create policy "Owners can manage all quotes" on public.quotes
  for all using (public.get_my_role() = 'owner');

create policy "Anyone can insert a quote" on public.quotes
  for insert with check (true);

create policy "Customers can view own quotes" on public.quotes
  for select using (
    email = (select email from public.customers where id = public.get_my_customer_id())
  );

-- INVOICES policies
create policy "Owners can manage all invoices" on public.invoices
  for all using (public.get_my_role() = 'owner');

create policy "Customers can view own invoices" on public.invoices
  for select using (customer_id = public.get_my_customer_id());

-- INVOICE ITEMS policies
create policy "Owners can manage all invoice items" on public.invoice_items
  for all using (public.get_my_role() = 'owner');

create policy "Customers can view own invoice items" on public.invoice_items
  for select using (
    invoice_id in (select id from public.invoices where customer_id = public.get_my_customer_id())
  );

-- MESSAGES policies
create policy "Owners can manage all messages" on public.messages
  for all using (public.get_my_role() = 'owner');

create policy "Customers can view and send own messages" on public.messages
  for all using (customer_id = public.get_my_customer_id());

-- SERVICE AREAS — public read
create policy "Anyone can view service areas" on public.service_areas
  for select using (true);

create policy "Owners can manage service areas" on public.service_areas
  for all using (public.get_my_role() = 'owner');

-- ============================================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================================
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply to all tables with updated_at
create trigger set_profiles_updated_at before update on public.profiles for each row execute procedure public.set_updated_at();
create trigger set_customers_updated_at before update on public.customers for each row execute procedure public.set_updated_at();
create trigger set_jobs_updated_at before update on public.jobs for each row execute procedure public.set_updated_at();
create trigger set_quotes_updated_at before update on public.quotes for each row execute procedure public.set_updated_at();
create trigger set_invoices_updated_at before update on public.invoices for each row execute procedure public.set_updated_at();

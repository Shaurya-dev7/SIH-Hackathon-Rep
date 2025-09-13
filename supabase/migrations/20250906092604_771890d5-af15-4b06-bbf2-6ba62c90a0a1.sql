
-- 1) Enum for booking workflow
do $$
begin
  if not exists (select 1 from pg_type where typname = 'booking_status') then
    create type public.booking_status as enum ('pending', 'confirmed', 'in-progress', 'completed', 'cancelled');
  end if;
end
$$;

-- 2) Common trigger to maintain updated_at
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- 3) Profiles table (one row per auth user)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Keep updated_at fresh
drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

-- RLS for profiles: users can manage only their own row
alter table public.profiles enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies 
    where schemaname = 'public' and tablename = 'profiles' and policyname = 'Users can view their own profile'
  ) then
    create policy "Users can view their own profile"
      on public.profiles
      for select
      to authenticated
      using (id = auth.uid());
  end if;

  if not exists (
    select 1 from pg_policies 
    where schemaname = 'public' and tablename = 'profiles' and policyname = 'Users can insert their own profile'
  ) then
    create policy "Users can insert their own profile"
      on public.profiles
      for insert
      to authenticated
      with check (id = auth.uid());
  end if;

  if not exists (
    select 1 from pg_policies 
    where schemaname = 'public' and tablename = 'profiles' and policyname = 'Users can update their own profile'
  ) then
    create policy "Users can update their own profile"
      on public.profiles
      for update
      to authenticated
      using (id = auth.uid())
      with check (id = auth.uid());
  end if;
end
$$;

-- 4) Bookings table
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  customer_name text not null,
  email text,
  phone text not null,
  address text not null,
  category text not null,           -- 'home-appliances' | 'kitchen-appliances' | 'cleaning-laundry'
  appliance text not null,          -- e.g. 'AC', 'Washing Machine'
  problem text not null,
  preferred_date date,              -- optional
  preferred_time text,              -- 'morning' | 'afternoon' | 'evening' (optional)
  urgency text,                     -- 'emergency' | 'same-day' | 'flexible' (optional)
  status public.booking_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Helpful indexes
create index if not exists idx_bookings_user_id on public.bookings(user_id);
create index if not exists idx_bookings_created_at on public.bookings(created_at desc);

-- Keep updated_at fresh
drop trigger if exists trg_bookings_updated_at on public.bookings;
create trigger trg_bookings_updated_at
before update on public.bookings
for each row
execute function public.set_updated_at();

-- RLS for bookings: users can only manage their own bookings
alter table public.bookings enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies 
    where schemaname = 'public' and tablename = 'bookings' and policyname = 'Users can view their own bookings'
  ) then
    create policy "Users can view their own bookings"
      on public.bookings
      for select
      to authenticated
      using (user_id = auth.uid());
  end if;

  if not exists (
    select 1 from pg_policies 
    where schemaname = 'public' and tablename = 'bookings' and policyname = 'Users can create their own bookings'
  ) then
    create policy "Users can create their own bookings"
      on public.bookings
      for insert
      to authenticated
      with check (user_id = auth.uid());
  end if;

  if not exists (
    select 1 from pg_policies 
    where schemaname = 'public' and tablename = 'bookings' and policyname = 'Users can update their own bookings'
  ) then
    create policy "Users can update their own bookings"
      on public.bookings
      for update
      to authenticated
      using (user_id = auth.uid())
      with check (user_id = auth.uid());
  end if;

  if not exists (
    select 1 from pg_policies 
    where schemaname = 'public' and tablename = 'bookings' and policyname = 'Users can delete their own bookings'
  ) then
    create policy "Users can delete their own bookings"
      on public.bookings
      for delete
      to authenticated
      using (user_id = auth.uid());
  end if;
end
$$;

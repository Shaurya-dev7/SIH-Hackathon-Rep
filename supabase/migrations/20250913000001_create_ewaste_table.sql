-- Create e-waste requests table
create table if not exists ewaste_requests (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    title text not null,
    description text,
    image_url text,
    status text default 'pending' check (status in ('pending', 'approved', 'rejected', 'sold')),
    price_estimate decimal(10,2),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table ewaste_requests enable row level security;

-- Create policies
create policy "Users can view their own e-waste requests"
    on ewaste_requests for select
    using (auth.uid() = user_id);

create policy "Users can insert their own e-waste requests"
    on ewaste_requests for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own e-waste requests"
    on ewaste_requests for update
    using (auth.uid() = user_id);

-- Create function to handle updated_at
create or replace function handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Create trigger for updated_at
create trigger handle_updated_at
    before update on ewaste_requests
    for each row
    execute procedure handle_updated_at();
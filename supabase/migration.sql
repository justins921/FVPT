-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New Query)

create table if not exists content (
  section text primary key,
  data jsonb not null,
  updated_at timestamptz default now()
);

-- Enable Row Level Security (optional, since we use the service key server-side)
alter table content enable row level security;

-- Allow reads from anyone (public site needs this)
create policy "Public read access" on content
  for select using (true);

-- Only authenticated service role can write
create policy "Service role write access" on content
  for all using (auth.role() = 'service_role');

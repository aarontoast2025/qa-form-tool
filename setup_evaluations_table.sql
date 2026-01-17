-- Create the table for storing QA Evaluations
create table if not exists qa_evaluations (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Header Fields
  interaction_id text,
  advocate_name text,
  call_ani text,
  date_interaction date,
  date_evaluation date,
  case_category text,
  issue_concern text,
  
  -- The full state of the evaluation (selections, comments, tags)
  form_data jsonb,
  
  -- Metadata
  status text default 'completed'
);

-- Enable Row Level Security (RLS)
alter table qa_evaluations enable row level security;

-- Create policies to allow public/anon access (matching current app's auth model)
-- Allow Insert
create policy "Enable insert for anon users" on qa_evaluations
  for insert with check (true);

-- Allow Select (optional, if you want to view them later via this API)
create policy "Enable select for anon users" on qa_evaluations
  for select using (true);

-- Allow Update (optional)
create policy "Enable update for anon users" on qa_evaluations
  for update using (true);

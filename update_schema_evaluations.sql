-- Update the qa_evaluations table with missing fields
alter table qa_evaluations 
add column if not exists case_number text,
add column if not exists call_duration text,
add column if not exists qa_score text;

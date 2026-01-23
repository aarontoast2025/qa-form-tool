-- Add source_url column to qa_evaluations table
ALTER TABLE qa_evaluations ADD COLUMN IF NOT EXISTS source_url text;

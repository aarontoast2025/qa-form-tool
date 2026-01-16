-- Fix Security Policies to allow Editing

-- 1. Allow ALL operations (Select, Insert, Update, Delete) on qa_defaults
DROP POLICY IF EXISTS "Enable read access for all users" ON public.qa_defaults;

CREATE POLICY "Enable full access for all users" 
ON public.qa_defaults 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- 2. Allow ALL operations (Select, Insert, Update, Delete) on qa_tags
DROP POLICY IF EXISTS "Enable read access for all users" ON public.qa_tags;

CREATE POLICY "Enable full access for all users" 
ON public.qa_tags 
FOR ALL 
USING (true) 
WITH CHECK (true);

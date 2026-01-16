-- Fix Reversed Tags in Case Management
-- Items: 3 (Failed Follow-up), 4 (Out of Context Article), 7 (Wrong Contact Method)
-- Move tags from 'yes' to 'no' because 'no' represents the Right Button (Bad Outcome "Yes")

UPDATE public.qa_tags 
SET response_value = 'no' 
WHERE group_name = 'Case Management' 
  AND item_id IN (3, 4, 7) 
  AND response_value = 'yes';

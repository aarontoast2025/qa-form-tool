-- Tags for Case Management Items (Items 1-12 Toggles)

-- 1. Resolution (No)
INSERT INTO public.qa_tags (item_id, group_name, item_name, response_value, tag_label, tag_feedback) VALUES
(1, 'Case Management', 'Resolution', 'no', 'Incorrect', 'Provided incorrect resolution steps.'),
(1, 'Case Management', 'Resolution', 'no', 'Incomplete', 'Resolution was partially correct but missing key details.'),
(1, 'Case Management', 'Resolution', 'no', 'Irrelevant', 'Provided a solution unrelated to the customer''s issue.');

-- 2. Escalation (No)
INSERT INTO public.qa_tags (item_id, group_name, item_name, response_value, tag_label, tag_feedback) VALUES
(2, 'Case Management', 'Escalation', 'no', 'Premature', 'Escalated without exhausting Tier 1 troubleshooting.'),
(2, 'Case Management', 'Escalation', 'no', 'No Context', 'Escalated with insufficient notes for the next tier.');

-- 3. Failed Follow-up (Yes/Reverse - Bad)
INSERT INTO public.qa_tags (item_id, group_name, item_name, response_value, tag_label, tag_feedback) VALUES
(3, 'Case Management', 'Failed Follow-up', 'yes', 'No Call', 'Promised callback was never made.'),
(3, 'Case Management', 'Failed Follow-up', 'yes', 'Late', 'Follow-up was made outside the promised timeframe.');

-- 4. Out of Context Article (Yes/Reverse - Bad)
INSERT INTO public.qa_tags (item_id, group_name, item_name, response_value, tag_label, tag_feedback) VALUES
(4, 'Case Management', 'Out of Context Article', 'yes', 'No Explanation', 'Article link sent without context or summary.'),
(4, 'Case Management', 'Out of Context Article', 'yes', 'Wrong Article', 'Linked article did not address the issue.');

-- 5. Reach-out (8h) (No)
INSERT INTO public.qa_tags (item_id, group_name, item_name, response_value, tag_label, tag_feedback) VALUES
(5, 'Case Management', 'Reach-out (8h)', 'no', '> 8 Hours', 'Initial response sent after 8 hours.'),
(5, 'Case Management', 'Reach-out (8h)', 'no', 'No Response', 'No initial reach-out attempted.');

-- 6. Expectations (No)
INSERT INTO public.qa_tags (item_id, group_name, item_name, response_value, tag_label, tag_feedback) VALUES
(6, 'Case Management', 'Expectations', 'no', 'Wrong Channel', 'Customer requested phone but agent emailed.'),
(6, 'Case Management', 'Expectations', 'no', 'Ignored Request', 'Agent ignored specific contact instructions.');

-- 7. Wrong Contact Method (Yes/Reverse - Bad)
INSERT INTO public.qa_tags (item_id, group_name, item_name, response_value, tag_label, tag_feedback) VALUES
(7, 'Case Management', 'Wrong Contact Method', 'yes', 'Email vs Call', 'Used email for an urgent issue requiring a call.'),
(7, 'Case Management', 'Wrong Contact Method', 'yes', 'No Voicemail', 'Called but left no voicemail.');

-- 8. Written Comm (No)
INSERT INTO public.qa_tags (item_id, group_name, item_name, response_value, tag_label, tag_feedback) VALUES
(8, 'Case Management', 'Written Comm', 'no', 'Grammar', 'Response contained significant grammar errors.'),
(8, 'Case Management', 'Written Comm', 'no', 'Formatting', 'Email formatting was broken or hard to read.');

-- 9. Internal Comm (No)
INSERT INTO public.qa_tags (item_id, group_name, item_name, response_value, tag_label, tag_feedback) VALUES
(9, 'Case Management', 'Internal Comm', 'no', 'Not Visible', 'Internal notes were not clearly visible or tagged.'),
(9, 'Case Management', 'Internal Comm', 'no', 'Unclear', 'Internal comments were vague.');

-- 10. 1case1issue (No)
INSERT INTO public.qa_tags (item_id, group_name, item_name, response_value, tag_label, tag_feedback) VALUES
(10, 'Case Management', '1case1issue', 'no', 'Merged Issues', 'Addressed multiple distinct issues in one ticket.'),
(10, 'Case Management', '1case1issue', 'no', 'Split Needed', 'Failed to create a separate ticket for a new issue.');

-- 11. Case Notes (No)
INSERT INTO public.qa_tags (item_id, group_name, item_name, response_value, tag_label, tag_feedback) VALUES
(11, 'Case Management', 'Case Notes', 'no', 'Sparse', 'Notes were insufficient to understand the case history.'),
(11, 'Case Management', 'Case Notes', 'no', 'Missing Info', 'Critical data (versions, IDs) wasn''t captured.');

-- 12. Account Info (No)
INSERT INTO public.qa_tags (item_id, group_name, item_name, response_value, tag_label, tag_feedback) VALUES
(12, 'Case Management', 'Account Info', 'no', 'Wrong URL', 'Incorrect store URL on file.'),
(12, 'Case Management', 'Account Info', 'no', 'Not Verified', 'Failed to verify account ownership.');

-- Dropdown Sample Tags

-- 14. Incorrect Case Staging
-- Index 1: "Yes - pending cx instead of pending care"
INSERT INTO public.qa_tags (item_id, group_name, item_name, response_value, tag_label, tag_feedback) VALUES
(14, 'Case Management', 'Incorrect Case Staging', '1', 'Should be Care', 'Case set to Pending Cx but action is on Care.');
-- Index 2: "Yes - pending care instead of pending cx"
INSERT INTO public.qa_tags (item_id, group_name, item_name, response_value, tag_label, tag_feedback) VALUES
(14, 'Case Management', 'Incorrect Case Staging', '2', 'Should be Cx', 'Case set to Pending Care but waiting on Customer.');

-- 15. Mistreat/Avoid
-- Index 1: "Yes - Rude to Cx"
INSERT INTO public.qa_tags (item_id, group_name, item_name, response_value, tag_label, tag_feedback) VALUES
(15, 'Case Management', 'Mistreat/Avoid', '1', 'Sarcasm', 'Agent used sarcastic language.'),
(15, 'Case Management', 'Mistreat/Avoid', '1', 'Shouting', 'Agent raised voice at customer.');
-- Index 2: "Yes - False phone interactions"
INSERT INTO public.qa_tags (item_id, group_name, item_name, response_value, tag_label, tag_feedback) VALUES
(15, 'Case Management', 'Mistreat/Avoid', '2', 'Fake Log', 'Logged call that did not happen.');

-- 16. Temp Start
-- Index 1: "Upset"
INSERT INTO public.qa_tags (item_id, group_name, item_name, response_value, tag_label, tag_feedback) VALUES
(16, 'Case Management', 'Temp Start', '1', 'Frustrated', 'Cx expressed frustration immediately.'),
(16, 'Case Management', 'Temp Start', '1', 'Angry', 'Cx was shouting/angry.');


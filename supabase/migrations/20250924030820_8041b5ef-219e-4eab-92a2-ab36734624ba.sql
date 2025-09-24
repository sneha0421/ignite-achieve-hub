-- Add the correct column to store the ID of the approving faculty member.
-- This command will not fail if the column already exists.
ALTER TABLE public.activities
ADD COLUMN IF NOT EXISTS approving_faculty_id UUID
REFERENCES public.profiles(id);

-- Create an index on the new column for better query performance.
CREATE INDEX IF NOT EXISTS idx_activities_approving_faculty_id ON public.activities(approving_faculty_id);

-- Drop the old, flawed policy to prevent conflicts.
DROP POLICY IF EXISTS "Faculty can view assigned activities" ON public.activities;

-- Create the correct, secure policy. This only allows faculty to see posts where their ID matches the approving_faculty_id.
CREATE POLICY "Faculty can view assigned activities"
ON public.activities
FOR SELECT
USING (
  -- The user must be a faculty member and the post must be assigned to them.
  (SELECT profiles.is_faculty FROM profiles WHERE profiles.id = auth.uid()) IS TRUE
  AND approving_faculty_id = (SELECT profiles.id FROM profiles WHERE profiles.user_id = auth.uid())
);
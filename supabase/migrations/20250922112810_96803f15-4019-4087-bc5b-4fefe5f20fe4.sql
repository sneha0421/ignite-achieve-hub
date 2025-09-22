-- Fix the trigger function to use user_id instead of id
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
begin
  insert into public.profiles (user_id, full_name, is_faculty)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', 'Unnamed User'), false);
  return new;
end;
$$;
-- Fix the search path security issue for the handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
begin
  insert into public.profiles (id, full_name, is_faculty)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', 'Unnamed User'), false);
  return new;
end;
$$;
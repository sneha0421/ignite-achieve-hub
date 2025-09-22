-- Update the existing function to use the correct column mapping
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger as $$
begin
  insert into public.profiles (id, full_name, is_faculty)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', 'Unnamed User'), false);
  return new;
end;
$$ language plpgsql security definer;

-- Create the trigger if it doesn't exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
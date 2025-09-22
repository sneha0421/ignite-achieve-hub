-- This creates the function that the trigger will call.
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, is_faculty)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', 'Unnamed User'), false);
  return new;
end;
$$ language plpgsql security definer;

-- This creates the trigger and links it to the function.
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
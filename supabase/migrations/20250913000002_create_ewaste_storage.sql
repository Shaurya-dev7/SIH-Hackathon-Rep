-- Create storage bucket for e-waste images
insert into storage.buckets (id, name, public)
values ('ewaste-images', 'ewaste-images', true);

-- Set up storage policies
create policy "Anyone can view e-waste images"
  on storage.objects for select
  using ( bucket_id = 'ewaste-images' );

create policy "Authenticated users can upload e-waste images"
  on storage.objects for insert
  with check (
    bucket_id = 'ewaste-images'
    and auth.role() = 'authenticated'
  );

create policy "Users can update their own e-waste images"
  on storage.objects for update
  using (
    bucket_id = 'ewaste-images'
    and auth.uid() = owner
  );

create policy "Users can delete their own e-waste images"
  on storage.objects for delete
  using (
    bucket_id = 'ewaste-images'
    and auth.uid() = owner
  );
-- Enable RLS on storage.objects if not already enabled (usually is by default)
-- alter table storage.objects enable row level security;

-- Allow public read access to the 'ARTICLES' bucket
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'ARTICLES' );

-- Allow authenticated users to upload to 'ARTICLES' bucket
create policy "Authenticated users can upload"
on storage.objects for insert
with check ( bucket_id = 'ARTICLES' and auth.role() = 'authenticated' );

-- Allow authenticated users to upload to 'ARTICLES' bucket (Legacy support for 'articles' just in case)
/*
create policy "Public Access (Legacy)"
on storage.objects for select
using ( bucket_id = 'articles' );

create policy "Authenticated users can upload (Legacy)"
on storage.objects for insert
with check ( bucket_id = 'articles' and auth.role() = 'authenticated' );
*/

-- Allow authenticated users to update their own uploads
create policy "Authenticated users can update"
on storage.objects for update
using ( bucket_id = 'ARTICLES' and auth.role() = 'authenticated' );

-- Allow authenticated users to delete
create policy "Authenticated users can delete"
on storage.objects for delete
using ( bucket_id = 'ARTICLES' and auth.role() = 'authenticated' );

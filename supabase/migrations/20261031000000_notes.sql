create table notes (
  id bigint generated always as identity primary key,
  content text not null,
  created_at timestamptz default now()
);

alter table notes enable row level security;
create policy "herkes okuyabilir" on notes for select using (true);
create policy "herkes ekleyebilir" on notes for insert with check (true);

insert into notes (content) values
  ('Merhaba! Bu not Supabase''in Frankfurt sunucusunda duruyor'),
  ('Birazdan Türkiye''ye taşınıyoruz');

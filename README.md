# supabase-notlar

Self-host Supabase'e bağlanan küçük bir Next.js notlar uygulaması. "Supabase'i Türkiye'de Kendi Sunucuna Kur" videosunun demo projesi.

## Supabase tarafı

Studio → SQL Editor'da çalıştır:

```sql
create table notes (
  id bigint generated always as identity primary key,
  content text not null,
  created_at timestamptz default now()
);

alter table notes enable row level security;
create policy "herkes okuyabilir" on notes for select using (true);
create policy "herkes ekleyebilir" on notes for insert with check (true);
```

> Bu kurallar demo için herkese açık. Gerçek projede okuma/yazmayı giriş yapmış kullanıcıyla sınırla.

## Sunucuda çalıştırma (Docker)

```bash
git clone https://github.com/poyrazavsever/supabase-notlar
cd supabase-notlar
cp .env.example .env.local   # anon key'i Supabase .env dosyasındaki ANON_KEY'den al
docker build -t notlar .
docker run -d --restart unless-stopped -p 127.0.0.1:3000:3000 notlar
```

`NEXT_PUBLIC_*` değişkenleri build sırasında okunur. `.env.local` değişirse imajı yeniden build et.

Uygulama sadece `127.0.0.1:3000`'de dinler; dışarıya Caddy üzerinden açılır:

```
notlar.poyrazavsever.com {
    reverse_proxy localhost:3000
}
```

## Lokal geliştirme

```bash
npm install
cp .env.example .env.local
npm run dev
```

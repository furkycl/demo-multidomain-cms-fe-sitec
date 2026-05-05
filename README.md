# site-c

multi-cms ile çalışan bağımsız Next.js site. Backend için: `../backend/` veya production'da Render URL'i.

## Lokal kurulum

```bash
cp .env.example .env.local
# .env.local'da NEXT_PUBLIC_API_URL ve SITE_DOMAIN'i kontrol et
npm install
npm run dev
```

Bu sitenin Filament'teki `Site.domain` değerini `SITE_DOMAIN` env'iyle eşleştir.
İlk deploy sonrası Filament'te bu sitenin `revalidate_url`'ini Vercel URL'ine ayarla.

## Deploy (Vercel)

Bu repo'yu Vercel'e import et, env değişkenlerini set et:
- `NEXT_PUBLIC_API_URL` = Backend Render URL'i
- `SITE_DOMAIN` = Filament'teki bu site'ın domain'i (örn: `site-c.example.com`)
- `REVALIDATE_SECRET` = Filament'teki bu site'ın `revalidate_secret`'ı

Daha fazla detay: ana repo'daki `docs/SITES.md` ve `docs/DEPLOYMENT.md`.

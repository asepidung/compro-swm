# Compro PT. Santi Wijaya Meat

Company profile A4 (24 halaman, 1 halaman per muka). Sumber HTML/CSS yang dirender ke PDF dengan Chromium.

## Struktur

| Path | Isi |
|---|---|
| `data/*.json` | Semua isi: perusahaan, produk, klien, hasil lab, proses, penghargaan |
| `src/v2/` | Desain utama (elegan: Playfair Display + Plus Jakarta Sans, emas-gelap) |
| `src/v1/` | Desain lama (arsip) |
| `assets/` | Logo, foto, foto produk, scan sertifikat, font |
| `build.mjs` | Render ke PDF |

## Build

```
npm install
npm run build        # desain utama -> dist/compro.pdf
node build.mjs v1    # desain lama  -> dist/compro-v1.pdf
```

Chromium dicari lewat `PLAYWRIGHT_BROWSERS_PATH`; atau set `CHROMIUM_PATH`.

## Susunan halaman

1 Cover · 2 Kata Pengantar · 3 Sejarah & Timeline · 4 Profil · 5 Visi & Misi · 6 Struktur Organisasi · 7 Fasilitas · 8 Proses Produksi · 9 Jaminan Mutu & Uji Lab · 10 Meet Our Experts · 11 Kebijakan Halal & Lingkungan · 12 Distribusi & Armada · 13 Klien & Mitra · 14 Galeri · 15 Penghargaan · 16 Legal · 18–22 Produk · 23 Kontak · 24 Cover belakang.

Total tetap kelipatan 4. Halaman produk (17–22) adalah penyangga; kalau halaman depan bertambah, halaman produk berkurang.

## Foto

- Foto produk: `assets/products/<slug-nama>.jpg` (mis. `tenderloin.jpg`). Tanpa file, kartu menampilkan "Foto menyusul".
- Foto tim: `assets/team/<slug-nama>.jpg` (mis. `asep-saepullah.jpg`), rasio 3:4.
- Foto lain diambil dari PDF compro lama (resolusi rendah). Ganti dengan foto asli untuk cetak (target 300 dpi).

## Sebelum cetak

- Konfirmasi izin klien untuk nama merek di halaman Klien & Mitra.
- Konfirmasi sumber "Jaminan Halal Terbaik" (dari brosur event).
- Cek tautan QR bit.ly/swmcatalogue dan bit.ly/swmcompro.
- Konfirmasi jumlah armada (5 unit).

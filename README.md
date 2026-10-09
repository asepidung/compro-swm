# Compro PT. Santi Wijaya Meat

Company profile A4 (24 halaman, 1 halaman per muka). Sumber HTML/CSS yang dirender ke PDF dengan Chromium.

## Struktur

| Path | Isi |
|---|---|
| `data/company.json` | Data perusahaan (sumber tunggal, ubah di sini) |
| `data/products.json` | Produk unggulan halaman 17–22 |
| `src/pages.mjs` | Isi 24 halaman |
| `src/styles.css` | Gaya A4 (kerangka/wireframe) |
| `build.mjs` | Render `dist/compro.html` dan `dist/compro-kerangka.pdf` |

## Build

```
npm install
npm run build
```

Chromium dicari lewat `PLAYWRIGHT_BROWSERS_PATH`; atau set `CHROMIUM_PATH`.

## Susunan halaman

1 Cover · 2 Kata Pengantar · 3 Sejarah & Timeline · 4 Profil · 5 Visi & Misi · 6 Struktur Organisasi · 7 Fasilitas · 8 Proses Produksi · 9 Jaminan Mutu & Uji Lab · 10 Meet Our Experts · 11 Kebijakan Halal & Lingkungan · 12 Distribusi & Armada · 13 Klien & Mitra · 14 Galeri · 15 Penghargaan · 16 Legal · 17–22 Produk · 23 Kontak · 24 Cover belakang.

Total tetap kelipatan 4. Halaman produk (17–22) adalah penyangga; kalau halaman depan bertambah, halaman produk berkurang.

## Status

Tahap kerangka: layout kasar, teks asli di mana datanya sudah terverifikasi, kotak abu-abu untuk foto, dan label `TODO` kuning untuk data yang masih ditunggu. Desain final (warna, tipografi, foto) menyusul.

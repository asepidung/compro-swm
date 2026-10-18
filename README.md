# Compro PT. Santi Wijaya Meat

Company profile A4 (24 halaman, 1 halaman per muka). Sumber HTML/CSS yang dirender ke PDF dengan Chromium.

## Struktur

| Path | Isi |
|---|---|
| `data/*.json` | Semua isi: perusahaan, produk, klien, hasil lab, proses, penghargaan |
| `src/v3/` | Desain utama (kuning dan abu gelap, huruf tebal Barlow Condensed + Plus Jakarta Sans) |
| `src/v2/`, `src/v1/` | Desain sebelumnya (arsip) |
| `assets/` | Logo, foto, foto produk, scan sertifikat, font |
| `build.mjs` | Render ke PDF |

## Build

```
npm install
npm run build        # desain utama -> dist/compro.pdf
node build.mjs v2    # arsip -> dist/compro-v2.pdf
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

- Izin klien untuk nama merek di halaman Klien & Mitra (belum didapat).
- Cek tautan QR bit.ly/swmcatalogue dan bit.ly/swmcompro (ditunda).
- Data armada: jumlah dan jenis (Canter, Traga, engkel, mobil dinas) sedang diriset; angka 5 unit belum final.

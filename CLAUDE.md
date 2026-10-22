# CLAUDE.md — PT. Santi Wijaya Meat (SWM)

Repo ini berisi **company profile (compro) cetak A4** dan, nanti, **website** perusahaan.
Bahasa kerja: Indonesia (user biasa dipanggil "bro"). Isi compro dan web: bahasa Indonesia dulu.

## Kondisi saat ini
- Compro 24 halaman A4 sudah jadi: desain **v3** (kuning `#f7b500` + abu gelap `#2a2a2a`, judul Barlow Condensed tebal, isi Plus Jakarta Sans 11 pt). Ukuran huruf sengaja besar: pembaca utamanya bapak-bapak.
- Branch kerja: `claude/friendly-brahmagupta-54l2ho` (sebelumnya `claude/festive-cray-7ixc70`). Belum ada PR.
- Website: **contoh (prototipe) 7 halaman sudah ada di `web/`**, dibangun dari `data/` dan `assets/`. Bukan versi final; desain dan isi masih untuk ditinjau user. CMS belum dipasang. Rencana: folder `web/` di repo ini, memakai `data/` dan `assets/` yang sama supaya isi compro dan web tidak pernah beda.

## Struktur
| Path | Isi |
|---|---|
| `data/*.json` | **Sumber tunggal isi.** Ubah di sini, bukan di halaman. `company`, `products`, `clients`, `lab`, `process`, `awards` |
| `src/v3/` | Desain utama compro (`pages.mjs`, `styles.css`). `src/v2/` dan `src/v1/` = arsip |
| `assets/` | `logo/`, `img/`, `products/<slug>.jpg`, `team/<slug>.jpg`, `cert/` (scan legalitas), `fonts/` |
| `build.mjs` | HTML ke PDF lewat Chromium (Playwright). `npm run build` ke `dist/compro.pdf` |
| `web/` | Prototipe website statis. `web/build.mjs` (generator), `web/src/style.css` dan `site.js`. `npm run build:web` ke `web/dist/` (tidak di-commit) |
| `dist/` | PDF terbaru (di-commit supaya mudah dilihat user) |

Build: `npm install && npm run build`. Chromium ada di `PLAYWRIGHT_BROWSERS_PATH`, jangan jalankan `playwright install`.
Foto produk dan tim otomatis terpasang bila file ada (`tenderloin.jpg`, `asep-saepullah.jpg`); tanpa file tampil placeholder "FOTO MENYUSUL".

## Keputusan isi (sudah disepakati, jangan diubah tanpa tanya)
- **Sejarah:** CV Wijaya Meat sejak **2014**; resmi PT **2020** (Akta No. 16, 18 April 2020; NIB 4 Mei 2020). Compro lama yang menulis 2019 itu salah.
- **Alamat:** kantor dan cold storage di Perum Asabri Blok B No. 20, Sukasirna. RPH dan produksi di Jl. SMPN 01 Jonggol, Kp. Menan, Sukamaju. Dua-duanya ditampilkan.
- **Kontak utama:** +62 813-6006-959. Email `official@wijayameat.co.id` (belum final).
- **Suhu rantai dingin:** chill 0 s.d. -5°C, frozen -17 s.d. -28°C (dari user; dokumen NKV menyebut "≤ -18°C", jangan dicampur).
- **Alur produksi** (urutan dari user): penerimaan, pengistirahatan, pemandian, penggiringan, stunning box, dst. Tahap "pemberian pakan" dihapus.
- **Segmen pelanggan:** modern market, distributor, horeka, retail, industri. Pelanggan utama (Lion Superindo, Hypermart) hanya ditaruh di urutan pertama, tanpa kartu khusus.
- **Tim ahli:** Asep Saepullah (Penyelia Halal), Furqonilah dan Zaelani Aslan (Juleha), Taufiq Hidayat (AWO), Nunu Nurjanan dan Mulyadi (Stunner). Dokumen lama menulis "Jaelani", ikut ejaan user.
- **Uji lab:** daging dan jeroan 3 bulan sekali di BPMSPH Kab. Bogor; air, karyawan, peralatan setahun sekali di SIG. Keduanya terakreditasi KAN.

## Yang sengaja TIDAK dipublikasikan
- Nama staf per divisi (user minta dihapus), dan nama karyawan di hasil swab (hanya "4 sampel").
- Klaim "Jaminan Halal Terbaik" (sumber tidak jelas, dihapus), "Piagam Stunning" (diganti SDM bersertifikat kompetensi).
- Data pelanggan internal: bank, termin bayar, alamat, nama perorangan. `clients.json` hanya nama merek.
- Coliform air proses (7,0/100 mL di laporan SIG 21 Sep 2026): tidak ditampilkan, tapi **jangan** menulis "air memenuhi semua baku mutu". User bilang uji terbaru sudah bersih, tapi laporannya belum ada.
- Jangan mengarang hasil lab, angka, atau nama klien. Data contoh tidak boleh lolos ke versi cetak.

## Daftar terbuka (menunggu user)
1. Izin klien untuk nama merek (`data/clients.json`). **Belum ada.** Tanpa izin, ganti halaman klien dengan daftar segmen saja.
2. Armada: jumlah dan jenis (Canter, Traga, engkel, mobil dinas). Angka `5` di `company.json` belum final.
3. Tautan QR `bit.ly/swmcatalogue` dan `bit.ly/swmcompro` (dari compro 2024) belum diverifikasi.
4. Foto: 17 produk belum ada fotonya, foto tim, foto resolusi cetak (target 300 dpi).
5. Detail layout compro yang masih perlu dirapikan (user akan sebut).
6. Uji air terbaru (bebas Coliform) dan hasil uji lain bila ada.

## Google Drive (konektor aktif, akun `wijayameatpt@gmail.com`)
- Folder penting: `PRIVATE/DESAIN/COMPRO` (compro lama, PDF), `BASE IMAGE DAGING/PRO` (61 PNG, 10 s.d. 30 MB, belum bisa ditarik) dan `AMATIR` (JPG, ±30 file di bawah 5 MB sudah dipakai), `LOGO`, `DOKUMEN PERUSAHAAN/LEGALITAS`, `RESERTIFIKASI NKV`.
- **Batas tool:** file di atas ±5 MB membuat koneksi Drive putus. Hasil `download_file_content` tersimpan sebagai JSON base64 di folder tool-results; decode dengan `python3 -I`.
- File `.cdr` (CorelDRAW) tidak bisa dibaca; minta versi PDF.
- Foto besar: lebih mudah diunggah user langsung ke `assets/` lewat GitHub.

## Rencana website (disepakati, pengerjaan ditunda)
**Tujuan** (urut prioritas): (1) meyakinkan bagian pembelian lewat legalitas, halal, NKV, uji lab; (2) menghasilkan kontak lewat WhatsApp (ukur klik WA); (3) katalog lengkap ±50 potongan, menggantikan QR katalog; (4) satu tautan untuk dibagikan sales.

**Halaman:** Beranda · Tentang (sejarah, visi misi, tim ahli, organisasi tanpa nama staf) · Fasilitas & Proses (digabung: RPH, cold storage, armada, alur produksi) · Mutu & Halal · Produk (filter chill/frozen, bagian potongan) · Klien (segmen saja sampai ada izin merek) · Kontak (dua alamat + peta, WA, telepon, email). Galeri ditunda sampai foto ada.

**Keputusan:**
- **Tanpa harga** di katalog; tombol "tanya harga via WA".
- **Legalitas:** tampilkan nomor sertifikat (halal, NKV) dan tautan cek ke situs penerbit, **bukan scan utuh**. NPWP/NIB lengkap tidak ditampilkan di web.
- **Lab:** jadwal uji, nama lab, akreditasi KAN. Tanpa angka hasil (lihat catatan Coliform di atas).
- **Kontak:** tombol WhatsApp, tanpa formulir.
- **Stack:** situs statis dibangun dari `data/*.json` dan `assets/` yang sama dengan compro, di folder `web/`. Bukan WordPress.
- **Hosting:** Cloudflare Pages (gratis, terbit otomatis dari GitHub). Email official@ diteruskan ke Gmail (Cloudflare Email Routing) atau Google Workspace.
- **Domain `wijayameat.co.id` sudah dimiliki user** (atas nama user). Registrar dan akses DNS belum ditanyakan; perlu saat mau terbit.
- **Yang mengubah isi: user dan beberapa staf.** Staf butuh cara edit tanpa coding: pakai CMS berbasis Git (mis. Decap CMS / Pages CMS) yang menyunting `data/*.json`, supaya compro tetap ikut sumber yang sama.
- **Bahasa:** Indonesia dulu, struktur siap dua bahasa.
- Biarkan Claude memilih detail teknis terbaik ("cari jalan terbaik").

## Aturan kerja
- Jangan membuat PR kecuali diminta. Commit ke branch di atas, pesan commit singkat dalam bahasa Indonesia.
- Cek visual hasil render (PDF ke PNG) sebelum bilang selesai; periksa teks yang menimpa footer.
- Laporkan apa adanya: sebut data yang meragukan, jangan diam-diam menghapus atau memperhalus.

## Prototipe website (`web/`)
- 7 halaman: beranda, tentang, fasilitas (proses + distribusi), mutu & halal, produk (filter + cari, tombol "Tanya harga via WA"), klien (segmen saja), kontak. Tanpa harga, tanpa scan legalitas, tanpa angka hasil lab, tanpa jumlah armada.
- Staging: bila env `CF_PAGES_BRANCH` ada dan bukan `PRODUCTION_BRANCH` (default `main`), halaman diberi `noindex`.
- Belum ada: CMS (Decap/Pages CMS butuh `data/*.json` berakar objek; `products.json` dan `process.json` sekarang berakar array, perlu diubah bersama `src/v3/pages.mjs`), dua bahasa, analitik, foto 17 produk, foto tim, galeri.
- Angka "30+ potongan" di web = jumlah item di `products.json`; katalog asli ±50 potongan.

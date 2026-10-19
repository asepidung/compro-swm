# CLAUDE.md — PT. Santi Wijaya Meat (SWM)

Repo ini berisi **company profile (compro) cetak A4** dan, nanti, **website** perusahaan.
Bahasa kerja: Indonesia (user biasa dipanggil "bro"). Isi compro dan web: bahasa Indonesia dulu.

## Kondisi saat ini
- Compro 24 halaman A4 sudah jadi: desain **v3** (kuning `#f7b500` + abu gelap `#2a2a2a`, judul Barlow Condensed tebal, isi Plus Jakarta Sans 11 pt). Ukuran huruf sengaja besar: pembaca utamanya bapak-bapak.
- Branch kerja: `claude/festive-cray-7ixc70`. Belum ada PR.
- Website: **belum dimulai**. Rencana: folder `web/` di repo ini, memakai `data/` dan `assets/` yang sama supaya isi compro dan web tidak pernah beda.

## Struktur
| Path | Isi |
|---|---|
| `data/*.json` | **Sumber tunggal isi.** Ubah di sini, bukan di halaman. `company`, `products`, `clients`, `lab`, `process`, `awards` |
| `src/v3/` | Desain utama compro (`pages.mjs`, `styles.css`). `src/v2/` dan `src/v1/` = arsip |
| `assets/` | `logo/`, `img/`, `products/<slug>.jpg`, `team/<slug>.jpg`, `cert/` (scan legalitas), `fonts/` |
| `build.mjs` | HTML ke PDF lewat Chromium (Playwright). `npm run build` ke `dist/compro.pdf` |
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

## Rencana website
- Halaman: beranda, tentang (sejarah, visi misi, organisasi), fasilitas, proses produksi, jaminan mutu dan hasil lab, halal, produk (katalog lengkap ±50 potongan, termasuk yang tidak muat di compro), klien, galeri, kontak.
- Pakai data dan aset yang sama; katalog lengkap di web menggantikan QR katalog.
- Belum diputuskan: stack, hosting, dua bahasa (Inggris menyusul), formulir kontak atau WhatsApp.
- Mulai dengan perencanaan (halaman, tujuan, hosting) sebelum membuat desain.

## Aturan kerja
- Jangan membuat PR kecuali diminta. Commit ke branch di atas, pesan commit singkat dalam bahasa Indonesia.
- Cek visual hasil render (PDF ke PNG) sebelum bilang selesai; periksa teks yang menimpa footer.
- Laporkan apa adanya: sebut data yang meragukan, jangan diam-diam menghapus atau memperhalus.

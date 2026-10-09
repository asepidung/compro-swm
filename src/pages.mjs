import { readFileSync } from "node:fs";

const co = JSON.parse(readFileSync(new URL("../data/company.json", import.meta.url)));
const products = JSON.parse(readFileSync(new URL("../data/products.json", import.meta.url)));

const ph = (label, style = "") => `<div class="ph" style="${style}">${label}</div>`;
const todo = (t) => `<div class="todo">${t}</div>`;
const kv = (rows) => `<table class="kv">${rows.map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join("")}</table>`;

const page = (n, section, body, cls = "") => `
<section class="page ${cls}" id="p${n}">
  <div class="bar"></div>
  ${body}
  <div class="foot"><span><b>${co.nama}</b> · Company Profile</span><span>${section} · ${String(n).padStart(2, "0")}</span></div>
</section>`;

const pages = [];

// 1 — Cover
pages.push(`
<section class="page cover" id="p1">
  <div class="gold"></div>
  <div class="badges">${ph("NKV", "")}${ph("NKV", "")}${ph("HALAL", "")}</div>
  <div class="t"><div class="big">Company<br>Profile</div><div class="nm">${co.nama.toUpperCase()}</div></div>
  <div class="hero">${ph("FOTO HERO · sapi di padang / fasilitas RPH (landscape, 180 × 120 mm)", "height:100%")}</div>
  <div class="logo">${ph("LOGO WIJAYA MEAT (hexagon emas)", "height:100%")}</div>
  <div class="addr">${co.alamat_kantor}<br>${co.website}</div>
</section>`);

// 2 — Kata Pengantar
pages.push(page(2, "Kata Pengantar", `
  <h1>Kata Pengantar</h1>
  <div class="grid g2" style="grid-template-columns: 62mm 1fr; align-items:start">
    ${ph("FOTO OWNER<br>(portrait)", "height:80mm")}
    <div>
      <p>Salam Hormat,</p>
      <p>Selamat datang di <b>${co.nama}</b>, tempat di mana komitmen kami untuk memenuhi kebutuhan Anda menjadi prioritas utama.</p>
      <p>Sejak tahun 2014, ketika kami masih bernama CV. Wijaya Meat, perjalanan kami sebagai penyedia daging sapi berkualitas dimulai. Pada tahun 2020, kami melangkah lebih jauh dengan resmi menjadi <b>${co.nama}</b>, menghadirkan kualitas dan layanan yang lebih baik.</p>
      <p>Sebagai pemilik perusahaan, saya, ${co.owner}, bangga dengan peran kami dalam menyediakan daging sapi berkualitas tinggi untuk berbagai kebutuhan pasar modern, sektor perhotelan, dan restoran-restoran bergengsi. Slogan kami, <i>"${co.tagline},"</i> mencerminkan tekad kami untuk selalu hadir dan memberikan solusi sesuai standar kualitas tertinggi.</p>
    </div>
  </div>
  <p>Dalam halaman-halaman berikut, kami mengajak Anda untuk menjelajahi lebih dalam tentang perjalanan kami, nilai-nilai yang kami anut, dan bagaimana kami terus berkomitmen memberikan layanan terbaik bagi Anda, mitra berharga kami.</p>
  <p>Terima kasih atas kepercayaan dan dukungan Anda sepanjang perjalanan kami.</p>
  <p style="margin-top:8mm">Salam Hangat,<br><br><b>${co.owner}</b><br>Pemilik ${co.nama}</p>
  ${todo("Teks pengantar disalin dari compro 2024 dengan koreksi tahun PT (2019 → 2020). Mohon review dan tanda tangan owner.")}
  ${ph("FOTO PENDUKUNG (landscape): owner di peternakan / kunjungan", "height:70mm; margin-top:6mm")}
`));

// 3 — Sejarah & Timeline
pages.push(page(3, "Sejarah & Timeline", `
  <h1>Sejarah Singkat<small>Perjalanan 2014 – sekarang</small></h1>
  <p>${co.nama} pada awalnya dikenal sebagai CV Wijaya Meat sejak tahun 2014, menandai awal perjalanan kami di dunia penyediaan daging sapi berkualitas. Pada tahun 2020 perusahaan resmi berbadan hukum sebagai PT dan terus berkembang bersama mitra bisnis, hotel, dan restoran di Jabodetabek dan Jawa Barat.</p>
  <div class="tl" style="margin-top:6mm">
    <div class="ev"><b>2014 · CV Wijaya Meat</b><span>Awal perjalanan penyediaan daging sapi berkualitas.</span></div>
    <div class="ev"><b>18 April 2020 · Pendirian PT</b><span>Akta Pendirian PT Santi Wijaya Meat No. 16; pengesahan Kemenkumham 27 April 2020.</span></div>
    <div class="ev"><b>4 Mei 2020 · NIB</b><span>Nomor Induk Berusaha 0220008520949 terbit.</span></div>
    <div class="ev"><b>17 September 2021 · NKV Gudang</b><span>NKV Gudang Berpendingin ${co.nkv_gudang}, Tingkat I (Baik Sekali).</span></div>
    <div class="ev"><b>4 September 2023 · NKV RPH</b><span>NKV RPHR Jonggol ${co.nkv_rph}, Tingkat I (Baik Sekali).</span></div>
    <div class="ev"><b>27 Agustus 2024 · Penguatan manajemen</b><span>Rafi Bagus Purnomo bergabung sebagai Komisaris.</span></div>
    <div class="ev"><b>16 Desember 2024 · Tanda Daftar Gudang</b><span>PB-UMKU ${co.tanda_daftar_gudang}.</span></div>
    <div class="ev"><b>24 September 2025 · Surveilans NKV</b><span>Gudang dan RPH tetap Tingkat I (Baik Sekali).</span></div>
    <div class="ev"><b>2026 · Sertifikat Halal & Resertifikasi NKV</b><span>Halal RPH ${co.halal_rph}; NKV Gudang diperbarui.</span></div>
  </div>
  ${todo("Konfirmasi: tahun/isi tonggak 2014–2019, tanggal terbit Halal RPH, tanggal NKV Gudang baru, serta tahun Tegar Beriman Award.")}
`));

// 4 — Profil Perusahaan
pages.push(page(4, "Profil Perusahaan", `
  <h1>Profil Perusahaan</h1>
  ${kv([
    ["Nama Perusahaan", co.nama],
    ["Brand Product", co.merek],
    ["Alamat Kantor", co.alamat_kantor],
    ["RPH & Produksi", co.alamat_rph],
    ["Cold Storage", co.alamat_cold_storage],
    ["Akta Pendirian", co.akta],
    ["NIB", co.nib],
    ["NPWP", co.npwp],
    ["Sertifikat Halal PT", co.halal_pt],
    ["Sertifikat Halal RPH", co.halal_rph],
    ["NKV RPH", co.nkv_rph],
    ["NKV Gudang", co.nkv_gudang],
    ["Reg. Produk Hewan", co.reg_produk],
    ["Telepon", co.telepon],
    ["Email", co.email],
    ["Website", co.website]
  ])}
  ${todo("Konfirmasi email resmi (official@ atau widi@) dan apakah NPWP boleh dicetak.")}
`));

// 5 — Visi & Misi
pages.push(page(5, "Visi & Misi", `
  <h1>Visi & Misi</h1>
  <h2>Visi</h2>
  <p><i>"Menjadi perusahaan distribusi daging sapi terbaik dan terpercaya di Indonesia yang memberikan kepuasan kepada pelanggan dengan kualitas daging yang terbaik serta harga yang terjangkau."</i></p>
  <h2>Misi</h2>
  <ul>
    <li>Menyediakan daging sapi segar berkualitas tinggi dan sehat untuk memenuhi kebutuhan pelanggan.</li>
    <li>Memberikan layanan yang cepat, handal, dan profesional kepada pelanggan.</li>
    <li>Menjalin kemitraan yang baik dengan peternak dan produsen daging sapi untuk memastikan ketersediaan pasokan yang stabil dan berkualitas.</li>
    <li>Memastikan keamanan dan kualitas daging yang dijual dengan melakukan kontrol mutu dan keamanan pangan yang ketat.</li>
    <li>Membangun tim yang solid, profesional, dan berdedikasi tinggi dalam memberikan layanan terbaik kepada pelanggan.</li>
    <li>Mengembangkan teknologi dan inovasi terbaru dalam manajemen distribusi untuk meningkatkan efisiensi dan produktivitas perusahaan.</li>
  </ul>
  ${ph("FOTO TIM (landscape): tim berseragam putih di area produksi", "height:80mm; margin-top:8mm")}
`));

// 6 — Struktur Organisasi
pages.push(page(6, "Struktur Organisasi", `
  <h1>Struktur Organisasi</h1>
  <div class="org">
    <div class="n">KOMISARIS<small>${co.komisaris}</small></div>
    <div class="n">DIREKTUR<small>${co.direktur}</small></div>
    <div class="row">${["Produksi", "Warehouse", "Quality Control", "Marketing", "Operasional", "Finance", "Delivery"].map(d => `<div class="d">${d}</div>`).join("")}</div>
  </div>
  ${todo("Diagram detail (leader dan staf per divisi) menunggu verifikasi: PDF struktur organisasi hasil ekstraksi teks berantakan. Kirim versi gambar atau konfirmasi nama per divisi.")}
`));

// 7 — Fasilitas
pages.push(page(7, "Fasilitas", `
  <h1>Fasilitas<small>RPH Jonggol dan Cold Storage</small></h1>
  <div class="grid g2">
    <div class="card"><h3>RPH Jonggol · Produksi</h3><div class="sub">NKV ${co.nkv_rph} · Tingkat I</div><p>${co.alamat_rph}</p>${ph("FOTO RPH", "height:55mm")}</div>
    <div class="card"><h3>Cold Storage</h3><div class="sub">NKV ${co.nkv_gudang} · Tingkat I</div><p>${co.alamat_cold_storage}</p>${ph("FOTO COLD STORAGE", "height:55mm")}</div>
  </div>
  <h2>Spesifikasi Cold Storage</h2>
  ${kv([["Kapasitas", co.cold_storage.kapasitas], ["Luas bangunan", co.cold_storage.luas], ["Suhu penyimpanan", co.cold_storage.suhu], ["Perputaran produk", co.cold_storage.perputaran], ["Sistem", "Refrigerasi mekanik (kompresor dan evaporator), suhu terkontrol otomatis"]])}
  ${todo("Kapasitas dan jam operasional RPH (ekor per hari) belum ada datanya.")}
`));

// 8 — Proses Produksi
const steps = ["Penerimaan kedatangan sapi", "Pemberian pakan", "Penggiringan oleh stockman", "Proses pemandian", "Masuk jalur stunning box", "Proses stunning (sertifikat stunner)", "Proses penyembelihan oleh Juleha", "Waktu jeda 5–10 menit", "Pengangkatan dengan pengait", "Pemotongan kepala dan kaki depan", "Pengulitan, pemotongan, pemeriksaan antem mortem offal", "Pembelahan menggunakan splitting saw", "Penimbangan karkas, tenderstretch, pelayuan", "Persiapan pemeriksaan antem mortem dan boning", "Boning, penimbangan, penyimpanan di cold storage", "Proses pembekuan ABF/blast dan pengiriman"];
pages.push(page(8, "Proses Produksi", `
  <h1>Proses Produksi<small>Dari penerimaan sapi hingga pengiriman</small></h1>
  <div class="steps">${steps.map(s => `<div class="step">${s}</div>`).join("")}</div>
  ${ph("DIAGRAM POTONGAN SAPI (siluet sapi + persentase primal: Chuck 26%, Rib 9,5%, Short Loin 8%, Sirloin 9%, Round 27%, Flank 4%, Short Plate 5,5%, Brisket 6%, Fore Shank 4%)", "height:75mm; margin-top:8mm")}
  ${todo("Langkah 'antem mortem' di compro 2024 kemungkinan typo 'ante/post-mortem'. Mohon konfirmasi urutan resmi dari SOP.")}
`));

// 9 — Jaminan Mutu & Uji Lab
pages.push(page(9, "Jaminan Mutu", `
  <h1>Jaminan Mutu & Uji Lab</h1>
  <h2>Sistem Jaminan Keamanan Pangan</h2>
  <ul>
    <li>Good Warehousing Practices (GWP), Good Hygiene Practices (GHP), dan Cold Chain Management.</li>
    <li>SOP Penerimaan, Penyimpanan FIFO/FEFO (≤ -18°C), Pengeluaran, Higiene, Biosecurity Pengangkutan, dan Rantai Dingin.</li>
    <li>Pencatatan suhu cold room minimal 3 kali sehari dan program pengendalian hama berkala.</li>
    <li>Setiap produk masuk disertai Certificate of Analysis (CoA) dan sertifikat veteriner dari unit asal.</li>
  </ul>
  <h2>Pengawasan Veteriner</h2>
  <ul>
    <li>Dokter hewan penanggung jawab teknis: drh. Soetrisno, MM.</li>
    <li>Pengawasan oleh Otoritas Veteriner Dinas Perikanan dan Peternakan Kabupaten Bogor.</li>
    <li>Surveilans NKV tahunan (Tingkat I – Baik Sekali).</li>
  </ul>
  <h2>Pelatihan Higiene</h2>
  <p>Higiene sanitasi personal, penanganan rantai dingin, dan desinfeksi fasilitas bersama BBPKH Cinagara / HSC IPB University.</p>
  <h2>Uji Laboratorium</h2>
  ${ph("HASIL UJI LAB (SV dan SIG): tabel parameter, metode, hasil, nama lab", "height:55mm")}
  ${todo("Menunggu data syarat SV dan hasil lab dari SIG. Konfirmasi juga apakah nama dokter hewan boleh dicetak.")}
`));

// 10 — Meet Our Experts
pages.push(page(10, "Tim Ahli", `
  <h1>Meet Our Experts</h1>
  <p>Setiap anggota tim kami telah melalui serangkaian pelatihan dan memiliki sertifikasi yang mendukung keahlian mereka.</p>
  <div class="grid g3">
    ${co.tim.map(t => `<div class="card" style="text-align:center">${ph("FOTO", "height:42mm")}<h3 style="margin-top:2mm">${t.nama}</h3><div class="sub">${t.jabatan}</div>${ph("sertifikat", "height:12mm; font-size:7pt")}</div>`).join("")}
  </div>
  ${todo("Konfirmasi susunan tim terkini. Juleha = juru sembelih halal, Stunner = operator pemingsan hewan, AWO = Animal Welfare Officer.")}
`));

// 11 — Kebijakan Halal & Lingkungan
pages.push(page(11, "Halal & Lingkungan", `
  <h1>Kebijakan Halal</h1>
  <p>Kami berkomitmen dan bertanggung jawab untuk menghasilkan produk halal secara konsisten dan berkesinambungan dengan melakukan tindakan sebagai berikut:</p>
  <ul>
    <li>Menyediakan Sumber Daya Manusia dan sarana-prasarana yang mendukung pelaksanaan Proses Produk Halal (PPH).</li>
    <li>Mematuhi peraturan perundang-undangan tentang Penyelenggaraan Jaminan Produk Halal (JPH).</li>
    <li>Menggunakan bahan halal dan melaksanakan PPH sesuai ketentuan yang berlaku.</li>
    <li>Memastikan bahwa Kebijakan Halal ditetapkan, difahami, dan diterapkan oleh seluruh personil RPH.</li>
    <li>Mensosialisasikan dan mengkomunikasikan Kebijakan Halal kepada seluruh pihak terkait (stakeholder).</li>
    <li>Melaksanakan Kebijakan Halal secara konsisten.</li>
  </ul>
  <h1 style="margin-top:8mm">Keberlanjutan Lingkungan</h1>
  <p>Kami menyadari tanggung jawab terhadap lingkungan. Limbah produksi dikelola dengan sistem pengelolaan limbah terintegrasi dan dilakukan penanganan setiap waktu. Kami bekerja sama dengan Dinas Lingkungan Hidup setempat dalam prosedur perawatan dan pembuangan limbah sesuai regulasi yang berlaku.</p>
  ${ph("FOTO: sapi di kandang / fasilitas pengelolaan limbah", "height:70mm")}
  ${todo("Teks lingkungan diringkas dari compro 2024. Mohon cek apakah klaim 'campuran kimia khusus' tetap dipakai.")}
`));

// 12 — Distribusi & Armada
pages.push(page(12, "Distribusi", `
  <h1>Jangkauan Distribusi & Armada</h1>
  <p>${co.nama} melayani ${co.pasar}.</p>
  <div class="grid g2" style="margin-top:4mm">
    ${ph("PETA JANGKAUAN: Jabodetabek + Jawa Barat", "height:75mm")}
    ${ph("FOTO ARMADA: mobil box pendingin / thermoking", "height:75mm")}
  </div>
  <h2>Rantai Dingin</h2>
  <ul>
    <li>Pra-pendinginan boks kendaraan hingga ≤ -18°C sebelum pemuatan.</li>
    <li>Pemuatan cepat ke armada pengangkut berpendingin dengan pencatatan log pengeluaran.</li>
    <li>Integritas rantai dingin terjaga hingga titik akhir pelanggan.</li>
  </ul>
  ${todo("Isi: jumlah dan jenis armada, wilayah/kota layanan rinci, jadwal pengiriman.")}
`));

// 13 — Klien & Mitra
pages.push(page(13, "Klien & Mitra", `
  <h1>Klien & Mitra<small>Dipercaya oleh Horeka, retail, dan mitra usaha</small></h1>
  <div class="grid g4">${Array.from({ length: 16 }, (_, i) => ph(`LOGO ${i + 1}`, "height:28mm")).join("")}</div>
  ${todo("Kirim daftar nama dan logo klien/mitra yang boleh dipublikasikan, dikelompokkan Horeka / Retail / Mitra.")}
`));

// 14 — Galeri
pages.push(page(14, "Galeri", `
  <h1>Galeri Kegiatan<small>Pelatihan, audit, dan penghargaan</small></h1>
  <div class="grid g2">${["Pelatihan", "Audit NKV", "Penghargaan", "Kunjungan mitra", "Produksi", "Pengiriman"].map(l => ph(`FOTO · ${l}`, "height:68mm")).join("")}</div>
`));

// 15 — Penghargaan
pages.push(page(15, "Penghargaan", `
  <h1>Prestasi Kami<small>Kepercayaan mitra</small></h1>
  <div class="grid g2">
    <div class="card">${ph("FOTO · penerimaan penghargaan", "height:55mm")}<h3 style="margin-top:2mm">Tegar Beriman Award</h3><p>Penerima penghargaan Pelopor, Penggerak Peternakan Terbaik.</p></div>
    <div class="card">${ph("FOTO · penyerahan sertifikat halal", "height:55mm")}<h3 style="margin-top:2mm">Jaminan Halal Terbaik</h3><p>Menjadi salah satu dari 5 RPH dengan Sistem Jaminan Halal terbaik dan tercepat.</p></div>
    <div class="card">${ph("PIAGAM STUNNING", "height:55mm")}<h3 style="margin-top:2mm">Piagam Stunning</h3><p>Sertifikasi stunning untuk kesejahteraan hewan.</p></div>
    <div class="card">${ph("NKV Tingkat I", "height:55mm")}<h3 style="margin-top:2mm">NKV Tingkat I</h3><p>Gudang dan RPH berpredikat Baik Sekali pada surveilans 24 September 2025.</p></div>
  </div>
  ${todo("Isi: tahun dan penyelenggara tiap penghargaan, serta detail Piagam Stunning.")}
`));

// 16 — Legal Company
const legal = [["NIB", co.nib], ["Izin Usaha", ""], ["Registrasi Produk Hewan", co.reg_produk], ["Sertifikat Merek", ""], ["Sertifikat Halal PT", co.halal_pt], ["Sertifikat Halal RPH", co.halal_rph], ["NKV Gudang Level 1", co.nkv_gudang], ["NKV RPH Level 1", co.nkv_rph]];
pages.push(page(16, "Legalitas", `
  <h1>Legal Company</h1>
  <div class="grid g4">${legal.map(([l, v]) => `<div>${ph("SCAN", "height:58mm")}<div class="tag" style="margin-top:2mm">${l}</div><div style="font-size:7pt;color:#555">${v}</div></div>`).join("")}</div>
  ${todo("Scan sertifikat sebaiknya dipotong/diburamkan pada data sensitif (QR, NIK). Konfirmasi dokumen mana yang boleh tampil.")}
`));

// 17–22 — Produk
products.forEach((grp, i) => {
  const n = 17 + i;
  pages.push(page(n, "Produk", `
    <h1>${grp.judul}</h1>
    <p>${grp.intro}</p>
    <div class="grid g2" style="margin-top:3mm">${grp.items.map(p => `
      <div class="card" style="height:62mm">
        ${ph(`FOTO ${p.nama.toUpperCase()}`, "height:30mm")}
        <h3 style="margin-top:2mm">${p.nama} <span class="tag" style="float:right">${grp.kategori}</span></h3>
        <div class="sub">${p.id || "&nbsp;"}</div>
        <div class="use"><b>Cocok untuk:</b> ${p.cocok}</div>
      </div>`).join("")}
    </div>
  `));
});

// 23 — Kontak
pages.push(page(23, "Kontak", `
  <h1>Hubungi Kami</h1>
  ${kv([["Call center", co.telepon], ["Email", co.email], ["Website", co.website], ["Kantor", co.alamat_kantor], ["RPH & Produksi", co.alamat_rph]])}
  <div class="grid g2" style="margin-top:10mm">
    <div style="text-align:center">${ph("QR KATALOG PRODUK", "height:50mm")}<p style="text-align:center">Scan untuk katalog lengkap</p></div>
    <div style="text-align:center">${ph("QR COMPANY PROFILE", "height:50mm")}<p style="text-align:center">Scan untuk unduh Company Profile</p></div>
  </div>
  ${todo("Konfirmasi: nomor kontak per divisi (Marketing, Legal Information, Product Knowledge) masih dipakai atau cukup satu nomor utama?")}
`));

// 24 — Cover belakang
pages.push(`
<section class="page cover" id="p24">
  <div class="gold" style="background: linear-gradient(315deg, var(--gold) 0 40%, transparent 40%)"></div>
  <div class="logo" style="top: 100mm; width: 70mm; height: 36mm">${ph("LOGO WIJAYA MEAT", "height:100%")}</div>
  <div style="position:absolute; left:0; right:0; top:150mm; text-align:center"><div style="font-size:15pt;font-weight:bold">${co.nama.toUpperCase()}</div><div style="font-style:italic;margin-top:3mm">"${co.tagline}"</div></div>
  <div class="addr" style="left:0; right:0; text-align:center">${co.website} · © ${new Date().getFullYear()} ${co.nama}</div>
</section>`);

export default pages;

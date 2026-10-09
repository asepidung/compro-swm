import { readFileSync, existsSync } from "node:fs";
import QRCode from "qrcode";

const read = (p) => JSON.parse(readFileSync(new URL(p, import.meta.url)));
const co = read("../data/company.json");
const products = read("../data/products.json");
const clients = read("../data/clients.json");

const A = (p) => `../assets/${p}`;
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const has = (p) => existsSync(new URL(`../assets/${p}`, import.meta.url));
const bg = (p, extra = "") => `style="background-image:url('${A(p)}');${extra}"`;
const D = (t = "Data contoh") => `<span class="dummy">${t}</span>`;

const I = {
  shield: '<path d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3z"/><path d="M9 12l2 2 4-4"/>',
  snow: '<path d="M12 2v20M4.2 7l15.6 10M4.2 17L19.8 7"/><path d="M9.5 3.5L12 6l2.5-2.5M9.5 20.5L12 18l2.5 2.5"/>',
  truck: '<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  flask: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3"/><path d="M7.5 15h9"/>',
  award: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/>',
  trophy: '<path d="M8 4h8v5a4 4 0 01-8 0V4zM8 6H4v1a4 4 0 004 4M16 6h4v1a4 4 0 01-4 4M12 13v4M8 21h8M10 17h4"/>',
  leaf: '<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15"/><path d="M5 19c3-5 6-8 11-10"/>',
  users: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5"/><circle cx="17" cy="9" r="2.5"/><path d="M16 15c3 0 5 2 5 5"/>',
  pin: '<path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  box: '<path d="M3 7l9-4 9 4v10l-9 4-9-4V7z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
  coin: '<circle cx="12" cy="12" r="9"/><path d="M9 9.5c0-1.4 1.3-2.5 3-2.5s3 1 3 2.3-1 2-3 2.4-3 1-3 2.4 1.3 2.4 3 2.4 3-1 3-2.4M12 5v2M12 17v2"/>',
  cart: '<path d="M3 4h3l2.5 11h9L20 8H7"/><circle cx="10" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>',
  hex: '<path d="M7 4h10l5 8-5 8H7l-5-8 5-8z"/>',
  recycle: '<path d="M7 4l-4 7h5M17 20l4-7h-5M8 4h6l3 5M16 20h-6l-3-5"/>'
};
const ic = (n, cls = "") => `<svg class="ico ${cls}" viewBox="0 0 24 24">${I[n]}</svg>`;

const page = (n, section, body, cls = "") => `
<section class="page ${cls}" id="p${n}">
  <div class="hd"><span><i></i>${section}</span><img src="${A("logo/wijaya-yellow.png")}" alt=""></div>
  <div class="pg">${body}</div>
  <div class="ft"><span><b>${co.nama}</b> · Company Profile</span><span class="no">${String(n).padStart(2, "0")} / 24</span></div>
</section>`;

const pages = [];

// 1 — Cover
pages.push(`
<section class="page cover" id="p1">
  <div class="bg" ${bg("img/cattle-fence.jpg")}></div><div class="shade"></div>
  <img class="logo" src="${A("logo/wijaya-yellow.png")}" alt="Wijaya Meat">
  <div class="badges"><div class="nk"><img src="${A("logo/nkv-rph.png")}"></div><div class="nk"><img src="${A("logo/nkv-gudang.png")}"></div><div class="hl"><img src="${A("logo/halal.png")}"></div></div>
  <div class="ttl">
    <div class="k">Edisi 2026</div>
    <h1>Company<br>Profile</h1>
    <div class="nm">${co.nama.toUpperCase()}</div>
    <div class="tg">“${co.tagline}”</div>
  </div>
  <div class="addr"><span>RPH Jonggol · Kabupaten Bogor · Jawa Barat</span><span>${co.website}</span></div>
  <div class="gbar"></div>
</section>`);

// 2 — Kata Pengantar
pages.push(page(2, "Kata Pengantar", `
  <div class="grid" style="grid-template-columns: 74mm 1fr; gap: 9mm; align-items: start; margin-top: 4mm">
    <div>
      <div class="photo" ${bg("img/owner-farm.jpg", "height:118mm")}></div>
      <div class="card" style="margin-top:4mm; background: var(--char); color:#fff; border:none">
        <div style="font-weight:800; font-size:10.5pt">${co.owner}</div>
        <div class="small" style="color:#cfc9be">Pemilik & Direktur Utama<br>${co.nama}</div>
      </div>
    </div>
    <div>
      <div class="kick">Sambutan</div>
      <h1>Selamat datang di <em>Wijaya Meat</em></h1>
      <div class="rule"></div>
      <p>Salam Hormat,</p>
      <p>Selamat datang di <b>${co.nama}</b>, tempat di mana komitmen kami untuk memenuhi kebutuhan Anda menjadi prioritas utama.</p>
      <p>Sejak tahun 2014, ketika kami masih bernama CV. Wijaya Meat, perjalanan kami sebagai penyedia daging sapi berkualitas dimulai. Pada tahun 2020, kami melangkah lebih jauh dengan resmi menjadi <b>${co.nama}</b>, menghadirkan kualitas dan layanan yang lebih baik.</p>
      <p>Kami bangga menyediakan daging sapi berkualitas tinggi untuk pasar modern, sektor perhotelan, dan restoran. Slogan kami, <i>“${co.tagline},”</i> mencerminkan tekad untuk selalu hadir dan memberikan solusi sesuai standar kualitas tertinggi.</p>
      <p>Di halaman-halaman berikut, kami mengajak Anda mengenal perjalanan, nilai-nilai, dan komitmen kami sebagai mitra yang dapat Anda andalkan.</p>
      <p>Terima kasih atas kepercayaan Anda.</p>
      <p style="margin-top:8mm; margin-bottom:1mm">Salam Hangat,</p>
      <div style="font-family: 'DejaVu Serif', serif; font-style: italic; font-size: 16pt; color: var(--gold-d); margin: 3mm 0 1mm">${co.owner.split(" ").slice(0,2).join(" ")}</div>
      <div class="small">${co.owner} · Pemilik ${co.nama}</div>
    </div>
  </div>
`, "cream"));

// 3 — Sejarah & Timeline
const tl = [
  ["2014", "CV Wijaya Meat", "Awal perjalanan penyediaan daging sapi berkualitas.", 1],
  ["2020", "Berdiri sebagai PT", "Akta Pendirian No. 16 (18 April 2020); pengesahan Kemenkumham 27 April 2020; NIB terbit 4 Mei 2020.", 1],
  ["2021", "NKV Gudang Tingkat I", `Gudang berpendingin memperoleh NKV ${co.nkv_gudang} (17 September 2021).`, 0],
  ["2023", "NKV RPH Tingkat I", `RPHR Jonggol memperoleh NKV ${co.nkv_rph} (4 September 2023).`, 0],
  ["2024", "Penguatan manajemen", "Rafi Bagus Purnomo bergabung sebagai Komisaris (Agustus); Tanda Daftar Gudang terbit (Desember).", 0],
  ["2025", "Surveilans NKV", "Gudang dan RPH tetap berpredikat Tingkat I (Baik Sekali), 24 September 2025.", 0],
  ["2026", "Halal RPH & resertifikasi", `Sertifikat Halal RPH ${co.halal_rph}; NKV Gudang diperbarui.`, 1]
];
pages.push(page(3, "Sejarah Singkat", `
  <div class="grid" style="grid-template-columns: 1fr 62mm; gap: 8mm; margin-top: 3mm">
    <div>
      <div class="kick">Sejarah singkat</div>
      <h1>Dari CV hingga <em>PT ber-NKV</em></h1>
      <div class="rule"></div>
      <p class="lead" style="font-size:9.5pt">Berawal dari CV Wijaya Meat pada 2014, kami tumbuh menjadi perusahaan penyedia daging sapi dengan fasilitas RPH dan cold storage bersertifikat NKV Tingkat I dan jaminan halal.</p>
      <div class="tl" style="margin-top: 8mm">
        ${tl.map(([y, t, d, hi]) => `<div class="ev ${hi ? "hi" : ""}"><div class="y">${y}</div><b>${t}</b><span>${d}</span></div>`).join("")}
      </div>
    </div>
    <div style="display:flex; flex-direction:column; gap:4mm">
      <div class="photo" ${bg("img/cattle-grass.jpg", "height:70mm")}></div>
      <div class="photo" ${bg("img/rph-gate.jpg", "height:100mm; background-position: 50% 30%")}></div>
      <div class="card" style="background:var(--gold); border:none"><div class="stat"><b>12 tahun</b><span style="color:#4a3600">sejak CV Wijaya Meat berdiri (2014)</span></div></div>
    </div>
  </div>
`));

// 4 — Profil Perusahaan
pages.push(page(4, "Profil Perusahaan", `
  <div class="kick">Profil perusahaan</div>
  <h1>Fakta singkat <em>${co.merek}</em></h1><div class="rule"></div>
  <div class="grid g4" style="margin: 4mm 0 6mm">
    <div class="card stat"><b>2014</b><span>Berdiri sebagai CV</span></div>
    <div class="card stat"><b>${co.karyawan}</b><span>Karyawan</span></div>
    <div class="card stat"><b>28 Ton</b><span>Kapasitas cold storage</span></div>
    <div class="card stat"><b>≤ -18°C</b><span>Suhu penyimpanan</span></div>
  </div>
  <div class="grid g2" style="gap:7mm">
    <div>
      <h2>Identitas</h2>
      <table class="kv">
        <tr><td>Nama</td><td>${co.nama}</td></tr><tr><td>Brand</td><td>${co.merek}</td></tr>
        <tr><td>Kantor</td><td>${co.alamat_kantor}</td></tr>
        <tr><td>RPH & produksi</td><td>${co.alamat_rph}</td></tr>
        <tr><td>Cold storage</td><td>Perum Asabri Blok B No. 20, Sukasirna</td></tr>
        <tr><td>Telepon</td><td>${co.telepon}</td></tr><tr><td>Email</td><td>${co.email}</td></tr><tr><td>Website</td><td>${co.website}</td></tr>
      </table>
    </div>
    <div>
      <h2>Legalitas & sertifikasi</h2>
      <table class="kv">
        <tr><td>Akta pendirian</td><td>No. 16, 18 April 2020</td></tr>
        <tr><td>NIB</td><td>${co.nib}</td></tr><tr><td>NPWP</td><td>${co.npwp}</td></tr>
        <tr><td>Halal PT</td><td>${co.halal_pt}</td></tr><tr><td>Halal RPH</td><td>${co.halal_rph}</td></tr>
        <tr><td>NKV RPH</td><td>${co.nkv_rph}</td></tr><tr><td>NKV Gudang</td><td>${co.nkv_gudang}</td></tr>
        <tr><td>Reg. produk hewan</td><td>${co.reg_produk}</td></tr>
      </table>
    </div>
  </div>
  <div class="photo grow" ${bg("img/team-white.jpg", "background-position: 50% 35%")}></div>
`));

// 5 — Visi & Misi
const misi = [
  ["box", "Menyediakan daging sapi segar berkualitas tinggi dan sehat untuk memenuhi kebutuhan pelanggan."],
  ["truck", "Memberikan layanan yang cepat, handal, dan profesional kepada pelanggan."],
  ["users", "Menjalin kemitraan dengan peternak dan produsen untuk memastikan pasokan yang stabil dan berkualitas."],
  ["shield", "Memastikan keamanan dan kualitas daging melalui kontrol mutu dan keamanan pangan yang ketat."],
  ["award", "Membangun tim yang solid, profesional, dan berdedikasi tinggi dalam melayani pelanggan."],
  ["gear", "Mengembangkan teknologi dan inovasi terbaru dalam manajemen distribusi untuk efisiensi dan produktivitas."]
];
pages.push(page(5, "Visi & Misi", `
  <div class="kick">Arah kami</div>
  <h1>Visi & <em>Misi</em></h1><div class="rule"></div>
  <div class="card" style="background: var(--char); color:#fff; border:none; padding: 8mm; position:relative; margin-top:4mm">
    <div style="display:flex; gap:4mm; align-items:center; margin-bottom:3mm; color: var(--gold)">${ic("eye")}<b style="letter-spacing:.2em; font-size:8pt">VISI</b></div>
    <div style="font-size:13pt; line-height:1.5; font-weight:600">“Menjadi perusahaan distribusi daging sapi terbaik dan terpercaya di Indonesia yang memberikan kepuasan kepada pelanggan dengan kualitas daging yang terbaik serta harga yang terjangkau.”</div>
  </div>
  <h2 style="margin-top:8mm">${""}Misi</h2>
  <div class="grid g2" style="gap:4mm">
    ${misi.map(([i, t], k) => `<div class="card" style="display:flex; gap:3.5mm; align-items:flex-start"><div class="num">${k + 1}</div><div><div style="color:var(--gold-d)">${ic(i)}</div><p style="margin:1.5mm 0 0; font-size:8.4pt; line-height:1.5">${t}</p></div></div>`).join("")}
  </div>
  <div class="photo grow" ${bg("img/cattle-yard.jpg")}></div>
`));

// 6 — Struktur Organisasi
const divs = [
  ["gear", "Produksi", "Leader Produksi"], ["box", "Warehouse", "Arif Efendi"], ["flask", "Quality Control", "M. Taufik"], ["cart", "Marketing", "Yani Muryani, S.E."],
  ["pin", "Operasional", "—"], ["coin", "Finance", "—"], ["truck", "Delivery", "—"]
];
pages.push(page(6, "Struktur Organisasi", `
  <div class="kick">Organisasi</div>
  <h1>Tim di balik <em>kualitas</em></h1><div class="rule"></div>
  <div class="org" style="margin-top:8mm">
    <div class="top"><b>${co.komisaris}</b><span>Komisaris</span></div>
    <div class="vl"></div>
    <div class="top g"><b>${co.direktur}</b><span>Direktur Utama</span></div>
    <div class="vl"></div>
    <div class="hl"></div>
    <div class="row" style="margin-top:0; padding-top:7mm">${divs.slice(0, 4).map(([i, t, n]) => `<div class="dv">${ic(i)}<b>${t}</b><span>${n}</span></div>`).join("")}</div>
    <div class="row r3">${divs.slice(4).map(([i, t, n]) => `<div class="dv">${ic(i)}<b>${t}</b><span>${n}</span></div>`).join("")}</div>
  </div>
  <div class="grid g3" style="margin-top:10mm">
    <div class="card stat"><b>${co.karyawan}</b><span>Karyawan: manajemen 2, logistik & gudang 6, QC 2, administrasi 2</span></div>
    <div class="card"><h3>Penanggung jawab teknis</h3><div class="small">${co.komisaris}, Komisaris</div></div>
    <div class="card"><h3>Dokter hewan</h3><div class="small">drh. Soetrisno, MM<br>(kontrak 2026–2031)</div></div>
  </div>
  <div class="photo grow" ${bg("img/team-white.jpg", "background-position: 50% 40%")}></div>
  <div style="margin-top:3mm">${D("Nama staf per divisi: sebagian contoh, mohon verifikasi")}</div>
`, "cream"));

// 7 — Fasilitas
pages.push(page(7, "Fasilitas", `
  <div class="kick">Fasilitas</div>
  <h1>RPH modern & <em>cold storage</em> terkontrol</h1><div class="rule"></div>
  <div class="grid g2" style="margin-top:5mm">
    <div class="card" style="padding:0; overflow:hidden">
      <div class="photo" ${bg("img/rph-gate.jpg", "height:78mm; border-radius:0; background-position: 50% 35%")}></div>
      <div style="padding:5mm"><span class="chip gr">NKV Tingkat I</span><h3 style="font-size:12pt; margin-top:2mm">RPH Jonggol · Produksi</h3><div class="small">${co.nkv_rph}</div><p style="margin-top:2mm; font-size:8pt">${co.alamat_rph}</p></div>
    </div>
    <div class="card" style="padding:0; overflow:hidden">
      <div class="photo" style="height:78mm; border-radius:0; background: radial-gradient(circle at 70% 25%, #5ec0e0 0, transparent 45%), linear-gradient(160deg,#0e3a52,#12202a); display:flex; align-items:center; justify-content:center; color:#fff; flex-direction:column"><div style="color:#9ddcf0; font-size:34pt; font-weight:800; line-height:1">≤ -18°C</div><div style="font-size:8pt; letter-spacing:.25em; margin-top:2mm; color:#cdeaf5">SUHU TERKONTROL OTOMATIS</div></div>
      <div style="padding:5mm"><span class="chip gr">NKV Tingkat I</span><h3 style="font-size:12pt; margin-top:2mm">Cold Storage</h3><div class="small">${co.nkv_gudang}</div><p style="margin-top:2mm; font-size:8pt">${co.alamat_cold_storage}</p></div>
    </div>
  </div>
  <div class="grid g4" style="margin-top:6mm">
    <div class="card stat"><b>28 Ton</b><span>Kapasitas</span></div><div class="card stat"><b>80 m²</b><span>Luas bangunan</span></div>
    <div class="card stat"><b>1–2 Ton</b><span>Perputaran per hari</span></div><div class="card stat"><b>FIFO/FEFO</b><span>Rotasi stok</span></div>
  </div>
  <h2 style="margin-top:7mm">Standar fasilitas</h2>
  <div class="grid g2" style="gap:3mm">
    ${["Palet plastik food grade, jarak dari lantai minimal 15 cm", "Jarak penumpukan dari dinding 10–15 cm dan dari evaporator minimal 50 cm", "Anteroom tertutup untuk bongkar muat (≤ 12–15°C)", "Pencatatan suhu 3 kali sehari dan pengendalian hama berkala"].map(t => `<div style="display:flex; gap:3mm; font-size:8.2pt; line-height:1.45"><span style="color:var(--green)">${ic("shield")}</span>${t}</div>`).join("")}
  </div>
`));

// 8 — Proses Produksi
const steps = [
  [1, "Penerimaan sapi", "Sapi diterima sesuai standar jaminan halal."], [1, "Pemberian pakan", "Pakan berkualitas sebelum proses."], [1, "Penggiringan", "Oleh stockman dengan prinsip kesejahteraan hewan."], [1, "Pemandian", "Sapi dibersihkan sebelum tahap berikutnya."],
  [2, "Stunning box", "Sapi masuk jalur khusus stunning."], [2, "Stunning", "Dilakukan stunner bersertifikat dengan aman."], [2, "Penyembelihan", "Oleh juru sembelih halal (Juleha)."], [2, "Waktu jeda", "5–10 menit untuk pastikan proses optimal."],
  [2, "Pengangkatan", "Dengan pengait setelah penyembelihan."], [2, "Pemotongan kepala & kaki", "Dilakukan dengan presisi."], [2, "Pengulitan & pemeriksaan", "Pemeriksaan postmortem karkas dan offal."], [2, "Pembelahan", "Menggunakan splitting saw."],
  [3, "Pelayuan karkas", "Penimbangan, tenderstretch, dan pelayuan."], [3, "Boning", "Persiapan, pemeriksaan, dan boning."], [3, "Cold storage", "Penimbangan dan penyimpanan sesuai suhu."], [3, "Pembekuan & kirim", "Blast freezer lalu pengiriman berpendingin."]
];
pages.push(page(8, "Proses Produksi", `
  <div class="kick">Proses produksi</div>
  <h1>Dari kandang hingga <em>meja Anda</em></h1><div class="rule"></div>
  <div style="display:flex; gap:5mm; margin: 2mm 0 7mm"><span class="chip">1 · Penerimaan</span><span class="chip" style="background:#f6d3d1;color:#7a1f1f">2 · Pemotongan</span><span class="chip" style="background:#d4eaf4;color:#1a5670">3 · Boning & rantai dingin</span></div>
  <div class="proc">${steps.map(([ph, t, d], i) => `<div class="st ph${ph}"><div class="num">${i + 1}</div><h3 style="margin-top:4.5mm; font-size:8.6pt">${t}</h3><p style="margin-top:0">${d}</p></div>`).join("")}</div>
  <div class="card" style="background:#111; border:none; margin-top:7mm; display:grid; grid-template-columns: 78mm 1fr; gap:6mm; align-items:center; padding:4mm">
    <div class="photo" ${bg("img/cow-diagram.jpg", "height:52mm; background-size:contain; background-repeat:no-repeat; border-radius:2mm")}></div>
    <div style="color:#fff"><h3 style="color:var(--gold)">Potongan primal sapi</h3><p style="font-size:8pt; color:#d9d3c8">Chuck 26% · Round 27% · Sirloin 9% · Rib 9,5% · Short Loin 8% · Short Plate 5,5% · Brisket 6% · Fore Shank 4% · Flank 4%.</p><p class="small" style="color:#a9a398; margin:0">Persentase indikatif, dapat bervariasi tiap ekor.</p></div>
  </div>
`));

// 9 — Jaminan Mutu & Uji Lab
pages.push(page(9, "Jaminan Mutu", `
  <div class="kick">Jaminan mutu</div>
  <h1>Aman, higienis, <em>terlacak</em></h1><div class="rule"></div>
  <div class="grid g3" style="margin: 4mm 0 6mm">
    <div class="card"><div style="color:var(--gold-d)">${ic("shield")}</div><h3 style="margin-top:2mm">GWP · GHP</h3><p class="small">Good Warehousing Practices dan Good Hygiene Practices pada seluruh area gudang dan RPH.</p></div>
    <div class="card"><div style="color:var(--gold-d)">${ic("snow")}</div><h3 style="margin-top:2mm">Rantai dingin</h3><p class="small">Suhu ≤ -18°C dicatat 3 kali sehari. Kedatangan produk ditolak jika suhu > -15°C.</p></div>
    <div class="card"><div style="color:var(--gold-d)">${ic("award")}</div><h3 style="margin-top:2mm">Veteriner</h3><p class="small">Pengawasan Otoritas Veteriner. Dokter hewan penanggung jawab teknis: drh. Soetrisno, MM.</p></div>
  </div>
  <h2>Program uji laboratorium</h2>
  <div class="grid g2" style="gap:4mm; margin-bottom:3mm">
    <div class="card" style="border-top:2mm solid var(--gold)"><div style="display:flex; gap:3mm; align-items:center; color:var(--gold-d)">${ic("flask")}<span class="chip">3 bulan sekali</span></div><h3 style="margin-top:2mm; font-size:10.5pt">Daging & jeroan</h3><p class="small" style="margin:0">Diuji di <b>BPMSPH Kabupaten Bogor</b>, laboratorium penguji terakreditasi KAN.</p></div>
    <div class="card" style="border-top:2mm solid var(--green)"><div style="display:flex; gap:3mm; align-items:center; color:var(--green)">${ic("flask")}<span class="chip gr">Setahun sekali</span></div><h3 style="margin-top:2mm; font-size:10.5pt">Air, karyawan & peralatan</h3><p class="small" style="margin:0">Diuji di <b>SIG</b>, laboratorium penguji terakreditasi KAN.</p></div>
  </div>
  <table class="kv" style="margin-bottom:3mm">
    <tr style="font-size:7pt; color:var(--mute); text-transform:uppercase; letter-spacing:.1em"><td style="color:var(--mute)">Objek uji</td><td style="width:42mm; font-weight:400; color:var(--mute)">Frekuensi</td><td style="width:62mm; font-weight:400; color:var(--mute)">Laboratorium</td></tr>
    <tr><td style="color:var(--ink); font-weight:600">Daging</td><td>3 bulan sekali</td><td>BPMSPH Kab. Bogor (KAN)</td></tr>
    <tr><td style="color:var(--ink); font-weight:600">Jeroan</td><td>3 bulan sekali</td><td>BPMSPH Kab. Bogor (KAN)</td></tr>
    <tr><td style="color:var(--ink); font-weight:600">Air</td><td>Setahun sekali</td><td>SIG (KAN)</td></tr>
    <tr><td style="color:var(--ink); font-weight:600">Karyawan</td><td>Setahun sekali</td><td>SIG (KAN)</td></tr>
    <tr><td style="color:var(--ink); font-weight:600">Peralatan</td><td>Setahun sekali</td><td>SIG (KAN)</td></tr>
  </table>
  <p class="small">Setiap produk masuk disertai Certificate of Analysis (CoA) dan sertifikat veteriner dari unit asal. Hasil uji terbaru tersedia atas permintaan.</p>
  <h2 style="margin-top:6mm">Alur penyimpanan gudang berpendingin</h2>
  <div style="display:flex; gap:2mm; align-items:stretch">
    ${["Penerimaan & cek dokumen", "Bongkar cepat di anteroom", "Penimbangan & pelabelan", "Penyimpanan ≤ -18°C", "Monitoring suhu", "Dispatch FIFO", "Muat armada pendingin"].map((t, i) => `<div class="card" style="flex:1; padding:3mm 2mm; text-align:center"><div class="num" style="margin:0 auto 2mm; width:7mm; height:7mm; font-size:7.5pt">${i + 1}</div><div style="font-size:6.8pt; line-height:1.35; font-weight:600">${t}</div></div>`).join("")}
  </div>
  <div class="photo grow" ${bg("img/team-white.jpg", "background-position: 50% 12%")}></div>
`));

// 10 — Tim ahli
const initials = (n) => n.split(" ").map(w => w[0]).slice(0, 2).join("");
pages.push(page(10, "Tim Ahli", `
  <div class="kick">Meet our experts</div>
  <h1>Tim bersertifikat & <em>berpengalaman</em></h1><div class="rule"></div>
  <p class="lead" style="font-size:9.3pt">Setiap anggota tim telah melalui pelatihan dan memiliki sertifikasi sesuai bidangnya, untuk memastikan setiap langkah dilakukan dengan keahlian dan keterampilan profesional.</p>
  <div class="grid g4" style="gap:5mm 4mm; margin-top:4mm">
    ${co.tim.map(t => { const f = `team/${slug(t.nama)}.jpg`; return `<div style="text-align:center">
      <div class="hex" style="width:36mm; height:36mm; margin:0 auto 3mm; background:${has(f) ? `url('${A(f)}') center/cover` : "linear-gradient(135deg,#f4b223,#c98a00)"}; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:17pt; color:#1d1b19">${has(f) ? "" : initials(t.nama)}</div>
      <h3 style="margin:0">${t.nama}</h3><span class="chip dk" style="margin-top:1.5mm">${t.jabatan}</span></div>`; }).join("")}
    <div class="card" style="grid-column: span 1; background: var(--gold-l); border: none; padding: 3.5mm"><div style="font-size:7pt; line-height:1.55"><b>Istilah</b><br>Juleha: juru sembelih halal<br>Stunner: operator pemingsan hewan<br>AWO: Animal Welfare Officer<br>Penyelia Halal: penjamin produk halal</div></div>
  </div>
  <div class="grid g2 grow" style="grid-template-rows:1fr">
    <div class="photo" ${bg("img/team-white.jpg", "background-position: 50% 35%")}></div>
    <div class="card" style="display:flex; flex-direction:column; justify-content:center"><div class="stat"><b>100%</b><span>Tim produksi inti memegang sertifikat kompetensi (juleha, stunner, AWO, penyelia halal)</span></div><div style="margin-top:3mm">${D("Angka contoh")}</div></div>
  </div>
`, "cream"));

// 11 — Halal & Lingkungan
const halal = ["Menyediakan SDM serta sarana dan prasarana yang mendukung Proses Produk Halal (PPH).", "Mematuhi peraturan perundang-undangan tentang Jaminan Produk Halal (JPH).", "Menggunakan bahan halal dan melaksanakan PPH sesuai ketentuan yang berlaku.", "Memastikan Kebijakan Halal ditetapkan, dipahami, dan diterapkan seluruh personel RPH.", "Mensosialisasikan Kebijakan Halal kepada seluruh pihak terkait (stakeholder).", "Melaksanakan Kebijakan Halal secara konsisten."];
pages.push(page(11, "Halal & Lingkungan", `
  <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8mm">
    <div style="flex:1"><div class="kick">Kebijakan halal</div><h1>Komitmen <em>halal</em> yang konsisten</h1><div class="rule"></div></div>
    <img src="${A("logo/halal.png")}" style="width:50mm; margin-top:4mm">
  </div>
  <div class="grid g2" style="margin-top:3mm; gap:3.5mm">
    ${halal.map((t, i) => `<div class="card" style="display:flex; gap:3.5mm; align-items:flex-start; padding:3.8mm"><div class="num">${i + 1}</div><p style="margin:0; font-size:8.2pt; line-height:1.5">${t}</p></div>`).join("")}
  </div>
  <div class="card" style="margin-top:6mm; display:flex; gap:4mm; align-items:center; background:#e6f4ec; border-color:#bfe3cf">
    <img src="${A("logo/nkv-rph.png")}" style="height:20mm"><div class="small" style="color:#11613c; line-height:1.55"><b style="font-size:9pt">Sertifikat halal</b><br>PT: ${co.halal_pt}<br>RPH: ${co.halal_rph}</div>
  </div>
  <div style="margin-top:8mm"><div class="kick">Keberlanjutan</div><h1 style="font-size:20pt">Tanggung jawab <em>lingkungan</em></h1></div>
  <div class="grid" style="grid-template-columns: 1fr 70mm; gap:6mm; margin-top:3mm">
    <div><p style="font-size:8.5pt">Limbah produksi dikelola dengan sistem terintegrasi dan ditangani setiap saat. Kami bekerja sama dengan Dinas Lingkungan Hidup setempat dalam prosedur perawatan dan pembuangan limbah sesuai regulasi yang berlaku.</p>
      <div style="display:flex; gap:3mm; align-items:center; color:var(--green); font-weight:700; font-size:8.5pt">${ic("recycle")}Pengelolaan limbah sesuai regulasi</div></div>
    <div class="photo" ${bg("img/cattle-pen.jpg", "height:92mm")}></div>
  </div>
`));

// 12 — Distribusi & Armada
const dest = clients.wilayah;
pages.push(page(12, "Distribusi", `
  <div class="kick">Distribusi & armada</div>
  <h1>Menjangkau <em>hampir seluruh Indonesia</em></h1><div class="rule"></div>
  ${D("Armada: cek ulang")} <span class="small" style="margin-left:2mm">Wilayah pada diagram berdasarkan daftar pelanggan; cakupan lain tersedia sesuai permintaan.</span>
  <div class="card" style="margin-top:4mm; padding:0; overflow:hidden; background:linear-gradient(160deg,#fff,#f6efde)">
    <svg viewBox="0 0 180 120" style="width:100%; display:block">
      ${dest.map((d) => `<line x1="90" y1="62" x2="${d.x}" y2="${d.y}" stroke="#f4b223" stroke-width="1.2" stroke-dasharray="3 2"/>`).join("")}
      ${dest.map((d) => `<circle cx="${d.x}" cy="${d.y}" r="${d.core ? 6 : 4.2}" fill="${d.core ? "#f4b223" : "#2a2725"}" stroke="#2a2725" stroke-width="${d.core ? 1.4 : 0}"/><text x="${d.x}" y="${d.y + (d.core ? 12 : 10)}" text-anchor="middle" font-size="5.2" font-weight="${d.core ? 800 : 700}" fill="#1d1b19" font-family="PJS">${d.n}</text>`).join("")}
      <circle cx="90" cy="62" r="9" fill="#f4b223"/><circle cx="90" cy="62" r="3.2" fill="#1d1b19"/>
      <text x="90" y="82" text-anchor="middle" font-size="6.2" font-weight="800" fill="#1d1b19" font-family="PJS">RPH Jonggol</text>
    </svg>
  </div>
  <div class="grid g4" style="margin-top:5mm">
    <div class="card stat"><b>${co.armada}</b><span>Unit armada berpendingin</span></div>
    <div class="card stat"><b>${clients.provinsi}+</b><span>Provinsi terlayani</span></div>
    <div class="card stat"><b>1–2 Ton</b><span>Perputaran harian</span></div>
    <div class="card stat"><b>≤ -18°C</b><span>Suhu saat muat</span></div>
  </div>
  <div class="grid g2" style="margin-top:6mm; gap:6mm">
    <div><h2>Standar pengiriman</h2>
      ${["Pra-pendinginan boks kendaraan hingga ≤ -18°C sebelum muat", "Pemuatan cepat ke mobil box pendingin / thermoking", "Surat jalan dan log pengeluaran barang tercatat", "Integritas rantai dingin terjaga hingga titik akhir"].map(t => `<div style="display:flex; gap:3mm; margin-bottom:2.4mm; font-size:8.3pt; line-height:1.45"><span style="color:var(--gold-d)">${ic("truck")}</span>${t}</div>`).join("")}
    </div>
    <div><h2>Segmen pelanggan</h2>
      <span class="chip">Horeka</span><span class="chip">Retail</span><span class="chip">Pasar tradisional</span><span class="chip">Mitra usaha</span><span class="chip">Pengolah makanan</span>
      <div class="photo" ${bg("img/meat-pile.jpg", "height:34mm; margin-top:4mm")}></div></div>
  </div>
`, "cream"));

// 13 — Klien & Mitra
pages.push(page(13, "Klien & Mitra", `
  <div class="kick">Klien & mitra</div>
  <h1>Dipercaya <em>jaringan ritel</em> dan horeka</h1><div class="rule"></div>
  <div class="grid g2" style="margin-top:5mm; gap:5mm">
    ${clients.utama.map((c, i) => `<div class="card" style="background:var(--char); color:#fff; border:none; padding:8mm; position:relative; overflow:hidden">
      <div class="num" style="margin-bottom:4mm">${i + 1}</div>
      <div class="kick" style="color:var(--gold)">Pelanggan utama</div>
      <div style="font-size:19pt; font-weight:800; line-height:1.1">${c.n}</div>
      <div style="font-size:8pt; color:#cfc9be; margin-top:1.5mm">${c.d}</div></div>`).join("")}
  </div>
  <div class="grid g3" style="margin-top:5mm; gap:3mm">
    <div class="card stat"><b>${clients.outlet}</b><span>Titik pengiriman jaringan ritel & restoran</span></div>
    <div class="card stat"><b>${clients.provinsi}+</b><span>Provinsi terlayani</span></div>
    <div class="card stat"><b>${co.armada}</b><span>Armada berpendingin</span></div>
  </div>
  ${clients.grup.map(g => `<h2 style="margin-top:6mm">${g.grup}</h2><div style="display:flex; flex-wrap:wrap; gap:2mm">${g.items.map(n => `<div class="card" style="padding:2.6mm 4.2mm; font-weight:700; font-size:8.4pt; border-radius:10mm">${n}</div>`).join("")}</div>`).join("")}
  <div class="grow" style="display:flex; align-items:flex-end"><div class="todo-note" style="width:100%">${D("Perlu persetujuan klien")} <span class="small">Nama klien dipilah dari daftar customer internal. Konfirmasi merek mana yang boleh dicantumkan sebelum cetak. Angka outlet adalah perkiraan.</span></div></div>
`));

// 14 — Galeri
pages.push(page(14, "Galeri", `
  <div class="kick">Galeri kegiatan</div>
  <h1>Di balik layar <em>Wijaya Meat</em></h1><div class="rule"></div>
  <div style="display:grid; grid-template-columns: repeat(6, 1fr); grid-auto-rows: 25.5mm; gap:3.5mm; margin-top:5mm">
    ${[
      ["img/team-white.jpg", "grid-column: span 4; grid-row: span 3", "Tim produksi berseragam lengkap", "50% 35%"],
      ["img/rph-gate.jpg", "grid-column: span 2; grid-row: span 3", "Gerbang RPHR Jonggol", "50% 30%"],
      ["img/cattle-yard.jpg", "grid-column: span 2; grid-row: span 2", "Sapi di kandang penampungan", "50% 50%"],
      ["img/ribeye-pair.jpg", "grid-column: span 2; grid-row: span 2", "Ribeye pilihan", "50% 50%"],
      ["img/steak-board.jpg", "grid-column: span 2; grid-row: span 2", "Aneka potongan premium", "50% 50%"],
      ["img/cattle-grass.jpg", "grid-column: span 3; grid-row: span 2", "Padang rumput", "50% 50%"],
      ["img/meat-pile.jpg", "grid-column: span 3; grid-row: span 2", "Daging segar", "50% 50%"]
    ].map(([p, s, c, pos]) => `<div class="photo" ${bg(p, `${s}; background-position:${pos}; position:relative; border-radius:4mm`)}><div style="position:absolute; left:0; right:0; bottom:0; padding:7mm 3.5mm 2.5mm; border-radius:0 0 4mm 4mm; background:linear-gradient(transparent, rgba(0,0,0,.7)); color:#fff; font-size:7.4pt; font-weight:600">${c}</div></div>`).join("")}
  </div>
  <p class="small" style="margin-top:4mm">Foto kegiatan pelatihan, audit NKV, dan penghargaan menyusul. Letakkan di <code>assets/img/</code> lalu ganti pada halaman ini.</p>
`, "cream"));

// 15 — Penghargaan
const awards = [
  ["trophy", "Tegar Beriman Award", "Penerima penghargaan Pelopor, Penggerak Peternakan Terbaik."],
  ["shield", "Jaminan Halal Terbaik", "Salah satu dari 5 RPH dengan Sistem Jaminan Halal terbaik dan tercepat."],
  ["award", "NKV Tingkat I", "Gudang dan RPH berpredikat Baik Sekali pada surveilans 24 September 2025."],
  ["users", "Piagam Stunning", "Sertifikasi stunning untuk kesejahteraan hewan pada proses pemotongan."]
];
pages.push(page(15, "Prestasi", `
  <div class="kick">Prestasi kami</div>
  <h1>Kepercayaan yang <em>terbukti</em></h1><div class="rule"></div>
  <div class="grid g2" style="margin-top:5mm; gap:5mm">
    ${awards.map(([i, t, d]) => `<div class="card" style="padding:7mm"><div class="hex" style="width:20mm; height:20mm; background:var(--gold); display:flex; align-items:center; justify-content:center; margin-bottom:4mm"><svg class="ico" style="width:9mm;height:9mm" viewBox="0 0 24 24">${I[i]}</svg></div><h3 style="font-size:12pt">${t}</h3><p style="margin:0; font-size:8.6pt">${d}</p></div>`).join("")}
  </div>
  <div class="photo grow" ${bg("img/steak-board.jpg", "position:relative")}><div style="position:absolute; inset:0; background:linear-gradient(90deg, rgba(20,18,16,.9), rgba(20,18,16,.2)); border-radius:5mm"></div><div style="position:absolute; left:8mm; top:50%; transform:translateY(-50%); color:#fff; max-width:105mm"><div style="font-size:15pt; font-weight:800; line-height:1.3">“Kualitas konsisten, halal, dan terpercaya di setiap sajian.”</div><div style="color:var(--gold); margin-top:3mm; font-weight:700; font-size:8.5pt">${co.nama}</div></div></div>
  <p class="small" style="margin-top:4mm">Tahun dan penyelenggara tiap penghargaan akan dicantumkan setelah dikonfirmasi.</p>
`));

// 16 — Legal
const legal = [["cert/nib.jpg", "NIB", co.nib], ["cert/tanda-daftar-gudang.jpg", "Tanda Daftar Gudang", co.tanda_daftar_gudang], ["cert/nkv-rph.jpg", "NKV RPH · Tingkat I", co.nkv_rph], ["cert/nkv-gudang.jpg", "NKV Gudang · Tingkat I", co.nkv_gudang], ["cert/nkv-rph-surveilans.jpg", "Surveilans NKV RPH 2025", "24 September 2025"], ["cert/nkv-gudang-surveilans.jpg", "Surveilans NKV Gudang 2025", "24 September 2025"]];
pages.push(page(16, "Legalitas", `
  <div class="kick">Legal company</div>
  <h1>Legalitas yang <em>sah & lengkap</em></h1><div class="rule"></div>
  <div class="grid g3" style="margin-top:4mm; gap:5mm 4mm">
    ${legal.map(([p, t, n]) => `<div><div class="card" style="padding:2mm; height:78mm; overflow:hidden"><div ${bg(p, "height:100%; background-size:contain; background-repeat:no-repeat; background-position:center top")}></div></div><div class="chip dk" style="margin-top:2.5mm">${t}</div><div class="small">${n}</div></div>`).join("")}
  </div>
  <div class="grid g2" style="margin-top:5mm; gap:4mm">
    <div class="card" style="display:flex; gap:4mm; align-items:center"><img src="${A("logo/halal.png")}" style="height:15mm"><div class="small">Sertifikat Halal PT<br><b>${co.halal_pt}</b></div></div>
    <div class="card" style="display:flex; gap:4mm; align-items:center"><img src="${A("logo/halal.png")}" style="height:15mm"><div class="small">Sertifikat Halal RPH<br><b>${co.halal_rph}</b></div></div>
  </div>
  <p class="small" style="margin-top:3mm">Sertifikat Halal, Izin Usaha, Registrasi Produk Hewan, dan Sertifikat Merek akan ditambahkan sebagai scan setelah file diterima.</p>
`, "cream"));

// 17–22 — Produk
const bands = ["img/ribeye-pair.jpg", "img/tbone-dark.jpg", "img/beef-cut-board.jpg", "img/meat-closeup.jpg", "img/rib-herbs.jpg", "img/steak-board.jpg"];
let pn = 0;
products.forEach((grp, gi) => {
  const n = 17 + gi;
  pages.push(page(n, "Produk", `
    <div class="pband"><div class="photo" ${bg(bands[gi], "position:absolute; inset:0; border-radius:0")}></div><div class="ov"></div>
      <div class="tx"><div class="kick" style="color:var(--gold)">Katalog produk · ${gi + 1}/6</div><h1>${grp.judul}</h1><p>${grp.intro}</p></div></div>
    <div class="grid g2" style="gap:4mm">
      ${grp.items.map(p => { const f = `products/${slug(p.nama)}.jpg`; pn++; return `
        <div class="pcard"><div class="im ${has(f) ? "" : "ph"}" ${has(f) ? bg(f) : ""}><div class="num">${pn}</div></div>
          <div class="bd"><h3>${p.nama}</h3><div class="id">${p.id || "&nbsp;"}</div><div class="u"><span class="chip">${grp.kategori}</span><br><b>Cocok untuk:</b> ${p.cocok}</div></div></div>`; }).join("")}
    </div>
    ${gi === 5 ? `<p class="small" style="margin-top:3mm">Katalog lengkap (Konro, Neckbone, Backbone, Shank, Intercostal, dan lainnya) tersedia melalui QR di halaman kontak.</p>` : ""}
  `, gi % 2 ? "cream" : ""));
});

// 23 — Kontak
const qr = async (u) => (await QRCode.toString(u, { type: "svg", margin: 0, color: { dark: "#1d1b19", light: "#ffffff" } })).replace(/<\?xml[^>]*>/, "");
const qrCatalog = await qr("https://bit.ly/swmcatalogue");
const qrCompro = await qr("https://bit.ly/swmcompro");
pages.push(page(23, "Kontak", `
  <div class="kick">Hubungi kami</div>
  <h1>Mari bekerja sama <em>bersama kami</em></h1><div class="rule"></div>
  <p class="lead">Tim kami siap membantu kebutuhan daging sapi Anda: dari permintaan khusus (product by request) hingga pengiriman berpendingin.</p>
  <div class="grid g2" style="margin-top:5mm">
    <div class="cbox">${ic("phone")}<div><small>Call center</small><b>${co.telepon}</b></div></div>
    <div class="cbox">${ic("mail")}<div><small>Email</small><b>${co.email}</b></div></div>
    <div class="cbox">${ic("globe")}<div><small>Website</small><b>${co.website}</b></div></div>
    <div class="cbox">${ic("pin")}<div><small>RPH & produksi</small><b style="font-size:8.2pt; font-weight:600">${co.alamat_rph}</b></div></div>
  </div>
  <div class="cbox" style="margin-top:4mm">${ic("pin")}<div><small>Kantor</small><b style="font-size:8.6pt; font-weight:600">${co.alamat_kantor}</b></div></div>
  <div class="grid g2" style="margin-top:9mm; text-align:center">
    <div><div class="qr">${qrCatalog}</div><p style="margin-top:3mm; font-weight:700">Katalog produk lengkap</p><p class="small" style="color:#bdb7ad">bit.ly/swmcatalogue</p></div>
    <div><div class="qr">${qrCompro}</div><p style="margin-top:3mm; font-weight:700">Unduh company profile</p><p class="small" style="color:#bdb7ad">bit.ly/swmcompro</p></div>
  </div>
  <div style="text-align:center; margin-top:2mm">${D("Tautan QR dari compro 2024: verifikasi sebelum cetak")}</div>
`, "dark"));

// 24 — Cover belakang
pages.push(`
<section class="page cover" id="p24">
  <div class="bg" ${bg("img/cattle-yard.jpg")}></div><div class="shade" style="background: rgba(20,18,16,.84)"></div>
  <div style="position:absolute; left:0; right:0; top:84mm; text-align:center">
    <img src="${A("logo/wijaya-yellow.png")}" style="width:78mm">
    <div style="font-size:15pt; font-weight:800; margin-top:10mm; letter-spacing:.04em">${co.nama.toUpperCase()}</div>
    <div style="font-style:italic; color:var(--gold); margin-top:2mm; font-size:10.5pt">“${co.tagline}”</div>
    <div style="display:flex; gap:5mm; justify-content:center; align-items:center; margin-top:14mm"><div style="background:#fff;border-radius:50%;padding:1.5mm;display:flex"><img src="${A("logo/nkv-rph.png")}" style="height:19mm"></div><div style="background:#fff;border-radius:50%;padding:1.5mm;display:flex"><img src="${A("logo/nkv-gudang.png")}" style="height:19mm"></div><div style="background:#fff; border-radius:2mm; padding:2mm 3mm"><img src="${A("logo/halal.png")}" style="height:12mm; display:block"></div></div>
  </div>
  <div class="addr" style="justify-content:center; gap:10mm"><span>${co.website}</span><span>${co.email}</span><span>${co.telepon}</span></div>
  <div class="gbar"></div>
</section>`);

export default pages;

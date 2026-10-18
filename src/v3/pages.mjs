import { readFileSync, existsSync } from "node:fs";
import QRCode from "qrcode";

const read = (p) => JSON.parse(readFileSync(new URL(p, import.meta.url)));
const co = read("../../data/company.json");
const products = read("../../data/products.json");
const clients = read("../../data/clients.json");
const lab = read("../../data/lab.json");
const steps = read("../../data/process.json");
const awards = read("../../data/awards.json");
const I = {
  shield: '<path d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3z"/><path d="M9 12l2 2 4-4"/>',
  snow: '<path d="M12 2v20M4.2 7l15.6 10M4.2 17L19.8 7"/><path d="M9.5 3.5L12 6l2.5-2.5M9.5 20.5L12 18l2.5 2.5"/>',
  award: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/>',
  trophy: '<path d="M8 4h8v5a4 4 0 01-8 0V4zM8 6H4v1a4 4 0 004 4M16 6h4v1a4 4 0 01-4 4M12 13v4M8 21h8M10 17h4"/>',
  users: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5"/><circle cx="17" cy="9" r="2.5"/><path d="M16 15c3 0 5 2 5 5"/>',
  truck: '<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  flask: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3"/><path d="M7.5 15h9"/>',
  leaf: '<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15"/><path d="M5 19c3-5 6-8 11-10"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>',
  box: '<path d="M3 7l9-4 9 4v10l-9 4-9-4V7z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
  cart: '<path d="M3 4h3l2.5 11h9L20 8H7"/><circle cx="10" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/>',
  pin: '<path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  coin: '<circle cx="12" cy="12" r="9"/><path d="M9 9.5c0-1.4 1.3-2.5 3-2.5s3 1 3 2.3-1 2-3 2.4-3 1-3 2.4 1.3 2.4 3 2.4 3-1 3-2.4M12 5v2M12 17v2"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'
};
const ic = (n, style = "") => `<svg class="ico" style="${style}" viewBox="0 0 24 24">${I[n]}</svg>`;
const A = (p) => `../assets/${p}`;
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const has = (p) => existsSync(new URL(`../../assets/${p}`, import.meta.url));
const bg = (p, extra = "") => `style="background-image:url('${A(p)}');${extra}"`;

const pages = [];
const page = (sec, body, cls = "", fcls = "") => { const n = pages.length + 1; return `
<section class="page ${cls}">
  <div class="top"><div class="tab">${sec}</div><img class="mark" src="${A("logo/wijaya-yellow.png")}" alt=""></div>
  ${body}
  <div class="ft ${fcls}"><span>${co.nama}</span><span class="no">${String(n).padStart(2, "0")}</span><span>Company Profile 2026</span></div>
</section>`; };

// 1 — Cover
pages.push(`
<section class="page cover">
  <div class="bg" ${bg("img/cattle-fence.jpg")}></div><div class="shade"></div>
  <img class="logo" src="${A("logo/wijaya-yellow.png")}" alt="Wijaya Meat">
  <div class="badges"><div class="c"><img src="${A("logo/nkv-rph.png")}"></div><div class="c"><img src="${A("logo/nkv-gudang.png")}"></div><div class="h"><img src="${A("logo/halal.png")}"></div></div>
  <div class="slab2"></div><div class="slab"></div>
  <div class="ttl">
    <div class="k">Edisi 2026</div>
    <h1>Company<br>Profile</h1>
    <div class="nm">PT. Santi Wijaya Meat</div>
    <div class="tg">“${co.tagline}”</div>
  </div>
  <div class="strip"><span>RPH JONGGOL · KABUPATEN BOGOR · JAWA BARAT</span><span>${co.website}</span></div>
</section>`);

// 2 — Kata Pengantar
pages.push(page("Kata Pengantar", `
  <div style="display:grid; grid-template-columns:72mm 1fr; gap:10mm; align-items:start">
    <div>
      <div class="photo shadowy" ${bg("img/owner-farm.jpg", "height:150mm")}></div>
      <div style="margin-top:9mm; background:var(--c); color:#fff; padding:4mm 5mm; border-radius:3mm; border-left:2mm solid var(--y)">
        <div style="font-family:'BC'; font-weight:800; font-size:17pt; text-transform:uppercase">${co.owner}</div>
        <div style="font-size:9.4pt; color:#ddd; font-weight:600">Pemilik & Direktur Utama</div>
      </div>
    </div>
    <div>
      <div class="kick">Sambutan</div>
      <h1>Selamat datang di <em>Wijaya Meat</em></h1><div class="bar"></div>
      <p>Salam hormat,</p>
      <p>Selamat datang di <b>${co.nama}</b>, tempat di mana komitmen kami untuk memenuhi kebutuhan Anda menjadi prioritas utama.</p>
      <p>Perjalanan kami dimulai tahun 2014 sebagai CV. Wijaya Meat. Pada tahun 2020 kami resmi menjadi ${co.nama}, didukung rumah potong dan cold storage bersertifikat NKV Tingkat I serta jaminan halal.</p>
      <p>Kami bangga dipercaya memasok daging sapi berkualitas untuk jaringan ritel modern, hotel, restoran, dan mitra industri. Slogan kami, <i>“${co.tagline}”</i>, adalah tekad untuk selalu hadir dengan solusi yang tepat dan mutu yang konsisten.</p>
      <p>Terima kasih atas kepercayaan Anda.</p>
    </div>
  </div>
  <div style="position:absolute; left:0; right:0; bottom:0; height:58mm; background:var(--y); clip-path:polygon(0 24%, 100% 0, 100% 100%, 0 100%); padding:16mm 18mm 8mm; display:flex; align-items:center; gap:8mm">
    <div style="font-family:'BC'; font-weight:800; font-size:64pt; line-height:.6; color:var(--c)">“</div>
    <div style="font-family:'BC'; font-weight:800; font-size:22pt; line-height:1.12; text-transform:uppercase; color:var(--c)">Daging sapi berkualitas adalah kunci terciptanya hidangan terbaik.</div>
  </div>
`, "", "dk"));

// 3 — Sejarah
const tl = [
  ["2014", "CV Wijaya Meat", "Awal perjalanan sebagai penyedia daging sapi berkualitas."],
  ["2020", "Resmi menjadi PT", "Akta Pendirian No. 16 (18 April 2020), pengesahan Kemenkumham, dan NIB terbit."],
  ["2021", "NKV Gudang Tingkat I", `Cold storage memperoleh NKV ${co.nkv_gudang}.`],
  ["2023", "NKV RPH Tingkat I", `RPHR Jonggol memperoleh NKV ${co.nkv_rph}.`],
  ["2024", "Penguatan manajemen", "Rafi Bagus Purnomo bergabung sebagai Komisaris; Tanda Daftar Gudang terbit."],
  ["2025", "Surveilans NKV", "Gudang dan RPH mempertahankan predikat Tingkat I (Baik Sekali)."],
  ["2026", "Sertifikat Halal RPH", `Halal RPH ${co.halal_rph} dan pembaruan NKV Gudang.`]
];
pages.push(page("Sejarah Singkat", `
  <div class="kick">Sejak 2014</div>
  <h1>Perjalanan <em>kami</em></h1><div class="bar"></div>
  <div class="tl">
    ${tl.map(([y, t, d], i) => { const L = i % 2 === 0;
      const desc = `<div class="desc ${L ? "L" : ""}"><b>${t}</b><span>${d}</span></div>`;
      const yr = `<div class="yrbox ${L ? "R" : "L"}"><span class="yr">${y}</span></div>`;
      return `<div class="row">${L ? desc : yr}<div class="nd"><i></i></div>${L ? yr : desc}</div>`; }).join("")}
  </div>
`, "gray"));

// 4 — Profil
pages.push(page("Profil Perusahaan", `
  <div class="fill">
    <div class="kick">Sekilas</div>
    <h1>Profil <em>perusahaan</em></h1><div class="bar"></div>
    <div class="g4">
      <div class="stat"><b>2014</b><span>Awal berdiri</span></div>
      <div class="stat"><b>28 TON</b><span>Kapasitas cold storage</span></div>
      <div class="stat"><b>NKV I</b><span>Predikat Baik Sekali</span></div>
      <div class="stat"><b>HALAL</b><span>Halal Indonesia</span></div>
    </div>
    <div class="g2" style="margin-top:8mm; gap:8mm">
      <div><h2>Identitas</h2><table class="kv">
        <tr><td>Nama</td><td>${co.nama}</td></tr><tr><td>Merek</td><td>${co.merek}</td></tr>
        <tr><td>Kantor</td><td>Perum Asabri Blok B No. 20, Sukasirna, Jonggol, Kab. Bogor</td></tr>
        <tr><td>RPH & produksi</td><td>Jl. SMPN 01 Jonggol, Kp. Menan, Sukamaju, Jonggol, Kab. Bogor</td></tr>
        <tr><td>Telepon</td><td>${co.telepon}</td></tr><tr><td>Email</td><td>${co.email}</td></tr><tr><td>Website</td><td>${co.website}</td></tr>
      </table></div>
      <div><h2>Legalitas</h2><table class="kv">
        <tr><td>NIB</td><td>${co.nib}</td></tr><tr><td>NPWP</td><td>${co.npwp}</td></tr>
        <tr><td>Halal PT</td><td>${co.halal_pt}</td></tr><tr><td>Halal RPH</td><td>${co.halal_rph}</td></tr>
        <tr><td>NKV RPH</td><td>${co.nkv_rph}</td></tr><tr><td>NKV Gudang</td><td>${co.nkv_gudang}</td></tr>
        <tr><td>Reg. produk</td><td>${co.reg_produk}</td></tr>
      </table></div>
    </div>
    <div class="grow" style="position:relative; margin:8mm -18mm -22mm; background:url('${A("img/team-white.jpg")}') 50% 28%/cover; clip-path:polygon(0 12%, 100% 0, 100% 100%, 0 100%)">
      <div style="position:absolute; left:18mm; bottom:16mm; background:var(--y); color:var(--c); font-family:'BC'; font-weight:800; font-size:15pt; text-transform:uppercase; letter-spacing:.06em; padding:1.2mm 6mm; clip-path:polygon(0 0,100% 0,94% 100%,0 100%)">Tim produksi RPH Jonggol</div>
    </div>
  </div>
`, "", "light"));


// 5 — Visi & Misi
const misi = [
  "Menyediakan daging sapi segar berkualitas tinggi dan sehat untuk memenuhi kebutuhan pelanggan.",
  "Memberikan layanan yang cepat, handal, dan profesional kepada pelanggan.",
  "Menjalin kemitraan dengan peternak dan produsen untuk memastikan pasokan yang stabil dan berkualitas.",
  "Memastikan keamanan dan kualitas daging melalui kontrol mutu dan keamanan pangan yang ketat.",
  "Membangun tim yang solid, profesional, dan berdedikasi tinggi dalam melayani pelanggan.",
  "Mengembangkan teknologi dan inovasi dalam manajemen distribusi untuk efisiensi dan produktivitas."
];
pages.push(page("Visi & Misi", `
  <div class="fill">
    <div class="kick">Arah kami</div>
    <h1>Visi & <em>misi</em></h1><div class="bar"></div>
    <div style="background:var(--c); border-radius:4mm; border-left:3mm solid var(--y); padding:7mm 8mm; color:#fff; display:flex; gap:6mm; align-items:center">
      <div class="cir" style="background:var(--y); color:var(--c); width:18mm; height:18mm">${ic("eye", "width:10mm; height:10mm")}</div>
      <div><div style="font-family:'BC'; font-weight:700; letter-spacing:.24em; color:var(--y); font-size:13pt">VISI</div>
      <div style="font-size:13pt; line-height:1.5; font-weight:700">Menjadi perusahaan distribusi daging sapi terbaik dan terpercaya di Indonesia yang memberikan kepuasan kepada pelanggan dengan kualitas daging terbaik serta harga yang terjangkau.</div></div>
    </div>
    <h2 style="margin-top:8mm">Misi kami</h2>
    <div class="g2" style="gap:3.4mm 5mm">
      ${misi.map((m, i) => `<div class="it" style="align-items:flex-start; min-height:27mm"><span class="nb">${i + 1}</span><span>${m}</span></div>`).join("")}
    </div>
    <div class="bandp grow" style="margin-top:8mm; margin-bottom:-22mm; background-image:url('${A("img/cattle-yard.jpg")}')"><div class="cap">Dari peternak ke meja Anda</div></div>
  </div>
`));

// 6 — Organisasi
const divs = [["gear", "Produksi", "RPH & boning"], ["box", "Warehouse", "Cold storage"], ["flask", "Quality Control", "Mutu & keamanan pangan"], ["cart", "Marketing", "Penjualan & pelanggan"], ["pin", "Operasional", "Operasional harian"], ["coin", "Finance", "Keuangan"], ["truck", "Delivery", "Distribusi berpendingin"]];
const dcard = ([i, t, d]) => `<div class="card" style="padding:3mm 2mm; text-align:center; border-bottom:1.6mm solid var(--y)"><div class="cir" style="margin:0 auto 1.6mm; width:11mm; height:11mm">${ic(i, "width:5.6mm; height:5.6mm")}</div><div style="font-family:'BC'; font-weight:800; font-size:15pt; text-transform:uppercase">${t}</div><div class="small">${d}</div></div>`;
pages.push(page("Struktur Organisasi", `
  <div class="fill">
    <div class="kick">Organisasi</div>
    <h1>Tim di balik <em>kualitas</em></h1><div class="bar"></div>
    <div style="display:flex; flex-direction:column; align-items:center">
      <div style="background:var(--c); color:#fff; border-radius:3mm; padding:3mm 12mm; text-align:center; min-width:80mm"><div style="font-family:'BC'; font-weight:800; font-size:19pt; text-transform:uppercase">${co.komisaris}</div><div class="pill" style="margin-top:1mm">Komisaris</div></div>
      <div style="width:1.6mm; height:6mm; background:var(--y)"></div>
      <div style="background:var(--y); color:var(--c); border-radius:3mm; padding:3mm 12mm; text-align:center; min-width:80mm"><div style="font-family:'BC'; font-weight:800; font-size:19pt; text-transform:uppercase">${co.direktur}</div><div class="pill" style="margin-top:1mm">Direktur Utama</div></div>
      <div style="width:1.6mm; height:6mm; background:var(--y)"></div>
      <div style="width:150mm; height:1.6mm; background:var(--y)"></div>
    </div>
    <div class="g4" style="margin-top:6mm">${divs.slice(0, 4).map(dcard).join("")}</div>
    <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:4mm; width:75%; margin:4mm auto 0">${divs.slice(4).map(dcard).join("")}</div>
    <div class="g2" style="margin-top:5mm; grid-template-columns:repeat(3,1fr); gap:4mm">
      <div class="stat"><b>${co.karyawan}</b><span>Karyawan</span></div>
      <div class="stat"><b style="font-size:17pt">${co.komisaris}</b><span>Penanggung jawab teknis</span></div>
      <div class="stat"><b style="font-size:17pt">drh. Soetrisno, MM</b><span>Dokter hewan penanggung jawab</span></div>
    </div>
    <div class="bandp grow" style="margin-top:5mm; margin-bottom:-22mm; background-image:url('${A("img/team-white.jpg")}'); background-position:50% 30%"><div class="cap">Tim kami di RPH Jonggol</div></div>
  </div>
`, "", "light"));

// 7 — Fasilitas
pages.push(page("Fasilitas", `
  <div class="kick">RPH & cold storage</div>
  <h1>Fasilitas yang <em>terstandar</em></h1><div class="bar"></div>
  <div class="g2" style="gap:6mm">
    <div class="card" style="overflow:hidden"><div class="photo" style="height:78mm; border-radius:0; background-image:url('${A("img/rph-gate.jpg")}'); background-position:50% 32%"></div>
      <div style="padding:4mm 5mm 5mm"><span class="pill">NKV Tingkat I</span><div style="font-family:'BC'; font-weight:800; font-size:21pt; text-transform:uppercase; margin-top:1.5mm">RPH Jonggol</div><div class="small">${co.nkv_rph}</div><p style="font-size:10pt; margin:2mm 0 0">Rumah potong dan produksi di Jl. SMPN 01 Jonggol, Kp. Menan, Sukamaju, Kabupaten Bogor.</p></div></div>
    <div class="card" style="overflow:hidden"><div style="height:78mm; background:linear-gradient(160deg,#1f3a4a,#101a22); display:flex; flex-direction:column; justify-content:center; align-items:center; color:#fff; text-align:center">
        <div style="font-family:'BC'; font-weight:700; letter-spacing:.3em; color:#9ddcf0; font-size:13pt">CHILL</div><div style="font-family:'BC'; font-weight:800; font-size:30pt; line-height:1">0 s.d. -5°C</div>
        <div style="width:30mm; height:1mm; background:var(--y); margin:5mm 0; transform:skewX(-24deg)"></div>
        <div style="font-family:'BC'; font-weight:700; letter-spacing:.3em; color:#9ddcf0; font-size:13pt">FROZEN</div><div style="font-family:'BC'; font-weight:800; font-size:30pt; line-height:1">-17 s.d. -28°C</div></div>
      <div style="padding:4mm 5mm 5mm"><span class="pill">NKV Tingkat I</span><div style="font-family:'BC'; font-weight:800; font-size:21pt; text-transform:uppercase; margin-top:1.5mm">Cold Storage</div><div class="small">${co.nkv_gudang}</div><p style="font-size:10pt; margin:2mm 0 0">Gudang berpendingin di Perum Asabri Blok B No. 20, Sukasirna, Jonggol, dengan suhu terkontrol.</p></div></div>
  </div>
  <div class="g4" style="margin-top:7mm">
    <div class="stat"><b>28 TON</b><span>Kapasitas</span></div><div class="stat"><b>80 M²</b><span>Luas gudang</span></div>
    <div class="stat"><b>1–2 TON</b><span>Perputaran per hari</span></div><div class="stat"><b>FIFO</b><span>Rotasi stok</span></div>
  </div>
  <h2 style="margin-top:8mm">Standar fasilitas</h2>
  <div class="g2" style="gap:3.4mm 5mm">
    ${["Palet plastik food grade, minimal 15 cm dari lantai", "Jarak tumpukan 10–15 cm dari dinding dan 50 cm dari evaporator", "Anteroom tertutup untuk bongkar muat", "Pencatatan suhu 3 kali sehari dan pengendalian hama berkala"].map(t => `<div class="it"><span class="cir" style="width:9mm; height:9mm">${ic("shield", "width:5mm; height:5mm")}</span><span>${t}</span></div>`).join("")}
  </div>
`, "gray"));

// 8 — Proses Produksi (gelap)
const phase = { 1: "Penerimaan", 2: "Penyembelihan", 3: "Pasca-potong" };
const stepItem = ([ph, t, d], i) => `<div class="it" style="align-items:flex-start; padding:1.6mm 3mm"><span class="nb" style="min-width:10mm; height:10mm; font-size:15pt">${String(i + 1).padStart(2, "0")}</span><span class="tx"><b style="font-size:10.6pt">${t}</b><small>${d}</small></span></div>`;
const col = (from, to) => steps.slice(from, to).map(([ph, t, d], j) => { const i = from + j; const first = i === 0 || steps[i - 1][0] !== ph; return `${first ? `<div class="stage" style="margin-top:${j ? "3mm" : "0"}">${phase[ph]}</div>` : ""}${stepItem([ph, t, d], i)}`; }).join('<div style="height:1.4mm"></div>');
pages.push(page("Proses Produksi", `
  <div class="fill">
    <div class="kick">16 tahap</div>
    <h1 style="font-size:34pt">Dari kandang hingga <em>meja Anda</em></h1><div class="bar" style="margin:3mm 0 4mm"></div>
    <div class="g2" style="gap:0 6mm; align-items:start"><div>${col(0, 8)}</div><div>${col(8, 16)}</div></div>
    <div style="display:flex; align-items:center; gap:7mm; margin-top:auto; background:#1d1d1d; border-radius:3mm; padding:3mm 5mm 3mm 3mm">
      <img src="${A("img/cow-diagram.jpg")}" style="height:31mm; border-radius:2mm">
      <div><div class="sec" style="color:var(--y)">Potongan primal sapi</div><div style="font-size:9.6pt; color:#ddd; line-height:1.55">Chuck 26% · Round 27% · Sirloin 9% · Rib 9,5% · Short loin 8% · Short plate 5,5% · Brisket 6% · Fore shank 4% · Flank 4%.</div><div class="small" style="color:#aaa">Persentase indikatif, dapat berbeda tiap ekor.</div></div>
    </div>
  </div>
`, "dark"));

// 9 — Jaminan Mutu
pages.push(page("Jaminan Mutu", `
  <div class="fill">
    <div class="kick">Aman & terlacak</div>
    <h1>Jaminan <em>mutu</em></h1><div class="bar"></div>
    <div class="g2" style="grid-template-columns:repeat(3,1fr); gap:5mm">
      ${[["shield", "GWP & GHP", "Good Warehousing Practices dan Good Hygiene Practices di seluruh area gudang dan RPH."], ["snow", "Rantai dingin", "Chill 0 s.d. -5°C dan frozen -17 s.d. -28°C, dicatat 3 kali sehari."], ["award", "Veteriner", "Di bawah pengawasan Otoritas Veteriner, dengan dokter hewan penanggung jawab teknis."]].map(([i, t, d]) => `<div class="card" style="padding:5mm; border-top:1.8mm solid var(--y)"><div class="cir">${ic(i)}</div><div style="font-family:'BC'; font-weight:800; font-size:18pt; text-transform:uppercase; margin:3mm 0 1mm">${t}</div><p style="font-size:10pt; margin:0">${d}</p></div>`).join("")}
    </div>
    <h2 style="margin-top:8mm">Program uji laboratorium</h2>
    <div class="g2" style="gap:5mm">
      <div class="stat" style="padding:5mm"><b style="font-size:34pt">3 BULAN</b><span style="font-size:10.4pt"><b>Daging & jeroan</b> diuji di BPMSPH Kabupaten Bogor, laboratorium terakreditasi KAN.</span></div>
      <div class="stat" style="padding:5mm"><b style="font-size:34pt">1 TAHUN</b><span style="font-size:10.4pt"><b>Air, karyawan & peralatan</b> diuji di SIG, laboratorium terakreditasi KAN.</span></div>
    </div>
    <h2 style="margin-top:8mm">Alur penyimpanan berpendingin</h2>
    <div class="chev" style="margin-top:1mm">${["Penerimaan & cek dokumen", "Bongkar di anteroom", "Timbang & label", "Simpan chill / frozen", "Monitor suhu", "Dispatch FIFO", "Muat armada"].map((t, i) => `<div><b>${i + 1}</b><span>${t}</span></div>`).join("")}</div>
    <p class="small" style="margin:4mm 0 0">Setiap produk masuk disertai Certificate of Analysis (CoA) dan sertifikat veteriner dari unit asal.</p>
    <div class="photo grow" style="margin-top:6mm; background-image:url('${A("img/team-white.jpg")}'); background-position:50% 20%; position:relative"><div style="position:absolute; left:0; bottom:4mm; background:var(--y); color:var(--c); font-family:'BC'; font-weight:800; font-size:12pt; text-transform:uppercase; letter-spacing:.06em; padding:.6mm 5mm .6mm 4mm; clip-path:polygon(0 0,100% 0,94% 100%,0 100%)">Higiene personal di area produksi</div></div>
  </div>
`));

// 10 — Hasil Uji Lab
const okc = (v) => v.startsWith("Negatif") ? `<span class="ok">${v}</span>` : `<span class="val">${v}</span>`;
pages.push(page("Hasil Uji Lab", `
  <div class="fill">
    <div class="kick">Transparansi mutu</div>
    <h1>Hasil uji <em>laboratorium</em></h1><div class="bar"></div>
    <div class="sec">Daging & jeroan · <b>${lab.bpmsph.lab}</b></div>
    <table class="lab"><tr><th>Parameter</th>${lab.bpmsph.kolom.map(k => `<th>${k.sampel}<small>Terbit ${k.terbit}</small></th>`).join("")}</tr>
      ${lab.bpmsph.baris.map(r => `<tr><td>${r.nama}<small>${r.metode}</small></td>${r.nilai.map(v => `<td>${okc(v)}</td>`).join("")}</tr>`).join("")}</table>
    <div class="sec" style="margin-top:3.4mm">Air proses · <b>SIG (KAN) · acuan PERMENKES 2/2023</b></div>
    <table class="lab"><tr><th>Parameter</th><th>Hasil</th><th>Standar</th></tr>
      ${lab.air.tiles.map(t => `<tr><td>${t.p}</td><td>${okc(t.v)}</td><td style="color:var(--mute)">${t.s.replace("std ", "")}</td></tr>`).join("")}</table>
    <div class="sec" style="margin-top:3.4mm">Higiene permukaan & karyawan · <b>SIG (KAN)</b></div>
    <table class="lab"><tr><th>Parameter</th>${lab.permukaan.kolom.map(k => `<th>${k}</th>`).join("")}</tr>
      ${lab.permukaan.baris.map(r => `<tr><td>${r.nama}<small>${r.metode}</small></td>${r.nilai.map(v => `<td>${okc(v)}</td>`).join("")}</tr>`).join("")}</table>
    <p class="small" style="margin:2.6mm 0 0; font-size:8.2pt; line-height:1.4">Sampling higiene 9 September 2026 di RPHR Jonggol. ALT per swab (karyawan, pisau) atau per 100 cm² (keranjang). Hasil hanya berlaku untuk sampel yang diuji; laporan asli tersedia atas permintaan.</p>
  </div>
`, "gray"));

// 11 — Tim Ahli
const slug2 = slug;
const init = (n) => n.split(" ").map(w => w[0]).slice(0, 2).join("");
pages.push(page("Tim Ahli", `
  <div class="fill">
    <div class="kick">Meet our experts</div>
    <h1>Tenaga <em>bersertifikat</em></h1><div class="bar"></div>
    <p class="lead" style="max-width:150mm">Proses halal dan kesejahteraan hewan di RPH kami dijalankan tenaga yang memiliki sertifikat kompetensi di bidangnya.</p>
    <div class="g2" style="grid-template-columns:repeat(3,1fr); gap:7mm 8mm; margin-top:2mm">
      ${co.tim.map(t => { const f = `team/${slug2(t.nama)}.jpg`; return `<div style="text-align:center">
        <div class="portrait" ${has(f) ? `style="background:url('${A(f)}') center/cover"` : ""}>${has(f) ? "" : `<span>${init(t.nama)}</span>`}</div>
        <div style="font-family:'BC'; font-weight:800; font-size:17pt; text-transform:uppercase; margin-top:4mm; line-height:1.05">${t.nama}</div><span class="pill" style="margin-top:1.4mm">${t.jabatan}</span></div>`; }).join("")}
    </div>
    <div class="g4" style="margin-top:8mm; align-items:start">
      ${[["Penyelia Halal", "Penjamin proses produk halal"], ["Juleha", "Juru sembelih halal"], ["AWO", "Animal Welfare Officer"], ["Stunner", "Operator pemingsanan hewan"]].map(([a, b]) => `<div class="card" style="padding:3.4mm 4mm; border-left:1.6mm solid var(--y)"><div style="font-family:'BC'; font-weight:800; font-size:14pt; text-transform:uppercase">${a}</div><div class="small">${b}</div></div>`).join("")}
    </div>
  </div>
`));

// 12 — Halal & Lingkungan
const halal = ["Menyediakan SDM serta sarana dan prasarana yang mendukung Proses Produk Halal (PPH).", "Mematuhi peraturan perundang-undangan tentang Jaminan Produk Halal (JPH).", "Menggunakan bahan halal dan melaksanakan PPH sesuai ketentuan.", "Memastikan kebijakan halal dipahami dan diterapkan seluruh personel RPH.", "Mengomunikasikan kebijakan halal kepada seluruh pihak terkait.", "Melaksanakan kebijakan halal secara konsisten."];
pages.push(page("Halal & Lingkungan", `
  <div class="fill">
    <div style="display:flex; justify-content:space-between; align-items:flex-end; gap:8mm">
      <div><div class="kick">Kebijakan halal</div><h1>Komitmen <em>halal</em></h1><div class="bar"></div></div>
      <div style="text-align:right; margin-bottom:5mm"><img src="${A("logo/halal.png")}" style="height:22mm"><div class="small" style="margin-top:1mm">PT ${co.halal_pt}<br>RPH ${co.halal_rph}</div></div>
    </div>
    <div class="g2" style="gap:3.4mm 5mm">
      ${halal.map((m, i) => `<div class="it" style="align-items:flex-start; min-height:23mm"><span class="nb">${i + 1}</span><span>${m}</span></div>`).join("")}
    </div>
    <div class="grow" style="display:grid; grid-template-columns:1fr 76mm; gap:7mm; margin-top:9mm">
      <div><div class="kick">Keberlanjutan</div><h1 style="font-size:30pt">Tanggung jawab <em>lingkungan</em></h1><div class="bar"></div>
        <p style="font-size:10.6pt">Limbah produksi dikelola dengan sistem terintegrasi dan ditangani setiap saat. Kami bekerja sama dengan Dinas Lingkungan Hidup setempat dalam prosedur perawatan dan pembuangan limbah sesuai regulasi yang berlaku.</p>
        <div style="display:flex; gap:3mm; align-items:center"><span class="cir">${ic("leaf")}</span><b style="font-size:10.4pt">Pengelolaan limbah sesuai regulasi</b></div></div>
      <div class="photo shadowy" style="background-image:url('${A("img/cattle-pen.jpg")}'); margin:0 3mm 3mm 0"></div>
    </div>
  </div>
`));

// 13 — Distribusi (gelap)
const dest = clients.wilayah;
pages.push(page("Distribusi", `
  <div class="fill">
    <div class="kick">Distribusi & armada</div>
    <h1>Menjangkau <em>hampir seluruh Indonesia</em></h1><div class="bar"></div>
    <svg viewBox="0 0 180 112" style="width:100%; height:88mm; display:block; margin-top:-2mm">
      ${dest.map(d => `<line x1="90" y1="56" x2="${d.x}" y2="${d.y}" stroke="#f7b500" stroke-width=".9" stroke-dasharray="2 1.6"/>`).join("")}
      ${dest.map(d => `<circle cx="${d.x}" cy="${d.y}" r="${d.core ? 5.2 : 3.8}" fill="${d.core ? "#f7b500" : "#2a2a2a"}" stroke="#f7b500" stroke-width="1"/><text x="${d.x}" y="${d.y + (d.core ? 11 : 9.4)}" text-anchor="middle" font-size="5.4" font-weight="700" fill="#fff" font-family="PJS">${d.n}</text>`).join("")}
      <circle cx="90" cy="56" r="9" fill="#f7b500"/><circle cx="90" cy="56" r="3.4" fill="#2a2a2a"/>
      <text x="90" y="73" text-anchor="middle" font-size="6.2" font-weight="800" fill="#f7b500" font-family="BC">RPH JONGGOL</text>
    </svg>
    <div class="g4" style="margin-top:2mm">
      <div class="stat" style="background:#1d1d1d"><b>${co.armada}</b><span>Armada berpendingin</span></div>
      <div class="stat" style="background:#1d1d1d"><b>${clients.provinsi}+</b><span>Provinsi terlayani</span></div>
      <div class="stat" style="background:#1d1d1d"><b>1–2 TON</b><span>Perputaran harian</span></div>
      <div class="stat" style="background:#1d1d1d"><b>100+</b><span>Titik pengiriman</span></div>
    </div>
    <div class="g2 grow" style="gap:6mm; margin-top:7mm; align-content:start">
      <div><div class="stage">Standar pengiriman</div><div style="display:grid; gap:2mm">${["Pra-pendinginan boks sesuai produk sebelum muat", "Pemuatan cepat ke mobil box berpendingin", "Surat jalan dan log pengeluaran tercatat", "Rantai dingin terjaga hingga pelanggan"].map(t => `<div class="it" style="padding:2.4mm 3.4mm"><span class="cir" style="width:8mm; height:8mm; background:var(--y); color:var(--c)">${ic("truck", "width:4.6mm; height:4.6mm")}</span><span>${t}</span></div>`).join("")}</div></div>
      <div><div class="stage">Segmen pelanggan</div><div style="display:grid; gap:2mm">${clients.segmen.map(t => `<div class="it" style="padding:2.4mm 3.4mm"><span class="nb" style="min-width:8mm; height:8mm; font-size:12pt">◆</span><span style="font-family:'BC'; font-weight:800; font-size:14pt; text-transform:uppercase">${t}</span></div>`).join("")}</div></div>
    </div>
  </div>
`, "dark"));

// 14 — Klien
pages.push(page("Klien & Mitra", `
  <div class="fill">
    <div class="kick">Dipercaya mitra</div>
    <h1>Klien & <em>mitra</em></h1><div class="bar"></div>
    <p class="lead" style="font-size:11.4pt; margin-bottom:0">Melayani ${clients.segmen.join(", ").toLowerCase()} di ${clients.provinsi}+ provinsi.</p>
    ${clients.grup.map(g => `<div class="stage" style="margin-top:3.6mm">${g.grup}</div><div class="g4" style="gap:3mm">${g.items.map((n, i) => `<div class="tile ${g.grup === "Modern market" && i < 2 ? "hl" : ""}">${n}</div>`).join("")}</div>`).join("")}
  </div>
`, "gray"));

// 15 — Galeri
pages.push(page("Galeri", `
  <div class="fill">
    <div class="kick">Di balik layar</div>
    <h1>Galeri <em>kami</em></h1><div class="bar"></div>
    <div class="grow" style="display:grid; grid-template-columns:repeat(6,1fr); grid-template-rows:repeat(7,1fr); gap:3.4mm">
      ${[["img/team-white.jpg", "1 / 5", "1 / 4", "Tim produksi", "50% 30%"], ["img/rph-gate.jpg", "5 / 7", "1 / 4", "RPHR Jonggol", "50% 30%"],
         ["img/cattle-yard.jpg", "1 / 3", "4 / 6", "Kandang penampungan", "50% 50%"], ["img/ribeye-pair.jpg", "3 / 5", "4 / 6", "Ribeye pilihan", "50% 50%"], ["img/steak-board.jpg", "5 / 7", "4 / 6", "Potongan premium", "50% 50%"],
         ["img/cattle-grass.jpg", "1 / 4", "6 / 8", "Sapi di padang rumput", "50% 50%"], ["img/meat-pile.jpg", "4 / 7", "6 / 8", "Daging segar", "50% 50%"]]
        .map(([pp, c, r, cap, pos]) => `<div class="photo" style="grid-column:${c}; grid-row:${r}; background-image:url('${A(pp)}'); background-position:${pos}; position:relative; box-shadow:0 .6mm 3mm rgba(0,0,0,.18)"><div style="position:absolute; left:0; bottom:3mm; background:var(--y); color:var(--c); font-family:'BC'; font-weight:800; font-size:11.5pt; text-transform:uppercase; letter-spacing:.06em; padding:.4mm 4mm .4mm 3mm; clip-path:polygon(0 0,100% 0,92% 100%,0 100%)">${cap}</div></div>`).join("")}
    </div>
  </div>
`));

// 16 — Prestasi
pages.push(page("Prestasi", `
  <div class="fill">
    <div class="kick">Kepercayaan terbukti</div>
    <h1>Prestasi & <em>kompetensi</em></h1><div class="bar"></div>
    <div class="g2" style="grid-template-columns:repeat(3,1fr); gap:5mm">
      ${awards.map(a => `<div class="card" style="padding:6mm 5mm; border-top:1.8mm solid var(--y)"><div class="cir" style="width:17mm; height:17mm">${ic(a.ic, "width:9mm; height:9mm")}</div><div style="font-family:'BC'; font-weight:800; font-size:20pt; text-transform:uppercase; line-height:1.05; margin:4mm 0 2mm">${a.t}</div><p style="font-size:10pt; margin:0">${a.d}</p></div>`).join("")}
    </div>
    <div class="bandp grow" style="margin-top:9mm; margin-bottom:-22mm; background-image:url('${A("img/steak-board.jpg")}')">
      <div style="position:absolute; inset:0; background:linear-gradient(90deg, rgba(25,25,25,.88), rgba(25,25,25,.15))"></div>
      <div style="position:absolute; left:18mm; top:50%; transform:translateY(-35%); max-width:115mm; color:#fff"><div style="font-family:'BC'; font-weight:800; font-size:30pt; line-height:1.02; text-transform:uppercase">Kualitas konsisten, halal, <span style="color:var(--y)">dan terpercaya</span> di setiap sajian.</div><div class="pill" style="margin-top:4mm; background:var(--y); color:var(--c)">${co.nama}</div></div>
    </div>
  </div>
`, "", "light"));

// 17 — Legalitas
const legal = [["cert/nib.jpg", "NIB", co.nib], ["cert/tanda-daftar-gudang.jpg", "Tanda Daftar Gudang", co.tanda_daftar_gudang], ["cert/nkv-rph.jpg", "NKV RPH · Tingkat I", co.nkv_rph], ["cert/nkv-gudang.jpg", "NKV Gudang · Tingkat I", co.nkv_gudang], ["cert/nkv-rph-surveilans.jpg", "Surveilans NKV RPH", "24 September 2025"], ["cert/nkv-gudang-surveilans.jpg", "Surveilans NKV Gudang", "24 September 2025"]];
pages.push(page("Legalitas", `
  <div class="fill">
    <div class="kick">Legal company</div>
    <h1>Legal & <em>bersertifikat</em></h1><div class="bar"></div>
    <div class="g2" style="grid-template-columns:repeat(3,1fr); gap:6mm 6mm">
      ${legal.map(([pp, t, n]) => `<div><div class="cert" style="height:72mm"><div style="background-image:url('${A(pp)}')"></div></div><div style="font-family:'BC'; font-weight:800; font-size:14.5pt; text-transform:uppercase; margin-top:2.4mm; line-height:1.1">${t}</div><div class="small">${n}</div></div>`).join("")}
    </div>
    <div class="g2" style="margin-top:auto; gap:5mm">
      ${[["Sertifikat Halal PT", co.halal_pt], ["Sertifikat Halal RPH", co.halal_rph]].map(([a, b]) => `<div class="it"><img src="${A("logo/halal.png")}" style="height:13mm"><span class="tx"><small style="font-family:'BC'; font-weight:700; letter-spacing:.14em; text-transform:uppercase; font-size:10.5pt">${a}</small><b style="font-size:11.4pt">${b}</b></span></div>`).join("")}
    </div>
  </div>
`, "gray"));

// 18–22 — Produk
products.forEach((grp, gi) => {
  pages.push(page(`Katalog Produk · ${gi + 1}/${products.length}`, `
    <div class="fill">
      <div class="kick">${grp.kategori}</div>
      <h1>${grp.judul.replace("Secondary · ", "")}</h1><div class="bar" style="margin-bottom:3mm"></div>
      <p class="small" style="max-width:130mm; margin-bottom:4mm">${grp.intro}</p>
      <div class="pg">
        ${grp.items.map((pp, i) => { const f = `products/${slug(pp.nama)}.jpg`; return `<div class="pc">
          ${has(f) ? `<div class="im" style="background-image:url('${A(f)}')"><div class="n">${gi * 6 + i + 1}</div></div>` : `<div class="im none"><div class="n">${gi * 6 + i + 1}</div>FOTO MENYUSUL</div>`}
          <div class="bd"><h3>${pp.nama}</h3><div class="id">${pp.id || "&nbsp;"}</div><div class="u"><small>Cocok untuk</small>${pp.cocok}</div></div></div>`; }).join("")}
      </div>
      ${gi === products.length - 1 ? `<p class="small" style="margin-top:auto">Katalog lengkap (Konro, Neckbone, Backbone, Shank, Intercostal, dan lainnya) tersedia melalui QR di halaman kontak.</p>` : ""}
    </div>
  `, "gray"));
});

// 23 — Kontak (gelap)
const qr = async (u) => (await QRCode.toString(u, { type: "svg", margin: 0, color: { dark: "#2a2a2a", light: "#ffffff" } })).replace(/<\?xml[^>]*>/, "");
const qrCatalog = await qr("https://bit.ly/swmcatalogue");
const qrCompro = await qr("https://bit.ly/swmcompro");
pages.push(page("Kontak", `
  <div class="fill">
    <div class="kick">Hubungi kami</div>
    <h1>Mari bekerja <em>sama</em></h1><div class="bar"></div>
    <p class="lead" style="max-width:150mm">Tim kami siap membantu kebutuhan daging sapi Anda, dari permintaan khusus hingga pengiriman berpendingin.</p>
    <div style="margin-top:2mm">
      ${[["phone", "Call center", co.telepon], ["mail", "Email", co.email], ["globe", "Website", co.website], ["pin", "Kantor", co.alamat_kantor], ["pin", "RPH & produksi", co.alamat_rph]].map(([i, l, v]) => `<div class="cr"><span class="cir">${ic(i, "width:5.5mm; height:5.5mm")}</span><span class="l">${l}</span><b>${v}</b></div>`).join("")}
    </div>
    <div class="g2" style="margin-top:9mm; text-align:center">
      <div><div class="qr">${qrCatalog}</div><div style="font-family:'BC'; font-weight:800; font-size:16pt; text-transform:uppercase; margin-top:2mm">Katalog produk lengkap</div><div class="small" style="color:#bbb">bit.ly/swmcatalogue</div></div>
      <div><div class="qr">${qrCompro}</div><div style="font-family:'BC'; font-weight:800; font-size:16pt; text-transform:uppercase; margin-top:2mm">Unduh company profile</div><div class="small" style="color:#bbb">bit.ly/swmcompro</div></div>
    </div>
    <div class="bandp grow" style="margin-top:7mm; margin-bottom:-22mm; background-image:url('${A("img/meat-closeup.jpg")}')">
      <div style="position:absolute; inset:0; background:rgba(30,30,30,.55)"></div>
      <div style="position:absolute; inset:14mm 18mm 0; display:flex; align-items:center; justify-content:center; text-align:center; font-family:'BC'; font-weight:800; font-size:26pt; text-transform:uppercase; color:#fff; letter-spacing:.04em">“${co.tagline}”</div>
    </div>
  </div>
`, "dark", "light"));

// 24 — Cover belakang
pages.push(`
<section class="page cover">
  <div class="bg" ${bg("img/cattle-yard.jpg")}></div><div class="shade" style="background:rgba(22,22,22,.82)"></div>
  <img class="logo" src="${A("logo/wijaya-yellow.png")}" style="left:50%; transform:translateX(-50%); top:70mm; width:76mm">
  <div style="position:absolute; left:0; right:0; top:134mm; text-align:center; color:#fff">
    <div style="font-family:'BC'; font-weight:800; font-size:30pt; letter-spacing:.06em; text-transform:uppercase">${co.nama}</div>
    <div style="font-style:italic; font-weight:600; font-size:13pt; color:var(--y); margin-top:1mm">“${co.tagline}”</div>
    <div style="display:flex; gap:5mm; justify-content:center; align-items:center; margin-top:12mm">
      <div style="width:19mm; height:19mm; border-radius:50%; background:#fff; padding:1.4mm; display:flex"><img src="${A("logo/nkv-rph.png")}" style="width:100%"></div>
      <div style="width:19mm; height:19mm; border-radius:50%; background:#fff; padding:1.4mm; display:flex"><img src="${A("logo/nkv-gudang.png")}" style="width:100%"></div>
      <div style="background:#fff; border-radius:2mm; padding:2mm 3mm"><img src="${A("logo/halal.png")}" style="height:12mm; display:block"></div>
    </div>
  </div>
  <div class="slab2" style="height:60mm; clip-path:polygon(0 30%,100% 0,100% 100%,0 100%)"></div><div class="slab" style="height:52mm; clip-path:polygon(0 28%,100% 0,100% 100%,0 100%)"></div>
  <div style="position:absolute; left:18mm; right:18mm; bottom:20mm; display:flex; justify-content:space-between; font-family:'BC'; font-weight:800; font-size:14pt; letter-spacing:.08em; text-transform:uppercase; color:var(--c)"><span>${co.website}</span><span>${co.telepon}</span></div>
  <div class="strip"><span>${co.email}</span><span>RPH JONGGOL · KABUPATEN BOGOR</span></div>
</section>`);

export default pages;

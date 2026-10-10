import { readFileSync, existsSync } from "node:fs";
import QRCode from "qrcode";

const read = (p) => JSON.parse(readFileSync(new URL(p, import.meta.url)));
const co = read("../../data/company.json");
const products = read("../../data/products.json");
const clients = read("../../data/clients.json");
const lab = read("../../data/lab.json");
const steps = read("../../data/process.json");
const awards = read("../../data/awards.json");
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const has = (p) => existsSync(new URL(`../../assets/${p}`, import.meta.url));
const I = {
  shield: '<path d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3z"/><path d="M9 12l2 2 4-4"/>',
  snow: '<path d="M12 2v20M4.2 7l15.6 10M4.2 17L19.8 7"/><path d="M9.5 3.5L12 6l2.5-2.5M9.5 20.5L12 18l2.5 2.5"/>',
  award: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/>',
  trophy: '<path d="M8 4h8v5a4 4 0 01-8 0V4zM8 6H4v1a4 4 0 004 4M16 6h4v1a4 4 0 01-4 4M12 13v4M8 21h8M10 17h4"/>',
  users: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5"/><circle cx="17" cy="9" r="2.5"/><path d="M16 15c3 0 5 2 5 5"/>',
  truck: '<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  flask: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3"/><path d="M7.5 15h9"/>',
  leaf: '<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15"/><path d="M5 19c3-5 6-8 11-10"/>'
};
const ic = (n, style = "") => `<svg class="ico" style="${style}" viewBox="0 0 24 24">${I[n]}</svg>`;

const A = (p) => `../assets/${p}`;
const bg = (p, extra = "") => `style="background-image:url('${A(p)}');${extra}"`;
const orn = (c = "") => `<div class="orn ${c}"><i></i></div>`;
const foot = (n, cls = "") => `<div class="ft ${cls}"><span>${co.nama}</span><span class="no">${String(n).padStart(2, "0")}</span><span>Company Profile 2026</span></div>`;

const pages = [];
const page = (sec, body, cls = "") => { const n = pages.length + 1; return `
<section class="page ${cls}">
  <div class="hd">${sec}</div>
  ${body}
  ${foot(n)}
</section>`; };

// 1 — Cover
pages.push(`
<section class="page cover">
  <div class="bg" ${bg("img/cattle-fence.jpg")}></div><div class="shade"></div>
  <div class="frame"><span class="dm" style="left:50%; top:-1.5mm; margin-left:-1.5mm"></span><span class="dm" style="left:50%; bottom:-1.5mm; margin-left:-1.5mm"></span></div>
  <img class="logo" src="${A("logo/wijaya-gold.png")}" alt="Wijaya Meat">
  <div class="ttl">
    <div class="k">Company Profile</div>
    ${orn("c")}
    <div class="nm">PT. Santi Wijaya Meat</div>
    <div class="tg">“${co.tagline}”</div>
  </div>
  <div class="base">
    <div class="badges"><div class="c"><img src="${A("logo/nkv-rph.png")}"></div><div class="c"><img src="${A("logo/nkv-gudang.png")}"></div><div class="h"><img src="${A("logo/halal.png")}"></div></div>
    <div class="addr">RPH Jonggol · Kabupaten Bogor · Jawa Barat</div>
  </div>
</section>`);

// 2 — Kata Pengantar
pages.push(`
<section class="page">
  <div class="split-photo" ${bg("img/owner-farm.jpg")}><div class="cap"><b>${co.owner}</b><span>Pemilik & Direktur Utama</span></div></div>
  <div class="split-edge"></div>
  <div class="split-text">
    <div class="kick">01 · Kata Pengantar</div>
    <h1>Selamat datang di <em>Wijaya Meat</em></h1>
    ${orn()}
    <div class="quote-mark">“</div>
    <p>Salam hormat,</p>
    <p>Selamat datang di <b>${co.nama}</b>, tempat di mana komitmen kami untuk memenuhi kebutuhan Anda menjadi prioritas utama.</p>
    <p>Perjalanan kami dimulai pada tahun 2014 sebagai CV. Wijaya Meat. Pada tahun 2020, kami melangkah lebih jauh dengan resmi menjadi ${co.nama}, didukung fasilitas RPH dan cold storage bersertifikat NKV Tingkat I serta jaminan halal.</p>
    <p>Kami bangga dipercaya memasok daging sapi berkualitas untuk jaringan ritel modern, hotel, restoran, dan mitra industri. Slogan kami, <i>“${co.tagline}”</i>, adalah tekad untuk selalu hadir dengan solusi yang tepat dan standar mutu yang konsisten.</p>
    <p>Melalui company profile ini, kami mengajak Anda mengenal perjalanan, nilai-nilai, dan komitmen kami sebagai mitra yang dapat Anda andalkan.</p>
    <p style="margin-top:2mm">Terima kasih atas kepercayaan Anda.</p>
    <div class="pull">Kami percaya daging sapi berkualitas adalah kunci terciptanya hidangan terbaik.<small>Prinsip kami</small></div>
    <div style="margin-top:auto">
      <div style="font-size:10pt; color:var(--mute)">Salam hangat,</div>
      <div class="sign">${co.owner}</div>
      <div style="font-size:8.4pt; letter-spacing:.16em; text-transform:uppercase; color:var(--mute); margin-top:1mm">Pemilik ${co.nama}</div>
    </div>
  </div>
  <div class="ft" style="left:90mm; right:18mm"><span class="no">02</span><span>Company Profile 2026</span></div>
</section>`);

// 3 — Sejarah
const tl = [
  ["2014", "CV Wijaya Meat", "Awal perjalanan sebagai penyedia daging sapi berkualitas.", 1],
  ["2020", "Resmi menjadi PT", "Akta Pendirian No. 16 (18 April 2020), pengesahan Kemenkumham, dan NIB terbit.", 1],
  ["2021", "NKV Gudang Tingkat I", `Cold storage memperoleh NKV ${co.nkv_gudang}.`, 0],
  ["2023", "NKV RPH Tingkat I", `RPHR Jonggol memperoleh NKV ${co.nkv_rph}.`, 0],
  ["2024", "Penguatan manajemen", "Rafi Bagus Purnomo bergabung sebagai Komisaris; Tanda Daftar Gudang terbit.", 0],
  ["2025", "Surveilans NKV", "Gudang dan RPH mempertahankan predikat Tingkat I (Baik Sekali).", 0],
  ["2026", "Halal RPH", `Sertifikat Halal RPH ${co.halal_rph} dan pembaruan NKV Gudang.`, 1]
];
pages.push(`
<section class="page dark">
  <div class="hd">02 · Sejarah</div>
  <h1>Perjalanan kami <em>sejak 2014</em></h1>
  ${orn()}
  <p class="lead" style="max-width:150mm">Dari usaha penyedia daging sapi di Jonggol, kami tumbuh menjadi perusahaan dengan rumah potong dan gudang berpendingin bersertifikat, melayani pelanggan di berbagai provinsi.</p>
  <div class="tl2">
    ${tl.map(([y, t, d, hi], i) => { const ev = `<div class="ev ${i % 2 ? "R" : "L"}"><div class="y">${y}</div><b>${t}</b><span>${d}</span></div>`;
      return `<div class="row ${hi ? "hi" : ""}">${i % 2 ? "<div></div>" : ev}<div class="mk"><i></i></div>${i % 2 ? ev : "<div></div>"}</div>`; }).join("")}
  </div>
  ${foot(3)}
</section>`);

// 4 — Profil
pages.push(`
<section class="page">
  <div class="hd">03 · Profil Perusahaan</div>
  <div class="fill">
    <h1>Sekilas <em>Wijaya Meat</em></h1>
    <div class="stats">
      <div><b>2014</b><span>Awal berdiri</span></div>
      <div><b>28 Ton</b><span>Kapasitas cold storage</span></div>
      <div><b>Tingkat I</b><span>Predikat NKV RPH & gudang</span></div>
      <div><b>Halal</b><span>Bersertifikat Halal Indonesia</span></div>
    </div>
    <div class="cols2">
      <div><h2>Identitas</h2><table class="kv">
        <tr><td>Nama</td><td>${co.nama}</td></tr><tr><td>Merek</td><td>${co.merek}</td></tr>
        <tr><td>Kantor</td><td>Perum Asabri Blok B No. 20, Sukasirna, Jonggol, Kab. Bogor</td></tr>
        <tr><td>RPH & produksi</td><td>Jl. SMPN 01 Jonggol, Kp. Menan, Sukamaju, Jonggol, Kab. Bogor</td></tr>
        <tr><td>Telepon</td><td>${co.telepon}</td></tr><tr><td>Email</td><td>${co.email}</td></tr><tr><td>Website</td><td>${co.website}</td></tr>
      </table></div>
      <div><h2>Legalitas & sertifikasi</h2><table class="kv">
        <tr><td>NIB</td><td>${co.nib}</td></tr><tr><td>NPWP</td><td>${co.npwp}</td></tr>
        <tr><td>Halal PT</td><td>${co.halal_pt}</td></tr><tr><td>Halal RPH</td><td>${co.halal_rph}</td></tr>
        <tr><td>NKV RPH</td><td>${co.nkv_rph}</td></tr><tr><td>NKV Gudang</td><td>${co.nkv_gudang}</td></tr>
        <tr><td>Reg. produk hewan</td><td>${co.reg_produk}</td></tr>
      </table></div>
    </div>
    <div class="bleed photo" ${bg("img/team-white.jpg", "background-position:50% 30%")}><div class="cap">Tim produksi RPH Jonggol</div></div>
  </div>
  ${foot(4)}
</section>`);


// 5 — Visi & Misi
const misi = [
  "Menyediakan daging sapi segar berkualitas tinggi dan sehat untuk memenuhi kebutuhan pelanggan.",
  "Memberikan layanan yang cepat, handal, dan profesional kepada pelanggan.",
  "Menjalin kemitraan dengan peternak dan produsen untuk memastikan pasokan yang stabil dan berkualitas.",
  "Memastikan keamanan dan kualitas daging melalui kontrol mutu dan keamanan pangan yang ketat.",
  "Membangun tim yang solid, profesional, dan berdedikasi tinggi dalam melayani pelanggan.",
  "Mengembangkan teknologi dan inovasi dalam manajemen distribusi untuk efisiensi dan produktivitas."
];
pages.push(page("04 · Visi & Misi", `
  <div class="fill">
    <div class="band" style="margin-top:-6mm; height:108mm; background-image:url('${A("img/cattle-yard.jpg")}'); display:flex; align-items:center; justify-content:center; text-align:center; padding:0 26mm">
      <div><div class="sc" style="color:var(--gold); margin-bottom:4mm">Visi</div>
      <div style="font-family:'PF'; font-style:italic; font-size:17pt; line-height:1.5; color:var(--ivory)">“Menjadi perusahaan distribusi daging sapi terbaik dan terpercaya di Indonesia yang memberikan kepuasan kepada pelanggan dengan kualitas daging terbaik serta harga yang terjangkau.”</div>
      ${orn("c")}</div>
    </div>
    <div style="margin-top:9mm"><div class="kick">Misi</div><h1 style="font-size:26pt">Enam komitmen <em>kami</em></h1></div>
    <div class="g2" style="gap:0 10mm; margin-top:5mm">
      ${misi.map((m, i) => `<div class="li"><span class="num">${String(i + 1).padStart(2, "0")}</span><span>${m}</span></div>`).join("")}
    </div>
  </div>
`));

// 6 — Organisasi
const divs = [["Produksi", "RPH & boning"], ["Warehouse", "Cold storage"], ["Quality Control", "Mutu & keamanan pangan"], ["Marketing", "Penjualan & pelanggan"], ["Operasional", "Operasional harian"], ["Finance", "Keuangan"], ["Delivery", "Distribusi berpendingin"]];
const nodeTop = (n, r, dark) => `<div style="border:.3mm solid var(--gold); ${dark ? "background:var(--char); color:var(--ivory);" : "background:var(--paper);"} padding:4mm 10mm; text-align:center; min-width:70mm"><div style="font-family:'PF'; font-size:14pt">${n}</div><div class="sc" style="margin-top:1mm">${r}</div></div>`;
const vline = `<div style="width:.3mm; height:8mm; background:var(--gold); margin:0 auto"></div>`;
pages.push(page("05 · Organisasi", `
  <div class="fill">
    <h1>Struktur <em>organisasi</em></h1>${orn()}
    <div style="display:flex; flex-direction:column; align-items:center; margin-top:4mm">
      ${nodeTop(co.komisaris, "Komisaris", true)}${vline}${nodeTop(co.direktur, "Direktur Utama", false)}${vline}
      <div style="width:150mm; height:.3mm; background:var(--gold)"></div>
    </div>
    <div class="g4" style="gap:4mm; margin-top:7mm">${divs.slice(0, 4).map(([t, d]) => `<div style="border-top:.6mm solid var(--gold); background:var(--ivory); padding:4mm 3mm; text-align:center"><div style="font-family:'PF'; font-size:12.5pt">${t}</div><div class="small" style="margin-top:1mm">${d}</div></div>`).join("")}</div>
    <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:4mm; width:75%; margin:4mm auto 0">${divs.slice(4).map(([t, d]) => `<div style="border-top:.6mm solid var(--gold); background:var(--ivory); padding:4mm 3mm; text-align:center"><div style="font-family:'PF'; font-size:12.5pt">${t}</div><div class="small" style="margin-top:1mm">${d}</div></div>`).join("")}</div>
    <div class="stats" style="grid-template-columns:repeat(3,1fr); margin-top:9mm">
      <div><b>${co.karyawan}</b><span>Karyawan</span></div>
      <div><b style="font-size:15pt; white-space:normal">${co.komisaris}</b><span>Penanggung jawab teknis</span></div>
      <div><b style="font-size:15pt; white-space:normal">drh. Soetrisno, MM</b><span>Dokter hewan penanggung jawab</span></div>
    </div>
    <div class="bleed photo grow" style="margin-top:2mm; background-image:url('${A("img/team-white.jpg")}'); background-position:50% 30%"><div class="cap">Tim kami di RPH Jonggol</div></div>
  </div>
`));

// 7 — Fasilitas
pages.push(page("06 · Fasilitas", `
  <div class="fill">
    <h1>Fasilitas yang <em>terstandar</em></h1>${orn()}
    <div class="g2" style="gap:7mm">
      <div><div class="ph-frame" style="height:82mm; background-image:url('${A("img/rph-gate.jpg")}'); background-position:50% 32%"></div>
        <div class="sc" style="margin-top:4mm">NKV ${co.nkv_rph} · Tingkat I</div>
        <h2 style="margin-top:1.5mm">RPH Jonggol</h2>
        <p style="font-size:10pt; margin:0">Rumah potong dan fasilitas produksi di Jl. SMPN 01 Jonggol, Kp. Menan, Desa Sukamaju, Kabupaten Bogor.</p></div>
      <div><div style="height:82mm; background:radial-gradient(circle at 75% 20%, #2f5a6c 0, transparent 55%), linear-gradient(160deg,#152430,#0f171d); position:relative; display:flex; flex-direction:column; justify-content:center; align-items:center; color:var(--ivory)">
          <div style="position:absolute; inset:2.2mm; border:.25mm solid rgba(198,160,82,.6)"></div>
          <div class="sc" style="color:var(--gold-l)">Chill</div><div style="font-family:'PF'; font-size:24pt; margin:1mm 0 5mm">0 s.d. -5°C</div>
          <div style="width:30mm; height:.25mm; background:var(--gold)"></div>
          <div class="sc" style="color:var(--gold-l); margin-top:5mm">Frozen</div><div style="font-family:'PF'; font-size:24pt; margin-top:1mm">-17 s.d. -28°C</div></div>
        <div class="sc" style="margin-top:4mm">NKV ${co.nkv_gudang} · Tingkat I</div>
        <h2 style="margin-top:1.5mm">Cold Storage</h2>
        <p style="font-size:10pt; margin:0">Gudang berpendingin di Perum Asabri Blok B No. 20, Sukasirna, Jonggol, dengan suhu terkontrol.</p></div>
    </div>
    <div class="stats" style="margin-top:7mm">
      <div><b>28 Ton</b><span>Kapasitas</span></div><div><b>80 m²</b><span>Luas gudang</span></div>
      <div><b>1–2 Ton</b><span>Perputaran per hari</span></div><div><b>FIFO</b><span>Rotasi stok</span></div>
    </div>
    <div class="g2" style="gap:0 10mm">
      ${["Palet plastik food grade, minimal 15 cm dari lantai", "Jarak tumpukan 10–15 cm dari dinding, 50 cm dari evaporator", "Anteroom tertutup untuk bongkar muat", "Pencatatan suhu 3 kali sehari dan pengendalian hama berkala"].map((t, i) => `<div class="li"><span class="num" style="font-size:12pt">◆</span><span>${t}</span></div>`).join("")}
    </div>
  </div>
`));

// 8 — Proses Produksi (gelap)
const phase = { 1: "Penerimaan", 2: "Penyembelihan", 3: "Pasca-potong" };
pages.push(page("07 · Proses Produksi", `
  <div class="fill">
    <h1>Dari kandang hingga <em>meja Anda</em></h1>${orn()}
    <div class="g2" style="gap:0 10mm">
      ${[steps.slice(0, 8), steps.slice(8)].map((col, ci) => `<div>${col.map(([ph, t, d], j) => { const i = ci * 8 + j; const first = i === 0 || steps[i - 1][0] !== ph;
        return `${first ? `<div class="sc" style="margin:${i ? "4mm" : "0"} 0 1mm">${phase[ph]}</div>` : ""}<div class="li" style="padding:1.5mm 0"><span class="num" style="font-size:13pt">${String(i + 1).padStart(2, "0")}</span><span><b style="font-weight:600; color:var(--ivory)">${t}</b><br><span style="font-size:9.2pt; color:#b4ab9c">${d}</span></span></div>`; }).join("")}</div>`).join("")}
    </div>
    <div style="display:flex; align-items:center; gap:8mm; margin-top:auto">
      <img src="${A("img/cow-diagram.jpg")}" style="height:40mm">
      <div><div class="sc">Potongan primal sapi</div><p style="font-size:9.6pt; color:#cfc6b6; margin-top:2mm">Chuck 26% · Round 27% · Sirloin 9% · Rib 9,5% · Short loin 8% · Short plate 5,5% · Brisket 6% · Fore shank 4% · Flank 4%.</p><div class="small">Persentase indikatif, dapat berbeda tiap ekor.</div></div>
    </div>
  </div>
`, "dark"));

// 9 — Jaminan Mutu
pages.push(page("08 · Jaminan Mutu", `
  <div class="fill">
    <h1>Aman, higienis, <em>terlacak</em></h1>${orn()}
    <div class="g3">
      <div class="pillar">${ic("shield", "color:var(--gold-d)")}<h3>GWP & GHP</h3><p>Good Warehousing Practices dan Good Hygiene Practices di seluruh area gudang dan RPH.</p></div>
      <div class="pillar">${ic("snow", "color:var(--gold-d)")}<h3>Rantai dingin</h3><p>Chill 0 s.d. -5°C dan frozen -17 s.d. -28°C, dicatat 3 kali sehari.</p></div>
      <div class="pillar">${ic("award", "color:var(--gold-d)")}<h3>Veteriner</h3><p>Di bawah pengawasan Otoritas Veteriner, dengan dokter hewan penanggung jawab teknis.</p></div>
    </div>
    <h2 style="margin-top:9mm">Program uji laboratorium</h2>
    <div class="g2" style="gap:0 10mm">
      <div class="li" style="display:block"><div class="num" style="font-size:20pt">3 bulan</div><div style="margin-top:1.5mm"><b>Daging & jeroan</b> diuji di BPMSPH Kabupaten Bogor, laboratorium terakreditasi KAN.</div></div>
      <div class="li" style="display:block"><div class="num" style="font-size:20pt">1 tahun</div><div style="margin-top:1.5mm"><b>Air, karyawan & peralatan</b> diuji di SIG, laboratorium terakreditasi KAN.</div></div>
    </div>
    <h2 style="margin-top:8mm">Alur penyimpanan berpendingin</h2>
    <div style="display:grid; grid-template-columns:repeat(7,1fr); border-top:.3mm solid var(--gold)">
      ${["Penerimaan & cek dokumen", "Bongkar di anteroom", "Timbang & label", "Simpan chill / frozen", "Monitor suhu", "Dispatch FIFO", "Muat armada berpendingin"].map((t, i) => `<div style="padding:3mm 2mm 0 0"><div class="num" style="font-size:16pt">${i + 1}</div><div style="font-size:9pt; line-height:1.4; margin-top:1.5mm">${t}</div></div>`).join("")}
    </div>
    <p class="small" style="margin-top:5mm">Setiap produk masuk disertai Certificate of Analysis (CoA) dan sertifikat veteriner dari unit asal.</p>
    <div class="bleed photo grow" style="margin-top:3mm; background-image:url('${A("img/team-white.jpg")}'); background-position:50% 18%"><div class="cap">Higiene personal di area produksi</div></div>
  </div>
`));

// 10 — Hasil Uji Lab
const okc = (v) => v.startsWith("Negatif") ? `<span class="ok">${v}</span>` : `<span class="val">${v}</span>`;
pages.push(page("09 · Hasil Uji Laboratorium", `
  <div class="fill">
    <h1>Hasil uji <em>laboratorium</em></h1>${orn()}
    <div class="sc" style="margin-bottom:2mm">Daging & jeroan · ${lab.bpmsph.lab}</div>
    <table class="lab"><tr><th>Parameter</th>${lab.bpmsph.kolom.map(k => `<th>${k.sampel}<br><span style="text-transform:none; letter-spacing:0">Terbit ${k.terbit}</span></th>`).join("")}</tr>
      ${lab.bpmsph.baris.map(r => `<tr><td>${r.nama}<small>${r.metode}</small></td>${r.nilai.map(v => `<td>${okc(v)}</td>`).join("")}</tr>`).join("")}</table>
    <div class="sc" style="margin:7mm 0 2mm">Air proses · SIG (KAN) · acuan PERMENKES 2/2023</div>
    <table class="lab"><tr><th>Parameter</th><th>Hasil</th><th>Standar</th></tr>
      ${lab.air.tiles.map(t => `<tr><td>${t.p}</td><td>${okc(t.v)}</td><td style="color:var(--mute)">${t.s.replace("std ", "")}</td></tr>`).join("")}</table>
    <div class="sc" style="margin:7mm 0 2mm">Higiene permukaan & karyawan · SIG (KAN)</div>
    <table class="lab"><tr><th>Parameter</th>${lab.permukaan.kolom.map(k => `<th>${k}</th>`).join("")}</tr>
      ${lab.permukaan.baris.map(r => `<tr><td>${r.nama}<small>${r.metode}</small></td>${r.nilai.map(v => `<td>${okc(v)}</td>`).join("")}</tr>`).join("")}</table>
    <p class="small" style="margin-top:auto">Sampling higiene 9 September 2026 di RPHR Jonggol. ALT per swab (karyawan, pisau) atau per 100 cm² (keranjang). Hasil hanya berlaku untuk sampel yang diuji; laporan asli tersedia atas permintaan.</p>
  </div>
`));

// 11 — Tim Ahli (gelap)
const init = (n) => n.split(" ").map(w => w[0]).slice(0, 2).join("");
pages.push(page("10 · Tim Ahli", `
  <div class="fill">
    <h1>Tenaga <em>bersertifikat</em></h1>${orn()}
    <p class="lead" style="max-width:150mm">Proses halal dan kesejahteraan hewan di RPH kami dijalankan oleh tenaga yang memiliki sertifikat kompetensi di bidangnya.</p>
    <div class="g3" style="gap:8mm 9mm; margin-top:5mm">
      ${co.tim.map(t => { const f = `team/${slug(t.nama)}.jpg`; return `<div style="text-align:center">
        <div class="portrait" style="${has(f) ? `background:url('${A(f)}') center/cover;` : ""}">${has(f) ? "" : `<span>${init(t.nama)}</span>`}</div>
        <div style="font-family:'PF'; font-size:13pt; margin-top:3mm">${t.nama}</div><div class="sc" style="margin-top:1mm">${t.jabatan}</div></div>`; }).join("")}
    </div>
    <div class="g4 hair grow" style="margin-top:8mm; padding-top:5mm; gap:5mm; align-items:start">
      ${[["Penyelia Halal", "Penjamin proses produk halal"], ["Juleha", "Juru sembelih halal"], ["AWO", "Animal Welfare Officer"], ["Stunner", "Operator pemingsanan hewan"]].map(([a, b]) => `<div><div style="font-family:'PF'; font-size:12pt; color:var(--gold)">${a}</div><div class="small">${b}</div></div>`).join("")}
    </div>
  </div>
`, "dark"));

// 12 — Halal & Lingkungan
const halal = ["Menyediakan SDM serta sarana dan prasarana yang mendukung Proses Produk Halal (PPH).", "Mematuhi peraturan perundang-undangan tentang Jaminan Produk Halal (JPH).", "Menggunakan bahan halal dan melaksanakan PPH sesuai ketentuan.", "Memastikan kebijakan halal dipahami dan diterapkan seluruh personel RPH.", "Mengomunikasikan kebijakan halal kepada seluruh pihak terkait.", "Melaksanakan kebijakan halal secara konsisten."];
pages.push(page("11 · Halal & Lingkungan", `
  <div class="fill">
    <div style="display:flex; justify-content:space-between; align-items:flex-end; gap:8mm">
      <div><h1>Komitmen <em>halal</em></h1>${orn()}</div>
      <div style="text-align:right"><img src="${A("logo/halal.png")}" style="height:22mm"><div class="small" style="margin-top:1mm">PT ${co.halal_pt}<br>RPH ${co.halal_rph}</div></div>
    </div>
    <div class="g2" style="gap:0 10mm; margin-top:2mm">
      ${halal.map((m, i) => `<div class="li"><span class="num">${String(i + 1).padStart(2, "0")}</span><span>${m}</span></div>`).join("")}
    </div>
    <div class="grow" style="display:grid; grid-template-columns:1fr 78mm; gap:8mm; margin-top:9mm">
      <div><div class="kick">Keberlanjutan</div><h1 style="font-size:24pt">Tanggung jawab <em>lingkungan</em></h1>${orn()}
        <p style="font-size:10.4pt">Limbah produksi dikelola dengan sistem terintegrasi dan ditangani setiap saat. Kami bekerja sama dengan Dinas Lingkungan Hidup setempat dalam prosedur perawatan dan pembuangan limbah sesuai regulasi yang berlaku.</p>
        <div style="display:flex; gap:3mm; align-items:center; color:var(--gold-d)">${ic("leaf")}<span class="sc">Pengelolaan limbah sesuai regulasi</span></div></div>
      <div class="ph-frame" style="background-image:url('${A("img/cattle-pen.jpg")}')"></div>
    </div>
  </div>
`));

// 13 — Distribusi (gelap)
const dest = clients.wilayah;
pages.push(page("12 · Distribusi", `
  <div class="fill">
    <h1>Menjangkau <em>hampir seluruh Indonesia</em></h1>${orn()}
    <svg viewBox="0 0 180 118" style="width:100%; height:92mm; display:block; margin-top:-2mm">
      ${dest.map(d => `<line x1="90" y1="58" x2="${d.x}" y2="${d.y}" stroke="#c6a052" stroke-width=".5" stroke-dasharray="1.6 1.4"/>`).join("")}
      ${dest.map(d => `<rect x="${d.x - 2.6}" y="${d.y - 2.6}" width="5.2" height="5.2" transform="rotate(45 ${d.x} ${d.y})" fill="${d.core ? "#c6a052" : "#151311"}" stroke="#c6a052" stroke-width=".6"/><text x="${d.x}" y="${d.y + 9}" text-anchor="middle" font-size="4.6" fill="#f6f1e6" font-family="PF">${d.n}</text>`).join("")}
      <circle cx="90" cy="58" r="7" fill="none" stroke="#c6a052" stroke-width=".5"/><circle cx="90" cy="58" r="3.2" fill="#c6a052"/>
      <text x="90" y="74" text-anchor="middle" font-size="5.4" fill="#e7d5a6" font-family="PF" font-style="italic">RPH Jonggol</text>
    </svg>
    <div class="stats" style="margin-top:2mm; border-top-color:var(--gold); border-bottom-color:rgba(198,160,82,.3)">
      <div style="border-left-color:rgba(198,160,82,.3)"><b style="color:var(--gold)">${co.armada}</b><span>Armada berpendingin</span></div>
      <div style="border-left-color:rgba(198,160,82,.3)"><b style="color:var(--gold)">${clients.provinsi}+</b><span>Provinsi terlayani</span></div>
      <div style="border-left-color:rgba(198,160,82,.3)"><b style="color:var(--gold)">1–2 Ton</b><span>Perputaran harian</span></div>
      <div style="border-left-color:rgba(198,160,82,.3)"><b style="color:var(--gold)">100+</b><span>Titik pengiriman</span></div>
    </div>
    <div class="g2 grow" style="gap:0 10mm">
      <div><div class="sc" style="margin-bottom:1mm">Standar pengiriman</div>
        ${["Pra-pendinginan boks sesuai produk sebelum muat", "Pemuatan cepat ke mobil box berpendingin", "Surat jalan dan log pengeluaran tercatat", "Rantai dingin terjaga hingga pelanggan"].map(t => `<div class="li"><span class="num" style="font-size:11pt">◆</span><span>${t}</span></div>`).join("")}</div>
      <div><div class="sc" style="margin-bottom:1mm">Segmen pelanggan</div>
        ${clients.segmen.map(t => `<div class="li"><span class="num" style="font-size:11pt">◆</span><span style="font-family:'PF'; font-size:12pt">${t}</span></div>`).join("")}</div>
    </div>
  </div>
`, "dark"));

// 14 — Klien
pages.push(page("13 · Klien & Mitra", `
  <div class="fill">
    <h1>Dipercaya <em>mitra terbaik</em></h1>${orn()}
    <p class="lead" style="font-size:11pt">Melayani ${clients.segmen.join(", ").toLowerCase()} di ${clients.provinsi}+ provinsi.</p>
    ${clients.grup.map(g => `<div class="sc" style="margin:6mm 0 2.5mm">${g.grup}</div><div class="name-grid">${g.items.map((n, i) => `<div class="${g.grup === "Modern market" && i < 2 ? "main" : ""}">${n}</div>`).join("")}</div>`).join("")}
  </div>
`));

// 15 — Galeri (gelap)
pages.push(page("14 · Galeri", `
  <div class="fill">
    <h1>Di balik <em>layar</em></h1>${orn()}
    <div class="grow" style="display:grid; grid-template-columns:repeat(6,1fr); grid-template-rows:repeat(7,1fr); gap:3mm">
      ${[["img/team-white.jpg", "1 / 5", "1 / 4", "Tim produksi", "50% 30%"], ["img/rph-gate.jpg", "5 / 7", "1 / 4", "RPHR Jonggol", "50% 30%"],
         ["img/cattle-yard.jpg", "1 / 3", "4 / 6", "Kandang penampungan", "50% 50%"], ["img/ribeye-pair.jpg", "3 / 5", "4 / 6", "Ribeye pilihan", "50% 50%"], ["img/steak-board.jpg", "5 / 7", "4 / 6", "Potongan premium", "50% 50%"],
         ["img/cattle-grass.jpg", "1 / 4", "6 / 8", "Sapi di padang rumput", "50% 50%"], ["img/meat-pile.jpg", "4 / 7", "6 / 8", "Daging segar", "50% 50%"]]
        .map(([p, c, r, cap, pos]) => `<div class="ph-frame" style="grid-column:${c}; grid-row:${r}; background-image:url('${A(p)}'); background-position:${pos}"><div class="capbar">${cap}</div></div>`).join("")}
    </div>
  </div>
`, "dark"));

// 16 — Prestasi
pages.push(page("15 · Prestasi", `
  <div class="fill">
    <h1>Kepercayaan yang <em>terbukti</em></h1>${orn()}
    <div class="g2" style="gap:8mm 10mm; margin-top:2mm">
      ${awards.map(a => `<div class="pillar" style="padding-top:5mm"><div style="width:14mm; height:14mm; border:.3mm solid var(--gold); border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--gold-d)">${ic(a.ic, "width:7mm; height:7mm")}</div><h3 style="font-size:15pt; margin-top:4mm">${a.t}</h3><p>${a.d}</p></div>`).join("")}
    </div>
    <div class="band grow" style="margin-top:10mm; background-image:url('${A("img/steak-board.jpg")}'); display:flex; align-items:center; padding:0 20mm">
      <div style="max-width:120mm; color:var(--ivory)"><div style="font-family:'PF'; font-style:italic; font-size:18pt; line-height:1.4">“Kualitas konsisten, halal, dan terpercaya di setiap sajian.”</div>${orn()}<div class="sc" style="color:var(--gold)">${co.nama}</div></div>
    </div>
  </div>
`));

// 17 — Legalitas
const legal = [["cert/nib.jpg", "NIB", co.nib], ["cert/tanda-daftar-gudang.jpg", "Tanda Daftar Gudang", co.tanda_daftar_gudang], ["cert/nkv-rph.jpg", "NKV RPH · Tingkat I", co.nkv_rph], ["cert/nkv-gudang.jpg", "NKV Gudang · Tingkat I", co.nkv_gudang], ["cert/nkv-rph-surveilans.jpg", "Surveilans NKV RPH", "24 September 2025"], ["cert/nkv-gudang-surveilans.jpg", "Surveilans NKV Gudang", "24 September 2025"]];
pages.push(page("16 · Legalitas", `
  <div class="fill">
    <h1>Legal & <em>bersertifikat</em></h1>${orn()}
    <div class="g3" style="gap:7mm 7mm">
      ${legal.map(([p, t, n]) => `<div><div class="cert" style="height:74mm"><div style="background-image:url('${A(p)}')"></div></div><div style="font-family:'PF'; font-size:11.5pt; margin-top:3mm">${t}</div><div class="small">${n}</div></div>`).join("")}
    </div>
    <div class="g2 hair" style="margin-top:auto; padding-top:5mm">
      <div style="display:flex; gap:4mm; align-items:center"><img src="${A("logo/halal.png")}" style="height:13mm"><div><div class="sc">Sertifikat Halal PT</div><div style="font-weight:600">${co.halal_pt}</div></div></div>
      <div style="display:flex; gap:4mm; align-items:center"><img src="${A("logo/halal.png")}" style="height:13mm"><div><div class="sc">Sertifikat Halal RPH</div><div style="font-weight:600">${co.halal_rph}</div></div></div>
    </div>
  </div>
`));

// 18–22 — Produk
products.forEach((grp, gi) => {
  pages.push(page(`17 · Katalog Produk · ${gi + 1}/${products.length}`, `
    <div class="fill">
      <div style="display:flex; justify-content:space-between; align-items:flex-end; gap:10mm">
        <div><div class="kick">${grp.kategori}</div><h1 style="font-size:27pt">${grp.judul.replace("Secondary · ", "")}</h1></div>
        <p class="small" style="max-width:68mm; text-align:right; margin:0 0 1.5mm">${grp.intro}</p>
      </div>
      ${orn()}
      <div class="g2" style="gap:5.5mm 9mm">
        ${grp.items.map(p => { const f = `products/${slug(p.nama)}.jpg`; return `<div class="pcard2">
          ${has(f) ? `<div class="im" style="background-image:url('${A(f)}')"></div>` : `<div class="im none"><span>Foto menyusul</span></div>`}
          <h3>${p.nama}</h3><div class="id">${p.id || "&nbsp;"}</div><div class="u"><span class="sc" style="font-size:7.2pt">Cocok untuk</span><br>${p.cocok}</div></div>`; }).join("")}
      </div>
      ${gi === products.length - 1 ? `<p class="small" style="margin-top:auto">Katalog lengkap (Konro, Neckbone, Backbone, Shank, Intercostal, dan lainnya) tersedia melalui QR di halaman kontak.</p>` : ""}
    </div>
  `));
});

// 23 — Kontak (gelap)
const qr = async (u) => (await QRCode.toString(u, { type: "svg", margin: 0, color: { dark: "#151311", light: "#ffffff" } })).replace(/<\?xml[^>]*>/, "");
const qrCatalog = await qr("https://bit.ly/swmcatalogue");
const qrCompro = await qr("https://bit.ly/swmcompro");
pages.push(page("18 · Kontak", `
  <div class="fill">
    <h1>Mari bekerja <em>sama</em></h1>${orn()}
    <p class="lead" style="max-width:150mm">Tim kami siap membantu kebutuhan daging sapi Anda, dari permintaan khusus hingga pengiriman berpendingin.</p>
    <div style="margin-top:4mm">
      <div class="contact-row"><span class="sc">Call center</span><b>${co.telepon}</b></div>
      <div class="contact-row"><span class="sc">Email</span><b>${co.email}</b></div>
      <div class="contact-row"><span class="sc">Website</span><b>${co.website}</b></div>
      <div class="contact-row"><span class="sc">Kantor</span><b class="sm">${co.alamat_kantor}</b></div>
      <div class="contact-row"><span class="sc">RPH & produksi</span><b class="sm">${co.alamat_rph}</b></div>
    </div>
    <div class="g2" style="margin-top:9mm; text-align:center">
      <div><div class="qr">${qrCatalog}</div><div style="font-family:'PF'; font-size:12pt; margin-top:3mm">Katalog produk lengkap</div><div class="small">bit.ly/swmcatalogue</div></div>
      <div><div class="qr">${qrCompro}</div><div style="font-family:'PF'; font-size:12pt; margin-top:3mm">Unduh company profile</div><div class="small">bit.ly/swmcompro</div></div>
    </div>
    <div class="band grow" style="margin-top:9mm; background-image:url('${A("img/meat-closeup.jpg")}'); display:flex; align-items:center; justify-content:center; text-align:center">
      <div style="font-family:'PF'; font-style:italic; font-size:16pt; color:var(--ivory)">“${co.tagline}”</div>
    </div>
  </div>
`, "dark"));

// 24 — Cover belakang
pages.push(`
<section class="page cover">
  <div class="bg" ${bg("img/cattle-yard.jpg")}></div><div class="shade" style="background:rgba(13,12,10,.86)"></div>
  <div class="frame"><span class="dm" style="left:50%; top:-1.5mm; margin-left:-1.5mm"></span><span class="dm" style="left:50%; bottom:-1.5mm; margin-left:-1.5mm"></span></div>
  <img class="logo" src="${A("logo/wijaya-gold.png")}" style="top:92mm; width:66mm">
  <div class="ttl" style="top:170mm"><div class="nm" style="font-size:22pt">${co.nama}</div><div class="tg">“${co.tagline}”</div>${orn("c")}</div>
  <div class="base">
    <div class="badges"><div class="c"><img src="${A("logo/nkv-rph.png")}"></div><div class="c"><img src="${A("logo/nkv-gudang.png")}"></div><div class="h"><img src="${A("logo/halal.png")}"></div></div>
    <div class="addr">${co.website} · ${co.telepon}</div>
  </div>
</section>`);

export default pages;

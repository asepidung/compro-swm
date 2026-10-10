import { readFileSync } from "node:fs";

const read = (p) => JSON.parse(readFileSync(new URL(p, import.meta.url)));
const co = read("../../data/company.json");

const A = (p) => `../assets/${p}`;
const bg = (p, extra = "") => `style="background-image:url('${A(p)}');${extra}"`;
const orn = (c = "") => `<div class="orn ${c}"><i></i></div>`;
const foot = (n, cls = "") => `<div class="ft ${cls}"><span>${co.nama}</span><span class="no">${String(n).padStart(2, "0")}</span><span>Company Profile 2026</span></div>`;

const pages = [];

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

export default pages;

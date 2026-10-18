import { readFileSync, existsSync } from "node:fs";

const read = (p) => JSON.parse(readFileSync(new URL(p, import.meta.url)));
const co = read("../../data/company.json");
const products = read("../../data/products.json");
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

// 5 — Produk (contoh: Prime Cuts)
const g = products[0];
pages.push(page("Katalog Produk · 1/5", `
  <div class="kick">${g.kategori}</div>
  <h1>${g.judul}</h1><div class="bar" style="margin-bottom:3mm"></div>
  <p class="small" style="max-width:130mm; margin-bottom:4mm">${g.intro}</p>
  <div class="pg">
    ${g.items.map((p, i) => { const f = `products/${slug(p.nama)}.jpg`; return `<div class="pc">
      ${has(f) ? `<div class="im" style="background-image:url('${A(f)}')"><div class="n">${i + 1}</div></div>` : `<div class="im none"><div class="n">${i + 1}</div>FOTO MENYUSUL</div>`}
      <div class="bd"><h3>${p.nama}</h3><div class="id">${p.id || "&nbsp;"}</div><div class="u"><small>Cocok untuk</small>${p.cocok}</div></div></div>`; }).join("")}
  </div>
`, "gray"));

export default pages;

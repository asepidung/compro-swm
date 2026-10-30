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


const HEXP = "50,0 100,25 100,75 50,100 0,75 0,25";

// ---------- 1 — Cover: sarang lebah ----------
const W = 60, H = W * 1.1547, RS = H * 0.75, GAP = 2.2;
const fills = {
  "0,0": "img/cattle-grass.jpg", "0,1": "img/ribeye-pair.jpg", "0,2": "img/cattle-fence.jpg", "0,3": "Y",
  "1,0": "img/steak-board.jpg", "1,1": "LOGO", "1,2": "img/rph-gate.jpg", "1,3": "img/meat-pile.jpg",
  "2,0": "Y", "2,1": "img/team-white.jpg", "2,2": "img/cattle-yard.jpg", "2,3": "img/tbone-dark.jpg",
  "3,0": "img/beef-cut-board.jpg", "3,1": "D", "3,2": "img/cattle-pen.jpg", "3,3": "Y"
};
let cells = "";
for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
  const x = (r % 2 ? 13 : -17) + c * W, y = -26 + r * RS, f = fills[`${r},${c}`]; if (!f) continue;
  const st = `left:${x + GAP / 2}mm; top:${y + GAP / 2}mm; width:${W - GAP}mm; height:${H - GAP}mm;`;
  if (f === "Y") cells += `<div class="cell hex" style="${st} background:var(--y)"></div>`;
  else if (f === "D") cells += `<div class="cell hex" style="${st} background:#2c2c2c"></div>`;
  else if (f === "LOGO") cells += `<div class="cell hex" style="${st} background:#1b1b1b; display:flex; align-items:center; justify-content:center"><img src="${A("logo/wijaya-yellow.png")}" style="width:42mm"></div>`;
  else cells += `<div class="cell hex" style="${st} background-image:url('${A(f)}')"></div>`;
}
pages.push(`
<section class="page cover4">
  ${cells}
  <div class="fade"></div>
  <div class="ttl">
    <div class="kick" style="color:var(--y)">Edisi 2026</div>
    <h1>Company<br><span>Profile</span></h1>
    <div class="nm">PT. Santi Wijaya Meat</div>
    <div class="tg">“${co.tagline}”</div>
  </div>
  <div style="position:absolute; right:18mm; bottom:28mm; display:flex; gap:3mm; align-items:center">
    <div style="width:15mm; height:15mm; border-radius:50%; background:#fff; padding:1.2mm; display:flex"><img src="${A("logo/nkv-rph.png")}" style="width:100%"></div>
    <div style="width:15mm; height:15mm; border-radius:50%; background:#fff; padding:1.2mm; display:flex"><img src="${A("logo/nkv-gudang.png")}" style="width:100%"></div>
    <div style="background:#fff; border-radius:2mm; padding:1.4mm 2mm"><img src="${A("logo/halal.png")}" style="height:9.5mm; display:block"></div>
  </div>
  <div class="stripe"><span>RPH Jonggol · Kabupaten Bogor</span><span>${co.website}</span></div>
</section>`);

// ---------- 2 — Kata Pengantar ----------
pages.push(page("Kata Pengantar", `
  <svg style="position:absolute; left:-6mm; top:34mm; width:100mm; height:115.5mm; overflow:visible" viewBox="0 0 100 100" preserveAspectRatio="none"><polygon points="${HEXP}" fill="none" stroke="#f7b500" stroke-width="1.4" vector-effect="non-scaling-stroke"/></svg>
  <div class="hex" style="position:absolute; left:-16mm; top:24mm; width:100mm; height:115.5mm; background:url('${A("img/owner-farm.jpg")}') 45% 40%/cover"></div>
  <div style="position:absolute; left:18mm; top:156mm; width:62mm">
    <div style="background:var(--c); color:#fff; padding:4mm 5mm; border-radius:3mm; border-left:2mm solid var(--y)">
      <div style="font-family:'BC'; font-weight:800; font-size:16pt; text-transform:uppercase; line-height:1.05">${co.owner}</div>
      <div style="font-size:9.2pt; color:#ddd; font-weight:600; margin-top:1mm">Pemilik & Direktur Utama</div>
    </div>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:3mm; margin-top:4mm">
      <div class="stat" style="padding:3.4mm"><b style="font-size:24pt">2014</b><span>CV Wijaya Meat</span></div>
      <div class="stat" style="padding:3.4mm"><b style="font-size:24pt">2020</b><span>Resmi PT</span></div>
    </div>
  </div>
  <div style="position:absolute; left:92mm; right:18mm; top:30mm">
    <div class="kick">Sambutan</div>
    <h1 style="font-size:36pt">Selamat datang di <em>Wijaya Meat</em></h1><div class="bar"></div>
    <p>Salam hormat,</p>
    <p>Selamat datang di <b>${co.nama}</b>, tempat di mana komitmen kami untuk memenuhi kebutuhan Anda menjadi prioritas utama.</p>
    <p>Perjalanan kami dimulai tahun 2014 sebagai CV. Wijaya Meat. Pada tahun 2020 kami resmi menjadi ${co.nama}, didukung rumah potong dan cold storage bersertifikat NKV Tingkat I serta jaminan halal.</p>
    <p>Kami bangga dipercaya memasok daging sapi berkualitas untuk jaringan ritel modern, hotel, restoran, dan mitra industri. Slogan kami, <i>“${co.tagline}”</i>, adalah tekad untuk selalu hadir dengan solusi yang tepat dan mutu yang konsisten.</p>
    <p>Terima kasih atas kepercayaan Anda.</p>
  </div>
  <div style="position:absolute; left:0; right:0; bottom:0; height:62mm; background:var(--y); clip-path:polygon(0 24%, 100% 0, 100% 100%, 0 100%); padding:14mm 18mm 20mm; display:flex; align-items:center; gap:8mm">
    <div style="font-family:'BC'; font-weight:800; font-size:64pt; line-height:.6; color:var(--c)">“</div>
    <div style="font-family:'BC'; font-weight:800; font-size:22pt; line-height:1.12; text-transform:uppercase; color:var(--c)">Daging sapi berkualitas adalah kunci terciptanya hidangan terbaik.</div>
  </div>
`, "", "dk"));

// ---------- 3 — Sejarah: jalur perjalanan ----------
const tl = [
  ["2014", "CV Wijaya Meat", "Awal perjalanan sebagai penyedia daging sapi berkualitas.", 1],
  ["2020", "Resmi menjadi PT", "Akta Pendirian No. 16 (18 April 2020) dan NIB terbit.", 1],
  ["2021", "NKV Gudang Tingkat I", `Cold storage memperoleh NKV ${co.nkv_gudang}.`, 0],
  ["2023", "NKV RPH Tingkat I", `RPHR Jonggol memperoleh NKV ${co.nkv_rph}.`, 0],
  ["2024", "Penguatan manajemen", "Komisaris baru bergabung; Tanda Daftar Gudang terbit.", 0],
  ["2025", "Surveilans NKV", "Gudang dan RPH mempertahankan predikat Tingkat I.", 0],
  ["2026", "Sertifikat Halal RPH", `Halal RPH ${co.halal_rph}.`, 1]
];
const LY = [20, 72, 124, 176];
const stopsPos = [[38, 0], [118, 0], [136, 1], [56, 1], [38, 2], [118, 2], [136, 3]];
pages.push(page("Sejarah Singkat", `
  <div class="kick">Sejak 2014</div>
  <h1>Perjalanan <em>kami</em></h1><div class="bar" style="margin-bottom:2mm"></div>
  <div class="road">
    <svg viewBox="0 0 174 205" preserveAspectRatio="none">
      <path d="M 4 ${LY[0]} H 160 A 26 26 0 0 1 160 ${LY[1]} H 14 A 26 26 0 0 0 14 ${LY[2]} H 160 A 26 26 0 0 1 160 ${LY[3]} H 44" fill="none" stroke="#2a2a2a" stroke-width="7" stroke-linecap="round"/>
      <path d="M 4 ${LY[0]} H 160 A 26 26 0 0 1 160 ${LY[1]} H 14 A 26 26 0 0 0 14 ${LY[2]} H 160 A 26 26 0 0 1 160 ${LY[3]} H 44" fill="none" stroke="#f7b500" stroke-width=".7" stroke-dasharray="3 2.4"/>
      <polygon points="44,${LY[3] - 6} 32,${LY[3]} 44,${LY[3] + 6}" fill="#f7b500"/>
    </svg>
    ${tl.map(([y, t, d, hi], i) => { const [x, l] = stopsPos[i]; return `<div class="stop ${hi ? "hi" : ""}" style="left:${x}mm; top:${LY[l] - 14.4}mm"><div class="badge hex">${y}</div><b>${t}</b><span>${d}</span></div>`; }).join("")}
    <div style="position:absolute; left:2mm; top:${LY[3] - 5}mm; font-family:'BC'; font-weight:800; font-size:15pt; text-transform:uppercase; color:#b88800; line-height:1">Terus<br>melaju</div>
  </div>
`, "gray"));

// ---------- 4 — Proses: papan alur berliku ----------
const CW = 38, CH = 41, CX = 45.33, RY = 51.66;
const pos = steps.map((s, i) => { const r = Math.floor(i / 4), k = i % 4, c = r % 2 ? 3 - k : k; return { x: c * CX, y: r * RY }; });
const ctr = pos.map(p => [p.x + CW / 2, p.y + CH / 2]);
const arrows = ctr.slice(1).map((b, i) => { const a = ctr[i]; const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2; const ang = Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI;
  return `<polygon points="-2.4,-2.6 2.6,0 -2.4,2.6" fill="#f7b500" transform="translate(${mx} ${my}) rotate(${ang})"/>`; }).join("");
pages.push(page("Proses Produksi", `
  <div class="kick">16 tahap</div>
  <h1 style="font-size:34pt">Dari kandang hingga <em>meja Anda</em></h1><div class="bar" style="margin:3mm 0 3mm"></div>
  <div class="legend"><span><i style="background:var(--y)"></i>Penerimaan</span><span><i style="background:#3b3b3b; outline:.3mm solid #777"></i>Penyembelihan</span><span><i style="background:#fff"></i>Pasca-potong</span></div>
  <div class="board">
    <svg viewBox="0 0 174 196" preserveAspectRatio="none"><polyline points="${ctr.map(p => p.join(",")).join(" ")}" fill="none" stroke="#f7b500" stroke-width=".9"/>${arrows}</svg>
    ${steps.map(([ph, t, d], i) => `<div class="st p${ph}" style="left:${pos[i].x}mm; top:${pos[i].y}mm"><div class="hn hex">${String(i + 1).padStart(2, "0")}</div><b>${t}</b><span>${d}</span></div>`).join("")}
  </div>
`, "dark"));

// ---------- 5 — Produk: banner + peta potongan + maskot ----------
const REG = {
  chuck: "215,30 300,40 304,110 300,185 150,190 130,158 175,120 205,70",
  rib: "300,40 355,42 375,110 385,185 300,185 304,110",
  shortloin: "355,42 430,42 450,110 455,185 385,185 375,110",
  sirloin: "430,42 510,40 540,100 550,185 455,185 450,110",
  round: "510,40 600,45 640,80 645,190 640,280 600,300 560,225 550,185 540,100",
  brisket: "150,190 215,190 225,240 230,270 200,262 165,230",
  foreshank: "215,190 300,185 285,240 270,268 230,270 225,240",
  shortplate: "300,185 460,185 455,230 420,270 300,270 285,240",
  flank: "460,185 550,185 545,225 520,228 455,232"
};
const cutmap = (parts) => `<div class="cutmap"><img src="${A("img/cow-diagram.jpg")}" style="width:100%; display:block; border-radius:2mm">
  <svg viewBox="0 0 716 515" style="position:absolute; inset:0; width:100%; height:100%">${parts.map(k => `<polygon points="${REG[k]}" fill="rgba(247,181,0,.62)" stroke="#f7b500" stroke-width="3"/>`).join("")}</svg>
  <div class="lbl">◆ Asal potongan</div></div>`;
const g = products[0];
pages.push(page(`Katalog Produk · 1/${products.length}`, `
  <div class="pban" style="background-image:url('${A("img/ribeye-pair.jpg")}')">
    <div class="in"><div class="kick" style="color:var(--y)">${g.kategori}</div><h1>${g.judul}</h1><div class="bar" style="margin:3mm 0 0"></div><p>${g.intro}</p></div>
    ${cutmap(g.bagian)}
  </div>
  <div style="position:absolute; left:18mm; right:18mm; top:98mm">
    <div class="pg3">
      ${g.items.map((pp, i) => { const f = `products/${slug(pp.nama)}.jpg`; return `<div class="pc">
        ${has(f) ? `<div class="im" style="background-image:url('${A(f)}')"><div class="n">${i + 1}</div></div>` : `<div class="im none"><div class="n">${i + 1}</div>FOTO MENYUSUL</div>`}
        <div class="bd"><h3>${pp.nama}</h3><div class="id">${pp.id || "&nbsp;"}</div><div class="u"><small>Cocok untuk</small>${pp.cocok}</div></div></div>`; }).join("")}
    </div>
    <div class="tip" style="justify-content:flex-end; margin-top:2mm; margin-right:-4mm">
      <div class="bub" style="max-width:96mm">Butuh potongan atau ukuran khusus? Kami melayani <i>product by request</i> sesuai kebutuhan Anda.</div>
      <img src="${A("logo/mascot.png")}" style="height:36mm">
    </div>
  </div>
`, "gray ban"));

// ---------- 6 — Kontak + maskot ----------
const qr = async (u) => (await QRCode.toString(u, { type: "svg", margin: 0, color: { dark: "#2a2a2a", light: "#ffffff" } })).replace(/<\?xml[^>]*>/, "");
const qrCatalog = await qr("https://bit.ly/swmcatalogue");
const qrCompro = await qr("https://bit.ly/swmcompro");
pages.push(page("Kontak", `
  <div class="kick">Hubungi kami</div>
  <h1 style="font-size:46pt">Mari bekerja <em>sama</em></h1><div class="bar"></div>
  <div style="margin-top:1mm">
    ${[["phone", "Call center", co.telepon], ["mail", "Email", co.email], ["globe", "Website", co.website], ["pin", "Kantor", co.alamat_kantor], ["pin", "RPH & produksi", co.alamat_rph]].map(([i, l, v]) => `<div class="cr"><span class="cir">${ic(i, "width:5.5mm; height:5.5mm")}</span><span class="l">${l}</span><b>${v}</b></div>`).join("")}
  </div>
  <div style="position:absolute; left:18mm; bottom:26mm; display:flex; gap:7mm">
    <div style="text-align:center"><div class="qr">${qrCatalog}</div><div style="font-family:'BC'; font-weight:800; font-size:13pt; text-transform:uppercase; margin-top:2mm">Katalog lengkap</div></div>
    <div style="text-align:center"><div class="qr">${qrCompro}</div><div style="font-family:'BC'; font-weight:800; font-size:13pt; text-transform:uppercase; margin-top:2mm">Company profile</div></div>
  </div>
  <div class="hex" style="position:absolute; right:-14mm; bottom:-12mm; width:104mm; height:120mm; background:var(--y)"></div>
  <img src="${A("logo/mascot.png")}" style="position:absolute; right:10mm; bottom:14mm; height:96mm">
  <div class="tip" style="position:absolute; right:68mm; bottom:104mm"><div class="bub" style="max-width:52mm">Siap melayani kebutuhan daging sapi Anda!</div></div>
`, "dark"));

export default pages;

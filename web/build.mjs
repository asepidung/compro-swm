// node web/build.mjs  ->  web/dist/ (situs statis, tanpa dependensi)
// Isi diambil dari data/*.json dan assets/ yang sama dengan compro.
import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync, rmSync } from "node:fs";

const root = new URL("../", import.meta.url).pathname;
const out = `${root}web/dist/`;
const read = (p) => JSON.parse(readFileSync(`${root}data/${p}.json`, "utf8"));
const co = read("company"), products = read("products"), clients = read("clients");
const lab = read("lab"), steps = read("process"), awards = read("awards");

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const has = (p) => existsSync(`${root}assets/${p}`);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const WA = "62" + co.telepon.replace(/\D/g, "").replace(/^62/, "").replace(/^0/, "");
const wa = (text) => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
const maps = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

const nav = [
  ["produk.html", "Produk"], ["tentang.html", "Tentang"], ["fasilitas.html", "Fasilitas"],
  ["mutu.html", "Mutu & Halal"], ["klien.html", "Klien"], ["kontak.html", "Kontak"]
];

// Staging: Cloudflare (Workers Builds: WORKERS_CI_BRANCH, Pages: CF_PAGES_BRANCH) mengisi nama cabang; selain cabang produksi, mesin pencari diminta tidak mengindeks.
const prodBranch = process.env.PRODUCTION_BRANCH || "main";
const ciBranch = process.env.WORKERS_CI_BRANCH || process.env.CF_PAGES_BRANCH;
const staging = !!ciBranch && ciBranch !== prodBranch;

const layout = ({ file, title, desc, body, hero = "" }) => `<!doctype html>
<html lang="id"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)} | ${co.nama}</title>
${staging ? '<meta name="robots" content="noindex,nofollow">\n' : ""}<meta name="description" content="${esc(desc)}">
<meta property="og:title" content="${esc(title)} | ${co.nama}"><meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="assets/img/cattle-fence.jpg"><meta name="theme-color" content="#2a2a2a">
<link rel="icon" href="assets/logo/mascot.png">
<link rel="stylesheet" href="style.css"></head>
<body>
<header class="hd"><div class="wrap hd-in">
  <a class="brand" href="index.html"><img src="assets/logo/wijaya-yellow.png" alt="${co.merek}"></a>
  <input type="checkbox" id="mn" class="mn-t" aria-label="Menu"><label for="mn" class="mn-b"><i></i></label>
  <nav>${nav.map(([h, t]) => `<a href="${h}"${h === file ? ' class="on"' : ""}>${t}</a>`).join("")}
    <a class="btn sm" href="${wa("Halo Wijaya Meat, saya ingin bertanya.")}" data-wa>WhatsApp</a></nav>
</div></header>
${hero}
<main>${body}</main>
<footer class="ft"><div class="wrap ft-in">
  <div><img src="assets/logo/wijaya-yellow.png" alt="${co.merek}" class="ft-logo"><p>${co.nama}<br><i>“${co.tagline}”</i></p>
    <div class="badges"><img src="assets/logo/halal.png" alt="Halal"><img src="assets/logo/nkv-rph.png" alt="NKV RPH"><img src="assets/logo/nkv-gudang.png" alt="NKV Gudang"></div></div>
  <div><h4>Halaman</h4>${nav.map(([h, t]) => `<a href="${h}">${t}</a>`).join("")}</div>
  <div><h4>Kontak</h4><a href="tel:+${WA}">${co.telepon}</a><a href="mailto:${co.email}">${co.email}</a>
    <a href="${maps(co.alamat_kantor)}" target="_blank" rel="noopener">${co.alamat_kantor.split(",").slice(0, 3).join(",")}</a></div>
</div><div class="wrap cp">© 2026 ${co.nama}. Hak cipta dilindungi.</div></footer>
<a class="wa-fab" href="${wa("Halo Wijaya Meat, saya ingin bertanya.")}" data-wa aria-label="Chat WhatsApp">
  <svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 00-7.7 13.6L3 21l4.5-1.2A9 9 0 1012 3z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8.7 8.3c.2 3 2.8 5.7 6 6.3l1.2-1.4-2-1-.9.7a4 4 0 01-1.9-1.9l.7-.9-1-2z" fill="currentColor"/></svg></a>
<script src="site.js"></script>
</body></html>`;

const pageHero = (kick, h, sub, img) => `<section class="ph"><div class="wrap ph-in"><div>
  <div class="kick">${kick}</div><h1>${h}</h1>${sub ? `<p>${sub}</p>` : ""}</div>
  <div class="ph-img" style="background-image:url('assets/img/${img}')"></div></div></section>`;
const sec = (inner, cls = "") => `<section class="sec ${cls}"><div class="wrap">${inner}</div></section>`;
const head = (kick, h, sub = "") => `<div class="sh"><div class="kick">${kick}</div><h2>${h}</h2>${sub ? `<p class="lead">${sub}</p>` : ""}</div>`;
const pages = [];
const add = (p) => pages.push(p);

// ── Data turunan ──────────────────────────────────────────
const cats = [...new Set(products.map((g) => g.kategori))];
const allItems = products.flatMap((g) => g.items.map((i) => ({ ...i, kategori: g.kategori })));
const productCard = (p) => { const f = `products/${slug(p.nama)}.jpg`;
  return `<article class="pc" data-cat="${esc(p.kategori)}" data-q="${esc((p.nama + " " + p.id + " " + p.cocok).toLowerCase())}">
  ${has(f) ? `<div class="im" style="background-image:url('assets/${f}')" role="img" aria-label="${esc(p.nama)}"></div>` : `<div class="im none">Foto menyusul</div>`}
  <div class="bd"><span class="chip">${esc(p.kategori)}</span><h3>${esc(p.nama)}</h3>${p.id ? `<div class="idn">${esc(p.id)}</div>` : ""}
  <p><b>Cocok untuk:</b> ${esc(p.cocok)}</p>
  <a class="btn out sm" data-wa href="${wa(`Halo Wijaya Meat, saya ingin tanya harga dan ketersediaan ${p.nama}.`)}">Tanya harga via WA</a></div></article>`; };

// ── Beranda ───────────────────────────────────────────────
add({ file: "index.html", title: "Pemasok Daging Sapi Halal & Bersertifikat NKV", desc: `${co.nama}: pemasok daging sapi segar dan beku dari RPH Jonggol, bersertifikat halal dan NKV Tingkat I. Melayani modern market, horeka, distributor, retail, dan industri.`,
  hero: `<section class="hero"><div class="wrap">
    <div class="hero-in"><div>
      <div class="kick">Pemasok daging sapi untuk bisnis</div>
      <h1>Daging sapi halal dari RPH sendiri, <em>konsisten</em> untuk bisnis Anda.</h1>
      <p class="lead">Tersedia ${allItems.length}+ potongan segar dan beku untuk modern market, distributor, hotel, restoran, dan industri. Kirim kebutuhan Anda, tim kami menyiapkan penawaran.</p>
      <div class="cta"><a class="btn" data-wa href="${wa("Halo Wijaya Meat, saya ingin minta penawaran daging sapi.")}">Minta penawaran</a><a class="btn ghost" data-wa href="${wa("Halo Wijaya Meat, saya ingin chat.")}">Chat WhatsApp</a></div>
    </div><div class="hero-img"><div class="pic" style="background-image:url('assets/img/ribeye-pair.jpg')" role="img" aria-label="Ribeye pilihan"></div>
      <div class="tag"><img src="assets/logo/halal.png" alt="Halal"><div>Halal &amp; NKV Tingkat I<small>RPH dan cold storage</small></div></div></div></div>
    <div class="facts"><div><b>2014</b><span>Berdiri sebagai CV Wijaya Meat</span></div>
      <div><b>${co.cold_storage.kapasitas}</b><span>Kapasitas cold storage</span></div>
      <div><b>NKV I</b><span>RPH dan gudang, predikat Baik Sekali</span></div>
      <div><b>Jonggol</b><span>Kabupaten Bogor, Jawa Barat</span></div></div>
  </div></section>`,
  body: sec(head("Kenapa Wijaya Meat", "Satu rantai, dari RPH sampai pengiriman") + `<div class="g4">
      ${[["RPH sendiri", `Pemotongan di RPHR Jonggol dengan juru sembelih halal, stunner, dan Animal Welfare Officer bersertifikat.`],
         ["Rantai dingin terjaga", `Chill ${co.cold_storage.suhu_chill}, frozen ${co.cold_storage.suhu_frozen}. Suhu dicatat 3 kali sehari.`],
         ["Diuji berkala", "Daging dan jeroan diuji 3 bulan sekali di laboratorium terakreditasi KAN."],
         ["Katalog lengkap", `${allItems.length}+ potongan: prime cuts, special cuts, secondary cuts, bone-in dan giling.`]]
        .map(([t, d], i) => `<div class="card"><div class="ic">${i + 1}</div><h3>${t}</h3><p>${d}</p></div>`).join("")}</div>`, "gray") +
  sec(head("Produk unggulan", "Potongan pilihan") + `<div class="pgrid">${allItems.filter((p) => has(`products/${slug(p.nama)}.jpg`)).slice(0, 6).map(productCard).join("")}</div>
    <p class="center"><a class="btn" href="produk.html">Lihat semua produk</a></p>`) +
  `<section class="band" style="background-image:linear-gradient(rgba(20,20,20,.78),rgba(20,20,20,.78)),url('assets/img/meat-closeup.jpg')"><div class="wrap center">
    <h2>“${co.tagline}”</h2><p>Ceritakan kebutuhan Anda, tim kami menyiapkan penawaran.</p>
    <a class="btn" data-wa href="${wa("Halo Wijaya Meat, saya ingin berdiskusi soal kebutuhan daging sapi.")}">Hubungi kami di WhatsApp</a></div></section>` });

// ── Tentang ───────────────────────────────────────────────
const tl = [
  ["2014", "CV Wijaya Meat", "Awal perjalanan sebagai penyedia daging sapi berkualitas."],
  ["2020", "Resmi menjadi PT", "Akta Pendirian 18 April 2020, pengesahan Kemenkumham, dan NIB terbit."],
  ["2021", "NKV Gudang Tingkat I", "Cold storage memperoleh Nomor Kontrol Veteriner."],
  ["2023", "NKV RPH Tingkat I", "RPHR Jonggol memperoleh Nomor Kontrol Veteriner."],
  ["2024", "Penguatan manajemen", "Rafi Bagus Purnomo bergabung sebagai Komisaris; Tanda Daftar Gudang terbit."],
  ["2025", "Surveilans NKV", "Gudang dan RPH mempertahankan predikat Tingkat I (Baik Sekali)."],
  ["2026", "Sertifikat Halal RPH", "Sertifikat halal RPH terbit dan NKV Gudang diperbarui."]
];
const misi = [
  "Menyediakan daging sapi segar berkualitas tinggi dan sehat untuk memenuhi kebutuhan pelanggan.",
  "Memberikan layanan yang cepat, handal, dan profesional kepada pelanggan.",
  "Menjalin kemitraan dengan peternak dan produsen untuk memastikan pasokan yang stabil dan berkualitas.",
  "Memastikan keamanan dan kualitas daging melalui kontrol mutu dan keamanan pangan yang ketat.",
  "Membangun tim yang solid, profesional, dan berdedikasi tinggi dalam melayani pelanggan.",
  "Mengembangkan teknologi dan inovasi dalam manajemen distribusi untuk efisiensi dan produktivitas."
];
add({ file: "tentang.html", title: "Tentang Kami", desc: `Sejarah, visi misi, dan tim ahli ${co.nama}. Berdiri 2014 sebagai CV Wijaya Meat, resmi PT sejak 2020.`,
  hero: pageHero("Tentang kami", "Dari CV kecil menjadi pemasok terpercaya", `Sejak 2014 kami melayani kebutuhan daging sapi. Sejak 2020 resmi sebagai ${co.nama}.`, "owner-farm.jpg"),
  body: sec(`<div class="two"><div class="photo" style="background-image:url('assets/img/owner-farm.jpg')" role="img" aria-label="${co.owner}"></div>
      <div>${head("Sambutan", "Selamat datang di Wijaya Meat")}
      <p>Selamat datang di <b>${co.nama}</b>, tempat di mana komitmen kami untuk memenuhi kebutuhan Anda menjadi prioritas utama.</p>
      <p>Kami bangga dipercaya memasok daging sapi berkualitas untuk jaringan ritel modern, hotel, restoran, dan mitra industri. Slogan kami, <i>“${co.tagline}”</i>, adalah tekad untuk selalu hadir dengan solusi yang tepat dan mutu yang konsisten.</p>
      <p class="sign"><b>${co.owner}</b><br><span>Pemilik &amp; Direktur Utama</span></p></div></div>`) +
  sec(head("Sejarah", "Perjalanan kami") + `<ol class="tl">${tl.map(([y, t, d]) => `<li><span class="yr">${y}</span><div><b>${t}</b><p>${d}</p></div></li>`).join("")}</ol>`, "gray") +
  sec(head("Arah kami", "Visi &amp; misi") + `<div class="vision"><b>VISI</b><p>Menjadi perusahaan distribusi daging sapi terbaik dan terpercaya di Indonesia yang memberikan kepuasan kepada pelanggan dengan kualitas daging terbaik serta harga yang terjangkau.</p></div>
    <h3 class="mt">Misi</h3><ol class="misi">${misi.map((m) => `<li>${m}</li>`).join("")}</ol>`) +
  sec(head("Organisasi", "Pengurus dan tim ahli") + `<div class="org"><div class="card"><small>Komisaris</small><b>${co.komisaris}</b></div><div class="card y"><small>Direktur</small><b>${co.direktur}</b></div></div>
    <p class="center muted">${co.karyawan} karyawan di divisi Produksi, Warehouse, Quality Control, Marketing, Operasional, dan Finance.</p>
    <h3 class="mt">Tenaga bersertifikat</h3><div class="team">${co.tim.map((t) => { const f = `team/${slug(t.nama)}.jpg`;
      return `<div class="card tm">${has(f) ? `<div class="av" style="background-image:url('assets/${f}')"></div>` : `<div class="av">${t.nama.split(" ").map((w) => w[0]).slice(0, 2).join("")}</div>`}<b>${t.nama}</b><span class="chip">${t.jabatan}</span></div>`; }).join("")}</div>`, "gray") });

// ── Fasilitas & Proses ────────────────────────────────────
const phase = { 1: "Penerimaan", 2: "Penyembelihan", 3: "Pasca-potong" };
add({ file: "fasilitas.html", title: "Fasilitas & Proses Produksi", desc: "RPH dan cold storage bersertifikat NKV Tingkat I, 16 tahap proses produksi dari penerimaan sapi sampai pengiriman berpendingin.",
  hero: pageHero("Fasilitas &amp; proses", "Dari kandang hingga meja Anda", "RPH dan cold storage bersertifikat NKV Tingkat I.", "rph-gate.jpg"),
  body: sec(head("Fasilitas", "RPH dan cold storage") + `<div class="g2">
      <div class="card fac"><div class="photo s" style="background-image:url('assets/img/rph-gate.jpg');background-position:50% 100%" role="img" aria-label="RPHR Jonggol"></div><div class="pad"><span class="chip">NKV Tingkat I</span><h3>RPH Jonggol</h3><small>${co.nkv_rph}</small>
        <p>Rumah potong hewan ruminansia di Jonggol, Kabupaten Bogor, tempat pemotongan, pelayuan, dan boning.</p></div></div>
      <div class="card fac"><div class="temp"><div><small>CHILL</small><b>${co.cold_storage.suhu_chill}</b></div><div><small>FROZEN</small><b>${co.cold_storage.suhu_frozen}</b></div></div>
        <div class="pad"><span class="chip">NKV Tingkat I</span><h3>Cold storage</h3><small>${co.nkv_gudang}</small>
        <p>Kapasitas ${co.cold_storage.kapasitas}, luas ${co.cold_storage.luas}, perputaran ${co.cold_storage.perputaran} per hari dengan rotasi FIFO.</p></div></div></div>
    <ul class="ticks">${["Palet plastik food grade, minimal 15 cm dari lantai", "Jarak tumpukan 10–15 cm dari dinding dan 50 cm dari evaporator", "Anteroom tertutup untuk bongkar muat", "Pencatatan suhu 3 kali sehari dan pengendalian hama berkala"].map((t) => `<li>${t}</li>`).join("")}</ul>`) +
  sec(head("Proses produksi", `${steps.length} tahap terkontrol`) + [1, 2, 3].map((ph) => `<h3 class="mt">${phase[ph]}</h3><ol class="steps" style="counter-reset:s ${steps.findIndex((s) => s[0] === ph)}">${steps.filter((s) => s[0] === ph).map(([, t, d]) => `<li><b>${t}</b><span>${d}</span></li>`).join("")}</ol>`).join(""), "gray") +
  sec(head("Distribusi", "Pengiriman berpendingin", "Pengiriman dengan armada berpendingin ke Jabodetabek, Jawa Barat, dan sebagian besar Indonesia.") + `<ul class="ticks">${["Pra-pendinginan boks sesuai produk sebelum muat", "Pemuatan cepat ke mobil box berpendingin", "Surat jalan dan log pengeluaran tercatat", "Rantai dingin terjaga hingga tujuan"].map((t) => `<li>${t}</li>`).join("")}</ul>`) });

// ── Mutu & Halal ──────────────────────────────────────────
const halal = ["Menyediakan SDM serta sarana dan prasarana yang mendukung Proses Produk Halal (PPH).", "Mematuhi peraturan perundang-undangan tentang Jaminan Produk Halal (JPH).", "Menggunakan bahan halal dan melaksanakan PPH sesuai ketentuan.", "Memastikan kebijakan halal dipahami dan diterapkan seluruh personel RPH.", "Mengomunikasikan kebijakan halal kepada seluruh pihak terkait.", "Melaksanakan kebijakan halal secara konsisten."];
const certs = [["logo/halal.png", "Sertifikat Halal PT", co.halal_pt, "https://cekbpjph.halal.go.id/"], ["logo/halal.png", "Sertifikat Halal RPH", co.halal_rph, "https://cekbpjph.halal.go.id/"],
  ["logo/nkv-rph.png", "NKV RPH · Tingkat I", co.nkv_rph], ["logo/nkv-gudang.png", "NKV Gudang · Tingkat I", co.nkv_gudang]];
add({ file: "mutu.html", title: "Mutu, Halal & Legalitas", desc: "Sertifikat halal, NKV Tingkat I, program uji laboratorium terakreditasi KAN, dan kebijakan halal PT. Santi Wijaya Meat.",
  hero: pageHero("Mutu &amp; halal", "Aman, halal, dan terlacak", "Nomor sertifikat kami dapat dicek langsung di situs penerbit.", "beef-cut-board.jpg"),
  body: sec(head("Legalitas", "Sertifikat dan nomor izin") + `<div class="g2 certs">${certs.map(([lg, t, n, u]) => `<div class="card cert"><img src="assets/${lg}" alt=""><div><b>${t}</b><code>${n}</code>${u ? `<a href="${u}" target="_blank" rel="noopener">Cek di situs BPJPH ↗</a>` : ""}</div></div>`).join("")}</div>
    <p class="muted">Salinan dokumen legalitas lengkap dapat kami kirimkan atas permintaan calon mitra. <a data-wa href="${wa("Halo Wijaya Meat, saya ingin meminta salinan dokumen legalitas.")}">Minta via WhatsApp</a>.</p>`) +
  sec(head("Uji laboratorium", "Dipantau secara berkala") + `<div class="g2">
      <div class="stat big"><b>3 bulan sekali</b><span><b>Daging &amp; jeroan</b> diuji di ${lab.bpmsph.lab}, laboratorium terakreditasi KAN.</span></div>
      <div class="stat big"><b>Setahun sekali</b><span><b>Air, karyawan &amp; peralatan</b> diuji di SIG (PT Saraswanti Indo Genetech), laboratorium terakreditasi KAN.</span></div></div>
    <p class="muted">Parameter uji meliputi Salmonella, Staphylococcus aureus, E. coli, dan Angka Lempeng Total. Setiap produk masuk disertai Certificate of Analysis (CoA) dan sertifikat veteriner dari unit asal. Laporan hasil uji tersedia untuk mitra atas permintaan.</p>`, "gray") +
  sec(head("Kebijakan halal", "Komitmen halal kami") + `<ol class="misi">${halal.map((m) => `<li>${m}</li>`).join("")}</ol>`) +
  sec(head("Penghargaan", "Prestasi dan kompetensi") + `<div class="g3">${awards.map((a) => `<div class="card"><h3>${a.t}</h3><p>${a.d}</p></div>`).join("")}</div>`, "gray") });

// ── Produk ────────────────────────────────────────────────
add({ file: "produk.html", title: "Katalog Produk", desc: `Katalog ${allItems.length}+ potongan daging sapi: prime cuts, special cuts, secondary cuts, bone-in dan giling.`,
  hero: pageHero("Katalog", "Produk daging sapi", "Tanya harga dan ketersediaan langsung lewat WhatsApp.", "steak-board.jpg"),
  body: sec(`<div class="filter"><input id="q" type="search" placeholder="Cari potongan, mis. tenderloin, iga, giling" aria-label="Cari produk">
      <div class="chips"><button class="on" data-cat="">Semua</button>${cats.map((c) => `<button data-cat="${esc(c)}">${c}</button>`).join("")}</div></div>
    <div class="pgrid" id="grid">${allItems.map(productCard).join("")}</div>
    <p id="none" class="center muted" hidden>Tidak ada produk yang cocok. Tanyakan langsung, mungkin kami punya.</p>
    <p class="center muted">Katalog lengkap termasuk Konro, Neckbone, Backbone, Shank, Intercostal, dan lainnya akan ditambahkan. <a data-wa href="${wa("Halo Wijaya Meat, mohon kirim daftar produk lengkap.")}">Minta daftar lengkap</a>.</p>`) });

// ── Klien ─────────────────────────────────────────────────
const segInfo = { "Modern market": "Jaringan supermarket dan ritel modern.", Distributor: "Penyalur ke pasar dan toko di berbagai daerah.", Horeka: "Hotel, restoran, dan katering.", Retail: "Toko daging dan butcher.", Industri: "Pengolahan makanan dan bahan baku." };
add({ file: "klien.html", title: "Klien & Mitra", desc: "Segmen pelanggan PT. Santi Wijaya Meat: modern market, distributor, horeka, retail, dan industri.",
  hero: pageHero("Klien &amp; mitra", "Dipercaya berbagai segmen", `Melayani pelanggan di ${clients.provinsi}+ provinsi.`, "cattle-yard.jpg"),
  body: sec(head("Segmen", "Siapa yang kami layani") + `<div class="g3">${clients.segmen.map((s) => `<div class="card"><h3>${s}</h3><p>${segInfo[s] || ""}</p></div>`).join("")}</div>
    <p class="center muted">Daftar nama mitra ditampilkan setelah mendapat persetujuan masing-masing mitra. Referensi pelanggan tersedia atas permintaan.</p>`) +
  `<section class="band" style="background-image:linear-gradient(rgba(20,20,20,.78),rgba(20,20,20,.78)),url('assets/img/meat-pile.jpg')"><div class="wrap center"><h2>Jadi mitra berikutnya</h2>
    <a class="btn" data-wa href="${wa("Halo Wijaya Meat, saya tertarik menjadi mitra.")}">Hubungi kami di WhatsApp</a></div></section>` });

// ── Kontak ────────────────────────────────────────────────
add({ file: "kontak.html", title: "Kontak", desc: `Hubungi ${co.nama} lewat WhatsApp, telepon, atau email. Kantor dan cold storage di Sukasirna, RPH di Sukamaju, Jonggol, Kabupaten Bogor.`,
  hero: pageHero("Hubungi kami", "Mari bekerja sama", "Tim kami siap membantu kebutuhan daging sapi Anda.", "meat-closeup.jpg"),
  body: sec(`<div class="g2"><div>${head("Kontak", "Langsung terhubung")}
      <p><a class="btn" data-wa href="${wa("Halo Wijaya Meat, saya ingin bertanya.")}">Chat WhatsApp</a></p>
      <dl class="kv"><dt>Telepon / WA</dt><dd><a href="tel:+${WA}">${co.telepon}</a></dd><dt>Email</dt><dd><a href="mailto:${co.email}">${co.email}</a></dd></dl></div>
      <div>${head("Alamat", "Dua lokasi")}
      <div class="card addr"><b>Kantor &amp; cold storage</b><p>${co.alamat_kantor}</p><a href="${maps(co.alamat_kantor)}" target="_blank" rel="noopener">Buka di Google Maps ↗</a></div>
      <div class="card addr"><b>RPH &amp; produksi</b><p>${co.alamat_rph}</p><a href="${maps(co.alamat_rph)}" target="_blank" rel="noopener">Buka di Google Maps ↗</a></div></div></div>`) });

// ── Tulis ─────────────────────────────────────────────────
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
for (const p of pages) writeFileSync(out + p.file, layout(p));
for (const d of ["fonts", "logo", "img", "products", "team"]) if (existsSync(`${root}assets/${d}`)) cpSync(`${root}assets/${d}`, `${out}assets/${d}`, { recursive: true });
cpSync(`${root}web/src/style.css`, `${out}style.css`);
cpSync(`${root}web/src/site.js`, `${out}site.js`);
console.log(`OK: ${pages.length} halaman -> web/dist/`);

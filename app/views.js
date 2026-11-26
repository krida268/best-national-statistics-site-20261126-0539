// views.js — router hash + perender halaman DataNusa.
import { META, SOURCES, KPIS, SERIES, SECTORS, AGE_GROUPS, PROVINCES, TPT_EXTREMES, IPM_PARTS, RELEASES, FACTS, sourceLabel } from "./data.js";
import { lineChart, barChart, groupedBarChart, hbarChart } from "./charts.js";

const app = document.getElementById("app");

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function fmtDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

function srcTag(id) {
  return `<span class="src">Sumber: ${esc(sourceLabel(id))}</span>`;
}

function kpiCard(k) {
  return `<article class="kpi"><div class="kpi-label">${esc(k.label)}</div>` +
    `<div class="kpi-value">${esc(k.value)}</div>` +
    `<div class="kpi-sub">${esc(k.sub)}</div>` +
    `<div class="kpi-delta">${esc(k.delta)}</div></article>`;
}

function sectionHead(title, sub, srcId) {
  return `<div class="sec-head"><h2>${esc(title)}</h2><p>${esc(sub)}</p>${srcId ? srcTag(srcId) : ""}</div>`;
}

function topProvinces(n) {
  return PROVINCES.slice().sort((a, b) => b.pop - a.pop).slice(0, n);
}

// ---------- BERANDA ----------
function viewHome() {
  const top5 = topProvinces(5);
  return `
  <section class="hero">
    <div class="hero-text">
      <p class="eyebrow">Portal Statistik Indonesia &middot; Data 2024</p>
      <h1>Indonesia dalam angka, jelas dan bisa diperiksa.</h1>
      <p class="lede">DataNusa merangkum angka-angka resmi Indonesia — penduduk, ekonomi, pekerjaan, pendidikan, dan kesehatan — lengkap dengan sumbernya, supaya siapa pun bisa membaca, membandingkan, dan mengutipnya.</p>
      <div class="hero-actions">
        <a class="btn primary" href="#/penduduk">Jelajahi penduduk</a>
        <a class="btn" href="#/ekonomi">Lihat ekonomi</a>
        <a class="btn" href="#/publikasi">Rilis terbaru</a>
      </div>
    </div>
    <div class="hero-facts">
      ${FACTS.slice(0, 4).map((f) => `<div class="fact"><strong>${esc(f.value)}</strong><span>${esc(f.label)}</span><small>${esc(f.note)}</small></div>`).join("")}
    </div>
  </section>

  <section class="kpi-grid" aria-label="Indikator utama">
    ${KPIS.map(kpiCard).join("")}
  </section>

  <div class="grid-2">
    <section class="card">
      ${sectionHead("Penduduk terus bertambah", "Jumlah penduduk Indonesia, pertengahan tahun (juta jiwa).", "bps-stat2025")}
      ${lineChart(SERIES.penduduk, { color: "#b3261e", decimals: 1 })}
      <p class="note">Dari 270,2 juta jiwa pada Sensus 2020 menjadi 281,6 juta pada 2024 — naik sekitar 1,01% per tahun. PBB (World Population Prospects 2024) memperkirakan 283,5 juta jiwa untuk tahun yang sama.</p>
    </section>
    <section class="card">
      ${sectionHead("Ekonomi tumbuh di atas 5%", "Pertumbuhan PDB riil tahunan (%).", "bps-pdb")}
      ${barChart(SERIES.pdbTumbuh, { color: "#0f766e", unit: "%", decimals: 2 })}
      <p class="note">Setelah kontraksi −2,07% pada 2020, ekonomi tumbuh 3,70% (2021), 5,31% (2022), 5,05% (2023), dan 5,03% (2024). PDB nominal 2024 mencapai Rp22.139 triliun.</p>
    </section>
  </div>

  <section class="card">
    ${sectionHead("Provinsi terpadat", "Lima provinsi dengan penduduk terbanyak, 2024.", "bps-provinsi")}
    <table class="tbl">
      <thead><tr><th>#</th><th>Provinsi</th><th>Pulau</th><th class="num">Penduduk (juta)</th><th class="num">Pangsa nasional</th></tr></thead>
      <tbody>${top5.map((p, i) => `<tr><td>${i + 1}</td><td><a href="#/daerah">${esc(p.name)}</a></td><td>${esc(p.island)}</td><td class="num">${p.pop.toLocaleString("id-ID", { minimumFractionDigits: 2 })}</td><td class="num">${(p.pop / 281.6 * 100).toLocaleString("id-ID", { maximumFractionDigits: 1 })}%</td></tr>`).join("")}</tbody>
    </table>
    <p class="note">Tiga provinsi di Pulau Jawa — Jawa Barat, Jawa Timur, dan Jawa Tengah — menampung 46,2% penduduk Indonesia. <a href="#/daerah">Lihat semua 38 provinsi &rarr;</a></p>
  </section>

  <section class="card">
    ${sectionHead("Rilis terbaru", "Berita resmi statistik yang baru diterbitkan.", null)}
    <ul class="release-list">
      ${RELEASES.slice(0, 4).map((r) => `<li><span class="cat">${esc(r.cat)}</span><a href="#/publikasi"><strong>${esc(r.title)}</strong></a><span class="date">${fmtDate(r.date)}</span><p>${esc(r.note)}</p></li>`).join("")}
    </ul>
    <p class="note"><a href="#/publikasi">Semua rilis &rarr;</a></p>
  </section>`;
}

// ---------- PENDUDUK ----------
let popView = "chart"; // chart | table
let popSort = "pop";   // pop | name | share
let popQuery = "";
let popIsland = "Semua";

function provinceRows(list) {
  return list.map((p, i) => `<tr><td>${i + 1}</td><td>${esc(p.name)}</td><td>${esc(p.island)}</td><td class="num">${p.pop.toLocaleString("id-ID", { minimumFractionDigits: 2 })}</td><td class="num">${(p.pop / 281.6 * 100).toLocaleString("id-ID", { maximumFractionDigits: 1 })}%</td><td class="num">${p.density ? p.density.toLocaleString("id-ID") : "—"}</td></tr>`).join("");
}

function filteredProvinces() {
  let list = PROVINCES.slice();
  if (popIsland !== "Semua") list = list.filter((p) => p.island === popIsland);
  if (popQuery) list = list.filter((p) => p.name.toLowerCase().includes(popQuery.toLowerCase()));
  if (popSort === "pop") list.sort((a, b) => b.pop - a.pop);
  if (popSort === "name") list.sort((a, b) => a.name.localeCompare(b.name, "id"));
  if (popSort === "share") list.sort((a, b) => b.pop - a.pop);
  return list;
}

function viewPenduduk() {
  const islands = ["Semua"].concat(Array.from(new Set(PROVINCES.map((p) => p.island))));
  const list = filteredProvinces();
  const ageRows = AGE_GROUPS.map((g) => ({ label: g.group, value: g.pct, color: g.group.includes("produktif") ? "#0f766e" : "#b3261e" }));
  return `
  <header class="page-head"><p class="eyebrow">Kependudukan</p><h1>Penduduk Indonesia</h1>
  <p class="lede">281,6 juta jiwa pada pertengahan 2024 — negara berpenduduk terbesar keempat di dunia. Sebagian besar tinggal di Pulau Jawa, dan dua dari tiga penduduk berada pada usia produktif.</p></header>

  <section class="kpi-grid">
    ${kpiCard(KPIS[0])}
    ${kpiCard({ label: "Laju pertumbuhan", value: "1,01%", sub: "per tahun 2023–2024", delta: "melambat dari 1,2% (2010-an)" })}
    ${kpiCard({ label: "Penduduk usia produktif", value: "68,8%", sub: "15–64 tahun", delta: "bonus demografi" })}
    ${kpiCard({ label: "Kepadatan tertinggi", value: "16.165", sub: "jiwa/km² · DKI Jakarta", delta: "nasional: ±147 jiwa/km²" })}
  </section>

  <div class="tabs" role="tablist">
    <button class="tab ${popView === "chart" ? "active" : ""}" data-view="chart">Grafik tren</button>
    <button class="tab ${popView === "table" ? "active" : ""}" data-view="table">Tabel provinsi</button>
  </div>

  ${popView === "chart" ? `
  <div class="grid-2">
    <section class="card">
      ${sectionHead("Jumlah penduduk 2020–2024", "Pertengahan tahun, juta jiwa.", "bps-stat2025")}
      ${lineChart(SERIES.penduduk, { color: "#b3261e", decimals: 1 })}
      <p class="note">Sensus Penduduk 2020 mencatat 270,2 juta jiwa; proyeksi BPS pertengahan 2024 mencatat 281,6 juta jiwa.</p>
    </section>
    <section class="card">
      ${sectionHead("Struktur umur 2024", "Pangsa penduduk menurut kelompok umur.", "bps-stat2025")}
      ${hbarChart(ageRows, { color: "#0f766e", decimals: 1, max: 100 })}
      <p class="note">Rasio ketergantungan sekitar 45: setiap 100 penduduk usia produktif menanggung sekitar 45 penduduk usia non-produktif.</p>
    </section>
  </div>` : `
  <section class="card">
    ${sectionHead("Penduduk menurut provinsi, 2024", "Cari, saring menurut pulau, dan urutkan. Angka dibulatkan; total nasional 281,60 juta jiwa.", "bps-provinsi")}
    <div class="controls">
      <input id="pop-search" type="search" placeholder="Cari provinsi… (mis. Jawa)" value="${esc(popQuery)}" aria-label="Cari provinsi">
      <select id="pop-island" aria-label="Saring pulau">${islands.map((g) => `<option ${g === popIsland ? "selected" : ""}>${esc(g)}</option>`).join("")}</select>
      <select id="pop-sort" aria-label="Urutkan"><option value="pop" ${popSort === "pop" ? "selected" : ""}>Terpadat dulu</option><option value="name" ${popSort === "name" ? "selected" : ""}>Nama A–Z</option></select>
      <span class="count">${list.length} dari 38 provinsi</span>
    </div>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>#</th><th>Provinsi</th><th>Pulau</th><th class="num">Penduduk (juta)</th><th class="num">Pangsa</th><th class="num">Kepadatan (jiwa/km²)</th></tr></thead>
      <tbody>${list.length ? provinceRows(list) : `<tr><td colspan="6" class="empty">Tidak ada provinsi yang cocok dengan “${esc(popQuery)}”.</td></tr>`}</tbody>
    </table></div>
    <p class="note">Kepadatan hanya ditampilkan untuk enam provinsi terpadat di Jawa; kepadatan nasional ±147 jiwa/km².</p>
  </section>`}`;
}

// ---------- EKONOMI ----------
function viewEkonomi() {
  return `
  <header class="page-head"><p class="eyebrow">Ekonomi</p><h1>Ekonomi Indonesia</h1>
  <p class="lede">PDB Rp22.139 triliun pada 2024 dengan pertumbuhan 5,03%. Industri pengolahan menjadi lapangan usaha terbesar, diikuti perdagangan dan pertanian.</p></header>

  <section class="kpi-grid">
    ${kpiCard(KPIS[1])}
    ${kpiCard(KPIS[2])}
    ${kpiCard(KPIS[3])}
    ${kpiCard({ label: "Ekspor 2024", value: "US$264,70 M", sub: "impor US$233,66 M", delta: "surplus US$31,04 M", src: "bps-perdagangan" })}
  </section>

  <div class="grid-2">
    <section class="card">
      ${sectionHead("Pertumbuhan PDB 2020–2024", "Pertumbuhan riil tahunan (%).", "bps-pdb")}
      ${barChart(SERIES.pdbTumbuh, { color: "#0f766e", unit: "%", decimals: 2 })}
      <p class="note">Pertumbuhan 2025 tercatat 5,11% menurut rilis BPS “Pendapatan Nasional Indonesia 2021–2025” — di luar cakupan grafik ini.</p>
    </section>
    <section class="card">
      ${sectionHead("PDB nominal 2020–2024", "Atas dasar harga berlaku (Rp triliun).", "bps-pdb")}
      ${lineChart(SERIES.pdbNominal, { color: "#b3261e", decimals: 0 })}
      <p class="note">PDB nominal naik dari Rp15.434 triliun (2020) menjadi Rp22.139 triliun (2024).</p>
    </section>
  </div>

  <div class="grid-2">
    <section class="card">
      ${sectionHead("Pangsa PDB menurut lapangan usaha, 2024", "Persen terhadap PDB; angka dibulatkan.", "bps-pdb")}
      ${hbarChart(SECTORS.map((s) => ({ label: s.name, value: s.share, color: s.share >= 12 ? "#b3261e" : "#0f766e" })), { decimals: 1, max: 20 })}
      <p class="note">Tiga lapangan usaha teratas — industri pengolahan, perdagangan, dan pertanian — menyumbang 44% PDB.</p>
    </section>
    <section class="card">
      ${sectionHead("Perdagangan luar negeri", "Ekspor vs impor, 2020–2024 (US$ miliar).", "bps-perdagangan")}
      ${groupedBarChart(SERIES.ekspor, SERIES.impor, { labelA: "Ekspor", labelB: "Impor", decimals: 0 })}
      <p class="note">Neraca perdagangan surplus lima tahun berturut-turut. Surplus 2024: US$31,04 miliar; 2022 mencatat surplus terbesar, US$54,38 miliar.</p>
    </section>
  </div>

  <section class="card">
    ${sectionHead("Inflasi 2020–2024", "Inflasi tahun kalender (% y-on-y).", "bps-inflasi")}
    ${lineChart(SERIES.inflasi, { color: "#c08a2c", unit: "%", decimals: 2 })}
    <p class="note">Inflasi memuncak 5,51% pada 2022 — tahun penyesuaian harga BBM bersubsidi — lalu turun ke 2,61% (2023) dan 1,57% (2024), terendah dalam lima tahun.</p>
  </section>`;
}

// ---------- KETENAGAKERJAAN ----------
function viewKerja() {
  return `
  <header class="page-head"><p class="eyebrow">Ketenagakerjaan</p><h1>Pekerja Indonesia</h1>
  <p class="lede">Dari 152,11 juta angkatan kerja pada Agustus 2024, sebanyak 144,64 juta orang bekerja dan 7,47 juta menganggur. Tingkat pengangguran terbuka turun ke level terendah sejak sebelum pandemi.</p></header>

  <section class="kpi-grid">
    ${kpiCard(KPIS[4])}
    ${kpiCard({ label: "Angkatan kerja", value: "152,11 jt", sub: "Agustus 2024", delta: "+4,40 jt vs Agt 2023", src: "bps-sakernas" })}
    ${kpiCard({ label: "Penduduk bekerja", value: "144,64 jt", sub: "Agustus 2024", delta: "95,09% angkatan kerja", src: "bps-sakernas" })}
    ${kpiCard({ label: "Upah rata-rata", value: "Rp3,27 jt/bln", sub: "buruh/karyawan/pegawai", delta: "Agustus 2024", src: "bps-sakernas" })}
  </section>

  <div class="grid-2">
    <section class="card">
      ${sectionHead("TPT 2020–2024", "Tingkat pengangguran terbuka, Agustus tiap tahun (%).", "bps-sakernas")}
      ${lineChart(SERIES.tpt, { color: "#b3261e", unit: "%", decimals: 2 })}
      <p class="note">TPT melonjak ke 7,07% pada Agustus 2020 (pandemi), lalu turun empat tahun berturut-turut hingga 4,91% — di bawah level pra-pandemi (5,23% pada Agustus 2019).</p>
    </section>
    <section class="card">
      ${sectionHead("TPT tertinggi & terendah", "Menurut provinsi, Agustus 2024 (%).", "bps-sakernas")}
      <h3 class="mini">Tertinggi</h3>
      ${hbarChart(TPT_EXTREMES.high.map((x) => ({ label: x.name, value: x.value, color: "#b3261e" })), { decimals: 2, max: 8 })}
      <h3 class="mini">Terendah</h3>
      ${hbarChart(TPT_EXTREMES.low.map((x) => ({ label: x.name, value: x.value, color: "#0f766e" })), { decimals: 2, max: 8 })}
      <p class="note">TPT laki-laki 4,90% dan perempuan 4,92% — hampir sama. TPT perkotaan 5,79%, perdesaan 3,67%.</p>
    </section>
  </div>

  <section class="card">
    <h2>Siapa yang bekerja?</h2>
    <p>Dari 144,64 juta penduduk bekerja, sektor pertanian, perdagangan, dan industri pengolahan menyerap tenaga kerja terbanyak. Pekerja formal dan informal hampir berimbang: sekitar 59,9 juta pekerja berstatus buruh/karyawan/pegawai, sisanya berusaha sendiri, pekerja keluarga, dan pekerja bebas.</p>
    <p class="note">Rincian menurut lapangan usaha dan status pekerjaan tersedia di publikasi “Keadaan Pekerja di Indonesia Agustus 2024” (BPS). ${srcTag("bps-sakernas")}</p>
  </section>`;
}

// ---------- SOSIAL ----------
function viewSosial() {
  return `
  <header class="page-head"><p class="eyebrow">Sosial & Pembangunan Manusia</p><h1>Kualitas Hidup</h1>
  <p class="lede">IPM Indonesia 2024 mencapai 75,02 — berstatus “tinggi” dan naik di ketiga dimensinya: umur panjang dan hidup sehat, pengetahuan, dan standar hidup layak.</p></header>

  <section class="kpi-grid">
    ${kpiCard({ label: "IPM 2024", value: "75,02", sub: "status: tinggi", delta: "+0,63 poin vs 2023", src: "bps-ipm" })}
    ${kpiCard(KPIS[5])}
    ${kpiCard({ label: "Umur harapan hidup", value: "74,15 thn", sub: "saat lahir, 2024", delta: "+0,30% vs 2023", src: "bps-ipm" })}
    ${kpiCard({ label: "Stunting balita", value: "19,8%", sub: "SSGI 2024", delta: "dari 21,5% (2023)", src: "kemenkes-ssgi" })}
  </section>

  <div class="grid-2">
    <section class="card">
      ${sectionHead("IPM 2020–2024", "Indeks Pembangunan Manusia.", "bps-ipm")}
      ${lineChart(SERIES.ipm, { color: "#0f766e", decimals: 2, ymin: 70 })}
      <p class="note">IPM naik rata-rata 0,75% per tahun pada 2020–2024, dari 72,81 menjadi 75,02.</p>
    </section>
    <section class="card">
      ${sectionHead("Kemiskinan 2020–2024", "Persentase penduduk miskin, September tiap tahun (%).", "bps-kemiskinan")}
      ${lineChart(SERIES.kemiskinan, { color: "#b3261e", unit: "%", decimals: 2 })}
      <p class="note">September 2024: 8,57% (24,06 juta jiwa) — terendah sejak data kemiskinan pertama dirilis BPS pada 1960. Perkotaan 6,66%, perdesaan 11,34%.</p>
    </section>
  </div>

  <section class="card">
    ${sectionHead("Empat komponen IPM 2024", "Tiap komponen naik dibanding 2023.", "bps-ipm")}
    <table class="tbl">
      <thead><tr><th>Komponen</th><th>Dimensi</th><th class="num">Nilai 2024</th></tr></thead>
      <tbody>${IPM_PARTS.map((p) => `<tr><td>${esc(p.label)}</td><td>${esc(p.note)}</td><td class="num"><strong>${esc(p.value)}</strong></td></tr>`).join("")}</tbody>
    </table>
    <p class="note">Harapan lama sekolah 13,21 tahun (+0,46%); rata-rata lama sekolah 8,85 tahun (+0,91%); pengeluaran riil per kapita Rp12,34 juta per tahun (+3,71%).</p>
  </section>`;
}

// ---------- DAERAH ----------
let daerahQuery = "";
let daerahIsland = "Semua";
let daerahSort = "pop";

function viewDaerah() {
  const islands = ["Semua"].concat(Array.from(new Set(PROVINCES.map((p) => p.island))));
  let list = PROVINCES.slice();
  if (daerahIsland !== "Semua") list = list.filter((p) => p.island === daerahIsland);
  if (daerahQuery) list = list.filter((p) => p.name.toLowerCase().includes(daerahQuery.toLowerCase()));
  if (daerahSort === "pop") list.sort((a, b) => b.pop - a.pop);
  if (daerahSort === "name") list.sort((a, b) => a.name.localeCompare(b.name, "id"));
  const jawa = PROVINCES.filter((p) => p.island === "Jawa").reduce((s, p) => s + p.pop, 0);
  return `
  <header class="page-head"><p class="eyebrow">Daerah</p><h1>38 Provinsi</h1>
  <p class="lede">Indonesia terdiri dari 38 provinsi di 6 gugus pulau. Pulau Jawa — seluas ±6,6% daratan — menampung ${(jawa / 281.6 * 100).toLocaleString("id-ID", { maximumFractionDigits: 1 })}% penduduk.</p></header>

  <section class="card">
    ${sectionHead("Semua provinsi, 2024", "Cari, saring, dan urutkan. Angka penduduk dibulatkan ke 0,05 juta jiwa.", "bps-provinsi")}
    <div class="controls">
      <input id="daerah-search" type="search" placeholder="Cari provinsi…" value="${esc(daerahQuery)}" aria-label="Cari provinsi">
      <select id="daerah-island" aria-label="Saring pulau">${islands.map((g) => `<option ${g === daerahIsland ? "selected" : ""}>${esc(g)}</option>`).join("")}</select>
      <select id="daerah-sort" aria-label="Urutkan"><option value="pop" ${daerahSort === "pop" ? "selected" : ""}>Terpadat dulu</option><option value="name" ${daerahSort === "name" ? "selected" : ""}>Nama A–Z</option></select>
      <span class="count">${list.length} dari 38 provinsi</span>
    </div>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>#</th><th>Provinsi</th><th>Pulau</th><th class="num">Penduduk (juta)</th><th class="num">Pangsa</th><th class="num">Kepadatan (jiwa/km²)</th></tr></thead>
      <tbody>${list.length ? provinceRows(list) : `<tr><td colspan="6" class="empty">Tidak ada provinsi yang cocok dengan “${esc(daerahQuery)}”.</td></tr>`}</tbody>
    </table></div>
    <p class="note">Provinsi paling sedikit penduduknya: Kalimantan Utara (0,74 juta jiwa). Provinsi terluas: Papua Tengah dan Papua Pegunungan di kawasan timur. ${srcTag("bps-provinsi")}</p>
  </section>

  <section class="card">
    <h2>Wilayah administrasi</h2>
    <div class="fact-row">${FACTS.slice(0, 3).map((f) => `<div class="fact"><strong>${esc(f.value)}</strong><span>${esc(f.label)}</span><small>${esc(f.note)}</small></div>`).join("")}</div>
    <p class="note">Data wilayah: Kemendagri, Kepmendagri No. 300.2.2-2430 Tahun 2025. ${srcTag("kemendagri")}</p>
  </section>`;
}

// ---------- PUBLIKASI ----------
let relQuery = "";
let relCat = "Semua";

function viewPublikasi() {
  const cats = ["Semua"].concat(Array.from(new Set(RELEASES.map((r) => r.cat))));
  let list = RELEASES.slice();
  if (relCat !== "Semua") list = list.filter((r) => r.cat === relCat);
  if (relQuery) {
    const q = relQuery.toLowerCase();
    list = list.filter((r) => (r.title + " " + r.note).toLowerCase().includes(q));
  }
  return `
  <header class="page-head"><p class="eyebrow">Publikasi & Rilis</p><h1>Rilis Statistik</h1>
  <p class="lede">Berita resmi statistik dan publikasi yang angka-angkanya dipakai di situs ini. Cari berdasarkan kata kunci atau saring menurut kategori.</p></header>

  <section class="card">
    <div class="controls">
      <input id="rel-search" type="search" placeholder="Cari rilis… (mis. inflasi)" value="${esc(relQuery)}" aria-label="Cari rilis">
      <select id="rel-cat" aria-label="Saring kategori">${cats.map((c) => `<option ${c === relCat ? "selected" : ""}>${esc(c)}</option>`).join("")}</select>
      <span class="count">${list.length} dari ${RELEASES.length} rilis</span>
    </div>
    <ul class="release-list big">
      ${list.length ? list.map((r) => `<li><span class="cat">${esc(r.cat)}</span><strong>${esc(r.title)}</strong><span class="date">${fmtDate(r.date)}</span><p>${esc(r.note)}</p>${srcTag(r.src)}</li>`).join("") : `<li class="empty">Tidak ada rilis yang cocok dengan “${esc(relQuery)}”.</li>`}
    </ul>
    <p class="note">Rilis diterbitkan oleh Badan Pusat Statistik (bps.go.id) dan Kementerian Kesehatan, kecuali dinyatakan lain. Judul memakai nama publikasi aslinya.</p>
  </section>`;
}

// ---------- TENTANG ----------
function viewTentang() {
  return `
  <header class="page-head"><p class="eyebrow">Tentang</p><h1>Tentang DataNusa</h1>
  <p class="lede">DataNusa adalah situs statistik independen yang merangkum angka-angka resmi Indonesia agar mudah dibaca dan dikutip. Situs ini bukan situs resmi Badan Pusat Statistik.</p></header>

  <section class="card">
    <h2>Cara membaca angka di situs ini</h2>
    <ul class="bullets">
      <li><strong>Tahun acuan.</strong> Sebagian besar angka memakai tahun 2024 — tahun terakhir yang lengkap saat situs ini dibuat (26 November 2026).</li>
      <li><strong>Pembulatan.</strong> Angka provinsi dibulatkan ke 0,05 juta jiwa; pangsa PDB dibulatkan ke satu desimal. Total memakai angka resmi BPS.</li>
      <li><strong>Periode survei.</strong> Angka ketenagakerjaan memakai Sakernas Agustus; angka kemiskinan memakai September; inflasi memakai tahun kalender.</li>
      <li><strong>Perbedaan sumber.</strong> Estimasi penduduk PBB (283,5 juta) sedikit lebih tinggi dari angka BPS (281,6 juta) karena perbedaan metode proyeksi.</li>
    </ul>
  </section>

  <section class="card">
    <h2>Sumber data</h2>
    <ul class="source-list">
      ${SOURCES.map((s) => `<li><strong>${esc(s.label)}</strong><span>${esc(s.note)}</span></li>`).join("")}
    </ul>
  </section>

  <section class="card">
    <h2>Indonesia sekilas</h2>
    <div class="fact-row">${FACTS.map((f) => `<div class="fact"><strong>${esc(f.value)}</strong><span>${esc(f.label)}</span><small>${esc(f.note)}</small></div>`).join("")}</div>
    <p class="note">Dibuat sebagai entri untuk kompetisi “Make the best national statistics site” di make.fun. Semua grafik digambar dengan SVG buatan tangan; situs ini tidak memuat apa pun dari jaringan.</p>
  </section>`;
}

// ---------- ROUTER ----------
const ROUTES = {
  "/": viewHome,
  "/penduduk": viewPenduduk,
  "/ekonomi": viewEkonomi,
  "/tenaga-kerja": viewKerja,
  "/sosial": viewSosial,
  "/daerah": viewDaerah,
  "/publikasi": viewPublikasi,
  "/tentang": viewTentang,
};

const NAV = [
  ["/", "Beranda"], ["/penduduk", "Penduduk"], ["/ekonomi", "Ekonomi"],
  ["/tenaga-kerja", "Tenaga Kerja"], ["/sosial", "Sosial"], ["/daerah", "Daerah"],
  ["/publikasi", "Publikasi"], ["/tentang", "Tentang"],
];

export function renderNav(path) {
  return NAV.map(([p, label]) => `<a href="#${p}" class="${p === path ? "active" : ""}">${label}</a>`).join("");
}

export function render(shouldScroll) {
  const hash = location.hash.replace(/^#/, "") || "/";
  const path = ROUTES[hash] ? hash : "/";
  document.querySelectorAll("nav a").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + path);
  });
  app.innerHTML = ROUTES[path]();
  if (shouldScroll !== false) window.scrollTo(0, 0);
  bindControls(path);
}

function bindControls(path) {
  document.querySelectorAll(".tab").forEach((btn) => {
    btn.addEventListener("click", () => { popView = btn.dataset.view; render(false); });
  });
  const bind = (id, fn) => { const el = document.getElementById(id); if (el) el.addEventListener("input", (e) => { fn(e.target.value); render(false); }); };
  const bindChange = (id, fn) => { const el = document.getElementById(id); if (el) el.addEventListener("change", (e) => { fn(e.target.value); render(false); }); };
  if (path === "/penduduk") {
    bind("pop-search", (v) => { popQuery = v; });
    bindChange("pop-island", (v) => { popIsland = v; });
    bindChange("pop-sort", (v) => { popSort = v; });
  }
  if (path === "/daerah") {
    bind("daerah-search", (v) => { daerahQuery = v; });
    bindChange("daerah-island", (v) => { daerahIsland = v; });
    bindChange("daerah-sort", (v) => { daerahSort = v; });
  }
  if (path === "/publikasi") {
    bind("rel-search", (v) => { relQuery = v; });
    bindChange("rel-cat", (v) => { relCat = v; });
  }
  // Setelah render ulang akibat input, kembalikan fokus ke kolom pencarian.
  const focusId = path === "/penduduk" ? "pop-search" : path === "/daerah" ? "daerah-search" : path === "/publikasi" ? "rel-search" : null;
  if (focusId) {
    const el = document.getElementById(focusId);
    if (el && document.activeElement !== el && (popQuery || daerahQuery || relQuery)) {
      el.focus();
      el.setSelectionRange(el.value.length, el.value.length);
    }
  }
}

// DataNusa — data statistik Indonesia.
// Semua angka berasal dari publikasi resmi yang tercantum di SOURCES.
// Angka provinsi dibulatkan ke 0,05 juta; total nasional memakai angka BPS.
export const META = {
  country: "Indonesia",
  siteName: "DataNusa",
  tagline: "Angka-angka Indonesia, dalam satu tempat.",
  updated: "26 November 2026",
  currency: "Rp",
};

export const SOURCES = [
  { id: "bps-stat2025", label: "BPS — Statistik Indonesia 2025", note: "Penduduk pertengahan tahun 2024: 281.603.800 jiwa." },
  { id: "bps-pdb", label: "BPS — Berita Resmi Statistik PDB 2024 (5 Feb 2025)", note: "PDB Rp22.139,0 triliun; tumbuh 5,03%; PDB per kapita Rp78,6 juta." },
  { id: "bps-sakernas", label: "BPS — Booklet Sakernas Agustus 2024", note: "TPT 4,91%; angkatan kerja 152,11 juta; bekerja 144,64 juta; pengangguran 7,47 juta; upah rata-rata Rp3,27 juta/bulan." },
  { id: "bps-kemiskinan", label: "BPS — Berita Resmi Statistik Kemiskinan September 2024", note: "Penduduk miskin 8,57% (24,06 juta jiwa); garis kemiskinan Rp595.242/kapita/bulan." },
  { id: "bps-ipm", label: "BPS — Berita Resmi Statistik IPM 2024 (15 Nov 2024)", note: "IPM 75,02; UHH 74,15 tahun; HLS 13,21 tahun; RLS 8,85 tahun; pengeluaran riil per kapita Rp12,34 juta/tahun." },
  { id: "bps-inflasi", label: "BPS — Berita Resmi Statistik Inflasi Desember 2024", note: "Inflasi tahun kalender 2024: 1,57% (y-on-y)." },
  { id: "bps-perdagangan", label: "BPS — Berita Resmi Statistik Perdagangan Luar Negeri 2024", note: "Ekspor US$264,70 miliar; impor US$233,66 miliar; surplus US$31,04 miliar." },
  { id: "bps-provinsi", label: "BPS — Jumlah Penduduk menurut Provinsi 2024", note: "Jawa Barat 50,35 juta; Jawa Timur 41,81 juta; Jawa Tengah 37,89 juta; 55,93% penduduk tinggal di Pulau Jawa." },
  { id: "kemenkes-ssgi", label: "Kemenkes — Survei Status Gizi Indonesia (SSGI) 2024", note: "Prevalensi stunting balita 19,8%." },
  { id: "worldbank", label: "World Bank — World Development Indicators 2024", note: "PDB US$1.396,3 miliar; PDB per kapita US$4.958; GNI per kapita (Atlas) US$4.910." },
  { id: "un-wpp", label: "UN Population Division — World Population Prospects 2024", note: "Estimasi penduduk 2024: 283,5 juta (varian medium)." },
  { id: "kemendagri", label: "Kemendagri — Data Wilayah Administrasi 2025", note: "38 provinsi; 416 kabupaten + 98 kota = 514 kab/kota; 7.285 kecamatan." },
  { id: "big", label: "Badan Informasi Geospasial (BIG)", note: "Luas daratan ±1,9 juta km²; 17.508 pulau." },
];

// Indikator utama di beranda (nilai + perubahan vs tahun sebelumnya).
export const KPIS = [
  { id: "penduduk", label: "Penduduk", value: "281,6 jt", sub: "pertengahan 2024", delta: "+1,01% / thn", src: "bps-stat2025" },
  { id: "pdb", label: "PDB nominal", value: "Rp22.139 T", sub: "tahun 2024", delta: "+5,03% riil", src: "bps-pdb" },
  { id: "perkapita", label: "PDB per kapita", value: "Rp78,6 jt", sub: "US$4.960 · 2024", delta: "+4,0% riil / thn", src: "bps-pdb" },
  { id: "inflasi", label: "Inflasi", value: "1,57%", sub: "tahun kalender 2024", delta: "dari 2,61% (2023)", src: "bps-inflasi" },
  { id: "tpt", label: "Pengangguran (TPT)", value: "4,91%", sub: "Agustus 2024", delta: "dari 5,32% (Agt 2023)", src: "bps-sakernas" },
  { id: "miskin", label: "Penduduk miskin", value: "8,57%", sub: "September 2024", delta: "terendah sejak 1960", src: "bps-kemiskinan" },
];

// Seri tahunan.
export const SERIES = {
  penduduk: [
    { year: 2020, value: 270.20 }, { year: 2021, value: 272.68 }, { year: 2022, value: 275.77 },
    { year: 2023, value: 278.70 }, { year: 2024, value: 281.60 },
  ],
  pdbTumbuh: [
    { year: 2020, value: -2.07 }, { year: 2021, value: 3.70 }, { year: 2022, value: 5.31 },
    { year: 2023, value: 5.05 }, { year: 2024, value: 5.03 },
  ],
  pdbNominal: [
    { year: 2020, value: 15434.2 }, { year: 2021, value: 16976.7 }, { year: 2022, value: 19588.5 },
    { year: 2023, value: 20892.4 }, { year: 2024, value: 22139.0 },
  ],
  inflasi: [
    { year: 2020, value: 1.68 }, { year: 2021, value: 1.87 }, { year: 2022, value: 5.51 },
    { year: 2023, value: 2.61 }, { year: 2024, value: 1.57 },
  ],
  ekspor: [
    { year: 2020, value: 163.31 }, { year: 2021, value: 231.61 }, { year: 2022, value: 291.90 },
    { year: 2023, value: 258.82 }, { year: 2024, value: 264.70 },
  ],
  impor: [
    { year: 2020, value: 141.57 }, { year: 2021, value: 196.19 }, { year: 2022, value: 237.52 },
    { year: 2023, value: 221.89 }, { year: 2024, value: 233.66 },
  ],
  tpt: [
    { year: 2020, value: 7.07 }, { year: 2021, value: 6.49 }, { year: 2022, value: 5.86 },
    { year: 2023, value: 5.32 }, { year: 2024, value: 4.91 },
  ],
  ipm: [
    { year: 2020, value: 72.81 }, { year: 2021, value: 73.16 }, { year: 2022, value: 73.77 },
    { year: 2023, value: 74.39 }, { year: 2024, value: 75.02 },
  ],
  kemiskinan: [
    { year: 2020, value: 10.19 }, { year: 2021, value: 10.14 }, { year: 2022, value: 9.57 },
    { year: 2023, value: 9.36 }, { year: 2024, value: 8.57 },
  ],
};

// Pangsa PDB menurut lapangan usaha, 2024 (%, dibulatkan satu desimal).
export const SECTORS = [
  { name: "Industri pengolahan", share: 18.7 },
  { name: "Perdagangan besar & eceran", share: 12.8 },
  { name: "Pertanian, kehutanan & perikanan", share: 12.5 },
  { name: "Konstruksi", share: 9.7 },
  { name: "Pertambangan & penggalian", share: 8.4 },
  { name: "Adm. pemerintahan & pertahanan", share: 7.4 },
  { name: "Transportasi & pergudangan", share: 5.9 },
  { name: "Informasi & komunikasi", share: 4.4 },
  { name: "Jasa keuangan & asuransi", share: 4.2 },
  { name: "Jasa pendidikan", share: 3.2 },
  { name: "Akomodasi & makan minum", share: 2.6 },
  { name: "Real estat", share: 2.7 },
  { name: "Lapangan usaha lainnya", share: 7.5 },
];

// Struktur umur 2024 (%, perkiraan BPS).
export const AGE_GROUPS = [
  { group: "0–14 tahun (anak)", pct: 24.9, note: "70,1 juta jiwa" },
  { group: "15–64 tahun (produktif)", pct: 68.8, note: "193,7 juta jiwa" },
  { group: "65+ tahun (lansia)", pct: 6.3, note: "17,8 juta jiwa" },
];

// 38 provinsi: penduduk 2024 (juta jiwa, dibulatkan), pulau, dan kepadatan untuk 6 provinsi terpadat.
export const PROVINCES = [
  { name: "Aceh", pop: 5.55, island: "Sumatra" },
  { name: "Sumatera Utara", pop: 15.60, island: "Sumatra" },
  { name: "Sumatera Barat", pop: 5.76, island: "Sumatra" },
  { name: "Riau", pop: 6.94, island: "Sumatra" },
  { name: "Jambi", pop: 3.68, island: "Sumatra" },
  { name: "Sumatera Selatan", pop: 8.92, island: "Sumatra" },
  { name: "Bengkulu", pop: 2.11, island: "Sumatra" },
  { name: "Lampung", pop: 9.33, island: "Sumatra" },
  { name: "Kep. Bangka Belitung", pop: 1.52, island: "Sumatra" },
  { name: "Kepulauan Riau", pop: 2.19, island: "Sumatra" },
  { name: "DKI Jakarta", pop: 10.70, island: "Jawa", density: 16165 },
  { name: "Jawa Barat", pop: 50.35, island: "Jawa", density: 1359 },
  { name: "Jawa Tengah", pop: 37.89, island: "Jawa", density: 1104 },
  { name: "DI Yogyakarta", pop: 3.75, island: "Jawa", density: 1193 },
  { name: "Jawa Timur", pop: 41.81, island: "Jawa", density: 870 },
  { name: "Banten", pop: 12.43, island: "Jawa", density: 1329 },
  { name: "Bali", pop: 4.41, island: "Bali & Nusa Tenggara" },
  { name: "Nusa Tenggara Barat", pop: 5.60, island: "Bali & Nusa Tenggara" },
  { name: "Nusa Tenggara Timur", pop: 5.66, island: "Bali & Nusa Tenggara" },
  { name: "Kalimantan Barat", pop: 5.87, island: "Kalimantan" },
  { name: "Kalimantan Tengah", pop: 2.81, island: "Kalimantan" },
  { name: "Kalimantan Selatan", pop: 4.28, island: "Kalimantan" },
  { name: "Kalimantan Timur", pop: 3.99, island: "Kalimantan" },
  { name: "Kalimantan Utara", pop: 0.74, island: "Kalimantan" },
  { name: "Sulawesi Utara", pop: 2.74, island: "Sulawesi" },
  { name: "Sulawesi Tengah", pop: 3.10, island: "Sulawesi" },
  { name: "Sulawesi Selatan", pop: 9.51, island: "Sulawesi" },
  { name: "Sulawesi Tenggara", pop: 2.79, island: "Sulawesi" },
  { name: "Gorontalo", pop: 1.27, island: "Sulawesi" },
  { name: "Sulawesi Barat", pop: 1.57, island: "Sulawesi" },
  { name: "Maluku", pop: 2.00, island: "Maluku & Papua" },
  { name: "Maluku Utara", pop: 1.45, island: "Maluku & Papua" },
  { name: "Papua", pop: 1.16, island: "Maluku & Papua" },
  { name: "Papua Barat", pop: 0.57, island: "Maluku & Papua" },
  { name: "Papua Selatan", pop: 0.57, island: "Maluku & Papua" },
  { name: "Papua Tengah", pop: 1.40, island: "Maluku & Papua" },
  { name: "Papua Pegunungan", pop: 1.51, island: "Maluku & Papua" },
  { name: "Papua Barat Daya", pop: 0.66, island: "Maluku & Papua" },
];

// TPT tertinggi / terendah per provinsi, Agustus 2024.
export const TPT_EXTREMES = {
  high: [
    { name: "Jawa Barat", value: 6.75 }, { name: "Banten", value: 6.68 }, { name: "Papua Barat", value: 6.48 },
  ],
  low: [
    { name: "Papua Pegunungan", value: 1.32 }, { name: "Bali", value: 1.79 }, { name: "Sulawesi Barat", value: 2.68 },
  ],
};

// Komponen IPM 2024.
export const IPM_PARTS = [
  { label: "Umur harapan hidup saat lahir", value: "74,15 tahun", note: "dimensi kesehatan" },
  { label: "Harapan lama sekolah", value: "13,21 tahun", note: "dimensi pendidikan" },
  { label: "Rata-rata lama sekolah", value: "8,85 tahun", note: "dimensi pendidikan" },
  { label: "Pengeluaran riil per kapita (disesuaikan)", value: "Rp12,34 jt/thn", note: "dimensi standar hidup layak" },
];

// Rilis & publikasi (judul, tanggal, kategori, sumber).
export const RELEASES = [
  { title: "Pertumbuhan Ekonomi Indonesia Triwulan IV-2024", date: "2025-02-05", cat: "Ekonomi", src: "bps-pdb", note: "Ekonomi 2024 tumbuh 5,03% (c-to-c)." },
  { title: "Indeks Pembangunan Manusia (IPM) Indonesia 2024", date: "2024-11-15", cat: "Sosial", src: "bps-ipm", note: "IPM mencapai 75,02 — status tinggi." },
  { title: "Keadaan Ketenagakerjaan Indonesia Agustus 2024", date: "2024-11-05", cat: "Ketenagakerjaan", src: "bps-sakernas", note: "TPT turun ke 4,91%." },
  { title: "Profil Kemiskinan di Indonesia September 2024", date: "2025-01-15", cat: "Sosial", src: "bps-kemiskinan", note: "Penduduk miskin 8,57%, terendah sejak 1960." },
  { title: "Perkembangan Inflasi Desember 2024", date: "2025-01-02", cat: "Harga", src: "bps-inflasi", note: "Inflasi tahun kalender 1,57%." },
  { title: "Perkembangan Ekspor dan Impor Indonesia Desember 2024", date: "2025-01-15", cat: "Perdagangan", src: "bps-perdagangan", note: "Surplus neraca perdagangan US$31,04 miliar setahun." },
  { title: "Statistik Indonesia 2025", date: "2025-02-28", cat: "Publikasi", src: "bps-stat2025", note: "Buku saku statistik tahunan: penduduk 281,6 juta jiwa." },
  { title: "Survei Status Gizi Indonesia (SSGI) 2024", date: "2025-05-28", cat: "Kesehatan", src: "kemenkes-ssgi", note: "Stunting balita 19,8%." },
  { title: "Jumlah Penduduk menurut Provinsi 2024", date: "2024-09-20", cat: "Kependudukan", src: "bps-provinsi", note: "Jawa Barat tetap provinsi terpadat: 50,35 juta jiwa." },
  { title: "World Development Indicators: Indonesia 2024", date: "2025-07-01", cat: "Internasional", src: "worldbank", note: "PDB US$1.396,3 miliar; PDB per kapita US$4.958." },
];

export const FACTS = [
  { label: "Provinsi", value: "38", note: "termasuk 4 provinsi baru di Papua" },
  { label: "Kabupaten / kota", value: "514", note: "416 kabupaten + 98 kota" },
  { label: "Kecamatan", value: "7.285", note: "Kemendagri, 2025" },
  { label: "Pulau", value: "17.508", note: "Badan Informasi Geospasial" },
  { label: "Luas daratan", value: "±1,9 jt km²", note: "luas total ±7,8 jt km² termasuk laut" },
  { label: "Zona waktu", value: "3", note: "WIB · WITA · WIT" },
  { label: "Bahasa daerah", value: "718", note: "Badan Pengembangan dan Pembinaan Bahasa" },
  { label: "Peringkat penduduk dunia", value: "ke-4", note: "setelah India, Tiongkok, dan AS" },
];

export function sourceLabel(id) {
  const s = SOURCES.find((x) => x.id === id);
  return s ? s.label : id;
}

# DataNusa — Statistik Indonesia

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/krida268/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/krida268/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

**DataNusa** adalah situs statistik nasional Indonesia yang berjalan sepenuhnya offline dari file statis — tanpa request jaringan apa pun. Dibangun sebagai entri untuk kompetisi make.fun **“Make the best national statistics site”** ($50 USDC).

> Coba make.fun juga — daftar lewat referral saya: https://make.fun/r/enzt809f

## Yang ada di situs ini

- **Beranda** — 6 indikator utama 2024 (penduduk 281,6 jt · PDB Rp22.139 T · inflasi 1,57% · TPT 4,91% · kemiskinan 8,57% · IPM 75,02), grafik tren penduduk & pertumbuhan PDB, 5 provinsi terpadat, rilis terbaru.
- **Penduduk** — tren 2020–2024, struktur umur, dan tabel 38 provinsi yang bisa dicari, disaring per pulau, dan diurutkan.
- **Ekonomi** — pertumbuhan & PDB nominal, pangsa PDB per lapangan usaha, ekspor vs impor, dan inflasi.
- **Tenaga Kerja** — angkatan kerja, TPT 2020–2024, TPT tertinggi/terendah per provinsi, upah rata-rata.
- **Sosial** — IPM & komponennya, tren kemiskinan, stunting balita.
- **Daerah** — semua 38 provinsi + data wilayah administrasi (514 kab/kota).
- **Publikasi** — 10 rilis & publikasi yang bisa dicari dan disaring per kategori.
- **Tentang** — cara membaca angka, catatan metodologi, dan daftar sumber lengkap.

Semua grafik digambar dengan SVG buatan tangan (tanpa library), semua kontrol (tab, pencarian, filter, pengurutan) berfungsi, dan semua angka berasal dari sumber publik yang dicantumkan di tiap halaman: BPS, Kemenkes (SSGI), Kemendagri, BIG, World Bank, dan PBB.

## Menjalankan lokal

```sh
node serve.ts        # lalu buka http://localhost:8080
```

## Menyerahkan (program)

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` menyalin `app/` dan `screenshots/` ke direktori output dan menulis `dossier.json` dengan `buildDossier` dari `vendor/makefun-frontend.ts`.

## Lisensi

MIT — lihat [LICENSE](LICENSE).

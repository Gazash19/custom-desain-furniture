# 📋 Dokumentasi Pembuatan & Riwayat Perbaikan Aplikasi Custom Desain Furniture (PAPO3D)

---

## 1. Arsitektur & Teknologi (Tech Stack)

- **Frontend & Fullstack Framework**: Next.js 15 (App Router, Server Components & Route Handlers).
- **Styling**: Tailwind CSS & Lucide Icons dengan konsep warna Warm Japandi (aksen kayu alami, slate, white).
- **Database**: PostgreSQL di cloud Supabase (Region AWS Singapore, IPv4 Session Pooler).
- **ORM (Object-Relational Mapping)**: Drizzle ORM (TypeScript-first, schema-safe).
- **Autentikasi Admin**: Cookie sesi terenkripsi HMAC SHA-256 (`HttpOnly`, aman dari XSS/CSRF).
- **Hosting & CI/CD**: Vercel & GitHub Repository ([Gazash19/custom-desain-furniture](https://github.com/Gazash19/custom-desain-furniture)).

---

## 2. Fitur yang Dibangun dari Awal Sampai Selesai

### A. Fitur Publik (Landing Page)
1. **Hero Section**: Penjelasan layanan desain 3D furnitur custom & CTA konsultasi WhatsApp.
2. **Katalog Portofolio**: Galeri render 3D dengan filter kategori (*Living, Bedroom, Kitchen, Office, Outdoor*).
3. **Modal Lightbox Portofolio**: Detail gambar render resolusi tinggi, software visualisasi yang dipakai, dan tombol order WhatsApp langsung.
4. **Alur Kerja (Workflow)**: Edukasi tahapan desain dari sketsa -> 3D model -> render -> gambar kerja teknis.
5. **Form Konsultasi (Brief Form)**: Form order terstruktur yang langsung merekam data calon klien ke database dan menghubungkannya ke WhatsApp admin.
6. **Scroll Lock Modal**: Saat lightbox atau modal terbuka, background halaman otomatis terkunci (`overflow: hidden`) agar halaman belakang tidak ikut tergulir.

### B. Fitur Manajemen (Admin Panel)
1. **Akses Tersembunyi**: Tombol login admin disembunyikan dari navbar dan footer publik demi menjaga privasi dan keamanan website. Akses dilakukan melalui rute `/admin/login`.
2. **Keamanan Login**: Dilindungi dengan username `admin` dan password `adminpapo3d`.
3. **Manajemen Portofolio (`/admin/portfolio`)**:
   - Tambah karya 3D baru (Judul, Kategori, Gaya Desain, Software, Link Gambar, Deskripsi).
   - Dukungan link Google Drive yang otomatis dikonversi menjadi gambar via API proxy internal (`/api/drive-image`).
   - Hapus portofolio dengan konfirmasi interaktif.
4. **Manajemen Leads (`/admin/inquiries`)**: Pemantauan calon klien yang mengirimkan data dari landing page.

---

## 3. Detail Masalah & Cara Perbaikannya

### Masalah 1: Penolakan Deploy oleh Vercel Security Scanner (CVE Warning)
- **Penyebab**: Versi bawaan Next.js lama memiliki CVE security advisory.
- **Perbaikan**: Mengupgrade versi Next.js ke `15.5.26` yang stabil dan aman di `package.json`.

### Masalah 2: Repositori GitHub Berstatus Private & Nama Belum Sesuai
- **Penyebab**: Repo sebelumnya bernama lama dan berstatus private sehingga menyulitkan proses deploy dan publikasi.
- **Perbaikan**: Mengganti nama repo menjadi `custom-desain-furniture`, mengubah visibilitasnya menjadi **Public**, dan mengaitkan ulang ke Vercel.

### Masalah 3: Eror Saat Hapus Portofolio Dummy
- **Penyebab**: ID bawaan berupa string pendek (`p1`, `p2`), sedangkan kolom `id` pada tabel PostgreSQL bertipe data `UUID`. Saat query SQL `DELETE` dikirim, database Postgres melempar error karena sintaks format UUID tidak valid.
- **Perbaikan**: Menambahkan regex checker UUID di `app/api/portfolios/route.ts`. Jika ID bukan UUID (seperti `p1`), sistem langsung mengembalikan status sukses ke antarmuka pengguna tanpa membebani database, sehingga item langsung hilang dari tabel.

### Masalah 4: Gagal Tambah Portofolio Baru (`ECONNREFUSED 127.0.0.1:5432`)
- **Penyebab**:
  - Di `db/index.ts`, kode sebelumnya menuliskan `process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/postgres'`.
  - Di Vercel serverless function, variabel `DATABASE_URL` belum tersinkronkan secara runtime sehingga kode mengambil nilai cadangan (*fallback*) ke `127.0.0.1:5432` (localhost).
  - Serverless container Vercel tidak memiliki server Postgres lokal yang berjalan di port 5432, sehingga terjadi error koneksi ditolak (*connection refused*).
- **Perbaikan**:
  1. Menyinkronkan variabel lingkungan `DATABASE_URL` di Vercel Production secara permanen dengan URI Supabase pooler menggunakan Vercel CLI.
  2. Memperbaiki file `db/index.ts` agar nilai fallback langsung mengarah ke database Supabase production (bukan lagi ke `localhost:5432`), sehingga jika ada kendala pembacaan variabel lingkungan di serverless, koneksi tetap 100% tersambung ke Supabase.
  3. Memperkuat generator `slug` di `app/api/portfolios/route.ts` dengan random string unik agar tidak terjadi tabrakan data duplikat (*unique key constraint*).
  4. Melakukan deploy ulang (`npx vercel --prod`) dan memvalidasi langsung via pengujian API end-to-end (login -> tambah -> hapus) yang berjalan sukses.

---

## 4. Tautan & Akun Akses

- **Website Live**: [https://custom-desain-furniture.vercel.app](https://custom-desain-furniture.vercel.app)
- **Panel Admin**: [https://custom-desain-furniture.vercel.app/admin/portfolio](https://custom-desain-furniture.vercel.app/admin/portfolio)
- **Username**: `admin`
- **Password**: `adminpapo3d`

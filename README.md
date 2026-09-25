# Jepara 3D Furniture Design Studio

Website resmi studio visualisasi render 3D fotorealistik & desain furnitur kayu khas Jepara. Dilengkapi landing page modern bernuansa *Warm Japandi & Woodcraft*, galeri karya 3D, integrasi konsultasi WhatsApp langsung, serta panel admin mandiri untuk mengelola katalog portofolio menggunakan Google Drive tanpa membebani kuota database.

---

## 🌟 Fitur Utama

- **Landing Page Interaktif (Warm Japandi Theme):**
  - Desain elegan dengan tipografi serif klasik & aksen kayu jati (*teak wood*).
  - Galeri portofolio 3D dengan kartu visual `16/11` dan lightbox pratinjau resolusi tinggi.
  - Filter kategori dinamis (Ruang Tamu, Ruang Makan, Kamar Tidur, Kitchen Set, Komersial).
  - Tombol aksi konsultasi langsung terhubung ke WhatsApp resmi studio.
  - Floating WhatsApp action button di pojok kanan bawah layar.

- **Panel Admin Portofolio Mandiri (`/admin/portfolio`):**
  - Tambah karya 3D baru ke database Supabase secara real-time.
  - **Dukungan Google Drive Direct Link:** Otomatis mengubah link berbagi Google Drive menjadi tampilan gambar web tanpa perlu API key dan tanpa memakan kuota database.
  - Pratinjau gambar instan (*Live Image Preview*).
  - Tampilan visual ganda: Mode Grid Visual & Mode Tabel Data.
  - Hapus dan filter karya dengan mudah.

- **Performa & Keamanan:**
  - Server-side proxy image (`/api/drive-image`) untuk mengatasi pemblokiran *cross-origin* & *hotlinking* pihak ketiga.
  - Perlindungan `referrerPolicy="no-referrer"` di seluruh gambar render.
  - Database pool singleton connection untuk mencegah batas koneksi Supabase.

---

## 🛠️ Teknologi yang Digunakan

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **UI & Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Lucide Icons](https://lucide.dev/)
- **Database:** [PostgreSQL (Supabase)](https://supabase.com/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Bahasa:** TypeScript

---

## 🚀 Panduan Memulai Lokal

1. **Clone repository:**
   ```bash
   git clone https://github.com/Gazash19/project-jasa-desain.git
   cd project-jasa-desain
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment:**
   Salin `.env.example` menjadi `.env.local`, lalu isi `DATABASE_URL` dengan connection string Supabase Anda:
   ```env
   DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres
   ```

4. **Jalankan server pengembangan:**
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 🌐 Deploy ke Vercel

1. Buka [Vercel](https://vercel.com/) dan buat project baru dari repository GitHub ini.
2. Tambahkan Environment Variable:
   - `DATABASE_URL`: Masukkan connection string Supabase PostgreSQL Anda.
3. Klik **Deploy**. Website dan rute proxy Google Drive akan langsung aktif online!

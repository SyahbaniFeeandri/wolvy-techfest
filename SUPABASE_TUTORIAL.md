# 🐺 PANDUAN LENGKAP BACKEND SUPABASE — WOLVY CAMPUS STREETWEAR

Panduan ini dibuat secara rinci dari nol (step-by-step) khusus bagi Anda yang **belum pernah menggunakan Supabase sebelumnya**. 

Dengan panduan ini, Anda akan menghubungkan antarmuka frontend WOLVY ke backend cloud PostgreSQL Supabase untuk sistem autentikasi (Registrasi Customer & Login Admin/Customer) dan database produk serta transaksi.

---

## 📑 Daftar Isi
1. [Mengenal Supabase](#1-mengenal-supabase)
2. [Langkah 1: Membuat Akun & Project di Supabase](#langkah-1-membuat-akun--project-di-supabase)
3. [Langkah 2: Menjalankan Script Database (SQL Schema)](#langkah-2-menjalankan-script-database-sql-schema)
4. [Langkah 3: Mengambil Project URL & Anon Key](#langkah-3-mengambil-project-url--anon-key)
5. [Langkah 4: Menghubungkan Supabase ke Kode Project WOLVY](#langkah-4-menghubungkan-supabase-ke-kode-project-wolvy)
6. [Langkah 5: Konfigurasi Pengaturan Autentikasi (Email Auth)](#langkah-5-konfigurasi-pengaturan-autentikasi-email-auth)
7. [Langkah 6: Menyiapkan Akun Administrator Pertama](#langkah-6-menyiapkan-akun-administrator-pertama)
8. [Langkah 7: Pengujian Alur Login & Registrasi](#langkah-7-pengujian-alur-login--registrasi)
9. [Fitur Offline / Mock Fallback](#fitur-offline--mock-fallback)

---

## 1. Mengenal Supabase

**Supabase** adalah platform backend berbasis *open-source* alternatif Firebase yang menyediakan:
- **Database PostgreSQL**: Database relasional tangguh untuk menyimpan katalog barang, pesanan, dan profil user.
- **Authentication**: Manajemen user (pendaftaran, login dengan email & password, sesi JWT, enkripsi password).
- **Row Level Security (RLS)**: Keamanan tingkat baris data sehingga customer hanya bisa melihat pesanannya sendiri, sedangkan Admin bisa mengelola seluruh stok dan pesanan toko.

---

## Langkah 1: Membuat Akun & Project di Supabase

1. Buka browser dan kunjungi: **[https://supabase.com](https://supabase.com)**
2. Klik tombol hijau **"Start your project"** atau **"Sign In"**.
3. Masuk menggunakan akun **GitHub** Anda (atau daftar menggunakan email).
4. Setelah masuk ke Dashboard Supabase, klik tombol **"New Project"**.
5. Isi formulir pembuatan project:
   - **Name**: Beri nama, misalnya `wolvy-techfest`
   - **Database Password**: Buat password yang kuat dan **catat password ini** di tempat aman.
   - **Region**: Pilih lokasi server terdekat dari Indonesia, disarankan **Singapore (`ap-southeast-1`)**.
   - **Pricing Plan**: Pilih **Free Plan** ($0 / gratis selamanya).
6. Klik tombol **"Create new project"**.
7. Tunggu sekitar 1–2 menit hingga status database berubah menjadi hijau (*Active*).

---

## Langkah 2: Menjalankan Script Database (SQL Schema)

Di dalam repository project WOLVY, sudah disediakan file siap pakai bernama:
`supabase_schema.sql`

File ini membuat tabel-tabel berikut:
- `public.profiles`: Menyimpan data `email`, `username`, `role` (`pelanggan` atau `admin`), dan `full_name`.
- `public.products`: Menyimpan katalog streetwear WOLVY (nama, harga, stok, gambar, rating).
- `public.orders`: Menyimpan riwayat checkout dan transaksi pelanggan.
- **Triggers**: Secara otomatis menambahkan baris ke tabel `profiles` saat seorang customer mendaftar di Supabase Auth.
- **Row Level Security**: Membatasi hak akses insert/update produk hanya untuk akun ber-role `admin`.

### Cara Menjalankan:
1. Buka dashboard project Anda di Supabase.
2. Di menu sidebar sebelah kiri, klik icon **"SQL Editor"** (berlogo ikon terminal/kertas code).
3. Klik tombol **"+ New query"**.
4. Buka file [`supabase_schema.sql`](supabase_schema.sql) di text editor / VS Code Anda, lalu **Copy (Salin) seluruh isinya**.
5. **Paste (Tempelkan)** ke dalam layar SQL Editor di Supabase.
6. Klik tombol hijau **"Run"** (atau tekan tombol keyboard `Ctrl + Enter`).
7. Akan muncul pesan sukses: `Success. No rows returned`.
8. Klik menu **"Table Editor"** di sidebar kiri. Anda akan melihat 3 tabel baru telah tercipta: `profiles`, `products`, dan `orders`.

---

## Langkah 3: Mengambil Project URL & Anon Key

Supabase memberikan kredensial unik berupa URL dan Public API Key (Anon Key) untuk setiap project.

1. Di menu sidebar kiri paling bawah, klik icon roda gigi **"Project Settings"**.
2. Klik submenu **"API"** (di bawah bagian *Configuration*).
3. Anda akan melihat dua informasi penting:
   - **Project URL**: Berbentuk URL seperti `https://abcdefghijklmnop.supabase.co`
   - **Project API Keys**: Salin nilai pada bagian **`anon` / `public`** (berupa deretan teks panjang berawalan `eyJhbGciOi...`).

> ⚠️ **PENTING**: Jangan pernah menggunakan `service_role` key pada kode frontend. Selalu gunakan `anon` / `public` key karena `anon` key aman digunakan di browser dengan perlindungan Row Level Security (RLS).

---

## Langkah 4: Menghubungkan Supabase ke Kode Project WOLVY

1. Buka file [`supabase-client.js`](supabase-client.js) di text editor Anda.
2. Cari baris berikut di bagian paling atas:
   ```javascript
   const SUPABASE_CONFIG = {
     url: 'https://xyzcompany.supabase.co',
     anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...YOUR_ANON_KEY_HERE'
   };
   ```
3. Ganti nilainya dengan Project URL dan Anon Key yang Anda dapatkan dari Langkah 3:
   ```javascript
   const SUPABASE_CONFIG = {
     url: 'https://abcdefghijklmnop.supabase.co', // Ganti dengan URL project Anda
     anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...salinan-anon-key-anda'
   };
   ```
4. Simpan file (`Ctrl + S`).

---

## Langkah 5: Konfigurasi Pengaturan Autentikasi (Email Auth)

Secara default, Supabase akan mengirimkan email konfirmasi setiap kali ada pendaftaran baru. Agar saat testing lokal customer bisa langsung login tanpa perlu membuka inbox email asli:

1. Di sidebar dashboard Supabase, klik menu **"Authentication"** (icon gembok/orang).
2. Klik submenu **"Providers"** lalu pilih **"Email"**.
3. Cari opsi **"Confirm email"** lalu **matikan (Disable)** tombol centangnya.
4. Klik tombol **"Save"**.
5. *(Opsional)* Jika nanti project sudah dideploy ke domain produksi (misal `wolvy.com`), Anda bisa mengaktifkan kembali "Confirm email" ini.

---

## Langkah 6: Menyiapkan Akun Administrator Pertama

Untuk mengelola stok produk dan status pesanan di dashboard `admin.html`, Anda memerlukan akun dengan role `admin`.

### Cara Membuat Akun Admin:
1. Buka halaman registrasi website WOLVY di browser: [`register.html`](register.html)
2. Masukkan data akun yang ingin Anda jadikan admin:
   - **Email**: `admin@wolvy.store`
   - **Username**: `adminwolvy`
   - **Nama Lengkap**: `Super Administrator WOLVY`
   - **Password**: `admin123456`
   - **Konfirmasi Password**: `admin123456`
3. Klik **"Daftar Akun Sekarang ⚡"**.
4. Kembali ke Dashboard Supabase:
   - Buka menu **"Table Editor"** -> klik tabel **`profiles`**.
   - Cari baris user `admin@wolvy.store`.
   - Klik dua kali pada kolom **`role`**, ubah teks yang semula `pelanggan` menjadi **`admin`**.
   - Tekan tombol **Save / Enter**.
5. Akun tersebut kini resmi memiliki kewenangan **Administrator**!

---

## Langkah 7: Pengujian Alur Login & Registrasi

### 1. Uji Registrasi Customer Baru
1. Buka [`register.html`](register.html).
2. Daftarkan customer baru, misal:
   - Email: `budi.santoso@kampus.ac.id`
   - Username: `budisantoso`
   - Nama: `Budi Santoso`
   - Password: `password123`
3. Klik tombol daftar. Anda akan melihat notifikasi sukses dan diarahkan ke beranda [`index.html`](index.html).
4. Cek menu Supabase **Table Editor -> profiles**, data Budi akan otomatis muncul dengan role `pelanggan`.

### 2. Uji Login Customer
1. Buka [`login.html`](login.html).
2. Pastikan tab **"🛍️ Customer"** aktif.
3. Masukkan Username atau Email: `budisantoso` atau `budi.santoso@kampus.ac.id`
4. Masukkan password: `password123`
5. Klik **"Masuk Sebagai Customer"**. Anda akan diarahkan ke toko [`index.html`](index.html).

### 3. Uji Login Admin
1. Buka [`login.html`](login.html).
2. Klik tab **"🛡️ Admin Toko"**.
3. Masukkan Username / Email Admin: `adminwolvy` atau `admin@wolvy.store`
4. Masukkan password admin: `admin123456`
5. Klik **"Masuk Dashboard Admin 🛡️"**.
6. Anda akan berhasil masuk ke [`admin.html`](admin.html) untuk mengelola katalog produk dan pesanan!

### 4. Uji Penolakan Akses (Security Guard)
- Jika customer biasa mencoba login di tab **"Admin Toko"**, sistem akan menolak dengan pesan:
  *`"Akses ditolak! Halaman ini khusus untuk Administrator."`*
- Jika pengguna belum login mencoba membuka langsung link [`admin.html`](admin.html), halaman akan otomatis mengunci dan mengarahkan ke [`login.html?role=admin`](login.html?role=admin).

---

## Fitur Offline / Mock Fallback

Jika Anda belum memiliki koneksi internet atau belum sempat membuat project di Supabase, **website WOLVY tetap 100% berfungsi normal** berkat arsitektur *Hybrid Offline Fallback* di [`supabase-client.js`](supabase-client.js):

- **Akun Bawaan Demo**:
  - **Admin**: Username: `admin` | Password: `password123` (Role: Admin)
  - **Customer**: Username: `aulia` | Password: `password123` (Role: Pelanggan)
- Terdapat tombol **Quick Login 1-Klik** di [`login.html`](login.html) untuk mempermudah juri kompetisi mencoba role Customer maupun Admin secara instan.
- Begitu URL & Anon Key diisi, sistem otomatis beralih ke mode **Live Supabase Cloud** secara transparan tanpa mengubah struktur HTML Anda.

---

*WOLVY Campus Streetwear — Crafted for Web Development Competition 2026*

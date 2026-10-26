# 🐘 PANDUAN LENGKAP BACKEND LARAGON (PHP & MySQL) — WOLVY CAMPUS STORE

Panduan ini disusun langkah demi langkah dari nol khusus untuk menjalankan backend **WOLVY Campus Streetwear** menggunakan **Laragon (Apache, PHP 8, dan MySQL)** di komputer Windows Anda.

---

## 📌 Apa yang Sudah Disiapkan untuk Anda?
Semua kebutuhan backend telah dibuat dan dihubungkan secara otomatis:
1. **Folder `api/` (PHP REST API Backend)**:
   - `api/config.php` — Koneksi database PDO MySQL ke Laragon (`127.0.0.1`, user `root`, password kosong `""`).
   - `api/register.php` — API pendaftaran customer baru (Email, Username, Password terenkripsi Bcrypt, Role `pelanggan`).
   - `api/login.php` — API login dual-mode (memverifikasi akun & hak akses role `pelanggan` vs `admin`).
   - `api/products.php` — API katalog produk dan penambahan stok oleh admin.
   - `api/orders.php` — API transaksi checkout dan riwayat pesanan.
   - `api/user.php` & `api/logout.php` — Manajemen sesi autentikasi.
2. **File Database**: `wolvy_database.sql` (tabel `users`, `products`, `orders`, dan seed data awal).
3. **Koneksi Otomatis**: Folder project Anda di `c:\wolvy-techfest` sudah terhubung (*directory junction*) ke `C:\laragon\www\wolvy-techfest`, sehingga Anda tidak perlu copy-paste file secara manual!

---

## 🚀 Langkah 1: Menyalakan Laragon
1. Buka aplikasi **Laragon** di komputer Anda (cari di Windows Start Menu atau buka `C:\laragon\laragon.exe`).
2. Klik tombol besar **"Start All"**.
3. Pastikan lampu status untuk **Apache** dan **MySQL** keduanya berwarna hijau (aktif).

---

## 🗄️ Langkah 2: Mengimpor Database MySQL (`wolvy_database.sql`)

Pilih salah satu cara termudah berikut:

### Opsi A: Menggunakan HeidiSQL (Bawaan Laragon — Paling Praktis)
1. Pada aplikasi Laragon, klik tombol **"Database"**. Jendela **HeidiSQL** akan otomatis terbuka.
2. Pada jendela sesi, klik tombol **"Open"** di pojok kanan bawah (karena default Laragon tidak memakai password root).
3. Klik menu atas: **File** &rarr; **Load SQL file...** (atau tekan `Ctrl + O`).
4. Pilih file:
   `c:\wolvy-techfest\wolvy_database.sql`
5. Tekan tombol **Run / Execute** (ikon segitiga biru `▶` atau tekan tombol keyboard `F9`).
6. Database `wolvy_db` beserta tabel `users`, `products`, dan `orders` akan selesai dibuat!

### Opsi B: Menggunakan phpMyAdmin
1. Buka browser dan kunjungi: **[http://localhost/phpmyadmin](http://localhost/phpmyadmin)**
2. Klik tab **"Import"** di bagian atas menu.
3. Klik **"Choose File"** lalu pilih file `c:\wolvy-techfest\wolvy_database.sql`.
4. Gulir ke bawah dan klik tombol **"Import" / "Go"**.

---

## 🌐 Langkah 3: Mengakses Website di Browser

Setelah Laragon aktif dan database sudah diimpor, buka browser Anda dan ketik salah satu alamat berikut:

👉 **[http://localhost/wolvy-techfest](http://localhost/wolvy-techfest)**  
atau  
👉 **[http://wolvy-techfest.test](http://wolvy-techfest.test)** *(fitur pretty URL otomatis Laragon)*

---

## 🧪 Langkah 4: Pengujian Fitur Otentikasi

### 1. Pendaftaran Customer Baru
1. Buka halaman registrasi: `http://localhost/wolvy-techfest/register.html`
2. Isi formulir pendaftaran:
   - **Email**: contoh `dimas@kampus.ac.id`
   - **Username**: contoh `dimas_campus`
   - **Nama Lengkap**: `Dimas Pratama`
   - **Password**: `password123`
   - **Konfirmasi Password**: `password123`
3. Klik tombol **"Daftar Akun Sekarang ⚡"**.
4. Pendaftaran berhasil! Akun otomatis tersimpan di tabel `users` MySQL Laragon dan Anda langsung diarahkan ke beranda toko.

### 2. Login Customer
1. Buka halaman login: `http://localhost/wolvy-techfest/login.html`
2. Pastikan tab **"🛍️ Customer"** aktif.
3. Masukkan Username atau Email: `dimas_campus` (atau `aulia`)
4. Masukkan Password: `password123`
5. Klik **"Masuk Sebagai Customer ⚡"** &rarr; berhasil masuk ke toko!

### 3. Login Administrator
1. Buka halaman login: `http://localhost/wolvy-techfest/login.html`
2. Klik tab **"🛡️ Admin Toko"**.
3. Masukkan kredensial Admin bawaan:
   - **Username / Email**: `admin` atau `admin@wolvy.store`
   - **Password**: `password123`
4. Klik **"Masuk Dashboard Admin 🛡️"** &rarr; Anda akan diarahkan ke Dashboard Manajemen Toko di `admin.html`!

### 4. Uji Keamanan Hak Akses (Security Guard)
- **Tes Penolakan**: Coba login di tab **"Admin Toko"** menggunakan akun customer biasa (`dimas_campus` / `aulia`). Sistem akan menolak dengan notifikasi:  
  *`"Akses ditolak! Akun Anda bukan akun Administrator."`*
- **Tes URL Protection**: Coba buka langsung `http://localhost/wolvy-techfest/admin.html` tanpa login admin. Halaman akan otomatis mengunci dan mengarahkan kembali ke `login.html?role=admin`.

---

## ⚡ Fitur Dual-Mode (Offline Fallback)
Client otentikasi [auth-client.js](auth-client.js) dirancang sangat tangguh:
- Saat dibuka melalui server Laragon (`http://...`), sistem otomatis berinteraksi dengan **MySQL & PHP Backend**.
- Jika sewaktu-waktu web dibuka secara statis (`file:///`) atau server Laragon sedang mati, sistem otomatis beralih ke **Local Storage Mode** dengan akun yang sama (`admin` & `aulia`), sehingga web **tidak akan pernah error blank** saat dipresentasikan di hadapan juri kompetisi!

---

*WOLVY Campus Streetwear — Ready for Web Development Competition 2026*

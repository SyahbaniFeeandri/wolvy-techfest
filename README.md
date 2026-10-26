# 🐺 WOLVY — Campus Streetwear E-Commerce & Virtual Try-On

> **"More Than Merchandise, It's Your Campus Story."**  
> *Full-Stack Web Development Competition Project*

---

## 📌 Ringkasan Proyek

**WOLVY** adalah platform e-commerce merchandise kampus generasi baru yang memadukan kebanggaan almamater, estetika streetwear kontemporer, personalisasi produk interaktif, dan teknologi **Virtual Try-On berbasis Computer Vision**. 

Website ini dirancang khusus untuk mahasiswa dan komunitas kampus dengan alur belanja lengkap, validasi stok otomatis, simulasi pembayaran modern (QRIS & Virtual Account), pelacakan pengiriman kampus, serta dashboard manajemen terpisah untuk Administrator Toko.

---

## 🌐 Tautan Demo & Akses

| Komponen | Tautan Akses | Keterangan |
|---|---|---|
| **Akses Lokal** | `http://localhost:8080/index.html` | Server lokal port 8080 |
| **Port Forwarding (Publik)** | `https://tiny-dodos-start.loca.lt` | Tunnel publik (*Password IP: `182.253.135.99`*) |
| **Repositori GitHub** | `https://github.com/SyahbaniFeeandri/wolvy-techfest` | Repositori kode sumber resmi |

### 🔑 Akun Demo Pengujian (1-Klik di [login.html](login.html) & Header)

- **Mode Mahasiswa (Pelanggan Terdaftar)**
  - Email: `aulia.rahma@kampus.ac.id` / `mahasiswa.demo@kampus.ac.id`
  - Akses: Katalog, Virtual Try-On, Custom Merch Studio, Keranjang, Checkout, Pesanan Saya, Wishlist, dan Forum Komunitas.
- **Mode Administrator Toko (WOLVY Admin)**
  - Akses: [admin.html](admin.html)
  - Fitur: Kelola stok produk (`+5`, `-1`, custom), tambah merchandise baru, update status pesanan (`DIPROSES` ➔ `DIKIRIM` ➔ `SELESAI`), dan tombol reset database demo.

---

## 📋 Matriks Kebutuhan Fungsional (PRD FR-01 s/d FR-16)

| ID PRD | Modul / Fitur | Status | File Implementasi | Deskripsi & Bukti Fungsi |
|---|---|:---:|---|---|
| **FR-01** | **Home** | ✅ Selesai | [index.html](index.html) | Hero banner serigala, kategori pods, best seller, countdown campus drop, banner gaya hidup, dan customizer kaos. |
| **FR-02** | **Katalog Produk** | ✅ Selesai | [shop.html](shop.html) | Filter kategori radio, rentang harga, ukuran, warna, sorting (terpopuler/harga/rating), dan pencarian instan. |
| **FR-03** | **Detail Produk** | ✅ Selesai | [product-detail.html](product-detail.html) | Galeri foto dinamis, live Try-On shortcut, pilihan warna & ukuran, custom bordir nama & tahun, checklist bahan, ulasan mahasiswa. |
| **FR-04** | **Autentikasi** | ✅ Selesai | [login.html](login.html), [register.html](register.html) | Register mahasiswa ber-NIM, login email kampus, serta 1-klik akun demo untuk juri lomba. |
| **FR-05** | **Keranjang Belanja** | ✅ Selesai | [cart.html](cart.html) | Penyesuaian kuantitas kupon diskon mahasiswa (`WOLVYMABA`), kalkulasi otomatis subtotal & total, serta laci keranjang melayang (drawer). |
| **FR-06** | **Checkout** | ✅ Selesai | [checkout.html](checkout.html) | Form data pemesan, opsi **Pickup Kampus Gratis** vs kirim kos, validasi stok di backend/store. |
| **FR-07** | **Simulasi Pembayaran** | ✅ Selesai | [checkout.html](checkout.html) | Simulasi pembayaran QRIS dengan barcode interaktif dan BCA Virtual Account dengan verifikasi sukses instan. |
| **FR-08** | **Pesanan Saya** | ✅ Selesai | [orders.html](orders.html) | Riwayat belanja tersaring status (`DIPROSES`, `DIKIRIM`, `SELESAI`), detail item, dan modal pelacakan logistik kampus. |
| **FR-09** | **Admin Produk** | ✅ Selesai | [admin.html](admin.html) | Manajemen katalog, form penambahan produk baru, dan opsi hapus produk. |
| **FR-10** | **Admin Stok** | ✅ Selesai | [admin.html](admin.html) | Penyesuaian stok real-time (`+5`, `-1`, input) dengan peringatan stok kritis (<25 pcs). |
| **FR-11** | **Admin Pesanan** | ✅ Selesai | [admin.html](admin.html) | Pengawasan seluruh pesanan mahasiswa dengan kontrol dropdown perubahan status pesanan. |
| **FR-12** | **Virtual Try-On (CV)** | ✅ Selesai | [tryon.html](tryon.html) | Deteksi pose kamera/foto, penempatan overlay pakaian transparan otomatis, selector outfit, dan kontrol viewport ponsel. |
| **FR-13** | **Wishlist Favorit** | ✅ Selesai | [wishlist.html](wishlist.html) | Tab kategori, penyimpanan item favorit mahasiswa, dan aksi langsung pindah ke keranjang. |
| **FR-14** | **Saved Look** | ✅ Selesai | [tryon.html](tryon.html), [orders.html](orders.html) | Penyimpanan tangkapan layar look pakaian ke profil mahasiswa dan galeri inspirasi gaya kampus. |
| **FR-15** | **Campus Community** | ✅ Selesai | [community.html](community.html) | Forum diskusi OOTD kampus, tombol like interaktif, pembuatan postingan baru, dan pendaftaran event kampus. |
| **FR-16** | **Design Battle** | ✅ Selesai | [community.html](community.html) | Voting mingguan karya desain mahasiswa dengan persentase bar dinamis dan penghitungan suara real-time. |

---

## 🎨 Desain Sistem & Identitas Brand

Identitas visual WOLVY mengadopsi palet warna dan tipografi streetwear sesuai acuan dokumen rancangan:

- **Dark Purple (Warna Utama):** `#130722` & `#25123F` (memberikan kesan misterius, premium, dan bold).
- **Soft Lavender (Sekunder):** `#CDB8F4` & `#FAF8FF` (kontras lembut untuk teks dan latar belakang kartu).
- **Neon Yellow (Aksen & CTA):** `#E8FF38` (energi streetwear yang mencolok untuk tombol aksi dan badge limited).
- **Tipografi Google Fonts:**
  - `Outfit` (Heading modern & tegas)
  - `Plus Jakarta Sans` (Body text ramah baca)
  - `Permanent Marker` (Aksen grafiti/doodle jalanan)
  - `Caveat` (Catatan tangan personal)

---

## 🛠️ Arsitektur Teknologi

```
wolvy-techfest/
├── index.html            # Homepage: Hero, Categories, Bestsellers, Drops, Customizer
├── shop.html             # Katalog Belanja dengan Filter & Sortir Komprehensif
├── product-detail.html   # Halaman Detail Produk & Live Custom Embroidery
├── tryon.html            # Halaman Virtual Try-On berbasis Computer Vision
├── cart.html             # Halaman Keranjang Belanja & Kupon Promo
├── checkout.html         # Form Pengiriman Kampus & Simulasi Pembayaran
├── orders.html           # Riwayat Pesanan Saya & Pelacakan Timeline
├── wishlist.html         # Daftar Wishlist Favorit Mahasiswa
├── community.html        # Campus Community Forum & Design Battle Voting
├── about.html            # Kisah Brand, Metrik Kampus, Nilai Inti & FAQ
├── admin.html            # Dashboard Admin: Inventori Stok & Status Order
├── login.html            # Autentikasi Masuk & Quick Switch Akun Demo
├── register.html         # Form Pendaftaran Akun Mahasiswa Baru
├── store.js              # State Manager & Database Engine Terpusat (localStorage)
├── script.js             # Interaksi UI, Kamera, Toast, Modal, & Custom Studio
├── style.css             # Sistem Desain Lengkap & Responsif (CSS3 Native)
└── assets/               # Aset Gambar, Logo Vektor, Mockup Transparan & Maskot
```

---

## 🚀 Panduan Menjalankan Secara Lokal

1. **Clone Repositori:**
   ```bash
   git clone https://github.com/SyahbaniFeeandri/wolvy-techfest.git
   cd wolvy-techfest
   ```

2. **Jalankan Web Server Lokal (Port 8080):**
   ```bash
   # Menggunakan Node.js npx:
   npx serve -l 8080 .

   # Atau menggunakan Python 3:
   python -m http.server 8080
   ```

3. **Buka di Browser:**
   Buka browser dan navigasikan ke `http://localhost:8080/index.html`.

---

## 👥 Tim Pengembang

Dikembangkan dengan bangga untuk kompetisi web development:
- **Project:** WOLVY Campus Streetwear
- **Corpus:** `SyahbaniFeeandri/wolvy-techfest`
- **Tahun:** 2026

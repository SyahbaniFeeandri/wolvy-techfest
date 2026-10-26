# PRD WOLVY

Product Requirements Document · Full-Stack Web Development Competition · Versi 1.0

PRD ini disusun berdasarkan dokumen “WOLVY Rancangan Website dan Penjelasan Lengkap Program” serta delapan jawaban yang kamu berikan. Ruang lingkupnya disesuaikan untuk tim beranggotakan 3 sampai 4 orang dengan waktu pengerjaan kurang dari satu minggu.

## 1. Ringkasan produk

[Rashninja Snarling Wolf AOP Hoodie | Wolf Hoodies For Men | Hoodie Bjj](https://images.openai.com/static-rsc-4/7LaLh6r2zBwPv2Q8elYa72HWKGlRW7NSC0OYUuFsyO2fczRbpM0CE5YzcLNO_dbVEbkV154CESU0ccyhHpIK5eIpexCR9NviWpt-2Sh3Cjx1s2AlI2LHH22u4tdLhG9UM_GJhC2L5EM0bUdUVDVy9WpcD1_8NhwT1KyOSWkVmCA?purpose=inline)

## WOLVY

Campus streetwear e-commerce

WOLVY adalah platform e-commerce merchandise kampus yang menggabungkan pembelian produk, Virtual Try-On berbasis Computer Vision, dan personalisasi desain merchandise.

“More Than Merchandise, It’s Your Campus Story.”

WOLVY menargetkan mahasiswa dan komunitas kampus. Website harus memungkinkan pengguna menjelajahi katalog, mencoba tampilan merchandise secara virtual, membeli produk, dan melihat status pesanan. Admin mengelola produk, varian, stok, dan pesanan.

Fokus utama lomba adalah menghadirkan aplikasi yang bisa diakses secara online, memiliki backend dan database nyata, serta mendemonstrasikan alur belanja dan Virtual Try-On yang berfungsi.

## 2. Tujuan dan indikator keberhasilan

| Tujuan                                | Indikator keberhasilan                                                              |
| ------------------------------------- | ----------------------------------------------------------------------------------- |
| Menyediakan e-commerce yang berfungsi | Pengguna dapat memilih produk, memasukkan keranjang, checkout, dan membuat pesanan. |
| Menonjolkan inovasi                   | Virtual Try-On dapat digunakan saat demo.                                           |
| Membuktikan kemampuan full-stack      | Frontend terhubung dengan API dan PostgreSQL.                                       |
| Mendukung operasional toko            | Admin dapat mengelola produk, stok, dan pesanan.                                    |
| Memperkuat identitas brand            | UI konsisten menggunakan ungu gelap, lavender, kuning neon, dan maskot serigala.    |
| Siap dinilai juri                     | Website online, akun demo tersedia, repositori GitHub dan README siap.              |
| Memenuhi batas biaya                  | Menggunakan layanan gratis dan library open-source tanpa API AI berbayar.           |

Target angka seperti jumlah pengguna, konversi penjualan, atau waktu respons belum ditetapkan karena project ini berorientasi pada demonstrasi lomba, bukan operasional komersial yang sudah berjalan.

## 3. Target pengguna dan peran sistem

Pengunjung dan mahasiswa

Melihat katalog, mencari produk, mencoba Virtual Try-On, dan melihat detail merchandise. Pengguna harus login untuk menyimpan keranjang ke akun, checkout, dan melihat riwayat pesanan.

Pelanggan terdaftar

Mengelola profil, wishlist, keranjang, alamat, pesanan, serta menyimpan hasil Virtual Try-On jika fitur penyimpanan sudah diimplementasikan.

Admin

Mengelola katalog, kategori, varian, stok, pesanan, dan status pesanan. Admin memiliki akses terpisah dari pelanggan.

## 4. Ruang lingkup produk

Prioritas dibagi menjadi tiga tingkat agar tim dapat menentukan apa yang wajib selesai sebelum lomba.

P0

### MVP wajib

Fitur yang harus berfungsi untuk demo dan memenuhi kriteria utama lomba.

- Website responsif dengan identitas visual WOLVY.
- Katalog, pencarian sederhana, kategori, dan detail produk.
- Login dan register.
- Keranjang, checkout, simulasi pembayaran, serta pembuatan pesanan.
- Validasi stok dan pengurangan stok saat transaksi berhasil.
- Dashboard admin untuk produk, varian, stok, dan pesanan.
- Virtual Try-On berbasis pose dengan aset merchandise transparan.
- PostgreSQL sebagai penyimpanan data utama.
- Website online, akun demo, GitHub, dan README.

P1

### Opsional

Dikerjakan setelah seluruh alur P0 stabil.

- Wishlist.
- Filter harga dan ukuran yang lebih lengkap.
- Riwayat pesanan dengan detail status.
- Pengubahan desain merchandise sederhana.
- Simpan atau unduh hasil Virtual Try-On.
- Size chart, rekomendasi produk, dan notifikasi status pesanan.

P2

### Pengembangan lanjutan

Tidak menjadi syarat rilis lomba dalam waktu kurang dari satu minggu.

- AI Virtual Try-On yang menghasilkan gambar pakaian realistis.
- Community Feed, komentar, forum, dan Design Battle dengan voting.
- Group Order untuk organisasi kampus.
- Payment gateway sandbox atau pembayaran nyata.
- Moderasi komunitas, notifikasi real-time, dan analitik penjualan.
- Sistem custom merchandise dengan editor desain lengkap.

Pembatasan ini mengikuti struktur fitur dalam dokumen rancangan WOLVY, dengan penyesuaian berdasarkan deadline.&#x20;

WOLVY_Rancangan_Website_dan_Penjelasan_Lengkap_Program_dengan_Gambar.docx



## 5. Kebutuhan fungsional

Setiap kebutuhan di bawah memiliki ID supaya bisa dijadikan acuan saat coding dan pengujian.

| ID    | Kebutuhan           | Prioritas | Kriteria penerimaan                                                                          |
| ----- | ------------------- | --------- | -------------------------------------------------------------------------------------------- |
| FR-01 | Home                | P0        | Hero, kategori, produk unggulan, dan navigasi tampil dengan benar.                           |
| FR-02 | Katalog             | P0        | Pengguna dapat melihat produk aktif beserta harga dan foto.                                  |
| FR-03 | Detail produk       | P0        | Produk menampilkan deskripsi, varian, harga, dan stok.                                       |
| FR-04 | Autentikasi         | P0        | Pengguna dapat register, login, dan logout.                                                  |
| FR-05 | Keranjang           | P0        | Pengguna dapat menambah, mengubah jumlah, dan menghapus item.                                |
| FR-06 | Checkout            | P0        | Sistem memvalidasi varian dan stok, lalu menghitung total di backend.                        |
| FR-07 | Simulasi pembayaran | P0        | Pengguna dapat menyelesaikan pembayaran demo dan menerima status transaksi yang sesuai.      |
| FR-08 | Pesanan             | P0        | Pesanan tersimpan di database dan bisa dilihat pemiliknya.                                   |
| FR-09 | Admin produk        | P0        | Admin dapat membuat, mengubah, dan menonaktifkan produk.                                     |
| FR-10 | Admin stok          | P0        | Admin dapat mengubah stok varian.                                                            |
| FR-11 | Admin pesanan       | P0        | Admin dapat melihat pesanan dan memperbarui statusnya.                                       |
| FR-12 | Virtual Try-On      | P0        | Kamera atau unggah foto berfungsi, pose dideteksi, dan aset merchandise muncul pada preview. |
| FR-13 | Wishlist            | P1        | Pengguna dapat menyimpan dan menghapus produk favorit.                                       |
| FR-14 | Saved Look          | P1        | Pengguna dapat menyimpan hasil Try-On jika penyimpanan aset sudah siap.                      |
| FR-15 | Community           | P2        | Pengguna dapat membuat postingan dan berinteraksi dengan konten.                             |
| FR-16 | Design Battle       | P2        | Pengguna dapat mengirim desain dan memberikan suara sesuai aturan.                           |

### Aturan bisnis penting

1. Harga dan total pembayaran harus dihitung oleh backend, bukan dipercaya dari browser.
2. Backend memeriksa stok saat checkout untuk mengurangi risiko overselling.
3. Stok berkurang sesuai aturan transaksi setelah simulasi pembayaran berhasil. Pembatalan atau kegagalan harus ditangani secara konsisten.
4. Pengguna hanya boleh melihat pesanan miliknya sendiri.
5. Hanya admin yang dapat mengubah katalog, stok, dan status pesanan melalui dashboard.
6. Pembayaran simulasi harus diberi label jelas sebagai transaksi demo. Sistem tidak boleh mengklaim menerima uang sungguhan.
7. Sistem mencatat status pesanan secara konsisten, misalnya `PENDING`, `PAID`, `PROCESSING`, `COMPLETED`, dan `CANCELLED`.

## 6. Spesifikasi Virtual Try-On

Virtual Try-On merupakan fitur pembeda utama WOLVY. Karena deadline kurang dari satu minggu dan layanan AI berbayar tidak diperbolehkan, pendekatan yang disarankan adalah pemrosesan di browser menggunakan library Computer Vision open-source.

[PoseNet with React. PoseNet is a  machine learning model in… | by Namratha PM | Medium](https://images.openai.com/static-rsc-4/EvrdjgI9yNWm1e8mbArmXHfuLVGImSpEYJEFtBj5VcOk6Us40mb9UAkvQjdYQSTnHCnoL9qdh0GTCdi6HRVJ636ajNg3b7iGjzDF-bLY6xbp11t4wzFVbAPDaCdYr2pYYfzCI6DsnM5YdNUpSZqTu8W7AANN2X-l0xvGEPeqKe4?purpose=inline)

Alur penggunaan

1. Pengguna membuka Try-On.
2. Pengguna mengaktifkan kamera atau mengunggah foto.
3. Sistem mendeteksi titik tubuh atau pose.
4. Pengguna memilih hoodie, T-shirt, atau merchandise lain.
5. Sistem menempatkan aset merchandise pada area tubuh.
6. Pengguna dapat mengganti produk, warna, atau foto.
7. Pengguna melanjutkan ke detail produk atau keranjang.

### Implementasi yang realistis

- Gunakan MediaPipe Pose atau solusi pose estimation open-source yang sesuai dengan kebutuhan browser.
- Gunakan Canvas API untuk menggambar aset merchandise transparan.
- Gunakan aset PNG dengan latar transparan dan ukuran yang telah disesuaikan.
- Proses foto di perangkat pengguna jika memungkinkan.
- Minta izin kamera dan sediakan unggah foto sebagai alternatif.
- Sediakan tombol reset dan pesan kesalahan jika kamera atau deteksi pose gagal.

Batasan yang perlu diterima: deteksi pose membantu penempatan gambar, tetapi tidak otomatis membuat pakaian mengikuti bentuk tubuh, lipatan kain, atau perspektif secara realistis. Hasil MVP harus disebut simulasi visual. AI Virtual Try-On yang menghasilkan pakaian realistis tetap menjadi P2.

Kriteria penerimaan:

- Pengguna dapat membuka kamera atau mengunggah gambar.
- Sistem menampilkan preview dan setidaknya satu aset merchandise.
- Pengguna dapat mengganti produk dan mengatur ulang preview.
- Penolakan izin kamera tidak membuat halaman rusak.
- Pengguna dapat melanjutkan ke produk yang dipilih.

## 7. Rancangan UI/UX

Identitas visual harus konsisten dengan rancangan awal WOLVY.

Dark Purple

Warna utama

\#25123F

Lavender

Warna pendukung

\#CDB8F4

Neon Yellow

Aksen dan CTA

\#E8FF38

Kode warna di atas adalah rekomendasi awal untuk design system, bukan kode warna pasti dari dokumen sumber. Tim boleh menyesuaikannya saat membuat desain final.

### Struktur halaman MVP

| Halaman         | Komponen utama                                                                    |
| --------------- | --------------------------------------------------------------------------------- |
| Home            | Navbar, hero banner, kategori, produk unggulan, banner Virtual Try-On, footer.    |
| Shop            | Search, kategori, kartu produk, harga, stok, filter dasar.                        |
| Product Detail  | Galeri, deskripsi, pilihan warna dan ukuran, stok, tombol Try-On dan Add to Cart. |
| Virtual Try-On  | Kamera atau unggah foto, preview, pemilihan produk, reset, tombol beli.           |
| Login/Register  | Form autentikasi dan validasi.                                                    |
| Cart            | Item, jumlah, subtotal, hapus item, tombol checkout.                              |
| Checkout        | Ringkasan pesanan, alamat, metode simulasi pembayaran, total.                     |
| My Orders       | Nomor pesanan, tanggal, total, status.                                            |
| Admin Dashboard | Ringkasan, produk, varian, stok, daftar pesanan, perubahan status.                |

### Prinsip desain

- Utamakan tampilan mobile dan desktop yang responsif.
- Gunakan maskot serigala sebagai identitas brand, bukan dekorasi berlebihan.
- Buat tombol utama mudah dikenali.
- Tampilkan stok dan harga dengan jelas.
- Sediakan loading state, empty state, dan pesan kesalahan.
- Jangan mengorbankan keterbacaan teks demi warna neon.

## 8. Rekomendasi arsitektur teknis

Stack berikut adalah rekomendasi implementasi berdasarkan pilihan teknologi yang sudah kamu berikan.

Frontend: Next.js + TypeScript

Halaman publik, Shop, Try-On, akun, checkout, dashboard

Backend: Next.js Route Handlers

Autentikasi, validasi, aturan bisnis, stok, transaksi, hak akses

PostgreSQL

Akun, produk, varian, keranjang, pesanan, pembayaran

Computer Vision di browser

Pose estimation dan Canvas API untuk Virtual Try-On

### Pilihan teknologi

| Komponen        | Rekomendasi                                                     | Alasan                                                          |
| --------------- | --------------------------------------------------------------- | --------------------------------------------------------------- |
| Frontend        | Next.js App Router                                              | Satu proyek untuk halaman dan API.                              |
| Bahasa          | TypeScript                                                      | Membantu mengurangi kesalahan tipe data.                        |
| Styling         | Tailwind CSS                                                    | Mempercepat implementasi desain responsif.                      |
| Backend         | Next.js Route Handlers                                          | Memisahkan endpoint API dari UI.                                |
| Database        | PostgreSQL                                                      | Mendukung relasi dan transaksi.                                 |
| Akses database  | Prisma ORM                                                      | Memudahkan skema dan query database.                            |
| Autentikasi     | Auth.js atau solusi autentikasi yang kompatibel                 | Mengelola sesi dan identitas pengguna.                          |
| Virtual Try-On  | MediaPipe Pose dan Canvas API                                   | Memungkinkan deteksi pose serta komposisi gambar di browser.    |
| Version control | Git dan GitHub                                                  | Kolaborasi dan pengelolaan perubahan kode.                      |
| Hosting         | Vercel untuk aplikasi, layanan PostgreSQL gratis untuk database | Target deployment tanpa biaya awal jika kuota gratis mencukupi. |

Agar tidak membuang waktu, pilih satu solusi autentikasi dan jangan membangun sistem autentikasi sendiri dari nol jika tim belum berpengalaman. Jangan menyimpan password dalam bentuk teks biasa.

### Strategi hosting gratis

Targetnya adalah website online yang bisa diakses juri, bukan hanya berjalan di komputer pengembang.

1. Kembangkan aplikasi secara lokal.
2. Simpan kode pada repositori GitHub.
3. Deploy Next.js ke Vercel pada paket gratis yang tersedia.
4. Gunakan layanan PostgreSQL terkelola yang menyediakan paket gratis, misalnya Supabase, jika kuota dan ketentuannya cocok.
5. Atur environment variables pada platform hosting.
6. Jalankan migrasi database dan isi data produk demo.
7. Uji seluruh alur melalui URL publik.

Perlu diingat bahwa paket gratis memiliki batas penggunaan dan ketentuan yang dapat berubah. Verifikasi kuota, kebijakan tidur otomatis, dan koneksi database sebelum menentukan platform final. Jangan menaruh kredensial database atau secret API di repositori publik.

## 9. Rancangan database

Skema berikut merupakan rancangan awal yang disederhanakan untuk MVP. Dokumen WOLVY mencantumkan tabel yang lebih lengkap, termasuk saved looks, konten komunitas, event, dan notifikasi. Tabel lanjutan tersebut tidak perlu dibuat jika fiturnya belum masuk scope.&#x20;

WOLVY_Rancangan_Website_dan_Penjelasan_Lengkap_Program_dengan_Gambar.docx



| Tabel              | Kolom penting                                                | Fungsi                         |
| ------------------ | ------------------------------------------------------------ | ------------------------------ |
| `users`            | `id`, `name`, `email`, `password_hash`, `role`               | Akun pelanggan dan admin.      |
| `categories`       | `id`, `name`, `slug`                                         | Kategori merchandise.          |
| `products`         | `id`, `category_id`, `name`, `description`, `status`         | Informasi produk.              |
| `product_variants` | `id`, `product_id`, `sku`, `color`, `size`, `price`, `stock` | Harga dan stok setiap varian.  |
| `product_images`   | `id`, `product_id`, `image_url`, `image_type`                | Foto produk dan aset Try-On.   |
| `addresses`        | `id`, `user_id`, `recipient`, `address_text`                 | Alamat pengiriman.             |
| `carts`            | `id`, `user_id`                                              | Keranjang milik pengguna.      |
| `cart_items`       | `id`, `cart_id`, `variant_id`, `quantity`                    | Item dalam keranjang.          |
| `orders`           | `id`, `user_id`, `address_id`, `total`, `status`             | Informasi pesanan.             |
| `order_items`      | `id`, `order_id`, `variant_id`, `quantity`, `unit_price`     | Rincian barang saat transaksi. |
| `payments`         | `id`, `order_id`, `method`, `status`, `reference`            | Catatan simulasi pembayaran.   |
| `wishlist_items`   | `id`, `user_id`, `product_id`                                | Wishlist opsional.             |

Relasi utama:

- Satu kategori dapat memiliki banyak produk.
- Satu produk dapat memiliki banyak varian dan gambar.
- Satu pengguna dapat memiliki satu keranjang aktif dan banyak pesanan.
- Satu pesanan dapat memiliki banyak `order_items`.
- Satu pesanan dapat memiliki catatan pembayaran.
- Satu varian dapat digunakan dalam banyak rincian pesanan, sehingga harga transaksi harus disimpan dalam `order_items`.

Gunakan foreign key, indeks untuk kolom pencarian penting, serta constraint untuk mencegah data yang tidak valid. Saat checkout, proses pembuatan pesanan dan pengurangan stok harus berjalan secara transaksional agar stok tidak berkurang dua kali atau menjadi negatif.

## 10. Rancangan API

Endpoint ini merupakan usulan untuk menghubungkan frontend dengan backend. Nama dan format respons bisa disesuaikan saat implementasi.

| Method | Endpoint                   | Fungsi                                |
| ------ | -------------------------- | ------------------------------------- |
| GET    | `/api/products`            | Mengambil katalog produk.             |
| GET    | `/api/products/[id]`       | Mengambil detail produk.              |
| POST   | `/api/auth/register`       | Mendaftarkan akun.                    |
| POST   | `/api/cart/items`          | Menambahkan item ke keranjang.        |
| GET    | `/api/cart`                | Mengambil isi keranjang.              |
| PATCH  | `/api/cart/items/[id]`     | Mengubah jumlah item.                 |
| DELETE | `/api/cart/items/[id]`     | Menghapus item.                       |
| POST   | `/api/checkout`            | Memvalidasi stok dan membuat pesanan. |
| POST   | `/api/payments/simulate`   | Menjalankan simulasi pembayaran.      |
| GET    | `/api/orders`              | Mengambil pesanan milik pengguna.     |
| GET    | `/api/admin/products`      | Mengambil data produk untuk admin.    |
| POST   | `/api/admin/products`      | Membuat produk.                       |
| PATCH  | `/api/admin/products/[id]` | Mengubah data produk.                 |
| PATCH  | `/api/admin/orders/[id]`   | Memperbarui status pesanan.           |

Semua endpoint admin harus memverifikasi autentikasi dan role admin di server. Menyembunyikan tombol admin di frontend saja tidak cukup untuk melindungi data.

Untuk menghemat waktu, tim tidak harus membuat endpoint terpisah untuk setiap operasi jika struktur aplikasinya bisa dibuat lebih sederhana. Namun, validasi dan batas akses tetap wajib.

## 11. User flow utama

### A. Alur pembelian

\#chatgpt-mermaid-\_r_15e\_{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;fill:rgb(237, 237, 237);}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#chatgpt-mermaid-\_r_15e\_ .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_15e\_ .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_15e\_ .error-icon{fill:rgb(48, 48, 48);}#chatgpt-mermaid-\_r_15e\_ .error-text{fill:rgb(237, 237, 237);stroke:rgb(237, 237, 237);}#chatgpt-mermaid-\_r_15e\_ .edge-thickness-normal{stroke-width:1px;}#chatgpt-mermaid-\_r_15e\_ .edge-thickness-thick{stroke-width:3.5px;}#chatgpt-mermaid-\_r_15e\_ .edge-pattern-solid{stroke-dasharray:0;}#chatgpt-mermaid-\_r_15e\_ .edge-thickness-invisible{stroke-width:0;fill:none;}#chatgpt-mermaid-\_r_15e\_ .edge-pattern-dashed{stroke-dasharray:3;}#chatgpt-mermaid-\_r_15e\_ .edge-pattern-dotted{stroke-dasharray:2;}#chatgpt-mermaid-\_r_15e\_ .marker{fill:rgb(175, 175, 175);stroke:rgb(175, 175, 175);}#chatgpt-mermaid-\_r_15e\_ .marker.cross{stroke:rgb(175, 175, 175);}#chatgpt-mermaid-\_r_15e\_ svg{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;}#chatgpt-mermaid-\_r_15e\_ p{margin:0;}#chatgpt-mermaid-\_r_15e\_ .label{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";color:rgb(237, 237, 237);}#chatgpt-mermaid-\_r_15e\_ .cluster-label text{fill:rgb(237, 237, 237);}#chatgpt-mermaid-\_r_15e\_ .cluster-label span{color:rgb(237, 237, 237);}#chatgpt-mermaid-\_r_15e\_ .cluster-label span p{background-color:transparent;}#chatgpt-mermaid-\_r_15e\_ .label text,#chatgpt-mermaid-\_r_15e\_ span{fill:rgb(237, 237, 237);color:rgb(237, 237, 237);}#chatgpt-mermaid-\_r_15e\_ .node rect,#chatgpt-mermaid-\_r_15e\_ .node circle,#chatgpt-mermaid-\_r_15e\_ .node ellipse,#chatgpt-mermaid-\_r_15e\_ .node polygon,#chatgpt-mermaid-\_r_15e\_ .node path{fill:rgb(9, 23, 44);stroke:rgb(31, 78, 148);stroke-width:1px;}#chatgpt-mermaid-\_r_15e\_ .rough-node .label text,#chatgpt-mermaid-\_r_15e\_ .node .label text,#chatgpt-mermaid-\_r_15e\_ .image-shape .label,#chatgpt-mermaid-\_r_15e\_ .icon-shape .label{text-anchor:middle;}#chatgpt-mermaid-\_r_15e\_ .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#chatgpt-mermaid-\_r_15e\_ .rough-node .label,#chatgpt-mermaid-\_r_15e\_ .node .label,#chatgpt-mermaid-\_r_15e\_ .image-shape .label,#chatgpt-mermaid-\_r_15e\_ .icon-shape .label{text-align:center;}#chatgpt-mermaid-\_r_15e\_ .node.clickable{cursor:pointer;}#chatgpt-mermaid-\_r_15e\_ .root .anchor path{fill:rgb(175, 175, 175)!important;stroke-width:0;stroke:rgb(175, 175, 175);}#chatgpt-mermaid-\_r_15e\_ .arrowheadPath{fill:rgb(175, 175, 175);}#chatgpt-mermaid-\_r_15e\_ .edgePath .path{stroke:rgb(175, 175, 175);stroke-width:1px;}#chatgpt-mermaid-\_r_15e\_ .flowchart-link{stroke:rgb(175, 175, 175);fill:none;}#chatgpt-mermaid-\_r_15e\_ .edgeLabel{background-color:rgb(0, 0, 0);text-align:center;}#chatgpt-mermaid-\_r_15e\_ .edgeLabel p{background-color:rgb(0, 0, 0);}#chatgpt-mermaid-\_r_15e\_ .edgeLabel rect{opacity:0.5;background-color:rgb(0, 0, 0);fill:rgb(0, 0, 0);}#chatgpt-mermaid-\_r_15e\_ .labelBkg{background-color:rgba(0, 0, 0, 0.5);}#chatgpt-mermaid-\_r_15e\_ .cluster rect{fill:rgb(48, 48, 48);stroke:rgba(255, 255, 255, 0.15);stroke-width:1px;}#chatgpt-mermaid-\_r_15e\_ .cluster text{fill:rgb(237, 237, 237);}#chatgpt-mermaid-\_r_15e\_ .cluster span{color:rgb(237, 237, 237);}#chatgpt-mermaid-\_r_15e\_ div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:12px;background:rgb(48, 48, 48);border:1px solid rgba(255, 255, 255, 0.15);border-radius:2px;pointer-events:none;z-index:100;}#chatgpt-mermaid-\_r_15e\_ .flowchartTitleText{text-anchor:middle;font-size:18px;fill:rgb(237, 237, 237);}#chatgpt-mermaid-\_r_15e\_ rect.text{fill:none;stroke-width:0;}#chatgpt-mermaid-\_r_15e\_ .icon-shape,#chatgpt-mermaid-\_r_15e\_ .image-shape{background-color:rgb(0, 0, 0);text-align:center;}#chatgpt-mermaid-\_r_15e\_ .icon-shape p,#chatgpt-mermaid-\_r_15e\_ .image-shape p{background-color:rgb(0, 0, 0);padding:2px;}#chatgpt-mermaid-\_r_15e\_ .icon-shape .label rect,#chatgpt-mermaid-\_r_15e\_ .image-shape .label rect{opacity:0.5;background-color:rgb(0, 0, 0);fill:rgb(0, 0, 0);}#chatgpt-mermaid-\_r_15e\_ .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#chatgpt-mermaid-\_r_15e\_ .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#chatgpt-mermaid-\_r_15e\_ .node .neo-node{stroke:rgb(31, 78, 148);}#chatgpt-mermaid-\_r_15e\_ [data-look="neo"].node rect,#chatgpt-mermaid-\_r_15e\_ [data-look="neo"].cluster rect,#chatgpt-mermaid-\_r_15e\_ [data-look="neo"].node polygon{stroke:url(#chatgpt-mermaid-\_r_15e\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_15e\_ [data-look="neo"].swimlane.cluster rect{filter:none;}#chatgpt-mermaid-\_r_15e\_ [data-look="neo"].node path{stroke:url(#chatgpt-mermaid-\_r_15e\_-gradient);stroke-width:1px;}#chatgpt-mermaid-\_r_15e\_ [data-look="neo"].node .outer-path{filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_15e\_ [data-look="neo"].node .neo-line path{stroke:rgb(31, 78, 148);filter:none;}#chatgpt-mermaid-\_r_15e\_ [data-look="neo"].node circle{stroke:url(#chatgpt-mermaid-\_r_15e\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_15e\_ [data-look="neo"].node circle .state-start{fill:#000000;}#chatgpt-mermaid-\_r_15e\_ [data-look="neo"].icon-shape .icon{fill:url(#chatgpt-mermaid-\_r_15e\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_15e\_ [data-look="neo"].icon-shape .icon-neo path{stroke:url(#chatgpt-mermaid-\_r_15e\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_15e\_ .node text{font-size:14px;font-weight:600;letter-spacing:normal;fill:rgb(153, 206, 255);}#chatgpt-mermaid-\_r_15e\_ .edgeLabels text{font-size:13px;font-weight:600;letter-spacing:-0.08px;fill:rgb(153, 206, 255);}#chatgpt-mermaid-\_r_15e\_ .node tspan[font-weight="normal"],#chatgpt-mermaid-\_r_15e\_ .edgeLabels tspan[font-weight="normal"]{font-weight:600;}#chatgpt-mermaid-\_r_15e\_ .edgeLabel .label rect{opacity:1;rx:13px;ry:13px;fill:rgb(0, 14, 26);stroke:rgb(26, 62, 95);stroke-width:1px;}#chatgpt-mermaid-\_r_15e\_ .node rect,#chatgpt-mermaid-\_r_15e\_ .node circle,#chatgpt-mermaid-\_r_15e\_ .node ellipse,#chatgpt-mermaid-\_r_15e\_ .node polygon,#chatgpt-mermaid-\_r_15e\_ .node path{fill:rgb(0, 40, 77);stroke:rgba(255, 255, 255, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_15e\_ .node rect{rx:16px;ry:16px;}#chatgpt-mermaid-\_r_15e\_ .node.mermaid-decision .label-container{fill:rgb(0, 14, 26);stroke:rgb(26, 62, 95);stroke-dasharray:2,2;}#chatgpt-mermaid-\_r_15e\_ .edgePaths .flowchart-link{stroke:rgb(175, 175, 175);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;}#chatgpt-mermaid-\_r_15e\_ .marker{fill:rgb(175, 175, 175);stroke:rgb(175, 175, 175);}#chatgpt-mermaid-\_r_15e\_ :root{--mermaid-font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";}HomeShopDetail ProdukPilih Varian dan JumlahAdd to CartSudah Login?LoginCheckoutValidasi Stok dan TotalStok Tersedia?Tampilkan PesanBuat PesananSimulasi PembayaranPembayaran Berhasil?Perbarui Status dan StokPesanan MenungguPembayaranMy OrdersBelumSudahTidakYaYaTidak

Alur tersebut menggambarkan perilaku yang diharapkan. Detail status dan pengurangan stok harus mengikuti satu aturan yang konsisten di backend.

### B. Alur Virtual Try-On

\#chatgpt-mermaid-\_r_15n\_{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;fill:rgb(237, 237, 237);}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#chatgpt-mermaid-\_r_15n\_ .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_15n\_ .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_15n\_ .error-icon{fill:rgb(48, 48, 48);}#chatgpt-mermaid-\_r_15n\_ .error-text{fill:rgb(237, 237, 237);stroke:rgb(237, 237, 237);}#chatgpt-mermaid-\_r_15n\_ .edge-thickness-normal{stroke-width:1px;}#chatgpt-mermaid-\_r_15n\_ .edge-thickness-thick{stroke-width:3.5px;}#chatgpt-mermaid-\_r_15n\_ .edge-pattern-solid{stroke-dasharray:0;}#chatgpt-mermaid-\_r_15n\_ .edge-thickness-invisible{stroke-width:0;fill:none;}#chatgpt-mermaid-\_r_15n\_ .edge-pattern-dashed{stroke-dasharray:3;}#chatgpt-mermaid-\_r_15n\_ .edge-pattern-dotted{stroke-dasharray:2;}#chatgpt-mermaid-\_r_15n\_ .marker{fill:rgb(175, 175, 175);stroke:rgb(175, 175, 175);}#chatgpt-mermaid-\_r_15n\_ .marker.cross{stroke:rgb(175, 175, 175);}#chatgpt-mermaid-\_r_15n\_ svg{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;}#chatgpt-mermaid-\_r_15n\_ p{margin:0;}#chatgpt-mermaid-\_r_15n\_ .label{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";color:rgb(237, 237, 237);}#chatgpt-mermaid-\_r_15n\_ .cluster-label text{fill:rgb(237, 237, 237);}#chatgpt-mermaid-\_r_15n\_ .cluster-label span{color:rgb(237, 237, 237);}#chatgpt-mermaid-\_r_15n\_ .cluster-label span p{background-color:transparent;}#chatgpt-mermaid-\_r_15n\_ .label text,#chatgpt-mermaid-\_r_15n\_ span{fill:rgb(237, 237, 237);color:rgb(237, 237, 237);}#chatgpt-mermaid-\_r_15n\_ .node rect,#chatgpt-mermaid-\_r_15n\_ .node circle,#chatgpt-mermaid-\_r_15n\_ .node ellipse,#chatgpt-mermaid-\_r_15n\_ .node polygon,#chatgpt-mermaid-\_r_15n\_ .node path{fill:rgb(9, 23, 44);stroke:rgb(31, 78, 148);stroke-width:1px;}#chatgpt-mermaid-\_r_15n\_ .rough-node .label text,#chatgpt-mermaid-\_r_15n\_ .node .label text,#chatgpt-mermaid-\_r_15n\_ .image-shape .label,#chatgpt-mermaid-\_r_15n\_ .icon-shape .label{text-anchor:middle;}#chatgpt-mermaid-\_r_15n\_ .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#chatgpt-mermaid-\_r_15n\_ .rough-node .label,#chatgpt-mermaid-\_r_15n\_ .node .label,#chatgpt-mermaid-\_r_15n\_ .image-shape .label,#chatgpt-mermaid-\_r_15n\_ .icon-shape .label{text-align:center;}#chatgpt-mermaid-\_r_15n\_ .node.clickable{cursor:pointer;}#chatgpt-mermaid-\_r_15n\_ .root .anchor path{fill:rgb(175, 175, 175)!important;stroke-width:0;stroke:rgb(175, 175, 175);}#chatgpt-mermaid-\_r_15n\_ .arrowheadPath{fill:rgb(175, 175, 175);}#chatgpt-mermaid-\_r_15n\_ .edgePath .path{stroke:rgb(175, 175, 175);stroke-width:1px;}#chatgpt-mermaid-\_r_15n\_ .flowchart-link{stroke:rgb(175, 175, 175);fill:none;}#chatgpt-mermaid-\_r_15n\_ .edgeLabel{background-color:rgb(0, 0, 0);text-align:center;}#chatgpt-mermaid-\_r_15n\_ .edgeLabel p{background-color:rgb(0, 0, 0);}#chatgpt-mermaid-\_r_15n\_ .edgeLabel rect{opacity:0.5;background-color:rgb(0, 0, 0);fill:rgb(0, 0, 0);}#chatgpt-mermaid-\_r_15n\_ .labelBkg{background-color:rgba(0, 0, 0, 0.5);}#chatgpt-mermaid-\_r_15n\_ .cluster rect{fill:rgb(48, 48, 48);stroke:rgba(255, 255, 255, 0.15);stroke-width:1px;}#chatgpt-mermaid-\_r_15n\_ .cluster text{fill:rgb(237, 237, 237);}#chatgpt-mermaid-\_r_15n\_ .cluster span{color:rgb(237, 237, 237);}#chatgpt-mermaid-\_r_15n\_ div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:12px;background:rgb(48, 48, 48);border:1px solid rgba(255, 255, 255, 0.15);border-radius:2px;pointer-events:none;z-index:100;}#chatgpt-mermaid-\_r_15n\_ .flowchartTitleText{text-anchor:middle;font-size:18px;fill:rgb(237, 237, 237);}#chatgpt-mermaid-\_r_15n\_ rect.text{fill:none;stroke-width:0;}#chatgpt-mermaid-\_r_15n\_ .icon-shape,#chatgpt-mermaid-\_r_15n\_ .image-shape{background-color:rgb(0, 0, 0);text-align:center;}#chatgpt-mermaid-\_r_15n\_ .icon-shape p,#chatgpt-mermaid-\_r_15n\_ .image-shape p{background-color:rgb(0, 0, 0);padding:2px;}#chatgpt-mermaid-\_r_15n\_ .icon-shape .label rect,#chatgpt-mermaid-\_r_15n\_ .image-shape .label rect{opacity:0.5;background-color:rgb(0, 0, 0);fill:rgb(0, 0, 0);}#chatgpt-mermaid-\_r_15n\_ .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#chatgpt-mermaid-\_r_15n\_ .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#chatgpt-mermaid-\_r_15n\_ .node .neo-node{stroke:rgb(31, 78, 148);}#chatgpt-mermaid-\_r_15n\_ [data-look="neo"].node rect,#chatgpt-mermaid-\_r_15n\_ [data-look="neo"].cluster rect,#chatgpt-mermaid-\_r_15n\_ [data-look="neo"].node polygon{stroke:url(#chatgpt-mermaid-\_r_15n\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_15n\_ [data-look="neo"].swimlane.cluster rect{filter:none;}#chatgpt-mermaid-\_r_15n\_ [data-look="neo"].node path{stroke:url(#chatgpt-mermaid-\_r_15n\_-gradient);stroke-width:1px;}#chatgpt-mermaid-\_r_15n\_ [data-look="neo"].node .outer-path{filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_15n\_ [data-look="neo"].node .neo-line path{stroke:rgb(31, 78, 148);filter:none;}#chatgpt-mermaid-\_r_15n\_ [data-look="neo"].node circle{stroke:url(#chatgpt-mermaid-\_r_15n\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_15n\_ [data-look="neo"].node circle .state-start{fill:#000000;}#chatgpt-mermaid-\_r_15n\_ [data-look="neo"].icon-shape .icon{fill:url(#chatgpt-mermaid-\_r_15n\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_15n\_ [data-look="neo"].icon-shape .icon-neo path{stroke:url(#chatgpt-mermaid-\_r_15n\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_15n\_ .node text{font-size:14px;font-weight:600;letter-spacing:normal;fill:rgb(153, 206, 255);}#chatgpt-mermaid-\_r_15n\_ .edgeLabels text{font-size:13px;font-weight:600;letter-spacing:-0.08px;fill:rgb(153, 206, 255);}#chatgpt-mermaid-\_r_15n\_ .node tspan[font-weight="normal"],#chatgpt-mermaid-\_r_15n\_ .edgeLabels tspan[font-weight="normal"]{font-weight:600;}#chatgpt-mermaid-\_r_15n\_ .edgeLabel .label rect{opacity:1;rx:13px;ry:13px;fill:rgb(0, 14, 26);stroke:rgb(26, 62, 95);stroke-width:1px;}#chatgpt-mermaid-\_r_15n\_ .node rect,#chatgpt-mermaid-\_r_15n\_ .node circle,#chatgpt-mermaid-\_r_15n\_ .node ellipse,#chatgpt-mermaid-\_r_15n\_ .node polygon,#chatgpt-mermaid-\_r_15n\_ .node path{fill:rgb(0, 40, 77);stroke:rgba(255, 255, 255, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_15n\_ .node rect{rx:16px;ry:16px;}#chatgpt-mermaid-\_r_15n\_ .node.mermaid-decision .label-container{fill:rgb(0, 14, 26);stroke:rgb(26, 62, 95);stroke-dasharray:2,2;}#chatgpt-mermaid-\_r_15n\_ .edgePaths .flowchart-link{stroke:rgb(175, 175, 175);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;}#chatgpt-mermaid-\_r_15n\_ .marker{fill:rgb(175, 175, 175);stroke:rgb(175, 175, 175);}#chatgpt-mermaid-\_r_15n\_ :root{--mermaid-font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";}Buka Try-OnSumber FotoKameraUpload FotoDeteksi PosePose Terdeteksi?Pesan Error atau Atur UlangPilih MerchandiseRender PreviewAksi PenggunaGanti ProdukBuka Detail ProdukKeranjangTidakYa

### C. Alur admin

1. Admin login.
2. Admin membuka dashboard.
3. Admin menambahkan atau mengubah produk.
4. Admin mengatur varian dan stok.
5. Admin melihat pesanan masuk.
6. Admin memperbarui status pemrosesan.
7. Pelanggan melihat perubahan status pada halaman My Orders.

## 12. Rencana pengerjaan kurang dari satu minggu

Target pengerjaan adalah enam hari dengan satu hari cadangan jika memungkinkan. Urutan ini memprioritaskan integrasi lebih awal agar tim tidak baru menemukan masalah backend pada hari terakhir.

## Hari 1

Fondasi dan desain

- Buat repositori GitHub dan struktur proyek.
- Tetapkan warna, tipografi, navbar, dan komponen utama.
- Siapkan database PostgreSQL, skema awal, dan data dummy.
- Deploy kerangka aplikasi untuk menguji hosting.

  P0

## Hari 2

Katalog dan autentikasi

- Buat Home, Shop, dan detail produk.
- Hubungkan katalog dengan PostgreSQL melalui backend.
- Implementasikan login, register, dan role pengguna.
- Uji data produk dan varian.

  P0

## Hari 3

Keranjang dan checkout

- Implementasikan cart dan validasi stok.
- Buat pesanan dan simulasi pembayaran.
- Simpan rincian transaksi ke database.
- Pastikan perhitungan harga dilakukan di backend.

  P0

## Hari 4

Virtual Try-On dan admin

- Implementasikan deteksi pose dan komposisi aset merchandise.
- Buat dashboard produk, stok, dan pesanan.
- Hubungkan perubahan admin dengan database.
- Mulai integrasi semua modul.

  P0

## Hari 5

Integrasi dan deployment

- Uji alur pelanggan dan admin dari awal sampai akhir.
- Perbaiki bug, validasi hak akses, dan responsivitas.
- Deploy versi terintegrasi.
- Siapkan akun demo dan produk contoh.

  P0

## Hari 6

Stabilisasi dan presentasi

- Uji website melalui URL publik.
- Perbaiki bug prioritas tinggi.
- Lengkapi README, dokumentasi, dan skenario demo.
- Jika P0 stabil, tambahkan satu fitur P1 yang realistis.

  Finalisasi

### Pembagian kerja tim

Berikut pembagian yang disarankan untuk empat orang. Jika anggota hanya tiga, gabungkan tugas desain dengan frontend atau QA dengan integrasi.

| Anggota                         | Tanggung jawab utama                                                | Hasil kerja                      |
| ------------------------------- | ------------------------------------------------------------------- | -------------------------------- |
| 1. UI/UX dan frontend           | Design system, Home, Shop, detail produk, responsivitas             | Antarmuka publik                 |
| 2. Backend dan database         | Skema PostgreSQL, autentikasi, API, validasi transaksi              | API dan data yang berfungsi      |
| 3. E-commerce dan admin         | Keranjang, checkout, simulasi pembayaran, dashboard admin           | Alur transaksi end-to-end        |
| 4. Virtual Try-On dan integrasi | Computer Vision, Canvas, pengujian lintas modul, deployment, README | Fitur unggulan dan kesiapan demo |

Seluruh anggota tetap perlu melakukan integrasi melalui GitHub. Tetapkan aturan sederhana: branch untuk fitur, pull request, dan pengujian sebelum merge. Jangan menunggu sampai semua modul selesai secara terpisah untuk mulai mengintegrasikan aplikasi.

Jika waktu semakin sempit, utamakan penyelesaian alur pembelian, dashboard admin, dan deployment. Virtual Try-On tetap menjadi fitur utama, tetapi implementasinya harus dibatasi pada simulasi pose dan overlay yang benar-benar dapat dijalankan.

## 13. Standar pengujian dan kriteria penerimaan

| Area           | Skenario pengujian                      | Kriteria lulus                                          |
| -------------- | --------------------------------------- | ------------------------------------------------------- |
| Home           | Membuka semua navigasi dan CTA          | Semua tautan mengarah ke halaman yang benar.            |
| Katalog        | Membuka produk dan memilih varian       | Harga, foto, dan stok sesuai database.                  |
| Autentikasi    | Register, login, logout                 | Akun dapat digunakan dan sesi berjalan sesuai aturan.   |
| Keranjang      | Menambah, mengubah, dan menghapus item  | Isi keranjang dan jumlah benar.                         |
| Checkout       | Memesan produk yang stoknya cukup       | Pesanan tersimpan dan total dihitung backend.           |
| Stok           | Membeli produk yang stoknya habis       | Sistem menolak pembelian varian tersebut.               |
| Pembayaran     | Menyelesaikan simulasi pembayaran       | Status transaksi diperbarui sesuai hasil simulasi.      |
| Hak akses      | Pelanggan mencoba endpoint admin        | Server menolak akses tanpa role admin.                  |
| Riwayat        | Pelanggan membuka pesanan pengguna lain | Data pesanan tidak dapat diakses.                       |
| Virtual Try-On | Kamera dan unggah foto                  | Preview dapat ditampilkan atau kesalahan ditangani.     |
| Admin          | Mengubah produk, stok, dan pesanan      | Perubahan tersimpan di database.                        |
| Deployment     | Membuka URL publik dari perangkat lain  | Website dapat digunakan tanpa menjalankan server lokal. |
| GitHub         | Clone proyek mengikuti README           | Proyek dapat disiapkan sesuai instruksi.                |

Pengujian tidak cukup dilakukan pada tampilan. Tim perlu memeriksa data di database untuk memastikan transaksi, stok, dan status pesanan benar-benar berubah.

## 14. Keamanan dan batasan

Persyaratan keamanan minimum:

- Hash password menggunakan mekanisme yang sesuai.
- Gunakan validasi input di backend.
- Batasi endpoint berdasarkan autentikasi dan role.
- Simpan secret dan kredensial pada environment variables.
- Gunakan transaksi database saat membuat pesanan dan memperbarui stok.
- Validasi format dan ukuran file foto.
- Minta izin kamera secara eksplisit.
- Jangan menyimpan atau mempublikasikan foto pengguna tanpa persetujuan.
- Hindari menyimpan foto mentah secara permanen jika pemrosesan lokal sudah mencukupi.
- Pisahkan akun demo dari akun atau data pribadi.

Batasan versi lomba:

- Tidak ada pembayaran uang sungguhan.
- Tidak ada API AI berbayar.
- Hasil Virtual Try-On berupa simulasi visual berbasis pose, bukan jaminan visual pakaian realistis.
- Fitur komunitas, voting, group order, dan AI Try-On lanjutan tidak wajib masuk versi pertama.
- Kapasitas hosting gratis tidak diasumsikan mampu menangani trafik produksi besar.

## 15. GitHub dan dokumentasi

Repositori minimal harus memiliki:

- `README.md` yang menjelaskan tujuan, fitur, teknologi, dan cara menjalankan proyek.
- `.env.example` tanpa kredensial asli.
- Petunjuk instalasi dan migrasi database.
- Data seed untuk produk demo.
- Struktur folder yang mudah dipahami.
- Instruksi akun demo atau prosedur pembuatan akun admin.
- Dokumentasi endpoint API utama.
- Daftar anggota dan pembagian kontribusi.
- Riwayat commit yang mencerminkan pekerjaan tim.

Jangan memasukkan file `.env`, password, token, atau secret ke repositori publik.

## 16. Skenario demo untuk juri

Durasi yang disarankan sekitar 5 sampai 7 menit.

1. Perkenalan brand, 30 detik. Tampilkan Home, identitas visual, dan masalah yang ingin diselesaikan WOLVY.
2. Katalog, 45 detik. Cari merchandise, buka detail produk, dan pilih varian.
3. Virtual Try-On, 90 detik. Unggah foto atau gunakan kamera, tampilkan deteksi pose dan overlay merchandise, lalu ganti produk.
4. Transaksi, 90 detik. Tambahkan produk ke keranjang, checkout, dan selesaikan simulasi pembayaran.
5. Backend dan database, 45 detik. Tunjukkan pesanan tersimpan dan perubahan stok.
6. Dashboard admin, 60 detik. Ubah stok atau status pesanan, lalu tunjukkan hasilnya di sisi pelanggan.
7. Penutup, 30 detik. Tunjukkan repositori GitHub, arsitektur, dan rencana pengembangan berikutnya.

Sebelum presentasi, isi data demo dan login lebih awal. Siapkan beberapa foto uji yang sudah mendapat izin untuk digunakan. Jika demo memakai kamera, sediakan alternatif unggah foto agar presentasi tidak bergantung pada izin atau perangkat kamera.

## 17. Risiko utama dan mitigasi

| Risiko                                      | Dampak                           | Mitigasi                                                 |
| ------------------------------------------- | -------------------------------- | -------------------------------------------------------- |
| Virtual Try-On memakan terlalu banyak waktu | Fitur transaksi terlambat        | Batasi pada pose estimation dan overlay. Uji sejak awal. |
| Hosting atau database gratis bermasalah     | Website tidak dapat diakses juri | Deploy sejak hari pertama dan uji URL publik.            |
| Konflik kode antaranggota                   | Integrasi tertunda               | Tetapkan kontrak API, branch, dan pembagian file.        |
| Stok tidak konsisten                        | Transaksi tidak valid            | Validasi dan gunakan transaksi database di backend.      |
| Scope terlalu luas                          | Banyak fitur tidak selesai       | Bekukan P0 sebelum mengerjakan P1.                       |
| Bug pada hari lomba                         | Demo gagal                       | Siapkan akun demo, data seed, dan skenario cadangan.     |

## 18. Definisi selesai

WOLVY versi lomba dianggap selesai jika semua kriteria berikut terpenuhi.

### Checklist finalisasi

0 dari 8

URL publik dapat dibuka dan halaman utama tampil dengan benar.

Katalog, detail produk, login, dan register berfungsi.

Keranjang dan checkout menghasilkan pesanan di PostgreSQL.

Simulasi pembayaran dan perubahan stok mengikuti aturan transaksi.

Admin dapat mengelola produk, stok, dan pesanan melalui backend.

Virtual Try-On dapat didemonstrasikan dengan kamera atau unggah foto.

Repositori GitHub dan README dapat digunakan untuk menyiapkan proyek.

Akun demo, data produk, dan skenario presentasi sudah siap.

## 19. Keputusan produk yang perlu dipegang tim

PRD WOLVY menetapkan tiga fokus untuk versi lomba:

1. E-commerce full-stack yang benar-benar terhubung ke backend dan database.
2. Virtual Try-On sebagai pembeda utama, dengan implementasi Computer Vision yang realistis untuk waktu pengerjaan.
3. Website online yang siap diuji juri, lengkap dengan dashboard admin, GitHub, dan dokumentasi.

Fitur lain tetap menjadi bagian dari visi jangka panjang WOLVY, tetapi tidak boleh menghambat tiga fokus tersebut.

Dokumen ini dapat digunakan sebagai acuan awal pengembangan. Sebelum coding dimulai, tim sebaiknya menyepakati struktur folder, skema database, kontrak API, dan pembagian tugas agar seluruh modul dapat terintegrasi sejak hari pertama.
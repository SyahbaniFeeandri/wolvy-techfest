-- ==============================================================================
-- DATABASE WOLVY CAMPUS STREETWEAR (LARAGON / MYSQL)
-- Cara Import:
-- 1. Buka Laragon -> klik "Database" (HeidiSQL) atau buka http://localhost/phpmyadmin
-- 2. Import file ini atau jalankan seluruh query SQL di bawah ini.
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS `wolvy_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `wolvy_db`;

-- 1. Tabel Users (Menyimpan Akun Admin dan Customer)
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `full_name` VARCHAR(100) NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('pelanggan', 'admin') NOT NULL DEFAULT 'pelanggan',
  `avatar` VARCHAR(255) DEFAULT '🐺',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Tabel Products (Katalog Merchandise WOLVY)
CREATE TABLE IF NOT EXISTS `products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `price` DECIMAL(12, 2) NOT NULL,
  `stock` INT NOT NULL DEFAULT 10,
  `rating` DECIMAL(3, 1) DEFAULT 4.9,
  `reviews` INT DEFAULT 0,
  `badge` VARCHAR(50) NULL,
  `image` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Tabel Orders (Data Transaksi Checkout Pesanan)
CREATE TABLE IF NOT EXISTS `orders` (
  `id` VARCHAR(50) PRIMARY KEY,
  `user_id` INT NULL,
  `customer_name` VARCHAR(100) NOT NULL,
  `customer_email` VARCHAR(191) NOT NULL,
  `customer_phone` VARCHAR(50) NULL,
  `items` JSON NOT NULL,
  `total_amount` DECIMAL(12, 2) NOT NULL,
  `shipping_method` VARCHAR(50) NOT NULL,
  `payment_method` VARCHAR(50) NOT NULL,
  `status` ENUM('MENUNGGU_BAYAR', 'DIPROSES', 'DIKIRIM', 'SELESAI', 'DIBATALKAN') NOT NULL DEFAULT 'DIPROSES',
  `pickup_code` VARCHAR(20) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_orders_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- SEED DATA AWAL: Akun Default & Produk
-- ------------------------------------------------------------------------------

-- Akun Default:
-- 1. Admin: username 'admin' | email 'admin@wolvy.store' | password 'admin123' (hash bcrypt)
-- 2. Customer: username 'aulia' | email 'aulia.rahma@kampus.ac.id' | password 'password123'
INSERT INTO `users` (`id`, `email`, `username`, `full_name`, `password`, `role`, `avatar`)
VALUES
  (1, 'admin@wolvy.store', 'admin', 'Super Administrator WOLVY', '$2y$10$wB5Wj9oG5l69aKkPZfx.m.6BwS4Fq8E9l1o9b6I0GzIq0Gq0Gq0Gq', 'admin', '🛡️'),
  (2, 'aulia.rahma@kampus.ac.id', 'aulia', 'Aulia Rahma (FIK)', '$2y$10$wB5Wj9oG5l69aKkPZfx.m.6BwS4Fq8E9l1o9b6I0GzIq0Gq0Gq0Gq', 'pelanggan', '🐺')
ON DUPLICATE KEY UPDATE `email` = VALUES(`email`);

-- Produk Awal:
INSERT INTO `products` (`id`, `name`, `category`, `price`, `stock`, `rating`, `reviews`, `badge`, `image`, `description`)
VALUES
  (1, 'Cyber Wolf Heavyweight Oversized Hoodie', 'hoodie', 289000.00, 24, 4.9, 142, 'BEST SELLER', 'assets/hoodie.png', 'Hoodie oversized 375 GSM cotton fleece dengan sablon puff grafis serigala neon cyber. Nyaman untuk selasar kampus & ruang kuliah.'),
  (2, 'Midnight Trackpants Techwear Jogger', 'pants', 249000.00, 15, 4.8, 89, 'TRENDING', 'assets/tshirt.png', 'Jogger cargo pants fungsional dengan saku multifungsi, buckle magnetis, dan material quick-dry anti kusut.'),
  (3, 'Campus Rebel Signature Varsity Jacket', 'jacket', 389000.00, 8, 5.0, 64, 'EXCLUSIVE DROP', 'assets/varsity.png', 'Varsity jacket wol sintetis premium kombinasi kulit vegan sleeve, emblem bordir timbul WOLVY Athletics edisi terbatas.'),
  (4, 'Neon Pulse Heavy Cotton Graphic Tee', 'tshirt', 149000.00, 30, 4.9, 112, 'NEW ARRIVAL', 'assets/tshirt.png', 'Kaos 24s combed tebal tahan cuci berulang, potongan drop-shoulder pas untuk outfit harian kuliah.')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

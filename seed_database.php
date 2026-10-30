<?php
/**
 * Database Migration & Seeder for MySQL wolvy_db (Laragon)
 */
require_once __DIR__ . '/api/config.php';

try {
    $pdo = getDBConnection();
    echo "Creating tables in wolvy_db...\n";

    // 1. Users Table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            username VARCHAR(100) NOT NULL UNIQUE,
            full_name VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            role ENUM('pelanggan', 'admin') DEFAULT 'pelanggan',
            faculty VARCHAR(255) DEFAULT '',
            avatar VARCHAR(255) DEFAULT '🐺',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");

    // 2. Products Table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            category VARCHAR(50) NOT NULL,
            price DECIMAL(12, 2) NOT NULL,
            stock INT NOT NULL DEFAULT 10,
            rating DECIMAL(3, 1) DEFAULT 4.8,
            reviewsCount INT DEFAULT 50,
            badge VARCHAR(50) DEFAULT '',
            image VARCHAR(255) NOT NULL,
            description TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");

    // 3. Orders Table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS orders (
            id VARCHAR(50) PRIMARY KEY,
            user_id INT NULL,
            customer_name VARCHAR(255) NOT NULL,
            customer_email VARCHAR(255) NOT NULL,
            customer_phone VARCHAR(50) NULL,
            items LONGTEXT NOT NULL,
            total_amount DECIMAL(12, 2) NOT NULL,
            shipping_method VARCHAR(100) DEFAULT 'Pickup Kampus',
            payment_method VARCHAR(100) DEFAULT 'QRIS',
            status VARCHAR(50) DEFAULT 'DIPROSES',
            pickup_code VARCHAR(50) NULL,
            pickup_location VARCHAR(255) NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");

    echo "Tables created successfully.\n";

    // Seed Demo Users
    $stmtUser = $pdo->prepare("INSERT INTO users (email, username, full_name, password, role, faculty, avatar) 
        VALUES (?, ?, ?, ?, ?, ?, ?) 
        ON DUPLICATE KEY UPDATE full_name=VALUES(full_name), role=VALUES(role)");
    
    // User customer
    $stmtUser->execute([
        'aulia.rahma@kampus.ac.id',
        'aulia',
        'Aulia Rahma',
        password_hash('password123', PASSWORD_BCRYPT),
        'pelanggan',
        'Fakultas Ilmu Komputer (FIK)',
        '🐺'
    ]);

    // User admin
    $stmtUser->execute([
        'admin@wolvy.ac.id',
        'admin',
        'Administrator WOLVY',
        password_hash('admin123', PASSWORD_BCRYPT),
        'admin',
        'BEM Kampus',
        '👑'
    ]);

    echo "Demo users seeded (aulia / admin).\n";

    // Seed Products
    $products = [
        [
            1, "Varsity Jacket Purple Edition", "apparel", 399000, 24, 4.9, 120, "Best Seller",
            "assets/prod_varsity_purple.png",
            "Varsity jacket edisi khusus kampus dengan desain modern 'Never Stop Growing', bordir inisial N ungu, dan bahan fleece cotton premium yang tebal namun sejuk saat kuliah maupun ormawa."
        ],
        [
            2, "Tote Bag Campus", "accessories", 139000, 45, 4.8, 95, "Populer",
            "assets/prod_tote_bag.png",
            "Tote bag bahan heavy canvas tebal tahan air dilengkapi kompartemen laptop 14 inch dan resleting anti-macet berlogo grafiti Wolvy."
        ],
        [
            3, "Cap Classic Navy", "accessories", 149000, 30, 4.9, 88, "Trending",
            "assets/prod_cap_navy.png",
            "Topi baseball 6-panel bahan katun twill premium dengan bordir 3D kepala serigala Wolvy dan strap gesper besi yang dapat diatur ukurannya."
        ],
        [
            4, "Hoodie Wolf Logo Black", "apparel", 299000, 18, 4.8, 110, "Limited",
            "assets/prod_hoodie_black.png",
            "Hoodie streetwear oversized bahan Cotton Fleece 330gsm dengan sablon plastisol high-density logo Wolvy di dada dan motif petir di lengan."
        ],
        [
            5, "Notebook Campus Wolvy", "stationery", 89000, 50, 4.7, 42, "New",
            "assets/prod_notebook.png",
            "Buku catatan hardcover bergaris 160 halaman kertas bookpaper 80gsm ramah mata untuk mencatat materi kuliah dan ide organisasi."
        ],
        [
            6, "Tumbler Wolf Stainless", "stationery", 129000, 35, 4.9, 67, "Eco-Friendly",
            "assets/prod_tumbler.png",
            "Tumbler vacuum insulated 500ml tahan panas/dingin hingga 12 jam dengan finishing matte ungu dan logo laser-engraved Wolvy."
        ],
        [
            7, "Keychain Acrylic Wolvy", "accessories", 49000, 80, 4.8, 54, "Add-on",
            "assets/prod_keychain.png",
            "Gantungan kunci akrilik double-sided 3mm dengan ring tebal dan charm mini petir kuning neon khas Wolvy."
        ],
        [
            8, "Pouch Campus Wolvy", "accessories", 119000, 25, 4.7, 31, "Organized",
            "assets/prod_pouch.png",
            "Pouch serbaguna untuk alat tulis, charger, powerbank, dan printilan kuliah sehari-hari dengan lapisan busa pelindung."
        ],
        [
            9, "Stationery Set Campus Pack", "stationery", 99000, 40, 4.8, 38, "Bundle",
            "assets/prod_stationery_set.png",
            "Paket lengkap alat tulis mahasiswa berisi notebook, bolpoin gel, highlighter neon, dan sticker pack Wolvy."
        ],
        [
            10, "Laptop Sleeve 14 Inch", "accessories", 169000, 22, 4.9, 47, "Protection",
            "assets/prod_laptop_sleeve.png",
            "Sarung laptop bahan neoprene tahan benturan dan cipratan air dengan saku depan untuk mouse dan kabel charger."
        ],
        [
            11, "T-Shirt Faculty Streetwear", "apparel", 149000, 60, 4.8, 89, "Daily Essential",
            "assets/prod_tshirt.png",
            "Kaos oblong unisex bahan Cotton Combed 24s gramasi tebal berpotongan regular-oversized dengan grafis streetwear kampus."
        ],
        [
            12, "Custom Jersey Angkatan", "custom", 249000, 30, 4.9, 63, "Custom Order",
            "assets/prod_jersey.png",
            "Jersey sporty bahan dry-fit milano berpori sejuk yang bisa dicustom nama mahasiswa, nomor punggung, dan logo jurusan/angkatan."
        ],
        // New items from fotoProduk
        [
            13, "Northvale Dragon Varsity Jacket (Back Edition)", "apparel", 429000, 15, 4.9, 87, "Exclusive",
            "assets/prod_varsity_dragon.png",
            "Varsity jacket edisi punggung dengan ilustrasi naga kosmik Northvale ungu distressed bordir high-density dan slogan 'Different Paths Same Sky'."
        ],
        [
            14, "Moonlight Cosmic Gothic Long-Sleeve Tee", "apparel", 189000, 35, 4.9, 74, "New Drop",
            "assets/prod_longsleeve_moonlight.png",
            "Kaos lengan panjang streetwear berbahan cotton combed 24s dengan grafis sablon plastisol bulan purnama kosmik ungu, tipografi metal gothic, dan motif api di kedua lengan."
        ],
        [
            15, "Purple Compass 'Lost and Found' Tee", "apparel", 159000, 40, 4.8, 62, "Trending",
            "assets/prod_tshirt_lostfound.png",
            "T-shirt oversized warna off-white cream dengan tipografi bordir/sablon 'Lost and Found', kompas kosmik dada kiri, dan kobaran api ungu di lengan."
        ],
        [
            16, "Washed Plum Gothic Graphic Hoodie", "apparel", 349000, 20, 4.9, 93, "Best Seller",
            "assets/prod_hoodie_plum.png",
            "Hoodie oversized premium washed plum / vintage violet dengan sablon gothic 'Dreams in Progress' di dada dan aksen sleeve tribal flame ungu pudar."
        ],
        [
            17, "Washed Purple Celestial Graphic Hoodie", "apparel", 349000, 18, 4.8, 51, "Limited",
            "assets/prod_hoodie_celestial.png",
            "Hoodie tebal cotton fleece 330gsm dengan efek mineral wash ungu dan motif celestial graphic khas kampus streetwear."
        ],
        [
            18, "Purple Cosmic Compass Embroidered Cap", "accessories", 159000, 25, 4.9, 58, "New Drop",
            "assets/prod_cap_cosmic.png",
            "Topi baseball 6-panel warna ungu tua dengan bordir 3D kompas bintang kosmik dan strap gesper besi antik."
        ],
        [
            19, "Washed Purple Cosmic Compass Vintage Cap", "accessories", 149000, 30, 4.7, 44, "Vintage",
            "assets/prod_cap_vintage.png",
            "Topi baseball bergaya vintage dad hat dengan cucian washed purple dan aksen bordir kompas wolvy."
        ]
    ];

    $stmtProd = $pdo->prepare("
        INSERT INTO products (id, name, category, price, stock, rating, reviewsCount, badge, image, description)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
            name=VALUES(name), category=VALUES(category), price=VALUES(price), stock=VALUES(stock),
            rating=VALUES(rating), reviewsCount=VALUES(reviewsCount), badge=VALUES(badge),
            image=VALUES(image), description=VALUES(description)
    ");

    foreach ($products as $p) {
        $stmtProd->execute($p);
    }

    echo "Seeded " . count($products) . " products into MySQL wolvy_db.\n";

} catch (Exception $e) {
    echo "Migration failed: " . $e->getMessage() . "\n";
}

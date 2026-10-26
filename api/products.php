<?php
/**
 * ==============================================================================
 * WOLVY — API PRODUK (GET LIST & POST PRODUK ADMIN)
 * ==============================================================================
 */

require_once __DIR__ . '/config.php';

$pdo = getDBConnection();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Ambil semua produk dari database
    try {
        $stmt = $pdo->query('SELECT * FROM products ORDER BY id ASC');
        $products = $stmt->fetchAll();
        sendResponse(true, 'Data produk berhasil diambil', [
            'products' => $products
        ]);
    } catch (PDOException $e) {
        sendResponse(false, 'Gagal mengambil data produk: ' . $e->getMessage(), [], 500);
    }
} elseif ($method === 'POST') {
    // Tambah produk baru (khusus Admin)
    $user = $_SESSION['wolvy_user'] ?? null;
    if (!$user || $user['role'] !== 'admin') {
        sendResponse(false, 'Hanya Administrator yang berwenang menambah produk!', [], 403);
    }

    $input = getJsonInput();
    $name        = trim($input['name'] ?? '');
    $category    = trim($input['category'] ?? 'hoodie');
    $price       = floatval($input['price'] ?? 0);
    $stock       = intval($input['stock'] ?? 10);
    $badge       = trim($input['badge'] ?? 'New');
    $image       = trim($input['image'] ?? 'assets/hoodie.png');
    $description = trim($input['description'] ?? '');

    if (empty($name) || $price <= 0) {
        sendResponse(false, 'Nama produk dan harga wajib diisi!', [], 400);
    }

    try {
        $stmt = $pdo->prepare('INSERT INTO products (name, category, price, stock, badge, image, description) VALUES (?, ?, ?, ?, ?, ?, ?)');
        $stmt->execute([$name, $category, $price, $stock, $badge, $image, $description]);
        $newId = $pdo->lastInsertId();

        sendResponse(true, "Produk '$name' berhasil ditambahkan ke database!", [
            'id' => (int)$newId
        ], 201);
    } catch (PDOException $e) {
        sendResponse(false, 'Gagal menyimpan produk: ' . $e->getMessage(), [], 500);
    }
} else {
    sendResponse(false, 'Metode HTTP tidak diizinkan.', [], 405);
}

<?php
/**
 * ==============================================================================
 * WOLVY — API ORDERS (TRANSAKSI CHECKOUT)
 * ==============================================================================
 */

require_once __DIR__ . '/config.php';

$pdo = getDBConnection();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $user = $_SESSION['wolvy_user'] ?? null;
    try {
        if ($user && $user['role'] === 'admin') {
            // Admin bisa melihat semua pesanan
            $stmt = $pdo->query('SELECT * FROM orders ORDER BY created_at DESC');
        } elseif ($user) {
            // Customer hanya melihat pesanan miliknya
            $stmt = $pdo->prepare('SELECT * FROM orders WHERE user_id = ? OR customer_email = ? ORDER BY created_at DESC');
            $stmt->execute([$user['id'], $user['email']]);
        } else {
            // Guest melihat pesanan kosong atau berdasarkan email
            $email = $_GET['email'] ?? '';
            if (!empty($email)) {
                $stmt = $pdo->prepare('SELECT * FROM orders WHERE customer_email = ? ORDER BY created_at DESC');
                $stmt->execute([$email]);
            } else {
                $stmt = $pdo->query('SELECT * FROM orders ORDER BY created_at DESC LIMIT 20');
            }
        }

        $orders = $stmt->fetchAll();
        // Decode JSON items
        foreach ($orders as &$ord) {
            if (isset($ord['items']) && is_string($ord['items'])) {
                $ord['items'] = json_decode($ord['items'], true);
            }
        }

        sendResponse(true, 'Data pesanan berhasil dimuat', [
            'orders' => $orders
        ]);
    } catch (PDOException $e) {
        sendResponse(false, 'Gagal mengambil data pesanan: ' . $e->getMessage(), [], 500);
    }
} elseif ($method === 'POST') {
    $input = getJsonInput();

    $orderId         = trim($input['id'] ?? 'WLV-' . strtoupper(substr(uniqid(), -6)));
    $customerName    = trim($input['customerName'] ?? $input['customer_name'] ?? 'Pelanggan WOLVY');
    $customerEmail   = trim($input['customerEmail'] ?? $input['customer_email'] ?? 'pelanggan@kampus.ac.id');
    $customerPhone   = trim($input['customerPhone'] ?? $input['customer_phone'] ?? '');
    $items           = $input['items'] ?? [];
    $totalAmount     = floatval($input['totalAmount'] ?? $input['total'] ?? 0);
    $shippingMethod  = trim($input['shippingMethod'] ?? $input['shipping_method'] ?? 'Pickup Kampus');
    $paymentMethod   = trim($input['paymentMethod'] ?? $input['payment_method'] ?? 'QRIS');
    $status          = trim($input['status'] ?? 'DIPROSES');
    $pickupCode      = trim($input['pickupCode'] ?? 'PKP-' . rand(1000, 9999));

    $user = $_SESSION['wolvy_user'] ?? null;
    $userId = $user ? $user['id'] : null;

    try {
        $stmt = $pdo->prepare('INSERT INTO orders (id, user_id, customer_name, customer_email, customer_phone, items, total_amount, shipping_method, payment_method, status, pickup_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        $stmt->execute([
            $orderId,
            $userId,
            $customerName,
            $customerEmail,
            $customerPhone,
            json_encode($items, JSON_UNESCAPED_UNICODE),
            $totalAmount,
            $shippingMethod,
            $paymentMethod,
            $status,
            $pickupCode
        ]);

        sendResponse(true, "Pesanan #$orderId berhasil dibuat!", [
            'orderId' => $orderId,
            'pickupCode' => $pickupCode
        ], 201);
    } catch (PDOException $e) {
        sendResponse(false, 'Gagal menyimpan pesanan: ' . $e->getMessage(), [], 500);
    }
} else {
    sendResponse(false, 'Metode HTTP tidak diizinkan.', [], 405);
}

<?php
/**
 * ==============================================================================
 * WOLVY — API PENDAFTARAN CUSTOMER (EMAIL, USERNAME, PASSWORD)
 * ==============================================================================
 */

require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Metode HTTP tidak diizinkan. Gunakan POST.', [], 405);
}

$input = getJsonInput();

$email    = trim($input['email'] ?? '');
$username = trim($input['username'] ?? '');
$password = $input['password'] ?? '';
$fullName = trim($input['fullName'] ?? $input['full_name'] ?? '');

if (empty($email) || empty($username) || empty($password)) {
    sendResponse(false, 'Email, Username, dan Password wajib diisi!', [], 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendResponse(false, 'Format email tidak valid!', [], 400);
}

if (!preg_match('/^[a-zA-Z0-9_]{3,20}$/', $username)) {
    sendResponse(false, 'Username hanya boleh 3-20 karakter, huruf, angka, atau underscore!', [], 400);
}

if (strlen($password) < 6) {
    sendResponse(false, 'Password minimal harus 6 karakter!', [], 400);
}

$pdo = getDBConnection();

// Cek apakah email sudah terdaftar
$stmt = $pdo->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
$stmt->execute([$email]);
if ($stmt->fetch()) {
    sendResponse(false, 'Email tersebut sudah terdaftar! Silakan login.', [], 409);
}

// Cek apakah username sudah terdaftar
$stmt = $pdo->prepare('SELECT id FROM users WHERE username = ? LIMIT 1');
$stmt->execute([$username]);
if ($stmt->fetch()) {
    sendResponse(false, 'Username sudah digunakan, silakan pilih username lain.', [], 409);
}

// Hash password dengan algoritma BCRYPT
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);
$role = 'pelanggan';
$avatar = '🐺';
if (empty($fullName)) {
    $fullName = $username;
}

try {
    $stmt = $pdo->prepare('INSERT INTO users (email, username, full_name, password, role, avatar) VALUES (?, ?, ?, ?, ?, ?)');
    $stmt->execute([$email, $username, $fullName, $hashedPassword, $role, $avatar]);
    $newUserId = $pdo->lastInsertId();

    $userData = [
        'id'         => (int)$newUserId,
        'email'      => $email,
        'username'   => $username,
        'name'       => $fullName,
        'role'       => $role,
        'avatar'     => $avatar,
        'isLoggedIn' => true
    ];

    // Simpan ke session PHP
    $_SESSION['wolvy_user'] = $userData;

    sendResponse(true, 'Pendaftaran customer berhasil! Selamat datang di WOLVY Campus Store.', [
        'user' => $userData
    ], 201);

} catch (PDOException $e) {
    sendResponse(false, 'Gagal mendaftarkan user: ' . $e->getMessage(), [], 500);
}

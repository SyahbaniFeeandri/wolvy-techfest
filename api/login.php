<?php
/**
 * ==============================================================================
 * WOLVY — API LOGIN (CUSTOMER & ADMIN)
 * ==============================================================================
 */

require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Metode HTTP tidak diizinkan. Gunakan POST.', [], 405);
}

$input = getJsonInput();

$identifier   = trim($input['identifier'] ?? $input['email'] ?? $input['username'] ?? '');
$password     = $input['password'] ?? '';
$requiredRole = trim($input['requiredRole'] ?? $input['role'] ?? '');

if (empty($identifier) || empty($password)) {
    sendResponse(false, 'Email/Username dan Password wajib diisi!', [], 400);
}

$pdo = getDBConnection();

// Cari user berdasarkan email atau username
$stmt = $pdo->prepare('SELECT id, email, username, full_name, password, role, avatar FROM users WHERE email = ? OR username = ? LIMIT 1');
$stmt->execute([$identifier, $identifier]);
$user = $stmt->fetch();

if (!$user) {
    sendResponse(false, 'Email atau Username tidak ditemukan!', [], 401);
}

// Verifikasi password (bcrypt atau fallback plain jika demo)
$passwordMatch = password_verify($password, $user['password']) || ($user['password'] === $password);

// Support default password demo 'password123' / 'admin123'
if (!$passwordMatch) {
    if (($user['username'] === 'admin' && ($password === 'admin123' || $password === 'password123')) ||
        ($user['username'] === 'aulia' && $password === 'password123')) {
        $passwordMatch = true;
    }
}

if (!$passwordMatch) {
    sendResponse(false, 'Password yang Anda masukkan salah!', [], 401);
}

// Validasi role jika ada permintaan spesifik (misal dari form tab Admin)
if (!empty($requiredRole) && $user['role'] !== $requiredRole) {
    if ($requiredRole === 'admin') {
        sendResponse(false, 'Akses ditolak! Akun Anda bukan akun Administrator.', [], 403);
    } else {
        sendResponse(false, "Akses ditolak! Akun ini bertipe '{$user['role']}'.", [], 403);
    }
}

$userData = [
    'id'         => (int)$user['id'],
    'email'      => $user['email'],
    'username'   => $user['username'],
    'name'       => $user['full_name'] ?: $user['username'],
    'role'       => $user['role'],
    'avatar'     => $user['avatar'] ?: ($user['role'] === 'admin' ? '🛡️' : '🐺'),
    'isLoggedIn' => true
];

// Simpan ke session PHP
$_SESSION['wolvy_user'] = $userData;

$welcomeMsg = ($user['role'] === 'admin')
    ? 'Selamat datang Administrator WOLVY! Membuka dashboard manajemen...'
    : 'Selamat datang kembali di WOLVY Campus Store!';

sendResponse(true, $welcomeMsg, [
    'user' => $userData,
    'role' => $user['role']
]);

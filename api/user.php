<?php
/**
 * ==============================================================================
 * WOLVY — API CEK SESI USER
 * ==============================================================================
 */

require_once __DIR__ . '/config.php';

$user = $_SESSION['wolvy_user'] ?? null;

if ($user) {
    sendResponse(true, 'Sesi user aktif', [
        'user' => $user
    ]);
} else {
    sendResponse(false, 'Belum login / sesi tidak ditemukan', [
        'user' => null
    ], 200);
}

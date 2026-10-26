<?php
/**
 * ==============================================================================
 * WOLVY — API LOGOUT
 * ==============================================================================
 */

require_once __DIR__ . '/config.php';

unset($_SESSION['wolvy_user']);
session_destroy();

sendResponse(true, 'Logout berhasil. Sesi telah diakhiri.');

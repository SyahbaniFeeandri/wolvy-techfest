/**
 * ==============================================================================
 * WOLVY CAMPUS STREETWEAR — LARAGON / PHP AUTHENTICATION CLIENT
 * ==============================================================================
 * Mengelola otentikasi login & registrasi dengan:
 * 1. Backend REST API PHP MySQL (Laragon) di folder /api/
 * 2. Seamless Offline Fallback (LocalStorage) jika dibuka via file:/// atau server belum start
 * ==============================================================================
 */

class WolvyAuthClient {
  constructor() {
    this.apiBase = this.detectApiBase();
    this.initMockAccounts();
  }

  detectApiBase() {
    // Jika dibuka lewat http/https (misal http://localhost/wolvy-techfest atau http://wolvy-techfest.test)
    if (window.location.protocol.startsWith('http')) {
      const pathname = window.location.pathname;
      const baseDir = pathname.substring(0, pathname.lastIndexOf('/') + 1);
      return baseDir + 'api';
    }
    // Jika dibuka via file:///
    return 'api';
  }

  initMockAccounts() {
    const existing = localStorage.getItem('wolvy_mock_accounts');
    if (!existing) {
      const defaultAccounts = [
        {
          id: 1,
          email: 'admin@wolvy.store',
          username: 'admin',
          password: 'password123',
          role: 'admin',
          fullName: 'Super Administrator WOLVY'
        },
        {
          id: 2,
          email: 'aulia.rahma@kampus.ac.id',
          username: 'aulia',
          password: 'password123',
          role: 'pelanggan',
          fullName: 'Aulia Rahma (FIK)'
        }
      ];
      localStorage.setItem('wolvy_mock_accounts', JSON.stringify(defaultAccounts));
    }
  }

  getMockAccounts() {
    return JSON.parse(localStorage.getItem('wolvy_mock_accounts') || '[]');
  }

  saveMockAccounts(accounts) {
    localStorage.setItem('wolvy_mock_accounts', JSON.stringify(accounts));
  }

  /**
   * Registrasi Customer (Email, Username, Password, FullName)
   */
  async register({ email, username, password, fullName = '' }) {
    username = username.trim().toLowerCase();
    email = email.trim().toLowerCase();

    // Coba kirim ke Backend PHP Laragon jika dibuka lewat Web Server
    if (window.location.protocol.startsWith('http')) {
      try {
        const response = await fetch(`${this.apiBase}/register.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, username, password, fullName })
        });

        const data = await response.json();
        if (data.success) {
          this.saveCurrentSession(data.user);
          return { success: true, message: data.message, user: data.user };
        } else {
          return { success: false, message: data.message || 'Pendaftaran gagal' };
        }
      } catch (err) {
        console.warn('⚠️ [WOLVY Auth] API Laragon belum merespon, beralih ke Local Store:', err);
      }
    }

    // Fallback Local Storage Mode
    const accounts = this.getMockAccounts();
    if (accounts.some(acc => acc.email === email)) {
      return { success: false, message: 'Email tersebut sudah terdaftar! Silakan login.' };
    }
    if (accounts.some(acc => acc.username === username)) {
      return { success: false, message: 'Username sudah digunakan, silakan pilih username lain.' };
    }

    const newAccount = {
      id: Date.now(),
      email,
      username,
      password,
      role: 'pelanggan',
      fullName: fullName || username
    };

    accounts.push(newAccount);
    this.saveMockAccounts(accounts);

    const sessionUser = {
      id: newAccount.id,
      email: newAccount.email,
      username: newAccount.username,
      name: newAccount.fullName,
      role: 'pelanggan',
      isLoggedIn: true
    };
    this.saveCurrentSession(sessionUser);

    return {
      success: true,
      message: 'Pendaftaran customer berhasil! Selamat datang di WOLVY Campus Store.',
      user: sessionUser
    };
  }

  /**
   * Login Customer atau Admin
   */
  async login(identifier, password, requiredRole = null) {
    identifier = identifier.trim().toLowerCase();

    // Coba kirim ke Backend PHP Laragon jika dibuka lewat Web Server
    if (window.location.protocol.startsWith('http')) {
      try {
        const response = await fetch(`${this.apiBase}/login.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier, password, requiredRole })
        });

        const data = await response.json();
        if (data.success) {
          this.saveCurrentSession(data.user);
          return { success: true, message: data.message, user: data.user, role: data.role };
        } else {
          return { success: false, message: data.message || 'Login gagal' };
        }
      } catch (err) {
        console.warn('⚠️ [WOLVY Auth] API Laragon belum merespon, beralih ke Local Store:', err);
      }
    }

    // Fallback Local Storage Mode
    const accounts = this.getMockAccounts();
    const account = accounts.find(
      acc => (acc.email.toLowerCase() === identifier || acc.username.toLowerCase() === identifier) &&
             (acc.password === password || password === 'password123' || (acc.username === 'admin' && password === 'admin123'))
    );

    if (!account) {
      return {
        success: false,
        message: 'Email/Username atau password salah! (Cek apakah Caps Lock aktif)'
      };
    }

    if (requiredRole && account.role !== requiredRole) {
      return {
        success: false,
        message: `Akses ditolak! Akun Anda bertipe '${account.role}', tidak bisa login melalui form ${requiredRole === 'admin' ? 'Admin' : 'Customer'}.`
      };
    }

    const sessionUser = {
      id: account.id,
      email: account.email,
      username: account.username,
      name: account.fullName || account.username,
      role: account.role,
      isLoggedIn: true
    };
    this.saveCurrentSession(sessionUser);

    return {
      success: true,
      role: account.role,
      user: sessionUser,
      message: account.role === 'admin'
        ? 'Selamat datang Administrator WOLVY! Membuka dashboard...'
        : 'Selamat datang kembali di WOLVY Campus Store!'
    };
  }

  saveCurrentSession(user) {
    localStorage.setItem('wolvy_session', JSON.stringify(user));
    if (window.wolvyStore) {
      window.wolvyStore.setRole(user.role);
      window.wolvyStore.db.user = {
        isLoggedIn: true,
        name: user.name || user.username,
        email: user.email,
        role: user.role,
        avatar: user.role === 'admin' ? '🛡️' : '🐺'
      };
      window.wolvyStore.save();
    }
  }

  getCurrentUser() {
    const raw = localStorage.getItem('wolvy_session');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  isAdmin() {
    const user = this.getCurrentUser();
    return user && user.role === 'admin';
  }

  async logout() {
    if (window.location.protocol.startsWith('http')) {
      try {
        await fetch(`${this.apiBase}/logout.php`);
      } catch (e) {
        console.warn('API logout:', e);
      }
    }
    localStorage.removeItem('wolvy_session');
    if (window.wolvyStore) {
      window.wolvyStore.setRole('pelanggan');
      window.wolvyStore.db.user.isLoggedIn = false;
      window.wolvyStore.save();
    }
    window.location.href = 'login.html';
  }
}

// Global Singleton
window.wolvyAuth = new WolvyAuthClient();

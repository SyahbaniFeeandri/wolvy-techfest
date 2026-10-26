/**
 * ==============================================================================
 * WOLVY CAMPUS STREETWEAR — SUPABASE CLIENT & AUTH HELPER
 * ==============================================================================
 * File ini menangani koneksi backend ke Supabase untuk:
 * 1. Pendaftaran Customer (Email, Username, Password)
 * 2. Login Customer & Admin (Validasi Role Admin vs Pelanggan)
 * 3. Fallback Offline/Mock jika API Key Supabase belum diisi pengguna
 * ==============================================================================
 */

// Ganti nilai di bawah ini dengan Project URL dan Anon Key dari dashboard Supabase Anda:
const SUPABASE_CONFIG = {
  url: 'https://xyzcompany.supabase.co', // Contoh: https://abcdefghijklm.supabase.co
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5eiIsInJvbGUiOiJhbW9uIiwiaWF0IjoxNj...YOUR_ANON_KEY_HERE'
};

class WolvyAuthService {
  constructor() {
    this.client = null;
    this.isConfigured = false;
    this.init();
  }

  init() {
    // Cek apakah key sudah diisi pengguna (bukan default placeholder)
    if (
      SUPABASE_CONFIG.url &&
      !SUPABASE_CONFIG.url.includes('xyzcompany') &&
      SUPABASE_CONFIG.anonKey &&
      !SUPABASE_CONFIG.anonKey.includes('YOUR_ANON_KEY')
    ) {
      if (window.supabase) {
        try {
          this.client = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
          this.isConfigured = true;
          console.log('⚡ [WOLVY Backend] Supabase Client Connected Successfully!');
        } catch (err) {
          console.warn('⚠️ [WOLVY Backend] Gagal inisialisasi Supabase, beralih ke Mock Auth Store:', err);
          this.isConfigured = false;
        }
      } else {
        console.warn('⚠️ [WOLVY Backend] Library @supabase/supabase-js belum dimuat di HTML.');
      }
    } else {
      console.info('ℹ️ [WOLVY Backend] Mode Local Fallback aktif. Masukkan Supabase URL & Anon Key di supabase-client.js untuk koneksi Cloud.');
    }

    // Inisialisasi Mock Accounts di localStorage jika belum ada
    this.initMockAccounts();
  }

  initMockAccounts() {
    const existing = localStorage.getItem('wolvy_mock_accounts');
    if (!existing) {
      const defaultAccounts = [
        {
          id: 'admin-001',
          email: 'admin@wolvy.store',
          username: 'admin',
          password: 'password123',
          role: 'admin',
          fullName: 'Super Administrator WOLVY'
        },
        {
          id: 'user-001',
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
   * Pendaftaran Customer (Email, Username, Password)
   */
  async register({ email, username, password, fullName = '' }) {
    username = username.trim().toLowerCase();
    email = email.trim().toLowerCase();

    // 1. Jika terhubung ke Supabase Live
    if (this.isConfigured && this.client) {
      try {
        const { data, error } = await this.client.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              username: username,
              full_name: fullName || username,
              role: 'pelanggan'
            }
          }
        });

        if (error) throw error;

        // Sync local session
        const sessionUser = {
          id: data.user?.id || 'sb-' + Date.now(),
          email: email,
          username: username,
          role: 'pelanggan',
          name: fullName || username,
          isLoggedIn: true
        };
        this.saveCurrentSession(sessionUser);

        return {
          success: true,
          message: 'Pendaftaran berhasil di Supabase! Cek email untuk verifikasi (jika diaktifkan) atau langsung masuk.',
          user: sessionUser
        };
      } catch (err) {
        console.error('Supabase Sign Up Error:', err);
        return {
          success: false,
          message: err.message || 'Pendaftaran gagal di Supabase'
        };
      }
    }

    // 2. Mode Mock Local
    const accounts = this.getMockAccounts();
    const emailExists = accounts.some(acc => acc.email === email);
    if (emailExists) {
      return { success: false, message: 'Email tersebut sudah terdaftar! Silakan login.' };
    }

    const usernameExists = accounts.some(acc => acc.username === username);
    if (usernameExists) {
      return { success: false, message: 'Username sudah digunakan, pilih username lain.' };
    }

    const newAccount = {
      id: 'usr-' + Date.now(),
      email,
      username,
      password,
      role: 'pelanggan',
      fullName: fullName || username
    };

    accounts.push(newAccount);
    this.saveMockAccounts(accounts);

    // Otomatis login ke sesi
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
      message: 'Akun berhasil dibuat! Selamat datang di WOLVY Campus Store.',
      user: sessionUser
    };
  }

  /**
   * Login Umum (Bisa dengan Email atau Username)
   */
  async login(identifier, password, requiredRole = null) {
    identifier = identifier.trim().toLowerCase();

    // 1. Jika terhubung ke Supabase Live
    if (this.isConfigured && this.client) {
      try {
        let emailToLogin = identifier;

        // Jika user mengetikkan username, cari email-nya di tabel profiles
        if (!identifier.includes('@')) {
          const { data: profile, error: pErr } = await this.client
            .from('profiles')
            .select('email, role')
            .eq('username', identifier)
            .single();

          if (pErr || !profile) {
            return { success: false, message: 'Username tidak ditemukan di database!' };
          }
          emailToLogin = profile.email;
        }

        const { data, error } = await this.client.auth.signInWithPassword({
          email: emailToLogin,
          password: password
        });

        if (error) throw error;

        // Ambil profil untuk mendapatkan role
        const { data: userProfile } = await this.client
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        const role = userProfile?.role || data.user.user_metadata?.role || 'pelanggan';

        if (requiredRole && role !== requiredRole) {
          await this.client.auth.signOut();
          return {
            success: false,
            message: `Akses ditolak! Halaman ini khusus untuk ${requiredRole === 'admin' ? 'Administrator' : 'Customer'}.`
          };
        }

        const sessionUser = {
          id: data.user.id,
          email: data.user.email,
          username: userProfile?.username || data.user.user_metadata?.username || split_email(data.user.email),
          name: userProfile?.full_name || data.user.user_metadata?.full_name || 'Member WOLVY',
          role: role,
          isLoggedIn: true
        };
        this.saveCurrentSession(sessionUser);

        return {
          success: true,
          role: role,
          user: sessionUser,
          message: 'Login Supabase berhasil!'
        };
      } catch (err) {
        console.error('Supabase Login Error:', err);
        return {
          success: false,
          message: err.message || 'Kombinasi email/username dan password salah!'
        };
      }
    }

    // 2. Mode Mock Local
    const accounts = this.getMockAccounts();
    const account = accounts.find(
      acc => (acc.email === identifier || acc.username === identifier) && acc.password === password
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
        message: `Akses ditolak! Akun ini bertipe '${account.role}', tidak bisa login melalui form ${requiredRole === 'admin' ? 'Admin' : 'Customer'}.`
      };
    }

    const sessionUser = {
      id: account.id,
      email: account.email,
      username: account.username,
      name: account.fullName,
      role: account.role,
      isLoggedIn: true
    };
    this.saveCurrentSession(sessionUser);

    return {
      success: true,
      role: account.role,
      user: sessionUser,
      message: 'Login berhasil!'
    };
  }

  saveCurrentSession(user) {
    localStorage.setItem('wolvy_session', JSON.stringify(user));
    // Sinkronkan ke wolvyStore jika ada
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
    if (this.isConfigured && this.client) {
      try {
        await this.client.auth.signOut();
      } catch (e) {
        console.warn('Supabase sign out:', e);
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

// Inisialisasi Singleton Global
window.wolvyAuth = new WolvyAuthService();

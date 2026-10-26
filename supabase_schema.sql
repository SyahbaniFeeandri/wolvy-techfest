-- ==============================================================================
-- WOLVY CAMPUS STREETWEAR — SUPABASE BACKEND SCHEMA
-- Dijalankan pada: Supabase Dashboard -> SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. Buat Tabel PROFILES (Menyimpan Metadata User & Role)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'pelanggan' CHECK (role IN ('pelanggan', 'admin')),
  avatar_url TEXT DEFAULT '🐺',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Aktifkan Row Level Security (RLS) pada profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy Profiles: Siapapun yang terautentikasi bisa membaca profile publik
CREATE POLICY "Public profiles are viewable by everyone." 
  ON public.profiles FOR SELECT 
  USING (true);

-- Policy Profiles: User hanya bisa update profile miliknya sendiri
CREATE POLICY "Users can update their own profile." 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- 2. Buat Trigger Otomatis: Saat User Baru Register di Auth, Tambahkan ke public.profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, username, full_name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'role', 'pelanggan')
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    username = EXCLUDED.username;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Pasang Trigger ke auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- 3. Buat Tabel PRODUCTS (Katalog Merchandise WOLVY)
CREATE TABLE IF NOT EXISTS public.products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  stock INTEGER NOT NULL DEFAULT 10,
  rating NUMERIC DEFAULT 4.9,
  reviews INTEGER DEFAULT 0,
  badge TEXT,
  image TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Siapapun (pengunjung & pelanggan) bisa melihat produk
CREATE POLICY "Products are viewable by everyone" 
  ON public.products FOR SELECT 
  USING (true);

-- Hanya ADMIN yang boleh INSERT, UPDATE, dan DELETE produk
CREATE POLICY "Admins can insert products" 
  ON public.products FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update products" 
  ON public.products FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete products" 
  ON public.products FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );


-- 4. Buat Tabel ORDERS (Transaksi Pesanan Pelanggan)
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  items JSONB NOT NULL,
  total_amount NUMERIC NOT NULL,
  shipping_method TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'DIPROSES' CHECK (status IN ('MENUNGGU_BAYAR', 'DIPROSES', 'DIKIRIM', 'SELESAI', 'DIBATALKAN')),
  pickup_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Pengguna bisa melihat pesanan milik mereka sendiri, atau Admin bisa melihat semua pesanan
CREATE POLICY "Users can view own orders, admin can view all" 
  ON public.orders FOR SELECT 
  USING (
    auth.uid() = user_id 
    OR EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Pengguna terautentikasi atau pengunjung checkout bisa membuat order
CREATE POLICY "Anyone can create orders" 
  ON public.orders FOR INSERT 
  WITH CHECK (true);

-- Hanya Admin yang boleh update status pesanan
CREATE POLICY "Admins can update orders status" 
  ON public.orders FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );


-- 5. Seed Data Awal Produk WOLVY (Contoh Koleksi)
INSERT INTO public.products (id, name, category, price, stock, rating, reviews, badge, image, description)
VALUES
  (1, 'Cyber Wolf Heavyweight Oversized Hoodie', 'hoodie', 289000, 24, 4.9, 142, 'BEST SELLER', 'assets/hoodie.png', 'Hoodie oversized 375 GSM cotton fleece dengan sablon puff grafis serigala neon cyber. Nyaman untuk nongkrong di selasar kampus & ruang kuliah ber-AC.'),
  (2, 'Midnight Trackpants Techwear Jogger', 'pants', 249000, 15, 4.8, 89, 'TRENDING', 'assets/tshirt.png', 'Jogger cargo pants fungsional dengan saku multifungsi, buckle magnetis, dan material quick-dry anti kusut.'),
  (3, 'Campus Rebel Signature Varsity Jacket', 'jacket', 389000, 8, 5.0, 64, 'EXCLUSIVE DROP', 'assets/varsity.png', 'Varsity jacket wol sintetis premium kombinasi kulit vegan sleeve, emblem bordir timbul WOLVY Athletics edisi terbatas.'),
  (4, 'Neon Pulse Heavy Cotton Graphic Tee', 'tshirt', 149000, 30, 4.9, 112, 'NEW ARRIVAL', 'assets/tshirt.png', 'Kaos 24s combed tebal tahan cuci berulang, potongan drop-shoulder pas untuk outfit harian kuliah.')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  stock = EXCLUDED.stock;

-- ==============================================================================
-- SELESAI. Tabel profiles, products, dan orders siap digunakan!
-- ==============================================================================

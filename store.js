/**
 * WOLVY — Shared State & Database Store
 * Implements client-side database simulation with localStorage
 * Supports full PRD lifecycle: Products, Variants, Stock, Cart, Orders, Admin, Auth
 */

const WOLVY_STORAGE_KEY = 'wolvy_db_v1';

// Initial Mock Data conforming to PRD Seed Data & Reference Images
const initialDatabase = {
  user: {
    isLoggedIn: true,
    name: "Aulia Rahma",
    email: "aulia.rahma@kampus.ac.id",
    role: "pelanggan", // 'pelanggan' | 'admin'
    faculty: "Fakultas Ilmu Komputer (FIK)",
    avatar: "🐺"
  },
  products: [
    {
      id: 1,
      name: "Varsity Jacket Purple Edition",
      category: "apparel",
      price: 399000,
      stock: 24,
      rating: 4.8,
      reviewsCount: 104,
      image: "assets/prod_varsity.png",
      description: "Varsity jacket edisi khusus kampus dengan desain modern dan bahan fleece cotton premium yang tebal namun sejuk digunakan saat kuliah maupun kegiatan ormawa.",
      badge: "Best Seller",
      variants: [
        { color: "Purple", hex: "#4B287D", sizes: ["S", "M", "L", "XL", "XXL"] },
        { color: "Navy", hex: "#1C2A4A", sizes: ["M", "L", "XL"] },
        { color: "Black", hex: "#111111", sizes: ["S", "M", "L"] }
      ]
    },
    {
      id: 2,
      name: "Tote Bag Campus",
      category: "accessories",
      price: 139000,
      stock: 45,
      rating: 4.8,
      reviewsCount: 95,
      image: "assets/prod_tote_bag.png",
      description: "Tote bag bahan heavy canvas tebal tahan air dilengkapi kompartemen laptop 14 inch dan resleting anti-macet berlogo grafiti Wolvy.",
      badge: "Populer",
      variants: [
        { color: "Off-White", hex: "#F3EFE6", sizes: ["All Size"] },
        { color: "Black", hex: "#111111", sizes: ["All Size"] }
      ]
    },
    {
      id: 3,
      name: "Cap Classic Navy",
      category: "accessories",
      price: 149000,
      stock: 30,
      rating: 4.9,
      reviewsCount: 88,
      image: "assets/prod_cap_navy.png",
      description: "Topi baseball 6-panel bahan katun twill premium dengan bordir 3D kepala serigala Wolvy dan strap gesper besi yang dapat diatur ukurannya.",
      badge: "Trending",
      variants: [
        { color: "Navy", hex: "#1C2A4A", sizes: ["Adjustable"] },
        { color: "Black", hex: "#111111", sizes: ["Adjustable"] }
      ]
    },
    {
      id: 4,
      name: "Hoodie Wolf Logo Black",
      category: "apparel",
      price: 299000,
      stock: 18,
      rating: 4.8,
      reviewsCount: 110,
      image: "assets/prod_hoodie_black.png",
      description: "Hoodie streetwear oversized bahan Cotton Fleece 330gsm dengan sablon plastisol high-density logo Wolvy di dada dan motif petir di lengan.",
      badge: "Limited",
      variants: [
        { color: "Black", hex: "#111111", sizes: ["S", "M", "L", "XL"] },
        { color: "Navy", hex: "#1C2A4A", sizes: ["M", "L", "XL"] }
      ]
    },
    {
      id: 5,
      name: "Notebook Campus Wolvy",
      category: "stationery",
      price: 89000,
      stock: 50,
      rating: 4.7,
      reviewsCount: 42,
      image: "assets/prod_notebook.png",
      description: "Buku catatan hardcover bergaris 160 halaman kertas bookpaper 80gsm ramah mata untuk mencatat materi kuliah dan ide organisasi.",
      badge: "New",
      variants: [
        { color: "Purple", hex: "#4B287D", sizes: ["A5"] }
      ]
    },
    {
      id: 6,
      name: "Tumbler Wolf Stainless",
      category: "stationery",
      price: 129000,
      stock: 35,
      rating: 4.9,
      reviewsCount: 67,
      image: "assets/prod_tumbler.png",
      description: "Tumbler vacuum insulated 500ml tahan panas/dingin hingga 12 jam dengan finishing matte ungu dan logo laser-engraved Wolvy.",
      badge: "Eco-Friendly",
      variants: [
        { color: "Deep Purple", hex: "#3B1566", sizes: ["500ml"] }
      ]
    },
    {
      id: 7,
      name: "Keychain Acrylic Wolvy",
      category: "accessories",
      price: 49000,
      stock: 80,
      rating: 4.8,
      reviewsCount: 54,
      image: "assets/prod_keychain.png",
      description: "Gantungan kunci akrilik double-sided 3mm dengan ring tebal dan charm mini petir kuning neon khas Wolvy.",
      badge: "Add-on",
      variants: [
        { color: "Clear Purple", hex: "#CDB8F4", sizes: ["Standard"] }
      ]
    },
    {
      id: 8,
      name: "Pouch Campus Wolvy",
      category: "accessories",
      price: 119000,
      stock: 25,
      rating: 4.7,
      reviewsCount: 31,
      image: "assets/prod_pouch.png",
      description: "Pouch serbaguna untuk alat tulis, charger, powerbank, dan printilan kuliah sehari-hari dengan lapisan busa pelindung.",
      badge: "Organized",
      variants: [
        { color: "Navy", hex: "#1C2A4A", sizes: ["Medium"] }
      ]
    },
    {
      id: 9,
      name: "Stationery Set Campus Pack",
      category: "stationery",
      price: 99000,
      stock: 40,
      rating: 4.8,
      reviewsCount: 38,
      image: "assets/prod_stationery_set.png",
      description: "Paket lengkap alat tulis mahasiswa berisi notebook, bolpoin gel, highlighter neon, dan sticker pack Wolvy.",
      badge: "Bundle",
      variants: [
        { color: "Campus Yellow/Purple", hex: "#E8FF38", sizes: ["Set"] }
      ]
    },
    {
      id: 10,
      name: "Laptop Sleeve 14 Inch",
      category: "accessories",
      price: 169000,
      stock: 22,
      rating: 4.9,
      reviewsCount: 47,
      image: "assets/prod_laptop_sleeve.png",
      description: "Sarung laptop bahan neoprene tahan benturan dan cipratan air dengan saku depan untuk mouse dan kabel charger.",
      badge: "Protection",
      variants: [
        { color: "Dark Purple", hex: "#25123F", sizes: ["13-14 Inch"] }
      ]
    },
    {
      id: 11,
      name: "T-Shirt Faculty Streetwear",
      category: "apparel",
      price: 149000,
      stock: 60,
      rating: 4.8,
      reviewsCount: 89,
      image: "assets/prod_tshirt.png",
      description: "Kaos oblong unisex bahan Cotton Combed 24s gramasi tebal berpotongan regular-oversized dengan grafis streetwear kampus.",
      badge: "Daily Essential",
      variants: [
        { color: "Black", hex: "#111111", sizes: ["S", "M", "L", "XL", "XXL"] }
      ]
    },
    {
      id: 12,
      name: "Custom Jersey Angkatan",
      category: "custom",
      price: 249000,
      stock: 30,
      rating: 4.9,
      reviewsCount: 63,
      image: "assets/prod_jersey.png",
      description: "Jersey sporty bahan dry-fit milano berpori sejuk yang bisa dicustom nama mahasiswa, nomor punggung, dan logo jurusan/angkatan.",
      badge: "Custom Order",
      variants: [
        { color: "Black-Yellow", hex: "#1A0B2E", sizes: ["S", "M", "L", "XL"] }
      ]
    }
  ],
  cart: [
    {
      id: 1,
      productId: 1,
      name: "Varsity Jacket Purple Edition",
      price: 399000,
      qty: 1,
      size: "M",
      color: "Purple",
      image: "assets/prod_varsity.png"
    },
    {
      id: 2,
      productId: 2,
      name: "Tote Bag Campus",
      price: 139000,
      qty: 1,
      size: "All Size",
      color: "Off-White",
      image: "assets/prod_tote_bag.png"
    },
    {
      id: 3,
      productId: 5,
      name: "Notebook Campus Wolvy",
      price: 89000,
      qty: 1,
      size: "A5",
      color: "Purple",
      image: "assets/prod_notebook.png"
    }
  ],
  wishlist: [1, 3, 4, 6],
  orders: [
    {
      orderId: "ORD20250012",
      date: "12 Mei 2025",
      status: "DIPROSES", // DIPROSES | DIKIRIM | SELESAI | DIBATALKAN
      items: [
        { name: "Varsity Jacket Purple Edition", qty: 1, price: 399000, size: "M", image: "assets/prod_varsity.png" },
        { name: "Cap Classic Navy", qty: 1, price: 149000, size: "Adjustable", image: "assets/prod_cap_navy.png" },
        { name: "Keychain Acrylic", qty: 1, price: 49000, size: "Standard", image: "assets/prod_keychain.png" }
      ],
      total: 597000,
      paymentMethod: "QRIS Instan",
      pickupLocation: "Sekretariat BEM Gedung Mahasiswa Lantai 1"
    },
    {
      orderId: "ORD20250108",
      date: "8 Mei 2025",
      status: "DIKIRIM",
      items: [
        { name: "Hoodie Wolf Logo Black", qty: 1, price: 299000, size: "L", image: "assets/prod_hoodie_black.png" }
      ],
      total: 299000,
      paymentMethod: "Bank Transfer BCA Virtual Account",
      pickupLocation: "Pickup Kampus - Pos Satpam Depan"
    },
    {
      orderId: "ORD20250428",
      date: "28 Apr 2025",
      status: "SELESAI",
      items: [
        { name: "Tote Bag Campus", qty: 1, price: 139000, size: "All Size", image: "assets/prod_tote_bag.png" }
      ],
      total: 139000,
      paymentMethod: "GoPay / E-Wallet",
      pickupLocation: "Pickup Kampus - Perpustakaan Pusat"
    },
    {
      orderId: "ORD20250415",
      date: "15 Apr 2025",
      status: "SELESAI",
      items: [
        { name: "Custom Jersey Angkatan", qty: 2, price: 249000, size: "L, XL", image: "assets/prod_jersey.png" }
      ],
      total: 498000,
      paymentMethod: "QRIS",
      pickupLocation: "Sekretariat Jurusan Informatika"
    }
  ],
  savedLooks: [
    {
      id: 1,
      title: "Varsity Jacket Purple Edition Look",
      date: "12 Apr 2025",
      image: "assets/tryon_girl.png",
      tag: "Campus Look"
    },
    {
      id: 2,
      title: "Hoodie Wolf Logo Daily",
      date: "10 Apr 2025",
      image: "assets/prod_hoodie_black.png",
      tag: "Casual Look"
    },
    {
      id: 3,
      title: "T-Shirt Streetwear Look",
      date: "8 Apr 2025",
      image: "assets/prod_tshirt.png",
      tag: "Streetwear"
    }
  ]
};

// Store Manager
class WolvyStore {
  constructor() {
    this.init();
  }

  init() {
    const saved = localStorage.getItem(WOLVY_STORAGE_KEY);
    if (!saved) {
      this.db = initialDatabase;
      this.save();
    } else {
      try {
        this.db = JSON.parse(saved);
      } catch (e) {
        this.db = initialDatabase;
        this.save();
      }
    }
  }

  save() {
    localStorage.setItem(WOLVY_STORAGE_KEY, JSON.stringify(this.db));
    window.dispatchEvent(new Event('wolvy_store_updated'));
  }

  // --- Products ---
  getProducts() {
    return this.db.products || [];
  }

  getProductById(id) {
    return this.getProducts().find(p => p.id === Number(id));
  }

  updateProductStock(productId, delta) {
    const product = this.getProductById(productId);
    if (product) {
      product.stock = Math.max(0, product.stock + delta);
      this.save();
      return product.stock;
    }
    return 0;
  }

  addProduct(newProduct) {
    const id = Date.now();
    this.db.products.unshift({ id, ...newProduct });
    this.save();
    return id;
  }

  deleteProduct(id) {
    this.db.products = this.db.products.filter(p => p.id !== Number(id));
    this.save();
  }

  // --- Cart ---
  getCart() {
    return this.db.cart || [];
  }

  getCartCount() {
    return this.getCart().reduce((acc, item) => acc + item.qty, 0);
  }

  getCartSubtotal() {
    return this.getCart().reduce((acc, item) => acc + (item.price * item.qty), 0);
  }

  addToCart(product, size = "M", color = "Standard", qty = 1) {
    const existing = this.db.cart.find(item => item.productId === product.id && item.size === size);
    if (existing) {
      existing.qty += qty;
    } else {
      this.db.cart.push({
        id: Date.now(),
        productId: product.id,
        name: product.name,
        price: product.price,
        qty,
        size,
        color,
        image: product.image
      });
    }
    this.save();
  }

  updateCartQty(cartItemId, qty) {
    const item = this.db.cart.find(i => i.id === Number(cartItemId));
    if (item) {
      item.qty = qty;
      if (item.qty <= 0) {
        this.removeFromCart(cartItemId);
      } else {
        this.save();
      }
    }
  }

  removeFromCart(cartItemId) {
    this.db.cart = this.db.cart.filter(i => i.id !== Number(cartItemId));
    this.save();
  }

  clearCart() {
    this.db.cart = [];
    this.save();
  }

  // --- Wishlist ---
  getWishlist() {
    return this.db.wishlist || [];
  }

  toggleWishlist(productId) {
    const id = Number(productId);
    const index = this.db.wishlist.indexOf(id);
    let added = false;
    if (index > -1) {
      this.db.wishlist.splice(index, 1);
    } else {
      this.db.wishlist.push(id);
      added = true;
    }
    this.save();
    return added;
  }

  isInWishlist(productId) {
    return this.getWishlist().includes(Number(productId));
  }

  // --- Orders ---
  getOrders() {
    return this.db.orders || [];
  }

  createOrder(orderData) {
    const orderId = `ORD${Date.now().toString().slice(-6)}`;
    const newOrder = {
      orderId,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: "DIPROSES",
      ...orderData
    };
    this.db.orders.unshift(newOrder);

    // Reduce stock according to PRD rule
    if (orderData.items) {
      orderData.items.forEach(item => {
        if (item.productId) {
          this.updateProductStock(item.productId, -item.qty);
        }
      });
    }

    this.clearCart();
    this.save();
    return newOrder;
  }

  updateOrderStatus(orderId, newStatus) {
    const order = this.db.orders.find(o => o.orderId === orderId);
    if (order) {
      order.status = newStatus;
      this.save();
      return true;
    }
    return false;
  }

  // --- User / Role (PRD Demo Account) ---
  getUser() {
    return this.db.user;
  }

  setRole(newRole) {
    this.db.user.role = newRole; // 'pelanggan' | 'admin'
    this.save();
  }

  formatPrice(num) {
    return 'Rp ' + Number(num).toLocaleString('id-ID');
  }
}

// Global store instance
window.wolvyStore = new WolvyStore();

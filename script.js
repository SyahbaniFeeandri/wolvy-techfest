/**
 * WOLVY — Campus Streetwear E-Commerce
 * Interactive Logic & Demonstration Scripts
 * Conforms to PRD WOLVY (FR-01 to FR-14)
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==================== STATE MANAGEMENT ====================
  const state = {
    cart: [
      { id: 1, name: "Varsity Jacket Purple Edition", price: 399000, qty: 1, variant: "Ukuran: M · Warna: Purple", img: "assets/p_varsity.png" },
      { id: 2, name: "Tote Bag Campus", price: 139000, qty: 1, variant: "Warna: Off-White", img: "assets/p_totebag.png" }
    ],
    wishlist: [1, 3, 4],
    currentRole: "pelanggan", // 'pelanggan' | 'admin'
    webcamActive: false,
    webcamStream: null
  };

  // Helper: Format Rupiah
  const formatRupiah = (num) => {
    return 'Rp ' + Number(num).toLocaleString('id-ID');
  };

  // Helper: Show Toast Notification
  const showToast = (message, icon = '🐺') => {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  // ==================== NAVBAR & SCROLL BEHAVIOR ====================
  const mainHeader = document.getElementById('mainHeader');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    if (mainHeader) {
      if (window.scrollY > 40) {
        mainHeader.classList.add('scrolled');
      } else {
        mainHeader.classList.remove('scrolled');
      }
    }
  });

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
    });

    // Close mobile menu on link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
      });
    });
  }

  // ==================== LIVE COUNTDOWN TIMER (Campus Drop) ====================
  // Calculate target date (3 days from now)
  const countdownTarget = new Date();
  countdownTarget.setDate(countdownTarget.getDate() + 3);
  countdownTarget.setHours(countdownTarget.getHours() + 12);
  countdownTarget.setMinutes(countdownTarget.getMinutes() + 45);

  const cdDays = document.getElementById('cdDays');
  const cdHours = document.getElementById('cdHours');
  const cdMins = document.getElementById('cdMins');
  const cdSecs = document.getElementById('cdSecs');

  function updateCountdown() {
    const now = new Date();
    const diff = countdownTarget - now;

    if (diff <= 0) {
      if (cdDays) cdDays.textContent = '00';
      if (cdHours) cdHours.textContent = '00';
      if (cdMins) cdMins.textContent = '00';
      if (cdSecs) cdSecs.textContent = '00';
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    if (cdDays) cdDays.textContent = String(d).padStart(2, '0');
    if (cdHours) cdHours.textContent = String(h).padStart(2, '0');
    if (cdMins) cdMins.textContent = String(m).padStart(2, '0');
    if (cdSecs) cdSecs.textContent = String(s).padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // ==================== CATEGORY FILTERING ====================
  const categoryCards = document.querySelectorAll('.category-card');
  const chipBtns = document.querySelectorAll('.chip-btn');
  const productCards = document.querySelectorAll('.product-card');

  function filterProducts(category) {
    productCards.forEach(card => {
      const cat = card.getAttribute('data-cat');
      if (category === 'all' || cat === category) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  chipBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      chipBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      filterProducts(filter);
    });
  });

  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.getAttribute('data-category');
      // Scroll to bestseller
      const target = document.getElementById('bestseller');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      // Match chip if exists
      chipBtns.forEach(b => {
        if (b.getAttribute('data-filter') === cat) {
          b.click();
        }
      });
      showToast(`Menampilkan kategori: ${card.querySelector('.category-label').textContent}`);
    });
  });

  // ==================== WISHLIST ACTIONS ====================
  const wishlistBtn = document.getElementById('wishlistBtn');
  const wishlistCount = document.getElementById('wishlistCount');
  const wishlistTriggers = document.querySelectorAll('.btn-wishlist');

  function updateWishlistBadge() {
    if (wishlistCount) {
      wishlistCount.textContent = state.wishlist.length;
    }
  }

  wishlistTriggers.forEach(btn => {
    const id = Number(btn.getAttribute('data-id'));
    if (state.wishlist.includes(id)) {
      btn.classList.add('active');
    }

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const index = state.wishlist.indexOf(id);
      if (index > -1) {
        state.wishlist.splice(index, 1);
        btn.classList.remove('active');
        showToast('Dihapus dari Wishlist', '🤍');
      } else {
        state.wishlist.push(id);
        btn.classList.add('active');
        showToast('Ditambahkan ke Wishlist!', '❤️');
      }
      updateWishlistBadge();
    });
  });

  // ==================== CART DRAWER & LOGIC ====================
  const cartBtn = document.getElementById('cartBtn');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartCloseBtn = document.getElementById('cartCloseBtn');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartBadge = document.getElementById('cartBadge');
  const cartDrawerCount = document.getElementById('cartDrawerCount');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const cartTotalPrice = document.getElementById('cartTotalPrice');
  const checkoutBtn = document.getElementById('checkoutBtn');

  function openCart() {
    if (cartDrawer) {
      cartDrawer.classList.add('open');
      cartDrawer.setAttribute('aria-hidden', 'false');
    }
  }

  function closeCart() {
    if (cartDrawer) {
      cartDrawer.classList.remove('open');
      cartDrawer.setAttribute('aria-hidden', 'true');
    }
  }

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);

  function renderCart() {
    if (!cartItemsList) return;
    cartItemsList.innerHTML = '';

    let subtotal = 0;
    let totalItems = 0;

    if (state.cart.length === 0) {
      cartItemsList.innerHTML = `
        <div style="text-align: center; padding: 40px 0; color: #B7A8D8;">
          <div style="font-size: 3rem; margin-bottom: 12px;">🛍️</div>
          <p style="font-weight: 700;">Keranjang Belanjamu Masih Kosong</p>
          <p style="font-size: 0.85rem; margin-top: 6px;">Yuk pilih merchandise kampus favoritmu!</p>
        </div>
      `;
    } else {
      state.cart.forEach(item => {
        subtotal += item.price * item.qty;
        totalItems += item.qty;

        const el = document.createElement('div');
        el.className = 'cart-item';
        el.setAttribute('data-id', item.id);
        el.innerHTML = `
          <img src="${item.img}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.name}</h4>
            <span class="cart-item-variant">${item.variant}</span>
            <div class="cart-item-price">${formatRupiah(item.price)}</div>
            <div class="qty-control">
              <button class="qty-btn qty-minus" data-id="${item.id}">-</button>
              <span class="qty-val">${item.qty}</span>
              <button class="qty-btn qty-plus" data-id="${item.id}">+</button>
            </div>
          </div>
          <button class="cart-item-remove" data-id="${item.id}" title="Hapus Item">&times;</button>
        `;
        cartItemsList.appendChild(el);
      });
    }

    if (cartBadge) cartBadge.textContent = totalItems;
    if (cartDrawerCount) cartDrawerCount.textContent = `${totalItems} Item`;
    if (cartSubtotal) cartSubtotal.textContent = formatRupiah(subtotal);
    if (cartTotalPrice) cartTotalPrice.textContent = formatRupiah(subtotal);
  }

  // Cart Qty & Remove delegate
  if (cartItemsList) {
    cartItemsList.addEventListener('click', (e) => {
      const plusBtn = e.target.closest('.qty-plus');
      const minusBtn = e.target.closest('.qty-minus');
      const removeBtn = e.target.closest('.cart-item-remove');

      if (plusBtn) {
        const id = Number(plusBtn.getAttribute('data-id'));
        const item = state.cart.find(i => i.id === id);
        if (item) {
          item.qty++;
          renderCart();
        }
      } else if (minusBtn) {
        const id = Number(minusBtn.getAttribute('data-id'));
        const item = state.cart.find(i => i.id === id);
        if (item) {
          if (item.qty > 1) {
            item.qty--;
          } else {
            state.cart = state.cart.filter(i => i.id !== id);
            showToast('Item dihapus dari keranjang');
          }
          renderCart();
        }
      } else if (removeBtn) {
        const id = Number(removeBtn.getAttribute('data-id'));
        state.cart = state.cart.filter(i => i.id !== id);
        showToast('Item dihapus dari keranjang');
        renderCart();
      }
    });
  }

  // Add to Cart buttons
  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = Number(btn.getAttribute('data-id'));
      const name = btn.getAttribute('data-name');
      const price = Number(btn.getAttribute('data-price'));
      const img = btn.getAttribute('data-img');

      const existing = state.cart.find(i => i.id === id);
      if (existing) {
        existing.qty++;
      } else {
        state.cart.push({
          id,
          name,
          price,
          qty: 1,
          variant: "Ukuran: L · Warna: Asli",
          img
        });
      }

      renderCart();
      showToast(`${name} berhasil ditambah ke keranjang!`, '🛒');
      openCart();
    });
  });

  // Checkout Simulation (PRD FR-06, FR-07)
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (state.cart.length === 0) {
        showToast('Keranjang masih kosong!', '⚠️');
        return;
      }
      
      const total = cartTotalPrice.textContent;
      closeCart();
      
      // Show simulated checkout modal
      const modal = document.createElement('div');
      modal.className = 'modal open';
      modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-dialog" style="max-width: 500px; padding: 32px 28px; text-align: center;">
          <div style="font-size: 2.8rem; margin-bottom: 8px;">💳</div>
          <span class="badge-pill-neon" style="margin-bottom: 12px;">SIMULASI CHECKOUT DEMO</span>
          <h3 style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 800; margin-bottom: 6px;">
            Konfirmasi Pesanan Kampus
          </h3>
          <p style="font-size: 0.88rem; color: #B7A8D8; margin-bottom: 20px;">
            Total Tagihan: <strong style="color: var(--color-neon-yellow); font-size: 1.15rem;">${total}</strong>
          </p>
          
          <div style="background: rgba(255,255,255,0.06); padding: 16px; border-radius: 12px; margin-bottom: 20px; text-align: left; font-size: 0.82rem; color: #EFEAFF;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span>Metode:</span>
              <strong style="color: var(--color-neon-yellow);">QRIS Instan / GoPay / VA</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span>Pengiriman:</span>
              <strong>Pickup di Kampus (Sekretariat BEM)</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Status Stok:</span>
              <span style="color: #10B981;">Tervalidasi &amp; Aman</span>
            </div>
          </div>

          <div style="display: flex; gap: 12px;">
            <button class="btn btn-outline" id="cancelPayBtn" style="flex: 1;">Batal</button>
            <button class="btn btn-primary" id="confirmPayBtn" style="flex: 1;">Bayar Sekarang &rarr;</button>
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      modal.querySelector('#cancelPayBtn').addEventListener('click', () => {
        modal.remove();
      });

      modal.querySelector('#confirmPayBtn').addEventListener('click', () => {
        modal.innerHTML = `
          <div class="modal-backdrop"></div>
          <div class="modal-dialog" style="max-width: 440px; padding: 36px 28px; text-align: center;">
            <div style="font-size: 3.5rem; margin-bottom: 12px; animation: pulse 1.5s infinite;">🎉</div>
            <h3 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; color: var(--color-neon-yellow); margin-bottom: 8px;">
              Pembayaran Demo Berhasil!
            </h3>
            <p style="font-size: 0.88rem; color: #CDB8F4; margin-bottom: 20px;">
              Nomor Pesanan: <strong>#ORD-${Math.floor(100000 + Math.random() * 900000)}</strong><br>
              Status: <span class="badge-pill" style="margin-top: 6px;">PAID / DIPROSES</span>
            </p>
            <p style="font-size: 0.78rem; color: #A396C0; margin-bottom: 24px;">
              Stok produk telah dikurangi secara otomatis dan pesanan dicatat di sistem database demo.
            </p>
            <button class="btn btn-primary" id="finishPayBtn" style="width: 100%;">Tutup &amp; Lanjut Belanja</button>
          </div>
        `;

        // Clear cart
        state.cart = [];
        renderCart();

        modal.querySelector('#finishPayBtn').addEventListener('click', () => {
          modal.remove();
          showToast('Pesanan tersimpan! Terima kasih sudah memesan.', '📦');
        });
      });
    });
  }

  // ==================== QUICK VIEW MODAL ====================
  const quickViewModal = document.getElementById('quickViewModal');
  const quickViewBackdrop = document.getElementById('quickViewBackdrop');
  const quickViewCloseBtn = document.getElementById('quickViewCloseBtn');
  const qvImage = document.getElementById('qvImage');
  const qvTitle = document.getElementById('qvTitle');
  const qvPrice = document.getElementById('qvPrice');
  const qvAddToCartBtn = document.getElementById('qvAddToCartBtn');

  const productsData = {
    1: { name: "Varsity Jacket Purple Edition", price: 399000, img: "assets/p_varsity.png" },
    2: { name: "Tote Bag Campus", price: 139000, img: "assets/p_totebag.png" },
    3: { name: "Cap Classic Navy", price: 149000, img: "assets/p_cap.png" },
    4: { name: "Hoodie Wolf Logo Black", price: 299000, img: "assets/p_hoodie.png" }
  };

  let activeQvProduct = null;

  document.querySelectorAll('.btn-quick-view').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pId = btn.getAttribute('data-product');
      const prod = productsData[pId];
      if (!prod) return;

      activeQvProduct = { id: Number(pId), ...prod };

      if (qvImage) qvImage.src = prod.img;
      if (qvTitle) qvTitle.textContent = prod.name;
      if (qvPrice) qvPrice.textContent = formatRupiah(prod.price);

      quickViewModal.classList.add('open');
      quickViewModal.setAttribute('aria-hidden', 'false');
    });
  });

  function closeQuickView() {
    quickViewModal.classList.remove('open');
    quickViewModal.setAttribute('aria-hidden', 'true');
  }

  if (quickViewBackdrop) quickViewBackdrop.addEventListener('click', closeQuickView);
  if (quickViewCloseBtn) quickViewCloseBtn.addEventListener('click', closeQuickView);

  if (qvAddToCartBtn) {
    qvAddToCartBtn.addEventListener('click', () => {
      if (activeQvProduct) {
        const existing = state.cart.find(i => i.id === activeQvProduct.id);
        if (existing) {
          existing.qty++;
        } else {
          state.cart.push({
            id: activeQvProduct.id,
            name: activeQvProduct.name,
            price: activeQvProduct.price,
            qty: 1,
            variant: "Ukuran: M · Edisi Kampus",
            img: activeQvProduct.img
          });
        }
        renderCart();
        closeQuickView();
        showToast(`${activeQvProduct.name} ditambahkan!`, '🛒');
        openCart();
      }
    });
  }

  // ==================== VIRTUAL TRY-ON INTERACTION (PRD FR-12) ====================
  const tryonModelImg = document.getElementById('tryonModelImg');
  const webcamVideo = document.getElementById('webcamVideo');
  const toggleWebcamBtn = document.getElementById('toggleWebcamBtn');
  const photoUploadInput = document.getElementById('photoUploadInput');
  const tryonOverlay = document.getElementById('tryonOverlay');
  const tryonOverlayAsset = document.getElementById('tryonOverlayAsset');
  const flipCamBtn = document.getElementById('flipCamBtn');
  const captureLookBtn = document.getElementById('captureLookBtn');
  const saveLookBtn = document.getElementById('saveLookBtn');
  const applyPreviewBtn = document.getElementById('applyPreviewBtn');
  const sliderItems = document.querySelectorAll('.slider-item');
  const merchTypeBtns = document.querySelectorAll('.merch-type-btn');

  // Slider Selection
  sliderItems.forEach(item => {
    item.addEventListener('click', () => {
      sliderItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const img = item.getAttribute('data-img');
      const name = item.getAttribute('data-name');
      if (tryonOverlayAsset) {
        tryonOverlayAsset.src = img;
      }
      showToast(`Merchandise dipilih: ${name}`, '🧥');
    });
  });

  // Merch Type Selector
  merchTypeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      merchTypeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const type = btn.getAttribute('data-type');
      showToast(`Kategori Try-On: ${type.toUpperCase()}`);
    });
  });

  // Apply to Preview
  if (applyPreviewBtn) {
    applyPreviewBtn.addEventListener('click', () => {
      tryonOverlay.style.opacity = '0';
      setTimeout(() => {
        tryonOverlay.style.opacity = '1';
        showToast('Merchandise dipasang pada pose tubuh!', '✨');
      }, 250);
    });
  }

  // Webcam Toggle
  if (toggleWebcamBtn) {
    toggleWebcamBtn.addEventListener('click', async () => {
      if (!state.webcamActive) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
          state.webcamStream = stream;
          webcamVideo.srcObject = stream;
          webcamVideo.style.display = 'block';
          tryonModelImg.style.display = 'none';
          state.webcamActive = true;
          toggleWebcamBtn.textContent = 'Matikan Webcam';
          showToast('Kamera webcam aktif! Deteksi pose siap.', '📷');
        } catch (err) {
          showToast('Izin kamera ditolak. Menggunakan model fallback.', 'ℹ️');
        }
      } else {
        if (state.webcamStream) {
          state.webcamStream.getTracks().forEach(track => track.stop());
        }
        webcamVideo.style.display = 'none';
        tryonModelImg.style.display = 'block';
        state.webcamActive = false;
        toggleWebcamBtn.textContent = 'Aktifkan Webcam';
        showToast('Kembali ke foto preview model.');
      }
    });
  }

  // Photo Upload fallback
  if (photoUploadInput) {
    photoUploadInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (webcamVideo) webcamVideo.style.display = 'none';
          if (tryonModelImg) {
            tryonModelImg.src = event.target.result;
            tryonModelImg.style.display = 'block';
          }
          showToast('Foto berhasil diunggah untuk Try-On!', '🖼️');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Flip Cam action
  if (flipCamBtn) {
    flipCamBtn.addEventListener('click', () => {
      showToast('Kamera dibalik.', '🔄');
    });
  }

  // Capture look
  if (captureLookBtn) {
    captureLookBtn.addEventListener('click', () => {
      showToast('Foto look kamu berhasil di-capture!', '📸');
    });
  }

  // Save look
  if (saveLookBtn) {
    saveLookBtn.addEventListener('click', () => {
      showToast('Saved Look tersimpan ke akunmu! (PRD FR-14)', '⭐');
    });
  }

  // ==================== DESIGN YOUR OWN MERCH (STUDIO) ====================
  const customTextInput = document.getElementById('customTextInput');
  const customSubTextInput = document.getElementById('customSubTextInput');
  const livePrintText = document.getElementById('livePrintText');
  const livePrintSub = document.getElementById('livePrintSub');
  const fontBtns = document.querySelectorAll('.font-btn');
  const swatchCircles = document.querySelectorAll('.swatch-circle');
  const alignBtns = document.querySelectorAll('.align-btn');
  const studioProdItems = document.querySelectorAll('.studio-prod-item');
  const submitDesignBtn = document.getElementById('submitDesignBtn');
  const printArea = document.getElementById('printArea');

  if (customTextInput && livePrintText) {
    customTextInput.addEventListener('input', (e) => {
      livePrintText.textContent = e.target.value.trim() || 'YOUR DESIGN HERE';
    });
  }

  if (customSubTextInput && livePrintSub) {
    customSubTextInput.addEventListener('input', (e) => {
      livePrintSub.textContent = e.target.value.trim() || 'WOLVY CAMPUS 2025';
    });
  }

  fontBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      fontBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const font = btn.getAttribute('data-font');
      if (livePrintText) {
        livePrintText.style.fontFamily = font;
      }
      if (livePrintSub) {
        livePrintSub.style.fontFamily = font;
      }
    });
  });

  swatchCircles.forEach(swatch => {
    swatch.addEventListener('click', () => {
      swatchCircles.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      const color = swatch.getAttribute('data-color');
      if (livePrintText) livePrintText.style.color = color;
      if (livePrintSub) livePrintSub.style.color = color;
      const printArea = document.getElementById('printArea');
      if (printArea) {
        printArea.style.borderColor = color === '#FFFFFF' ? 'rgba(88,40,168,0.4)' : color + '80';
      }
    });
  });

  alignBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      alignBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const align = btn.getAttribute('data-align');
      if (printArea) {
        printArea.style.textAlign = align;
        if (align === 'left') printArea.style.alignItems = 'flex-start';
        else if (align === 'right') printArea.style.alignItems = 'flex-end';
        else printArea.style.alignItems = 'center';
      }
    });
  });

  const mockupImages = {
    tshirt: 'assets/tshirt_mockup_clean.jpg',
    hoodie: 'assets/hoodie.jpg',
    jaket:  'assets/varsity.jpg',
    totebag:'assets/totebag.jpg',
    tumbler:'assets/tumbler.jpg',
    topi:   'assets/topi.jpg',
    lainnya:'assets/tshirt_mockup_clean.jpg'
  };
  studioProdItems.forEach(item => {
    item.addEventListener('click', () => {
      studioProdItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const type = item.getAttribute('data-type');
      // Update mockup image
      const mockupGarmentImg = document.getElementById('mockupGarmentImg');
      if (mockupGarmentImg && mockupImages[type]) {
        mockupGarmentImg.src = mockupImages[type];
      }
      // Hide/show print area for non-wearables
      const printArea = document.getElementById('printArea');
      if (printArea) {
        printArea.style.display = (type === 'tumbler' || type === 'totebag') ? 'none' : 'flex';
      }
      showToast(`Produk dipilih: ${type.toUpperCase()} ✅`, '👕');
    });
  });


  // Thumb bar preview buttons switch mockup angle
  document.querySelectorAll('.thumb-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.thumb-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const angle = btn.getAttribute('data-angle');
      const mockupGarmentImg = document.getElementById('mockupGarmentImg');
      const activeType = document.querySelector('.studio-prod-item.active')?.getAttribute('data-type') || 'tshirt';
      const angleImages = {
        front: { tshirt: 'assets/tshirt_mockup_clean.jpg', hoodie: 'assets/hoodie.jpg', jaket: 'assets/varsity.jpg' },
        back:  { tshirt: 'assets/hoodie.jpg', hoodie: 'assets/hoodie.jpg', jaket: 'assets/varsity.jpg' },
        model: { tshirt: 'assets/fotomodeltry.jpeg', hoodie: 'assets/fotomodeltry.jpeg', jaket: 'assets/fotomodeltry.jpeg' }
      };
      const src = (angleImages[angle] && angleImages[angle][activeType]) || 'assets/tshirt_mockup_clean.jpg';
      if (mockupGarmentImg) mockupGarmentImg.src = src;
      showToast(`Preview: ${angle === 'front' ? 'Tampak Depan' : angle === 'back' ? 'Tampak Belakang' : 'Di Model'}`, '👀');
    });
  });
  if (submitDesignBtn) {
    submitDesignBtn.addEventListener('click', () => {
      const text = customTextInput ? (customTextInput.value.trim() || 'WOLVY SQUAD') : 'WOLVY SQUAD';
      const sub = customSubTextInput ? (customSubTextInput.value.trim() || 'CAMPUS 2025') : 'CAMPUS 2025';
      const customItem = {
        name: `Custom T-Shirt: "${text}" (${sub})`,
        price: 159000,
        category: 'custom',
        stock: 50,
        image: 'assets/prod_tshirt.png',
        id: 11
      };
      if (window.wolvyStore) {
        window.wolvyStore.addToCart(customItem, 'L', 'Custom White', 1);
        const cartBadgeEl = document.getElementById('cartBadge');
        if (cartBadgeEl) cartBadgeEl.textContent = window.wolvyStore.getCartCount();
      }
      showToast(`Kaos kustom "${text}" berhasil masuk ke keranjang belanja!`, '🎉');
      openCart();
    });
  }

  // ==================== LIVE TRY-ON FOR CUSTOM MERCH ====================
  const btnLiveTryonCustom = document.getElementById('btnLiveTryonCustom');
  if (btnLiveTryonCustom) {
    btnLiveTryonCustom.addEventListener('click', () => {
      const text = customTextInput ? (customTextInput.value.trim() || 'WOLVY SQUAD') : 'WOLVY SQUAD';
      const sub = customSubTextInput ? (customSubTextInput.value.trim() || 'CAMPUS 2025') : 'CAMPUS 2025';
      const activeFont = document.querySelector('.font-btn.active')?.getAttribute('data-font') || 'Outfit';
      const activeColor = document.querySelector('.swatch-circle.active')?.getAttribute('data-color') || '#120624';
      const activeAlign = document.querySelector('.align-btn.active')?.getAttribute('data-align') || 'center';
      const activeType = document.querySelector('.studio-prod-item.active')?.getAttribute('data-type') || 'tshirt';

      showToast('Menyiapkan baju desainmu untuk Virtual Try-On AR... ⚡', '⏳');

      if (window.WolvyCustomAR) {
        window.WolvyCustomAR.generateAsset({
          text: text,
          subtext: sub,
          font: activeFont,
          color: activeColor,
          align: activeAlign,
          type: activeType
        }, () => {
          setTimeout(() => {
            window.location.href = 'tryon.html?custom=1';
          }, 300);
        });
      } else {
        window.location.href = 'tryon.html?custom=1';
      }
    });
  }

  // ==================== SEARCH MODAL ====================
  const searchBtn = document.getElementById('searchBtn');
  const searchModal = document.getElementById('searchModal');
  const searchBackdrop = document.getElementById('searchBackdrop');
  const searchCloseBtn = document.getElementById('searchCloseBtn');
  const searchInput = document.getElementById('searchInput');

  function openSearch() {
    searchModal.classList.add('open');
    searchModal.setAttribute('aria-hidden', 'false');
    setTimeout(() => {
      if (searchInput) searchInput.focus();
    }, 100);
  }

  function closeSearch() {
    searchModal.classList.remove('open');
    searchModal.setAttribute('aria-hidden', 'true');
  }

  if (searchBtn) searchBtn.addEventListener('click', openSearch);
  if (searchBackdrop) searchBackdrop.addEventListener('click', closeSearch);
  if (searchCloseBtn) searchCloseBtn.addEventListener('click', closeSearch);

  // Shortcut Ctrl+K / '/'
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && document.activeElement.tagName !== 'INPUT')) {
      e.preventDefault();
      openSearch();
    } else if (e.key === 'Escape') {
      closeSearch();
      closeQuickView();
      closeCart();
      closeUserModal();
    }
  });

  document.querySelectorAll('.tag-chip').forEach(tag => {
    tag.addEventListener('click', () => {
      if (searchInput) searchInput.value = tag.textContent;
      showToast(`Mencari: ${tag.textContent}`, '🔍');
      closeSearch();
      const bestseller = document.getElementById('bestseller');
      if (bestseller) bestseller.scrollIntoView({ behavior: 'smooth' });
    });
  });

  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
          window.location.href = `shop.html?q=${encodeURIComponent(query)}`;
        }
      }
    });
  }

  // ==================== USER PROFILE & ROLE TOGGLE MODAL ====================
  const userBtn = document.getElementById('userBtn');
  const userModal = document.getElementById('userModal');
  const userBackdrop = document.getElementById('userBackdrop');
  const userCloseBtn = document.getElementById('userCloseBtn');
  const roleToggleBtn = document.getElementById('roleToggleBtn');

  function openUserModal() {
    userModal.classList.add('open');
    userModal.setAttribute('aria-hidden', 'false');
  }

  function closeUserModal() {
    userModal.classList.remove('open');
    userModal.setAttribute('aria-hidden', 'true');
  }

  if (userBtn) userBtn.addEventListener('click', openUserModal);
  if (userBackdrop) userBackdrop.addEventListener('click', closeUserModal);
  if (userCloseBtn) userCloseBtn.addEventListener('click', closeUserModal);

  if (roleToggleBtn) {
    roleToggleBtn.addEventListener('click', () => {
      if (state.currentRole === 'pelanggan') {
        state.currentRole = 'admin';
        roleToggleBtn.textContent = 'Ganti ke Pelanggan';
        showToast('Mode Admin aktif! Hak akses katalog & pesanan terbuka. (PRD FR-09..FR-11)', '👑');
      } else {
        state.currentRole = 'pelanggan';
        roleToggleBtn.textContent = 'Ganti ke Admin';
        showToast('Mode Pelanggan aktif. (PRD Pelanggan Terdaftar)', '🎓');
      }
    });
  }

  // Initial cart render
  renderCart();
  updateWishlistBadge();

});

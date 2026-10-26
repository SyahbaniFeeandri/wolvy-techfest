/**
 * WOLVY SMART SIZE & FIT GUIDE (FITUR 4)
 * ----------------------------------------------------
 * Solusi cerdas rekomendasi ukuran jaket & t-shirt streetwear WOLVY:
 * 1. Mengajukan pertanyaan interaktif: Tinggi Badan, Berat Badan, Ukuran Biasa, & Preferensi Fit.
 * 2. Memberikan Rekomendasi Ukuran Real-Time dengan Match Score & Penjelasan Proporsi Tubuh.
 * 3. Tabel Ukuran Interaktif dengan Switcher Satuan CM / INCH & Auto-Highlight Baris Rekomendasi.
 * 4. Perbandingan Fit Visual: Slim Fit vs Regular Fit vs Oversized Streetwear Fit.
 * 5. Integrasi langsung ke Virtual Try-On AR dan Selector Ukuran Toko.
 */

(function () {
  'use strict';

  // Standard Product Sizing Specs for WOLVY (in CM)
  const SIZE_CHART_DATA = [
    { size: 'S',  chest: 50, length: 66, shoulder: 44, sleeve: 58, minH: 150, maxH: 165, minW: 45, maxW: 58 },
    { size: 'M',  chest: 53, length: 69, shoulder: 47, sleeve: 60, minH: 162, maxH: 173, minW: 55, maxW: 68 },
    { size: 'L',  chest: 56, length: 72, shoulder: 50, sleeve: 62, minH: 170, maxH: 180, minW: 65, maxW: 78 },
    { size: 'XL', chest: 59, length: 75, shoulder: 53, sleeve: 64, minH: 177, maxH: 188, minW: 75, maxW: 88 },
    { size: 'XXL', chest: 62, length: 78, shoulder: 56, sleeve: 66, minH: 184, maxH: 205, minW: 85, maxW: 120 }
  ];

  // Fit Comparison Explanations
  const FIT_COMPARISONS = {
    slim: {
      title: 'Slim Fit (Clean & Fitted)',
      badge: 'Siluet Pas Tubuh',
      chestEase: '+2 ~ 3 cm (Body Hugging)',
      shoulder: 'Pas di ujung tulang bahu tanpa lipatan',
      length: 'Jatuh tepat di garis ban pinggang celana',
      sleeve: 'Rapi di pergelangan tangan, cocok untuk inner jaket',
      vibe: 'Gaya rapi, formal-casual, menonjolkan postur tubuh atletis.'
    },
    regular: {
      title: 'Regular Fit (Classic Everyday)',
      badge: 'Standar Kenyamanan',
      chestEase: '+5 ~ 6 cm (Comfort Room)',
      shoulder: 'Jatuh sedikit natural di batas bahu luar (+1 cm)',
      length: 'Menutupi separuh saku belakang celana (ideal)',
      sleeve: 'Nyaman bergerak bebas saat beraktivitas di kampus',
      vibe: 'Keseimbangan sempurna antara gaya santai dan mobilitas harian.'
    },
    oversized: {
      title: 'Oversized Fit (Signature Streetwear)',
      badge: 'Drop-Shoulder Trend',
      chestEase: '+9 ~ 12 cm (Boxy Street Silhouette)',
      shoulder: 'Drop shoulder 3-5 cm melewati garis bahu untuk look streetwear',
      length: 'Sedikit lebih panjang, menutupi area pinggul dengan drape loose',
      sleeve: 'Lengan lebar, ujung cuff menutupi sebagian punggung tangan',
      vibe: 'Vibe otentik Wolvy Streetwear: stylish, relaxed, & percaya diri.'
    }
  };

  // State
  let currentUnit = 'cm'; // 'cm' or 'inch'
  let userStats = {
    height: 172,
    weight: 65,
    usualSize: 'M',
    preference: 'regular' // 'slim', 'regular', 'oversized'
  };
  let activeCallback = null;

  // Retrieve saved stats from localStorage if available
  try {
    const saved = localStorage.getItem('wolvy_smart_fit_stats');
    if (saved) {
      userStats = Object.assign(userStats, JSON.parse(saved));
    }
  } catch (e) {
    console.warn('Could not load smart fit stats:', e);
  }

  // Calculate Size Recommendation
  function calculateRecommendation() {
    const h = userStats.height;
    const w = userStats.weight;
    const pref = userStats.preference;

    // Body Mass & Height Scoring
    let baseScore = 0;
    if (h < 165 && w < 58) baseScore = 0;       // S
    else if (h < 173 && w < 68) baseScore = 1;  // M
    else if (h < 181 && w < 79) baseScore = 2;  // L
    else if (h < 189 && w < 90) baseScore = 3;  // XL
    else baseScore = 4;                         // XXL

    // Adjust based on fit preference
    let recommendedIndex = baseScore;
    if (pref === 'slim' && recommendedIndex > 0) {
      // If user is borderline or wants a snug fit
      recommendedIndex = Math.max(0, baseScore - 0.5);
    } else if (pref === 'oversized') {
      // Step up 1 size for true streetwear silhouette
      recommendedIndex = Math.min(4, baseScore + 1);
    }

    const finalIndex = Math.round(recommendedIndex);
    const recommendedItem = SIZE_CHART_DATA[finalIndex];
    const recSize = recommendedItem.size;

    // Match percentage calculation
    let matchScore = 95;
    if (userStats.usualSize === recSize) matchScore = 98;
    else if (Math.abs(SIZE_CHART_DATA.findIndex(s => s.size === userStats.usualSize) - finalIndex) === 1) matchScore = 92;
    else matchScore = 88;

    // Explanation text
    let explanation = '';
    if (pref === 'oversized') {
      explanation = `Berdasarkan tinggi <strong>${h} cm</strong> & berat <strong>${w} kg</strong> dengan potongan <strong>Oversized Streetwear</strong>, ukuran <strong>${recSize}</strong> memberikan siluet boxy & drop-shoulder yang proporsional tanpa terlihat kedodoran.`;
    } else if (pref === 'slim') {
      explanation = `Untuk tinggi <strong>${h} cm</strong> & berat <strong>${w} kg</strong> dengan preferensi <strong>Slim Fit</strong>, ukuran <strong>${recSize}</strong> pas menempel di dada & bahu dengan garis tubuh yang bersih dan rapi.`;
    } else {
      explanation = `Untuk tinggi <strong>${h} cm</strong> & berat <strong>${w} kg</strong>, ukuran <strong>${recSize}</strong> merupakan golden standard kenyamanan harian dengan ruang gerak leluasa di dada (+5 cm) dan panjang pas di pinggul.`;
    }

    return {
      size: recSize,
      matchScore: matchScore,
      explanation: explanation,
      chartIndex: finalIndex
    };
  }

  // Unit conversion helper
  function formatVal(cmVal, unit) {
    if (unit === 'inch') {
      return (cmVal / 2.54).toFixed(1) + '"';
    }
    return cmVal + ' cm';
  }

  // Build Modal DOM
  function createModalDOM() {
    if (document.getElementById('smartFitModalBackdrop')) return;

    const modalHTML = `
      <div class="smart-fit-backdrop" id="smartFitModalBackdrop">
        <div class="smart-fit-dialog" role="dialog" aria-modal="true" aria-labelledby="smartFitModalTitle">
          
          <!-- Modal Header -->
          <div class="smart-fit-header">
            <div class="sf-header-title-box">
              <span class="sf-pill-badge">⚡ WOLVY FIT AI</span>
              <h2 id="smartFitModalTitle" class="sf-title">Smart Size &amp; Fit Guide</h2>
              <p class="sf-subtitle">Jawab 3 pertanyaan simpel, temukan ukuran jaket &amp; kaus paling presisi tanpa ragu beli online!</p>
            </div>
            <button type="button" class="sf-close-btn" id="sfCloseModalBtn" aria-label="Tutup Panduan Ukuran">&times;</button>
          </div>

          <div class="smart-fit-body">
            
            <!-- SECTION 1: PERTANYAAN INTERAKTIF -->
            <div class="sf-card sf-inputs-card">
              <h3 class="sf-section-title">
                <span class="sf-step-num">1</span>
                Pertanyaan Profil Tubuh &amp; Preferensi
              </h3>

              <div class="sf-grid-inputs">
                
                <!-- Tinggi Badan Slider -->
                <div class="sf-control-group">
                  <div class="sf-label-row">
                    <label for="sfHeightRange">Tinggi Badan:</label>
                    <span class="sf-val-badge" id="sfHeightDisplay">${userStats.height} cm</span>
                  </div>
                  <input type="range" id="sfHeightRange" min="145" max="205" value="${userStats.height}" class="sf-range-slider">
                  <div class="sf-slider-hints">
                    <span>145 cm</span>
                    <span>175 cm</span>
                    <span>205 cm</span>
                  </div>
                </div>

                <!-- Berat Badan Slider -->
                <div class="sf-control-group">
                  <div class="sf-label-row">
                    <label for="sfWeightRange">Berat Badan:</label>
                    <span class="sf-val-badge" id="sfWeightDisplay">${userStats.weight} kg</span>
                  </div>
                  <input type="range" id="sfWeightRange" min="40" max="115" value="${userStats.weight}" class="sf-range-slider">
                  <div class="sf-slider-hints">
                    <span>40 kg</span>
                    <span>75 kg</span>
                    <span>115 kg</span>
                  </div>
                </div>

                <!-- Ukuran Biasa Dipakai -->
                <div class="sf-control-group sf-span-full">
                  <label class="sf-input-label">Ukuran yang Biasa Kamu Pakai (Brand Lokal/Umum):</label>
                  <div class="sf-chip-group" id="sfUsualSizeGroup">
                    ${['S', 'M', 'L', 'XL', 'XXL'].map(sz => `
                      <button type="button" class="sf-chip-btn ${userStats.usualSize === sz ? 'active' : ''}" data-val="${sz}">
                        ${sz}
                      </button>
                    `).join('')}
                  </div>
                </div>

                <!-- Preferensi Fit Potongan Baju -->
                <div class="sf-control-group sf-span-full">
                  <label class="sf-input-label">Preferensi Potongan Baju (Fit Style):</label>
                  <div class="sf-fit-cards-grid" id="sfFitPrefGrid">
                    <div class="sf-fit-card ${userStats.preference === 'slim' ? 'active' : ''}" data-pref="slim">
                      <div class="sf-fc-icon">🎯</div>
                      <div class="sf-fc-name">Slim Fit</div>
                      <div class="sf-fc-desc">Pas di badan, clean, dan rapi menonjolkan siluet tubuh.</div>
                    </div>
                    <div class="sf-fit-card ${userStats.preference === 'regular' ? 'active' : ''}" data-pref="regular">
                      <div class="sf-fc-icon">👔</div>
                      <div class="sf-fc-name">Regular Fit</div>
                      <div class="sf-fc-desc">Standar kenyamanan harian, leluasa bergerak di kampus.</div>
                    </div>
                    <div class="sf-fit-card ${userStats.preference === 'oversized' ? 'active' : ''}" data-pref="oversized">
                      <div class="sf-fc-icon">🛹</div>
                      <div class="sf-fc-name">Oversized Street</div>
                      <div class="sf-fc-desc">Drop shoulder kekinian, longgar &amp; stylish khas Wolvy.</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <!-- SECTION 2: REKOMENDASI UKURAN UTAMA -->
            <div class="sf-recommendation-hero" id="sfRecommendationHero">
              <div class="sf-rec-left">
                <span class="sf-rec-badge">REKOMENDASI UKURAN TERBAIKMU</span>
                <div class="sf-size-display-row">
                  <div class="sf-big-size-letter" id="sfRecSizeLetter">L</div>
                  <div class="sf-size-meta">
                    <div class="sf-size-label-full" id="sfRecSizeLabel">Ukuran L (Large)</div>
                    <div class="sf-accuracy-tag">
                      <span class="sf-acc-dot"></span>
                      <span id="sfRecScore">96% Match Score · Rekomendasi Presisi</span>
                    </div>
                  </div>
                </div>
                <p class="sf-explanation-text" id="sfRecExplanation">
                  Sedang menghitung proporsi ukuran...
                </p>
              </div>

              <div class="sf-rec-actions">
                <button type="button" class="btn btn-primary sf-apply-btn" id="sfApplyRecommendedSizeBtn">
                  <span>✨ Gunakan Ukuran Ini</span>
                </button>
                <button type="button" class="btn btn-outline sf-tryon-jump-btn" id="sfJumpToTryonBtn">
                  <span>📸 Coba di Virtual Try-On</span>
                </button>
              </div>
            </div>

            <!-- SECTION 3: TABEL UKURAN INTERAKTIF -->
            <div class="sf-card sf-table-card">
              <div class="sf-table-header-row">
                <h3 class="sf-section-title">
                  <span class="sf-step-num">2</span>
                  Tabel Ukuran Interaktif (Interactive Size Chart)
                </h3>
                
                <!-- Unit Switcher CM / INCH -->
                <div class="sf-unit-toggle" id="sfUnitToggle">
                  <span class="sf-unit-label">Satuan:</span>
                  <button type="button" class="sf-unit-btn ${currentUnit === 'cm' ? 'active' : ''}" data-unit="cm">CM</button>
                  <button type="button" class="sf-unit-btn ${currentUnit === 'inch' ? 'active' : ''}" data-unit="inch">INCH</button>
                </div>
              </div>

              <div class="sf-table-responsive">
                <table class="sf-size-table" id="sfInteractiveSizeTable">
                  <thead>
                    <tr>
                      <th>Ukuran</th>
                      <th>Lebar Dada</th>
                      <th>Panjang Badan</th>
                      <th>Lebar Bahu</th>
                      <th>Panjang Lengan</th>
                      <th>Status Rekomendasi</th>
                    </tr>
                  </thead>
                  <tbody id="sfTableBody">
                    <!-- Populated dynamically -->
                  </tbody>
                </table>
              </div>
              <p class="sf-table-footnote">
                💡 <em>Tips: Klik baris pada tabel di atas untuk membandingkan ukuran lain secara instan. Toleransi jahit ±1-2 cm.</em>
              </p>
            </div>

            <!-- SECTION 4: PERBANDINGAN FIT (FIT COMPARISON) -->
            <div class="sf-card sf-comparison-card">
              <h3 class="sf-section-title">
                <span class="sf-step-num">3</span>
                Perbandingan Fit (Fit Silhouette Comparison)
              </h3>
              <p class="sf-subnote">Pahami bagaimana merchandise WOLVY akan jatuh di badanmu berdasarkan pilihan gaya:</p>

              <div class="sf-comparison-grid">
                
                <!-- Slim Fit Card -->
                <div class="sf-comp-item ${userStats.preference === 'slim' ? 'highlighted' : ''}" data-comp="slim">
                  <div class="sf-ci-header">
                    <h4>Slim Fit</h4>
                    <span class="sf-ci-badge">Fitted &amp; Clean</span>
                  </div>
                  <div class="sf-ci-metric">
                    <span class="sf-ci-key">Kelonggaran Dada:</span>
                    <span class="sf-ci-val">+2 ~ 3 cm</span>
                  </div>
                  <div class="sf-ci-metric">
                    <span class="sf-ci-key">Garis Bahu:</span>
                    <span class="sf-ci-val">Tepat di ujung bahu</span>
                  </div>
                  <div class="sf-ci-metric">
                    <span class="sf-ci-key">Panjang Baju:</span>
                    <span class="sf-ci-val">Pas di ban pinggang</span>
                  </div>
                  <p class="sf-ci-vibe">Cocok untuk kamu yang suka tampilan atletis, rapi, dan modern.</p>
                </div>

                <!-- Regular Fit Card -->
                <div class="sf-comp-item ${userStats.preference === 'regular' ? 'highlighted' : ''}" data-comp="regular">
                  <div class="sf-ci-header">
                    <h4>Regular Fit</h4>
                    <span class="sf-ci-badge">Classic Standard</span>
                  </div>
                  <div class="sf-ci-metric">
                    <span class="sf-ci-key">Kelonggaran Dada:</span>
                    <span class="sf-ci-val">+5 ~ 6 cm</span>
                  </div>
                  <div class="sf-ci-metric">
                    <span class="sf-ci-key">Garis Bahu:</span>
                    <span class="sf-ci-val">Jatuh natural ±1 cm</span>
                  </div>
                  <div class="sf-ci-metric">
                    <span class="sf-ci-key">Panjang Baju:</span>
                    <span class="sf-ci-val">Menutupi saku belakang</span>
                  </div>
                  <p class="sf-ci-vibe">Keseimbangan ideal kenyamanan sehari-hari kuliah &amp; nongkrong.</p>
                </div>

                <!-- Oversized Card -->
                <div class="sf-comp-item ${userStats.preference === 'oversized' ? 'highlighted' : ''}" data-comp="oversized">
                  <div class="sf-ci-header">
                    <h4>Oversized Fit</h4>
                    <span class="sf-ci-badge sf-badge-street">Wolvy Street Style</span>
                  </div>
                  <div class="sf-ci-metric">
                    <span class="sf-ci-key">Kelonggaran Dada:</span>
                    <span class="sf-ci-val">+10 ~ 12 cm</span>
                  </div>
                  <div class="sf-ci-metric">
                    <span class="sf-ci-key">Garis Bahu:</span>
                    <span class="sf-ci-val">Drop Shoulder 4-5 cm</span>
                  </div>
                  <div class="sf-ci-metric">
                    <span class="sf-ci-key">Panjang Baju:</span>
                    <span class="sf-ci-val">Drape longgar di pinggul</span>
                  </div>
                  <p class="sf-ci-vibe">Look streetwear khas Wolvy: relax, confident, dan kekinian.</p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    bindModalEvents();
  }

  // Render Table Rows
  function renderTable(recIndex) {
    const tbody = document.getElementById('sfTableBody');
    if (!tbody) return;

    tbody.innerHTML = SIZE_CHART_DATA.map((row, idx) => {
      const isRec = idx === recIndex;
      return `
        <tr class="${isRec ? 'sf-row-recommended' : ''}" data-size="${row.size}" data-idx="${idx}">
          <td class="sf-td-size">
            <strong>${row.size}</strong>
          </td>
          <td>${formatVal(row.chest, currentUnit)}</td>
          <td>${formatVal(row.length, currentUnit)}</td>
          <td>${formatVal(row.shoulder, currentUnit)}</td>
          <td>${formatVal(row.sleeve, currentUnit)}</td>
          <td class="sf-td-status">
            ${isRec ? `<span class="sf-status-badge">⭐ Rekomendasi Kamu</span>` : `<span class="sf-status-alt">Pilihan Alternatif</span>`}
          </td>
        </tr>
      `;
    }).join('');

    // Attach click listener to table rows
    tbody.querySelectorAll('tr').forEach(tr => {
      tr.addEventListener('click', () => {
        const sz = tr.getAttribute('data-size');
        const idx = Number(tr.getAttribute('data-idx'));
        updateRecommendationFromRow(sz, idx);
      });
    });
  }

  // Update UI on calculation change
  function updateUI() {
    const res = calculateRecommendation();

    // Height & Weight display
    const hDisp = document.getElementById('sfHeightDisplay');
    const wDisp = document.getElementById('sfWeightDisplay');
    if (hDisp) hDisp.textContent = `${userStats.height} cm`;
    if (wDisp) wDisp.textContent = `${userStats.weight} kg`;

    // Rec Hero
    const recLetter = document.getElementById('sfRecSizeLetter');
    const recLabel = document.getElementById('sfRecSizeLabel');
    const recScore = document.getElementById('sfRecScore');
    const recExp = document.getElementById('sfRecExplanation');
    const applyBtn = document.getElementById('sfApplyRecommendedSizeBtn');

    if (recLetter) recLetter.textContent = res.size;
    if (recLabel) recLabel.textContent = `Ukuran ${res.size} (${res.size === 'S' ? 'Small' : res.size === 'M' ? 'Medium' : res.size === 'L' ? 'Large' : res.size === 'XL' ? 'Extra Large' : 'Double Extra Large'})`;
    if (recScore) recScore.textContent = `${res.matchScore}% Match Score · Rekomendasi Presisi`;
    if (recExp) recExp.innerHTML = res.explanation;
    if (applyBtn) {
      applyBtn.innerHTML = `<span>✨ Terapkan Ukuran ${res.size}</span>`;
      applyBtn.setAttribute('data-size', res.size);
    }

    // Update Table
    renderTable(res.chartIndex);

    // Update Comparison Highlighting
    document.querySelectorAll('.sf-comp-item').forEach(card => {
      if (card.getAttribute('data-comp') === userStats.preference) {
        card.classList.add('highlighted');
      } else {
        card.classList.remove('highlighted');
      }
    });

    // Save to localStorage
    try {
      localStorage.setItem('wolvy_smart_fit_stats', JSON.stringify(userStats));
      localStorage.setItem('wolvy_recommended_size', res.size);
    } catch (e) {}
  }

  // Update recommendation if user manually clicks a table row
  function updateRecommendationFromRow(size, idx) {
    const recLetter = document.getElementById('sfRecSizeLetter');
    const recLabel = document.getElementById('sfRecSizeLabel');
    const recScore = document.getElementById('sfRecScore');
    const recExp = document.getElementById('sfRecExplanation');
    const applyBtn = document.getElementById('sfApplyRecommendedSizeBtn');

    if (recLetter) recLetter.textContent = size;
    if (recLabel) recLabel.textContent = `Ukuran ${size} (Pilihan Manual)`;
    if (recScore) recScore.textContent = `Pilihan Kustom · Sesuai Kenyamananmu`;
    if (recExp) recExp.innerHTML = `Kamu memilih ukuran <strong>${size}</strong> dari tabel ukuran. Ukuran ini memiliki lebar dada <strong>${formatVal(SIZE_CHART_DATA[idx].chest, currentUnit)}</strong> dan panjang <strong>${formatVal(SIZE_CHART_DATA[idx].length, currentUnit)}</strong>.`;
    if (applyBtn) {
      applyBtn.innerHTML = `<span>✨ Terapkan Ukuran ${size}</span>`;
      applyBtn.setAttribute('data-size', size);
    }

    renderTable(idx);
    try {
      localStorage.setItem('wolvy_recommended_size', size);
    } catch(e) {}
  }

  // Bind Events inside Modal
  function bindModalEvents() {
    const backdrop = document.getElementById('smartFitModalBackdrop');
    const closeBtn = document.getElementById('sfCloseModalBtn');
    const heightSlider = document.getElementById('sfHeightRange');
    const weightSlider = document.getElementById('sfWeightRange');
    const usualChips = document.querySelectorAll('#sfUsualSizeGroup .sf-chip-btn');
    const fitCards = document.querySelectorAll('#sfFitPrefGrid .sf-fit-card');
    const unitBtns = document.querySelectorAll('#sfUnitToggle .sf-unit-btn');
    const applyBtn = document.getElementById('sfApplyRecommendedSizeBtn');
    const tryonBtn = document.getElementById('sfJumpToTryonBtn');

    // Close Modal
    if (closeBtn) {
      closeBtn.addEventListener('click', closeSmartSizeGuide);
    }
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeSmartSizeGuide();
      });
    }

    // Sliders
    if (heightSlider) {
      heightSlider.addEventListener('input', (e) => {
        userStats.height = Number(e.target.value);
        updateUI();
      });
    }
    if (weightSlider) {
      weightSlider.addEventListener('input', (e) => {
        userStats.weight = Number(e.target.value);
        updateUI();
      });
    }

    // Usual Size Chips
    usualChips.forEach(chip => {
      chip.addEventListener('click', () => {
        usualChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        userStats.usualSize = chip.getAttribute('data-val');
        updateUI();
      });
    });

    // Fit Preference Cards
    fitCards.forEach(card => {
      card.addEventListener('click', () => {
        fitCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        userStats.preference = card.getAttribute('data-pref');
        updateUI();
      });
    });

    // Unit Switcher
    unitBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        unitBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentUnit = btn.getAttribute('data-unit');
        const res = calculateRecommendation();
        renderTable(res.chartIndex);
      });
    });

    // Apply Button
    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        const chosenSize = applyBtn.getAttribute('data-size') || 'L';
        closeSmartSizeGuide();
        
        // Execute callback if provided
        if (typeof activeCallback === 'function') {
          activeCallback(chosenSize);
        } else {
          // Default behavior: trigger on-page size selectors if available
          applySizeToPage(chosenSize);
        }

        if (window.showToast) {
          window.showToast(`Ukuran ${chosenSize} berhasil diterapkan!`, '📏');
        }
      });
    }

    // Jump to Try-on Button
    if (tryonBtn) {
      tryonBtn.addEventListener('click', () => {
        const chosenSize = applyBtn ? (applyBtn.getAttribute('data-size') || 'L') : 'L';
        closeSmartSizeGuide();
        window.location.href = `tryon.html?size=${chosenSize}`;
      });
    }
  }

  // Apply chosen size to current page DOM (product-detail or tryon)
  function applySizeToPage(size) {
    // 1. If on product-detail.html
    const detailChips = document.querySelectorAll('.size-options .size-chip');
    if (detailChips && detailChips.length > 0) {
      detailChips.forEach(chip => {
        const sVal = chip.getAttribute('data-s') || chip.textContent.trim();
        if (sVal === size) {
          detailChips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
        }
      });
    }

    // 2. If on tryon.html
    const tryonChips = document.querySelectorAll('.size-selector-row .size-chip');
    if (tryonChips && tryonChips.length > 0) {
      tryonChips.forEach(chip => {
        const sVal = chip.textContent.trim();
        if (sVal === size) {
          chip.click(); // Triggers the scaling listener in tryon.html!
        }
      });
    }
  }

  // Public API
  function openSmartSizeGuide(callback) {
    createModalDOM();
    activeCallback = callback || null;
    const backdrop = document.getElementById('smartFitModalBackdrop');
    if (backdrop) {
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
      updateUI();
    }
  }

  function closeSmartSizeGuide() {
    const backdrop = document.getElementById('smartFitModalBackdrop');
    if (backdrop) {
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Expose to window
  window.WolvySmartFit = {
    open: openSmartSizeGuide,
    close: closeSmartSizeGuide,
    calculate: calculateRecommendation,
    getData: () => SIZE_CHART_DATA
  };

  // Auto-bind on DOMContentLoaded for any element with class .btn-open-smart-fit
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-open-smart-fit').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        openSmartSizeGuide();
      });
    });
  });

})();

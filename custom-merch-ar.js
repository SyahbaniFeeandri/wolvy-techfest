/**
 * WOLVY CUSTOM MERCH AR GENERATOR
 * ----------------------------------------------------
 * Menghasilkan aset transparan PNG siap pakai untuk AR Live Try-On
 * berdasarkan teks, subteks, pilihan font, dan warna yang dibuat pengguna
 * di fitur "Design Your Own Merch" (Custom Studio).
 */

(function () {
  'use strict';

  window.WolvyCustomAR = {
    /**
     * Render merchandise kustom ke canvas transparan resolusi tinggi
     * @param {Object} opts { text, subtext, font, color, align, type }
     * @param {Function} callback Callback dengan parameter payload
     */
    generateAsset: function (opts, callback) {
      opts = opts || {};
      const text = (opts.text && opts.text.trim()) ? opts.text.trim() : 'WOLVY SQUAD';
      const subtext = (opts.subtext && opts.subtext.trim()) ? opts.subtext.trim() : 'CAMPUS 2025';
      const font = opts.font || 'Outfit';
      const color = opts.color || '#120624';
      const align = opts.align || 'center';
      const type = opts.type || 'tshirt'; // 'tshirt', 'hoodie', 'jaket'

      // Base transparent asset selection
      let baseSrc = 'assets/tryon_tshirt_hd.png';
      let textY = 295;
      let subY = 338;
      let baseRatio = 0.79;

      if (type === 'hoodie') {
        baseSrc = 'assets/tryon_hoodie_hd.png';
        textY = 320;
        subY = 360;
        baseRatio = 0.58;
      } else if (type === 'jaket') {
        baseSrc = 'assets/tryon_varsity_hd.png';
        textY = 305;
        subY = 345;
        baseRatio = 1.0;
      }

      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 600;
      const ctx = canvas.getContext('2d');

      const baseImg = new Image();
      baseImg.crossOrigin = 'anonymous';
      baseImg.onload = function () {
        ctx.clearRect(0, 0, 600, 600);
        // Draw base garment
        ctx.drawImage(baseImg, 0, 0, 600, 600);

        // Draw custom print graphics on chest
        ctx.save();
        let textX = 300;
        if (align === 'left') textX = 230;
        else if (align === 'right') textX = 370;

        ctx.textAlign = align;
        ctx.textBaseline = 'middle';

        // Soft realistic fabric shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetY = 2;

        // Custom Main Text
        ctx.fillStyle = color;
        // Dynamically scale font size if text is long
        let fontSize = 34;
        if (text.length > 14) fontSize = 26;
        if (text.length > 20) fontSize = 20;

        ctx.font = `900 ${fontSize}px ${font}, sans-serif`;
        ctx.fillText(text.toUpperCase(), textX, textY);

        // Custom Subtext
        ctx.font = `700 16px 'Plus Jakarta Sans', sans-serif`;
        ctx.fillText(subtext.toUpperCase(), textX, subY);

        // Streetwear divider line
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.75;
        ctx.moveTo(textX - 40, subY + 14);
        ctx.lineTo(textX + 40, subY + 14);
        ctx.stroke();

        ctx.restore();

        const dataUrl = canvas.toDataURL('image/png');
        const payload = {
          dataUrl: dataUrl,
          text: text,
          subtext: subtext,
          font: font,
          color: color,
          type: type,
          baseRatio: baseRatio,
          updatedAt: Date.now()
        };

        try {
          localStorage.setItem('wolvy_custom_tryon', JSON.stringify(payload));
        } catch (e) {
          console.warn('Storage warning for custom merch:', e);
        }

        if (typeof callback === 'function') {
          callback(payload);
        }
      };

      baseImg.onerror = function () {
        console.error('Gagal memuat template baju:', baseSrc);
        if (typeof callback === 'function') callback(null);
      };

      baseImg.src = baseSrc;
    },

    /**
     * Ambil data kustom yang tersimpan
     */
    getActiveDesign: function () {
      try {
        const saved = localStorage.getItem('wolvy_custom_tryon');
        if (saved) return JSON.parse(saved);
      } catch (e) {}
      return null;
    }
  };
})();

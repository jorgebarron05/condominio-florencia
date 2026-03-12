/* ============================================
   Condominio Florencia — Main JS
   Mobile nav, gallery lightbox, Leaflet map
   ============================================ */

// ---- Splash Screen ----
(function () {
  var splash = document.getElementById('splash');
  if (splash) {
    setTimeout(function () {
      splash.classList.add('fade-out');
    }, 1800);
    setTimeout(function () {
      splash.remove();
    }, 2400);
  }
})();

// ---- Mobile Nav Toggle ----
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      var expanded = links.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });

    // Close menu on link click
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Gallery Lightbox ----
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var lightboxImg = lightbox.querySelector('img');
    var closeBtn = lightbox.querySelector('.lightbox-close');
    var prevBtn = lightbox.querySelector('.lightbox-prev');
    var nextBtn = lightbox.querySelector('.lightbox-next');
    var galleryItems = document.querySelectorAll('.gallery-item');
    var currentIndex = 0;
    var images = [];

    galleryItems.forEach(function (item, i) {
      var img = item.querySelector('img');
      images.push(img.src);
      item.addEventListener('click', function () {
        currentIndex = i;
        openLightbox();
      });
    });

    function openLightbox() {
      lightboxImg.src = images[currentIndex];
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    function showPrev() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      lightboxImg.src = images[currentIndex];
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % images.length;
      lightboxImg.src = images[currentIndex];
    }

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', showPrev);
    if (nextBtn) nextBtn.addEventListener('click', showNext);

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    });
  }

  // ---- Gallery Filter ----
  var filterBtns = document.querySelectorAll('.gallery-filter button');
  if (filterBtns.length > 0) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = this.getAttribute('data-filter');

        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');

        document.querySelectorAll('.gallery-item').forEach(function (item) {
          if (filter === 'todos' || item.getAttribute('data-category') === filter) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // ---- Leaflet Map ----
  var mapEl = document.getElementById('map');
  if (mapEl && typeof L !== 'undefined') {
    // Condominio Florencia — Av. Rosita Pochi entre Av. Piraí y Av. Hilandería
    // entre 4to y 5to anillo, Santa Cruz de la Sierra, Bolivia
    var lat = -17.7930;
    var lng = -63.2180;

    var map = L.map('map', {
      scrollWheelZoom: false
    }).setView([lat, lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map);

    var marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(
      '<strong>Condominio Florencia</strong><br>' +
      'Av. Rosita Pochi<br>' +
      'Entre Av. Piraí y Av. Hilandería<br>' +
      'Entre 4to y 5to Anillo'
    ).openPopup();
  }
});

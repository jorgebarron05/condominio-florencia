/* ============================================
   Condominio Florencia — Main JS
   Mobile nav, gallery lightbox, Leaflet map
   ============================================ */

// ---- Splash Screen (only on first visit per session) ----
(function () {
  var splash = document.getElementById('splash');
  if (!splash) return;

  if (sessionStorage.getItem('splashSeen')) {
    // Already seen this session — remove immediately, no animation
    splash.remove();
    return;
  }

  // First visit: play the full animation, then mark as seen
  sessionStorage.setItem('splashSeen', '1');

  setTimeout(function () {
    splash.classList.add('fade-out');
  }, 2600);

  setTimeout(function () {
    splash.remove();
  }, 3600);
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

  // ---- Scroll Reveal (fade-in sections on scroll) ----
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    reveals.forEach(function (el) { observer.observe(el); });
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
    }).setView([lat, lng], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map);

    // Custom marker icons
    var goldIcon = L.divIcon({
      className: 'map-pin map-pin--main',
      html: '<div style="background:#C9A96E;width:14px;height:14px;border-radius:50%;border:3px solid #3B2314;box-shadow:0 2px 6px rgba(0,0,0,0.4);"></div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    var brownIcon = L.divIcon({
      className: 'map-pin map-pin--poi',
      html: '<div style="background:#6B4226;width:10px;height:10px;border-radius:50%;border:2px solid #C9A96E;box-shadow:0 2px 4px rgba(0,0,0,0.3);"></div>',
      iconSize: [14, 14],
      iconAnchor: [7, 7]
    });

    // Condominio Florencia (main)
    L.marker([lat, lng], { icon: goldIcon }).addTo(map)
      .bindPopup(
        '<strong>Condominio Florencia</strong><br>' +
        'Av. Rosita Pochi<br>' +
        'Entre Av. Piraí y Av. Hilandería<br>' +
        'Entre 4to y 5to Anillo'
      ).openPopup();

    // Points of interest
    var pois = [
      {
        coords: [-17.778, -63.196],
        name: 'Country Club Las Palmas',
        desc: 'Golf 18 hoyos, restaurante, piscina'
      },
      {
        coords: [-17.7647, -63.1767],
        name: 'La Boulangerie',
        desc: 'Panadería artesanal — Av. Ibérica, Las Palmas'
      },
      {
        coords: [-17.7634, -63.1971],
        name: 'Panessa Gourmet',
        desc: 'Café y panadería — Av. Marcelo Terceros Banzer'
      }
    ];

    pois.forEach(function (poi) {
      L.marker(poi.coords, { icon: brownIcon }).addTo(map)
        .bindPopup('<strong>' + poi.name + '</strong><br>' + poi.desc);
    });

    // Fit map to show all markers
    var allCoords = [[lat, lng]].concat(pois.map(function (p) { return p.coords; }));
    var bounds = L.latLngBounds(allCoords);
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
  }
});

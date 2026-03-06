document.addEventListener('DOMContentLoaded', () => {
  // =========================
  // Mobile menu
  // =========================
  (function () {
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');

    if (!btn || !menu) return;

    function openMenu() {
      btn.setAttribute('aria-expanded', 'true');
      btn.classList.add('menu-open');
      menu.classList.add('menu-open');
    }

    function closeMenu() {
      btn.setAttribute('aria-expanded', 'false');
      btn.classList.remove('menu-open');
      menu.classList.remove('menu-open');
    }

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) closeMenu();
    });
  })();

  // =========================
  // Contact status dot
  // Uses America/Chicago time
  // Optional companion text:
  //   id="contactStatusText"
  // =========================
  (function () {
    const dot = document.getElementById('contactStatusDot');
    const dotCore = document.getElementById('contactStatusDotCore');
    const text = document.getElementById('contactStatusText');

    if (!dot && !dotCore && !text) return;

    function getChicagoNow() {
      return new Date(
        new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })
      );
    }

    function updateStatus() {
      const now = getChicagoNow();
      const hour = now.getHours();
      const minutes = now.getMinutes();
      const currentTime = hour + minutes / 60;

      const openStart = 7;     // 7:00 AM
      const openEnd = 16.5;    // 4:30 PM
      const isOpen = currentTime >= openStart && currentTime <= openEnd;

      const greenClasses = ['bg-emerald-500'];
      const redClasses = ['bg-red-500'];

      if (dot) {
        dot.classList.remove(...greenClasses, ...redClasses);
        dot.classList.add(isOpen ? 'bg-emerald-500' : 'bg-red-500');
      }

      if (dotCore) {
        dotCore.classList.remove(...greenClasses, ...redClasses);
        dotCore.classList.add(isOpen ? 'bg-emerald-500' : 'bg-red-500');
      }

      if (text) {
        text.textContent = isOpen
          ? '60-sec form • Fast response'
          : 'We respond next business morning';
      }
    }

    updateStatus();

    // Refresh once per minute
    setInterval(updateStatus, 60000);
  })();

  // =========================
  // Scroll reveal
  // =========================
  (function () {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('in-view'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });

    items.forEach((el) => io.observe(el));
  })();

  // =========================
  // Sticky quote button + header state
  // =========================
  (function () {
    const hero = document.getElementById('heroSection');
    const stickyBtn = document.getElementById('stickyQuoteBtn');
    const header = document.getElementById('siteHeader');

    if (!hero || !stickyBtn || !header) return;

    function updateHeaderAndSticky() {
      const passedHero = window.scrollY > 12;
      const heroBottom = hero.getBoundingClientRect().bottom;
      const passedHeroForQuote = heroBottom <= 0;

      stickyBtn.classList.toggle('sticky-quote-visible', passedHeroForQuote);
      stickyBtn.classList.toggle('sticky-quote-hidden', !passedHeroForQuote);

      header.classList.toggle('header-scrolled', passedHero);
      header.classList.toggle('header-hero', !passedHero);
    }

    window.addEventListener('scroll', updateHeaderAndSticky, { passive: true });
    window.addEventListener('resize', updateHeaderAndSticky);
    updateHeaderAndSticky();
  })();

  // =========================
  // Installed repairs carousel
  // =========================
  (function () {
    const carousel = document.getElementById('installedRepairsCarousel');
    if (!carousel) return;

    const prevBtn = carousel.querySelector('.installed-prev');
    const nextBtn = carousel.querySelector('.installed-next');
    const slideA = document.getElementById('installedSlideA');
    const slideB = document.getElementById('installedSlideB');

    if (!slideA || !slideB) return;

    const images = [
      'assets/images/completed-repairs/repair-01.jpg',
      'assets/images/completed-repairs/repair-02.jpg',
      'assets/images/completed-repairs/repair-03.jpg',
      'assets/images/completed-repairs/repair-04.jpg',
      'assets/images/completed-repairs/repair-05.jpg',
      'assets/images/completed-repairs/repair-06.jpg',
      'assets/images/completed-repairs/repair-07.jpg'
    ];

    let current = 0;
    let activeIsA = true;
    let autoPlay = null;
    let isTransitioning = false;

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    function goTo(index) {
      if (isTransitioning) return;
      isTransitioning = true;

      const nextIndex = (index + images.length) % images.length;
      const active = activeIsA ? slideA : slideB;
      const incoming = activeIsA ? slideB : slideA;

      incoming.src = images[nextIndex];
      incoming.alt = `Elite Rackz completed repair ${nextIndex + 1}`;

      requestAnimationFrame(() => {
        incoming.classList.remove('opacity-0');
        incoming.classList.add('opacity-100');
        active.classList.remove('opacity-100');
        active.classList.add('opacity-0');
      });

      current = nextIndex;
      activeIsA = !activeIsA;

      setTimeout(() => {
        isTransitioning = false;
      }, 720);
    }

    function next() {
      goTo(current + 1);
    }

    function prev() {
      goTo(current - 1);
    }

    function startAutoPlay() {
      stopAutoPlay();
      autoPlay = setInterval(() => {
        next();
      }, 4500);
    }

    function stopAutoPlay() {
      if (autoPlay) clearInterval(autoPlay);
      autoPlay = null;
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prev();
        startAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        next();
        startAutoPlay();
      });
    }

    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    startAutoPlay();
  })();

  // =========================
  // Generic crossfade carousel helper
  // =========================
  function initCrossfadeCarousel(config) {
    const el = document.getElementById(config.rootId);
    if (!el) return;

    const wrap = document.getElementById(config.wrapId);
    if (!wrap) return;

    const prev = el.querySelector('.prev');
    const next = el.querySelector('.next');
    const dots = el.querySelector('.dots');
    const slides = config.slides || [];
    if (!slides.length) return;

    let i = 0;
    let showingA = true;
    let timer;

    const imgA = document.createElement('img');
    const imgB = document.createElement('img');

    [imgA, imgB].forEach((img) => {
      img.className = config.imageClass;
      img.style.opacity = 0;
      img.style.transition = 'opacity 1000ms ease';
      wrap.appendChild(img);
    });

    function updateDots() {
      if (!dots) return;

      dots.innerHTML = '';
      slides.forEach((_, idx) => {
        const d = document.createElement('button');
        d.className = config.dotClass(idx === i);
        d.addEventListener('click', () => {
          clearInterval(timer);
          show(idx);
          restart();
        });
        dots.appendChild(d);
      });
    }

    function show(index) {
      i = (index + slides.length) % slides.length;

      const front = showingA ? imgB : imgA;
      const back = showingA ? imgA : imgB;
      const src = slides[i];

      const tmp = new Image();
      tmp.onload = () => {
        front.src = src;
        front.alt = `${config.altPrefix} ${i + 1}`;
        front.style.opacity = 0;
        back.style.opacity = 1;

        requestAnimationFrame(() => {
          back.style.opacity = 0;
          front.style.opacity = 1;
        });
      };
      tmp.src = src;

      updateDots();
      showingA = !showingA;
    }

    function restart() {
      clearInterval(timer);
      timer = setInterval(() => show(i + 1), config.interval || 3000);
    }

    if (prev) {
      prev.addEventListener('click', () => {
        clearInterval(timer);
        show(i - 1);
        restart();
      });
    }

    if (next) {
      next.addEventListener('click', () => {
        clearInterval(timer);
        show(i + 1);
        restart();
      });
    }

    imgA.src = slides[0];
    imgA.alt = `${config.altPrefix} 1`;
    imgA.style.opacity = 1;
    updateDots();
    restart();

    el.addEventListener('mouseenter', () => clearInterval(timer));
    el.addEventListener('mouseleave', restart);
  }

  // =========================
  // Collage carousel
  // =========================
  initCrossfadeCarousel({
    rootId: 'collageCarousel',
    wrapId: 'collageWrap',
    slides: [
      'assets/images/collage/slide-01.jpg',
      'assets/images/collage/slide-02.jpg',
      'assets/images/collage/slide-03.jpg',
      'assets/images/collage/slide-04.jpg',
      'assets/images/collage/slide-05.jpg',
      'assets/images/collage/slide-06.jpg',
      'assets/images/collage/slide-07.jpg',
      'assets/images/collage/slide-08.jpg',
      'assets/images/collage/slide-09.jpg',
      'assets/images/collage/slide-10.jpg'
    ],
    imageClass: 'absolute inset-0 w-full h-full object-contain p-3 md:p-6 transition-opacity duration-1000',
    dotClass: (active) => `h-2 w-2 rounded-full ${active ? 'bg-slate-800' : 'bg-slate-400/70'}`,
    altPrefix: 'Elite Rackz product',
    interval: 3000
  });

  // =========================
  // Repair Kit A carousel
  // =========================
  initCrossfadeCarousel({
    rootId: 'rkAcarousel',
    wrapId: 'rkAWrap',
    slides: [
      'assets/images/repairA/slide-01.jpg',
      'assets/images/repairA/slide-02.jpg',
      'assets/images/repairA/slide-03.jpg'
    ],
    imageClass: 'absolute inset-0 w-full h-full object-contain p-2 transition-opacity duration-1000',
    dotClass: (active) => `h-1.5 w-1.5 rounded-full ${active ? 'bg-slate-800' : 'bg-slate-400/70'}`,
    altPrefix: 'Repair kit A image',
    interval: 3000
  });

  // =========================
  // Repair Kit B carousel
  // =========================
  initCrossfadeCarousel({
    rootId: 'rkBcarousel',
    wrapId: 'rkBWrap',
    slides: [
      'assets/images/repairB/slide-01.jpg',
      'assets/images/repairB/slide-02.jpg',
      'assets/images/repairB/slide-03.jpg'
    ],
    imageClass: 'absolute inset-0 w-full h-full object-contain p-2 transition-opacity duration-1000',
    dotClass: (active) => `h-1.5 w-1.5 rounded-full ${active ? 'bg-slate-800' : 'bg-slate-400/70'}`,
    altPrefix: 'Repair kit B image',
    interval: 3000
  });

  // =========================
  // Repair Kit C carousel
  // =========================
  initCrossfadeCarousel({
    rootId: 'rkCcarousel',
    wrapId: 'rkCWrap',
    slides: [
      'assets/images/repairC/slide-01.jpg',
      'assets/images/repairC/slide-02.jpg'
    ],
    imageClass: 'absolute inset-0 w-full h-full object-contain p-2 transition-opacity duration-1000',
    dotClass: (active) => `h-1.5 w-1.5 rounded-full ${active ? 'bg-slate-800' : 'bg-slate-400/70'}`,
    altPrefix: 'Repair kit C image',
    interval: 3000
  });

  // =========================
  // Generic see more toggles
  // =========================
  document.querySelectorAll('.js-see-more').forEach((btn) => {
    if (btn._erBound) return;

    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-target');
      const target = document.getElementById(id);
      if (!target) return;

      const isHidden = target.classList.contains('hidden');
      target.classList.toggle('hidden');
      btn.textContent = isHidden ? 'See Less' : 'See More';
    });

    btn._erBound = true;
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu
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

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) closeMenu();
    });
  })();

  function initFadeCarousel({
    rootId,
    wrapId,
    slides,
    imageClass,
    dotClassActive,
    dotClassInactive,
    altPrefix,
    interval = 3000
  }) {
    const el = document.getElementById(rootId);
    if (!el) return;

    const wrap = document.getElementById(wrapId);
    if (!wrap) return;

    const prev = el.querySelector('.prev');
    const next = el.querySelector('.next');
    const dots = el.querySelector('.dots');

    if (!slides || !slides.length) return;

    let i = 0;
    let showingA = true;
    let timer = null;
    let isAnimating = false;

    // Clear any hardcoded starter image only once
    wrap.innerHTML = '';

    const imgA = document.createElement('img');
    const imgB = document.createElement('img');

    [imgA, imgB].forEach(img => {
      img.className = imageClass;
      img.style.opacity = '0';
      img.style.transition = 'opacity 1000ms ease';
      wrap.appendChild(img);
    });

    function updateDots() {
      if (!dots) return;
      dots.innerHTML = '';

      slides.forEach((_, idx) => {
        const d = document.createElement('button');
        d.type = 'button';
        d.className = idx === i ? dotClassActive : dotClassInactive;
        d.addEventListener('click', () => {
          clearInterval(timer);
          show(idx);
          restart();
        });
        dots.appendChild(d);
      });
    }

    function show(index) {
      if (isAnimating) return;
      isAnimating = true;

      i = (index + slides.length) % slides.length;

      const front = showingA ? imgB : imgA;
      const back = showingA ? imgA : imgB;
      const src = slides[i];

      const tmp = new Image();
      tmp.onload = () => {
        front.src = src;
        front.alt = `${altPrefix} ${i + 1}`;
        front.style.opacity = '0';
        back.style.opacity = '1';

        requestAnimationFrame(() => {
          back.style.opacity = '0';
          front.style.opacity = '1';
        });

        updateDots();
        showingA = !showingA;

        setTimeout(() => {
          isAnimating = false;
        }, 1000);
      };
      tmp.src = src;
    }

    function restart() {
      clearInterval(timer);
      timer = setInterval(() => show(i + 1), interval);
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
    imgA.alt = `${altPrefix} 1`;
    imgA.style.opacity = '1';

    updateDots();
    restart();

    el.addEventListener('mouseenter', () => clearInterval(timer));
    el.addEventListener('mouseleave', restart);
  }

  // Index page: Repair. Reinforce. Protect.
  initFadeCarousel({
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
    imageClass: 'absolute inset-0 w-full h-full object-contain p-3 md:p-6',
    dotClassActive: 'h-2 w-2 rounded-full bg-slate-800',
    dotClassInactive: 'h-2 w-2 rounded-full bg-slate-400/70',
    altPrefix: 'Elite Rackz product'
  });

  // Products page: Repair Kit A
  initFadeCarousel({
    rootId: 'rkAcarousel',
    wrapId: 'rkAWrap',
    slides: [
      'assets/images/repairA/slide-01.jpg',
      'assets/images/repairA/slide-02.jpg',
      'assets/images/repairA/slide-03.jpg'
    ],
    imageClass: 'absolute inset-0 w-full h-full object-contain p-2',
    dotClassActive: 'h-1.5 w-1.5 rounded-full bg-slate-800',
    dotClassInactive: 'h-1.5 w-1.5 rounded-full bg-slate-400/70',
    altPrefix: 'Repair kit A image'
  });

  // Products page: Repair Kit B
  initFadeCarousel({
    rootId: 'rkBcarousel',
    wrapId: 'rkBWrap',
    slides: [
      'assets/images/repairB/slide-01.jpg',
      'assets/images/repairB/slide-02.jpg',
      'assets/images/repairB/slide-03.jpg'
    ],
    imageClass: 'absolute inset-0 w-full h-full object-contain p-2',
    dotClassActive: 'h-1.5 w-1.5 rounded-full bg-slate-800',
    dotClassInactive: 'h-1.5 w-1.5 rounded-full bg-slate-400/70',
    altPrefix: 'Repair kit B image'
  });

  // Products page: Repair Kit C
  initFadeCarousel({
    rootId: 'rkCcarousel',
    wrapId: 'rkCWrap',
    slides: [
      'assets/images/repairC/slide-01.jpg',
      'assets/images/repairC/slide-02.jpg'
    ],
    imageClass: 'absolute inset-0 w-full h-full object-contain p-2',
    dotClassActive: 'h-1.5 w-1.5 rounded-full bg-slate-800',
    dotClassInactive: 'h-1.5 w-1.5 rounded-full bg-slate-400/70',
    altPrefix: 'Repair kit C image'
  });

  // Generic see more toggles
  document.querySelectorAll('.js-see-more').forEach(btn => {
    if (!btn._erBound) {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-target');
        const target = document.getElementById(id);
        if (!target) return;

        const isHidden = target.classList.contains('hidden');
        target.classList.toggle('hidden');
        btn.textContent = isHidden ? 'See Less' : 'See More';
      });
      btn._erBound = true;
    }
  });
});

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

  function toggleMenu() {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  btn.addEventListener('click', toggleMenu);

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

// Collage carousel with slow crossfade and 3s interval
(function () {
  const el = document.getElementById('collageCarousel');
  if (!el) return;

  const wrap = document.getElementById('collageWrap');
  const prev = el.querySelector('.prev');
  const next = el.querySelector('.next');
  const dots = el.querySelector('.dots');

  const slides = [
    "assets/images/collage/slide-01.jpg",
    "assets/images/collage/slide-02.jpg",
    "assets/images/collage/slide-03.jpg",
    "assets/images/collage/slide-04.jpg",
    "assets/images/collage/slide-05.jpg",
    "assets/images/collage/slide-06.jpg",
    "assets/images/collage/slide-07.jpg",
    "assets/images/collage/slide-08.jpg",
    "assets/images/collage/slide-09.jpg",
    "assets/images/collage/slide-10.jpg"
  ];

  let i = 0;
  let showingA = true;
  let t;

  const imgA = document.createElement('img');
  const imgB = document.createElement('img');

  [imgA, imgB].forEach(img => {
    img.className = "absolute inset-0 w-full h-full object-contain p-3 md:p-6 transition-opacity duration-1000";
    img.style.opacity = 0;
    img.style.transition = "opacity 1000ms ease";
    wrap.appendChild(img);
  });

  function updateDots() {
    if (!dots) return;
    dots.innerHTML = "";
    slides.forEach((_, idx) => {
      const d = document.createElement('button');
      d.className = "h-2 w-2 rounded-full " + (idx === i ? "bg-slate-800" : "bg-slate-400/70");
      d.addEventListener('click', () => {
        clearInterval(t);
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
      front.alt = "Elite Rackz product " + (i + 1);
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
    clearInterval(t);
    t = setInterval(() => show(i + 1), 3000);
  }

  if (prev) {
    prev.addEventListener('click', () => {
      clearInterval(t);
      show(i - 1);
      restart();
    });
  }

  if (next) {
    next.addEventListener('click', () => {
      clearInterval(t);
      show(i + 1);
      restart();
    });
  }

  imgA.src = slides[0];
  imgA.alt = "Elite Rackz product 1";
  imgA.style.opacity = 1;
  updateDots();
  restart();

  el.addEventListener('mouseenter', () => clearInterval(t));
  el.addEventListener('mouseleave', restart);
})();

// Products page: Repair Kit A carousel
(function () {
  const el = document.getElementById('rkAcarousel');
  if (!el) return;

  const wrap = document.getElementById('rkAWrap');
  const prev = el.querySelector('.prev');
  const next = el.querySelector('.next');
  const dots = el.querySelector('.dots');

  const slides = [
    "assets/images/repairA/slide-01.jpg",
    "assets/images/repairA/slide-02.jpg",
    "assets/images/repairA/slide-03.jpg"
  ];

  let i = 0;
  let showingA = true;
  let t;

  const imgA = document.createElement('img');
  const imgB = document.createElement('img');

  [imgA, imgB].forEach(img => {
    img.className = "absolute inset-0 w-full h-full object-contain p-2 transition-opacity duration-1000";
    img.style.opacity = 0;
    img.style.transition = "opacity 1000ms ease";
    wrap.appendChild(img);
  });

  function updateDots() {
    if (!dots) return;
    dots.innerHTML = "";
    slides.forEach((_, idx) => {
      const d = document.createElement('button');
      d.className = "h-1.5 w-1.5 rounded-full " + (idx === i ? "bg-slate-800" : "bg-slate-400/70");
      d.addEventListener('click', () => {
        clearInterval(t);
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
      front.alt = "Repair kit A image " + (i + 1);
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
    clearInterval(t);
    t = setInterval(() => show(i + 1), 3000);
  }

  if (prev) {
    prev.addEventListener('click', () => {
      clearInterval(t);
      show(i - 1);
      restart();
    });
  }

  if (next) {
    next.addEventListener('click', () => {
      clearInterval(t);
      show(i + 1);
      restart();
    });
  }

  imgA.src = slides[0];
  imgA.alt = "Repair kit A image 1";
  imgA.style.opacity = 1;
  updateDots();
  restart();

  el.addEventListener('mouseenter', () => clearInterval(t));
  el.addEventListener('mouseleave', restart);
})();

// Products page: Repair Kit B carousel
(function () {
  const el = document.getElementById('rkBcarousel');
  if (!el) return;

  const wrap = document.getElementById('rkBWrap');
  const prev = el.querySelector('.prev');
  const next = el.querySelector('.next');
  const dots = el.querySelector('.dots');

  const slides = [
    "assets/images/repairB/slide-01.jpg",
    "assets/images/repairB/slide-02.jpg",
    "assets/images/repairB/slide-03.jpg"
  ];

  let i = 0;
  let showingA = true;
  let t;

  const imgA = document.createElement('img');
  const imgB = document.createElement('img');

  [imgA, imgB].forEach(img => {
    img.className = "absolute inset-0 w-full h-full object-contain p-2 transition-opacity duration-1000";
    img.style.opacity = 0;
    img.style.transition = "opacity 1000ms ease";
    wrap.appendChild(img);
  });

  function updateDots() {
    if (!dots) return;
    dots.innerHTML = "";
    slides.forEach((_, idx) => {
      const d = document.createElement('button');
      d.className = "h-1.5 w-1.5 rounded-full " + (idx === i ? "bg-slate-800" : "bg-slate-400/70");
      d.addEventListener('click', () => {
        clearInterval(t);
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
      front.alt = "Repair kit B image " + (i + 1);
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
    clearInterval(t);
    t = setInterval(() => show(i + 1), 3000);
  }

  if (prev) {
    prev.addEventListener('click', () => {
      clearInterval(t);
      show(i - 1);
      restart();
    });
  }

  if (next) {
    next.addEventListener('click', () => {
      clearInterval(t);
      show(i + 1);
      restart();
    });
  }

  imgA.src = slides[0];
  imgA.alt = "Repair kit B image 1";
  imgA.style.opacity = 1;
  updateDots();
  restart();

  el.addEventListener('mouseenter', () => clearInterval(t));
  el.addEventListener('mouseleave', restart);
})();

// Products page: Repair Kit C carousel
(function () {
  const el = document.getElementById('rkCcarousel');
  if (!el) return;

  const wrap = document.getElementById('rkCWrap');
  const prev = el.querySelector('.prev');
  const next = el.querySelector('.next');
  const dots = el.querySelector('.dots');

  const slides = [
    "assets/images/repairC/slide-01.jpg",
    "assets/images/repairC/slide-02.jpg"
  ];

  let i = 0;
  let showingA = true;
  let t;

  const imgA = document.createElement('img');
  const imgB = document.createElement('img');

  [imgA, imgB].forEach(img => {
    img.className = "absolute inset-0 w-full h-full object-contain p-2 transition-opacity duration-1000";
    img.style.opacity = 0;
    img.style.transition = "opacity 1000ms ease";
    wrap.appendChild(img);
  });

  function updateDots() {
    if (!dots) return;
    dots.innerHTML = "";
    slides.forEach((_, idx) => {
      const d = document.createElement('button');
      d.className = "h-1.5 w-1.5 rounded-full " + (idx === i ? "bg-slate-800" : "bg-slate-400/70");
      d.addEventListener('click', () => {
        clearInterval(t);
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
      front.alt = "Repair kit C image " + (i + 1);
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
    clearInterval(t);
    t = setInterval(() => show(i + 1), 3000);
  }

  if (prev) {
    prev.addEventListener('click', () => {
      clearInterval(t);
      show(i - 1);
      restart();
    });
  }

  if (next) {
    next.addEventListener('click', () => {
      clearInterval(t);
      show(i + 1);
      restart();
    });
  }

  imgA.src = slides[0];
  imgA.alt = "Repair kit C image 1";
  imgA.style.opacity = 1;
  updateDots();
  restart();

  el.addEventListener('mouseenter', () => clearInterval(t));
  el.addEventListener('mouseleave', restart);
})();

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

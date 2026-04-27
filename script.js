/* ============================================================
   BWA — Brookhaven Wellness + Aesthetics
   Site JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ── HEADER SCROLL EFFECT ──────────────────────────────── */
  const header = document.getElementById('site-header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── MOBILE MENU ───────────────────────────────────────── */
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');

  menuBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
    // Animate hamburger → X
    const spans = menuBtn.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close mobile nav on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      const spans = menuBtn.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  /* ── SERVICE SIDEBAR NAVIGATION ───────────────────────── */
  const sidebarItems = document.querySelectorAll('.service-nav-item');
  const panels = document.querySelectorAll('.service-panel');

  function showPanel(targetId) {
    // Hide all panels
    panels.forEach(p => p.classList.add('hidden'));
    // Deactivate all sidebar items
    sidebarItems.forEach(i => i.classList.remove('active'));

    // Show target panel
    const target = document.getElementById('svc-' + targetId);
    if (target) {
      target.classList.remove('hidden');
      // Re-trigger animation
      target.style.animation = 'none';
      target.offsetHeight; // reflow
      target.style.animation = '';
    }

    // Activate sidebar item
    const activeItem = document.querySelector(`.service-nav-item[data-target="${targetId}"]`);
    if (activeItem) activeItem.classList.add('active');
  }

  sidebarItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const target = item.getAttribute('data-target');
      showPanel(target);

      // On mobile, scroll to panels area
      if (window.innerWidth < 900) {
        const panelsEl = document.querySelector('.services-panels');
        if (panelsEl) {
          panelsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ── MOBILE SERVICE TABS (inject if sidebar hidden) ───── */
  function buildMobileTabs() {
    if (document.querySelector('.mobile-service-tabs')) return;

    const tabs = document.createElement('div');
    tabs.className = 'mobile-service-tabs';

    const labels = [
      { id: 'aesthetics', label: 'Aesthetics' },
      { id: 'hormone',    label: 'Hormone' },
      { id: 'iv',         label: 'IV Therapy' },
      { id: 'weight',     label: 'Weight' },
      { id: 'body',       label: 'Body' },
      { id: 'skin',       label: 'Skin' },
    ];

    labels.forEach((l, i) => {
      const btn = document.createElement('button');
      btn.textContent = l.label;
      btn.className = 'mobile-svc-btn' + (i === 0 ? ' active' : '');
      btn.setAttribute('data-target', l.id);
      btn.addEventListener('click', () => {
        tabs.querySelectorAll('.mobile-svc-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        showPanel(l.id);
      });
      tabs.appendChild(btn);
    });

    const servicesSection = document.getElementById('services');
    const layout = servicesSection.querySelector('.services-layout');
    servicesSection.insertBefore(tabs, layout);
  }

  function checkMobile() {
    if (window.innerWidth < 900) {
      buildMobileTabs();
    }
  }

  checkMobile();
  window.addEventListener('resize', checkMobile);

  /* ── INTERSECTION OBSERVER — ANIMATE ON SCROLL ─────────── */
  const animateEls = document.querySelectorAll(
    '.philosophy-card, .tier-card, .stat-item, .panel-service-card, .contact-detail-item'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  animateEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.06}s, transform 0.6s ease ${i * 0.06}s`;
    observer.observe(el);
  });

  // Inject .visible CSS rule dynamically
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
  document.head.appendChild(styleSheet);

  /* ── SMOOTH SCROLL FOR ANCHOR LINKS ───────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80; // header height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── ACTIVE NAV HIGHLIGHT ON SCROLL ───────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'nav-active',
            link.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

  // Add nav-active style
  const navStyle = document.createElement('style');
  navStyle.textContent = `.main-nav a.nav-active { color: var(--gold-lt) !important; }`;
  document.head.appendChild(navStyle);

  /* ── CONTACT FORM SUBMISSION ───────────────────────────── */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simulate async submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';

      setTimeout(() => {
        contactForm.classList.add('hidden');
        formSuccess.classList.remove('hidden');
        formSuccess.style.opacity = '0';
        formSuccess.style.transform = 'translateY(20px)';
        formSuccess.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        requestAnimationFrame(() => {
          formSuccess.style.opacity = '1';
          formSuccess.style.transform = 'translateY(0)';
        });
      }, 1200);
    });
  }

  /* ── MOBILE SERVICE TABS STYLES (injected) ─────────────── */
  const mobileTabStyles = document.createElement('style');
  mobileTabStyles.textContent = `
    .mobile-service-tabs {
      display: none;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      padding: 16px 20px;
      gap: 8px;
      background: var(--cream);
      border-bottom: 1px solid var(--cream-deep);
      position: sticky;
      top: 80px;
      z-index: 10;
      scrollbar-width: none;
    }
    .mobile-service-tabs::-webkit-scrollbar { display: none; }
    .mobile-svc-btn {
      display: inline-flex;
      white-space: nowrap;
      padding: 8px 16px;
      background: var(--white);
      border: 1px solid var(--cream-deep);
      border-radius: 100px;
      font-family: 'Jost', sans-serif;
      font-size: 0.72rem;
      font-weight: 400;
      letter-spacing: 0.08em;
      cursor: pointer;
      color: var(--text-mid);
      transition: var(--transition);
      flex-shrink: 0;
    }
    .mobile-svc-btn.active {
      background: var(--forest);
      color: var(--white);
      border-color: var(--forest);
    }
    @media (max-width: 900px) {
      .mobile-service-tabs { display: flex; }
    }
  `;
  document.head.appendChild(mobileTabStyles);

  /* ── PARALLAX SUBTLE ON HERO ───────────────────────────── */
  const heroContent = document.querySelector('.hero-content');
  if (heroContent && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroContent.style.transform = `translateY(${y * 0.15}px)`;
      } else {
        heroContent.style.transform = '';
      }
    }, { passive: true });
  }

})();

/* ==========================================================================
   SAGGU STEEL INDUSTRIES — Site Scripts
   ========================================================================== */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initAOS();
    initStickyNav();
    initMobileMenu();
    initActiveNavHighlight();
    initSmoothAnchorClose();
    initStatCounters();
    initProductFilter();
    initGalleryLightbox();
    initContactForm();
    initScrollTopButton();
    initFooterYear();
  });

  /* ---- AOS scroll animations ---- */
  function initAOS() {
    if (window.AOS) {
      window.AOS.init({
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
        offset: 60
      });
    }
  }

  /* ---- Sticky header shadow ---- */
  function initStickyNav() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;
    function onScroll() {
      if (window.scrollY > 8) {
        navbar.classList.add('is-stuck');
      } else {
        navbar.classList.remove('is-stuck');
      }
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Mobile hamburger menu ---- */
  function initMobileMenu() {
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('navMenu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('is-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    menu.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function initSmoothAnchorClose() {
    // Native CSS scroll-behavior handles smooth scrolling;
    // this just ensures focus lands sensibly for accessibility.
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var id = link.getAttribute('href');
        if (id.length > 1) {
          var target = document.querySelector(id);
          if (target) {
            setTimeout(function () {
              target.setAttribute('tabindex', '-1');
            }, 600);
          }
        }
      });
    });
  }

  /* ---- Active nav link highlighting on scroll ---- */
  function initActiveNavHighlight() {
    var sections = ['home', 'about', 'products', 'gallery', 'why-us', 'contact']
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);
    var links = document.querySelectorAll('.nav-link');
    if (!sections.length || !links.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          links.forEach(function (link) {
            link.classList.toggle('active', link.dataset.section === id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (section) { observer.observe(section); });
  }

  /* ---- Animated stat counters (hero) ---- */
  function initStatCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    var animated = new WeakSet();

    function animate(el) {
      var target = parseInt(el.getAttribute('data-count'), 10) || 0;
      var duration = 1600;
      var start = null;

      function step(timestamp) {
        if (!start) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var value = Math.floor(eased * target);
        el.textContent = value.toLocaleString('en-IN') + (progress >= 1 ? '+' : '');
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target.toLocaleString('en-IN') + '+';
        }
      }
      requestAnimationFrame(step);
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !animated.has(entry.target)) {
          animated.add(entry.target);
          animate(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { observer.observe(el); });
  }

  /* ---- Product category filter ---- */
  function initProductFilter() {
    var buttons = document.querySelectorAll('.filter-btn');
    var cards = document.querySelectorAll('#productGrid .product-card');
    if (!buttons.length || !cards.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        var filter = btn.getAttribute('data-filter');

        cards.forEach(function (card) {
          var match = filter === 'all' || card.getAttribute('data-category') === filter;
          if (match) {
            card.style.display = '';
            requestAnimationFrame(function () {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            setTimeout(function () {
              if (card.style.opacity === '0') card.style.display = 'none';
            }, 220);
          }
        });
      });
    });

    cards.forEach(function (card) {
      card.style.transition = 'opacity .25s ease, transform .25s ease';
    });
  }

  /* ---- Gallery lightbox ---- */
  function initGalleryLightbox() {
    var items = document.querySelectorAll('.gallery-item');
    var lightbox = document.getElementById('lightbox');
    var content = document.getElementById('lightboxContent');
    var closeBtn = document.getElementById('lightboxClose');
    if (!items.length || !lightbox || !content) return;

    function open(item) {
      var template = item.querySelector('template');
      if (!template) return;
      // Clear previous content but keep the close button
      content.innerHTML = '';
      var newClose = document.createElement('button');
      newClose.className = 'lightbox__close';
      newClose.setAttribute('aria-label', 'Close preview');
      newClose.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      newClose.addEventListener('click', close);
      content.appendChild(newClose);
      content.appendChild(template.content.cloneNode(true));

      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    items.forEach(function (item) {
      item.addEventListener('click', function () { open(item); });
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.setAttribute('aria-label', 'View larger image');
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open(item);
        }
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', close);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  /* ---- Contact form validation ---- */
  function initContactForm() {
    var form = document.getElementById('contactForm');
    var success = document.getElementById('formSuccess');
    var errorBanner = document.getElementById('formError');
    if (!form) return;

    // TODO: replace with your own EmailJS Service ID and Template ID
    // (found in the EmailJS dashboard under Email Services / Email Templates)
    var EMAILJS_SERVICE_ID = 'service_94ux09o';
    var EMAILJS_TEMPLATE_ID = 'template_jpw6n28';

    var validators = {
      name: function (v) { return v.trim().length >= 2; },
      phone: function (v) { return /^[\d+\s()-]{7,15}$/.test(v.trim()); },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); },
      message: function (v) { return v.trim().length >= 5; }
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      Object.keys(validators).forEach(function (field) {
        var input = form.elements[field];
        var group = input.closest('.form-group');
        var isValid = validators[field](input.value);
        group.classList.toggle('has-error', !isValid);
        if (!isValid) valid = false;
      });

      if (errorBanner) errorBanner.classList.remove('is-visible');

      if (!valid) {
        success.classList.remove('is-visible');
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalBtnHTML = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      }

      if (typeof emailjs === 'undefined') {
        console.error('EmailJS SDK did not load — check the script tag and your connection.');
        if (errorBanner) errorBanner.classList.add('is-visible');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
        }
        return;
      }

      emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
        .then(function () {
          success.classList.add('is-visible');
          form.reset();
          setTimeout(function () {
            success.classList.remove('is-visible');
          }, 6000);
        })
        .catch(function (err) {
          console.error('EmailJS send failed:', err);
          if (errorBanner) errorBanner.classList.add('is-visible');
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHTML;
          }
        });
    });

    // Clear error state as the user corrects a field
    Object.keys(validators).forEach(function (field) {
      var input = form.elements[field];
      if (!input) return;
      input.addEventListener('input', function () {
        if (validators[field](input.value)) {
          input.closest('.form-group').classList.remove('has-error');
        }
      });
    });
  }

  /* ---- Scroll-to-top floating button ---- */
  function initScrollTopButton() {
    var btn = document.getElementById('scrollTop');
    if (!btn) return;

    function onScroll() {
      btn.classList.toggle('is-visible', window.scrollY > 500);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Footer year ---- */
  function initFooterYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

})();
/* ==========================================================================
   Library of the Blind - Accessibility & Interaction Scripts
   ========================================================================== */

(function () {
  'use strict';

  /* --- Utility --- */
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const scrollOpts = () =>
    prefersReducedMotion() ? { behavior: 'auto' } : { behavior: 'smooth' };

  /* --- i18n state --- */
  var currentLang = 'en';

  /* --- Local Storage helpers --- */
  function store(key, val) {
    try { localStorage.setItem('lotb-' + key, JSON.stringify(val)); }
    catch (_) { /* storage unavailable */ }
  }

  function load(key, fallback) {
    try {
      const v = localStorage.getItem('lotb-' + key);
      return v !== null ? JSON.parse(v) : fallback;
    } catch (_) { return fallback; }
  }

  /* =======================================================================
     Dark Mode
     ======================================================================= */
  function initDarkMode() {
    const btn = $('.dark-mode-toggle');
    if (!btn) return;

    const saved = load('dark-mode', null);
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved !== null ? saved : systemDark;

    applyDarkMode(isDark);

    btn.addEventListener('click', function () {
      const active = document.body.classList.toggle('dark-mode');
      document.body.classList.toggle('light-mode-override', !active);
      btn.setAttribute('aria-pressed', String(active));
      store('dark-mode', active);
    });
  }

  function applyDarkMode(isDark) {
    const btn = $('.dark-mode-toggle');
    document.body.classList.toggle('dark-mode', isDark);
    document.body.classList.toggle('light-mode-override', !isDark);
    if (btn) btn.setAttribute('aria-pressed', String(isDark));
  }

  /* =======================================================================
     High Contrast
     ======================================================================= */
  function initHighContrast() {
    const btn = $('.high-contrast-toggle');
    if (!btn) return;

    const saved = load('high-contrast', false);
    document.body.classList.toggle('high-contrast', saved);
    btn.setAttribute('aria-pressed', String(saved));

    btn.addEventListener('click', function () {
      const active = document.body.classList.toggle('high-contrast');
      btn.setAttribute('aria-pressed', String(active));
      store('high-contrast', active);
    });
  }

  /* =======================================================================
     Font Size Controls
     ======================================================================= */
  function initFontSize() {
    const sizes = [14, 16, 20, 24, 28, 32]; // px steps
    let currentIndex = load('font-size-index', 1); // default 16px

    function apply(index) {
      currentIndex = Math.max(0, Math.min(sizes.length - 1, index));
      document.documentElement.style.setProperty(
        '--font-size-base',
        sizes[currentIndex] + 'px'
      );
      store('font-size-index', currentIndex);
      var statusEl = $('#font-size-status');
      if (statusEl) {
        statusEl.textContent = t('font_size_announcement').replace('{size}', sizes[currentIndex]);
      }
    }

    apply(currentIndex);

    document.addEventListener('click', function (e) {
      const action = e.target.closest('[data-action]');
      if (!action) return;

      switch (action.dataset.action) {
        case 'font-decrease':
          apply(currentIndex - 1);
          break;
        case 'font-reset':
          apply(1);
          break;
        case 'font-increase':
          apply(currentIndex + 1);
          break;
      }
    });
  }

  /* =======================================================================
     Client-Side Search
     ======================================================================= */
  function initSearch() {
    const input = $('#search-input');
    const countEl = $('.search-count');
    if (!input) return;

    // Collect all list items in main content
    const items = $$('main[role="main"] li');
    if (!items.length) return;

    // Store original HTML for restoring highlights
    const originals = items.map(li => li.innerHTML);

    function doSearch(query) {
      const q = query.trim().toLowerCase();

      if (!q) {
        // Reset all
        items.forEach((li, i) => {
          li.classList.remove('search-hidden');
          li.innerHTML = originals[i];
        });
        if (countEl) countEl.textContent = '';
        return;
      }

      let visible = 0;
      items.forEach((li, i) => {
        const text = li.textContent.toLowerCase();
        if (text.includes(q)) {
          li.classList.remove('search-hidden');
          visible++;
          // Highlight matches
          li.innerHTML = highlightText(originals[i], query);
        } else {
          li.classList.add('search-hidden');
          li.innerHTML = originals[i];
        }
      });

      if (countEl) {
        countEl.textContent = t('search_count').replace('{visible}', visible).replace('{total}', items.length);
      }
    }

    function highlightText(html, query) {
      // Only highlight text content, not HTML tags or attributes
      const re = new RegExp(
        '(?<=>)([^<]*?)(' + escapeRegex(query) + ')([^<]*?)(?=<)',
        'gi'
      );
      // Also handle text at start/end
      let result = html.replace(re, function (_, before, match, after) {
        return '>' + before + '<mark>' + match + '</mark>' + after + '<';
      });

      // Handle plain text nodes not wrapped in tags
      const reSimple = new RegExp('(' + escapeRegex(query) + ')', 'gi');
      // Only apply to text outside tags
      result = result.replace(/>([^<]+)</g, function (full, text) {
        if (text.includes('<mark>')) return full;
        return '>' + text.replace(reSimple, '<mark>$1</mark>') + '<';
      });

      return result;
    }

    function escapeRegex(str) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // Debounced input handler
    let timer;
    input.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(() => doSearch(input.value), 150);
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function (e) {
      // "/" to focus search
      if (e.key === '/' && document.activeElement !== input) {
        e.preventDefault();
        input.focus();
      }
      // Escape to clear and blur
      if (e.key === 'Escape' && document.activeElement === input) {
        input.value = '';
        doSearch('');
        input.blur();
      }
    });
  }

  /* =======================================================================
     Back to Top
     ======================================================================= */
  function initBackToTop() {
    const btn = $('.back-to-top');
    if (!btn) return;

    function toggle() {
      const show = window.scrollY > 300;
      btn.hidden = !show;
    }

    window.addEventListener('scroll', toggle, { passive: true });
    toggle();

    btn.addEventListener('click', function () {
      window.scrollTo(Object.assign({ top: 0 }, scrollOpts()));
    });
  }

  /* =======================================================================
     Active TOC Tracking
     ======================================================================= */
  function initTocTracking() {
    const tocLinks = $$('.toc-link');
    if (!tocLinks.length) return;

    // Map section IDs to TOC links
    const sections = [];
    tocLinks.forEach(link => {
      const id = link.getAttribute('href');
      if (id && id.startsWith('#')) {
        const target = document.getElementById(id.slice(1));
        if (target) sections.push({ el: target, link: link });
      }
    });

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            tocLinks.forEach(l => l.classList.remove('active'));
            const match = sections.find(s => s.el === entry.target);
            if (match) match.link.classList.add('active');
          }
        });
      },
      {
        rootMargin: '-150px 0px -60% 0px',
        threshold: 0
      }
    );

    sections.forEach(s => observer.observe(s.el));

    // Smooth scroll on TOC click
    tocLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        const id = link.getAttribute('href');
        if (!id || !id.startsWith('#')) return;
        const target = document.getElementById(id.slice(1));
        if (target) {
          e.preventDefault();
          target.scrollIntoView(scrollOpts());
          target.focus({ preventScroll: true });
          history.pushState(null, '', id);
        }
      });
    });
  }

  /* =======================================================================
     Mobile Navigation Toggle
     ======================================================================= */
  function initNavToggle() {
    const btn = $('.nav-toggle');
    const links = $('.nav-links');
    if (!btn || !links) return;

    btn.addEventListener('click', function () {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      links.classList.toggle('open');
    });

    // Close on link click
    $$('.nav-links a').forEach(a => {
      a.addEventListener('click', function () {
        btn.setAttribute('aria-expanded', 'false');
        links.classList.remove('open');
      });
    });
  }

  /* =======================================================================
     Mobile TOC: collapse by default on small screens
     ======================================================================= */
  function initMobileToc() {
    if (window.innerWidth < 768) {
      const details = $('.toc-details');
      if (details) details.removeAttribute('open');
    }
  }

  /* =======================================================================
     i18n - Internationalization
     ======================================================================= */
  function t(key) {
    var strings = window.LOTB_I18N && window.LOTB_I18N[currentLang];
    if (strings && strings[key]) return strings[key];
    // Fallback to English
    var en = window.LOTB_I18N && window.LOTB_I18N['en'];
    if (en && en[key]) return en[key];
    return key;
  }

  function applyLanguage(langCode) {
    if (!window.LOTB_I18N || !window.LOTB_I18N[langCode]) return;
    currentLang = langCode;
    store('lang', langCode);

    // Update <html> lang and dir
    var htmlEl = document.documentElement;
    htmlEl.setAttribute('lang', langCode);
    var langMeta = window.LOTB_LANGUAGES && window.LOTB_LANGUAGES.find(function (l) { return l.code === langCode; });
    var dir = (langMeta && langMeta.dir) || 'ltr';
    htmlEl.setAttribute('dir', dir);
    document.body.classList.toggle('rtl', dir === 'rtl');

    // Swap text content for data-i18n-key elements
    $$('[data-i18n-key]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n-key'));
    });

    // Swap aria-label for data-i18n-aria elements
    $$('[data-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    });

    // Swap placeholder for data-i18n-placeholder elements
    $$('[data-i18n-placeholder]').forEach(function (el) {
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
    });

    // Update select value
    var select = $('#lang-select');
    if (select) select.value = langCode;
  }

  function initI18n() {
    var select = $('#lang-select');
    var saved = load('lang', 'en');

    if (select) {
      select.addEventListener('change', function () {
        applyLanguage(select.value);
      });
    }

    applyLanguage(saved);
  }

  /* =======================================================================
     Init
     ======================================================================= */
  document.addEventListener('DOMContentLoaded', function () {
    initI18n();
    initDarkMode();
    initHighContrast();
    initFontSize();
    initSearch();
    initBackToTop();
    initTocTracking();
    initNavToggle();
    initMobileToc();
  });
})();

/* Bonnie Mara Animal Hospital — shared site behavior
   Sticky header · desktop dropdown menus · mobile menu · JotForm success swap
   Loaded with `defer` on every page, so the DOM is ready when this runs. */
(function () {
  'use strict';

  /* ---------- Sticky header: transparent over hero, solid on scroll ---------- */
  var bar = document.getElementById('topbar');
  if (bar) {
    var onScroll = function () { bar.classList.toggle('scrolled', window.scrollY > 80); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  var desktop = window.matchMedia('(min-width: 921px)');

  /* ---------- Desktop dropdown menus ---------- */
  var menus = Array.prototype.slice.call(document.querySelectorAll('.topnav .has-menu'));

  function setMenu(li, open) {
    li.classList.toggle('open', open);
    var b = li.querySelector('.nav-trigger');
    if (b) b.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  function closeAllMenus(except) {
    menus.forEach(function (li) { if (li !== except) setMenu(li, false); });
  }

  menus.forEach(function (li) {
    var btn = li.querySelector('.nav-trigger');
    if (!btn) return;

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = li.classList.contains('open');
      closeAllMenus(li);
      setMenu(li, !isOpen);
    });

    li.addEventListener('focusout', function (e) {
      if (!li.contains(e.relatedTarget)) setMenu(li, false);
    });
    li.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && li.classList.contains('open')) { setMenu(li, false); btn.focus(); }
    });
  });

  document.addEventListener('click', function (e) {
    menus.forEach(function (li) { if (!li.contains(e.target)) setMenu(li, false); });
  });

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById('navBurger');
  var panel = document.getElementById('mobileNav');

  if (burger && panel) {
    var onKey = function (e) {
      if (e.key === 'Escape') { closePanel(); return; }
      if (e.key !== 'Tab') return;
      var f = [burger].concat(Array.prototype.slice.call(panel.querySelectorAll('a, button')))
        .filter(function (el) { return el.offsetParent !== null || el === burger; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };

    function openPanel() {
      panel.hidden = false;
      requestAnimationFrame(function () { panel.classList.add('open'); });
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Close menu');
      burger.classList.add('is-open');
      document.body.classList.add('nav-open');
      document.addEventListener('keydown', onKey);
      var firstLink = panel.querySelector('a, button');
      if (firstLink) firstLink.focus();
    }
    function closePanel() {
      panel.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Open menu');
      burger.classList.remove('is-open');
      document.body.classList.remove('nav-open');
      document.removeEventListener('keydown', onKey);
      window.setTimeout(function () { if (!panel.classList.contains('open')) panel.hidden = true; }, 320);
      burger.focus();
    }

    burger.addEventListener('click', function () {
      (burger.getAttribute('aria-expanded') === 'true') ? closePanel() : openPanel();
    });

    /* Mobile accordions (Services / Client Corner) */
    panel.querySelectorAll('.m-trigger').forEach(function (mb) {
      mb.addEventListener('click', function () {
        var exp = mb.getAttribute('aria-expanded') === 'true';
        mb.setAttribute('aria-expanded', exp ? 'false' : 'true');
        mb.parentNode.classList.toggle('open', !exp);
      });
    });

    /* Close when a real link (not an accordion toggle) is tapped */
    panel.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closePanel);
    });

    /* Close if the viewport grows to desktop */
    var onMQ = function (e) { if (e.matches && burger.getAttribute('aria-expanded') === 'true') closePanel(); };
    if (desktop.addEventListener) desktop.addEventListener('change', onMQ);
    else if (desktop.addListener) desktop.addListener(onMQ);
  }

  /* ---------- Service page: swap the sticky media image per active section ---------- */
  var svcMedia = document.querySelector('.svc-media');
  if (svcMedia && 'IntersectionObserver' in window) {
    var svcImgs = svcMedia.querySelectorAll('.svc-media-img');
    var svcBlocks = document.querySelectorAll('.svc-content .svc-block[data-section]');
    var activate = function (section) {
      svcImgs.forEach(function (im) {
        im.classList.toggle('is-active', im.getAttribute('data-media') === section);
      });
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) activate(e.target.getAttribute('data-section'));
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    svcBlocks.forEach(function (b) { io.observe(b); });
  }
})();

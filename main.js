// Yusuf Özçetin — portfolio scripts. Everything here is progressive: the page reads fully without it.

const CASES = {
  cju3y0pj: { unet: 0.510, hybrid: 0.973, note: 'A small polyp the U-Net breaks into fragments; the hybrid finds all of it.' },
  cju1c6yf: { unet: 0.516, hybrid: 0.937, note: 'A large polyp: the U-Net covers half of it, the hybrid nearly all.' },
  cju8a1jt: { unet: 0.587, hybrid: 0.949, note: 'The U-Net misses the far edge; the hybrid follows the boundary.' },
  cju2pjb9: { unet: 0.736, hybrid: 0.956, note: 'A flat polyp against folds of tissue; the hybrid keeps its shape.' },
  cju1erep: { unet: 0.979, hybrid: 0.986, note: 'An easy frame: both models are close to perfect.' },
  cju2hfqn: { unet: 0.582, hybrid: 0.216, note: 'Here the U-Net is better. The hybrid misses most of this tiny polyp.' },
};
const NAMES = { gt: 'Ground truth', unet: 'U-Net', hybrid: 'HybridQTN', none: 'Frame only' };

(() => {
  const viewer = document.getElementById('viewer');
  if (!viewer) return;
  const frame = document.getElementById('v-frame');
  const overlay = document.getElementById('v-overlay');
  const vName = document.getElementById('v-name');
  const vFact = document.getElementById('v-fact');
  const note = document.getElementById('case-note');
  const maskBtns = document.querySelectorAll('#mask-pick button');
  const caseBtns = document.querySelectorAll('#case-pick button');
  let current = 'cju3y0pj';
  let mask = 'hybrid';

  const base = 'assets/cases/';
  const fmt = (n) => n.toFixed(3);

  // warm the cache so switching never flashes
  Object.keys(CASES).forEach((id) => ['', '-gt', '-unet', '-hybrid'].forEach((s) => {
    const img = new Image(); img.src = `${base}${s ? 'a-' : ''}${id}${s}.${s ? 'png' : 'jpg'}`;
  }));

  function render() {
    const c = CASES[current];
    if (mask === 'none') {
      overlay.classList.add('is-off');
    } else {
      overlay.style.setProperty('--m', `url("${base}a-${current}-${mask}.png")`);
      overlay.classList.remove('is-off');
    }
    vName.textContent = NAMES[mask];
    vFact.textContent = mask === 'unet' ? `Dice ${fmt(c.unet)}` : mask === 'hybrid' ? `Dice ${fmt(c.hybrid)}` : mask === 'gt' ? 'the target' : 'no mask';
    maskBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mask === mask)));
    caseBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.case === current)));
  }

  function setCase(id) {
    if (id === current) return;
    current = id;
    const c = CASES[id];
    const wrap = frame.parentElement;
    wrap.classList.add('is-swapping');
    frame.src = `${base}${id}.jpg`;
    document.getElementById('r-gt').src = `${base}${id}-gt.png`;
    document.getElementById('r-unet').src = `${base}${id}-unet.png`;
    document.getElementById('r-hybrid').src = `${base}${id}-hybrid.png`;
    document.getElementById('r-unet-d').textContent = fmt(c.unet);
    document.getElementById('r-hybrid-d').textContent = fmt(c.hybrid);
    note.textContent = c.note;
    frame.onload = () => wrap.classList.remove('is-swapping');
    render();
  }

  maskBtns.forEach((b) => b.addEventListener('click', () => { mask = b.dataset.mask; render(); }));
  caseBtns.forEach((b) => b.addEventListener('click', () => setCase(b.dataset.case)));
  render();
})();

// Stagger index for entrances: each [data-reveal] counts its position within its section
(() => {
  document.querySelectorAll('section').forEach((s) => {
    s.querySelectorAll('[data-reveal]').forEach((el, i) => el.style.setProperty('--i', i));
  });
  document.querySelectorAll('.hero .frame, .hero .panel').forEach((el, i) => el.style.setProperty('--i', i % 9));
})();

// Reveal once on entry; never leaves content hidden
(() => {
  const targets = document.querySelectorAll('[data-reveal], .shutter');
  if (!('IntersectionObserver' in window)) { targets.forEach((el) => el.classList.add('is-in')); return; }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      // a shutter is clipped shut, so it is watched through its container
      const el = e.target.__reveals || e.target;
      el.classList.add('is-in');
      io.unobserve(e.target);
    }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  targets.forEach((el) => {
    if (el.classList.contains('shutter')) { const host = el.parentElement; host.__reveals = el; io.observe(host); }
    else io.observe(el);
  });
  window.addEventListener('load', () => setTimeout(() => {
    targets.forEach((el) => { const r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) el.classList.add('is-in'); });
  }, 2500));
})();

// The sheet drifts: each column moves at its own rate as the hero scrolls away
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const wide = matchMedia('(min-width: 721px)');
  const cols = [...document.querySelectorAll('.hero .col')];
  if (!cols.length) return;
  const rates = [0.10, 0.22, 0.05, 0.28, 0.14, 0.24, 0.08];
  let ticking = false;
  function update() {
    ticking = false;
    if (reduce.matches || !wide.matches) { cols.forEach((c) => (c.style.transform = '')); return; }
    const y = Math.min(scrollY, innerHeight);
    cols.forEach((c, i) => { c.style.transform = `translateY(calc(var(--off) - ${(y * rates[i]).toFixed(1)}px))`; });
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener('resize', update);
})();

// Istanbul local time in the footer
(() => {
  const el = document.getElementById('clock');
  if (!el) return;
  const f = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Istanbul' });
  const tick = () => { el.textContent = f.format(new Date()); };
  tick(); setInterval(tick, 30000);
})();

// The clip loops muted; it stays on its poster frame for visitors who ask for less motion
(() => {
  const v = document.getElementById('clip');
  if (!v) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const apply = () => { if (reduce.matches) { v.removeAttribute('autoplay'); v.pause(); } else { v.play().catch(() => {}); } };
  apply(); reduce.addEventListener('change', apply);
})();

(function () {
  'use strict';
  var WA = '919463649049';
  var PRODUCTS = [
    ['2 Door Steel Almirah', 'Steel Furniture', 'A practical two door steel almirah for everyday storage.', 'almirah2'],
    ['3 Door Steel Almirah', 'Steel Furniture', 'A three door steel almirah with more storage space.', 'almirah3'],
    ['Mirror Almirah', 'Steel Furniture', 'Steel almirah with a mirror, suitable for bedrooms.', 'mirror'],
    ['Office Almirah', 'Steel Furniture', 'Steel almirah for files, records and office storage.', 'office'],
    ['Locker Almirah', 'Steel Furniture', 'Steel almirah with locker storage for valuables and documents.', 'locker'],
    ['Custom Steel Almirah', 'Steel Furniture', 'Made to your requirement. Tell us what you need.', 'almirah2', true],
    ['Desert Cooler', 'Air Coolers', 'Air cooler for larger rooms and hot, dry weather.', 'desert'],
    ['Personal Cooler', 'Air Coolers', 'Compact air cooler for personal and small-room use.', 'personal'],
    ['Tower Cooler', 'Air Coolers', 'Slim tower air cooler that saves floor space.', 'tower'],
    ['Industrial Cooler', 'Air Coolers', 'Air cooler for workshops and industrial spaces.', 'desert'],
    ['Commercial Cooler', 'Air Coolers', 'Air cooler for shops, halls and commercial spaces.', 'desert']
  ];
  var $ = function (id) { return document.getElementById(id); };
  var O = '#F5A400', reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function esc(t) { return t.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* Placeholder steel illustrations. Replace with real photos (see README). */
  function fan(cx, cy, r) {
    var b = '';
    for (var i = 0; i < 4; i++) b += '<path d="M' + cx + ' ' + cy + 'Q' + (cx + r * .5) + ' ' + (cy - r) + ' ' + cx + ' ' + (cy - r) + 'Q' + (cx - r * .3) + ' ' + (cy - r * .4) + ' ' + cx + ' ' + cy + '" fill="#e9edf0" transform="rotate(' + i * 90 + ' ' + cx + ' ' + cy + ')"/>';
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r + 3) + '" fill="#12171c"/><g class="fan">' + b + '</g><circle cx="' + cx + '" cy="' + cy + '" r="3" fill="' + O + '"/>';
  }
  function art(k) {
    var s = '<svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="120" height="90" fill="#dfe4e8"/><rect y="78" width="120" height="12" fill="#aab4bd"/>';
    var d = function (x, w) { return '<rect x="' + x + '" y="12" width="' + w + '" height="66" fill="url(#st)" stroke="#4a5560" stroke-width="1.2"/><path d="M' + (x + 5) + ' 20h' + (w - 10) + 'M' + (x + 5) + ' 25h' + (w - 10) + 'M' + (x + 5) + ' 30h' + (w - 10) + '" stroke="#5d6a76" stroke-width=".8"/>'; };
    var h = function (x) { return '<rect x="' + x + '" y="44" width="2.2" height="12" rx="1" fill="#2c3640"/>'; };
    if (k === 'almirah2') s += d(30, 30) + d(60, 30) + h(56) + h(62);
    else if (k === 'almirah3') s += d(22, 25) + d(47, 26) + d(73, 25) + h(43) + h(49) + h(70) + h(76);
    else if (k === 'mirror') s += d(30, 30) + '<rect x="60" y="12" width="30" height="66" fill="url(#gl)" stroke="#4a5560" stroke-width="1.2"/><path d="M66 70l16-48" stroke="#fff" stroke-width="3" opacity=".7"/>' + h(56);
    else if (k === 'office') s += '<rect x="32" y="10" width="56" height="68" fill="url(#st)" stroke="#4a5560" stroke-width="1.2"/>' + [0, 1, 2, 3].map(function (i) { return '<rect x="36" y="' + (14 + i * 16) + '" width="48" height="13" fill="url(#sd)"/><rect x="54" y="' + (18 + i * 16) + '" width="12" height="3" fill="' + O + '"/>'; }).join('');
    else if (k === 'locker') s += [0, 1, 2].map(function (i) { return '<rect x="' + (26 + i * 23) + '" y="12" width="22" height="66" fill="url(#st)" stroke="#4a5560" stroke-width="1.2"/><rect x="' + (30 + i * 23) + '" y="20" width="14" height="4" fill="#2c3640"/><circle cx="' + (37 + i * 23) + '" cy="50" r="2.6" fill="' + O + '"/>'; }).join('');
    else if (k === 'personal') s += '<rect x="34" y="26" width="52" height="50" rx="5" fill="url(#st)" stroke="#4a5560" stroke-width="1.2"/><rect x="40" y="32" width="40" height="26" rx="2" fill="#12171c"/>' + fan(60, 45, 10) + '<rect x="42" y="64" width="36" height="6" fill="url(#sd)"/>';
    else if (k === 'tower') s += '<rect x="44" y="6" width="32" height="74" rx="5" fill="url(#st)" stroke="#4a5560" stroke-width="1.2"/><rect x="48" y="12" width="24" height="30" fill="#12171c"/>' + fan(60, 27, 9) + '<circle cx="60" cy="56" r="3" fill="' + O + '"/><rect x="50" y="64" width="20" height="8" fill="url(#sd)"/>';
    else s += '<rect x="24" y="18" width="72" height="58" rx="4" fill="url(#st)" stroke="#4a5560" stroke-width="1.2"/><rect x="32" y="26" width="56" height="34" fill="#12171c"/>' + fan(60, 43, 13) + '<circle cx="60" cy="68" r="3" fill="' + O + '"/><rect x="30" y="76" width="6" height="4" fill="#2c3640"/><rect x="84" y="76" width="6" height="4" fill="#2c3640"/>';
    return s + '</svg>';
  }
  $('aboutImg').innerHTML = art('office');
  $('yr').textContent = new Date().getFullYear();
  $('belt').innerHTML = (function () { var t = PRODUCTS.map(function (p) { return '<span>' + p[0] + '</span><i></i>'; }).join(''); return t + t; })();

  /* Hero almirah doors */
  var alm = $('alm'), btn = $('doorBtn');
  if (reduce) { btn.hidden = true; } else { alm.classList.add('pre'); setTimeout(function () { alm.classList.remove('pre'); alm.classList.add('shut'); void alm.offsetWidth; setTimeout(function () { alm.classList.remove('shut'); }, 500); }, 100); }
  btn.addEventListener('click', function () { var shut = alm.classList.toggle('shut'); btn.textContent = shut ? 'Open the doors' : 'Close the doors'; btn.setAttribute('aria-pressed', !shut); });
  alm.addEventListener('click', function () { btn.click(); });

  function waLink(t) { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(t); }
  function enq(p) { return p[4] ? 'Hello Saggu Steel Furniture, I would like to enquire about a custom steel almirah. Please contact me to discuss the available options and quotation.' : 'Hello Saggu Steel Furniture, I am interested in your ' + p[0] + '. Please share the available options, specifications, and price.'; }

  /* Products */
  var st = { cat: 'all', q: '' };
  function render() {
    var q = st.q.trim().toLowerCase();
    var list = PRODUCTS.filter(function (p) { return (st.cat === 'all' || p[1] === st.cat) && (!q || p[0].toLowerCase().indexOf(q) > -1); });
    $('grid').innerHTML = list.map(function (p, i) {
      return '<article class="pc plate" style="animation-delay:' + i * 60 + 'ms"><div class="im" role="img" aria-label="Illustration of ' + esc(p[0]) + '">' + art(p[3]) + '</div><div class="bd"><span class="cat">' + p[1] + '</span><h3>' + esc(p[0]) + '</h3><p>' + esc(p[2]) + '</p><span class="pr">Contact for Price</span><a class="btn btn-mari" href="' + waLink(enq(p)) + '" target="_blank" rel="noopener noreferrer">Enquire Now</a></div></article>';
    }).join('');
    $('count').textContent = 'Showing ' + list.length + ' of ' + PRODUCTS.length + ' products';
    $('empty').hidden = list.length > 0;
    $('clear2').hidden = !(q || st.cat !== 'all') || !list.length;
  }
  function setCat(c) { st.cat = c; document.querySelectorAll('.chip').forEach(function (b) { var on = b.dataset.cat === c; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); }); render(); }
  function clearAll() { st.q = ''; $('q').value = ''; setCat('all'); }
  $('q').addEventListener('input', function (e) { st.q = e.target.value; render(); });
  document.querySelectorAll('.chip').forEach(function (b) { b.addEventListener('click', function () { setCat(b.dataset.cat); }); });
  $('clear').onclick = clearAll; $('clear2').onclick = clearAll;
  document.querySelectorAll('[data-go]').forEach(function (a) { a.addEventListener('click', function () { setCat(a.dataset.go); }); });
  render();
  $('fpr').innerHTML = '<option value="">Select a product</option>' + PRODUCTS.map(function (p) { return '<option>' + esc(p[0]) + '</option>'; }).join('') + '<option>Other / Not sure</option>';

  /* Menu */
  var menu = $('menu'), burger = $('burger');
  function tm(o) { menu.classList.toggle('open', o); burger.setAttribute('aria-expanded', o); burger.setAttribute('aria-label', o ? 'Close menu' : 'Open menu'); }
  burger.addEventListener('click', function () { tm(!menu.classList.contains('open')); });
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { tm(false); }); });

  /* Gallery + lightbox */
  var GAL = [['almirah2', '2 door steel almirah'], ['almirah3', '3 door steel almirah'], ['mirror', 'mirror almirah'], ['office', 'office almirah'], ['locker', 'locker almirah'], ['desert', 'desert air cooler'], ['tower', 'tower air cooler'], ['personal', 'personal air cooler']];
  $('gal').innerHTML = GAL.map(function (g, i) { return '<button data-i="' + i + '" aria-label="Enlarge image: placeholder ' + g[1] + '"><span role="img" aria-label="Placeholder illustration: ' + g[1] + '">' + art(g[0]) + '</span></button>'; }).join('');
  var lb = $('lb'), cur = 0;
  function show(i) { cur = (i + GAL.length) % GAL.length; $('lbi').innerHTML = art(GAL[cur][0]); $('lbc').textContent = 'Placeholder: ' + GAL[cur][1]; }
  $('gal').addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; show(+b.dataset.i); if (lb.showModal) lb.showModal(); else lb.setAttribute('open', ''); });
  $('lbx').onclick = function () { lb.close(); }; $('lbp').onclick = function () { show(cur - 1); }; $('lbn').onclick = function () { show(cur + 1); };
  lb.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') show(cur - 1); if (e.key === 'ArrowRight') show(cur + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });

  /* Open status, India time */
  try {
    var p = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
    var g = function (t) { return p.filter(function (x) { return x.type === t; })[0].value; };
    var m = (+g('hour') % 24) * 60 + +g('minute');
    var isOpen = g('weekday') !== 'Sun' && m >= 540 && m < 1140; $('open').textContent = isOpen ? 'Open now' : 'Closed now'; $('open').className = 'badge ' + (isOpen ? 'on' : 'off'); $('open').title = 'Based on India time';
  } catch (e) {}

  /* Enquiry form: send by WhatsApp or email */
  var form = $('form'), busy = false;
  function se(id, msg, f) { $('e-' + id).textContent = msg; f.setAttribute('aria-invalid', msg ? 'true' : 'false'); return !msg; }
  function validate() {
    var n = $('fn'), pp = $('fp'), e = $('fe'), pr = $('fpr'), m = $('fm');
    var ph = pp.value.replace(/[\s-]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, ''), ok = true;
    ok = se('fn', n.value.trim().length < 2 ? 'Please enter your full name.' : '', n) && ok;
    ok = se('fp', /^[6-9]\d{9}$/.test(ph) ? '' : 'Please enter a valid 10-digit Indian mobile number.', pp) && ok;
    ok = se('fe', e.value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e.value) ? 'Please enter a valid email or leave it blank.' : '', e) && ok;
    ok = se('fpr', pr.value ? '' : 'Please choose a product.', pr) && ok;
    ok = se('fm', m.value.trim().length < 5 ? 'Please write a short message.' : '', m) && ok;
    return ok ? ph : null;
  }
  form.addEventListener('submit', function (ev) {
    ev.preventDefault(); if (busy) return;
    var ph = validate();
    if (!ph) { $('status').className = 'status'; $('status').textContent = 'Please fix the highlighted fields.'; return; }
    var via = ev.submitter && ev.submitter.value === 'mail' ? 'mail' : 'wa';
    var msg = 'Hello Saggu Steel Furniture, I would like to make an enquiry.\nName: ' + $('fn').value.trim() + '\nPhone: ' + ph + ($('fe').value ? '\nEmail: ' + $('fe').value.trim() : '') + '\nProduct: ' + $('fpr').value + '\nMessage: ' + $('fm').value.trim();
    busy = true; form.querySelectorAll('.sendrow .btn').forEach(function (b) { b.disabled = true; });
    if (via === 'mail') { window.location.href = 'mailto:yashnitsingh000@gmail.com?subject=' + encodeURIComponent('Enquiry: ' + $('fpr').value) + '&body=' + encodeURIComponent(msg); }
    else { window.open(waLink(msg), '_blank', 'noopener'); }
    $('status').className = 'status ok';
    $('status').textContent = (via === 'mail' ? 'Your email app has opened with your details. ' : 'WhatsApp has opened with your details. ') + 'Please press Send there to submit your enquiry. If nothing opened, use the Call Now or WhatsApp Us button above.';
    setTimeout(function () { busy = false; form.querySelectorAll('.sendrow .btn').forEach(function (b) { b.disabled = false; }); }, 4000);
  });
  form.addEventListener('input', function (e) { if (e.target.getAttribute('aria-invalid') === 'true') validate(); });

  /* Get a Quote: jump to the form, pre-fill the message */
  $('quoteBtn').addEventListener('click', function (e) {
    e.preventDefault();
    if (!$('fm').value) $('fm').value = 'I would like a quotation. Please share the available options and price.';
    form.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    setTimeout(function () { $('fpr').focus({ preventScroll: true }); }, reduce ? 0 : 600);
  });

  /* Copy buttons */
  document.querySelectorAll('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var t = b.dataset.copy, orig = b.textContent;
      function done() { b.textContent = 'Copied'; b.classList.add('done'); setTimeout(function () { b.textContent = orig; b.classList.remove('done'); }, 1500); }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(done, function () { b.textContent = 'Copy failed'; });
      else { var ta = document.createElement('textarea'); ta.value = t; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); done(); } catch (x) { b.textContent = 'Copy failed'; } document.body.removeChild(ta); }
    });
  });

  /* Scroll: progress bar, nav shadow, back-to-top, active link, reveal */
  var top = $('top'), prog = $('prog'), nav = $('nav');
  function onScroll() {
    var h = document.documentElement, y = window.scrollY;
    prog.style.width = (y / Math.max(1, h.scrollHeight - h.clientHeight) * 100) + '%';
    nav.classList.toggle('sc', y > 10); top.hidden = y < 700;
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  top.addEventListener('click', function () { window.scrollTo({ top: 0 }); });
  if ('IntersectionObserver' in window) {
    var links = {}; menu.querySelectorAll('a[href^="#"]').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
    var so = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting && links[e.target.id]) { Object.keys(links).forEach(function (k) { links[k].classList.remove('on'); }); links[e.target.id].classList.add('on'); } }); }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { so.observe(s); });
    var ro = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } }); }, { threshold: .12 });
    document.querySelectorAll('.sec h2, .two > *, .cards .card, .testi').forEach(function (el) { el.classList.add('rvl'); ro.observe(el); });
  }
})();

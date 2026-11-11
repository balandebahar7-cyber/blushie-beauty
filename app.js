'use strict';
const $ = (s, r = document) => r.querySelector(s);
const LS = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
};
let lang = LS.get('bb-lang', 'fa'), cart = LS.get('bb-cart', {});
const F = { cat: 'all', max: 1200000, sort: 'pop', sale: false, q: '' };
const L = () => (lang === 'fa' ? 0 : 1);

/* ---------- i18n: [fa, en] ---------- */
const T = {
  brand: ['بلاشی بیوتی', 'Blushie Beauty'], home: ['خانه', 'Home'], shop: ['فروشگاه', 'Shop'],
  offers: ['پیشنهاد ویژه', 'Special Offers'], about: ['درباره ما', 'About'], contact: ['تماس با ما', 'Contact'],
  search: ['جستجو', 'Search'], searchPh: ['جستجوی محصول…', 'Search products…'],
  top: ['ارسال رایگان برای خرید بالای ۱ میلیون تومان ✿ هدیه همراه هر سفارش', 'Free shipping over 1,000,000 Toman ✿ A free gift with every order'],
  heroK: ['کالکشن جدید زمستان', 'New Winter Collection'],
  heroT: ['درخششی طبیعی، با لمسی از صورتی', 'A natural glow, with a touch of pink'],
  heroS: ['آرایشی و مراقبتی لطیف و باکیفیت، ساخته‌شده برای زیبایی روزمره شما.', 'Soft, high-quality makeup and skincare made for your everyday beauty.'],
  shopNow: ['مشاهده محصولات', 'Shop now'], cats: ['دسته‌بندی‌ها', 'Shop by category'],
  lips: ['لب', 'Lips'], face: ['صورت', 'Face'], eyes: ['چشم', 'Eyes'], skin: ['مراقبت پوست', 'Skincare'], all: ['همه', 'All'],
  best: ['پرفروش‌ترین‌ها', 'Best sellers'], deals: ['تخفیف‌های ویژه', 'Special deals'],
  add: ['افزودن به سبد', 'Add to cart'], added: ['به سبد خرید اضافه شد ♡', 'Added to your cart ♡'],
  promoT: ['جشنواره زمستانی؛ تا ۳۰٪ تخفیف', 'Winter festival: up to 30% off'],
  promoS: ['محصولات منتخب مراقبت پوست و آرایش با قیمتی ویژه تا پایان فصل.', 'Selected skincare and makeup at special prices until the end of the season.'],
  b1: ['ارسال رایگان', 'Free shipping'], b1d: ['برای خرید بالای ۱ میلیون تومان', 'On orders over 1M Toman'],
  b2: ['اصالت تضمینی', 'Authentic'], b2d: ['۱۰۰٪ اورجینال با ضمانت بازگشت', '100% original, money-back promise'],
  b3: ['هدیه همراه سفارش', 'Free gift'], b3d: ['نمونه رایگان در هر بسته', 'A sample in every box'],
  b4: ['پشتیبانی هفت‌روزه', '7-day support'], b4d: ['پاسخگویی از ۹ تا ۲۱', 'Replies from 9am to 9pm'],
  filters: ['فیلترها', 'Filters'], price: ['سقف قیمت', 'Max price'], sort: ['مرتب‌سازی', 'Sort by'],
  pop: ['محبوب‌ترین', 'Most popular'], low: ['ارزان‌ترین', 'Price: low to high'], high: ['گران‌ترین', 'Price: high to low'],
  saleOnly: ['فقط تخفیف‌دار', 'On sale only'], results: ['محصول', 'products'], none: ['محصولی پیدا نشد. فیلترها را تغییر دهید.', 'No products found. Try changing the filters.'],
  desc: ['توضیحات', 'Details'], ingr: ['ترکیبات', 'Ingredients'], ship: ['ارسال و بازگشت', 'Shipping & returns'],
  ingrT: ['آب، گلیسیرین، عصاره گل رز، روغن جوجوبا، ویتامین E، پانتنول. فاقد پارابن و الکل.', 'Aqua, glycerin, rose extract, jojoba oil, vitamin E, panthenol. Paraben- and alcohol-free.'],
  shipT: ['ارسال ۲ تا ۴ روز کاری به سراسر ایران. امکان بازگشت کالا تا ۷ روز پس از دریافت.', 'Delivery in 2–4 business days across Iran. Returns accepted within 7 days of delivery.'],
  qty: ['تعداد', 'Quantity'], related: ['محصولات مشابه', 'You may also like'],
  cartT: ['سبد خرید', 'Shopping cart'], empty: ['سبد خرید شما خالی است', 'Your cart is empty'],
  sub: ['جمع جزء', 'Subtotal'], shipping: ['هزینه ارسال', 'Shipping'], free: ['رایگان', 'Free'], total: ['مبلغ قابل پرداخت', 'Total'],
  checkout: ['ادامه و تسویه حساب', 'Proceed to checkout'], remove: ['حذف', 'Remove'],
  name: ['نام و نام خانوادگی', 'Full name'], phone: ['شماره موبایل', 'Mobile number'], addr: ['نشانی کامل', 'Full address'], city: ['شهر', 'City'],
  place: ['ثبت سفارش آزمایشی', 'Place demo order'], demo: ['این یک نمونه نمایشی است؛ هیچ پرداختی انجام نمی‌شود.', 'This is a demo; no payment is processed.'],
  success: ['سفارش شما ثبت شد', 'Your order is placed'], orderNo: ['شماره سفارش', 'Order number'], back: ['بازگشت به فروشگاه', 'Back to shop'],
  email: ['ایمیل', 'Email'], msg: ['پیام شما', 'Your message'], send: ['ارسال پیام', 'Send message'],
  sent: ['پیام شما ارسال شد؛ به‌زودی پاسخ می‌دهیم.', 'Message sent. We will reply soon.'],
  aboutT: ['داستان بلاشی', 'The Blushie story'],
  about1: ['بلاشی بیوتی در سال ۱۴۰۲ با یک ایده ساده شروع شد: آرایش و مراقبت پوستی که هم لطیف باشد و هم قابل اعتماد.', 'Blushie Beauty began in 2023 with a simple idea: makeup and skincare that is both gentle and dependable.'],
  about2: ['فرمول‌های ما با عصاره‌های گیاهی و بدون پارابن تهیه می‌شوند و بسته‌بندی‌هایمان را طوری طراحی می‌کنیم که هر روز دلتان بخواهد از آن‌ها استفاده کنید.', 'Our formulas use plant extracts and no parabens, and we design every package so you will want to reach for it each day.'],
  st1: ['مشتری راضی', 'happy customers'], st2: ['محصول', 'products'], st3: ['شهر', 'cities served'],
  contactT: ['با ما در تماس باشید', 'Get in touch'], hours: ['همه روزه ۹ تا ۲۱', 'Daily 9am – 9pm'],
  address: ['تهران، خیابان ولیعصر، پلاک ۱۲۰', '120 Valiasr St, Tehran'],
  foot: ['نمونه‌کار طراحی وب؛ برند و محصولات خیالی هستند.', 'Web design portfolio piece; brand and products are fictional.'],
  cur: ['تومان', 'Toman'], notfound: ['صفحه پیدا نشد', 'Page not found']
};
const t = k => (T[k] ? T[k][L()] : k);
const num = n => n.toLocaleString(lang === 'fa' ? 'fa-IR' : 'en-US');
const money = n => num(n) + ' ' + t('cur');

/* ---------- Products ---------- */
const P = [
  { id: 1, cat: 'lips', ty: 'lip', c: '#e8788f', pr: 420000, old: 520000, r: 4.8, n: ['رژلب مات مخملی رزی', 'Rosy Velvet Matte Lipstick'], d: ['مات و سبک با ماندگاری ۸ ساعته و عصاره جوجوبا.', 'Light matte colour with 8-hour wear and jojoba extract.'] },
  { id: 2, cat: 'lips', ty: 'tube', c: '#f29bb0', pr: 290000, r: 4.6, n: ['لیپ‌گلاس آبرسان شیری', 'Milky Hydrating Lip Gloss'], d: ['براقی شفاف و نرم بدون چسبندگی.', 'Clear, soft shine without any stickiness.'] },
  { id: 3, cat: 'lips', ty: 'jar', c: '#f6b8c6', pr: 340000, old: 410000, r: 4.7, n: ['بالم لب شیر و عسل', 'Milk & Honey Lip Balm'], d: ['تغذیه عمیق لب‌های خشک در سرمای زمستان.', 'Deep care for dry lips in winter weather.'] },
  { id: 4, cat: 'face', ty: 'pal', c: '#f4a9b8', pr: 780000, r: 4.9, n: ['پالت رژگونه و هایلایتر صدفی', 'Pearl Blush & Highlighter Palette'], d: ['چهار رنگ صورتی برای گونه‌هایی درخشان.', 'Four pink shades for luminous cheeks.'] },
  { id: 5, cat: 'face', ty: 'bottle', c: '#f7cdb8', pr: 960000, old: 1200000, r: 4.8, n: ['کرم پودر ابریشمی', 'Silk Skin Foundation'], d: ['پوشش متوسط تا کامل با پوست‌نمای طبیعی.', 'Medium-to-full coverage with a natural skin finish.'] },
  { id: 6, cat: 'face', ty: 'tube', c: '#f5b5a8', pr: 380000, r: 4.5, n: ['کانسیلر روشن‌کننده', 'Brightening Concealer'], d: ['پوشش‌دهنده تیرگی زیر چشم با فرمول سبک.', 'Lightweight formula that covers dark circles.'] },
  { id: 7, cat: 'eyes', ty: 'pal', c: '#d99aa8', pr: 890000, r: 4.9, n: ['پالت سایه چشم گلبرگ', 'Petal Eyeshadow Palette'], d: ['شش رنگ مات و شیمر برای هر ساعت از روز.', 'Six matte and shimmer shades for any time of day.'] },
  { id: 8, cat: 'eyes', ty: 'tube', c: '#5a3a44', pr: 330000, old: 400000, r: 4.6, n: ['ریمل حجم‌دهنده', 'Volume Lift Mascara'], d: ['مژه‌های پرحجم و بلند، ضدآب و بدون ریزش.', 'Full, lifted lashes: waterproof and smudge-free.'] },
  { id: 9, cat: 'skin', ty: 'bottle', c: '#f9d3da', pr: 1150000, r: 4.9, n: ['سرم روشن‌کننده رز', 'Rose Glow Serum'], d: ['سرم ویتامین C و گل رز برای پوستی شاداب.', 'Vitamin C and rose serum for fresh, radiant skin.'] },
  { id: 10, cat: 'skin', ty: 'jar', c: '#fbe2e6', pr: 870000, old: 1050000, r: 4.7, n: ['کرم آبرسان گلبرگ', 'Petal Hydra Cream'], d: ['آبرسانی ۴۸ ساعته با بافتی ابری و سبک.', '48-hour hydration in a light, cloud-soft texture.'] },
  { id: 11, cat: 'skin', ty: 'tube', c: '#f7c6d0', pr: 520000, r: 4.4, n: ['ژل شست‌وشوی ملایم', 'Gentle Cleansing Gel'], d: ['پاک‌کننده ملایم مناسب انواع پوست.', 'A mild cleanser suited to every skin type.'] },
  { id: 12, cat: 'skin', ty: 'bottle', c: '#ffe0cc', pr: 610000, r: 4.6, n: ['تونر آبرسان گل رز', 'Rose Water Hydrating Toner'], d: ['تونر بدون الکل برای تعادل و طراوت پوست.', 'Alcohol-free toner that balances and refreshes.'] }
];
const CATS = ['lips', 'face', 'eyes', 'skin'];

const PHOTOS = false; // set true after adding images/p1.jpg … p12.jpg (800x800)
let gid = 0;
function art(p, flat) {
  const u = 'g' + (++gid), c = p.c, sh = `url(#${u}s)`, gd = `url(#${u}g)`, bk = `url(#${u}k)`;
  const R = (x, y, w, h, r, f, o = 1) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}" opacity="${o}"/>`;
  const RB = (x, y, w, h, r, f) => R(x, y, w, h, r, f) + R(x, y, w, h, r, sh);
  const lab = (x, y, w, h) => R(x, y, w, h, 10, '#fff', .85) + R(x + 12, y + 14, w - 24, 5, 2.5, c, .8) + R(x + 18, y + 26, w - 36, 4, 2, c, .45) + `<circle cx="${x + w / 2}" cy="${y + h - 14}" r="6" fill="${c}" opacity=".7"/>`;
  const gl = (x, y, h) => R(x, y, 7, h, 3.5, '#fff', .4);
  const pans = [c, '#f6cdd5', '#e9a3b5', '#f3b8c4', '#fbe3e8', c].map((f, i) => { const x = 66 + (i % 3) * 34, y = 106 + Math.floor(i / 3) * 36; return `<circle cx="${x}" cy="${y}" r="15" fill="${f}"/><circle cx="${x}" cy="${y}" r="15" fill="${sh}"/><circle cx="${x - 5}" cy="${y - 6}" r="4" fill="#fff" opacity=".45"/>`; }).join('');
  const s = {
    lip: RB(70, 118, 60, 74, 9, bk) + R(70, 144, 60, 12, 2, gd) + R(70, 144, 60, 12, 2, sh) + `<path d="M80 118V70q20-34 40 0v48z" fill="${c}"/><path d="M80 118V70q20-34 40 0v48z" fill="${sh}"/><path d="M84 76q6-14 14-16" stroke="#fff" stroke-width="4" stroke-linecap="round" fill="none" opacity=".55"/>`,
    bottle: RB(86, 28, 28, 38, 7, gd) + R(92, 64, 16, 10, 2, gd) + RB(58, 72, 84, 120, 26, c) + gl(68, 86, 86) + lab(70, 104, 60, 58),
    jar: RB(48, 74, 104, 34, 13, gd) + RB(44, 106, 112, 78, 26, c) + gl(54, 116, 54) + lab(68, 120, 64, 50),
    pal: RB(34, 58, 132, 122, 20, bk) + R(44, 66, 112, 18, 9, '#fff', .16) + pans + R(46, 152, 108, 20, 8, '#fff', .12),
    tube: `<path d="M72 56h56l10 122H62z" fill="${c}"/><path d="M72 56h56l10 122H62z" fill="${sh}"/>` + RB(78, 26, 44, 32, 8, gd) + gl(78, 66, 96) + lab(76, 98, 48, 52)
  }[p.ty];
  const img = PHOTOS && !flat ? `<img class="pimg" src="images/p${p.id}.jpg" alt="${p.n[L()]}" loading="lazy" decoding="async" width="800" height="800" onerror="this.remove()">` : '';
  return `<svg viewBox="0 0 200 220" role="img" aria-label="${p.n[L()]}"><defs><linearGradient id="${u}s" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".3" stop-color="#fff" stop-opacity="0"/><stop offset=".75" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></linearGradient><linearGradient id="${u}g" x1="0" x2="1"><stop offset="0" stop-color="#f6e2b8"/><stop offset=".5" stop-color="#c99f62"/><stop offset="1" stop-color="#f0d49b"/></linearGradient><linearGradient id="${u}k" x1="0" x2="1"><stop offset="0" stop-color="#52404a"/><stop offset=".5" stop-color="#241a1f"/><stop offset="1" stop-color="#3b2a30"/></linearGradient><radialGradient id="${u}r"><stop offset="0" stop-color="#c2546f" stop-opacity=".28"/><stop offset="1" stop-color="#c2546f" stop-opacity="0"/></radialGradient></defs><ellipse cx="100" cy="196" rx="70" ry="10" fill="url(#${u}r)"/>${s}</svg>${img}`;
}

/* ---------- Components ---------- */
const pct = p => Math.round((1 - p.pr / p.old) * 100);
function card(p, i = 0) {
  const b = p.old ? `<b class="bd">${num(pct(p))}${lang === 'fa' ? '٪' : '%'}</b>` : '';
  return `<article class="card" style="animation-delay:${i * 50}ms"><a class="ph" href="#/product/${p.id}" style="--c:${p.c}">${b}${art(p)}</a>
  <div class="ci"><small>${t(p.cat)}</small><a href="#/product/${p.id}"><h3>${p.n[L()]}</h3></a><div class="rt">★ ${num(p.r)}</div>
  <div class="pr"><strong>${money(p.pr)}</strong>${p.old ? `<s>${money(p.old)}</s>` : ''}</div>
  <button class="btn sm" data-add="${p.id}">${t('add')}</button></div></article>`;
}
const cartCount = () => Object.values(cart).reduce((a, b) => a + b, 0);
const header = () => `<div class="wrap hb"><a class="logo" href="#/">✿ ${t('brand')}</a>
<nav id="nav"><a href="#/">${t('home')}</a><a href="#/shop">${t('shop')}</a><a href="#/shop?sale=1">${t('offers')}</a><a href="#/about">${t('about')}</a><a href="#/contact">${t('contact')}</a>
<form class="sf msf" data-search><input name="q" placeholder="${t('searchPh')}" aria-label="${t('search')}"><button aria-label="${t('search')}">⌕</button></form></nav>
<form class="sf dsf" data-search><input name="q" placeholder="${t('searchPh')}" aria-label="${t('search')}"><button aria-label="${t('search')}">⌕</button></form>
<button class="ic" data-lang aria-label="Language">${lang === 'fa' ? 'EN' : 'فا'}</button>
<a class="ic" href="#/cart" aria-label="${t('cartT')}">🛍<i id="bd">${num(cartCount())}</i></a>
<button class="ic bg" data-burger aria-label="Menu">☰</button></div>`;
const footer = () => `<div class="wrap"><b>✿ ${t('brand')}</b>${t('address')} · ${t('hours')}<br>${t('foot')}</div>`;

/* ---------- Pages ---------- */
const home = () => `
<section class="herob"><div class="wrap hero"><div class="ht"><span class="kick">${t('heroK')}</span><h1>${t('heroT')}</h1><p>${t('heroS')}</p>
<div class="row"><a class="btn" href="#/shop">${t('shopNow')}</a><a class="btn ghost" href="#/shop?sale=1">${t('offers')}</a></div>
<div class="trust"><span>★ ${num(4.9)} · ${num(12000)}+ ${t('st1')}</span><span>🌿 ${t('b2')}</span><span>🚚 ${t('b1')}</span></div></div>
<div class="hv"><i class="blob"></i><i class="orb o1"></i><i class="orb o2"></i><div class="fl a">${art(P[0], 1)}</div><div class="fl b">${art(P[8], 1)}</div><div class="fl c">${art(P[3], 1)}</div><div class="gl"><b>${num(30)}${lang === 'fa' ? '٪' : '%'}</b><small>${t('offers')}</small></div></div></div></section>
<section class="wrap"><h2>${t('cats')}</h2><div class="cats">${CATS.map(c => { const p = P.find(x => x.cat === c); return `<a class="cat" href="#/shop?cat=${c}"><div class="ph" style="--c:${p.c}">${art(p)}</div>${t(c)}</a>`; }).join('')}</div></section>
<section class="wrap"><h2>${t('best')}</h2><div class="grid">${[...P].sort((a, b) => b.r - a.r).slice(0, 4).map(card).join('')}</div></section>
<section class="wrap"><div class="promo"><div><h2>${t('promoT')}</h2><p>${t('promoS')}</p><a class="btn" href="#/shop?sale=1">${t('shopNow')}</a></div><div class="pa">${art(P[9], 1)}${art(P[4], 1)}</div></div></section>
<section class="wrap"><h2>${t('deals')}</h2><div class="grid">${P.filter(p => p.old).slice(0, 4).map(card).join('')}</div></section>
<section class="wrap"><div class="ben">${[1, 2, 3, 4].map(i => `<div><span>${['🚚', '✨', '🎁', '💬'][i - 1]}</span><b>${t('b' + i)}</b><small>${t('b' + i + 'd')}</small></div>`).join('')}</div></section>`;

const shop = q => {
  F.cat = CATS.includes(q.get('cat')) ? q.get('cat') : 'all'; F.q = q.get('q') || ''; F.sale = q.get('sale') === '1'; F.max = 1200000;
  return `<section class="wrap pg"><h1>${t('shop')}</h1><div class="shop"><aside id="flt" class="flt"><h3>${t('filters')}</h3>
<div class="chips">${['all', ...CATS].map(c => `<button class="chip ${F.cat === c ? 'on' : ''}" data-cat="${c}">${t(c)}</button>`).join('')}</div>
<label>${t('price')}: <b id="mx"></b><input type="range" id="rg" min="200000" max="1200000" step="50000" value="${F.max}"></label>
<label>${t('sort')}<select id="so"><option value="pop">${t('pop')}</option><option value="low">${t('low')}</option><option value="high">${t('high')}</option></select></label>
<label class="ck"><input type="checkbox" id="sl" ${F.sale ? 'checked' : ''}> ${t('saleOnly')}</label></aside>
<div><p id="cnt" class="mut"></p><div id="grid" class="grid"></div></div></div></section>`;
};
function fill() {
  const g = $('#grid'); if (!g) return;
  const q = F.q.trim().toLowerCase();
  let l = P.filter(p => (F.cat === 'all' || p.cat === F.cat) && p.pr <= F.max && (!F.sale || p.old) && (!q || (p.n[0] + ' ' + p.n[1] + ' ' + t(p.cat)).toLowerCase().includes(q)));
  l.sort((a, b) => F.sort === 'low' ? a.pr - b.pr : F.sort === 'high' ? b.pr - a.pr : b.r - a.r);
  g.innerHTML = l.length ? l.map(card).join('') : `<p>${t('none')}</p>`;
  $('#cnt').textContent = num(l.length) + ' ' + t('results') + (q ? ` — «${F.q}»` : '');
  $('#mx').textContent = money(F.max); $('#so').value = F.sort;
}

const product = id => {
  const p = P.find(x => x.id === id); if (!p) return `<section class="wrap ok"><h2>${t('notfound')}</h2><a class="btn" href="#/shop">${t('back')}</a></section>`;
  const rel = P.filter(x => x.cat === p.cat && x.id !== p.id).concat(P.filter(x => x.cat !== p.cat)).slice(0, 4);
  const tab = [p.d[L()], t('ingrT'), t('shipT')];
  return `<section class="wrap pg"><p class="crumb"><a href="#/">${t('home')}</a> / <a href="#/shop?cat=${p.cat}">${t(p.cat)}</a> / ${p.n[L()]}</p>
<div class="pd"><div class="ph" style="--c:${p.c}">${art(p)}</div><div class="pi"><small class="mut">${t(p.cat)}</small><h1>${p.n[L()]}</h1><div class="rt">★ ${num(p.r)}</div>
<div class="pr"><strong>${money(p.pr)}</strong>${p.old ? `<s>${money(p.old)}</s><b class="bd" style="position:static">${num(pct(p))}${lang === 'fa' ? '٪' : '%'}</b>` : ''}</div>
<p>${p.d[L()]}</p><div class="buy"><div class="qty"><button data-pq="-1" aria-label="-">−</button><span id="pq">1</span><button data-pq="1" aria-label="+">+</button></div><button class="btn" data-add="${p.id}" data-fromq>${t('add')}</button></div>
<div class="tabs">${['desc', 'ingr', 'ship'].map((k, i) => `<button class="chip ${i ? '' : 'on'}" data-tab="${i}">${t(k)}</button>`).join('')}</div><div class="tp" id="tp" data-tabs='${JSON.stringify(tab).replace(/'/g, '&#39;')}'>${tab[0]}</div></div></div></section>
<section class="wrap"><h2>${t('related')}</h2><div class="grid">${rel.map(card).join('')}</div></section>`;
};

const totals = () => { const sub = Object.entries(cart).reduce((a, [id, q]) => a + P.find(p => p.id == id).pr * q, 0); const sh = sub === 0 || sub >= 1000000 ? 0 : 60000; return { sub, sh, tot: sub + sh }; };
const sum = () => { const x = totals(); return `<div class="box"><div class="s"><span>${t('sub')}</span><span>${money(x.sub)}</span></div><div class="s"><span>${t('shipping')}</span><span>${x.sh ? money(x.sh) : t('free')}</span></div><div class="s t"><span>${t('total')}</span><span>${money(x.tot)}</span></div>`; };
const cartPage = () => {
  const ids = Object.keys(cart);
  if (!ids.length) return `<section class="wrap ok"><div class="big">🛍</div><h2>${t('empty')}</h2><a class="btn" href="#/shop">${t('shopNow')}</a></section>`;
  return `<section class="wrap pg"><h1>${t('cartT')}</h1><div class="two" style="margin-top:20px"><div>${ids.map(id => { const p = P.find(x => x.id == id), q = cart[id]; return `<div class="line"><a class="ph" href="#/product/${id}" style="--c:${p.c}">${art(p)}</a><div><a href="#/product/${id}"><b>${p.n[L()]}</b></a><br><small class="mut">${money(p.pr)}</small></div>
<div class="qty"><button data-dec="${id}" aria-label="-">−</button><span>${num(q)}</span><button data-inc="${id}" aria-label="+">+</button></div><b>${money(p.pr * q)}</b><button class="rm" data-rm="${id}">${t('remove')}</button></div>`; }).join('')}</div>
${sum()}<a class="btn" href="#/checkout" style="text-align:center">${t('checkout')}</a></div></div></section>`;
};
const checkout = () => {
  if (!Object.keys(cart).length) return cartPage();
  return `<section class="wrap pg"><h1>${t('checkout')}</h1><div class="two" style="margin-top:20px"><form class="box frm" id="co"><p class="mut">${t('demo')}</p>
<input name="n" required placeholder="${t('name')}" autocomplete="name"><input name="p" required pattern="[0-9۰-۹+ ]{10,14}" inputmode="tel" placeholder="${t('phone')}" autocomplete="tel">
<input name="c" required placeholder="${t('city')}"><textarea name="a" required rows="3" placeholder="${t('addr')}"></textarea><button class="btn">${t('place')}</button></form>${sum()}</div></div></section>`;
};
const about = () => `<section class="wrap pg"><h1>${t('aboutT')}</h1><div class="txt" style="margin-top:18px"><p>${t('about1')}</p><p>${t('about2')}</p></div>
<div class="stats"><div>${num(12000)}+<small>${t('st1')}</small></div><div>${num(48)}<small>${t('st2')}</small></div><div>${num(31)}<small>${t('st3')}</small></div></div></section>`;
const contact = () => `<section class="wrap pg"><h1>${t('contactT')}</h1><div class="two" style="margin-top:20px"><div class="box"><p>📍 ${t('address')}</p><p>☎ ${lang === 'fa' ? '۰۲۱-۱۲۳۴۵۶۷۸' : '+98 21 1234 5678'}</p><p>✉ hello@blushie.example</p><p>🕘 ${t('hours')}</p></div>
<form class="box frm" id="ct"><input name="n" required placeholder="${t('name')}"><input name="e" type="email" required placeholder="${t('email')}"><textarea name="m" required rows="4" placeholder="${t('msg')}"></textarea><button class="btn">${t('send')}</button></form></div></section>`;

/* ---------- Router ---------- */
function reveal() {
  const S = document.querySelectorAll('#app section:not(.herob)');
  if (typeof IntersectionObserver === 'undefined') { S.forEach(x => x.classList.add('in')); return; }
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .06 });
  S.forEach(x => { x.classList.add('rv'); io.observe(x); });
}
function route() {
  const [path, qs] = (location.hash.slice(2) || '').split('?'), parts = path.split('/'), r = parts[0] || 'home', q = new URLSearchParams(qs || '');
  const pages = { home, shop: () => shop(q), product: () => product(+parts[1]), cart: cartPage, checkout, about, contact };
  $('#app').innerHTML = (pages[r] || home)();
  fill(); reveal(); window.scrollTo(0, 0); $('#nav').classList.remove('open');
  document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === (r === 'home' ? '#/' : '#/' + r)));
  document.title = t('brand');
}
function draw() {
  document.documentElement.lang = lang; document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  $('#top').textContent = t('top'); $('#hdr').innerHTML = header(); $('#ftr').innerHTML = footer(); route();
}
const save = () => LS.set('bb-cart', cart);
const badge = () => { const b = $('#bd'); if (b) b.textContent = num(cartCount()); };
let tm; function toast(m) { const e = $('#toast'); e.textContent = m; e.classList.add('on'); clearTimeout(tm); tm = setTimeout(() => e.classList.remove('on'), 1800); }

/* ---------- Events ---------- */
document.addEventListener('click', e => {
  const el = e.target.closest('button,a'); if (!el) return; const d = el.dataset;
  if (d.add) { const n = el.hasAttribute('data-fromq') ? +$('#pq').textContent : 1; cart[d.add] = (cart[d.add] || 0) + n; save(); badge(); toast(t('added')); }
  else if (d.lang !== undefined) { lang = lang === 'fa' ? 'en' : 'fa'; LS.set('bb-lang', lang); draw(); }
  else if (d.burger !== undefined) $('#nav').classList.toggle('open');
  else if (d.pq) { const s = $('#pq'); s.textContent = Math.min(10, Math.max(1, +s.textContent + +d.pq)); }
  else if (d.inc) { cart[d.inc]++; save(); route(); badge(); }
  else if (d.dec) { if (--cart[d.dec] < 1) delete cart[d.dec]; save(); route(); badge(); }
  else if (d.rm) { delete cart[d.rm]; save(); route(); badge(); }
  else if (d.cat) { F.cat = d.cat; document.querySelectorAll('[data-cat]').forEach(b => b.classList.toggle('on', b.dataset.cat === F.cat)); fill(); }
  else if (d.tab) { const tp = $('#tp'); tp.textContent = JSON.parse(tp.dataset.tabs)[d.tab]; document.querySelectorAll('[data-tab]').forEach(b => b.classList.toggle('on', b.dataset.tab === d.tab)); }
});
document.addEventListener('input', e => {
  if (e.target.id === 'rg') F.max = +e.target.value; else if (e.target.id === 'so') F.sort = e.target.value; else if (e.target.id === 'sl') F.sale = e.target.checked; else return; fill();
});
document.addEventListener('submit', e => {
  e.preventDefault(); const f = e.target;
  if (f.hasAttribute('data-search')) { location.hash = '#/shop?q=' + encodeURIComponent(f.q.value.trim()); if (location.hash === '#/shop?q=' + encodeURIComponent(f.q.value.trim())) route(); }
  else if (f.id === 'co') { const no = 'BB-' + Math.floor(100000 + Math.random() * 900000); cart = {}; save(); badge(); $('#app').innerHTML = `<section class="wrap ok"><div class="big">🌸</div><h2>${t('success')}</h2><p>${t('orderNo')}: <b>${no}</b></p><p class="mut">${t('demo')}</p><br><a class="btn" href="#/shop">${t('back')}</a></section>`; window.scrollTo(0, 0); }
  else if (f.id === 'ct') { f.outerHTML = `<div class="box ok"><div class="big">💌</div><p>${t('sent')}</p></div>`; }
});
window.addEventListener('hashchange', route);
draw();

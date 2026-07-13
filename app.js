document.getElementById('year').textContent = new Date().getFullYear();

const STORAGE_KEY = 'rp_paintings_v7';
const AUTH_KEY = 'rp_admin_logged_v1';
const EMAIL_KEY = 'rp_admin_email_v1';
const PW_KEY = 'rp_admin_pw_v1';
const SHOW_SOLD_KEY = 'rp_show_sold_v1';
const LANG_KEY = 'rp_lang_v1';

const DEFAULT_ADMIN_EMAIL = 'regina.hirtentreu@gmail.com';
const DEFAULT_ADMIN_PASSWORD = 'Pildigalerii';
const CONTACT_EMAIL = 'regina.hirtentreu@gmail.com';
const WHATSAPP_NUMBER = '37258090777';
const WHATSAPP_DISPLAY = '+372 5809 0777';

const state = {
  paintings: [],
  nextId: 1,
  loggedIn: false,
  adminEmail: DEFAULT_ADMIN_EMAIL,
  adminPassword: DEFAULT_ADMIN_PASSWORD,
  showSold: true,
  lang: 'et',
};

const I18N = {
  et: {
    footer_kontakt: 'Kontakt',
    footer_login: 'Logi sisse',
    footer_manage: 'Halda galeriid',
    footer_settings: 'Seaded',
    footer_logout: 'Logi välja',
    home_eyebrow: 'Originaalmaalid · õli ja akrüül',
    home_hero_title: 'Vaikus, valgus ja põhjamaine maastik lõuendil',
    home_btn_gallery: 'Vaata galeriid',
    home_btn_about: 'Kunstnikust',
    home_all_works: 'KÕIK TÖÖD →',
    home_about_eyebrow: 'Kunstnikust',
    home_quote: '„Maalin valgust, mis jääb hetkeks pidama — mere kohal, toa nurgas, mälestuses."',
    home_read_more: 'LOE EDASI →',
    portrait_placeholder: 'kunstniku portree',
    gallery_eyebrow: 'Galerii',
    gallery_title: 'Kõik tööd',
    gallery_empty: 'Töid ei ole hetkel lisatud.',
    photo_pending: 'foto lisandumas',
    pill_email: 'E-post',
    sold_badge: 'MÜÜDUD',
    back_to_gallery: '← TAGASI GALERIISSE',
    painting_not_found: 'Maali ei leitud.',
    status_available: 'Saadaval',
    status_sold: 'Müüdud',
    interested_label: 'Huvitatud sellest tööst?',
    email_btn: 'Kirjuta e-mailile',
    whatsapp_btn: 'Kirjuta WhatsAppis',
    assurance_shipping: 'Tasuta transport Eestis · 5–7 tööpäeva',
    assurance_cert: 'Autori sertifikaat kaasas',
    assurance_return: '14-päevane tagastusõigus',
    price_on_request: 'Hind küsimisel',
    about_eyebrow: 'Kunstnikust',
    about_portrait_placeholder: 'kunstniku portree — foto',
    about_bio1: 'Olen lõpetanud Eesti Kunstiakadeemia maali konserveerimise eriala. Mind huvitavad erinevad maalitehnikad ja stiilid ning nende kasutamine oma loomingus.',
    about_bio2: 'Kujutan sageli loodust ja inimest, nihestades vaatenurka või liikudes abstraktsema kujutamisviisi suunas. Minu töid mõjutab ka huvi disaini vastu, mis toetab tundlikku kompositsiooni- ja värvikäsitlust.',
    about_cv_label: 'CV / VALIK',
    about_cv_education: 'Eesti Kunstiakadeemia — maali konserveerimise eriala',
    contact_eyebrow: 'Kontakt',
    contact_title: 'Kirjuta mulle',
    contact_intro: 'Küsimused maalide, tellimustööde või näituste kohta on alati teretulnud.',
    contact_studio: 'Ateljee: Tallinn (külastus kokkuleppel)',
    label_name: 'NIMI',
    label_email: 'E-POST',
    label_message: 'SÕNUM',
    btn_send: 'Saada',
    contact_fill_all: 'Palun täida kõik väljad.',
    contact_opening_email: 'Avan e-postiprogrammi eeltäidetud kirjaga...',
    admin_eyebrow: 'Halduspaneel',
    login_title: 'Logi sisse',
    label_password: 'PAROOL',
    login_error: 'Vale e-post või parool, proovi uuesti.',
    btn_login: 'Logi sisse',
    forgot_password_link: 'Unustasin parooli',
    reset_title: 'Parooli lähtestamine',
    forgot_title: 'Unustasid parooli?',
    forgot_intro: 'Sisesta oma kontoga seotud e-posti aadress — saadame sulle lähtestamislingi.',
    btn_send_reset: 'Saada lähtestamislink',
    back_to_login: '← Tagasi sisselogimise juurde',
    check_inbox_title: 'Kontrolli oma postkasti',
    check_inbox_intro: 'Kui see e-post on kontoga seotud, oleme saatnud sellele parooli lähtestamise lingi. Link kehtib 30 minutit.',
    open_reset_demo: 'Ava lähtestamislink (prototüübi demo)',
    new_password_title: 'Määra uus parool',
    label_new_password: 'UUS PAROOL',
    label_repeat_password: 'KORDA UUT PAROOLI',
    reset_error: 'Paroolid ei kattu või on lühem kui 8 tähemärki.',
    btn_save_new_password: 'Salvesta uus parool',
  },
  en: {
    footer_kontakt: 'Contact',
    footer_login: 'Log in',
    footer_manage: 'Manage gallery',
    footer_settings: 'Settings',
    footer_logout: 'Log out',
    home_eyebrow: 'Original paintings · oil and acrylic',
    home_hero_title: 'Silence, light, and the Nordic landscape on canvas',
    home_btn_gallery: 'View gallery',
    home_btn_about: 'About the artist',
    home_all_works: 'ALL WORKS →',
    home_about_eyebrow: 'About the artist',
    home_quote: '"I paint light that lingers for a moment — over the sea, in the corner of a room, in memory."',
    home_read_more: 'READ MORE →',
    portrait_placeholder: 'artist portrait',
    gallery_eyebrow: 'Gallery',
    gallery_title: 'All works',
    gallery_empty: 'No works have been added yet.',
    photo_pending: 'photo coming soon',
    pill_email: 'Email',
    sold_badge: 'SOLD',
    back_to_gallery: '← BACK TO GALLERY',
    painting_not_found: 'Painting not found.',
    status_available: 'Available',
    status_sold: 'Sold',
    interested_label: 'Interested in this piece?',
    email_btn: 'Send an email',
    whatsapp_btn: 'Message on WhatsApp',
    assurance_shipping: 'Free shipping within Estonia · 5–7 business days',
    assurance_cert: 'Certificate of authenticity included',
    assurance_return: '14-day return policy',
    price_on_request: 'Price on request',
    about_eyebrow: 'About the artist',
    about_portrait_placeholder: 'artist portrait — photo',
    about_bio1: "I graduated from the Estonian Academy of Arts with a degree in painting conservation. I'm drawn to a range of painting techniques and styles, and to using them in my own work.",
    about_bio2: 'I often depict nature and the human figure, shifting perspective or moving toward a more abstract mode of representation. My work is also shaped by an interest in design, which supports a sensitive approach to composition and colour.',
    about_cv_label: 'CV / SELECTED',
    about_cv_education: 'Estonian Academy of Arts — painting conservation',
    contact_eyebrow: 'Contact',
    contact_title: 'Write to me',
    contact_intro: 'Questions about paintings, commissions, or exhibitions are always welcome.',
    contact_studio: 'Studio: Tallinn (visits by appointment)',
    label_name: 'NAME',
    label_email: 'EMAIL',
    label_message: 'MESSAGE',
    btn_send: 'Send',
    contact_fill_all: 'Please fill in all fields.',
    contact_opening_email: 'Opening your email client with a pre-filled message...',
    admin_eyebrow: 'Admin panel',
    login_title: 'Log in',
    label_password: 'PASSWORD',
    login_error: 'Wrong email or password, please try again.',
    btn_login: 'Log in',
    forgot_password_link: 'Forgot password',
    reset_title: 'Password reset',
    forgot_title: 'Forgot your password?',
    forgot_intro: "Enter the email address linked to your account — we'll send you a reset link.",
    btn_send_reset: 'Send reset link',
    back_to_login: '← Back to login',
    check_inbox_title: 'Check your inbox',
    check_inbox_intro: 'If this email is linked to an account, we\'ve sent a password reset link to it. The link is valid for 30 minutes.',
    open_reset_demo: 'Open reset link (prototype demo)',
    new_password_title: 'Set a new password',
    label_new_password: 'NEW PASSWORD',
    label_repeat_password: 'REPEAT NEW PASSWORD',
    reset_error: "Passwords don't match or are shorter than 8 characters.",
    btn_save_new_password: 'Save new password',
  },
};

const TECH_TRANSLATIONS = {
  'Õli lõuendil': 'Oil on canvas',
  'Akrüül lõuendil': 'Acrylic on canvas',
  'Akrüül lõuendil, raamitud': 'Acrylic on canvas, framed',
  'Akrüül paberil': 'Acrylic on paper',
  'Akrüül paberil, raamitud': 'Acrylic on paper, framed',
  'Kuivpastell': 'Dry pastel',
  'Süsi': 'Charcoal',
  'Pastakas paberil': 'Ballpoint pen on paper',
  'Akrüül': 'Acrylic',
  'Õli': 'Oil',
};

function t(key) {
  return (I18N[state.lang] && I18N[state.lang][key]) || I18N.et[key] || key;
}

function translateTech(tech) {
  if (state.lang !== 'en') return tech;
  return TECH_TRANSLATIONS[tech] || tech;
}

const uiState = {
  loginError: false,
  forgotSubmitted: false,
  resetError: false,
  settingsError: false,
  settingsErrorMsg: '',
  settingsSaved: false,
};

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function fmt(n) {
  if (n == null || n === '') return t('price_on_request');
  const locale = state.lang === 'en' ? 'en-US' : 'et-EE';
  return Number(n).toLocaleString(locale).replace(/ /g, ' ') + ' €';
}

function seedPaintings() {
  const withPhoto = [
    { title: "Päikeseloojang merekaldal", tech: "Õli lõuendil", size: "80 × 100 cm", year: 2026, price: 4000, sold: false, img: "uploads/IMG_5935.jpeg" },
    { title: "Õitsenud tulbiõis", tech: "Õli lõuendil", size: "80 × 100 cm", year: 2026, price: 4000, sold: false, img: "uploads/IMG_6886.jpeg" },
    { title: "Rannarõõmud", tech: "Õli lõuendil", size: "70 × 90 cm", year: 2025, price: 3000, sold: false, img: "uploads/0FC23549-0673-40EE-A4E6-6CE5946FEC02.jpeg" },
    { title: "Linnamöll", tech: "Akrüül lõuendil", size: "40 × 60 cm", year: 2025, price: 2500, sold: false, img: "uploads/53cc8d0d-32cd-4067-9598-f4dd9df23dfb.jpeg" },
    { title: "Nõmm koos metsatukaga", tech: "Akrüül lõuendil", size: "70 × 70 cm", year: 2025, price: 2500, sold: false, img: "uploads/IMG_3052.jpeg" },
    { title: "Ambaal ujumas", tech: "Õli lõuendil", size: "70 × 100 cm", year: 2025, price: 3000, sold: false, img: "uploads/IMG_4395.jpeg" },
    { title: "Kiigel", tech: "Akrüül lõuendil", size: "70 × 70 cm", year: 2025, price: null, sold: true, img: "uploads/IMG_3132.jpeg" },
    { title: "Puupea", tech: "Akrüül lõuendil", size: "60 × 80 cm", year: 2024, price: 750, sold: false, img: "uploads/b64f69a5-68ec-4fbc-91a7-ae45546ccbcf.jpeg" },
    { title: "Landscape", tech: "Akrüül lõuendil", size: "70 × 90 cm", year: 2023, price: 2500, sold: false, img: "uploads/IMG_0789.jpeg" },
    { title: "Voolamine", tech: "Akrüül lõuendil", size: "60 × 150 cm", year: 2023, price: 1200, sold: false, img: "uploads/IMG_0802.jpeg" },
    { title: "Klaaskuul", tech: "Akrüül papil", size: "59 × 84 cm", year: 2021, price: 75, sold: false, img: "uploads/IMG_2343.jpeg" },
    { title: "Merevaade", tech: "Õli lõuendil", size: "50 × 60 cm", year: 2021, price: null, sold: true, img: "uploads/IMG_7566.jpeg" },
    { title: "Karge mets", tech: "Õli lõuendil", size: "60 × 70 cm", year: 2021, price: null, sold: true, img: "uploads/IMG_7962.jpeg" },
    { title: "Karukellad", tech: "Õli lõuendil", size: "55 × 80 cm", year: 2021, price: 350, sold: false, img: "uploads/IMG_8722.jpeg" },
    { title: "Elu kastis", tech: "Akrüül", size: "50 × 50 cm", year: 2021, price: 250, sold: false, img: "uploads/IMG_8743.jpeg" },
    { title: "Kontsentriline", tech: "Akrüül", size: "50 × 50 cm", year: 2021, price: 250, sold: false, img: "uploads/IMG_8746.jpeg" },
    { title: "Mures tuleviku pärast", tech: "Õli lõuendil", size: "60 × 80 cm", year: 2021, price: 750, sold: false, img: "uploads/IMG_9954.jpeg" },
    { title: "Corgi terrassil (Ruutu)", tech: "Õli lõuendil", size: "60 × 80 cm", year: 2020, price: null, sold: true, img: "uploads/IMG_0324.jpeg" },
    { title: "Varjud metsas", tech: "Akrüül lõuendil, raamitud", size: "62 × 100 cm", year: 2020, price: 750, sold: false, img: "uploads/IMG_0794.jpeg" },
    { title: "Rohetants", tech: "Akrüül lõuendil", size: "50 × 70 cm", year: 2020, price: 500, sold: false, img: "uploads/IMG_5673.jpeg" },
    { title: "Udune niit", tech: "Õli lõuendil", size: "51 × 60 cm", year: 2020, price: null, sold: true, img: "uploads/IMG_5819.jpeg" },
    { title: "Veritas", tech: "Õli lõuendil", size: "59 × 84 cm", year: 2019, price: null, sold: true, img: "uploads/IMG_7521.jpeg" },
    { title: "Vannipart", tech: "Kuivpastell", size: "62 × 76 cm", year: 2018, price: null, sold: true, img: "uploads/IMG_0340.jpeg" },
    { title: "Miski südames", tech: "Õli", size: "50 × 60 cm", year: 2017, price: 350, sold: false, img: "uploads/IMG_8154_Original.jpeg" },
    { title: "Seenemikk", tech: "Õli", size: "70 × 100 cm", year: 2017, price: null, sold: true, img: "uploads/IMG_8842_Original.jpeg" },
    { title: "Kollakas kolmapäev", tech: "Akrüül paberil, raamitud", size: "77 × 61 cm", year: 2017, price: 95, sold: false, img: "uploads/IMG_6714.jpeg" },
    { title: "Virsik", tech: "Akrüül paberil, raamitud", size: "85 × 67 cm", year: 2017, price: null, sold: true, img: "uploads/IMG_9252_Original.jpeg" },
    { title: "Segaduses kala", tech: "Akrüül paberil", size: "83 × 64 cm", year: 2017, price: null, sold: true, img: "uploads/IMG_9254_Original.jpeg" },
    { title: "Avatar", tech: "Akrüül paberil", size: "65 × 76 cm", year: 2016, price: null, sold: true, img: "uploads/IMG_4971_1.jpeg" },
    { title: "Mets", tech: "Õli lõuendil", size: "70 × 100 cm", year: 2016, price: null, sold: true, img: "uploads/IMG_5046.jpeg" },
    { title: "Mõtte peegeldus", tech: "Akrüül paberil", size: "77 × 61 cm", year: 2016, price: 350, sold: false, img: "uploads/IMG_5231_Original.jpeg" },
    { title: "Hundu", tech: "Kuivpastell", size: "59 × 84 cm", year: 2016, price: null, sold: true, img: "uploads/IMG_5256.jpeg" },
    { title: "Masenduse hetk", tech: "Õli", size: "77 × 61 cm", year: 2016, price: null, sold: true, img: "uploads/IMG_5329.jpeg" },
    { title: "Figuur", tech: "Süsi", size: "59 × 84 cm", year: 2016, price: null, sold: true, img: "uploads/IMG_5265.jpeg" },
    { title: "Silmside", tech: "Pastakas paberil", size: "65 × 76 cm", year: 2016, price: 75, sold: false, img: "uploads/IMG_6510.jpeg" },
    { title: "Leht", tech: "Akrüül paberil", size: "65 × 79 cm", year: 2014, price: 300, sold: false, img: "uploads/DSC01733.jpeg" },
    { title: "Bob", tech: "Õli lõuendil", size: "50 × 60 cm", year: 2013, price: null, sold: true, img: "uploads/IMG_5169.jpeg" },
  ];
  const photoPending = [];
  return [...withPhoto, ...photoPending].map((p, i) => ({
    id: i + 1,
    title: p.title,
    tech: p.tech,
    size: p.size,
    year: p.year,
    price: p.price,
    sold: p.sold,
    desc: '',
    img: p.img || null,
  }));
}

function loadState() {
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); } catch (e) {}
  state.paintings = (saved && Array.isArray(saved) && saved.length) ? saved : seedPaintings();
  state.nextId = state.paintings.reduce((m, p) => Math.max(m, p.id), 0) + 1;

  try { state.loggedIn = localStorage.getItem(AUTH_KEY) === '1'; } catch (e) {}
  try { state.adminEmail = localStorage.getItem(EMAIL_KEY) || DEFAULT_ADMIN_EMAIL; } catch (e) {}
  try { state.adminPassword = localStorage.getItem(PW_KEY) || DEFAULT_ADMIN_PASSWORD; } catch (e) {}
  try { state.showSold = localStorage.getItem(SHOW_SOLD_KEY) !== '0'; } catch (e) {}
  try { state.lang = localStorage.getItem(LANG_KEY) || 'et'; } catch (e) {}
}

function setLang(lang) {
  state.lang = lang;
  try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  rerender();
}

function persistPaintings() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.paintings)); } catch (e) {}
}

function persistCreds(email, password) {
  try {
    localStorage.setItem(EMAIL_KEY, email);
    localStorage.setItem(PW_KEY, password);
  } catch (e) {}
}

function decorate(p) {
  const priceStr = fmt(p.price);
  let subject, bodyLines, waText;
  if (state.lang === 'en') {
    subject = 'Inquiry: ' + p.title;
    bodyLines = ['Hello,', '', 'I\'m interested in the painting "' + p.title + '"' + (p.price != null ? ' (' + priceStr + ')' : '') + '.', ''];
    waText = 'Hi, I\'m interested in the painting "' + p.title + '"' + (p.price != null ? ' (' + priceStr + ')' : '') + '.';
  } else {
    subject = 'Päring: ' + p.title;
    bodyLines = ['Tere,', '', 'Huvitun maalist „' + p.title + '"' + (p.price != null ? ' (' + priceStr + ')' : '') + '.', ''];
    waText = 'Tere, huvitun maalist „' + p.title + '"' + (p.price != null ? ' (' + priceStr + ')' : '') + '.';
  }
  const mailtoHref = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(bodyLines.join('\n'));
  const waHref = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(waText);
  return {
    ...p,
    priceStr,
    meta: [translateTech(p.tech), p.size, p.year].filter(Boolean).join(' · '),
    avail: !p.sold,
    status: p.sold ? t('status_sold') : t('status_available'),
    mailtoHref,
    waHref,
  };
}

function imgBox(p, extraClass) {
  if (p.img) {
    return `<div class="imgbox ${extraClass || ''}"><img src="${esc(p.img)}" alt="${esc(p.title)}" loading="lazy"></div>`;
  }
  return `<div class="imgbox ${extraClass || ''}"><span>${esc(t('photo_pending'))}</span></div>`;
}

/* ===== Router ===== */

function currentRoute() {
  let h = location.hash;
  if (h.startsWith('#/')) h = h.slice(2); else if (h.startsWith('#')) h = h.slice(1);
  const parts = h.split('/').filter(Boolean);
  return { page: parts[0] || 'avaleht', param: parts[1] };
}

function navigate(page, id) {
  location.hash = '#/' + page + (id != null ? '/' + id : '');
}

function onRouteChange() {
  const { page, param } = currentRoute();
  if ((page === 'haldus' || page === 'seaded') && !state.loggedIn) {
    location.hash = '#/login';
    return;
  }
  render(page, param);
  window.scrollTo(0, 0);
}

function rerender() {
  const { page, param } = currentRoute();
  render(page, param);
}

/* ===== Header ===== */

function renderHeader() {
  const kontaktLink = document.getElementById('footer-kontakt-link');
  if (kontaktLink) kontaktLink.textContent = t('footer_kontakt');
  const actions = document.getElementById('footer-actions');
  if (actions) {
    if (state.loggedIn) {
      actions.innerHTML = `
        <span data-nav="haldus">${esc(t('footer_manage'))}</span>
        · <span data-nav="seaded">${esc(t('footer_settings'))}</span>
        · <span data-action="logout">${esc(t('footer_logout'))}</span>
      `;
    } else {
      actions.innerHTML = `<span data-nav="login">${esc(t('footer_login'))}</span>`;
    }
  }
  const langEl = document.getElementById('lang-toggle');
  if (langEl) {
    langEl.innerHTML = `
      <span data-action="set-lang-et" class="${state.lang === 'et' ? 'lang-on' : ''}">ET</span>
      / <span data-action="set-lang-en" class="${state.lang === 'en' ? 'lang-on' : ''}">EN</span>
    `;
  }
  document.title = state.lang === 'en' ? 'Regina Pruul — paintings' : 'Regina Pruul — maalikunst';
}

/* ===== Screens ===== */

function screenAvaleht() {
  const all = state.paintings.map(decorate);
  const featured = [all[0], all[1], all[2]].filter(Boolean);
  const featuredHtml = featured.map((p, i) => `
    <div class="featured-card" data-nav="maal" data-id="${p.id}">
      ${imgBox(p, i === 1 ? 'h-tall' : 'h-short')}
      <div class="featured-row">
        <span class="title">${esc(p.title)}</span>
        <span class="price">${esc(p.priceStr)}</span>
      </div>
    </div>
  `).join('');

  return `
    <div class="hero">
      <p class="eyebrow">${esc(t('home_eyebrow'))}</p>
      <h1>${esc(t('home_hero_title'))}</h1>
      <div class="hero-actions">
        <button class="btn btn-primary" data-nav="galerii">${esc(t('home_btn_gallery'))}</button>
        <button class="btn btn-outline" data-nav="kunstnikust">${esc(t('home_btn_about'))}</button>
      </div>
    </div>
    <div class="featured-grid">${featuredHtml}</div>
    <div class="all-works-link"><span data-nav="galerii">${esc(t('home_all_works'))}</span></div>
    <div class="quote-block">
      <div class="placeholder-block"><span>${esc(t('portrait_placeholder'))}</span></div>
      <div>
        <p class="eyebrow">${esc(t('home_about_eyebrow'))}</p>
        <p class="quote-text">${esc(t('home_quote'))}</p>
        <p class="quote-more" data-nav="kunstnikust">${esc(t('home_read_more'))}</p>
      </div>
    </div>
  `;
}

function screenGalerii() {
  const all = state.paintings.map(decorate);
  const visible = state.showSold ? all : all.filter((p) => !p.sold);
  const cards = visible.map((p) => `
    <div class="painting-card">
      <div data-nav="maal" data-id="${p.id}">${imgBox(p)}</div>
      <div class="painting-row">
        <span class="title" data-nav="maal" data-id="${p.id}">${esc(p.title)}</span>
        <span class="price">${esc(p.priceStr)}</span>
      </div>
      <div class="painting-meta-row">
        <span class="painting-meta">${esc(p.meta)}</span>
        ${p.sold ? `<span class="sold-badge">${esc(t('sold_badge'))}</span>` : ''}
      </div>
      ${p.avail ? `
        <div class="contact-pills">
          <a class="pill pill-email" href="${p.mailtoHref}">✉ ${esc(t('pill_email'))}</a>
          <a class="pill pill-whatsapp" href="${p.waHref}" target="_blank" rel="noopener">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.06h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.11.82.83-3.03-.2-.31a8.19 8.19 0 0 1-1.26-4.4c0-4.53 3.69-8.22 8.24-8.22 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.81c0 4.53-3.7 8.23-8.25 8.23z"></path></svg>
            WhatsApp
          </a>
        </div>
      ` : ''}
    </div>
  `).join('');

  return `
    <div class="page-section">
      <p class="eyebrow">${esc(t('gallery_eyebrow'))}</p>
      <h1 class="page-title">${esc(t('gallery_title'))}</h1>
      <div class="gallery-grid">${cards || `<p style="color:var(--text-tertiary)">${esc(t('gallery_empty'))}</p>`}</div>
    </div>
  `;
}

function screenMaal(id) {
  const raw = state.paintings.find((p) => String(p.id) === String(id)) || state.paintings[0];
  if (!raw) {
    return `<div class="page-section"><p>${esc(t('painting_not_found'))}</p></div>`;
  }
  const p = decorate(raw);
  return `
    <div class="page-section">
      <span class="back-link" data-nav="galerii">${esc(t('back_to_gallery'))}</span>
      <div class="painting-detail">
        ${imgBox(p)}
        <div>
          <p class="status-label">${esc(p.status)}</p>
          <h1>${esc(p.title)}</h1>
          <p class="meta">${esc(p.meta)}</p>
          ${p.desc ? `<p class="desc">${esc(p.desc)}</p>` : ''}
          <p class="price">${esc(p.priceStr)}</p>
          ${p.avail ? `
            <div class="interest-block">
              <p class="interest-label">${esc(t('interested_label'))}</p>
              <div class="interest-buttons">
                <a class="btn-block email-btn" href="${p.mailtoHref}"><span>✉</span> ${esc(t('email_btn'))}</a>
                <a class="btn-block whatsapp-btn" href="${p.waHref}" target="_blank" rel="noopener">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.06h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.11.82.83-3.03-.2-.31a8.19 8.19 0 0 1-1.26-4.4c0-4.53 3.69-8.22 8.24-8.22 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.81c0 4.53-3.7 8.23-8.25 8.23z"></path></svg>
                  ${esc(t('whatsapp_btn'))}
                </a>
              </div>
            </div>
          ` : `<div class="sold-block"><span>${esc(t('sold_badge'))}</span></div>`}
          <div class="assurances">
            <span>${esc(t('assurance_shipping'))}</span>
            <span>${esc(t('assurance_cert'))}</span>
            <span>${esc(t('assurance_return'))}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function screenKunstnikust() {
  return `
    <div class="page-section">
      <div class="about-grid">
        <div class="placeholder-block"><span>${esc(t('about_portrait_placeholder'))}</span></div>
        <div class="about-body">
          <p class="eyebrow">${esc(t('about_eyebrow'))}</p>
          <h1>Regina Pruul</h1>
          <p>${esc(t('about_bio1'))}</p>
          <p>${esc(t('about_bio2'))}</p>
          <div class="cv-block">
            <p class="label">${esc(t('about_cv_label'))}</p>
            <div class="cv-list">
              <span>${esc(t('about_cv_education'))}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function screenNaitused() {
  return `
    <div class="page-section">
      <p class="eyebrow">Näitused ja uudised</p>
      <h1 class="page-title">Tulekul ja toimunud</h1>
      <div>
        <div class="exhibit-row">
          <span class="exhibit-date">10.10–15.11.26</span>
          <div>
            <p class="exhibit-title">„Valge väli"</p>
            <p class="exhibit-desc">Isikunäitus. Avamine 10. oktoobril kl 18.</p>
          </div>
          <span class="exhibit-badge upcoming">TULEKUL · TALLINN</span>
        </div>
        <div class="exhibit-row">
          <span class="exhibit-date">03–04.2024</span>
          <div>
            <p class="exhibit-title">Kevadine grupinäitus</p>
            <p class="exhibit-desc">Tartu Kunstimaja, koos kuue autoriga.</p>
          </div>
          <span class="exhibit-badge past">TOIMUNUD · TARTU</span>
        </div>
      </div>
    </div>
  `;
}

function screenKontakt() {
  return `
    <div class="page-section">
      <div class="contact-grid">
        <div class="contact-info">
          <p class="eyebrow">${esc(t('contact_eyebrow'))}</p>
          <h1>${esc(t('contact_title'))}</h1>
          <p>${esc(t('contact_intro'))}</p>
          <div class="contact-details">
            <span>${esc(CONTACT_EMAIL)}</span>
            <span>${esc(WHATSAPP_DISPLAY)}</span>
            <span>${esc(t('contact_studio'))}</span>
            <span>Instagram: @reginapruul</span>
          </div>
        </div>
        <div class="contact-form">
          <div class="form-field"><label>${esc(t('label_name'))}</label><input id="contact-name" type="text"></div>
          <div class="form-field"><label>${esc(t('label_email'))}</label><input id="contact-email" type="email"></div>
          <div class="form-field"><label>${esc(t('label_message'))}</label><textarea id="contact-message" rows="6"></textarea></div>
          <p id="contact-note" class="form-note" hidden></p>
          <button class="btn btn-primary" style="align-self:flex-start" data-action="contact-submit">${esc(t('btn_send'))}</button>
        </div>
      </div>
    </div>
  `;
}

function screenLogin() {
  return `
    <div class="auth-page">
      <p class="eyebrow">${esc(t('admin_eyebrow'))}</p>
      <h1>${esc(t('login_title'))}</h1>
      <div class="auth-form">
        <div class="form-field"><label>${esc(t('label_email'))}</label><input id="login-email" type="email"></div>
        <div class="form-field"><label>${esc(t('label_password'))}</label><input id="login-pw" type="password"></div>
        ${uiState.loginError ? `<p class="error-text">${esc(t('login_error'))}</p>` : ''}
        <button class="btn btn-primary" data-action="login-submit">${esc(t('btn_login'))}</button>
        <span class="auth-back" data-nav="unustasin">${esc(t('forgot_password_link'))}</span>
      </div>
    </div>
  `;
}

function screenUnustasin() {
  return `
    <div class="auth-page">
      <p class="eyebrow">${esc(t('reset_title'))}</p>
      <h1>${esc(t('forgot_title'))}</h1>
      <p class="intro">${esc(t('forgot_intro'))}</p>
      <div class="auth-form">
        <div class="form-field"><label>${esc(t('label_email'))}</label><input id="forgot-email" type="email"></div>
        <button class="btn btn-primary" data-action="forgot-submit">${esc(t('btn_send_reset'))}</button>
        <span class="auth-back" data-nav="login">${esc(t('back_to_login'))}</span>
      </div>
    </div>
  `;
}

function screenUnustasinSaadetud() {
  return `
    <div class="auth-page">
      <p class="eyebrow">${esc(t('reset_title'))}</p>
      <h1 style="font-style:italic">${esc(t('check_inbox_title'))}</h1>
      <p class="intro">${esc(t('check_inbox_intro'))}</p>
      <div class="auth-form">
        <button class="btn btn-outline" data-nav="lahtesta">${esc(t('open_reset_demo'))}</button>
        <span class="auth-back" data-nav="login">${esc(t('back_to_login'))}</span>
      </div>
    </div>
  `;
}

function screenLahtesta() {
  return `
    <div class="auth-page">
      <p class="eyebrow">${esc(t('reset_title'))}</p>
      <h1>${esc(t('new_password_title'))}</h1>
      <div class="auth-form">
        <div class="form-field"><label>${esc(t('label_new_password'))}</label><input id="reset-pw1" type="password"></div>
        <div class="form-field"><label>${esc(t('label_repeat_password'))}</label><input id="reset-pw2" type="password"></div>
        ${uiState.resetError ? `<p class="error-text">${esc(t('reset_error'))}</p>` : ''}
        <button class="btn btn-primary" data-action="reset-submit">${esc(t('btn_save_new_password'))}</button>
      </div>
    </div>
  `;
}

function screenSeaded() {
  return `
    <div class="page-section">
      <p class="eyebrow">Halduspaneel</p>
      <h1 class="page-title">Seaded</h1>
      <div class="settings-form">
        <div class="form-field"><label>E-POST</label><input id="settings-email" type="email" value="${esc(state.adminEmail)}"></div>
        <div class="settings-divider"></div>
        <p class="settings-hint">Parooli muutmiseks sisesta praegune parool ja uus parool.</p>
        <div class="form-field"><label>PRAEGUNE PAROOL</label><input id="settings-current-pw" type="password"></div>
        <div class="form-field"><label>UUS PAROOL (valikuline)</label><input id="settings-new-pw" type="password"></div>
        ${uiState.settingsError ? `<p class="error-text">${esc(uiState.settingsErrorMsg)}</p>` : ''}
        ${uiState.settingsSaved ? '<p class="success-text">Salvestatud.</p>' : ''}
        <button class="btn btn-primary" style="align-self:flex-start;padding-left:32px;padding-right:32px" data-action="settings-submit">Salvesta</button>
        <div class="settings-divider"></div>
        <label style="display:flex;align-items:center;gap:10px;font-size:13px;color:var(--text-secondary);cursor:pointer">
          <input type="checkbox" id="settings-show-sold" ${state.showSold ? 'checked' : ''} data-action="toggle-show-sold">
          Näita müüdud töid galeriis
        </label>
      </div>
    </div>
  `;
}

function screenHaldus() {
  const items = state.paintings.map((p, idx) => {
    const d = decorate(p);
    return `
      <div class="admin-item">
        <div class="admin-thumb-col">
          <div class="admin-move">
            <span class="${idx === 0 ? 'disabled' : ''}" data-action="move-up" data-id="${p.id}">↑</span>
            <span class="${idx === state.paintings.length - 1 ? 'disabled' : ''}" data-action="move-down" data-id="${p.id}">↓</span>
          </div>
          <div class="admin-thumb">
            ${p.img ? `<img src="${esc(p.img)}" alt="${esc(p.title)}">` : '<span>pilt puudub</span>'}
          </div>
          <label class="admin-file-label">
            Vaheta pilt
            <input type="file" accept="image/*" style="display:none" data-image-upload data-id="${p.id}">
          </label>
        </div>
        <div class="admin-fields">
          <div class="admin-fields-row cols-3">
            <div class="field-mini"><label>PEALKIRI</label><input value="${esc(p.title)}" data-admin-field="title" data-id="${p.id}"></div>
            <div class="field-mini"><label>AASTA</label><input type="number" value="${p.year ?? ''}" data-admin-field="year" data-id="${p.id}"></div>
            <div class="field-mini"><label>HIND (€)</label><input type="number" value="${p.price ?? ''}" data-admin-field="price" data-id="${p.id}"></div>
          </div>
          <div class="admin-fields-row cols-2">
            <div class="field-mini"><label>TEHNIKA</label><input value="${esc(p.tech)}" data-admin-field="tech" data-id="${p.id}"></div>
            <div class="field-mini"><label>MÕÕDUD</label><input value="${esc(p.size)}" data-admin-field="size" data-id="${p.id}"></div>
          </div>
          <div class="field-mini"><label>KIRJELDUS</label><textarea rows="2" data-admin-field="desc" data-id="${p.id}">${esc(p.desc)}</textarea></div>
          <div class="admin-status-row">
            <div class="admin-toggles">
              <span class="toggle-btn avail ${!p.sold ? 'on' : ''}" data-action="mark-available" data-id="${p.id}">Saadaval</span>
              <span class="toggle-btn sold ${p.sold ? 'on' : ''}" data-action="mark-sold" data-id="${p.id}">Müüdud</span>
            </div>
            <span class="remove-link" data-action="remove-painting" data-id="${p.id}">Kustuta maal</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="page-section">
      <div class="admin-header">
        <div>
          <p class="eyebrow">Halduspaneel</p>
          <h1 class="page-title" style="margin-bottom:0">Halda galeriid</h1>
        </div>
        <button class="btn btn-primary" data-action="add-painting">+ Lisa uus maal</button>
      </div>
      <p class="admin-hint">Muudatused salvestatakse selles brauseris automaatselt. Iga maali juures saad vahetada pilti, muuta pealkirja, mõõtu, tehnikat, hinda ja kirjeldust, märkida kas töö on saadaval või müüdud, ning ↑/↓ nooltega muuta piltide järjekorda galeriis ja avalehel.</p>
      ${items || '<p style="color:var(--text-tertiary)">Ühtegi maali pole veel lisatud.</p>'}
    </div>
  `;
}

/* ===== Render dispatcher ===== */

function render(page, param) {
  const map = {
    avaleht: screenAvaleht,
    galerii: screenGalerii,
    maal: () => screenMaal(param),
    kunstnikust: screenKunstnikust,
    naitused: screenNaitused,
    kontakt: screenKontakt,
    login: screenLogin,
    unustasin: screenUnustasin,
    unustasin_saadetud: screenUnustasinSaadetud,
    lahtesta: screenLahtesta,
    seaded: screenSeaded,
    haldus: screenHaldus,
  };
  const fn = map[page] || screenAvaleht;
  document.getElementById('page').innerHTML = fn();
  renderHeader();
}

/* ===== Actions ===== */

function updatePaintingField(id, field, value) {
  const p = state.paintings.find((x) => String(x.id) === String(id));
  if (!p) return;
  p[field] = value;
  persistPaintings();
}

function handleAction(el) {
  const action = el.dataset.action;
  const id = el.dataset.id;

  if (action === 'nav-toggle') {
    const links = document.querySelector('.nav-links');
    const open = links.classList.toggle('open');
    el.setAttribute('aria-expanded', String(open));
    return;
  }

  if (action === 'logout') {
    try { localStorage.removeItem(AUTH_KEY); } catch (e) {}
    state.loggedIn = false;
    navigate('avaleht');
    return;
  }

  if (action === 'set-lang-et') { setLang('et'); return; }
  if (action === 'set-lang-en') { setLang('en'); return; }

  if (action === 'login-submit') {
    const email = document.getElementById('login-email').value.trim().toLowerCase();
    const pw = document.getElementById('login-pw').value;
    if (email === state.adminEmail.toLowerCase() && pw === state.adminPassword) {
      try { localStorage.setItem(AUTH_KEY, '1'); } catch (e) {}
      state.loggedIn = true;
      uiState.loginError = false;
      navigate('haldus');
    } else {
      uiState.loginError = true;
      rerender();
    }
    return;
  }

  if (action === 'forgot-submit') {
    navigate('unustasin_saadetud');
    return;
  }

  if (action === 'reset-submit') {
    const pw1 = document.getElementById('reset-pw1').value;
    const pw2 = document.getElementById('reset-pw2').value;
    if (pw1.length < 8 || pw1 !== pw2) {
      uiState.resetError = true;
      rerender();
      return;
    }
    state.adminPassword = pw1;
    persistCreds(state.adminEmail, pw1);
    uiState.resetError = false;
    navigate('login');
    return;
  }

  if (action === 'settings-submit') {
    const email = document.getElementById('settings-email').value.trim();
    const currentPw = document.getElementById('settings-current-pw').value;
    const newPw = document.getElementById('settings-new-pw').value;
    if (!email) {
      uiState.settingsError = true;
      uiState.settingsErrorMsg = 'E-post ei saa olla tühi.';
      uiState.settingsSaved = false;
      rerender();
      return;
    }
    if (newPw && currentPw !== state.adminPassword) {
      uiState.settingsError = true;
      uiState.settingsErrorMsg = 'Praegune parool on vale.';
      uiState.settingsSaved = false;
      rerender();
      return;
    }
    if (newPw && newPw.length < 8) {
      uiState.settingsError = true;
      uiState.settingsErrorMsg = 'Uus parool peab olema vähemalt 8 tähemärki.';
      uiState.settingsSaved = false;
      rerender();
      return;
    }
    const finalPw = newPw || state.adminPassword;
    persistCreds(email, finalPw);
    state.adminEmail = email;
    state.adminPassword = finalPw;
    uiState.settingsError = false;
    uiState.settingsSaved = true;
    rerender();
    return;
  }

  if (action === 'toggle-show-sold') {
    state.showSold = el.checked;
    try { localStorage.setItem(SHOW_SOLD_KEY, state.showSold ? '1' : '0'); } catch (e) {}
    return;
  }

  if (action === 'add-painting') {
    const blank = {
      id: state.nextId,
      title: 'Uus maal',
      tech: '',
      size: '',
      year: new Date().getFullYear(),
      price: null,
      sold: false,
      desc: '',
      img: null,
    };
    state.paintings.unshift(blank);
    state.nextId += 1;
    persistPaintings();
    rerender();
    return;
  }

  if (action === 'move-up' || action === 'move-down') {
    const dir = action === 'move-up' ? -1 : 1;
    const idx = state.paintings.findIndex((p) => String(p.id) === String(id));
    const swapIdx = idx + dir;
    if (idx === -1 || swapIdx < 0 || swapIdx >= state.paintings.length) return;
    [state.paintings[idx], state.paintings[swapIdx]] = [state.paintings[swapIdx], state.paintings[idx]];
    persistPaintings();
    rerender();
    return;
  }

  if (action === 'remove-painting') {
    state.paintings = state.paintings.filter((p) => String(p.id) !== String(id));
    persistPaintings();
    rerender();
    return;
  }

  if (action === 'mark-available' || action === 'mark-sold') {
    const p = state.paintings.find((x) => String(x.id) === String(id));
    if (p) {
      p.sold = action === 'mark-sold';
      persistPaintings();
      rerender();
    }
    return;
  }

  if (action === 'contact-submit') {
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    const note = document.getElementById('contact-note');
    if (!name || !email || !message) {
      note.textContent = t('contact_fill_all');
      note.className = 'form-note error';
      note.hidden = false;
      return;
    }
    const subject = (state.lang === 'en' ? 'Contact form — ' : 'Kontaktivorm — ') + name;
    const bodyLabel = state.lang === 'en' ? 'Name: ' + name + '\nEmail: ' + email : 'Nimi: ' + name + '\nE-post: ' + email;
    const body = bodyLabel + '\n\n' + message;
    const href = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    note.textContent = t('contact_opening_email');
    note.className = 'form-note success';
    note.hidden = false;
    window.location.href = href;
    return;
  }
}

document.addEventListener('click', (e) => {
  const navEl = e.target.closest('[data-nav]');
  if (navEl) {
    e.preventDefault();
    navigate(navEl.dataset.nav, navEl.dataset.id);
    const links = document.querySelector('.nav-links');
    if (links) links.classList.remove('open');
    return;
  }
  const actionEl = e.target.closest('[data-action]');
  if (actionEl) {
    handleAction(actionEl);
  }
});

document.addEventListener('input', (e) => {
  const t = e.target;
  if (t.matches('[data-admin-field]')) {
    const id = t.dataset.id;
    const field = t.dataset.adminField;
    let value = t.value;
    if (field === 'year' || field === 'price') {
      value = value === '' ? null : Number(value);
    }
    updatePaintingField(id, field, value);
  }
});

document.addEventListener('change', (e) => {
  const t = e.target;
  if (t.matches('[data-image-upload]')) {
    const id = t.dataset.id;
    const file = t.files && t.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      updatePaintingField(id, 'img', reader.result);
      rerender();
    };
    reader.readAsDataURL(file);
  }
});

window.addEventListener('hashchange', onRouteChange);

loadState();
onRouteChange();

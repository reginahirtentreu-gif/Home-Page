document.getElementById('year').textContent = new Date().getFullYear();

const STORAGE_KEY = 'rp_paintings_v4';
const AUTH_KEY = 'rp_admin_logged_v1';
const EMAIL_KEY = 'rp_admin_email_v1';
const PW_KEY = 'rp_admin_pw_v1';
const SHOW_SOLD_KEY = 'rp_show_sold_v1';

const DEFAULT_ADMIN_EMAIL = 'regina.hirtentreu@gmail.com';
const DEFAULT_ADMIN_PASSWORD = 'Hirtekas12';
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
};

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
  if (n == null || n === '') return 'Hind küsimisel';
  return Number(n).toLocaleString('et-EE').replace(/ /g, ' ') + ' €';
}

function seedPaintings() {
  const withPhoto = [
    { title: 'Rannarõõmud', tech: 'Õli lõuendil', size: '70 × 90 cm', year: 2025, price: 3000, sold: false, img: 'uploads/0FC23549-0673-40EE-A4E6-6CE5946FEC02.jpeg' },
    { title: 'Linnamöll', tech: 'Akrüül lõuendil', size: '40 × 60 cm', year: 2025, price: 2500, sold: false, img: 'uploads/53cc8d0d-32cd-4067-9598-f4dd9df23dfb.jpeg' },
    { title: 'Leht', tech: 'Akrüül paberil', size: '65 × 79 cm', year: 2014, price: 300, sold: false, img: 'uploads/DSC01733.jpeg' },
    { title: 'Corgi terrassil (Ruutu)', tech: 'Õli lõuendil', size: '60 × 80 cm', year: 2020, price: null, sold: true, img: 'uploads/IMG_0324.jpeg' },
    { title: 'Vannipart', tech: 'Kuivpastell', size: '62 × 76 cm', year: 2018, price: null, sold: true, img: 'uploads/IMG_0340.jpeg' },
    { title: 'Landscape', tech: 'Akrüül lõuendil', size: '70 × 90 cm', year: 2023, price: 2500, sold: false, img: 'uploads/IMG_0789.jpeg' },
    { title: 'Varjud metsas', tech: 'Akrüül lõuendil, raamitud', size: '62 × 100 cm', year: 2020, price: 750, sold: false, img: 'uploads/IMG_0794.jpeg' },
    { title: 'Voolamine', tech: 'Akrüül lõuendil', size: '60 × 150 cm', year: 2023, price: 1200, sold: false, img: 'uploads/IMG_0802.jpeg' },
    { title: 'Klaaskuul', tech: 'Akrüül papil', size: '59 × 84 cm', year: 2021, price: 75, sold: false, img: 'uploads/IMG_2343.jpeg' },
    { title: 'Nõmm koos metsatukaga', tech: 'Akrüül lõuendil', size: '70 × 70 cm', year: 2025, price: 2500, sold: false, img: 'uploads/IMG_3052.jpeg' },
    { title: 'Puupea', tech: 'Akrüül lõuendil', size: '60 × 80 cm', year: 2024, price: 750, sold: false, img: 'uploads/b64f69a5-68ec-4fbc-91a7-ae45546ccbcf.jpeg' },
    { title: 'Avatar', tech: 'Akrüül paberil', size: '65 × 76 cm', year: 2016, price: null, sold: true, img: 'uploads/IMG_4971_1.jpeg' },
    { title: 'Mets', tech: 'Õli lõuendil', size: '70 × 100 cm', year: 2016, price: null, sold: true, img: 'uploads/IMG_5046.jpeg' },
    { title: 'Bob', tech: 'Õli lõuendil', size: '50 × 60 cm', year: 2013, price: null, sold: true, img: 'uploads/IMG_5169.jpeg' },
    { title: 'Mõtte peegeldus', tech: 'Akrüül paberil', size: '77 × 61 cm', year: 2016, price: 350, sold: false, img: 'uploads/IMG_5231_Original.jpeg' },
    { title: 'Hundu', tech: 'Kuivpastell', size: '59 × 84 cm', year: 2016, price: null, sold: true, img: 'uploads/IMG_5256.jpeg' },
    { title: 'Masenduse hetk', tech: 'Õli', size: '77 × 61 cm', year: 2016, price: null, sold: true, img: 'uploads/IMG_5329.jpeg' },
    { title: 'Ambaal ujumas', tech: 'Õli lõuendil', size: '70 × 100 cm', year: 2025, price: 3000, sold: false, img: 'uploads/IMG_3132.jpeg' },
    { title: 'Kiigel', tech: 'Akrüül lõuendil', size: '70 × 70 cm', year: 2025, price: null, sold: true, img: 'uploads/IMG_4395.jpeg' },
    { title: 'Figuur', tech: 'Süsi', size: '59 × 84 cm', year: 2016, price: null, sold: true, img: 'uploads/IMG_5265.jpeg' },
  ];
  const photoPending = [
    { title: 'Silmside', tech: 'Pastakas paberil', size: '65 × 76 cm', year: 2016, price: 75, sold: false },
    { title: 'Miski südames', tech: 'Õli', size: '50 × 60 cm', year: 2017, price: 350, sold: false },
    { title: 'Seenemikk', tech: 'Õli', size: '70 × 100 cm', year: 2017, price: null, sold: true },
  ];
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
  const subject = 'Päring: ' + p.title;
  const bodyLines = ['Tere,', '', 'Huvitun maalist „' + p.title + '"' + (p.price != null ? ' (' + priceStr + ')' : '') + '.', ''];
  const mailtoHref = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(bodyLines.join('\n'));
  const waText = 'Tere, huvitun maalist „' + p.title + '"' + (p.price != null ? ' (' + priceStr + ')' : '') + '.';
  const waHref = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(waText);
  return {
    ...p,
    priceStr,
    meta: [p.tech, p.size, p.year].filter(Boolean).join(' · '),
    avail: !p.sold,
    status: p.sold ? 'Müüdud' : 'Saadaval',
    mailtoHref,
    waHref,
  };
}

function imgBox(p, extraClass) {
  if (p.img) {
    return `<div class="imgbox ${extraClass || ''}"><img src="${esc(p.img)}" alt="${esc(p.title)}"></div>`;
  }
  return `<div class="imgbox ${extraClass || ''}"><span>foto lisandumas</span></div>`;
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
  const { page } = currentRoute();
  document.querySelectorAll('.nav-links a[data-nav]').forEach((a) => {
    a.classList.toggle('active', a.dataset.nav === page);
  });
  const actions = document.getElementById('header-actions');
  const langHtml = `<span class="lang-toggle"><span class="lang-on">ET</span> / EN</span>`;
  if (state.loggedIn) {
    actions.innerHTML = `
      ${langHtml}
      <span data-nav="haldus">Halda galeriid</span>
      <span data-nav="seaded">Seaded</span>
      <span data-action="logout">Logi välja</span>
    `;
  } else {
    actions.innerHTML = `
      ${langHtml}
      <span data-nav="login">Logi sisse</span>
    `;
  }
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
      <p class="eyebrow">Originaalmaalid · õli ja akrüül</p>
      <h1>Vaikus, valgus ja põhjamaine maastik lõuendil</h1>
      <div class="hero-actions">
        <button class="btn btn-primary" data-nav="galerii">Vaata galeriid</button>
        <button class="btn btn-outline" data-nav="kunstnikust">Kunstnikust</button>
      </div>
    </div>
    <div class="featured-grid">${featuredHtml}</div>
    <div class="all-works-link"><span data-nav="galerii">KÕIK TÖÖD →</span></div>
    <div class="quote-block">
      <div class="placeholder-block"><span>kunstniku portree</span></div>
      <div>
        <p class="eyebrow">Kunstnikust</p>
        <p class="quote-text">„Maalin valgust, mis jääb hetkeks pidama — mere kohal, toa nurgas, mälestuses."</p>
        <p class="quote-more" data-nav="kunstnikust">LOE EDASI →</p>
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
        ${p.sold ? '<span class="sold-badge">MÜÜDUD</span>' : ''}
      </div>
      ${p.avail ? `
        <div class="contact-pills">
          <a class="pill pill-email" href="${p.mailtoHref}">✉ E-post</a>
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
      <p class="eyebrow">Galerii</p>
      <h1 class="page-title">Kõik tööd</h1>
      <div class="gallery-grid">${cards || '<p style="color:var(--text-tertiary)">Töid ei ole hetkel lisatud.</p>'}</div>
    </div>
  `;
}

function screenMaal(id) {
  const raw = state.paintings.find((p) => String(p.id) === String(id)) || state.paintings[0];
  if (!raw) {
    return `<div class="page-section"><p>Maali ei leitud.</p></div>`;
  }
  const p = decorate(raw);
  return `
    <div class="page-section">
      <span class="back-link" data-nav="galerii">← TAGASI GALERIISSE</span>
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
              <p class="interest-label">Huvitatud sellest tööst?</p>
              <div class="interest-buttons">
                <a class="btn-block email-btn" href="${p.mailtoHref}"><span>✉</span> Kirjuta e-mailile</a>
                <a class="btn-block whatsapp-btn" href="${p.waHref}" target="_blank" rel="noopener">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.06h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.11.82.83-3.03-.2-.31a8.19 8.19 0 0 1-1.26-4.4c0-4.53 3.69-8.22 8.24-8.22 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.81c0 4.53-3.7 8.23-8.25 8.23z"></path></svg>
                  Kirjuta WhatsAppis
                </a>
              </div>
            </div>
          ` : `<div class="sold-block"><span>MÜÜDUD</span></div>`}
          <div class="assurances">
            <span>Tasuta transport Eestis · 5–7 tööpäeva</span>
            <span>Autori sertifikaat kaasas</span>
            <span>14-päevane tagastusõigus</span>
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
        <div class="placeholder-block"><span>kunstniku portree — foto</span></div>
        <div class="about-body">
          <p class="eyebrow">Kunstnikust</p>
          <h1>Regina Pruul</h1>
          <p>Olen lõpetanud Eesti Kunstiakadeemia maali konserveerimise eriala. Mind huvitavad erinevad maalitehnikad ja stiilid ning nende kasutamine oma loomingus.</p>
          <p>Kujutan sageli loodust ja inimest, nihestades vaatenurka või liikudes abstraktsema kujutamisviisi suunas. Minu töid mõjutab ka huvi disaini vastu, mis toetab tundlikku kompositsiooni- ja värvikäsitlust.</p>
          <div class="cv-block">
            <p class="label">CV / VALIK</p>
            <div class="cv-list">
              <span>2026 — „Valge väli", isikunäitus, Tallinn</span>
              <span>2024 — grupinäitus, Tartu Kunstimaja</span>
              <span>Eesti Kunstiakadeemia — maali konserveerimise eriala</span>
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
          <p class="eyebrow">Kontakt</p>
          <h1>Kirjuta mulle</h1>
          <p>Küsimused maalide, tellimustööde või näituste kohta on alati teretulnud.</p>
          <div class="contact-details">
            <span>${esc(CONTACT_EMAIL)}</span>
            <span>${esc(WHATSAPP_DISPLAY)}</span>
            <span>Ateljee: Tallinn (külastus kokkuleppel)</span>
            <span>Instagram: @reginapruul</span>
          </div>
        </div>
        <div class="contact-form">
          <div class="form-field"><label>NIMI</label><input id="contact-name" type="text"></div>
          <div class="form-field"><label>E-POST</label><input id="contact-email" type="email"></div>
          <div class="form-field"><label>SÕNUM</label><textarea id="contact-message" rows="6"></textarea></div>
          <p id="contact-note" class="form-note" hidden></p>
          <button class="btn btn-primary" style="align-self:flex-start" data-action="contact-submit">Saada</button>
        </div>
      </div>
    </div>
  `;
}

function screenLogin() {
  return `
    <div class="auth-page">
      <p class="eyebrow">Halduspaneel</p>
      <h1>Logi sisse</h1>
      <div class="auth-form">
        <div class="form-field"><label>E-POST</label><input id="login-email" type="email"></div>
        <div class="form-field"><label>PAROOL</label><input id="login-pw" type="password"></div>
        ${uiState.loginError ? '<p class="error-text">Vale e-post või parool, proovi uuesti.</p>' : ''}
        <button class="btn btn-primary" data-action="login-submit">Logi sisse</button>
        <span class="auth-back" data-nav="unustasin">Unustasin parooli</span>
      </div>
    </div>
  `;
}

function screenUnustasin() {
  return `
    <div class="auth-page">
      <p class="eyebrow">Parooli lähtestamine</p>
      <h1>Unustasid parooli?</h1>
      <p class="intro">Sisesta oma kontoga seotud e-posti aadress — saadame sulle lähtestamislingi.</p>
      <div class="auth-form">
        <div class="form-field"><label>E-POST</label><input id="forgot-email" type="email"></div>
        <button class="btn btn-primary" data-action="forgot-submit">Saada lähtestamislink</button>
        <span class="auth-back" data-nav="login">← Tagasi sisselogimise juurde</span>
      </div>
    </div>
  `;
}

function screenUnustasinSaadetud() {
  return `
    <div class="auth-page">
      <p class="eyebrow">Parooli lähtestamine</p>
      <h1 style="font-style:italic">Kontrolli oma postkasti</h1>
      <p class="intro">Kui see e-post on kontoga seotud, oleme saatnud sellele parooli lähtestamise lingi. Link kehtib 30 minutit.</p>
      <div class="auth-form">
        <button class="btn btn-outline" data-nav="lahtesta">Ava lähtestamislink (prototüübi demo)</button>
        <span class="auth-back" data-nav="login">← Tagasi sisselogimise juurde</span>
      </div>
    </div>
  `;
}

function screenLahtesta() {
  return `
    <div class="auth-page">
      <p class="eyebrow">Parooli lähtestamine</p>
      <h1>Määra uus parool</h1>
      <div class="auth-form">
        <div class="form-field"><label>UUS PAROOL</label><input id="reset-pw1" type="password"></div>
        <div class="form-field"><label>KORDA UUT PAROOLI</label><input id="reset-pw2" type="password"></div>
        ${uiState.resetError ? '<p class="error-text">Paroolid ei kattu või on lühem kui 8 tähemärki.</p>' : ''}
        <button class="btn btn-primary" data-action="reset-submit">Salvesta uus parool</button>
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
      note.textContent = 'Palun täida kõik väljad.';
      note.className = 'form-note error';
      note.hidden = false;
      return;
    }
    const subject = 'Kontaktivorm — ' + name;
    const body = 'Nimi: ' + name + '\nE-post: ' + email + '\n\n' + message;
    const href = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    note.textContent = 'Avan e-postiprogrammi eeltäidetud kirjaga...';
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

document.querySelector('.nav-toggle').addEventListener('click', function () {
  const links = document.querySelector('.nav-links');
  const open = links.classList.toggle('open');
  this.setAttribute('aria-expanded', String(open));
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

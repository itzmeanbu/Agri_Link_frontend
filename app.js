const C = window.AGRILINK, $ = s => document.querySelector(s), app = $('#app');
let session = JSON.parse(localStorage.getItem('agrilink.session') || 'null');
let lang = localStorage.getItem('agrilink.lang') || 'en';

// Tamil translations for all user-facing UI text (not for database content
// like crop names, buyer names, prices — only interface chrome).
const TA = {
  'Market prices': 'சந்தை விலைகள்', 'Marketplace': 'சந்தை இடம்', 'Buyers': 'வாங்குபவர்கள்',
  'Schemes': 'திட்டங்கள்', 'Equipment': 'உபகரணங்கள்', 'Dashboard': 'டாஷ்போர்டு',
  'Log in': 'உள்நுழைய', 'Register': 'பதிவு செய்ய', 'Sign out': 'வெளியேறு', 'Add new': 'புதியது சேர்',
  'Add': 'சேர்', 'Save': 'சேமி', 'Cancel': 'ரத்து செய்', 'Overview': 'கண்ணோட்டம்',
  'Crop lots': 'பயிர் தொகுப்புகள்', 'Market intelligence': 'சந்தை தகவல்',
  'Buyer matches': 'வாங்குபவர் பொருத்தங்கள்', 'Offers': 'சலுகைகள்', 'Orders': 'ஆர்டர்கள்',
  'Grievances': 'குறைகள்', 'Notifications': 'அறிவிப்புகள்', 'Profile': 'சுயவிவரம்',
  'Members': 'உறுப்பினர்கள்', 'Transactions': 'பரிவர்த்தனைகள்', 'Requirements': 'தேவைகள்',
  'Browse lots': 'தொகுப்புகளை பார்க்க', 'Farmers': 'விவசாயிகள்', 'FPOs': 'எஃப்பிஓக்கள்',
  'Seller listings': 'விற்பனையாளர் பட்டியல்கள்', 'Farmer listings': 'விவசாயி பட்டியல்கள்', 'FPO listings': 'எஃப்பிஓ பட்டியல்கள்',
  'Farmer sellers': 'விவசாயி விற்பனையாளர்கள்', 'FPO sellers': 'எஃப்பிஓ விற்பனையாளர்கள்',
  'Manage farmer crop products and seller details.': 'விவசாயி பயிர் பொருட்கள் மற்றும் விற்பனையாளர் விவரங்களை நிர்வகிக்கவும்.',
  'Manage FPO crop products and seller details.': 'எஃப்பிஓ பயிர் பொருட்கள் மற்றும் விற்பனையாளர் விவரங்களை நிர்வகிக்கவும்.',
  'No crop products listed yet.': 'இதுவரை பயிர் பொருட்கள் பட்டியலிடப்படவில்லை.',
  'Products': 'பொருட்கள்', 'Seller details': 'விற்பனையாளர் விவரங்கள்', 'Phone': 'தொலைபேசி',
  'Payments': 'பணம் செலுத்துதல்', 'Logistics': 'போக்குவரத்து', 'Recycle bin': 'குப்பை தொட்டி',
  'Settings': 'அமைப்புகள்',
  'Sell Your Crop': 'உங்கள் பயிரை விற்கவும்', 'Coordinate as an FPO': 'எஃப்பிஓவாக ஒருங்கிணைக்கவும்',
  'Find Crops to Buy': 'வாங்க பயிர்களைக் கண்டறியவும்', 'Regional market pulse': 'பிராந்திய சந்தை நிலவரம்',
  'this week': 'இந்த வாரம்', 'Demo fallback data': 'மாதிரி தரவு',
  'Prices you can act on': 'நடவடிக்கை எடுக்கக்கூடிய விலைகள்', 'per quintal': 'ஒரு குவிண்டால்',
  'Create a listing and receive offers from verified buyers.': 'ஒரு பட்டியலை உருவாக்கி சரிபார்க்கப்பட்ட வாங்குபவர்களிடமிருந்து சலுகைகளைப் பெறுங்கள்.',
  'Explore marketplace →': 'சந்தையை ஆராயுங்கள் →',
  'Rent or buy equipment from farmers and FPOs.': 'விவசாயிகள் மற்றும் எஃப்பிஓக்களிடமிருந்து உபகரணங்களை வாடகைக்கு அல்லது வாங்கவும்.',
  'See equipment →': 'உபகரணங்களைப் பார்க்க →', 'Government schemes': 'அரசு திட்டங்கள்',
  'Discover official programmes and support.': 'அதிகாரப்பூர்வ திட்டங்கள் மற்றும் ஆதரவைக் கண்டறியவும்.',
  'Browse schemes →': 'திட்டங்களை உலாவவும் →',
  'Admin sign in': 'நிர்வாக உள்நுழைவு', 'Create an account': 'கணக்கை உருவாக்கவும்',
  'Welcome back': 'மீண்டும் வரவேற்கிறோம்',
  'Sign in with your administrator account.': 'உங்கள் நிர்வாகி கணக்கில் உள்நுழையவும்.',
  'Sell harvests': 'அறுவடைகளை விற்கவும்', 'Coordinate members': 'உறுப்பினர்களை ஒருங்கிணைக்கவும்',
  'Source crops': 'பயிர்களை பெறவும்', 'Name': 'பெயர்', 'Email': 'மின்னஞ்சல்',
  'Password': 'கடவுச்சொல்', 'Phone': 'தொலைபேசி', 'Submit for approval': 'ஒப்புதலுக்கு சமர்ப்பிக்கவும்',
  'Already registered?': 'ஏற்கனவே பதிவு செய்துள்ளீர்களா?', 'New here?': 'இங்கு புதியவரா?',
  'Registration submitted. An administrator must approve it.': 'பதிவு சமர்ப்பிக்கப்பட்டது. ஒரு நிர்வாகி அதை அங்கீகரிக்க வேண்டும்.',
  'Use the public login for this account': 'இந்த கணக்கிற்கு பொது உள்நுழைவைப் பயன்படுத்தவும்',
  'Welcome, ': 'வரவேற்கிறோம், ',
  'Regional market prices': 'பிராந்திய சந்தை விலைகள்', 'Crop marketplace': 'பயிர் சந்தை',
  'Buyer directory': 'வாங்குபவர் அடைவு', 'Equipment marketplace': 'உபகரண சந்தை',
  'About AgriLink': 'AgriLink பற்றி',
  'Provider credentials are not configured. Prices shown are demo/fallback data, updated today.': 'வழங்குநர் தகவல் அமைக்கப்படவில்லை. காட்டப்படும் விலைகள் மாதிரி தரவு.',
  'Verified buyer': 'சரிபார்க்கப்பட்ட வாங்குபவர்', 'Demand:': 'தேவை:',
  'Contact after login': 'உள்நுழைந்த பின் தொடர்பு கொள்ளவும்',
  'Open official site': 'அதிகாரப்பூர்வ தளத்தைத் திறக்கவும்', 'Request / contact': 'கோரிக்கை / தொடர்பு',
  'Make offer': 'சலுகை அளிக்கவும்',
  'Only buyer accounts can make offers.': 'வாங்குபவர் கணக்குகள் மட்டுமே சலுகைகளை அளிக்க முடியும்.',
  'Log in as a buyer to offer': 'சலுகை அளிக்க வாங்குபவராக உள்நுழையவும்',
  'No active crop lots yet. Be the first farmer to list a crop.': 'இதுவரை பயிர் தொகுப்புகள் இல்லை. முதல் விவசாயியாக பட்டியலிடுங்கள்.',
  'AgriLink makes agricultural trade more transparent—from field to payment.': 'AgriLink வயலில் இருந்து பணம் வரை விவசாய வர்த்தகத்தை மிகவும் வெளிப்படையானதாக ஆக்குகிறது.',
  'Could not load live data. Please check the service connection.': 'நேரடி தரவை ஏற்ற முடியவில்லை. இணைப்பை சரிபார்க்கவும்.',
  'Make an offer —': 'சலுகை அளிக்கவும் —', 'Price per quintal (₹)': 'ஒரு குவிண்டாலுக்கான விலை (₹)',
  'Quantity (quintals)': 'அளவு (குவிண்டால்கள்)', 'Submit offer': 'சலுகையை சமர்ப்பிக்கவும்',
  'Offer submitted — the farmer has been notified': 'சலுகை சமர்ப்பிக்கப்பட்டது — விவசாயிக்கு தெரிவிக்கப்பட்டது',
  'workspace': 'பணியிடம்', 'Loading…': 'ஏற்றுகிறது…',
  'Active crop lots': 'செயலில் உள்ள பயிர் தொகுப்புகள்', 'Account': 'கணக்கு', 'Active': 'செயலில்',
  'Market-price data remains in fallback/demo mode until a provider is configured.': 'வழங்குநர் அமைக்கப்படும் வரை சந்தை விலை தரவு மாதிரி முறையில் உள்ளது.',
  'No active crop lots yet.': 'இதுவரை செயலில் உள்ள பயிர் தொகுப்புகள் இல்லை.',
  'Demo/fallback market-price data — provider not configured.': 'மாதிரி சந்தை விலை தரவு — வழங்குநர் அமைக்கப்படவில்லை.',
  'Profile settings are available through the account API.': 'சுயவிவர அமைப்புகள் கணக்கு API வழியாக கிடைக்கும்.',
  'No records yet.': 'இதுவரை பதிவுகள் இல்லை.', 'No records found.': 'பதிவுகள் எதுவும் இல்லை.',
  'Search': 'தேடு', 'Bulk approve selected': 'தேர்ந்தெடுத்தவை அங்கீகரிக்கவும்',
  'Approve': 'அங்கீகரி', 'Suspend': 'இடைநிறுத்து', 'Remove': 'நீக்கு', 'Update': 'புதுப்பி',
  'View': 'பார்வை', 'Select at least one record': 'குறைந்தது ஒரு பதிவையாவது தேர்ந்தெடுக்கவும்',
  'Accounts approved': 'கணக்குகள் அங்கீகரிக்கப்பட்டன', 'Account updated': 'கணக்கு புதுப்பிக்கப்பட்டது',
  'Remove this listing? It will be hidden from the marketplace.': 'இந்த பட்டியலை நீக்கவா? இது சந்தையில் இருந்து மறைக்கப்படும்.',
  'Listing removed': 'பட்டியல் நீக்கப்பட்டது',
  'Order updated — buyer notified': 'ஆர்டர் புதுப்பிக்கப்பட்டது — வாங்குபவருக்கு தெரிவிக்கப்பட்டது',
  'Processing photos…': 'படங்களை செயலாக்குகிறது…',
  'Could not read one of the photos': 'ஒரு படத்தைப் படிக்க முடியவில்லை',
  'Saved successfully': 'வெற்றிகரமாக சேமிக்கப்பட்டது', 'You are signed out': 'நீங்கள் வெளியேறிவிட்டீர்கள்',
  'Back to': 'திரும்பு',
  'Region': 'பகுதி', 'optional': 'விருப்பமானது',
  'No approved buyers yet.': 'இதுவரை அங்கீகரிக்கப்பட்ட வாங்குபவர்கள் இல்லை.',
  'No equipment listed yet.': 'இதுவரை உபகரணங்கள் பட்டியலிடப்படவில்லை.',
  'Delete selected': 'தேர்ந்தெடுத்தவற்றை நீக்கு',
  'Remove this equipment listing?': 'இந்த உபகரண பட்டியலை நீக்கவா?',
  'Selected records deleted': 'தேர்ந்தெடுத்த பதிவுகள் நீக்கப்பட்டன',
  'Delete the selected records? This cannot be undone from here.': 'தேர்ந்தெடுத்த பதிவுகளை நீக்கவா? இதை இங்கிருந்து மீட்டெடுக்க முடியாது.',
  'Choose a seller group to review accounts and crop products.': 'கணக்குகள் மற்றும் பயிர் பொருட்களைப் பார்க்க விற்பனையாளர் குழுவைத் தேர்ந்தெடுக்கவும்.',
  'No sellers found.': 'விற்பனையாளர்கள் எவரும் இல்லை.',
  'Approval status': 'ஒப்புதல் நிலை', 'Email': 'மின்னஞ்சல்', 'Region': 'பகுதி',
  'Crop': 'பயிர்', 'Quantity': 'அளவு', 'Expected price': 'எதிர்பார்க்கும் விலை',
  'Harvest date': 'அறுவடை தேதி', 'Status': 'நிலை'
};
function t(s) { return lang === 'ta' ? (TA[s] || s) : s }

// Field-name labels used inside the "Add new" form modal.
const FIELD_TA = {
  crop: 'பயிர்', variety: 'வகை', grade: 'தரம்', quantity: 'அளவு', expectedPrice: 'எதிர்பார்க்கும் விலை',
  region: 'பகுதி', harvestDate: 'அறுவடை தேதி', description: 'விளக்கம்', name: 'பெயர்', type: 'வகை',
  price: 'விலை', location: 'இடம்', availability: 'கிடைக்கும் தன்மை', subject: 'தலைப்பு'
};
function tf(s) { return lang === 'ta' ? (FIELD_TA[s] || s) : s }
function tPage(page) { let cap = page.charAt(0).toUpperCase() + page.slice(1); return t(cap) }

const demo = {
  prices: [
    { crop: 'Paddy', price: 2340, region: 'Thanjavur', trend: '↑ 4.2%' },
    { crop: 'Onion', price: 1980, region: 'Nashik', trend: '↑ 2.8%' },
    { crop: 'Tomato', price: 1560, region: 'Kolar', trend: '↓ 1.1%' }
  ],
  buyers: [
    { name: 'Shakti Agro Foods', location: 'Tamil Nadu', demand: '100 quintals' },
    { name: 'GreenField Exports', location: 'Chennai', demand: '500 quintals' }
  ],
  schemes: [
    { title: 'PM-KISAN Samman Nidhi', text: 'Income support for eligible farmer families.', url: 'https://pmkisan.gov.in/' },
    { title: 'PM Fasal Bima Yojana', text: 'Crop insurance support.', url: 'https://pmfby.gov.in/' }
  ],
  equipment: [
    { name: 'Mahindra 575 DI Tractor', type: 'Rent', price: 1200, location: 'Thanjavur', ownerType: 'Farmer', availability: 'Available' }
  ]
};

function toast(x) { const el = $('#toast'); el.textContent = x; el.classList.add('show'); setTimeout(() => el.classList.remove('show'), 2600) }

async function api(path, opt = {}) {
  try {
    let r = await fetch(C.apiBase + '/api' + path, {
      headers: { 'Content-Type': 'application/json', ...(session ? { Authorization: 'Bearer ' + session.token } : {}) },
      ...opt
    }), d = await r.json();
    if (!r.ok) throw Error(d.error || 'Request failed');
    return d
  } catch (e) { throw e }
}

const brand = () => `<a class="brand" href="#/"><img class="logo" src="${C.logo}" alt="${C.name} logo"><span>${C.name}</span></a>`;

function nav() {
  return `<header class="nav">${brand()}<nav class="nav-links"><a href="#/market">${t('Market prices')}</a><a href="#/marketplace">${t('Marketplace')}</a><a href="#/buyers">${t('Buyers')}</a><a href="#/schemes">${t('Schemes')}</a><a href="#/equipment">${t('Equipment')}</a></nav><div>${session ? `<a class="ghost" href="#/dashboard">${t('Dashboard')}</a>` : `<a class="ghost" href="#/login">${t('Log in')}</a> <a class="button" href="#/register">${t('Register')}</a>`} <button id="langToggle" class="ghost" type="button">${lang === 'ta' ? 'EN' : 'தமிழ்'}</button></div></header>`
}

const layout = x => nav() + `<main class="wrap">${x}</main><footer class="footer">${brand()}<span>Market intelligence for a stronger harvest.</span><span>© 2026 AgriLink</span></footer>`;

function home() {
  app.innerHTML = layout(`<section class="hero"><div><p class="eyebrow">AGRICULTURAL MARKETPLACE</p><h1>Sell smarter.<br>Find better markets.</h1><p class="lead">List crops, discover verified buyers, track delivery and receive payment with confidence.</p><div class="actions"><a class="button" href="#/register">${t('Sell Your Crop')}</a><a class="ghost" href="#/register?role=fpo">${t('Coordinate as an FPO')}</a><a class="ghost" href="#/register?role=buyer">${t('Find Crops to Buy')}</a></div></div><aside class="pulse"><b>${t('Regional market pulse')}</b><div class="price">₹2,340 <small>/ ${t('per quintal')}</small></div><span class="up">↑ 4.2% ${t('this week')}</span><p class="muted">Paddy · Thanjavur · ${t('Demo fallback data')}</p></aside></section><section class="section"><p class="eyebrow">MARKET INTELLIGENCE</p><h2>${t('Prices you can act on')}</h2><div class="grid">${demo.prices.map(p => `<article class="card"><h3>${p.crop}</h3><div class="price">₹${p.price}</div><span class="up">${p.trend}</span><p class="muted">${p.region} · ${t('per quintal')}</p></article>`).join('')}</div></section><section class="section grid"><article class="feature"><h3>${t('Crop lots')}</h3><p>${t('Create a listing and receive offers from verified buyers.')}</p><a href="#/marketplace">${t('Explore marketplace →')}</a></article><article class="feature"><h3>${t('Equipment')}</h3><p>${t('Rent or buy equipment from farmers and FPOs.')}</p><a href="#/equipment">${t('See equipment →')}</a></article><article class="feature"><h3>${t('Government schemes')}</h3><p>${t('Discover official programmes and support.')}</p><a href="#/schemes">${t('Browse schemes →')}</a></article></section>`)
}

function authPage(admin = false) {
  let role = new URLSearchParams(location.hash.split('?')[1] || '').get('role') || 'farmer',
    reg = location.hash.startsWith('#/register');
  app.innerHTML = `<section class="auth"><form class="authbox" id="auth"><a class="brand" href="#/"><img class="logo" src="${C.logo}" alt="${C.name} logo"><span>← ${t('Back to')} ${C.name}</span></a><h1>${admin ? t('Admin sign in') : reg ? t('Create an account') : t('Welcome back')}</h1>${admin ? `<p class="muted">${t('Sign in with your administrator account.')}</p>` : ''}${reg ? `<div class="roles">${['farmer', 'fpo', 'buyer'].map(r => `<button type="button" class="role ${role === r ? 'selected' : ''}" data-role="${r}"><b>${r.toUpperCase()}</b><br><small>${r === 'farmer' ? t('Sell harvests') : r === 'fpo' ? t('Coordinate members') : t('Source crops')}</small></button>`).join('')}</div><div class="field"><label>${t('Name')}<input name="name" required></label></div>` : ''}<div class="field"><label>${t('Email')}<input type="email" name="email" required></label></div><div class="field"><label>${t('Password')}<input type="password" name="password" minlength="6" required></label></div>${reg ? `<div class="field"><label>${t('Phone')}<input name="phone"></label></div><div class="field"><label>${t('Region')} <small class="muted">(${t('optional')})</small><input name="region"></label></div>` : ''}<button class="button" style="width:100%;margin-top:10px">${reg ? t('Submit for approval') : t('Log in')}</button>${!admin ? `<p class="muted">${reg ? `${t('Already registered?')} <a href="#/login">${t('Log in')}</a>` : `${t('New here?')} <a href="#/register">${t('Create an account')}</a>`}</p>` : ''}</form></section>`;
  document.querySelectorAll('[data-role]').forEach(b => b.onclick = () => { role = b.dataset.role; authPage(false) });
  $('#auth').onsubmit = async e => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));
    try {
      if (reg) {
        await api('/auth/register', { method: 'POST', body: JSON.stringify({ ...data, role }) });
        toast(t('Registration submitted. An administrator must approve it.'));
        location.hash = '#/login'
      } else {
        let d = await api('/auth/login', { method: 'POST', body: JSON.stringify(data) });
        if (admin && d.user.role !== 'admin') throw Error(t('Use the public login for this account'));
        session = d; localStorage.setItem('agrilink.session', JSON.stringify(d));
        toast(t('Welcome, ') + d.user.name); location.hash = '#/dashboard'
      }
    } catch (x) { toast(x.message) }
  }
}

async function publicPage(type) {
  let heading = {
    market: t('Regional market prices'), marketplace: t('Crop marketplace'), buyers: t('Buyer directory'),
    schemes: t('Government schemes'), equipment: t('Equipment marketplace'), about: t('About AgriLink')
  }[type], body = '';
  try {
    if (type === 'market') body = `<p class="notice">${t('Provider credentials are not configured. Prices shown are demo/fallback data, updated today.')}</p><div class="grid">${demo.prices.map(p => `<article class="card"><h3>${p.crop}</h3><div class="price">₹${p.price}</div><p>${p.region} · ${p.trend}</p></article>`).join('')}</div>`;
    else if (type === 'buyers') {
      // Real approved buyer accounts — no more hardcoded demo names.
      let buyers = await api('/buyers');
      body = buyers.length ? `<div class="grid">${buyers.map(b => `<article class="card"><h3>${b.name}</h3>${b.region ? `<p>${b.region}</p>` : ''}<span class="badge approved">${t('Verified buyer')}</span><a class="button" href="#/register?role=farmer">${t('Contact after login')}</a></article>`).join('')}</div>` : `<div class="empty">${t('No approved buyers yet.')}</div>`
    }
    else if (type === 'schemes') body = `<div class="list">${demo.schemes.map(s => `<article class="card"><h3>${s.title}</h3><p class="muted">${s.text}</p><a class="button" target="_blank" rel="noopener" href="${s.url}">${t('Open official site')}</a></article>`).join('')}</div>`;
    else if (type === 'equipment') {
      // Real tool listings, managed by the admin only.
      let items = await api('/equipment/public');
      body = items.length ? `<div class="grid">${items.map(x => `<article class="card">${x.photos?.length ? `<img class="lot-photo" src="${x.photos[0]}" alt="${x.name}">` : ''}<h3>${x.name}</h3><p>${[x.type, x.location].filter(Boolean).join(' · ')}</p>${x.price ? `<div class="price">₹${x.price}<small>/day</small></div>` : ''}${x.availability ? `<span class="badge approved">${x.availability}</span>` : ''}<p><a class="button" href="#/register">${t('Request / contact')}</a></p></article>`).join('')}</div>` : `<div class="empty">${t('No equipment listed yet.')}</div>`
    }
    else if (type === 'marketplace') {
      let lots = await api('/lots'), canOffer = session && session.user.role === 'buyer';
      body = lots.length ? `<div class="grid">${lots.map(l => `<article class="card">${l.photos?.length ? `<img class="lot-photo" src="${l.photos[0]}" alt="${l.crop}">` : ''}<h3>${l.crop} · ${l.grade || 'Standard'}</h3><p>${l.quantity} quintals · ${l.region}</p><div class="price">₹${l.expectedPrice || '—'}</div>${canOffer ? `<button class="button offerBtn" data-id="${l._id}" data-crop="${l.crop}" data-qty="${l.quantity}" data-price="${l.expectedPrice || ''}">${t('Make offer')}</button>` : session ? `<p class="muted">${t('Only buyer accounts can make offers.')}</p>` : `<a class="button" href="#/register?role=buyer">${t('Log in as a buyer to offer')}</a>`}</article>`).join('')}</div>` : `<div class="empty">${t('No active crop lots yet. Be the first farmer to list a crop.')}</div>`
    } else body = `<p class="lead">${t('AgriLink makes agricultural trade more transparent—from field to payment.')}</p>`;
    app.innerHTML = layout(`<p class="eyebrow">${type.toUpperCase()}</p><h1>${heading}</h1>${body}`);
    document.querySelectorAll('.offerBtn').forEach(b => b.onclick = () => offerModal(b.dataset))
  } catch (e) {
    app.innerHTML = layout(`<h1>${heading}</h1><div class="empty">${t('Could not load live data. Please check the service connection.')}</div>`)
  }
}

function offerModal(d) {
  let m = document.createElement('div'); m.className = 'modal';
  m.innerHTML = `<div><h2>${t('Make an offer —')} ${d.crop}</h2><form id="offerForm"><div class="field"><label>${t('Price per quintal (₹)')}<input name="price" type="number" required value="${d.price || ''}"></label></div><div class="field"><label>${t('Quantity (quintals)')}<input name="quantity" type="number" required value="${d.qty || ''}"></label></div><button class="button">${t('Submit offer')}</button> <button type="button" class="ghost" id="cancel">${t('Cancel')}</button></form></div>`;
  document.body.append(m);
  $('#cancel').onclick = () => m.remove();
  $('#offerForm').onsubmit = async e => {
    e.preventDefault();
    let body = Object.fromEntries(new FormData(e.target)); body.lotId = d.id;
    try { await api('/offers', { method: 'POST', body: JSON.stringify(body) }); m.remove(); toast(t('Offer submitted — the farmer has been notified')) }
    catch (x) { toast(x.message) }
  }
}

// Equipment/tool rental is a service AgriLink itself provides — only the
// admin menu manages it (add/edit/remove listings). Farmers and FPOs browse
// available tools through the public "Equipment" nav link instead.
const menus = {
  farmer: ['Overview', 'Crop lots', 'Market intelligence', 'Buyer matches', 'Offers', 'Orders', 'Grievances', 'Notifications', 'Profile'],
  fpo: ['Overview', 'Members', 'Crop lots', 'Offers', 'Orders', 'Transactions', 'Profile'],
  buyer: ['Overview', 'Requirements', 'Browse lots', 'Offers', 'Orders', 'Grievances', 'Notifications', 'Profile'],
  admin: ['Overview', 'Farmers', 'FPOs', 'Buyers', 'Seller listings', 'Farmer listings', 'FPO listings', 'Market prices', 'Offers', 'Orders', 'Logistics', 'Payments', 'Grievances', 'Notifications', 'Schemes', 'Equipment', 'Recycle bin', 'Settings']
};

function dash() {
  if (!session) { location.hash = '#/login'; return }
  let role = session.user.role, items = menus[role], page = (location.hash.split('/')[2] || 'overview').replaceAll('%20', ' ');
  app.innerHTML = nav() + `<div class="layout"><aside class="side">${items.map(x => `<a class="${x.toLowerCase() === page ? 'active' : ''}${role === 'admin' && ['Farmer listings', 'FPO listings'].includes(x) ? ' subpage' : ''}" href="#/dashboard/${encodeURIComponent(x.toLowerCase())}">${t(x)}</a>`).join('')}<a href="#/logout">${t('Sign out')}</a></aside><main class="main"><div class="head"><div><p class="eyebrow">${role} ${t('workspace')}</p><h1>${tPage(page)}</h1></div>${(['crop lots', 'requirements', 'grievances'].includes(page) || (page === 'equipment' && role === 'admin')) ? `<button class="button" id="new">${t('Add new')}</button>` : ''}</div><div id="content">${t('Loading…')}</div></main></div>`;
  loadDash(role, page);
  $('#new')?.addEventListener('click', () => formModal(page))
}

async function loadDash(role, page) {
  let c = $('#content');
  try {
    if (page === 'overview') {
      let [lots, orders] = await Promise.all([api('/lots'), api('/orders')]);
      c.innerHTML = `<div class="grid"><article class="card"><p class="muted">${t('Active crop lots')}</p><div class="stat">${lots.length}</div></article><article class="card"><p class="muted">${t('Orders')}</p><div class="stat">${orders.length}</div></article><article class="card"><p class="muted">${t('Account')}</p><div class="stat">${t('Active')}</div></article></div><p class="notice">${t('Market-price data remains in fallback/demo mode until a provider is configured.')}</p>`;
      return
    }
    if (page === 'browse lots') {
      let lots = await api('/lots');
      c.innerHTML = lots.length ? `<div class="grid">${lots.map(l => `<article class="card">${l.photos?.length ? `<img class="lot-photo" src="${l.photos[0]}" alt="${l.crop}">` : ''}<h3>${l.crop} · ${l.grade || 'Standard'}</h3><p>${l.quantity} quintals · ${l.region}</p><div class="price">₹${l.expectedPrice || '—'}</div><button class="button offerBtn" data-id="${l._id}" data-crop="${l.crop}" data-qty="${l.quantity}" data-price="${l.expectedPrice || ''}">${t('Make offer')}</button></article>`).join('')}</div>` : `<div class="empty">${t('No active crop lots yet.')}</div>`;
      document.querySelectorAll('.offerBtn').forEach(b => b.onclick = () => offerModal(b.dataset));
      return
    }
    if (role === 'admin' && page === 'seller listings') {
      c.innerHTML = `<p class="lead">${t('Choose a seller group to review accounts and crop products.')}</p><div class="grid"><a class="card seller-choice" href="#/dashboard/farmer%20listings"><h2>${t('Farmer listings')}</h2><p>${t('Manage farmer crop products and seller details.')}</p></a><a class="card seller-choice" href="#/dashboard/fpo%20listings"><h2>${t('FPO listings')}</h2><p>${t('Manage FPO crop products and seller details.')}</p></a></div>`;
      return
    }
    if (role === 'admin' && ['farmer listings', 'fpo listings'].includes(page)) {
      await sellerListings(c, page === 'farmer listings' ? 'farmer' : 'fpo');
      return
    }
    let map = {
      farmers: '/admin/users?role=farmer', fpos: '/admin/users?role=fpo', buyers: '/admin/users?role=buyer',
      'crop lots': '/lots', offers: '/offers', orders: '/orders', equipment: '/equipment', schemes: '/schemes',
      grievances: '/grievances', notifications: '/notifications', requirements: '/requirements', payments: '/payments',
      logistics: '/orders', members: '/admin/users?role=farmer', 'recycle bin': '/admin/recycle'
    };
    if (['market intelligence', 'market prices', 'buyer matches', 'transactions', 'profile', 'settings'].includes(page)) {
      c.innerHTML = page === 'market intelligence' || page === 'market prices'
        ? `<p class="notice">${t('Demo/fallback market-price data — provider not configured.')}</p><div class="grid">${demo.prices.map(x => `<div class="card"><h3>${x.crop}</h3><div class="price">₹${x.price}</div><p>${x.region}</p></div>`).join('')}</div>`
        : `<div class="empty">${page === 'profile' || page === 'settings' ? t('Profile settings are available through the account API.') : t('No records yet.')}</div>`;
      return
    }
    table(c, await api(map[page] || '/lots'), page, role)
  } catch (e) { c.innerHTML = `<div class="empty">${e.message}</div>` }
}

function html(value) {
  return String(value ?? '—').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
}

async function sellerListings(el, sellerRole) {
  let [users, lots] = await Promise.all([api('/admin/users?role=' + sellerRole), api('/lots')]);
  let sellers = users.map(user => ({
    user,
    lots: lots.filter(lot => String(lot.ownerId) === String(user._id))
  }));
  if (!sellers.length) {
    el.innerHTML = `<div class="empty">${t('No sellers found.')}</div>`;
    return
  }
  el.innerHTML = `<div class="toolbar"><input id="sellerFind" placeholder="${t('Search')} ${tPage(sellerRole === 'farmer' ? 'Farmer listings' : 'FPO listings')}"></div><div class="seller-list">${sellers.map(({ user, lots }) => `<article class="seller-panel"><div class="seller-panel-head"><div><h2>${html(user.name)}</h2><span class="badge ${html(user.approvalStatus)}">${html(user.approvalStatus)}</span></div><strong>${lots.length} ${t('Products')}</strong></div><div class="seller-details"><div><b>${t('Email')}</b><span>${html(user.email)}</span></div><div><b>${t('Phone')}</b><span>${html(user.phone)}</span></div><div><b>${t('Region')}</b><span>${html(user.region)}</span></div><div><b>${t('Approval status')}</b><span>${html(user.approvalStatus)}</span></div></div><h3>${t('Products')}</h3>${lots.length ? `<div class="product-list">${lots.map(lot => `<div class="product-row">${lot.photos?.length ? `<img class="thumb" src="${lot.photos[0]}" alt="${html(lot.crop)}">` : ''}<div><strong>${html(lot.crop)}${lot.variety ? ` · ${html(lot.variety)}` : ''}</strong><span>${t('Quantity')}: ${html(lot.quantity)} quintals${lot.grade ? ` · ${html(lot.grade)}` : ''}</span></div><div><strong>${lot.expectedPrice ? `₹${html(lot.expectedPrice)}` : '—'}</strong><span>${html(lot.region)}${lot.status ? ` · ${html(lot.status)}` : ''}</span></div></div>`).join('')}</div>` : `<p class="muted">${t('No crop products listed yet.')}</p>`}</article>`).join('')}</div>`;
  $('#sellerFind').oninput = e => document.querySelectorAll('.seller-panel').forEach(panel => panel.hidden = !panel.innerText.toLowerCase().includes(e.target.value.toLowerCase()))
}

function table(el, rows, page, role) {
  if (!rows.length) { el.innerHTML = `<div class="empty">${t('No records found.')}</div>`; return }
  let keys = Object.keys(rows[0]).filter(k => !['_id', '__v', 'password', 'ownerId', 'deletedAt', 'updatedAt', 'photos'].includes(k)).slice(0, 6);
  let isUserMgmt = role === 'admin' && ['farmers', 'fpos', 'buyers'].includes(page);
  let isLotMgmt = role === 'admin' && page === 'crop lots';
  let isEquipmentMgmt = role === 'admin' && page === 'equipment';
  let showPhoto = (page === 'crop lots' || page === 'equipment') && rows[0].photos !== undefined;
  let isOrderMgmt = ['farmer', 'fpo', 'admin'].includes(role) && (page === 'orders' || page === 'logistics');
  // Any page with checkboxes (user management or equipment management) gets
  // the "select all" + bulk delete toolbar.
  let hasBulkPick = isUserMgmt || isEquipmentMgmt;
  let actionCell = x => isUserMgmt
    ? `<button class="ghost status" data-status="approved">${t('Approve')}</button> <button class="danger status" data-status="suspended">${t('Suspend')}</button>`
    : isLotMgmt || isEquipmentMgmt ? `<button class="danger remove">${t('Remove')}</button>`
    : isOrderMgmt ? `<select class="orderStatus">${C.orderStatuses.map(s => `<option ${s === x.status ? 'selected' : ''}>${s}</option>`).join('')}</select> <button class="ghost updateOrder">${t('Update')}</button>`
    : `<button class="ghost view">${t('View')}</button>`;
  el.innerHTML = `<div class="toolbar"><input id="find" placeholder="${t('Search')} ${tPage(page)}">${isUserMgmt ? `<button class="button" id="bulk">${t('Bulk approve selected')}</button>` : ''}${hasBulkPick ? `<button class="danger" id="bulkDelete">${t('Delete selected')}</button>` : ''}</div><table><thead><tr>${hasBulkPick ? '<th><input id="all" type="checkbox"></th>' : ''}${showPhoto ? '<th>Photo</th>' : ''}${keys.map(k => `<th>${k}</th>`).join('')}<th>Actions</th></tr></thead><tbody>${rows.map((x, i) => `<tr data-id="${x._id}" data-idx="${i}">${hasBulkPick ? '<td><input class="pick" type="checkbox"></td>' : ''}${showPhoto ? `<td>${x.photos?.length ? `<img class="thumb" src="${x.photos[0]}">` : '—'}</td>` : ''}${keys.map(k => `<td>${k.includes('status') ? `<span class="badge ${String(x[k]).replaceAll(' ', '')}">${x[k]}</span>` : x[k] ?? '—'}</td>`).join('')}<td>${actionCell(x)}</td></tr>`).join('')}</tbody></table>`;
  $('#all') && ($('#all').onchange = e => document.querySelectorAll('.pick').forEach(x => x.checked = e.target.checked));
  $('#find').oninput = e => document.querySelectorAll('tbody tr').forEach(tr => tr.hidden = !tr.innerText.toLowerCase().includes(e.target.value.toLowerCase()));
  document.querySelectorAll('.status').forEach(b => b.onclick = async () => { try { await api('/admin/users/' + b.closest('tr').dataset.id + '/status', { method: 'PATCH', body: JSON.stringify({ approvalStatus: b.dataset.status }) }); toast(t('Account updated')); dash() } catch (e) { toast(e.message) } });
  document.querySelectorAll('.view').forEach(b => b.onclick = () => { let r = rows[b.closest('tr').dataset.idx]; alert(JSON.stringify(r, null, 2)) });
  document.querySelectorAll('.remove').forEach(b => b.onclick = async () => {
    if (!confirm(isEquipmentMgmt ? t('Remove this equipment listing?') : t('Remove this listing? It will be hidden from the marketplace.'))) return;
    try { await api((isEquipmentMgmt ? '/equipment/' : '/lots/') + b.closest('tr').dataset.id, { method: 'DELETE' }); toast(t('Listing removed')); dash() } catch (e) { toast(e.message) }
  });
  document.querySelectorAll('.updateOrder').forEach(b => b.onclick = async () => { let tr = b.closest('tr'), status = tr.querySelector('.orderStatus').value; try { await api('/orders/' + tr.dataset.id, { method: 'PATCH', body: JSON.stringify({ status }) }); toast(t('Order updated — buyer notified')); dash() } catch (e) { toast(e.message) } });
  $('#bulk') && ($('#bulk').onclick = async () => { let ids = [...document.querySelectorAll('.pick:checked')].map(x => x.closest('tr').dataset.id); if (!ids.length) return toast(t('Select at least one record')); try { await api('/admin/users/bulk/status', { method: 'PATCH', body: JSON.stringify({ ids, approvalStatus: 'approved' }) }); toast(t('Accounts approved')); dash() } catch (e) { toast(e.message) } });
  // Select-all + delete: works for both the user-management pages
  // (Farmers/FPOs/Buyers) and the admin Equipment page.
  $('#bulkDelete') && ($('#bulkDelete').onclick = async () => {
    let ids = [...document.querySelectorAll('.pick:checked')].map(x => x.closest('tr').dataset.id);
    if (!ids.length) return toast(t('Select at least one record'));
    if (!confirm(t('Delete the selected records? This cannot be undone from here.'))) return;
    try {
      if (isUserMgmt) await api('/admin/users/bulk', { method: 'DELETE', body: JSON.stringify({ ids }) });
      else await Promise.all(ids.map(id => api('/equipment/' + id, { method: 'DELETE' })));
      toast(t('Selected records deleted')); dash()
    } catch (e) { toast(e.message) }
  })
}

function compressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const max = 900; let w = img.width, h = img.height;
        if (w > max || h > max) { if (w > h) { h = Math.round(h * max / w); w = max } else { w = Math.round(w * max / h); h = max } }
        const c = document.createElement('canvas'); c.width = w; c.height = h;
        c.getContext('2d').drawImage(img, 0, 0, w, h);
        resolve(c.toDataURL('image/jpeg', 0.72))
      };
      img.onerror = reject; img.src = reader.result
    };
    reader.onerror = reject; reader.readAsDataURL(file)
  })
}

function formModal(type) {
  let fields = type === 'crop lots' ? ['crop', 'variety', 'grade', 'quantity', 'expectedPrice', 'region', 'harvestDate', 'description']
    : type === 'equipment' ? ['name', 'type', 'price', 'location', 'availability']
    : type === 'requirements' ? ['crop', 'quantity', 'region', 'price']
    : ['subject', 'description'];
  let reqFields = { 'crop lots': ['crop', 'quantity'], equipment: ['name'], requirements: ['crop', 'quantity'], grievances: ['subject'] }[type] || [];
  let numFields = ['quantity', 'expectedPrice', 'price'], dateFields = ['harvestDate'];
  let withPhotos = type === 'crop lots' || type === 'equipment', photos = [];
  let m = document.createElement('div'); m.className = 'modal';
  m.innerHTML = `<div><h2>${t('Add')} ${tPage(type)}</h2><form id="form">${fields.map(f => `<div class="field"><label>${tf(f)}<input name="${f}" type="${numFields.includes(f) ? 'number' : dateFields.includes(f) ? 'date' : 'text'}" ${reqFields.includes(f) ? 'required' : ''}></label></div>`).join('')}${withPhotos ? `<div class="field"><label>Photos <small class="muted">(up to 4)</small></label><div id="photoPreview" class="photo-preview"></div><input id="photoInput" type="file" accept="image/*" multiple></div>` : ''}<button class="button">${t('Save')}</button> <button type="button" class="ghost" id="cancel">${t('Cancel')}</button></form></div>`;
  document.body.append(m);
  $('#cancel').onclick = () => m.remove();
  if (withPhotos) $('#photoInput').onchange = async e => {
    let files = [...e.target.files].slice(0, 4);
    toast(t('Processing photos…'));
    try { photos = await Promise.all(files.map(compressImage)); $('#photoPreview').innerHTML = photos.map(p => `<img src="${p}">`).join('') }
    catch { toast(t('Could not read one of the photos')) }
  };
  $('#form').onsubmit = async e => {
    e.preventDefault();
    let endpoint = type === 'crop lots' ? '/lots' : '/' + type.replaceAll(' ', '-');
    let body = Object.fromEntries(new FormData(e.target));
    if (withPhotos && photos.length) body.photos = photos;
    try { await api(endpoint, { method: 'POST', body: JSON.stringify(body) }); m.remove(); toast(t('Saved successfully')); dash() }
    catch (x) { toast(x.message) }
  }
}

function router() {
  let p = location.hash.slice(1) || '/';
  if (p === '/') home();
  else if (p === '/login') authPage();
  else if (p.startsWith('/register')) authPage();
  else if (p === '/logout') { session = null; localStorage.removeItem('agrilink.session'); location.hash = '#/'; toast(t('You are signed out')) }
  else if (p.startsWith('/dashboard')) dash();
  else publicPage(p.slice(1))
}
document.addEventListener('click', e => { if (e.target && e.target.id === 'langToggle') { lang = lang === 'ta' ? 'en' : 'ta'; localStorage.setItem('agrilink.lang', lang); router() } });
addEventListener('hashchange', router); router();

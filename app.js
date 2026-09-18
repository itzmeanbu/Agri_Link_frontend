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
  'Edit profile': 'சுயவிவரத்தைத் திருத்து', 'Save profile': 'சுயவிவரத்தைச் சேமி', 'Profile updated': 'சுயவிவரம் புதுப்பிக்கப்பட்டது',
  'Your account details': 'உங்கள் கணக்கு விவரங்கள்', 'Changes are saved to your account.': 'மாற்றங்கள் உங்கள் கணக்கில் சேமிக்கப்படும்.',
  'Refresh': 'புதுப்பி', 'Refreshing…': 'புதுப்பிக்கிறது…', 'Updated': 'புதுப்பிக்கப்பட்டது', 'Working…': 'செயல்படுகிறது…',
  'Offer updated': 'சலுகை புதுப்பிக்கப்பட்டது', 'Order updated — buyer notified': 'ஆர்டர் புதுப்பிக்கப்பட்டது — வாங்குபவருக்கு தெரிவிக்கப்பட்டது',
  'Delete account': 'கணக்கை நீக்கு', 'Account deleted': 'கணக்கு நீக்கப்பட்டது',
  'Product listings': 'பொருள் பட்டியல்கள்', 'Select all': 'அனைத்தையும் தேர்ந்தெடு', 'Delete selected sellers': 'தேர்ந்தெடுத்த விற்பனையாளர்களை நீக்கு',
  'Farmer accounts': 'விவசாயி கணக்குகள்', 'FPO accounts': 'எஃப்பிஓ கணக்குகள்', 'Buyer accounts': 'வாங்குபவர் கணக்குகள்',
  'Crop products': 'பயிர் பொருட்கள்', 'Tools': 'கருவிகள்', 'Other deleted records': 'பிற நீக்கப்பட்ட பதிவுகள்',
  'No deleted records in this section.': 'இந்தப் பகுதியில் நீக்கப்பட்ட பதிவுகள் இல்லை.',
  'Close': 'மூடு', 'Add images': 'படங்களைச் சேர்', 'Retrieve': 'மீட்டெடு', 'Retrieved': 'மீட்டெடுக்கப்பட்டது', 'Retrieve selected': 'தேர்ந்தெடுத்தவற்றை மீட்டெடு',
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
  'Product images': 'பொருள் படங்கள்', 'Tool images': 'கருவி படங்கள்',
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

// Fetches real market prices from the backend (which pulls Agmarknet / govt
// data). Falls back to the demo list above if the request fails for any
// reason, so the page never breaks.
let livePrices = null;
async function getPrices() {
  if (livePrices) return livePrices;
  try { const d = await api('/market-prices/public'); if (d && d.length) return livePrices = d } catch (e) {}
  return demo.prices;
}

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

const OFFER_STATUSES = ['Pending', 'Accepted', 'Rejected', 'Withdrawn'];
async function buttonTask(button, task, doneText = t('Updated')) {
  if (!button || button.disabled) return;
  let original = button.innerHTML;
  button.disabled = true;
  button.classList.add('is-busy');
  button.textContent = t('Working…');
  try {
    await task();
    button.classList.remove('is-busy');
    button.classList.add('is-success');
    button.textContent = doneText;
    setTimeout(() => { button.disabled = false; button.classList.remove('is-success'); button.innerHTML = original }, 900)
  } catch (e) {
    button.disabled = false;
    button.classList.remove('is-busy');
    button.innerHTML = original;
    toast(e.message)
  }
}

const brand = () => `<a class="brand" href="#/"><img class="logo" src="${C.logo}" alt="${C.name} logo"><span>${C.name}</span></a>`;

function nav() {
  return `<header class="nav">${brand()}<nav class="nav-links"><a href="#/market">${t('Market prices')}</a><a href="#/marketplace">${t('Marketplace')}</a><a href="#/buyers">${t('Buyers')}</a><a href="#/schemes">${t('Schemes')}</a></nav><div>${session ? `<a class="ghost" href="#/dashboard">${t('Dashboard')}</a>` : `<a class="ghost" href="#/login">${t('Log in')}</a> <a class="button" href="#/register">${t('Register')}</a>`} <button id="langToggle" class="ghost" type="button">${lang === 'ta' ? 'EN' : 'தமிழ்'}</button></div></header>`
}

const layout = x => nav() + `<main class="wrap">${x}</main><footer class="footer">${brand()}<span>Market intelligence for a stronger harvest.</span><span>© 2026 AgriLink</span></footer>`;

async function home() {
  const prices = await getPrices();
  const top = prices[0] || { crop: 'Paddy', price: 2340, region: 'Thanjavur', trend: '' };
  app.innerHTML = layout(`<section class="hero"><div><p class="eyebrow">AGRICULTURAL MARKETPLACE</p><h1>Sell smarter.<br>Find better markets.</h1><p class="lead">List crops, discover verified buyers, track delivery and receive payment with confidence.</p><div class="actions"><a class="button" href="#/register">${t('Sell Your Crop')}</a><a class="ghost" href="#/register?role=fpo">${t('Coordinate as an FPO')}</a><a class="ghost" href="#/register?role=buyer">${t('Find Crops to Buy')}</a></div></div><aside class="pulse"><b>${t('Regional market pulse')}</b><div class="price">₹${top.price} <small>/ ${t('per quintal')}</small></div><span class="up">${top.trend || ''} ${t('this week')}</span><p class="muted">${top.crop} · ${top.region}</p></aside></section><section class="section"><p class="eyebrow">MARKET INTELLIGENCE</p><h2>${t('Prices you can act on')}</h2><div class="grid">${prices.map(p => `<article class="card"><h3>${p.crop}</h3><div class="price">₹${p.price}</div><span class="up">${p.trend || ''}</span><p class="muted">${p.region} · ${t('per quintal')}</p></article>`).join('')}</div></section><section class="section grid"><article class="feature"><h3>${t('Crop lots')}</h3><p>${t('Create a listing and receive offers from verified buyers.')}</p><a href="#/marketplace">${t('Explore marketplace →')}</a></article><article class="feature"><h3>${t('Government schemes')}</h3><p>${t('Discover official programmes and support.')}</p><a href="#/schemes">${t('Browse schemes →')}</a></article></section>`)
}

function authPage(admin = false) {
  let role = new URLSearchParams(location.hash.split('?')[1] || '').get('role') || 'farmer',
    reg = location.hash.startsWith('#/register');
  app.innerHTML = `<section class="auth"><form class="authbox" id="auth"><a class="brand" href="#/"><img class="logo" src="${C.logo}" alt="${C.name} logo"><span>← ${t('Back to')} ${C.name}</span></a><h1>${admin ? t('Admin sign in') : reg ? t('Create an account') : t('Welcome back')}</h1>${admin ? `<p class="muted">${t('Sign in with your administrator account.')}</p>` : ''}${reg ? `<div class="roles">${['farmer', 'fpo', 'buyer'].map(r => `<button type="button" class="role ${role === r ? 'selected' : ''}" data-role="${r}"><b>${r.toUpperCase()}</b><br><small>${r === 'farmer' ? t('Sell harvests') : r === 'fpo' ? t('Coordinate members') : t('Source crops')}</small></button>`).join('')}</div><div class="field"><label>${t('Name')}<input name="name" required></label></div>` : ''}<div class="field"><label>${t('Email')}<input type="email" name="email" required></label></div><div class="field"><label>${t('Password')}<input type="password" name="password" minlength="6" required></label></div>${reg ? `<div class="field"><label>${t('Phone')}<input name="phone"></label></div><div class="field"><label>${t('Region')} <small class="muted">(${t('optional')})</small><input name="region"></label></div>` : ''}<button class="button" style="width:100%;margin-top:10px">${reg ? t('Submit for approval') : t('Log in')}</button>${!admin ? `<p class="muted">${reg ? `${t('Already registered?')} <a href="#/login">${t('Log in')}</a>` : `${t('New here?')} <a href="#/register">${t('Create an account')}</a>`}</p>` : ''}</form></section>`;
  // Keep the chosen category (farmer / FPO / buyer) in the address bar, otherwise
  // re-rendering the page read the old value back and the selection never changed.
  document.querySelectorAll('[data-role]').forEach(b => b.onclick = () => {
    role = b.dataset.role;
    let target = '#/register?role=' + role;
    if (location.hash === target) authPage(admin); else location.hash = target
  });
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
  if (type === 'equipment') {
    location.hash = session?.user?.role === 'admin' ? '#/dashboard/equipment' : session ? '#/dashboard' : '#/login';
    return
  }
  let heading = {
    market: t('Regional market prices'), marketplace: t('Crop marketplace'), buyers: t('Buyer directory'),
    schemes: t('Government schemes'), equipment: t('Equipment marketplace'), about: t('About AgriLink')
  }[type], body = '';
  try {
    if (type === 'market') { let prices = await getPrices(); body = `<div class="grid">${prices.map(p => `<article class="card"><h3>${p.crop}</h3><div class="price">₹${p.price}</div><p>${p.region} · ${p.trend || ''}</p></article>`).join('')}</div>` }
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
    let submit = e.submitter || e.target.querySelector('button[type="submit"]');
    await buttonTask(submit, async () => { await api('/offers', { method: 'POST', body: JSON.stringify(body) }); m.remove(); toast(t('Offer submitted — the farmer has been notified')) }, t('Updated'))
  }
}

// Equipment/tool rental is a service AgriLink itself provides — only the
// admin dashboard manages it (add/edit/remove listings).
const menus = {
  farmer: ['Overview', 'Crop lots', 'Market intelligence', 'Buyer matches', 'Offers', 'Orders', 'Grievances', 'Notifications', 'Profile'],
  fpo: ['Overview', 'Members', 'Crop lots', 'Offers', 'Orders', 'Transactions', 'Profile'],
  buyer: ['Overview', 'Requirements', 'Browse lots', 'Offers', 'Orders', 'Grievances', 'Notifications', 'Profile'],
  admin: ['Overview', 'Farmers', 'FPOs', 'Buyers', 'Seller listings', 'Farmer listings', 'FPO listings', 'Product listings', 'Market prices', 'Offers', 'Orders', 'Logistics', 'Payments', 'Grievances', 'Notifications', 'Schemes', 'Equipment', 'Recycle bin', 'Settings']
};

function dash() {
  if (!session) { location.hash = '#/login'; return }
  let role = session.user.role, items = menus[role], page = (location.hash.split('/')[2] || 'overview').replaceAll('%20', ' ');
  let addButton = ['crop lots', 'requirements', 'grievances'].includes(page) || (page === 'equipment' && role === 'admin');
  app.innerHTML = nav() + `<div class="layout"><aside class="side">${items.map(x => `<a class="${x.toLowerCase() === page ? 'active' : ''}${role === 'admin' && ['Farmer listings', 'FPO listings'].includes(x) ? ' subpage' : ''}" href="#/dashboard/${encodeURIComponent(x.toLowerCase())}">${t(x)}</a>`).join('')}<a href="#/logout">${t('Sign out')}</a></aside><main class="main"><div class="head"><div><p class="eyebrow">${role} ${t('workspace')}</p><h1>${tPage(page)}</h1></div><div class="head-actions">${addButton ? `<button class="button" id="new">${t('Add new')}</button>` : ''}<button class="ghost" id="refresh" type="button">${t('Refresh')}</button></div></div><div id="content">${t('Loading…')}</div></main></div>`;
  loadDash(role, page);
  $('#new')?.addEventListener('click', () => formModal(page))
  $('#refresh')?.addEventListener('click', e => buttonTask(e.currentTarget, () => loadDash(role, page), t('Updated')))
}

async function profileSettings(el) {
  let user = await api('/me');
  session.user = { ...session.user, ...user };
  localStorage.setItem('agrilink.session', JSON.stringify(session));
  el.innerHTML = `<form class="profile-form card" id="profileForm"><p class="eyebrow">${t('Edit profile')}</p><h2>${t('Your account details')}</h2><p class="muted">${t('Changes are saved to your account.')}</p><div class="profile-grid"><div class="field"><label>${t('Name')}<input name="name" required value="${formValue(user.name)}"></label></div><div class="field"><label>${t('Email')}<input type="email" name="email" required value="${formValue(user.email)}"></label></div><div class="field"><label>${t('Phone')}<input name="phone" value="${formValue(user.phone)}"></label></div><div class="field"><label>${t('Region')}<input name="region" value="${formValue(user.region)}"></label></div></div><p class="muted">Role: ${html(user.role)}</p><button class="button" type="submit">${t('Save profile')}</button></form>`;
  $('#profileForm').onsubmit = async e => {
    e.preventDefault();
    let submit = e.submitter || e.target.querySelector('button[type="submit"]');
    await buttonTask(submit, async () => {
      let updated = await api('/me', { method: 'PATCH', body: JSON.stringify(Object.fromEntries(new FormData(e.target))) });
      session.user = { ...session.user, ...updated };
      localStorage.setItem('agrilink.session', JSON.stringify(session));
      toast(t('Profile updated'))
    }, t('Updated'))
  }
}

async function loadDash(role, page) {
  let c = $('#content');
  try {
    if (page === 'overview') {
      let [lots, orders] = await Promise.all([api('/lots'), api('/orders')]);
      c.innerHTML = `<div class="grid"><article class="card"><p class="muted">${t('Active crop lots')}</p><div class="stat">${lots.length}</div></article><article class="card"><p class="muted">${t('Orders')}</p><div class="stat">${orders.length}</div></article><article class="card"><p class="muted">${t('Account')}</p><div class="stat">${t('Active')}</div></article></div><p class="notice">${t('Market-price data remains in fallback/demo mode until a provider is configured.')}</p>`;
      return
    }
    if (['profile', 'settings'].includes(page)) {
      await profileSettings(c);
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
    if (role === 'admin' && page === 'recycle bin') {
      await recycleBin(c);
      return
    }
    let map = {
      farmers: '/admin/users?role=farmer', fpos: '/admin/users?role=fpo', buyers: '/admin/users?role=buyer',
      'crop lots': '/lots/mine', 'product listings': '/lots/mine', offers: '/offers', orders: '/orders', equipment: '/equipment', schemes: '/schemes',
      grievances: '/grievances', notifications: '/notifications', requirements: '/requirements', payments: '/payments',
      logistics: '/orders', members: '/admin/users?role=farmer', 'recycle bin': '/admin/recycle'
    };
    if (['market intelligence', 'market prices', 'buyer matches', 'transactions', 'profile', 'settings'].includes(page)) {
      if (page === 'market intelligence' || page === 'market prices') {
        let prices = await getPrices();
        c.innerHTML = `<div class="grid">${prices.map(x => `<div class="card"><h3>${x.crop}</h3><div class="price">₹${x.price}</div><p>${x.region}</p></div>`).join('')}</div>`;
      } else {
        c.innerHTML = `<div class="empty">${page === 'profile' || page === 'settings' ? t('Profile settings are available through the account API.') : t('No records yet.')}</div>`;
      }
      return
    }
    table(c, await api(map[page] || '/lots'), page, role)
  } catch (e) { c.innerHTML = `<div class="empty">${e.message}</div>` }
}

function html(value) {
  return String(value ?? '—').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
}

function formValue(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
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
  el.innerHTML = `<div class="toolbar seller-toolbar"><label class="select-toggle"><input id="sellerAll" type="checkbox"> ${t('Select all')}</label><button class="danger" id="deleteSellers" type="button">${t('Delete selected sellers')}</button><input id="sellerFind" placeholder="${t('Search')} ${tPage(sellerRole === 'farmer' ? 'Farmer listings' : 'FPO listings')}"></div><div class="seller-list">${sellers.map(({ user, lots }) => `<article class="seller-panel" data-id="${html(user._id)}"><div class="seller-panel-head"><div class="seller-title"><input class="sellerPick" type="checkbox" aria-label="${t('Select all')} ${html(user.name)}"><div><h2>${html(user.name)}</h2><span class="badge ${html(user.approvalStatus)}">${html(user.approvalStatus)}</span></div></div><div class="seller-panel-actions"><strong>${lots.length} ${t('Products')}</strong><button class="danger sellerDelete" type="button">${t('Delete account')}</button></div></div><div class="seller-details"><div><b>${t('Email')}</b><span>${html(user.email)}</span></div><div><b>${t('Phone')}</b><span>${html(user.phone)}</span></div><div><b>${t('Region')}</b><span>${html(user.region)}</span></div><div><b>${t('Approval status')}</b><span>${html(user.approvalStatus)}</span></div></div><h3>${t('Products')}</h3>${lots.length ? `<div class="product-list">${lots.map(lot => `<div class="product-row">${lot.photos?.length ? `<img class="thumb" src="${lot.photos[0]}" alt="${html(lot.crop)}">` : ''}<div><strong>${html(lot.crop)}${lot.variety ? ` · ${html(lot.variety)}` : ''}</strong><span>${t('Quantity')}: ${html(lot.quantity)} quintals${lot.grade ? ` · ${html(lot.grade)}` : ''}</span></div><div><strong>${lot.expectedPrice ? `₹${html(lot.expectedPrice)}` : '—'}</strong><span>${html(lot.region)}${lot.status ? ` · ${html(lot.status)}` : ''}</span></div></div>`).join('')}</div>` : `<p class="muted">${t('No crop products listed yet.')}</p>`}</article>`).join('')}</div>`;
  $('#sellerFind').oninput = e => document.querySelectorAll('.seller-panel').forEach(panel => panel.hidden = !panel.innerText.toLowerCase().includes(e.target.value.toLowerCase()));
  $('#sellerAll').onchange = e => document.querySelectorAll('.sellerPick').forEach(input => input.checked = e.target.checked);
  document.querySelectorAll('.sellerDelete').forEach(button => button.onclick = () => {
    if (!confirm(t('Delete the selected records? This cannot be undone from here.'))) return;
    let id = button.closest('.seller-panel').dataset.id;
    buttonTask(button, async () => { await api('/admin/users/' + id, { method: 'DELETE' }); toast(t('Account deleted')); await sellerListings(el, sellerRole) }, t('Account deleted'))
  });
  $('#deleteSellers').onclick = () => {
    let ids = [...document.querySelectorAll('.sellerPick:checked')].map(input => input.closest('.seller-panel').dataset.id);
    if (!ids.length) return toast(t('Select at least one record'));
    if (!confirm(t('Delete the selected records? This cannot be undone from here.'))) return;
    buttonTask($('#deleteSellers'), async () => { await api('/admin/users/bulk', { method: 'DELETE', body: JSON.stringify({ ids }) }); toast(t('Selected records deleted')); await sellerListings(el, sellerRole) }, t('Updated'))
  }
}

async function recycleBin(el) {
  let rows = await api('/admin/recycle');
  // `purge` describes how a whole section is wiped for good on the server.
  let groups = [
    { key: 'farmer', label: 'Farmer accounts', test: x => x.type === 'User' && x.role === 'farmer', purge: '/admin/recycle/User?role=farmer' },
    { key: 'fpo', label: 'FPO accounts', test: x => x.type === 'User' && x.role === 'fpo', purge: '/admin/recycle/User?role=fpo' },
    { key: 'buyer', label: 'Buyer accounts', test: x => x.type === 'User' && x.role === 'buyer', purge: '/admin/recycle/User?role=buyer' },
    { key: 'lots', label: 'Crop products', test: x => x.type === 'Lot', purge: '/admin/recycle/Lot' },
    { key: 'tools', label: 'Tools', test: x => x.type === 'Equipment', purge: '/admin/recycle/Equipment' },
    { key: 'offers', label: 'Offers', test: x => x.type === 'Offer', purge: '/admin/recycle/Offer' },
    { key: 'orders', label: 'Orders', test: x => x.type === 'Order', purge: '/admin/recycle/Order' },
    { key: 'other', label: 'Other deleted records', test: x => !['User', 'Lot', 'Equipment', 'Offer', 'Order'].includes(x.type), purge: null }
  ];
  let refreshCounts = () => groups.forEach(group => { let tab = document.querySelector(`.recycle-tab[data-group="${group.key}"]`); if (tab) tab.querySelector('.tab-count').textContent = rows.filter(group.test).length });
  let eraseOne = row => api('/admin/recycle/' + encodeURIComponent(row.type) + '/' + encodeURIComponent(row._id), { method: 'DELETE' });
  let renderRows = group => {
    let groupRows = rows.filter(group.test), panel = $('#recycleRows');
    let sectionBar = `<div class="toolbar recycle-toolbar"><label class="select-toggle"><input id="recycleAll" type="checkbox"> ${t('Select all')}</label><button class="button" id="restoreSelected" type="button">${t('Retrieve selected')}</button><button class="danger" id="eraseSelected" type="button">${t('Erase selected forever')}</button><button class="danger" id="emptySection" type="button">${t('Empty this section forever')} (${groupRows.length})</button></div>`;
    let bindSection = () => {
      $('#emptySection').onclick = () => {
        if (!groupRows.length) return toast(t('This section is already empty.'));
        if (!confirm(t('Erase every record in this section forever? This cannot be undone.'))) return;
        buttonTask($('#emptySection'), async () => {
          if (group.purge) await api(group.purge, { method: 'DELETE' });
          else await Promise.all(groupRows.map(eraseOne));
          rows = rows.filter(item => !group.test(item));
          toast(t('Section emptied')); refreshCounts(); renderRows(group)
        }, t('Emptied'))
      }
    };
    if (!groupRows.length) { panel.innerHTML = sectionBar + `<div class="empty">${t('No deleted records in this section.')}</div>`; $('#recycleAll').onchange = () => {}; $('#restoreSelected').onclick = () => toast(t('Select at least one record')); $('#eraseSelected').onclick = () => toast(t('Select at least one record')); bindSection(); return }
    let keys = group.key === 'farmer' || group.key === 'fpo' || group.key === 'buyer'
      ? ['name', 'email', 'phone', 'region', 'approvalStatus', 'deletedAt']
      : group.key === 'lots'
        ? ['crop', 'variety', 'quantity', 'expectedPrice', 'region', 'status', 'deletedAt']
        : group.key === 'tools'
          ? ['name', 'type', 'price', 'location', 'availability', 'deletedAt']
          : ['type', 'status', 'lotId', 'buyerId', 'price', 'quantity', 'paymentStatus', 'deletedAt'];
    keys = keys.filter(key => groupRows.some(row => row[key] !== undefined));
    panel.innerHTML = sectionBar + `<div class="table-scroll"><table><thead><tr><th></th>${keys.map(key => `<th>${key}</th>`).join('')}<th>Action</th></tr></thead><tbody>${groupRows.map(row => `<tr data-id="${html(row._id)}" data-type="${html(row.type)}"><td><input class="recyclePick" type="checkbox"></td>${keys.map(key => `<td>${key.includes('status') ? `<span class="badge ${html(row[key])}">${html(row[key])}</span>` : html(row[key])}</td>`).join('')}<td><button class="ghost retrieveOne" type="button">${t('Retrieve')}</button> <button class="danger eraseOne" type="button">${t('Erase forever')}</button></td></tr>`).join('')}</tbody></table></div>`;
    $('#recycleAll').onchange = e => document.querySelectorAll('.recyclePick').forEach(input => input.checked = e.target.checked);
    document.querySelectorAll('.retrieveOne').forEach(button => button.onclick = () => {
      let row = button.closest('tr');
      buttonTask(button, async () => { await api('/admin/recycle/' + encodeURIComponent(row.dataset.type) + '/' + encodeURIComponent(row.dataset.id) + '/restore', { method: 'PATCH' }); rows = rows.filter(item => String(item._id) !== row.dataset.id); toast(t('Updated')); refreshCounts(); renderRows(group) }, t('Retrieved'))
    });
    document.querySelectorAll('.eraseOne').forEach(button => button.onclick = () => {
      let row = button.closest('tr');
      if (!confirm(t('Erase this record forever? This cannot be undone.'))) return;
      buttonTask(button, async () => { await eraseOne({ type: row.dataset.type, _id: row.dataset.id }); rows = rows.filter(item => String(item._id) !== row.dataset.id); toast(t('Erased forever')); refreshCounts(); renderRows(group) }, t('Erased'))
    });
    $('#restoreSelected').onclick = () => {
      let selected = [...document.querySelectorAll('.recyclePick:checked')].map(input => input.closest('tr'));
      if (!selected.length) return toast(t('Select at least one record'));
      buttonTask($('#restoreSelected'), async () => { await Promise.all(selected.map(row => api('/admin/recycle/' + encodeURIComponent(row.dataset.type) + '/' + encodeURIComponent(row.dataset.id) + '/restore', { method: 'PATCH' }))); let ids = new Set(selected.map(row => row.dataset.id)); rows = rows.filter(item => !ids.has(String(item._id))); toast(t('Updated')); refreshCounts(); renderRows(group) }, t('Updated'))
    };
    $('#eraseSelected').onclick = () => {
      let selected = [...document.querySelectorAll('.recyclePick:checked')].map(input => input.closest('tr'));
      if (!selected.length) return toast(t('Select at least one record'));
      if (!confirm(t('Erase the selected records forever? This cannot be undone.'))) return;
      buttonTask($('#eraseSelected'), async () => { await Promise.all(selected.map(row => eraseOne({ type: row.dataset.type, _id: row.dataset.id }))); let ids = new Set(selected.map(row => row.dataset.id)); rows = rows.filter(item => !ids.has(String(item._id))); toast(t('Erased forever')); refreshCounts(); renderRows(group) }, t('Erased'))
    };
    bindSection()
  };
  el.innerHTML = `<div class="recycle-head"><p class="muted">${t('Deleted records stay here until you erase them.')}</p><button class="danger" id="emptyBin" type="button">${t('Empty the whole bin forever')}</button></div><div class="recycle-tabs">${groups.map(group => `<button class="ghost recycle-tab" data-group="${group.key}" type="button">${t(group.label)} <span class="tab-count">${rows.filter(group.test).length}</span></button>`).join('')}</div><div id="recycleRows"></div>`;
  $('#emptyBin').onclick = () => {
    if (!rows.length) return toast(t('The recycle bin is already empty.'));
    if (!confirm(t('Erase every record in the recycle bin forever? This cannot be undone.'))) return;
    buttonTask($('#emptyBin'), async () => { await api('/admin/recycle', { method: 'DELETE' }); toast(t('Recycle bin emptied')); await recycleBin(el) }, t('Emptied'))
  };
  document.querySelectorAll('.recycle-tab').forEach(button => button.onclick = () => { document.querySelectorAll('.recycle-tab').forEach(tab => tab.classList.remove('active')); button.classList.add('active'); renderRows(groups.find(group => group.key === button.dataset.group)) });
  let first = document.querySelector('.recycle-tab'); first?.click()
}

function table(el, rows, page, role) {
  if (!rows.length) { el.innerHTML = `<div class="empty">${t('No records found.')}</div>`; return }
  let keys = Object.keys(rows[0]).filter(k => !['_id', '__v', 'password', 'ownerId', 'deletedAt', 'updatedAt', 'photos'].includes(k)).slice(0, 6);
  let isUserMgmt = role === 'admin' && ['farmers', 'fpos', 'buyers'].includes(page);
  let isLotMgmt = page === 'crop lots' && ['farmer', 'fpo', 'admin'].includes(role) || role === 'admin' && page === 'product listings';
  let isEquipmentMgmt = role === 'admin' && page === 'equipment';
  let showPhoto = (page === 'crop lots' || page === 'product listings' || page === 'equipment') && rows[0].photos !== undefined;
  let isOfferMgmt = page === 'offers';
  let isOrderMgmt = ['farmer', 'fpo', 'admin'].includes(role) && (page === 'orders' || page === 'logistics');
  // Offers and orders can be deleted by the admin too — same select-all,
  // delete-selected and per-row delete as the other admin pages.
  let adminOffers = role === 'admin' && isOfferMgmt;
  let adminOrders = role === 'admin' && (page === 'orders' || page === 'logistics');
  // Any page with checkboxes (user, listing, equipment, offer or order
  // management) gets the "select all" + bulk delete toolbar.
  let hasBulkPick = isUserMgmt || isLotMgmt || isEquipmentMgmt || adminOffers || adminOrders;
  let deleteButton = `<button class="danger removeRecord">${t('Delete')}</button>`;
  let actionCell = x => isUserMgmt
    ? `<button class="ghost status" data-status="approved">${t('Approve')}</button> <button class="danger status" data-status="suspended">${t('Suspend')}</button> <button class="danger removeUser">${t('Delete account')}</button>`
    : isLotMgmt || isEquipmentMgmt ? `<button class="danger remove">${t('Remove')}</button>`
    : isOfferMgmt ? `<select class="offerStatus">${OFFER_STATUSES.map(s => `<option ${s === x.status ? 'selected' : ''}>${s}</option>`).join('')}</select> <button class="ghost updateOffer">${t('Update')}</button>${adminOffers ? ' ' + deleteButton : ''}`
    : isOrderMgmt ? `<select class="orderStatus">${C.orderStatuses.map(s => `<option ${s === x.status ? 'selected' : ''}>${s}</option>`).join('')}</select> <button class="ghost updateOrder">${t('Update')}</button>${adminOrders ? ' ' + deleteButton : ''}`
    : `<button class="ghost view">${t('View')}</button>`;
  el.innerHTML = `<div class="toolbar"><input id="find" placeholder="${t('Search')} ${tPage(page)}">${isUserMgmt ? `<button class="button" id="bulk">${t('Bulk approve selected')}</button>` : ''}${hasBulkPick ? `<button class="danger" id="bulkDelete">${t('Delete selected')}</button>` : ''}</div><table><thead><tr>${hasBulkPick ? '<th><input id="all" type="checkbox"></th>' : ''}${showPhoto ? '<th>Photo</th>' : ''}${keys.map(k => `<th>${k}</th>`).join('')}<th>Actions</th></tr></thead><tbody>${rows.map((x, i) => `<tr data-id="${x._id}" data-idx="${i}">${hasBulkPick ? '<td><input class="pick" type="checkbox"></td>' : ''}${showPhoto ? `<td>${x.photos?.length ? `<img class="thumb" src="${x.photos[0]}">` : '—'}</td>` : ''}${keys.map(k => `<td>${k.includes('status') ? `<span class="badge ${String(x[k]).replaceAll(' ', '')}">${x[k]}</span>` : x[k] ?? '—'}</td>`).join('')}<td>${actionCell(x)}</td></tr>`).join('')}</tbody></table>`;
  $('#all') && ($('#all').onchange = e => document.querySelectorAll('.pick').forEach(x => x.checked = e.target.checked));
  $('#find').oninput = e => document.querySelectorAll('tbody tr').forEach(tr => tr.hidden = !tr.innerText.toLowerCase().includes(e.target.value.toLowerCase()));
  document.querySelectorAll('.status').forEach(b => b.onclick = () => buttonTask(b, async () => { await api('/admin/users/' + b.closest('tr').dataset.id + '/status', { method: 'PATCH', body: JSON.stringify({ approvalStatus: b.dataset.status }) }); toast(t('Account updated')); dash() }));
  document.querySelectorAll('.removeUser').forEach(b => b.onclick = () => {
    if (!confirm(t('Delete the selected records? This cannot be undone from here.'))) return;
    buttonTask(b, async () => { await api('/admin/users/' + b.closest('tr').dataset.id, { method: 'DELETE' }); toast(t('Account deleted')); dash() }, t('Account deleted'))
  });
  document.querySelectorAll('.view').forEach(b => b.onclick = () => { let r = rows[b.closest('tr').dataset.idx]; alert(JSON.stringify(r, null, 2)) });
  document.querySelectorAll('.remove').forEach(b => b.onclick = () => {
    if (!confirm(isEquipmentMgmt ? t('Remove this equipment listing?') : t('Remove this listing? It will be hidden from the marketplace.'))) return;
    buttonTask(b, async () => { await api((isEquipmentMgmt ? '/equipment/' : '/lots/') + b.closest('tr').dataset.id, { method: 'DELETE' }); toast(t('Listing removed')); dash() })
  });
  document.querySelectorAll('.updateOffer').forEach(b => b.onclick = () => { let tr = b.closest('tr'), status = tr.querySelector('.offerStatus').value; buttonTask(b, async () => { await api('/offers/' + tr.dataset.id, { method: 'PATCH', body: JSON.stringify({ status }) }); toast(t('Offer updated')); dash() }) });
  document.querySelectorAll('.updateOrder').forEach(b => b.onclick = () => { let tr = b.closest('tr'), status = tr.querySelector('.orderStatus').value; buttonTask(b, async () => { await api('/orders/' + tr.dataset.id, { method: 'PATCH', body: JSON.stringify({ status }) }); toast(t('Order updated — buyer notified')); dash() }) });
  // Admin delete for offers and orders — the record moves to the recycle bin.
  let recordPath = adminOffers ? '/offers/' : '/orders/';
  document.querySelectorAll('.removeRecord').forEach(b => b.onclick = () => {
    if (!confirm(t('Move this record to the recycle bin?'))) return;
    buttonTask(b, async () => { await api(recordPath + b.closest('tr').dataset.id, { method: 'DELETE' }); toast(t('Moved to recycle bin')); dash() }, t('Updated'))
  });
  $('#bulk') && ($('#bulk').onclick = () => { let ids = [...document.querySelectorAll('.pick:checked')].map(x => x.closest('tr').dataset.id); if (!ids.length) return toast(t('Select at least one record')); buttonTask($('#bulk'), async () => { await api('/admin/users/bulk/status', { method: 'PATCH', body: JSON.stringify({ ids, approvalStatus: 'approved' }) }); toast(t('Accounts approved')); dash() }) });
  // Select-all + delete: user-management pages (Farmers/FPOs/Buyers), listings,
  // equipment, and now the admin Offers and Orders pages.
  $('#bulkDelete') && ($('#bulkDelete').onclick = () => {
    let ids = [...document.querySelectorAll('.pick:checked')].map(x => x.closest('tr').dataset.id);
    if (!ids.length) return toast(t('Select at least one record'));
    if (!confirm(t('Delete the selected records? This cannot be undone from here.'))) return;
    buttonTask($('#bulkDelete'), async () => {
      if (isUserMgmt) await api('/admin/users/bulk', { method: 'DELETE', body: JSON.stringify({ ids }) });
      else {
        let path = isLotMgmt ? '/lots/' : isEquipmentMgmt ? '/equipment/' : adminOffers ? '/offers/' : '/orders/';
        await Promise.all(ids.map(id => api(path + id, { method: 'DELETE' })));
      }
      toast(t('Selected records deleted')); dash()
    }, t('Updated'))
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
  let imageLabel = type === 'equipment' ? t('Tool images') : t('Product images');
  let imageField = withPhotos ? `<div class="field image-field"><label>${imageLabel} <small class="muted">(up to 4)</small></label><div id="photoPreview" class="photo-preview"></div><input id="photoInput" type="file" accept="image/*" multiple></div>` : '';
  let m = document.createElement('div'); m.className = 'modal';
  m.innerHTML = `<div class="modal-card"><button type="button" class="modal-close" id="closeModal" aria-label="${t('Close')}">×</button><h2>${t('Add')} ${tPage(type)}</h2><form id="form">${imageField}${fields.map(f => `<div class="field"><label>${tf(f)}<input name="${f}" type="${numFields.includes(f) ? 'number' : dateFields.includes(f) ? 'date' : 'text'}" ${reqFields.includes(f) ? 'required' : ''}></label></div>`).join('')}<div class="modal-actions"><button type="submit" class="button">${t('Save')}</button> <button type="button" class="ghost" id="cancel">${t('Cancel')}</button></div></form></div>`;
  document.body.append(m);
  $('#cancel').onclick = () => m.remove();
  $('#closeModal').onclick = () => m.remove();
  m.onclick = e => { if (e.target === m) m.remove() };
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
    let submit = e.submitter || e.target.querySelector('button[type="submit"]');
    await buttonTask(submit, async () => { await api(endpoint, { method: 'POST', body: JSON.stringify(body) }); m.remove(); toast(t('Saved successfully')); dash() }, t('Updated'))
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

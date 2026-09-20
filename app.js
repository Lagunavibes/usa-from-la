const langBtn = document.getElementById('langBtn');
let lang = 'ro';
function applyLang(){
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-ro]').forEach((el)=>{
    const next = el.getAttribute('data-'+lang);
    if(next) el.textContent = next;
  });
  if (langBtn) langBtn.textContent = lang==='ro' ? 'EN' : 'RO';
}
if (langBtn) langBtn.addEventListener('click', ()=>{ lang = lang==='ro'?'en':'ro'; applyLang(); });
const number = (window.USA_FROM_LA && window.USA_FROM_LA.whatsapp) || '';
const hint = document.getElementById('waHint');
if(hint && number) hint.textContent = 'WhatsApp: +' + number;
const form = document.getElementById('reqForm');
if (form) form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target).entries());
  const link = d.link || d.rack || '-';
  const lines = lang==='en' ? [
    'USA from LA — size request',
    'Name: '+d.name,
    'City: '+d.city,
    'Brand: '+d.brand,
    'Item: '+d.item,
    'Size: '+d.size,
    'Color: '+(d.color||'-'),
    'Max: '+d.max+' lei',
    'Store link: '+link,
    'Notes: '+(d.notes||'-')
  ] : [
    'USA from LA — cerere marime',
    'Nume: '+d.name,
    'Oras: '+d.city,
    'Brand: '+d.brand,
    'Piesa: '+d.item,
    'Marime: '+d.size,
    'Culoare: '+(d.color||'-'),
    'Maxim: '+d.max+' lei',
    'Link magazin: '+link,
    'Detalii: '+(d.notes||'-')
  ];
  if(!number){
    alert(lang==='en' ? 'Add the WhatsApp number in config.js first.' : 'Pune numarul de WhatsApp in config.js inainte.');
    return;
  }
  window.location.href = 'https://wa.me/'+number+'?text='+encodeURIComponent(lines.join('\n'));
});

if (number) {
  document.querySelectorAll('a.btn-wa, a.wa-float').forEach((a) => {
    const href = a.getAttribute('href') || '';
    if (href === '#cerere' || a.classList.contains('wa-float')) {
      a.setAttribute('href', 'https://wa.me/' + number);
    }
  });
}

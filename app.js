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
  const lines = [
    'USA from LA — cerere marime',
    'Nume: '+d.name,'Oras: '+d.city,'Brand: '+d.brand,'Piesa: '+d.item,
    'Marime: '+d.size,'Culoare: '+(d.color||'-'),'Maxim: '+d.max+' lei','Detalii: '+(d.notes||'-')
  ];
  if(!number){
    alert('Pune numarul de WhatsApp in config.js inainte.');
    return;
  }
  window.location.href = 'https://wa.me/'+number+'?text='+encodeURIComponent(lines.join('\n'));
});

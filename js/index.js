/* =========================================================
   RADIO DX INTERACTIONS
   ========================================================= */

const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const toast = document.getElementById('toast');

function openModal(title){
  modalTitle.textContent = title;
  modalBody.innerHTML = title === 'Login'
    ? '<p>Login UI is ready. Connect this form to your authentication backend (Firebase, Supabase, or your own API) when you add real accounts.</p><input style="width:100%;padding:11px;border:1px solid #d5e2ea;border-radius:6px;margin-bottom:8px" placeholder="Email"><input type="password" style="width:100%;padding:11px;border:1px solid #d5e2ea;border-radius:6px" placeholder="Password">'
    : '<p>Welcome to RadioDx Academy. This demo page contains the complete front-end structure shown in the reference design.</p>';
  modal.classList.add('open');
}
function courseModal(course){
  modalTitle.textContent = course;
  modalBody.innerHTML = '<p><b>'+course+'</b> is ready for course details, modules, instructor information, pricing, enrolment and payment integration.</p><p>To make this a production website, connect the button to your course database and payment provider.</p>';
  modal.classList.add('open');
}
function closeModal(){modal.classList.remove('open')}
modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

function revealAnswer(){
  document.getElementById('answer').classList.toggle('show');
}

let toastTimer;
function showToast(message){
  toast.textContent=message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>toast.classList.remove('show'),2600);
}

/* mobile navigation */
const mobileToggle=document.getElementById('mobileToggle');
const mobilePanel=document.getElementById('mobilePanel');
mobileToggle.addEventListener('click',()=>mobilePanel.classList.toggle('open'));
mobilePanel.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobilePanel.classList.remove('open')));

/* search */
const searchInput=document.getElementById('searchInput');
const clearSearch=document.getElementById('clearSearch');
const cards=[...document.querySelectorAll('.mod-card')];
searchInput.addEventListener('input',()=>{
  const q=searchInput.value.trim().toLowerCase();
  if(!q){cards.forEach(c=>c.style.display='');return}
  cards.forEach(c=>{
    const text=(c.dataset.search||'')+' '+c.innerText;
    c.style.display=text.toLowerCase().includes(q)?'':'none';
  });
  document.getElementById('learn').scrollIntoView({behavior:'smooth',block:'start'});
});
clearSearch.addEventListener('click',()=>{
  searchInput.value='';cards.forEach(c=>c.style.display='');searchInput.focus();
});

/* active navigation on scroll */
const sections=['home','learn','courses','cases','practice','resources','about'];
const navItems=[...document.querySelectorAll('.nav-item')];
window.addEventListener('scroll',()=>{
  const y=window.scrollY+120;
  let current='home';
  sections.forEach(id=>{
    const el=document.getElementById(id);
    if(el && y>=el.offsetTop) current=id;
  });
  navItems.forEach(n=>n.classList.toggle('active',n.getAttribute('href')==='#'+current));
},{passive:true});

/* image fallback: keeps layout intact if a remote demo image is unavailable */
document.querySelectorAll('img').forEach(img=>{
  img.addEventListener('error',()=>{
    img.style.display='none';
    if(img.parentElement) img.parentElement.style.background='linear-gradient(135deg,#08273c,#0c5d7b)';
  });
});

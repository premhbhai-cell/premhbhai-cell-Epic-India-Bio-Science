
const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav-links');
if(menuButton&&nav){menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.textContent=open?'×':'☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.textContent='☰'}))}
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
const form=document.querySelector('#contactForm');
if(form){form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const subject=encodeURIComponent('Website enquiry - '+(d.get('name')||''));const body=encodeURIComponent('Name: '+d.get('name')+'\\nPhone: '+d.get('phone')+'\\nEmail: '+d.get('email')+'\\nInterested in: '+d.get('interest')+'\\nMessage: '+d.get('message'));window.location.href='mailto:xxxxx?subject='+subject+'&body='+body})}

/* SECTION: Image lightbox with Previous / Next (any <a data-lightbox="group" href="image">) */
(function(){
  const links=[...document.querySelectorAll('a[data-lightbox]')];if(!links.length)return;
  const lb=document.createElement('div');lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');
  lb.innerHTML='<button class="lb-close" aria-label="Close">×</button><button class="lb-prev" aria-label="Previous">‹</button><figure class="lb-fig"><img alt=""><figcaption><div class="lb-cap"></div><div class="lb-count"></div></figcaption></figure><button class="lb-next" aria-label="Next">›</button>';
  document.body.appendChild(lb);
  const img=lb.querySelector('img'),cap=lb.querySelector('.lb-cap'),cnt=lb.querySelector('.lb-count');
  let group=[],i=0;
  function show(n){i=(n+group.length)%group.length;const a=group[i];img.src=a.getAttribute('href');img.alt=a.dataset.caption||'';cap.textContent=a.dataset.caption||'';cnt.textContent=(i+1)+' / '+group.length}
  function open(a){group=links.filter(l=>l.dataset.lightbox===a.dataset.lightbox);show(group.indexOf(a));lb.classList.add('open');document.body.style.overflow='hidden'}
  function close(){lb.classList.remove('open');document.body.style.overflow='';img.src=''}
  links.forEach(a=>a.addEventListener('click',e=>{e.preventDefault();open(a)}));
  lb.querySelector('.lb-prev').addEventListener('click',e=>{e.stopPropagation();show(i-1)});
  lb.querySelector('.lb-next').addEventListener('click',e=>{e.stopPropagation();show(i+1)});
  lb.querySelector('.lb-close').addEventListener('click',close);
  lb.addEventListener('click',e=>{if(e.target===lb)close()});
  document.addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')close();else if(e.key==='ArrowLeft')show(i-1);else if(e.key==='ArrowRight')show(i+1)});
  let x0=null;lb.addEventListener('touchstart',e=>{x0=e.touches[0].clientX},{passive:true});
  lb.addEventListener('touchend',e=>{if(x0===null)return;const d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>50)show(d<0?i+1:i-1);x0=null});
})();

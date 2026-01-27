// Portfolio interactions: typing, button ripple, modal, tilt, scroll-follow and scrollspy
(function(){
  // Typed text (simple)
  const phrases = [
    'Desarrollo web moderno.',
    'Interfaces responsivas.',
    'Microinteracciones y rendimiento.'
  ];
  const typedEl = document.getElementById('typed');
  let tIndex = 0, cIndex = 0, forward = true;
  function tick(){
    const text = phrases[tIndex];
    typedEl.textContent = text.slice(0, cIndex);
    if(forward){
      cIndex++;
      if(cIndex>text.length){ forward=false; setTimeout(tick, 900); return; }
    } else {
      cIndex--;
      if(cIndex<0){ forward=true; tIndex=(tIndex+1)%phrases.length; }
    }
    setTimeout(tick, forward?80:24);
  }
  if(typedEl) tick();

  // Smooth scrolling for buttons and nav
  document.querySelectorAll('[data-target]').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const sel = btn.getAttribute('data-target');
      const el = document.querySelector(sel);
      if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });

  // Ripple effect for .btn
  document.addEventListener('click', function(e){
    const btn = e.target.closest('.btn');
    if(!btn) return;
    const rect = btn.getBoundingClientRect();
    const circle = document.createElement('span');
    circle.className = 'ripple';
    const size = Math.max(rect.width, rect.height);
    circle.style.width = circle.style.height = size + 'px';
    circle.style.left = (e.clientX - rect.left - size/2) + 'px';
    circle.style.top = (e.clientY - rect.top - size/2) + 'px';
    btn.appendChild(circle);
    setTimeout(()=> circle.remove(), 700);
  });

  // Modal for projects
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalThumb = document.getElementById('modalThumb');
  const modalHref = document.getElementById('modalHref');
  const modalClose = modal && modal.querySelector('.modal-close');

  const projects = {
    1:{title:'Interfaz dinámica',desc:'Proyecto con animaciones CSS y JS para mejorar la experiencia.',link:'#'},
    2:{title:'Landing optimizada',desc:'Landing con enfoque en rendimiento y conversiones.',link:'#'},
    3:{title:'App de ejemplo',desc:'SPA con estado y animaciones por estado.',link:'#'}
  };

  // Documents (certificados / diplomas)
  const docs = {
    cert1:{title:'Certificado de Curso A', desc:'Certificado obtenido en Curso A. Institución - Año.', link:'Mi_CV/certificado-curso-a.pdf'},
    cert2:{title:'Certificado de Curso B', desc:'Certificado obtenido en Curso B. Institución - Año.', link:'Mi_CV/certificado-curso-b.pdf'},
    dip1:{title:'Diploma en Ingeniería', desc:'Diploma oficial en Ingeniería en Sistemas Computacionales. Institución - Año.', link:'Mi_CV/diploma-ingenieria.pdf'},
    dip2:{title:'Diploma Especialización X', desc:'Diploma de especialización X. Institución - Año.', link:'Mi_CV/diploma-especializacion-x.pdf'}
  };

  document.querySelectorAll('.proj-link').forEach(a=>{
    a.addEventListener('click', function(e){
      e.preventDefault();
      const id = this.getAttribute('data-project');
      const p = projects[id];
      if(!p) return;
      modalTitle.textContent = p.title;
      modalDesc.textContent = p.desc;
      modalThumb.textContent = p.title;
      modalHref.href = p.link;
      modal.setAttribute('aria-hidden','false');
      modalClose && modalClose.focus();
    });
  });
  modalClose && modalClose.addEventListener('click', ()=> modal.setAttribute('aria-hidden','true'));
  modal && modal.addEventListener('click', e=>{ if(e.target===modal) modal.setAttribute('aria-hidden','true'); });
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') modal && modal.setAttribute('aria-hidden','true'); });

  // Tilt for project cards
  document.querySelectorAll('.project-card').forEach(card=>{
    card.addEventListener('mousemove', e=>{
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) - rect.width/2;
      const y = (e.clientY - rect.top) - rect.height/2;
      const rx = (-y / rect.height) * 6;
      const ry = (x / rect.width) * 6;
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave', ()=> card.style.transform = 'none');
  });

  // Document links open same modal (set modal link to actual PDF)
  document.querySelectorAll('.doc-link').forEach(a=>{
    a.addEventListener('click', function(e){
      e.preventDefault();
      const id = this.getAttribute('data-doc');
      const d = docs[id];
      if(!d) return;
      modalTitle.textContent = d.title;
      modalDesc.textContent = d.desc;
      modalThumb.textContent = d.title;
      modalHref.href = d.link || '#';
      // ensure downloads open in new tab when clicked
      modalHref.setAttribute('target','_blank');
      modal.setAttribute('aria-hidden','false');
      modalClose && modalClose.focus();
    });
  });

  // Scrollspy: highlight nav links
  const sections = document.querySelectorAll('main section');
  const navLinks = document.querySelectorAll('.nav-link');
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        navLinks.forEach(a=> a.classList.toggle('active', a.getAttribute('href') === '#'+e.target.id));
      }
    });
  },{threshold:0.5});
  sections.forEach(s=> obs.observe(s));

  // Floating card follows scroll (adjust top position) on larger screens
  const floating = document.getElementById('floatingCard');
  if(floating){
    let lastScroll = window.pageYOffset;
    window.addEventListener('scroll', ()=>{
      const y = Math.min(Math.max(window.pageYOffset + 100, 100), document.body.scrollHeight - 300);
      floating.style.top = (y) + 'px';
    }, {passive:true});
  }

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  navToggle && navToggle.addEventListener('click', ()=>{
    if(nav.style.display === 'flex') nav.style.display = 'none'; else nav.style.display = 'flex';
  });

  // Optional: animate CV download button on click (small pulse)
  document.querySelectorAll('.cv-download, .cv-inline').forEach(el=>{
    el.addEventListener('click', ()=>{
      el.animate([{transform:'scale(1)'},{transform:'scale(0.98)'},{transform:'scale(1)'}],{duration:220});
    });
  });

})();

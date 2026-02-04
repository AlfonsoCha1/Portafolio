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
    1:{ title:'Interfaz Dinámica', desc:'Proyecto con animaciones CSS y JS para mejorar la experiencia del usuario. Incluye microinteracciones fluidas y transiciones suaves.', color:'142, 249, 252', link:'#' },
    2:{ title:'Landing Optimizada', desc:'Landing page con enfoque en performance y tasas de conversión. Optimizada para móvil con CTA claros.', color:'110, 231, 183', link:'#' },
    3:{ title:'App de Ejemplo', desc:'Single Page Application (SPA) con gestión de estado compartido y animaciones suaves.', color:'252, 208, 142', link:'#' },
    4:{ title:'E-commerce Store', desc:'Plataforma de tienda online con carrito de compras, sistema de pago integrado y gestión de inventario.', color:'252, 142, 142', link:'#' },
    5:{ title:'Dashboard Analytics', desc:'Panel de análisis en tiempo real con gráficos interactivos, mapas de calor y reportes personalizados.', color:'252, 142, 239', link:'#' },
    6:{ title:'Chat Application', desc:'Aplicación de mensajería instantánea con soporte para grupos, notificaciones y sincronización en vivo.', color:'204, 142, 252', link:'#' },
    7:{ title:'Portfolio Personal', desc:'Sitio web personal con galería de proyectos, blog integrado y formulario de contacto optimizado.', color:'142, 202, 252', link:'#' },
    8:{ title:'Task Manager', desc:'Gestor de tareas colaborativo con asignación de roles, cronograma Gantt y seguimiento de progreso.', color:'173, 255, 47', link:'#' },
    9:{ title:'Video Streaming', desc:'Plataforma de streaming de video con reproductor personalizado, recomendaciones IA y comentarios en vivo.', color:'255, 165, 0', link:'#' },
    10:{ title:'Social Network', desc:'Red social completa con perfiles, muro de actividades, notificaciones y sistema de mensajes privados.', color:'64, 224, 208', link:'#' }
  };

  // Carousel project cards click handler
  document.querySelectorAll('.carousel-project').forEach(card=>{
    card.addEventListener('click', function(){
      const projectId = this.getAttribute('data-project');
      const p = projects[projectId];
      if(!p) return;
      modalTitle.textContent = p.title;
      modalDesc.textContent = p.desc;
      modalThumb.style.background = `linear-gradient(135deg, rgba(${p.color}, 0.3) 0%, rgba(${p.color}, 0.7) 80%, rgba(${p.color}, 0.9) 100%)`;
      modalThumb.textContent = p.title;
      modalHref.href = p.link;
      modal.setAttribute('aria-hidden','false');
      modalClose && modalClose.focus();
    });
  });

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

  // Document links open in the document modal (embedded preview)
  document.querySelectorAll('.doc-link').forEach(a=>{
    // replace link text with 'Ver' for clarity
    a.textContent = 'Ver';
    a.addEventListener('click', function(e){
      e.preventDefault();
      const url = this.getAttribute('href');
      const title = this.closest('.doc-card')?.querySelector('h4')?.textContent || 'Documento';
      const docModal = document.getElementById('docModal');
      const docIframe = document.getElementById('docIframe');
      const docTitle = document.getElementById('docModalTitle');
      const docClose = docModal && docModal.querySelector('.modal-close');
      if(!docModal || !docIframe){
        window.open(url, '_blank');
        return;
      }
      docTitle.textContent = title;
      docIframe.src = url;
      docModal.setAttribute('aria-hidden','false');
      docClose && docClose.focus();
    });
  });

  // Close behavior for doc modal: close button, click outside, ESC
  const docModal = document.getElementById('docModal');
  const docCloseBtn = docModal && docModal.querySelector('.modal-close');
  docCloseBtn && docCloseBtn.addEventListener('click', ()=>{
    docModal.setAttribute('aria-hidden','true');
    const iframe = document.getElementById('docIframe'); if(iframe) iframe.src = '';
  });
  docModal && docModal.addEventListener('click', e=>{ if(e.target === docModal){ docModal.setAttribute('aria-hidden','true'); const iframe = document.getElementById('docIframe'); if(iframe) iframe.src = ''; } });

  // Escape should close both modals
  document.addEventListener('keydown', e=>{ if(e.key === 'Escape'){ modal && modal.setAttribute('aria-hidden','true'); docModal && docModal.setAttribute('aria-hidden','true'); const iframe = document.getElementById('docIframe'); if(iframe) iframe.src = ''; } });

  // Controles globales para maximizar/minimizar ambos listados (certificados y diplomas)
  const expandAllBtn = document.getElementById('docs-expand-all');
  const collapseAllBtn = document.getElementById('docs-collapse-all');
  const allGrids = document.querySelectorAll('.docs-column .docs-grid');

  // Expandir todas: quitar la clase 'collapsed' de cada grid
  expandAllBtn && expandAllBtn.addEventListener('click', ()=>{
    allGrids.forEach(g=> g.classList.remove('collapsed'));
  });

  // Colapsar todas: añadir la clase 'collapsed' para mostrar solo 3 tarjetas
  collapseAllBtn && collapseAllBtn.addEventListener('click', ()=>{
    allGrids.forEach(g=> g.classList.add('collapsed'));
    // opcional: desplazar suavemente hacia la sección de documentos
    const docsSection = document.querySelector('#Diplomas\\ and\\ Certificates');
    if(docsSection) docsSection.scrollIntoView({behavior:'smooth',block:'start'});
  });

  // Compatibilidad: si existen botones individuales con la clase '.docs-toggle', los manejamos también
  document.querySelectorAll('.docs-toggle').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const target = btn.dataset.target;
      let grid = target ? document.querySelector(`.docs-column[data-which="${target}"] .docs-grid`) : (btn.closest('.docs-column') && btn.closest('.docs-column').querySelector('.docs-grid'));
      if(!grid) return;
      const isCollapsed = grid.classList.toggle('collapsed');
      btn.textContent = isCollapsed ? 'Maximizar' : 'Minimizar';
      btn.setAttribute('aria-pressed', (!isCollapsed).toString());
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

  // Sidebar Menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const navToggle = document.getElementById('navToggle');
  const sidebarMenu = document.getElementById('sidebarMenu');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const sidebarClose = document.getElementById('sidebarClose');
  const sidebarLinks = document.querySelectorAll('.sidebar-link');

  // Function to toggle sidebar
  function toggleSidebar() {
    const isHidden = sidebarMenu.getAttribute('aria-hidden') === 'true';
    sidebarMenu.setAttribute('aria-hidden', !isHidden);
    sidebarOverlay.classList.toggle('active');
  }

  // Toggle on menu button or nav toggle click
  menuToggle && menuToggle.addEventListener('click', toggleSidebar);
  navToggle && navToggle.addEventListener('click', toggleSidebar);

  // Close sidebar when close button clicked
  sidebarClose && sidebarClose.addEventListener('click', ()=>{
    sidebarMenu.setAttribute('aria-hidden', 'true');
    sidebarOverlay.classList.remove('active');
  });

  // Close sidebar when a link is clicked
  sidebarLinks.forEach(link=>{
    link.addEventListener('click', ()=>{
      sidebarMenu.setAttribute('aria-hidden', 'true');
      sidebarOverlay.classList.remove('active');
    });
  });

  // Close sidebar when overlay is clicked
  sidebarOverlay && sidebarOverlay.addEventListener('click', ()=>{
    sidebarMenu.setAttribute('aria-hidden', 'true');
    sidebarOverlay.classList.remove('active');
  });

  // Close sidebar on ESC key
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && sidebarMenu.getAttribute('aria-hidden') === 'false'){
      sidebarMenu.setAttribute('aria-hidden', 'true');
      sidebarOverlay.classList.remove('active');
    }
  });

  // Mobile nav toggle - for old nav display
  const oldNavToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  oldNavToggle && oldNavToggle.addEventListener('click', ()=>{
    if(nav.style.display === 'flex') nav.style.display = 'none'; else nav.style.display = 'flex';
  });

  // Optional: animate CV download button on click (small pulse)
  document.querySelectorAll('.cv-download, .cv-inline').forEach(el=>{
    el.addEventListener('click', ()=>{
      el.animate([{transform:'scale(1)'},{transform:'scale(0.98)'},{transform:'scale(1)'}],{duration:220});
    });
  });

  // Background switch (purple home/about, red from stack to contact)
  const bgSections = [
    { id: 'HOME', red: false, redAnim: false },
    { id: 'ABOUT Me', red: false, redAnim: false },
    { id: 'Stack', red: true, redAnim: true },
    { id: 'tools', red: true, redAnim: true },
    { id: 'Diplomas and Certificates', red: true, redAnim: true },
    { id: 'PROJECTS', red: true, redAnim: false },
    { id: 'CONTACT', red: true, redAnim: false }
  ];

  let lastBgId = null;
  let lastRedAnim = null;

  const bgIO = new IntersectionObserver((entries)=>{
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if(!visible || visible.intersectionRatio < 0.35) return;

    const config = bgSections.find(s => s.id === visible.target.id);
    if(!config) return;
    if(lastBgId === config.id && lastRedAnim === config.redAnim) return;

    lastBgId = config.id;
    lastRedAnim = config.redAnim;

    requestAnimationFrame(()=>{
      if(config.red) document.body.classList.add('is-red');
      else document.body.classList.remove('is-red');
      if(config.redAnim) document.body.classList.add('is-red-anim');
      else document.body.classList.remove('is-red-anim');
    });
  }, { threshold: [0.35, 0.55, 0.75], rootMargin: '0px 0px -20% 0px' });

  bgSections.forEach(s => {
    const el = document.getElementById(s.id);
    if(el) bgIO.observe(el);
  });

})();

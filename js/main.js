 // Before/After slider
  const wrap = document.getElementById('baWrap');
  const afterWrap = document.getElementById('baAfterWrap');
  const handle = document.getElementById('baHandle');
  let dragging = false;

  function setPos(pct){
    pct = Math.max(0, Math.min(100, pct));
    afterWrap.style.width = pct + '%';
    handle.style.left = pct + '%';
  }

  function posFromEvent(e){
    const rect = wrap.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(pct);
  }

  wrap.addEventListener('mousedown', (e)=>{ dragging = true; posFromEvent(e); });
  window.addEventListener('mouseup', ()=> dragging = false);
  window.addEventListener('mousemove', (e)=>{ if(dragging) posFromEvent(e); });

  wrap.addEventListener('touchstart', (e)=>{ dragging = true; posFromEvent(e); });
  window.addEventListener('touchend', ()=> dragging = false);
  window.addEventListener('touchmove', (e)=>{ if(dragging) posFromEvent(e); });

  wrap.addEventListener('click', posFromEvent);

  // Work tabs
  const tabs = document.querySelectorAll('.work-tab');
  const beforeImg = document.getElementById('baBefore');
  const afterImg = document.getElementById('baAfter');
  const caption = document.getElementById('baCaption');

  tabs.forEach(tab=>{
    tab.addEventListener('click', ()=>{
      tabs.forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      beforeImg.src = tab.dataset.before;
      afterImg.src = tab.dataset.after;
      caption.textContent = tab.dataset.caption;
      setPos(50);
    });
  });

  // Simple form handler
  document.getElementById('quoteForm').addEventListener('submit', function(e){
    e.preventDefault();
    alert('Thanks! Your quote request has been received. We will be in touch within one business day.');
    this.reset();
  });
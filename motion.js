(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const doc = document.documentElement;
  doc.classList.add('motion-ready');

  const reveal = (selector) => {
    document.querySelectorAll(selector).forEach((node, index) => {
      if (node.dataset.reveal) return;
      node.dataset.reveal = 'default';
      if (index % 3) node.dataset.delay = String(index % 3);
    });
  };

  reveal('.hero-main > h1,.hero-main > .lede,.hero-cta-row');
  reveal('.work-section-heading,.research-explorer,.build-list,.delivery-simple-grid,.recognition-inner,.background-grid,.pricing-grid,.contact-grid');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    document.querySelectorAll('[data-reveal]').forEach(node => node.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, {threshold:.12, rootMargin:'0px 0px -6% 0px'});
    document.querySelectorAll('[data-reveal]').forEach(node => observer.observe(node));
  }

  if (!reduceMotion) {
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    progress.setAttribute('aria-hidden','true');
    progress.innerHTML = '<span></span>';
    document.body.prepend(progress);
    const bar = progress.firstElementChild;
    let ticking = false;
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.transform = `scaleX(${ratio})`;
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateProgress);
    }, {passive:true});
    updateProgress();
  }

  const navLinks = [...document.querySelectorAll('.topbar nav a[href^="#"]')];
  if (navLinks.length && 'IntersectionObserver' in window) {
    const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
    const sectionObserver = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === `#${visible.target.id}`));
    }, {rootMargin:'-30% 0px -55% 0px',threshold:[0,.1,.3,.6]});
    sections.forEach(section => sectionObserver.observe(section));
  }
})();

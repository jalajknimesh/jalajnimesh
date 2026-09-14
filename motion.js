(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const doc = document.documentElement;
  doc.classList.add('motion-ready');

  const wrapPhrase = (element, phrase) => {
    if (!element || element.querySelector('.motion-highlight')) return;
    const html = element.innerHTML;
    const index = html.toLowerCase().indexOf(phrase.toLowerCase());
    if (index === -1) return;
    element.innerHTML = `${html.slice(0,index)}<span class="motion-highlight">${html.slice(index,index+phrase.length)}</span>${html.slice(index+phrase.length)}`;
  };

  const heroTitle = document.querySelector('.hero h1');
  wrapPhrase(heroTitle, 'penetration testing.');

  const directTitle = document.querySelector('.background-block h2');
  wrapPhrase(directTitle, 'person who tests.');

  const pricingTitle = document.querySelector('.pricing-title h2');
  wrapPhrase(pricingTitle, 'Fixed quote.');

  const workHero = document.querySelector('.work-hero h1');
  wrapPhrase(workHero, 'client work');

  const reveal = (selector, startDelay = 0) => {
    document.querySelectorAll(selector).forEach((node, index) => {
      if (node.dataset.reveal) return;
      node.dataset.reveal = 'default';
      const delay = Math.min(4, startDelay + (index % 4));
      if (delay) node.dataset.delay = String(delay);
    });
  };

  document.querySelectorAll('.hero-main > .kicker,.hero-main > h1,.hero-main > .lede,.hero-cta-row,.price-line').forEach((node,index) => {
    node.dataset.reveal = index === 1 ? 'slow' : 'default';
    if (index) node.dataset.delay = String(Math.min(index,4));
  });
  reveal('.evidence',2);
  reveal('.section-intro,.background-grid,.profiles-head,.pricing-grid,.contact-grid,.detail-heading,.delivery-grid',0);
  reveal('.case-row,.research-item',0);
  reveal('.profile-ledger a,.build-grid article,.proof-ledger > div,.work-metrics > div',0);

  const emphasisNodes = [
    ...document.querySelectorAll('.motion-highlight'),
    ...document.querySelectorAll('.price-line strong,.offer-price')
  ];

  if (reduceMotion || !('IntersectionObserver' in window)) {
    document.querySelectorAll('[data-reveal],.motion-highlight,.price-line strong,.offer-price').forEach(node => node.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, {threshold:.14, rootMargin:'0px 0px -7% 0px'});

    document.querySelectorAll('[data-reveal]').forEach(node => observer.observe(node));
    emphasisNodes.forEach(node => observer.observe(node));
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

  if (!reduceMotion && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    document.querySelectorAll('.primary,.top-cta').forEach(button => {
      button.addEventListener('pointermove', event => {
        const rect = button.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * .06;
        const y = (event.clientY - rect.top - rect.height / 2) * .09;
        button.style.transform = `translate(${x}px,${y-2}px)`;
      });
      button.addEventListener('pointerleave', () => { button.style.transform = ''; });
    });
  }
})();

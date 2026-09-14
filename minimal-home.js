(() => {
  const hero = document.querySelector('.hero');
  if (!hero || !document.querySelector('#pricing')) return;

  const kicker = hero.querySelector('.hero-main .kicker');
  const title = hero.querySelector('.hero-main h1');
  const lede = hero.querySelector('.hero-main .lede');
  const ctaRow = hero.querySelector('.hero-cta-row');

  if (kicker) kicker.textContent = 'Jalaj Kumar Nimesh · Independent penetration tester';
  if (title) title.innerHTML = 'Security testing for <span class="hero-word">web apps.</span>';
  if (lede) lede.textContent = 'Manual Web & API VAPT focused on the flaws automated tooling often misses.';

  if (ctaRow) {
    const links = ctaRow.querySelectorAll('a');
    if (links[0]) links[0].textContent = 'Discuss a VAPT ↗';
    if (links[1]) {
      links[1].textContent = 'View selected work ↓';
      links[1].setAttribute('href', '#work');
    }
  }

  if (!document.querySelector('.proof-band')) {
    const band = document.createElement('section');
    band.className = 'proof-band';
    band.setAttribute('aria-label', 'Selected proof');
    band.innerHTML = `
      <div class="wrap proof-band-inner">
        <div><strong>20+</strong><span>web &amp; API assessments</span></div>
        <a href="https://nvd.nist.gov/vuln/detail/CVE-2026-72831" target="_blank" rel="noreferrer"><strong>8.8 High</strong><span>public CVE ↗</span></a>
        <div><strong>1st</strong><span>Great AppSec Hackathon 2026</span></div>
      </div>`;
    hero.insertAdjacentElement('afterend', band);
  }

  const word = title?.querySelector('.hero-word');
  const words = ['web apps.', 'APIs.', 'SaaS products.'];
  if (word && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let index = 0;
    setInterval(() => {
      word.classList.add('is-swapping');
      setTimeout(() => {
        index = (index + 1) % words.length;
        word.textContent = words[index];
        word.classList.remove('is-swapping');
      }, 220);
    }, 2600);
  }
})();

const yearNode = document.getElementById('year');
if (yearNode) yearNode.textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const cases = [...document.querySelectorAll('.case')];
cases.forEach((item) => {
  const button = item.querySelector('.case-head');
  const icon = item.querySelector('.case-toggle');
  if (!button) return;
  button.addEventListener('click', () => {
    const willOpen = !item.classList.contains('is-open');
    cases.forEach((other) => {
      other.classList.remove('is-open');
      const otherButton = other.querySelector('.case-head');
      const otherIcon = other.querySelector('.case-toggle');
      if (otherButton) otherButton.setAttribute('aria-expanded', 'false');
      if (otherIcon) otherIcon.textContent = '+';
    });
    if (willOpen) {
      item.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
      if (icon) icon.textContent = '−';
    }
  });
});

const revealNodes = [...document.querySelectorAll('.reveal')];
if (reduceMotion || !('IntersectionObserver' in window)) {
  revealNodes.forEach((node) => node.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    });
  }, {threshold: 0.12, rootMargin: '0px 0px -6% 0px'});
  revealNodes.forEach((node) => observer.observe(node));
}

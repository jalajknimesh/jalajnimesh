const yearNode = document.getElementById('year');
if (yearNode) yearNode.textContent = new Date().getFullYear();

const heroWord = document.querySelector('.hero-word');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (heroWord && !reduceMotion) {
  const words = ['web apps.', 'APIs.', 'SaaS products.'];
  let index = 0;
  window.setInterval(() => {
    heroWord.classList.add('is-swapping');
    window.setTimeout(() => {
      index = (index + 1) % words.length;
      heroWord.textContent = words[index];
      heroWord.classList.remove('is-swapping');
    }, 180);
  }, 3200);
}

const yearNode = document.getElementById('year');
if (yearNode) yearNode.textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const heroWord = document.querySelector('.hero-word');

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

const tabs = [...document.querySelectorAll('.research-tab')];
const panels = [...document.querySelectorAll('.research-panel')];

function activateCase(tab) {
  const id = tab?.dataset.case;
  if (!id) return;
  tabs.forEach((item) => {
    const active = item === tab;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-selected', String(active));
  });
  panels.forEach((panel) => {
    const active = panel.id === id;
    panel.hidden = !active;
    panel.classList.toggle('is-active', active);
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateCase(tab));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === 'ArrowDown') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    tabs[next].focus();
    activateCase(tabs[next]);
  });
});

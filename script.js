const yearNode = document.getElementById('year');
if (yearNode) yearNode.textContent = new Date().getFullYear();

const loadScript = (src) => new Promise((resolve) => {
  const script = document.createElement('script');
  script.src = src;
  script.onload = resolve;
  script.onerror = resolve;
  document.head.appendChild(script);
});

(async () => {
  await loadScript('home-enhance.js');
  await loadScript('minimal-home.js');
  await loadScript('motion.js');
})();

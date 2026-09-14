const yearNode = document.getElementById('year');
if (yearNode) yearNode.textContent = new Date().getFullYear();

['home-enhance.js','motion.js'].forEach((src) => {
  const script = document.createElement('script');
  script.src = src;
  script.defer = true;
  document.head.appendChild(script);
});

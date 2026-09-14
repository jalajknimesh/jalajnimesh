const yearNode = document.getElementById('year');
if (yearNode) yearNode.textContent = new Date().getFullYear();

['home-enhance.js','motion.js'].forEach((src) => {
  const script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.head.appendChild(script);
});

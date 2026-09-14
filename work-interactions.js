(() => {
  const tabs = [...document.querySelectorAll('.research-tab')];
  const panels = [...document.querySelectorAll('.research-panel')];
  if (!tabs.length || !panels.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeId = tabs.find(tab => tab.classList.contains('is-active'))?.dataset.case || tabs[0].dataset.case;
  let locked = false;

  const showPanel = (nextId) => {
    if (!nextId || nextId === activeId || locked) return;
    const current = document.getElementById(activeId);
    const next = document.getElementById(nextId);
    const nextTab = tabs.find(tab => tab.dataset.case === nextId);
    if (!next || !nextTab) return;

    tabs.forEach(tab => {
      const selected = tab === nextTab;
      tab.classList.toggle('is-active', selected);
      tab.setAttribute('aria-selected', String(selected));
    });

    if (reduceMotion || !current) {
      panels.forEach(panel => { panel.hidden = panel !== next; panel.classList.toggle('is-active', panel === next); });
      activeId = nextId;
      return;
    }

    locked = true;
    current.classList.add('is-leaving');

    window.setTimeout(() => {
      current.hidden = true;
      current.classList.remove('is-active', 'is-leaving');
      next.hidden = false;
      next.classList.add('is-entering');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          next.classList.add('is-active');
          next.classList.remove('is-entering');
          activeId = nextId;
          locked = false;
        });
      });
    }, 150);
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => showPanel(tab.dataset.case));
    tab.addEventListener('keydown', event => {
      if (!['ArrowDown','ArrowUp','Home','End'].includes(event.key)) return;
      event.preventDefault();
      let nextIndex = index;
      if (event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
      if (event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;
      tabs[nextIndex].focus();
      showPanel(tabs[nextIndex].dataset.case);
    });
  });
})();

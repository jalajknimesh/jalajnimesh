const yearNode = document.getElementById('year');
if (yearNode) yearNode.textContent = new Date().getFullYear();

const isHome = document.querySelector('.hero') && document.querySelector('#pricing');
if (isHome) {
  const nav = document.querySelector('.topbar nav');
  if (nav && !nav.querySelector('a[href="work.html"]')) {
    const link = document.createElement('a');
    link.href = 'work.html';
    link.textContent = 'Detailed work';
    const work = nav.querySelector('a[href="#work"]');
    if (work) work.insertAdjacentElement('afterend', link);
  }

  const intro = document.querySelector('.section-intro');
  if (intro) {
    const text = intro.querySelector(':scope > p');
    if (text) {
      const side = document.createElement('div');
      side.className = 'section-intro-side';
      text.replaceWith(side);
      side.appendChild(text);
      const link = document.createElement('a');
      link.className = 'text-link';
      link.href = 'work.html';
      link.textContent = 'View detailed work ↗';
      side.appendChild(link);
    }
  }

  const background = document.querySelector('.background-copy');
  if (background && !background.querySelector('.background-link')) {
    const credentials = background.querySelector('.credential-line');
    if (credentials) {
      const link = document.createElement('a');
      link.className = 'background-link';
      link.href = 'work.html';
      link.textContent = 'See research, projects and engineering work ↗';
      credentials.insertAdjacentElement('afterend', link);
    }
  }

  const pricing = document.querySelector('#pricing');
  if (pricing && !document.querySelector('.profiles-block')) {
    const profiles = document.createElement('section');
    profiles.className = 'profiles-block';
    profiles.setAttribute('aria-labelledby', 'profiles-title');
    profiles.innerHTML = `
      <div class="wrap">
        <div class="profiles-head">
          <div><p class="kicker">Public profiles</p><h2 id="profiles-title">Independent proof, outside this website.</h2></div>
          <p>Public profiles are linked so the work history, projects and delivery record can be checked independently.</p>
        </div>
        <div class="profile-ledger">
          <a href="https://www.linkedin.com/in/jalajknimesh" target="_blank" rel="noreferrer"><span>LinkedIn</span><strong>1K+ followers</strong><small>security work &amp; projects ↗</small></a>
          <a href="https://www.fiverr.com/techmafia101" target="_blank" rel="noreferrer"><span>Fiverr</span><strong>4.8 / 5 · 68 reviews</strong><small>90+ completed orders ↗</small></a>
          <a href="https://github.com/jalajknimesh" target="_blank" rel="noreferrer"><span>GitHub</span><strong>Code &amp; research</strong><small>public engineering profile ↗</small></a>
          <a href="https://tryhackme.com/room/road" target="_blank" rel="noreferrer"><span>TryHackMe</span><strong>Road room creator</strong><small>published security lab ↗</small></a>
        </div>
      </div>`;
    pricing.parentNode.insertBefore(profiles, pricing);
  }

  const socials = document.querySelector('.socials');
  if (socials && !socials.querySelector('a[href="https://www.fiverr.com/techmafia101"]')) {
    const fiverr = document.createElement('a');
    fiverr.href = 'https://www.fiverr.com/techmafia101';
    fiverr.target = '_blank';
    fiverr.rel = 'noreferrer';
    fiverr.textContent = 'Fiverr ↗';
    socials.appendChild(fiverr);

    const work = document.createElement('a');
    work.href = 'work.html';
    work.textContent = 'Detailed work ↗';
    socials.appendChild(work);
  }
}

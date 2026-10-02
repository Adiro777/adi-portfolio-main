// Each link scrolls to the section with the matching id.
const links = [
  { id: 'intro', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'resume', label: 'Resume' },
]

export function Navbar() {
  return `
    <nav class="navbar">
      <a class="navbar-name" href="#intro">Adi Roitburg</a>
      <ul class="navbar-links">
        ${links
          .map(({ id, label }) => `<li><a class="navbar-link" href="#${id}" data-section="${id}">${label}</a></li>`)
          .join('')}
      </ul>
    </nav>
  `
}

// Underlines the link for whichever section is currently on screen.
export function setupNavbar() {
  const navLinks = document.querySelectorAll('.navbar-link')
  const sections = links.map(({ id }) => document.getElementById(id))

  function update() {
    // The active section is the last one whose top has scrolled past 40% of the screen.
    let current = sections[0]
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= window.innerHeight * 0.4) current = section
    }
    // At the very bottom, the last section counts even if it's too short to reach that line.
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      current = sections[sections.length - 1]
    }
    navLinks.forEach((link) => link.classList.toggle('is-active', link.dataset.section === current.id))
  }

  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
  update()
}

// The navbar stays hidden during the intro animation, then fades in.
export function showNavbar() {
  document.querySelector('.navbar').classList.add('is-visible')
}

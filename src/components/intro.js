import profileImg from '../assets/adi-intro-image.jpg'

const name = 'Adi Roitburg'
const description =
  'Welcome to my website! View my projects, skills, and resume here.'

// Links shown as icons under the description.
const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/Adiro777',
    icon: 'M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/adi-roitburg/',
    icon: 'M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z',
  },
  {
    label: 'Email',
    href: 'mailto:adi.roitburg@gmail.com',
    icon: 'M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6M20 6L12 11L4 6H20M20 18H4V8L12 13L20 8V18Z',
  },
]

function SocialLink({ label, href, icon }) {
  const opensNewTab = href.startsWith('http')
  return `
    <a class="social-link" href="${href}" aria-label="${label}" title="${label}"${opensNewTab ? ' target="_blank" rel="noopener"' : ''}>
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="${icon}" /></svg>
    </a>
  `
}

export function Intro() {
  return `
    <section id="intro" class="intro">
      <img class="intro-photo" src="${profileImg}" alt="Photo of ${name}" />
      <div class="intro-text">
        <h1 class="intro-name">${name}</h1>
        <p class="intro-description">${description}</p>
        <div class="social-links">
          ${socials.map(SocialLink).join('')}
        </div>
      </div>
      <a class="intro-scroll" href="#projects" aria-label="Scroll to projects">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>
    </section>
  `
}

// Scrolling is locked at the top of the page until the intro animation finishes.
// With `enabled` false (the `introAnimation` setting), everything shows right away instead.
export async function animateIntro(enabled = true) {
  if (!enabled) {
    showIntroNow()
    return
  }

  history.scrollRestoration = 'manual'
  window.scrollTo(0, 0)
  document.documentElement.classList.add('scroll-locked')
  try {
    await playIntro()
  } finally {
    document.documentElement.classList.remove('scroll-locked')
    document.querySelector('.intro-scroll').classList.add('is-visible')
  }
}

// Shows the photo, text, and scroll arrow immediately, without animating.
function showIntroNow() {
  document.querySelector('.intro-photo').style.opacity = 1
  document.querySelector('.intro-text').style.opacity = 1
  document.querySelector('.intro-scroll').classList.add('is-visible')
}

// Photo appears in the center of the screen, slides to its spot, then the text fades in.
async function playIntro() {
  const section = document.querySelector('#intro')
  const photo = section.querySelector('.intro-photo')
  const text = section.querySelector('.intro-text')

  // Wait for the photo and font so the final layout is known before measuring.
  await Promise.all([photo.decode().catch(() => {}), document.fonts.ready])

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    showIntroNow()
    return
  }

  // Distance from the photo's final position to the center of the section.
  const sectionBox = section.getBoundingClientRect()
  const photoBox = photo.getBoundingClientRect()
  const dx = sectionBox.left + sectionBox.width / 2 - (photoBox.left + photoBox.width / 2)
  const dy = sectionBox.top + sectionBox.height / 2 - (photoBox.top + photoBox.height / 2)
  const centered = `translate(${dx}px, ${dy}px)`

  await photo.animate(
    [
      { opacity: 0, transform: `${centered} scale(0.9)` },
      { opacity: 1, transform: centered },
    ],
    { duration: 700, easing: 'ease-out', fill: 'forwards' }
  ).finished

  await photo.animate(
    [
      { opacity: 1, transform: centered },
      { opacity: 1, transform: 'none' },
    ],
    { duration: 900, delay: 300, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', fill: 'both' }
  ).finished

  await text.animate(
    [
      { opacity: 0, transform: 'translateX(-16px)' },
      { opacity: 1, transform: 'none' },
    ],
    { duration: 700, easing: 'ease-out', fill: 'forwards' }
  ).finished
}

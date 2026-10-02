import profileImg from '../assets/adi-intro-image.jpg'

const name = 'Adi Roitburg'
const description =
  'Welcome to my website! View my projects, skills, and resume here.'

export function Intro() {
  return `
    <section id="intro" class="intro">
      <img class="intro-photo" src="${profileImg}" alt="Photo of ${name}" />
      <div class="intro-text">
        <h1 class="intro-name">${name}</h1>
        <p class="intro-description">${description}</p>
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
export async function animateIntro() {
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

// Photo appears in the center of the screen, slides to its spot, then the text fades in.
async function playIntro() {
  const section = document.querySelector('#intro')
  const photo = section.querySelector('.intro-photo')
  const text = section.querySelector('.intro-text')

  // Wait for the photo and font so the final layout is known before measuring.
  await Promise.all([photo.decode().catch(() => {}), document.fonts.ready])

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    photo.style.opacity = 1
    text.style.opacity = 1
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

import { Carousel } from './carousel.js'

// --- IMAGE IMPORTS --- 
import gravityImg from '../assets/GravityImages/gravity2.png'
import gravityMenuImg from '../assets/GravityImages/gravity.png'
import sniperKittyTitleImg from '../assets/SniperKittyImages/SK_TitleScreen.png'
import sniperKittyGameplayImg from '../assets/SniperKittyImages/SK_Gameplay1.png'
import sniperKittyLevelSelectImg from '../assets/SniperKittyImages/SK_LevelSelect.png'



// Add, remove, or edit games here.
// `images` and `link` are optional. For images, put the files in src/assets/ and import them at the top,
// e.g. `import myGameImg from '../assets/my-game.png'`, then use `images: [myGameImg, myOtherImg]`.
// The first image is shown on the card; the pop-up lets visitors click through all of them.
//
// Clicking a card opens a pop-up with more detail. These fields only show up there (both optional):
//   `details`:    a longer description. If empty, the pop-up shows `description` instead.
//   `highlights`: a list of bullet points, e.g. features you built or what you learned.
const games = [
  {
    title: 'Sniper Kitty',
    description: '2D puzzle-platformer, guiding a cat through a series of obstacles using a laser from a sniper rifle.',
    tags: ['Unity', 'Aseprite', 'C#'],
    images: [sniperKittyTitleImg, sniperKittyLevelSelectImg, sniperKittyGameplayImg],
    link: '',
    details: '',
    highlights: [
      'Implemented unique character AI, and physics-based puzzle systems',
      'Developed a modular level system enabling scalable content creation from reusable components',
    ],
  },
  {
    title: 'Gravity',
    description: '2D endless runner with a unique gravtity-shifting movement system.',
    tags: ['Unity', 'Aseprite', 'C#'],
    images: [gravityMenuImg, gravityImg],
    link: 'https://adiro777.itch.io/gravity',
    details: '',
    highlights: [
      'Included a diverse set of obstacles and powerups',
      'Implemented time-based difficulty scaling, progressively increasing obstacle spawn rate and speed',
      'Created all art / animations through Asperite',
    ],
  },
  {
    title: 'Robo Runaway',
    description: '3D parkour survival game, collecting scrap to reach the objective.',
    tags: ['Unreal Engine', 'C++'],
    images: [],
    link: '',
    details: '',
    highlights: [
      'Built a 3D parkour game with custom traversal systems (sprint, wall-run, chainable slide-jumps) for fluid movement',
      'Designed a risk/reward survival loop with a decaying health pool that forces players to balance speed and health',
    ],
  },
  // {
  //   title: 'Game Four',
  //   description: 'A short description of the game: genre, what makes it fun, and what you built it with.',
  //   tags: ['Unreal', 'C++'],
  //   images: [],
  //   link: '',
  // },
]

// Add, remove, or edit other projects here. Same fields as games.
const otherProjects = [
  {
    title: 'NLP to SQP Agent',
    description: 'AI model that translates natural language to SQL queries.',
    tags: ['Python', 'LangChain'],
    images: [],
    link: 'https://github.com/',
    details: '',
    highlights: [
      'Built a LangChain ReAct agent that converts natural language questions into executable SQL queries',
      'Designed a RAG pipeline over ChromaDB to surface the relevant database schema for each query',
      'Implemented a read-only validation layer that rejects destructive operations before execution',
    ],
  },
  {
    title: 'Loominary',
    description: 'Web application for visualizing data processing via nodes.',
    tags: ['Python', 'Javascript', 'Electron'],
    images: [],
    link: '',
    details: '',
    highlights: [
      'Developed a web application that visualizes data processing using a node based system',
      'Implemented data operations as nodes that users can connect together',
      'Included CSV import and export capabilites',
    ],
  },
  {
    title: 'LMUral',
    description: 'Collaberative drawing experience through the web.',
    tags: ['React', 'Node.js'],
    images: [],
    link: '',
    details: '',
    highlights: [
      'Developed a collaberative drawing experience, where users draw on individual tiles, creating one mural',
      'Integrated drawing libraries for detailed drawing potential',
      'Implemented a feed for community mural browsing',
    ],
  },
]

const allProjects = [...games, ...otherProjects]

// The card's cover: the first image, or a placeholder if there are none.
function ProjectImage({ title, images }) {
  return images.length
    ? `<img class="project-image" src="${images[0]}" alt="Screenshot of ${title}" />`
    : `<div class="project-image project-image-placeholder" aria-hidden="true">${title}</div>`
}

// All of a project's images in the pop-up, one at a time, with arrows to click through them.
function Gallery({ title, images }) {
  if (images.length < 2) return ProjectImage({ title, images })
  return `
    <div class="gallery" aria-roledescription="carousel" aria-label="${title} screenshots">
      <div class="gallery-track">
        ${images
          .map(
            (src, i) =>
              `<img class="gallery-image" src="${src}" alt="Screenshot ${i + 1} of ${images.length} of ${title}"${i === 0 ? ' data-active' : ''} />`
          )
          .join('')}
      </div>
      <button class="gallery-arrow gallery-arrow-prev" type="button" aria-label="Previous image">&#8592;</button>
      <button class="gallery-arrow gallery-arrow-next" type="button" aria-label="Next image">&#8594;</button>
      <div class="gallery-dots">
        ${images
          .map((_, i) => `<button class="gallery-dot" type="button" aria-label="Image ${i + 1}"${i === 0 ? ' data-active' : ''}></button>`)
          .join('')}
      </div>
    </div>
  `
}

function setupGallery(gallery) {
  const images = [...gallery.querySelectorAll('.gallery-image')]
  const dots = [...gallery.querySelectorAll('.gallery-dot')]
  let active = 0

  function show(index) {
    active = (index + images.length) % images.length
    images.forEach((img, i) => img.toggleAttribute('data-active', i === active))
    dots.forEach((dot, i) => dot.toggleAttribute('data-active', i === active))
  }

  gallery.querySelector('.gallery-arrow-prev').addEventListener('click', () => show(active - 1))
  gallery.querySelector('.gallery-arrow-next').addEventListener('click', () => show(active + 1))
  dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)))

  return show
}

function Tags(tags) {
  return `<ul class="tags">${tags.map((tag) => `<li class="tag">${tag}</li>`).join('')}</ul>`
}

function ProjectCard(project) {
  const { title, description, tags } = project
  return `
    <article class="card project-card">
      ${ProjectImage(project)}
      <h4 class="card-title">${title}</h4>
      <p class="card-text">${description}</p>
      ${Tags(tags)}
      <div class="card-actions">
        <!-- Stretched over the whole card, so clicking anywhere on it opens the details -->
        <button class="card-open" type="button" data-project="${allProjects.indexOf(project)}">More details +</button>
      </div>
    </article>
  `
}

// The content of the pop-up for one project.
function ProjectDetails(project) {
  const { title, description, details, highlights, tags, link } = project
  return `
    ${Gallery(project)}
    <h3 class="project-dialog-title" id="project-dialog-title">${title}</h3>
    ${Tags(tags)}
    <p class="project-dialog-text">${details || description}</p>
    ${
      highlights.length
        ? `<ul class="project-highlights">${highlights.map((h) => `<li>${h}</li>`).join('')}</ul>`
        : ''
    }
    ${link ? `<a class="button" href="${link}" target="_blank" rel="noopener">View project →</a>` : ''}
  `
}

export function Projects() {
  return `
    <section id="projects" class="section">
      <h2 class="section-title">Projects</h2>

      <div class="subsection">
        <h3 class="subsection-title">Games</h3>
        ${Carousel('Games', games, ProjectCard)}
      </div>

      <div class="subsection">
        <h3 class="subsection-title">Other Projects</h3>
        ${Carousel('Other projects', otherProjects, ProjectCard)}
      </div>

      <dialog class="project-dialog" aria-labelledby="project-dialog-title">
        <button class="project-dialog-close" type="button" aria-label="Close">&#10005;</button>
        <div class="project-dialog-inner">
          <div class="project-dialog-content"></div>
        </div>
      </dialog>
    </section>
  `
}

// Opens the details pop-up when a project card is clicked. Call once after the page is rendered.
export function setupProjects() {
  const dialog = document.querySelector('.project-dialog')
  const content = dialog.querySelector('.project-dialog-content')
  let showImage = null // switches gallery images; null when the project has 0 or 1 image

  document.querySelectorAll('.card-open').forEach((button) => {
    button.addEventListener('click', () => {
      content.innerHTML = ProjectDetails(allProjects[button.dataset.project])
      const gallery = content.querySelector('.gallery')
      showImage = gallery ? setupGallery(gallery) : null
      dialog.showModal()
      dialog.querySelector('.project-dialog-inner').scrollTop = 0
      document.documentElement.classList.add('modal-open')
    })
  })

  dialog.querySelector('.project-dialog-close').addEventListener('click', () => dialog.close())

  // Left/right arrow keys flip through the images while the pop-up is open.
  dialog.addEventListener('keydown', (e) => {
    if (!showImage) return
    const current = [...content.querySelectorAll('.gallery-image')].findIndex((img) => img.hasAttribute('data-active'))
    if (e.key === 'ArrowLeft') showImage(current - 1)
    if (e.key === 'ArrowRight') showImage(current + 1)
  })

  // Clicking the dark area outside the pop-up closes it.
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close()
  })

  // Runs however it was closed (close button, outside click, or the Escape key).
  dialog.addEventListener('close', () => document.documentElement.classList.remove('modal-open'))
}

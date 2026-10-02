import { Carousel } from './carousel.js'

// Add, remove, or edit games here.
// `image` and `link` are optional. For an image, put the file in src/assets/ and import it at the top,
// e.g. `import myGameImg from '../assets/my-game.png'`, then use `image: myGameImg`.
const games = [
  {
    title: 'Game One',
    description: 'A short description of the game: genre, what makes it fun, and what you built it with.',
    tags: ['Unity', 'C#'],
    image: '',
    link: '',
  },
  {
    title: 'Game Two',
    description: 'A short description of the game: genre, what makes it fun, and what you built it with.',
    tags: ['Godot'],
    image: '',
    link: '',
  },
  {
    title: 'Game Three',
    description: 'A short description of the game: genre, what makes it fun, and what you built it with.',
    tags: ['JavaScript', 'Canvas'],
    image: '',
    link: '',
  },
  {
    title: 'Game Four',
    description: 'A short description of the game: genre, what makes it fun, and what you built it with.',
    tags: ['Unreal', 'C++'],
    image: '',
    link: '',
  },
]

// Add, remove, or edit other projects here. Same fields as games.
const otherProjects = [
  {
    title: 'Project One',
    description: 'A short description of what this project does and why you built it.',
    tags: ['JavaScript', 'HTML', 'CSS'],
    image: '',
    link: 'https://github.com/',
  },
  {
    title: 'Project Two',
    description: 'A short description of what this project does and why you built it.',
    tags: ['Python'],
    image: '',
    link: '',
  },
  {
    title: 'Project Three',
    description: 'A short description of what this project does and why you built it.',
    tags: ['React', 'Node.js'],
    image: '',
    link: '',
  },
  {
    title: 'Project Four',
    description: 'A short description of what this project does and why you built it.',
    tags: ['Java'],
    image: '',
    link: '',
  },
]

function ProjectCard({ title, description, tags, image, link }) {
  return `
    <article class="card project-card">
      ${
        image
          ? `<img class="project-image" src="${image}" alt="Screenshot of ${title}" />`
          : `<div class="project-image project-image-placeholder" aria-hidden="true">${title}</div>`
      }
      <h4 class="card-title">${title}</h4>
      <p class="card-text">${description}</p>
      <ul class="tags">
        ${tags.map((tag) => `<li class="tag">${tag}</li>`).join('')}
      </ul>
      ${link ? `<a class="card-link" href="${link}" target="_blank" rel="noopener">View project →</a>` : ''}
    </article>
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
    </section>
  `
}

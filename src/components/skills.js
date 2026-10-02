// Every .svg in src/assets/skills/, looked up by file name (e.g. 'unity' -> unity.svg).
const logos = Object.fromEntries(
  Object.entries(import.meta.glob('../assets/skills/*.svg', { eager: true, import: 'default' })).map(
    ([path, url]) => [path.split('/').pop().replace('.svg', ''), url]
  )
)

// Add, remove, or edit skills here.
// `icon` is the name of an .svg file in src/assets/skills/. To add a new one, download the logo
// from https://devicon.dev (use the "original" version), save it there, and add an entry below.
// `invert: true` turns a dark logo white so it shows up on the dark background.
const skillGroups = [
  {
    title: 'Tools',
    items: [
      { name: 'Unity', icon: 'unity', invert: true },
      { name: 'Godot', icon: 'godot' },
      { name: 'Unreal Engine', icon: 'unrealengine', invert: true },
      { name: 'React', icon: 'react' },
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'Git', icon: 'git' },
      { name: 'VS Code', icon: 'vscode' },
    ],
  },
  {
    title: 'Languages',
    items: [
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'Python', icon: 'python' },
      { name: 'C#', icon: 'csharp' },
      { name: 'C++', icon: 'cplusplus' },
      { name: 'Java', icon: 'java' },
      { name: 'HTML', icon: 'html5' },
      { name: 'CSS', icon: 'css3' },
    ],
  },
  {
    title: 'Hobbies',
    items: [
      { name: 'Tennis', icon: 'tennis', invert: true },
      { name: 'Rock Climbing', icon: 'rock-climbing', invert: true },
      { name: 'Video Games', icon: 'video-games', invert: true },
      { name: 'Video Editing', icon: 'video-editing', invert: true },
    ],
  },
]

function Skill({ name, icon, invert }) {
  return `
    <li class="skill">
      <div class="skill-circle">
        <img class="skill-logo${invert ? ' skill-logo-invert' : ''}" src="${logos[icon]}" alt="" />
      </div>
      <span class="skill-name">${name}</span>
    </li>
  `
}

function SkillGroup({ title, items }) {
  return `
    <div class="subsection">
      <h3 class="subsection-title">${title}</h3>
      <ul class="skill-grid">
        ${items.map(Skill).join('')}
      </ul>
    </div>
  `
}

export function Skills() {
  return `
    <section id="skills" class="section">
      <h2 class="section-title">Skills</h2>
      ${skillGroups.map(SkillGroup).join('')}
    </section>
  `
}

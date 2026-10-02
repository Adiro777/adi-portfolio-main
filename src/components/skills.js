// Add, remove, or edit skills here. Add a new group by copying one { title, items } block.
const skillGroups = [
  {
    title: 'Languages',
    items: ['JavaScript', 'Python', 'C#', 'C++', 'Java', 'HTML', 'CSS'],
  },
  {
    title: 'Tools & Frameworks',
    items: ['Unity', 'Godot', 'Unreal Engine', 'React', 'Node.js', 'Git', 'VS Code'],
  },
]

function SkillGroup({ title, items }) {
  return `
    <div class="subsection">
      <h3 class="subsection-title">${title}</h3>
      <ul class="skill-grid">
        ${items.map((item) => `<li class="skill">${item}</li>`).join('')}
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

// Put your resume PDF in the `public` folder with this file name.
const resumeFile = '/resume.pdf'

export function Resume() {
  return `
    <section id="resume" class="section">
      <h2 class="section-title">Resume</h2>
      <p class="section-intro">Want the full picture? View or download my resume.</p>
      <div class="button-row">
        <a class="button" href="${resumeFile}" target="_blank" rel="noopener">View Resume</a>
        <a class="button button-outline" href="${resumeFile}" download>Download PDF</a>
      </div>
    </section>
  `
}

// To update your resume, replace this PDF in src/assets/ (or change the file name here).
import resumeFile from '../assets/Resume - ADI ROITBURG (Main).pdf'

// The file name visitors get when they click "Download PDF".
const downloadName = 'Adi-Roitburg-Resume.pdf'

export function Resume() {
  return `
    <section id="resume" class="section">
      <h2 class="section-title">Resume</h2>
      <p class="section-intro">Want the full picture? View or download my resume.</p>
      <div class="button-row">
        <a class="button" href="${resumeFile}" target="_blank" rel="noopener">View Resume</a>
        <a class="button button-outline" href="${resumeFile}" download="${downloadName}">Download PDF</a>
      </div>
      <iframe class="resume-preview" src="${resumeFile}#view=Fit&navpanes=0" title="Adi Roitburg's resume"></iframe>
    </section>
  `
}

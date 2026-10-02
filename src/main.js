import './style.css'
import { settings } from './settings.js'
import { Navbar, setupNavbar, showNavbar } from './components/navbar.js'
import { Intro, animateIntro } from './components/intro.js'
import { Projects, setupProjects } from './components/projects.js'
import { setupCarousels } from './components/carousel.js'
import { Skills } from './components/skills.js'
import { Resume } from './components/resume.js'

document.documentElement.classList.toggle('blend-sections', settings.blendSections)

document.querySelector('#app').innerHTML = `
  ${Navbar()}
  ${Intro()}
  ${Projects()}
  ${Skills()}
  ${Resume()}
`

setupNavbar()
setupCarousels()
setupProjects()
animateIntro(settings.introAnimation).finally(showNavbar)

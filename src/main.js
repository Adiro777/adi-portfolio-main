import './style.css'
import { Navbar, setupNavbar, showNavbar } from './components/navbar.js'
import { Intro, animateIntro } from './components/intro.js'
import { Projects } from './components/projects.js'
import { setupCarousels } from './components/carousel.js'
import { Skills } from './components/skills.js'
import { Resume } from './components/resume.js'

document.querySelector('#app').innerHTML = `
  ${Navbar()}
  ${Intro()}
  ${Projects()}
  ${Skills()}
  ${Resume()}
`

setupNavbar()
setupCarousels()
animateIntro().finally(showNavbar)

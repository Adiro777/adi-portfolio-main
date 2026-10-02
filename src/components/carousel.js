// A carousel with one main card in the center and faded cards peeking out on each side.
// `items` is a list of objects, and `renderCard` turns one item into card HTML.
export function Carousel(label, items, renderCard) {
  return `
    <div class="carousel" role="region" aria-roledescription="carousel" aria-label="${label}" tabindex="0">
      <div class="carousel-track">
        ${items.map((item) => `<div class="carousel-slide">${renderCard(item)}</div>`).join('')}
      </div>
      <button class="carousel-arrow carousel-arrow-prev" type="button" aria-label="Previous">&#8592;</button>
      <button class="carousel-arrow carousel-arrow-next" type="button" aria-label="Next">&#8594;</button>
    </div>
  `
}

// Makes every carousel on the page work. Call once after the page is rendered.
export function setupCarousels() {
  document.querySelectorAll('.carousel').forEach(setupCarousel)
}

function setupCarousel(carousel) {
  const slides = [...carousel.querySelectorAll('.carousel-slide')]
  const prev = carousel.querySelector('.carousel-arrow-prev')
  const next = carousel.querySelector('.carousel-arrow-next')
  let active = 0

  if (slides.length < 2) {
    prev.hidden = true
    next.hidden = true
  }

  function render() {
    slides.forEach((slide, i) => {
      // How many places this slide is from the active one, wrapping around the ends:
      // 0 = center, -1 = left, 1 = right, anything further is hidden.
      let offset = (i - active + slides.length) % slides.length
      if (offset > slides.length / 2) offset -= slides.length

      let position = 'hidden'
      if (offset === 0) position = 'center'
      else if (offset === -1) position = 'left'
      else if (offset === 1) position = 'right'
      else position = offset < 0 ? 'hidden-left' : 'hidden-right'

      slide.dataset.position = position
      // Only the center card can be clicked or tabbed into.
      slide.inert = position !== 'center'
    })
  }

  function go(step) {
    active = (active + step + slides.length) % slides.length
    render()
  }

  prev.addEventListener('click', () => go(-1))
  next.addEventListener('click', () => go(1))

  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') go(-1)
    if (e.key === 'ArrowRight') go(1)
  })

  // Swipe left/right on touch screens.
  let touchStartX = null
  carousel.addEventListener('touchstart', (e) => (touchStartX = e.touches[0].clientX), { passive: true })
  carousel.addEventListener('touchend', (e) => {
    if (touchStartX === null) return
    const distance = e.changedTouches[0].clientX - touchStartX
    if (Math.abs(distance) > 40) go(distance < 0 ? 1 : -1)
    touchStartX = null
  })

  render()
}

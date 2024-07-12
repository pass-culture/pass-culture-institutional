export function cleanSlideAttributes(
  carouselEl: Element,
  slidesEl: NodeListOf<Element>
) {
  carouselEl?.removeAttribute('tabindex')
  carouselEl?.removeAttribute('aria-live')
  slidesEl.forEach((slideEl) => {
    slideEl.removeAttribute('tabindex')
    slideEl.removeAttribute('aria-selected')
  })
}
// Remove attributes when clicking "previous", "next" and dots buttons
export function handleNavigationButtonClick(
  carousel_selector: string,
  slides_selector: string
): void {
  const carouselEl = document.querySelector(carousel_selector)
  const carouselSlidesEl = carouselEl?.querySelectorAll(slides_selector)

  if (carouselEl && carouselSlidesEl) {
    setTimeout(() => {
      cleanSlideAttributes(carouselEl, carouselSlidesEl)
    }, 1)
  }
}

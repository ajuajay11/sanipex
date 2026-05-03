export function scrollToElement(selector, lenis, offset = 0) {
  const el = document.querySelector(selector);
  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el, { offset, duration: 1.2 });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}
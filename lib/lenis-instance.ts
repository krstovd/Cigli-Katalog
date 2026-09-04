import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null): void {
  instance = lenis;
}

export function scrollToTop(): void {
  if (instance) {
    instance.scrollTo(0, { duration: 1.4 });
  } else {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }
}

export function scrollToElement(selector: string): void {
  const element = document.querySelector<HTMLElement>(selector);
  if (!element) return;

  if (instance) {
    instance.scrollTo(element, { duration: 1.2, offset: -64 });
  } else {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    element.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }
}

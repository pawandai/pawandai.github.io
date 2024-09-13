import gsap, { Power3 } from "gsap";

export const stagger = (
  target: [HTMLElement | null, HTMLElement | null],
  fromvVars: { y?: number; x?: number; transform?: string },
  toVars: { x?: number; y?: number; transform?: string }
) => {
  return gsap.fromTo(
    target,
    { opacity: 0, ...fromvVars },
    { opacity: 1, ...toVars, stagger: 0.2, ease: Power3.easeOut }
  );
};

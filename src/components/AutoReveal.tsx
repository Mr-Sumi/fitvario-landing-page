"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// One place that gives the page its scroll-in rhythm, so no page has to be edited. After mount it walks the main
// landmark's sections, picks the blocks (and the items of lists and grids) that start below the fold, hides only
// those, and releases each with a small stagger as it scrolls into view. Everything is visible before this runs
// and without JavaScript. Skipped entirely for reduced motion.
export function AutoReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const main = document.getElementById("main");
    if (!main) return;

    const isHome = pathname === "/";
    const sections = Array.from(main.querySelectorAll("section"));
    const targets: HTMLElement[] = [];
    const push = (el: Element, i: number) => {
      const h = el as HTMLElement;
      if (h.closest(".rv-pending, .rv-in")) return;
      h.dataset.rvIndex = String(i);
      targets.push(h);
    };

    sections.forEach((sec, si) => {
      if (isHome && si === 0) return; // the hero is the first thing seen; never hidden
      const kids =
        sec.children.length === 1 && sec.firstElementChild ? Array.from(sec.firstElementChild.children) : Array.from(sec.children);
      kids.forEach((k) => {
        const tag = k.tagName;
        if (tag === "UL" || tag === "OL") {
          Array.from(k.children).forEach((li, i) => push(li, i));
        } else if (k.classList.contains("grid") && k.children.length > 1) {
          Array.from(k.children).forEach((c, i) => push(c, i));
        } else {
          push(k, 0);
        }
      });
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.classList.remove("rv-pending");
          el.classList.add("rv-in");
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
    );

    const armed: HTMLElement[] = [];
    for (const el of targets) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) continue;
      const i = Number(el.dataset.rvIndex ?? 0);
      el.style.transitionDelay = `${Math.min(i, 5) * 80}ms`;
      el.classList.add("rv-pending");
      io.observe(el);
      armed.push(el);
    }

    return () => {
      io.disconnect();
      for (const el of armed) {
        el.classList.remove("rv-pending", "rv-in");
        el.style.transitionDelay = "";
      }
    };
  }, [pathname]);

  return null;
}

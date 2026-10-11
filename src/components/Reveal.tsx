"use client";

import { useEffect, useRef } from "react";

// Fades and lifts a block into place the first time it scrolls into view.
// Content is fully visible on the server and before hydration: the hidden state is only applied, after mount, to
// blocks that start below the fold, so nothing is ever invisible to crawlers, to no-JS visitors or to LCP.
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  /** Stagger in milliseconds */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "ul" | "ol" | "header";
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.92) return; // already in view: leave it alone
    el.classList.add("rv-pending");
    el.style.transitionDelay = `${delay}ms`;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.remove("rv-pending");
            el.classList.add("rv-in");
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const Component = Tag as React.ElementType;
  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
}

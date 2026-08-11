"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: React.ReactNode;
  /** Stagger in milliseconds, applied as a transition delay. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
};

/**
 * Fades content in as it scrolls into view.
 *
 * Nothing is hidden by the stylesheet on its own: the component opts in from
 * the client, and only for elements that are still below the fold. Content is
 * therefore always readable if scripting is slow, blocked or broken, and it
 * never flashes out of view once it has been painted.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const alreadySeen =
      node.getBoundingClientRect().top < window.innerHeight * 0.9;

    if (alreadySeen || typeof IntersectionObserver === "undefined") {
      node.dataset.visible = "true";
      return;
    }

    node.dataset.ready = "true";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = "true";
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn("reveal", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

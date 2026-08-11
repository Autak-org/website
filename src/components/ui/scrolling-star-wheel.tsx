"use client";

import { useEffect, useState } from "react";
import { StarWheel } from "@/components/ui/star-wheel";
import { cn } from "@/lib/cn";

/**
 * Spins the star wheel in proportion to how far the visitor has scrolled
 * through a given element. Stays still when the visitor prefers reduced
 * motion.
 */
export function ScrollingStarWheel({
  targetId,
  className,
  turns = 1.5,
}: {
  /** Element whose scroll progress drives the rotation. */
  targetId: string;
  className?: string;
  turns?: number;
}) {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = target.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return;

      const progress = Math.min(Math.max(-rect.top / travel, 0), 1);
      setAngle(progress * turns * 360);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetId, turns]);

  return (
    <div
      className={cn("text-brand-500", className)}
      // Inline: the angle changes on every animation frame.
      style={{ transform: `rotate(${angle}deg)`, willChange: "transform" }}
    >
      <StarWheel className="h-full w-full" />
    </div>
  );
}

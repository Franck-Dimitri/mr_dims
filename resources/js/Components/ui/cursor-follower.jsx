'use client';

import React, { useState, useEffect, useRef } from "react";

export const Component = () => {
  const mousePosition = useRef({ x: -100, y: -100 });
  const dotPosition = useRef({ x: -100, y: -100 });
  const borderDotPosition = useRef({ x: -100, y: -100 });

  const [renderPos, setRenderPos] = useState({ dot: { x: -100, y: -100 }, border: { x: -100, y: -100 } });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const DOT_SMOOTHNESS = 0.2;
  const BORDER_DOT_SMOOTHNESS = 0.1;

  useEffect(() => {
    // Only enable on devices with a mouse/pointer (not touchscreens)
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    // Event delegation: dynamically tracks interactive elements even after Inertia page changes
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target &&
        target.closest &&
        target.closest("a, button, img, input, textarea, select, [role='button'], [tabindex='0'], .cursor-pointer")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsHovering(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // Animation loop with lerp for smooth momentum
    let animationId;
    const animate = () => {
      const lerp = (start, end, factor) => start + (end - start) * factor;

      dotPosition.current.x = lerp(dotPosition.current.x, mousePosition.current.x, DOT_SMOOTHNESS);
      dotPosition.current.y = lerp(dotPosition.current.y, mousePosition.current.y, DOT_SMOOTHNESS);

      borderDotPosition.current.x = lerp(borderDotPosition.current.x, mousePosition.current.x, BORDER_DOT_SMOOTHNESS);
      borderDotPosition.current.y = lerp(borderDotPosition.current.y, mousePosition.current.y, BORDER_DOT_SMOOTHNESS);

      setRenderPos({
        dot: { x: dotPosition.current.x, y: dotPosition.current.y },
        border: { x: borderDotPosition.current.x, y: borderDotPosition.current.y },
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [isVisible]);

  // Prevent SSR render
  if (typeof window === "undefined") return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Inner Dot */}
      <div
        className="absolute rounded-full dark:bg-white bg-black"
        style={{
          width: "8px",
          height: "8px",
          transform: "translate(-50%, -50%)",
          left: `${renderPos.dot.x}px`,
          top: `${renderPos.dot.y}px`,
        }}
      />

      {/* Trailing Outer Ring with Hover Scaling */}
      <div
        className="absolute rounded-full border dark:border-white border-black"
        style={{
          width: isHovering ? "44px" : "28px",
          height: isHovering ? "44px" : "28px",
          transform: "translate(-50%, -50%)",
          left: `${renderPos.border.x}px`,
          top: `${renderPos.border.y}px`,
          transition: "width 0.25s ease-out, height 0.25s ease-out",
        }}
      />
    </div>
  );
};

export const CursorFollower = Component;
export default CursorFollower;

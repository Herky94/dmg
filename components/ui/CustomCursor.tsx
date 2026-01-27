"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    setIsVisible(true);

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Watch for class changes to hide cursor on map
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          if (document.body.classList.contains("hide-custom-cursor")) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
        }
      });
    });

    observer.observe(document.body, { attributes: true });

    return () => {
      document.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const animate = () => {
      setCirclePosition((prev) => {
        const dx = mousePosition.x - prev.x;
        const dy = mousePosition.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Elastic easing - più veloce quando è lontano, più lento quando è vicino
        const elasticFactor = Math.min(distance * 0.002 + 0.05, 0.15);

        return {
          x: prev.x + dx * elasticFactor,
          y: prev.y + dy * elasticFactor,
        };
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition]);

  return (
    <>
      {/* Restore normal cursor */}
      {/* <style jsx global>{`
        * {
          cursor: auto !important;
        }
      `}</style> */}

      <div
        className={`fixed pointer-events-none z-[9999] transition-opacity duration-300 hidden xl:block ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: circlePosition.x,
          top: circlePosition.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Small very thin black circle that follows cursor */}
        <div className="w-12 h-12 border-[0.1px] border-black rounded-full" />
      </div>
    </>
  );
}

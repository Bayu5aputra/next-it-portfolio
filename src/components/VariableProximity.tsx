"use client";

import type React from "react";
import { useEffect, useMemo, useRef } from "react";

interface VariableProximityProps {
  label: string;
  fromWeight?: number;
  toWeight?: number;
  radius?: number;
  className?: string;
  onClick?: () => void;
}

const VariableProximity: React.FC<VariableProximityProps> = ({
  label,
  fromWeight = 400,
  toWeight = 700,
  radius = 100,
  className = "",
  onClick,
}) => {
  // Store refs to all character spans
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const containerRef = useRef<HTMLSpanElement>(null);

  // Split text into structure: Words -> Chars
  const words = useMemo(() => label.split(" "), [label]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      requestAnimationFrame(() => {
        for (const charSpan of charRefs.current) {
          if (!charSpan) continue;

          const rect = charSpan.getBoundingClientRect();
          const charCenterX = rect.left + rect.width / 2;
          const charCenterY = rect.top + rect.height / 2;

          const distance = Math.sqrt((mouseX - charCenterX) ** 2 + (mouseY - charCenterY) ** 2);

          let newWeight = fromWeight;
          if (distance < radius) {
            const ratio = 1 - distance / radius;
            // Use nonlinear easing for smoother feel (optional, but nice)
            // const easedRatio = ratio * ratio;
            newWeight = fromWeight + (toWeight - fromWeight) * ratio;
          }

          charSpan.style.fontWeight = String(newWeight);
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [fromWeight, toWeight, radius]);

  // Flatten logic for ref assignment
  let charIndexCounter = 0;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      onClick();
    }
  };

  return (
    <span
      ref={containerRef}
      className={className}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? "button" : "presentation"}
      tabIndex={onClick ? 0 : undefined}
      style={{
        cursor: onClick ? "pointer" : "default",
        display: "inline", // Allow container to flow normally
      }}
      aria-label={label}
    >
      {words.map((word, wordIndex) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: Words order is static for a given label
        <span key={wordIndex} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {word.split("").map((char, charIndex) => {
            const currentRefIndex = charIndexCounter++;
            return (
              <span
                // biome-ignore lint/suspicious/noArrayIndexKey: Char order is static for a given word
                key={charIndex}
                ref={(el) => {
                  charRefs.current[currentRefIndex] = el;
                }}
                style={{
                  display: "inline-block",
                  fontWeight: fromWeight,
                  transition: "font-weight 0.1s linear",
                  willChange: "font-weight",
                }}
              >
                {char}
              </span>
            );
          })}
          {/* Add space after word unless it's the last word */}
          {wordIndex < words.length - 1 && (
            <span style={{ display: "inline-block", whiteSpace: "pre-wrap" }}> </span>
          )}
        </span>
      ))}
    </span>
  );
};

export default VariableProximity;

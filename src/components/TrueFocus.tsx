"use client";

import { Flex } from "@once-ui-system/core";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./TrueFocus.module.scss";

interface TrueFocusProps {
  children: React.ReactNode;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  loop?: boolean;
  className?: string;
}

const TrueFocus: React.FC<TrueFocusProps> = ({
  children,
  manualMode = true,
  blurAmount = 4,
  borderColor = "var(--brand-solid-strong)",
  glowColor = "var(--brand-solid-strong)",
  animationDuration = 3,
  loop = false,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!manualMode) return; // If implementing auto-mode later

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Only update if inside or near the container, or just update always relative to it
      // Updating smooths performance if we use requestAnimationFrame, but for simple CSS var it's mostly fine
      containerRef.current.style.setProperty("--x", `${x}px`);
      containerRef.current.style.setProperty("--y", `${y}px`);
      setPosition({ x, y });
    };

    const handleMouseLeave = () => {
      if (!containerRef.current) return;
      setPosition(null);
      // Optional: Reset to center or fade out
      containerRef.current.style.removeProperty("--x");
      containerRef.current.style.removeProperty("--y");
    };

    // Attach to window or container? Container is better for specific focus,
    // but if the text is small, window might be better for "flashlight" feel.
    // Let's attach to the container for now, but ensure the container is block/large enough.
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [manualMode]);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${className}`}
      style={{ "--blur-amount": `${blurAmount}px` } as React.CSSProperties}
    >
      <div className={styles.blurred}>{children}</div>
      <div className={styles.focused} style={{ opacity: position ? 1 : 0 }}>
        {children}
      </div>
    </div>
  );
};

export default TrueFocus;

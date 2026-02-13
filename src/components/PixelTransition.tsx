"use client";

import { useRef, useEffect, useState, type CSSProperties, type FC, type JSX } from "react";
import Image from "next/image";
import type { ImageProps } from "next/image";
import styles from "./PixelTransition.module.scss";

interface PixelTransitionProps extends Omit<ImageProps, "onLoad"> {
  gridSize?: number;
  pixelColor?: string;
  animationDuration?: number;
  animationDelay?: number;
}

export const PixelTransition: FC<PixelTransitionProps> = ({
  src,
  alt,
  className,
  gridSize = 7, // Smaller default for better reolution
  pixelColor = "#060010", // Match the dark theme background
  animationDuration = 0.8,
  animationDelay = 0,
  style,
  ...imageProps
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pixels, setPixels] = useState<JSX.Element[]>([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Determine grid dimensions based on container size
    const updateGrid = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      if (width === 0 || height === 0) return;

      const cols = Math.ceil(width / gridSize);
      const rows = Math.ceil(height / gridSize);
      const totalPixels = cols * rows;

      // Generate pixels with computed styles for staggered animation for a "digital" feel
      const newPixels = Array.from({ length: totalPixels }).map((_, i) => {
        const randomDelay = Math.random() * animationDuration;
        return (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: Grid is static relative to container size
            key={i}
            className={styles.pixel}
            style={
              {
                width: `${100 / cols}%`,
                height: `${100 / rows}%`,
                backgroundColor: pixelColor,
                transitionDelay: `${randomDelay}s`,
              } as CSSProperties
            }
          />
        );
      });

      setPixels(newPixels);

      // Trigger the "reveal" after a short delay to ensure pixels are rendered
      setTimeout(() => setIsActive(true), 100 + animationDelay * 1000);
    };

    // Use ResizeObserver for more robust resizing support
    const resizeObserver = new ResizeObserver(() => {
      updateGrid();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [gridSize, pixelColor, animationDuration, animationDelay]);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${className || ""}`}
      style={{ ...style, position: "relative", overflow: "hidden" }}
    >
      <Image
        src={src}
        alt={alt}
        className={styles.image}
        style={{ opacity: isActive ? 1 : 0, transition: `opacity 0.1s ease ${animationDuration}s` }} // Ensure image is fully visible after transition
        {...imageProps}
      />
      <div className={`${styles.pixelGrid} ${isActive ? styles.active : ""}`} aria-hidden="true">
        {pixels}
      </div>
    </div>
  );
};

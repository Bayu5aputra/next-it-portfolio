"use client";

import React, { useEffect, useState } from "react";
import Particles from "./Particles";
import styles from "./splash.module.scss";

export const Splash = ({
  onComplete,
  onFadeOutStart,
  title = "Magic Portfolio",
}: {
  onComplete?: () => void;
  onFadeOutStart?: () => void;
  title?: string;
}) => {
  const [fadeout, setFadeout] = useState(false);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = "hidden";

    // Animation duration is around 3s for title, + 1.5s for subtitle fade in.
    // We wait longer to allow reading the subtitle.
    const timer = setTimeout(() => {
      setFadeout(true);
      if (onFadeOutStart) onFadeOutStart();
      if (onComplete) {
        setTimeout(onComplete, 1000); // Wait for fade out transition (1s)
      }
    }, 5500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = ""; // Restore scroll
    };
  }, [onComplete, onFadeOutStart]);

  return (
    <div className={`${styles.splashContainer} ${fadeout ? styles.fadeOut : ""}`}>
      <div className={`${styles.glowLine} ${styles.fadeLeft}`} />
      <Particles className={styles.particlesContainer} quantity={100} />
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.subtitle}>redesigned by bayu saputra</div>
      <div className={`${styles.glowLine} ${styles.fadeRight}`} />
    </div>
  );
};

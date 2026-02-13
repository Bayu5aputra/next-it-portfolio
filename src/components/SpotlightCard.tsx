import type React from "react";
import { useRef, useState } from "react";
import styles from "./SpotlightCard.module.scss";

interface Position {
  x: number;
  y: number;
}

interface SpotlightCardProps<T extends React.ElementType> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  as?: T;
  noPadding?: boolean;
}

type SpotlightCardComponent = <T extends React.ElementType = "div">(
  props: SpotlightCardProps<T> &
    Omit<React.ComponentPropsWithoutRef<T>, keyof SpotlightCardProps<T>>,
) => React.ReactElement | null;

const SpotlightCard: SpotlightCardComponent = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.1)",
  as,
  noPadding = false,
  ...props
}) => {
  const Component = as || "div";
  const divRef = useRef<HTMLElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);

  const handleMouseMove: React.MouseEventHandler<HTMLElement> = (e) => {
    if (!divRef.current || isFocused) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.6);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(0.6);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <Component
      // biome-ignore lint/suspicious/noExplicitAny: Need to cast ref for polymorphic component
      ref={divRef as React.Ref<any>}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${styles.card} ${noPadding ? styles.noPadding : ""} ${className}`}
      {...props}
    >
      <div
        className={styles.spotlight}
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      <div style={{ position: "relative", zIndex: 2, height: "100%" }}>{children}</div>
    </Component>
  );
};

export default SpotlightCard;

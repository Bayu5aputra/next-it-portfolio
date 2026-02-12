"use client";

import React, { useEffect, useRef, useMemo } from "react";

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
                charRefs.current.forEach((charSpan) => {
                    if (!charSpan) return;

                    const rect = charSpan.getBoundingClientRect();
                    const charCenterX = rect.left + rect.width / 2;
                    const charCenterY = rect.top + rect.height / 2;

                    const distance = Math.sqrt(
                        Math.pow(mouseX - charCenterX, 2) + Math.pow(mouseY - charCenterY, 2)
                    );

                    let newWeight = fromWeight;
                    if (distance < radius) {
                        const ratio = 1 - distance / radius;
                        // Use nonlinear easing for smoother feel (optional, but nice)
                        // const easedRatio = ratio * ratio; 
                        newWeight = fromWeight + (toWeight - fromWeight) * ratio;
                    }

                    charSpan.style.fontWeight = String(newWeight);
                });
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [fromWeight, toWeight, radius]);

    // Flatten logic for ref assignment
    let charIndexCounter = 0;

    return (
        <span
            ref={containerRef}
            className={className}
            onClick={onClick}
            style={{
                cursor: onClick ? "pointer" : "default",
                display: "inline", // Allow container to flow normally
            }}
            aria-label={label}
        >
            {words.map((word, wordIndex) => (
                <span
                    key={wordIndex}
                    style={{ display: "inline-block", whiteSpace: "nowrap" }}
                >
                    {word.split("").map((char, charIndex) => {
                        const currentRefIndex = charIndexCounter++;
                        return (
                            <span
                                key={charIndex}
                                ref={(el) => { charRefs.current[currentRefIndex] = el; }}
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
                        <span style={{ display: "inline" }}> </span>
                    )}
                </span>
            ))}
        </span>
    );
};

export default VariableProximity;

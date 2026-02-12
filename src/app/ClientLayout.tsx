"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import {
    Background,
    Column,
    Flex,
    Meta,
    opacity,
    RevealFx,
    SpacingToken,
} from "@once-ui-system/core";
import { Footer, Header, RouteGuard, Providers } from "@/components";
import { Splash } from "@/components/Splash";

export default function ClientLayout({
    children,
    fonts,
    style,
    dataStyle,
    effects, // We need effects passed down
}: {
    children: React.ReactNode;
    fonts: any;
    style: any;
    dataStyle: any;
    effects: any;
}) {
    const pathname = usePathname();
    const [showSplash, setShowSplash] = useState(true);
    const [isContentVisible, setIsContentVisible] = useState(false);

    useEffect(() => {
        // Reset splash state on navigation
        setShowSplash(true);
        setIsContentVisible(false);
    }, [pathname]);

    const getSplashTitle = () => {
        if (!pathname || pathname === "/") return "next-it Portfolio";

        // Remove leading slash and capitalize
        const segment = pathname.split("/")[1];
        if (!segment) return "next-it Portfolio";

        // Handle explicit cases requested by user, or generic fallback
        return segment.charAt(0).toUpperCase() + segment.slice(1);
    };

    return (
        <Flex
            suppressHydrationWarning
            as="html"
            lang="en"
            fillWidth
            className={classNames(
                fonts.heading.variable,
                fonts.body.variable,
                fonts.label.variable,
                fonts.code.variable,
            )}
        >
            <head>
                <script
                    id="theme-init"
                    dangerouslySetInnerHTML={{
                        __html: `
              (function() {
                try {
                  const root = document.documentElement;
                  const defaultTheme = 'system';
                  
                  // Set defaults from config
                  const config = ${JSON.stringify({
                            brand: style.brand,
                            accent: style.accent,
                            neutral: style.neutral,
                            solid: style.solid,
                            "solid-style": style.solidStyle,
                            border: style.border,
                            surface: style.surface,
                            transition: style.transition,
                            scaling: style.scaling,
                            "viz-style": dataStyle.variant,
                        })};
                  
                  // Apply default values
                  Object.entries(config).forEach(([key, value]) => {
                    root.setAttribute('data-' + key, value);
                  });
                  
                  // Resolve theme
                  const resolveTheme = (themeValue) => {
                    if (!themeValue || themeValue === 'system') {
                      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    }
                    return themeValue;
                  };
                  
                  // Apply saved theme
                  const savedTheme = localStorage.getItem('data-theme');
                  const resolvedTheme = resolveTheme(savedTheme);
                  root.setAttribute('data-theme', resolvedTheme);
                  
                  // Apply any saved style overrides
                  const styleKeys = Object.keys(config);
                  styleKeys.forEach(key => {
                    const value = localStorage.getItem('data-' + key);
                    if (value) {
                      root.setAttribute('data-' + key, value);
                    }
                  });
                } catch (e) {
                  console.error('Failed to initialize theme:', e);
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
                    }}
                />
            </head>
            <Providers>
                <Column
                    as="body"
                    background="page"
                    fillWidth
                    style={{ minHeight: "100vh" }}
                    margin="0"
                    padding="0"
                    horizontal="center"
                >
                    {showSplash && (
                        <Splash
                            title={getSplashTitle()}
                            onFadeOutStart={() => setIsContentVisible(true)}
                            onComplete={() => setShowSplash(false)}
                        />
                    )}
                    <Flex
                        fillWidth
                        direction="column"
                        style={{ alignItems: 'center' }}
                        key={isContentVisible ? "visible" : "hidden"}
                    >
                        <RevealFx fill position="absolute">
                            <Background
                                mask={{
                                    x: effects.mask.x,
                                    y: effects.mask.y,
                                    radius: effects.mask.radius,
                                    cursor: effects.mask.cursor,
                                }}
                                gradient={{
                                    display: effects.gradient.display,
                                    opacity: effects.gradient.opacity as opacity,
                                    x: effects.gradient.x,
                                    y: effects.gradient.y,
                                    width: effects.gradient.width,
                                    height: effects.gradient.height,
                                    tilt: effects.gradient.tilt,
                                    colorStart: effects.gradient.colorStart,
                                    colorEnd: effects.gradient.colorEnd,
                                }}
                                dots={{
                                    display: effects.dots.display,
                                    opacity: effects.dots.opacity as opacity,
                                    size: effects.dots.size as SpacingToken,
                                    color: effects.dots.color,
                                }}
                                grid={{
                                    display: effects.grid.display,
                                    opacity: effects.grid.opacity as opacity,
                                    color: effects.grid.color,
                                    width: effects.grid.width,
                                    height: effects.grid.height,
                                }}
                                lines={{
                                    display: effects.lines.display,
                                    opacity: effects.lines.opacity as opacity,
                                    size: effects.lines.size as SpacingToken,
                                    thickness: effects.lines.thickness,
                                    angle: effects.lines.angle,
                                    color: effects.lines.color,
                                }}
                            />
                        </RevealFx>
                        <Flex fillWidth minHeight="16" s={{ hide: true }} />
                        <Header />
                        <Flex zIndex={0} fillWidth padding="l" horizontal="center" flex={1}>
                            <Flex horizontal="center" fillWidth minHeight="0">
                                <RouteGuard>{children}</RouteGuard>
                            </Flex>
                        </Flex>
                        <Footer />
                    </Flex>
                </Column>
            </Providers>
        </Flex>
    );
}

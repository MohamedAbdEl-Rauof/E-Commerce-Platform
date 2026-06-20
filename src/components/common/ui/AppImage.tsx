"use client";

import React from "react";
import Image from "next/image";

interface AppImageProps {
    src?: string | null;
    alt: string;
    /** CSS aspect-ratio string, e.g. "1/1", "4/3", "16/9". Defaults to a square. */
    ratio?: string;
    /** How the image fills its box. "cover" crops (default), "contain" letterboxes. */
    fit?: "cover" | "contain";
    /** Tailwind/utility classes applied to the wrapper (sizing, radius, shadow, etc.). */
    className?: string;
    /** Responsive sizes hint for next/image. */
    sizes?: string;
    priority?: boolean;
    /** Extra styles merged into the wrapper. */
    style?: React.CSSProperties;
}

/**
 * Single, consistent image primitive for the whole app.
 *
 * Renders a ratio-locked, overflow-hidden box and lets next/image `fill` the box
 * with `object-fit` applied — so images never stretch regardless of their source
 * dimensions. Replaces the mix of legacy `layout="fill" objectFit=""` and ad-hoc
 * fixed width/height usages across the codebase.
 */
const AppImage: React.FC<AppImageProps> = ({
    src,
    alt,
    ratio = "1/1",
    fit = "cover",
    className = "",
    sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw",
    priority = false,
    style,
}) => {
    return (
        <div
            className={`relative overflow-hidden ${className}`}
            style={{ aspectRatio: ratio, backgroundColor: "var(--surface)", ...style }}
        >
            {src ? (
                <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes={sizes}
                    priority={priority}
                    style={{ objectFit: fit }}
                />
            ) : null}
        </div>
    );
};

export default AppImage;

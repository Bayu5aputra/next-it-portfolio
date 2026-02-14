"use client";

import { MasonryGrid, Media } from "@once-ui-system/core";

type GalleryImage = {
  src: string;
  alt: string;
  orientation: "horizontal" | "vertical";
};

const galleryImages: GalleryImage[] = [
  { src: "/images/gallery/horizontal-1.jpg", alt: "Gallery image 1", orientation: "horizontal" },
  { src: "/images/gallery/horizontal-2.jpg", alt: "Gallery image 2", orientation: "horizontal" },
  { src: "/images/gallery/horizontal-3.jpg", alt: "Gallery image 3", orientation: "horizontal" },
  { src: "/images/gallery/horizontal-4.jpg", alt: "Gallery image 4", orientation: "horizontal" },
  { src: "/images/gallery/vertical-1.jpg", alt: "Gallery image 5", orientation: "vertical" },
  { src: "/images/gallery/vertical-2.jpg", alt: "Gallery image 6", orientation: "vertical" },
  { src: "/images/gallery/vertical-3.jpg", alt: "Gallery image 7", orientation: "vertical" },
  { src: "/images/gallery/vertical-4.jpg", alt: "Gallery image 8", orientation: "vertical" },
];

export default function GalleryView() {
  return (
    <MasonryGrid columns={2} s={{ columns: 1 }}>
      {galleryImages.map((image, index) => (
        <Media
          enlarge
          priority={index < 10}
          sizes="(max-width: 560px) 100vw, 50vw"
          key={image.src}
          radius="m"
          aspectRatio={image.orientation === "horizontal" ? "16 / 9" : "3 / 4"}
          src={image.src}
          alt={image.alt}
        />
      ))}
    </MasonryGrid>
  );
}

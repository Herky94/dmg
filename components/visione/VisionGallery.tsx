"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
}

const images: GalleryImage[] = [
  {
    src: "/images/visione-1.webp",
    alt: "Visione Gallery 1",
  },
  {
    src: "/images/visione-2.webp",
    alt: "Visione Gallery 2",
  },
  {
    src: "/images/visione-3.webp",
    alt: "Visione Gallery 3",
  },
  {
    src: "/images/visione-4.webp",
    alt: "Visione Gallery 4",
  },
];

// CSS for animations
const animationStyles = `
  @keyframes lightboxBackdropFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes lightboxBackdropFadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes lightboxContentZoomIn {
    from {
      opacity: 0;
      transform: scale(0.75) translateY(20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @keyframes lightboxContentZoomOut {
    from {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
    to {
      opacity: 0;
      transform: scale(0.75) translateY(20px);
    }
  }

  @keyframes slideOutLeft {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(-40px);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideOutRight {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(40px);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .lightbox-backdrop {
    animation: lightboxBackdropFadeIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .lightbox-backdrop-closing {
    animation: lightboxBackdropFadeOut 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .lightbox-content {
    animation: lightboxContentZoomIn 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .lightbox-content-closing {
    animation: lightboxContentZoomOut 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .slide-left {
    animation: slideOutLeft 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .slide-right {
    animation: slideOutRight 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .image-enter-left {
    animation: slideInLeft 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .image-enter-right {
    animation: slideInRight 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
`;

export default function VisionGallery() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(
    null,
  );

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setIsAnimating(true);
    setSlideDirection(null);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setSelectedImageIndex(null);
      document.body.style.overflow = "unset";
    }, 300);
  };

  const goToPrevious = () => {
    setSlideDirection("right");
    setTimeout(() => {
      setSelectedImageIndex((prev) =>
        prev === 0 ? images.length - 1 : prev! - 1,
      );
      setSlideDirection(null);
    }, 150);
  };

  const goToNext = () => {
    setSlideDirection("left");
    setTimeout(() => {
      setSelectedImageIndex((prev) =>
        prev === images.length - 1 ? 0 : prev! + 1,
      );
      setSlideDirection(null);
    }, 150);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
  };

  return (
    <>
      <style jsx>{animationStyles}</style>

      {/* Gallery Section */}
      <section className="w-full bg-white py-20">
        <div className="w-full px-0">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-0">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden group cursor-pointer h-full"
                onClick={() => openLightbox(index)}
              >
                {/* Image */}
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  quality={100}
                />

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 z-50 ${
              isAnimating ? "lightbox-backdrop" : "lightbox-backdrop-closing"
            }`}
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.95)",
            }}
            onClick={closeLightbox}
          />

          {/* Content */}
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            onKeyDown={handleKeyDown}
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white hover:text-[#C34069] transition-colors z-50 p-2 cursor-pointer pointer-events-auto"
              aria-label="Close lightbox"
            >
              <X size={32} strokeWidth={1.5} />
            </button>

            <div
              className={`relative w-full h-full flex items-center justify-center max-w-6xl pointer-events-auto ${
                isAnimating ? "lightbox-content" : "lightbox-content-closing"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Previous Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-4 md:left-8 text-white hover:text-[#C34069] transition-colors p-2 z-50 cursor-pointer"
                aria-label="Previous image"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Image */}
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={images[selectedImageIndex].src}
                  alt={images[selectedImageIndex].alt}
                  fill
                  className={`object-contain ${
                    slideDirection === "left"
                      ? "slide-left"
                      : slideDirection === "right"
                        ? "slide-right"
                        : "image-enter-right"
                  }`}
                  quality={100}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 md:right-8 text-white hover:text-[#C34069] transition-colors p-2 z-50 cursor-pointer"
                aria-label="Next image"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-sm">
                {selectedImageIndex + 1} / {images.length}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

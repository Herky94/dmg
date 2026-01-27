"use client";

import Image from "next/image";

interface PageHeroProps {
  title: React.ReactNode;
  description?: string;
  backgroundImage: string;
  enableBlur?: boolean;
  actionButton?: React.ReactNode;
  className?: string; // Allow custom classes (e.g. for height)
  contentAlignment?: "center" | "end";
  showScrollIndicator?: boolean;
}

export default function PageHero({
  title,
  description,
  backgroundImage,
  enableBlur = true,
  actionButton,
  className,
  contentAlignment = "end",
  showScrollIndicator = false,
}: PageHeroProps) {
  const handleScrollDown = () => {
    const heroSection = document.querySelector("section");
    if (heroSection) {
      const nextSection = heroSection.nextElementSibling;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      className={`relative w-full overflow-hidden flex items-center ${
        className || "h-screen"
      }`}
    >
      {/* Background Image with Blur */}
      {backgroundImage ? (
        <div
          className={`absolute inset-0 bg-cover bg-center z-0 scale-105 ${
            enableBlur ? "blur-[2px]" : ""
          }`}
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-black z-0" />
      )}

      {/* Overlay - Black 33% */}
      <div className="absolute inset-0 bg-black/33 z-10" />

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <button
          onClick={handleScrollDown}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-bounce border border-white rounded-full p-1.5 hover:border-gray-300 transition-colors cursor-pointer bg-transparent"
          aria-label="Scroll to next section"
        >
          <Image
            src="/images/usefull-icons/down.svg"
            alt="Scroll Down"
            width={16}
            height={16}
            className="w-4 h-4 pt-[1px]"
          />
        </button>
      )}

      {/* Content */}
      <div
        className={`relative z-20 container-dmg ${
          contentAlignment === "center" ? "" : "mt-60"
        }`}
      >
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center ${
            contentAlignment === "center" ? "lg:items-center" : "lg:items-end"
          }`}
        >
          {/* Title */}
          <h1 className="text-5xl md:text-6xl lg:text-[70px] xl:text-[110px] 2xl:text-[150px] font-thin text-white leading-[1.1]">
            {title}
          </h1>

          {/* Description */}
          <div>
            {description && (
              <p
                className={`text-white/90 text-base md:text-lg lg:text-base xl:text-xl 2xl:text-[20px] font-light leading-relaxed max-w-xl lg:max-w-md xl:max-w-xl ${
                  actionButton ? "mb-8" : ""
                }`}
              >
                {description}
              </p>
            )}
            {actionButton}
          </div>
        </div>
      </div>
    </section>
  );
}

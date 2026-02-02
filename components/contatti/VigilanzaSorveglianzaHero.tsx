"use client";

import Image from "next/image";

interface VigilanzaSorveglianzaHeroProps {
  title: string;
  description?: string;
}

export default function VigilanzaSorveglianzaHero({
  title,
  description,
}: VigilanzaSorveglianzaHeroProps) {
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
    <section className="relative h-[60vh] min-h-[500px] w-full flex items-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/at.webp')",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-dmg pt-16">
        <div
          className={`${
            description
              ? "grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-16 xl:gap-20"
              : "flex flex-col"
          } items-center`}
        >
          {/* Title */}
          <h1 className="text-5xl md:text-6xl lg:text-[70px] xl:text-[110px] 2xl:text-[150px] font-thin text-white leading-[1.1]">
            {title.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                {index < title.split("\n").length - 1 && <br />}
              </span>
            ))}
          </h1>

          {/* Description */}
          {description && (
            <div>
              <p className="text-white/90 text-base md:text-lg lg:text-base xl:text-xl 2xl:text-[20px] font-light leading-relaxed max-w-xl lg:max-w-md xl:max-w-xl">
                {description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
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
    </section>
  );
}

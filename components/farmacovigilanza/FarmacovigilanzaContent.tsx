"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FarmacovigilanzaForm from "./FarmacovigilanzaForm";

interface FarmacovigilanzaContentProps {
  subtitle: string;
  description: string;
  cards: string[];
  bottomText: string;
}

export default function FarmacovigilanzaContent({
  subtitle,
  description,
  cards,
  bottomText,
}: FarmacovigilanzaContentProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const totalCards = cards.length;

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % totalCards);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating, totalCards]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating, totalCards]);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [handleNext]);

  const handleCardClick = (index: number) => {
    if (isAnimating) return;

    const currentPos = (index - currentIndex + totalCards) % totalCards;

    if (currentPos === 1) {
      handleNext();
    } else if (currentPos === totalCards - 1) {
      handlePrev();
    }
  };

  const getCardStyle = (index: number) => {
    const position = (index - currentIndex + totalCards) % totalCards;

    // Center card (active)
    if (position === 0) {
      return {
        transform: "translateX(0%) translateZ(0px) rotateY(0deg) scale(1)",
        opacity: 1,
        zIndex: 50,
        pointerEvents: "auto" as const,
      };
    }
    // Right card (next)
    else if (position === 1) {
      return {
        transform:
          "translateX(70%) translateZ(-200px) rotateY(-25deg) scale(0.85)",
        opacity: 0.7,
        zIndex: 40,
        pointerEvents: "auto" as const,
      };
    }
    // Left card (previous)
    else if (position === totalCards - 1) {
      return {
        transform:
          "translateX(-70%) translateZ(-200px) rotateY(25deg) scale(0.85)",
        opacity: 0.7,
        zIndex: 40,
        pointerEvents: "auto" as const,
      };
    }
    // Hidden cards (behind the center card)
    else {
      return {
        transform:
          "translateX(0%) translateZ(-400px) rotateY(0deg) scale(0.75)",
        opacity: 0,
        zIndex: 30,
        pointerEvents: "none" as const,
      };
    }
  };

  return (
    <section className="bg-[#F5F5F5]">
      {/* Top Section: Title and Subtitle */}
      <div className="pt-[100px] container-dmg">
        <div className="max-w-[1600px] mx-auto text-center max-w-5xl mx-auto">
          <p className="text-[12px] text-[#C34069] font-medium mb-[30px] uppercase tracking-wider">
            {subtitle}
          </p>
          <h2 className="text-[32px] md:text-[42px] lg:text-[52px] text-black leading-[1.1] font-light">
            {description}
          </h2>
        </div>
      </div>

      {/* 3D Cards Carousel Section */}
      <div className="pt-[80px] pb-[130px] lg:px-20 overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col items-center">
            {/* 3D Carousel */}
            <div className="relative w-full h-[440px] lg:h-[500px] mb-6 lg:mb-8">
              <div
                className="relative w-full h-full"
                style={{
                  perspective: "2000px",
                  perspectiveOrigin: "50% 50%",
                }}
              >
                {cards.map((text, idx) => {
                  const style = getCardStyle(idx);
                  const position =
                    (idx - currentIndex + totalCards) % totalCards;
                  const bg = idx % 2 === 0 ? "bg-[#C34069]" : "bg-[#E03F82]";

                  return (
                    <div
                      key={idx}
                      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] lg:w-[420px] h-[310px] lg:h-[360px] rounded-[30px] lg:rounded-[50px] text-white shadow-2xl transition-all duration-700 ease-out ${
                        bg
                      } ${
                        position === 1 || position === totalCards - 1
                          ? "cursor-pointer hover:shadow-3xl"
                          : ""
                      }`}
                      style={{
                        transform: style.transform,
                        opacity: style.opacity,
                        zIndex: style.zIndex,
                        pointerEvents: style.pointerEvents,
                      }}
                      onClick={() => handleCardClick(idx)}
                    >
                      <div className="p-8 lg:p-14 h-full flex items-center justify-center">
                        <p className="text-[18px] lg:text-[22px] font-light leading-relaxed text-center">
                          {text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={handlePrev}
                disabled={isAnimating}
                className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#C34069] text-white flex items-center justify-center hover:bg-[#E03F82] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg active:scale-95"
                aria-label="Previous"
              >
                <ChevronLeft size={24} className="lg:w-7 lg:h-7" />
              </button>
              <button
                onClick={handleNext}
                disabled={isAnimating}
                className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#C34069] text-white flex items-center justify-center hover:bg-[#E03F82] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg active:scale-95"
                aria-label="Next"
              >
                <ChevronRight size={24} className="lg:w-7 lg:h-7" />
              </button>
            </div>

            {/* Indicators */}
            <div className="flex gap-2">
              {cards.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setCurrentIndex(idx);
                      setTimeout(() => setIsAnimating(false), 600);
                    }
                  }}
                  className={`h-1 rounded-full transition-all ${
                    idx === currentIndex
                      ? "w-12 bg-[#C34069]"
                      : "w-8 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to card ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Paragraph Section */}
      <div className="pb-[100px] px-5 lg:px-32">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[15px] lg:text-[16px] text-black leading-relaxed font-light text-left">
            {bottomText}
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="pb-[100px] container-dmg">
        <div className="max-w-[1400px] mx-auto">
          <FarmacovigilanzaForm />
        </div>
      </div>

      {/* Full Width Image */}
      <div className="w-full h-[575px] relative overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/bg-contatti.png')",
          }}
        />
      </div>
    </section>
  );
}

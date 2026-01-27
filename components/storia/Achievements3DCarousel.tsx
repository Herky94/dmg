"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AchievementCard {
  number: string;
  label: string;
  sub: string;
  bg: string;
}

interface Achievements3DCarouselProps {
  title?: string;
  description?: string;
  cards?: AchievementCard[];
}

const defaultAchievements = [
  {
    number: "+23",
    label: "Brevetti",
    sub: "in 76+ Paesi",
    bg: "bg-[#C34069]",
  },
  {
    number: "+34",
    label: "Prodotti",
    sub: "in svariate forme farmaceutiche e presentazioni",
    bg: "bg-[#E03F82]",
  },
  {
    number: "4",
    label: "Aree Terapeutiche",
    sub: "Otorinolaringoiatria, Pediatria, Oftalmologia, Gastroenterologia",
    bg: "bg-[#C34069]",
  },
  {
    number: "+50",
    label: "Paesi",
    sub: "in cui sono distribuiti i nostri prodotti",
    bg: "bg-[#E03F82]",
  },
];

export default function Achievements3DCarousel({
  title = "Cosa abbiamo raggiunto fino ad oggi.",
  description = "Attraverso le fasi di pianificazione, organizzazione, controllo e analisi dei risultati, il nostro team R&D gestisce progetti pionieristici, essenziali per creare quel valore aggiunto che ha consentito di registrare negli anni una crescita costante.",
  cards = defaultAchievements,
}: Achievements3DCarouselProps = {}) {
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

    // Click on right card (next card)
    if (currentPos === 1) {
      handleNext();
    }
    // Click on left card (previous card)
    else if (currentPos === totalCards - 1) {
      handlePrev();
    }
  };

  // Calculate position and style for each card
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
    <section className="py-8 lg:py-16 bg-[#F5F5F5] overflow-hidden">
      <div className="container-dmg">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col 2xl:flex-row gap-8 lg:gap-20 items-center">
            {/* Left Text Section */}
            <div className="w-full 2xl:w-[45%] text-left">
              <h2 className="text-[36px] lg:text-[64px] leading-tight mb-4 lg:mb-6 text-black font-normal">
                {title}
              </h2>
              <p className="text-[15px] lg:text-[18px] font-normal text-black/80 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Right 3D Carousel Section */}
            <div className="w-full 2xl:w-[55%] flex flex-col items-center">
              <div className="relative w-full h-[380px] lg:h-[520px] mb-6 lg:mb-8 px-8 lg:px-12">
                <div
                  className="relative w-full h-full"
                  style={{
                    perspective: "2000px",
                    perspectiveOrigin: "50% 50%",
                  }}
                >
                  {cards.map((item, idx) => {
                    const style = getCardStyle(idx);
                    const position =
                      (idx - currentIndex + totalCards) % totalCards;

                    return (
                      <div
                        key={idx}
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] lg:w-[420px] h-[310px] lg:h-[440px] rounded-[30px] lg:rounded-[50px] text-white shadow-2xl transition-all duration-700 ease-out ${
                          item.bg
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
                        <div className="p-8 lg:p-14 h-full flex flex-col justify-center">
                          <span className="text-[48px] lg:text-[72px] font-light leading-none mb-2 lg:mb-3 block">
                            {item.number}
                          </span>
                          <span className="text-[24px] lg:text-[36px] font-normal leading-tight mb-3 lg:mb-5 block">
                            {item.label}
                          </span>
                          <p className="text-[13px] lg:text-[15px] font-light opacity-90 leading-relaxed">
                            {item.sub}
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
                  aria-label="Previous achievement"
                >
                  <ChevronLeft size={24} className="lg:w-7 lg:h-7" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={isAnimating}
                  className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#C34069] text-white flex items-center justify-center hover:bg-[#E03F82] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg active:scale-95"
                  aria-label="Next achievement"
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
                    aria-label={`Go to achievement ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

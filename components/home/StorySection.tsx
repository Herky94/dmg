"use client";
import { useRef, useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StorySectionProps {
  title: string;
  description: string;
  timeline: Array<{
    year: string;
    subtitle: string;
  }>;
}

export default function StorySection({
  title,
  description,
  timeline,
}: StorySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scrollBarRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Gestione scroll con GSAP ScrollTrigger
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cardsContainer = cardsContainerRef.current;
      const container = containerRef.current;
      const scrollBar = scrollBarRef.current;
      const cards = cardsRef.current.filter((c) => c !== null);

      if (!cardsContainer || !container) return;

      const getScrollAmount = () => {
        const containerWidth = container.offsetWidth;
        const cardsWidth = cardsContainer.scrollWidth;
        const padding = 32; // Safety buffer
        return cardsWidth - containerWidth + padding;
      };

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const scrollAmount = getScrollAmount();
        // Solo se c'è contenuto da scrollare
        if (scrollAmount > 0) {
          const mainTl = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: () => `+=${scrollAmount}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          // 1. Move Cards Container
          mainTl.to(
            cardsContainer,
            {
              x: () => -scrollAmount,
              ease: "none",
              duration: 1,
            },
            0,
          );

          // 2. Animate ScrollBar width
          if (scrollBar) {
            mainTl.fromTo(
              scrollBar,
              { width: "0%" },
              {
                width: "100%",
                ease: "none",
                duration: 1,
              },
              0,
            );
          }

          // 3. Highlight Logic synced to timeline progress
          // Calculate when each card intersects the pointer
          // Logic: cardOffset - p * scrollAmount = p * containerWidth
          // cardOffset = p * (scrollAmount + containerWidth)
          // p = cardOffset / (scrollAmount + containerWidth)
          const totalDistance = scrollAmount + container.offsetWidth;

          cards.forEach((card, i) => {
            if (!card) return;
            const yearText = card.querySelector(".year-text");
            // Use precise offset calculation
            const cardX = card.offsetLeft;

            // Define "active zone" width in terms of progress (e.g. 0.15 = 15% of scroll)
            // Wider zone = longer duration of highlight
            const zone = 0.08; // Reduced to avoid overlapping animations

            // Offset logic: The user felt it was "too early".
            // Shifting the target point into the card (e.g. +80px) aligns the peak
            // more with the visual center/mass of the date text.
            const p = (cardX + 80) / totalDistance;

            const startNode = Math.max(0, p - zone / 2);
            // We want peak at 'p'. ensure valid times.

            // Animation: Grey -> Magenta (peak) -> Grey
            // Insert into main timeline

            // To Active
            mainTl.fromTo(
              yearText,
              { color: "#9CA3AF", scale: 1 },
              {
                color: "#C34069",
                scale: 1.5,
                duration: zone / 2,
                ease: "power2.out",
              },
              startNode,
            );

            // To Inactive
            mainTl.to(
              yearText,
              {
                color: "#9CA3AF",
                scale: 1,
                duration: zone / 2,
                ease: "power2.in",
              },
              startNode + zone / 2,
            );
          });
        }
      });

      mm.add("(max-width: 1023px)", () => {
        const scrollAmount = getScrollAmount();
        if (scrollAmount > 0) {
          const mobileTl = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: () => `+=${scrollAmount}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          // 1. Move Cards Container
          mobileTl.to(
            cardsContainer,
            {
              x: () => -scrollAmount,
              ease: "none",
              duration: 1,
            },
            0,
          );

          // 2. Animate ScrollBar width
          if (scrollBar) {
            mobileTl.fromTo(
              scrollBar,
              { width: "0%" },
              {
                width: "100%",
                ease: "none",
                duration: 1,
              },
              0,
            );
          }

          // 3. Highlight Logic for Mobile (same as desktop)
          const totalDistance = scrollAmount + container.offsetWidth;

          cards.forEach((card, i) => {
            if (!card) return;
            const yearText = card.querySelector(".year-text");
            const cardX = card.offsetLeft;

            const zone = 0.08;
            const p = (cardX + 80) / totalDistance;
            const startNode = Math.max(0, p - zone / 2);

            // To Active
            mobileTl.fromTo(
              yearText,
              { color: "#9CA3AF", scale: 1 },
              {
                color: "#C34069",
                scale: 1.5,
                duration: zone / 2,
                ease: "power2.out",
              },
              startNode,
            );

            // To Inactive
            mobileTl.to(
              yearText,
              {
                color: "#9CA3AF",
                scale: 1,
                duration: zone / 2,
                ease: "power2.in",
              },
              startNode + zone / 2,
            );
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [timeline]);

  // Animazione iniziale del titolo e testo
  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      );
    }
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power2.out" },
      );
    }
  }, []);

  return (
    <div className="">
      <section ref={containerRef} className="relative h-screen bg-transparent">
        <div className="h-full flex flex-col justify-center container-dmg overflow-hidden">
          <div className="w-full flex flex-col">
            {/* Header Section */}
            <div className="mb-0">
              <div className="flex justify-center mb-8">
                <h2
                  ref={titleRef}
                  className="text-5xl lg:text-9xl font-extralight text-black text-center"
                >
                  {title}
                </h2>
              </div>

              <div className="flex justify-center">
                <div className="max-w-3xl mx-auto">
                  <div
                    ref={textRef}
                    className="text-base lg:text-lg text-black leading-relaxed text-left"
                  >
                    <p>{description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Bar */}
            <div className="w-full mt-[55px] mb-12">
              <div className="relative">
                {/* Linea grigia di sfondo */}
                <div className="w-full h-[2px] bg-gray-300 relative">
                  {/* Barra di progresso che si riempie */}
                  <div
                    ref={scrollBarRef}
                    className="absolute left-0 top-0 h-full bg-[#C34069] transition-none max-w-full"
                    style={{ width: "0%" }}
                  >
                    {/* Circle Pointer at the end of the bar */}
                    <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#C34069] border-2 border-white shadow-sm" />
                  </div>
                </div>
              </div>
            </div>

            {/* Cards Section */}
            <div className="w-full overflow-hidden">
              <div
                ref={cardsContainerRef}
                className="flex gap-16 w-max pl-[20vw] pr-[30vw]"
              >
                {timeline.map((card, index) => (
                  <div
                    key={index}
                    ref={(el) => {
                      cardsRef.current[index] = el;
                    }}
                    className="w-[300px] lg:w-[400px] flex-shrink-0"
                  >
                    <div className="rounded-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="year-text text-[#9CA3AF] font-light text-[48px] lg:text-[64px] transition-colors duration-300 origin-left">
                          {card.year}
                        </div>
                      </div>
                      <p className="text-black font-extralight text-[15px] lg:text-[18px] leading-relaxed">
                        {card.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

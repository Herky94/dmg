"use client";

import { useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useParams } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

// CSS custom per simulare group hover sui pulsanti
const customButtonStyles = `
  .custom-button:hover .button-circle {
    background-color: white;
  }
  
  .custom-button:hover .button-arrow {
    transform: rotate(45deg);
    color: #C34069;
  }
`;

interface ProductsSectionProps {
  preTitle: string;
  title: string;
  description: string;
  dm: {
    title: string;
    description: string;
    cta: string;
  };
  ia: {
    title: string;
    description: string;
    cta: string;
  };
  farmaci: {
    title: string;
    description: string;
    cta: string;
  };
}

export default function ProductsSection({
  preTitle,
  title,
  description,
  dm,
  ia,
  farmaci,
}: ProductsSectionProps) {
  const params = useParams();
  const locale = (params?.locale as string) || "it";

  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const preTitleRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);

  // Gestione Stacking Cards con GSAP
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current];

      cards.forEach((card, i) => {
        if (!card) return;

        ScrollTrigger.create({
          trigger: card,
          start: () => "top 120px", // Un po' più di margine per l'header
          endTrigger: containerRef.current,
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1, // Migliora la fluidità iniziale
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Imposta stati iniziali degli elementi
    if (preTitleRef.current) {
      gsap.set(preTitleRef.current, {
        opacity: 0,
        y: -50,
      });
    }

    if (titleRef.current) {
      gsap.set(titleRef.current, {
        opacity: 0,
        x: -200,
      });
    }

    if (paragraphRef.current) {
      gsap.set(paragraphRef.current, {
        opacity: 0,
        y: -30,
      });
    }

    // Intersection Observer per triggerare le animazioni
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
          // Timeline GSAP per sequenza di animazioni
          const tl = gsap.timeline();

          // 1. Pre-titolo dall'alto al basso
          if (preTitleRef.current) {
            tl.to(preTitleRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            });
          }

          // 2. Titolo da fuori schermo a sinistra
          if (titleRef.current) {
            tl.to(
              titleRef.current,
              {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out",
              },
              "-=0.2",
            );
          }

          // 3. Paragrafo dall'alto al basso
          if (paragraphRef.current) {
            tl.to(
              paragraphRef.current,
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
              },
              "-=0.3",
            );
          }
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="pt-30">
      <style jsx>{customButtonStyles}</style>
      <div className="container-dmg">
        {/* Pre-title */}
        <div ref={preTitleRef} className="text-center mb-4">
          <span className="text-sm text-[#BA1E5F] uppercase tracking-wider font-normal">
            {preTitle}
          </span>
        </div>

        {/* Main Title */}
        <div className="text-center mb-8">
          <h2
            ref={titleRef}
            className="text-5xl lg:text-9xl font-extralight text-black animate-fade-in-up"
            style={{ lineHeight: "0.9" }}
          >
            {title.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i < title.split("\n").length - 1 && <br />}
              </span>
            ))}
          </h2>
        </div>

        {/* Description */}
        <div className="text-center mb-12">
          <div ref={paragraphRef} className="max-w-4xl mx-auto text-left">
            <p className="text-black font-extralight text-lg leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Specialization Areas Section */}
      <SpecializationSection />

      <div className="container-dmg">
        {/* Product Cards con effetto scroll stacking - GSAP Driven */}
        <div ref={containerRef} className="relative pb-20">
          {/* Card 1 - Dispositivi medici */}
          <div
            ref={card1Ref}
            className="relative z-10 py-16 lg:py-30 overflow-hidden min-h-[500px] lg:min-h-[650px] 2xl:min-h-[800px] flex items-center rounded-[50px] mb-20 bg-white"
            style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
          >
            {/* Background Image with Blur */}
            <div className="absolute inset-0 z-0">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url('/images/dispositivi-medici-bg.jpg')",
                }}
              />
              <div className="absolute inset-0 backdrop-blur-[8px] bg-black/20" />
            </div>

            <div className="max-w-6xl mx-auto px-[30px] lg:px-20 relative z-10 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group cursor-pointer">
                <div className="space-y-6">
                  {/* Number Circle */}

                  {/* Title */}
                  <h3 className="text-2xl lg:text-[64px] font-extralight text-white leading-tight">
                    {dm.title.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < dm.title.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </h3>

                  {/* Button */}
                  <Link
                    href={`/${locale}/prodotti?classificazione=dispositivi-medici`}
                    className="flex items-center gap-3 border border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-[#C34069] transition-all duration-300 cursor-pointer w-fit custom-button"
                  >
                    <span className="text-sm font-extralight">{dm.cta}</span>
                    <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center button-circle transition-colors duration-300">
                      <svg
                        className="w-4 h-4 text-black button-arrow transition-all duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 17L17 7M17 7H7M17 7V17"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>

                {/* Description */}
                <div>
                  <p className="text-white leading-relaxed text-lg font-extralight">
                    {dm.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - Integratori alimentari */}
          <div
            ref={card2Ref}
            className="relative z-20 py-16 overflow-hidden min-h-[500px] lg:min-h-[650px] 2xl:min-h-[800px] flex items-center rounded-[50px] mb-20 bg-white"
            style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
          >
            {/* Background Image with Blur */}
            <div className="absolute inset-0 z-0">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('/images/integratori-alimentari-bg.jpg')",
                }}
              />
              <div className="absolute inset-0 backdrop-blur-[8px] bg-black/20" />
            </div>

            <div className="max-w-6xl mx-auto px-[30px] lg:px-20 relative z-10 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group cursor-pointer">
                <div className="space-y-6">
                  {/* Number Circle */}

                  {/* Title */}
                  <h3 className="text-2xl lg:text-[64px] font-extralight text-white leading-tight">
                    {ia.title.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < ia.title.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </h3>

                  {/* Button */}
                  <Link
                    href={`/${locale}/prodotti?classificazione=integratori-alimentari`}
                    className="flex items-center gap-3 border border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-[#C34069] transition-all duration-300 cursor-pointer w-fit custom-button"
                  >
                    <span className="text-sm font-extralight">{ia.cta}</span>
                    <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center button-circle transition-colors duration-300">
                      <svg
                        className="w-4 h-4 text-black button-arrow transition-all duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 17L17 7M17 7H7M17 7V17"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>

                {/* Description */}
                <div>
                  <p className="text-white leading-relaxed text-lg font-extralight">
                    {ia.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 - Farmaci */}
          <div
            ref={card3Ref}
            className="relative z-30 py-16 overflow-hidden min-h-[500px] lg:min-h-[650px] 2xl:min-h-[800px] flex items-center rounded-[50px] bg-white"
            style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
          >
            {/* Background Image with Blur */}
            <div className="absolute inset-0 z-0">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url('/images/dispositivi-medici-bg.jpg')",
                }}
              />
              <div className="absolute inset-0 backdrop-blur-[8px] bg-black/20" />
            </div>

            <div className="max-w-6xl mx-auto px-5 lg:px-20 relative z-10 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  {/* Number Circle */}

                  {/* Title */}
                  <h3 className="text-2xl lg:text-[64px] font-extralight text-white leading-tight">
                    {farmaci.title}
                  </h3>

                  {/* Button */}
                  <Link
                    href={`/${locale}/prodotti?classificazione=${locale === "en" ? "drug" : "farmaci"}`}
                    className="flex items-center gap-3 border border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-[#C34069] transition-all duration-300 cursor-pointer w-fit custom-button"
                  >
                    <span className="text-sm font-extralight">
                      {farmaci.cta}
                    </span>
                    <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center button-circle transition-colors duration-300">
                      <svg
                        className="w-4 h-4 text-black button-arrow transition-all duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 17L17 7M17 7H7M17 7V17"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>

                {/* Description */}
                <div>
                  <p className="text-white leading-relaxed text-lg font-extralight">
                    {farmaci.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Componente per la sezione delle specializzazioni
function SpecializationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const specializations = [
    {
      name: "Pediatria",
      image: "/images/pediatria.png",
    },
    {
      name: "Otorinolaringoiatria",
      image: "/images/otorinolaringoiatria.png",
    },
    {
      name: "Gastroenterologia",
      image: "/images/gastroenterologia.png",
    },
    {
      name: "Oftalmologia",
      image: "/images/oftalmologia.png",
    },
  ];

  useEffect(() => {
    // Imposta stati iniziali degli elementi
    itemsRef.current.forEach((item) => {
      if (item) {
        gsap.set(item, {
          opacity: 0,
          x: -100,
        });
      }
    });

    // Intersection Observer per triggerare le animazioni
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
          // Timeline GSAP per sequenza di animazioni con ritardo
          const tl = gsap.timeline({ delay: 0.8 });

          itemsRef.current.forEach((item, index) => {
            if (item) {
              tl.to(
                item,
                {
                  opacity: 1,
                  x: 0,
                  duration: 0.5,
                  ease: "power2.out",
                },
                index * 0.1,
              ); // Ritardo di 0.1s tra ogni elemento
            }
          });
        }
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5] },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 md:py-20 pb-30">
      <div className="container-dmg">
        {/* Grid delle specializzazioni */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {specializations.map((spec, index) => (
            <div
              key={spec.name}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className="text-center space-y-4 md:space-y-6"
            >
              {/* Logo del cigno */}
              <div className="flex justify-center">
                <img
                  src={spec.image}
                  alt={spec.name}
                  className="w-[180px] h-[135px] md:w-[280px] md:h-[195px] object-contain"
                />
              </div>

              {/* Nome specializzazione */}
              <h3 className="text-base md:text-xl font-light text-gray-900">
                {spec.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

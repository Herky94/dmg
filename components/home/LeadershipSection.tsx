"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { X } from "lucide-react";

interface LeadershipSectionProps {
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  name: string;
  title: string;
  imageAlt: string;
  playVideoAlt: string;
  videoNotSupported: string;
}

export default function LeadershipSection({
  paragraph1,
  paragraph2,
  paragraph3,
  name,
  title,
  imageAlt,
  playVideoAlt,
  videoNotSupported,
}: LeadershipSectionProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsClosing(true);
  };

  const onAnimationEnd = () => {
    if (isClosing) {
      setIsVideoOpen(false);
      setIsClosing(false);
    }
  };
  const paragraphRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Imposta stati iniziali degli elementi
    if (imageRef.current) {
      gsap.set(imageRef.current, {
        opacity: 0,
        x: 100,
      });
    }

    if (paragraphRef.current) {
      gsap.set(paragraphRef.current, {
        opacity: 0,
        y: -50,
      });
    }

    if (lineRef.current) {
      gsap.set(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left",
      });
    }

    if (nameRef.current) {
      gsap.set(nameRef.current, {
        opacity: 0,
        x: 100,
      });
    }

    // Intersection Observer per triggerare le animazioni
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          // Timeline GSAP per sequenza di animazioni
          const tl = gsap.timeline();

          // 1. Immagine appare da destra a sinistra
          tl.to(imageRef.current, {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: "power2.out",
          })

            // 2. Paragrafo appare dall'alto al basso
            .to(
              paragraphRef.current,
              {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
              },
              "-=0.3",
            ) // Inizia 0.3s prima che finisca l'animazione precedente

            // 3. Linea si disegna
            .to(
              lineRef.current,
              {
                scaleX: 1,
                duration: 0.8,
                ease: "power2.out",
              },
              "-=0.2",
            )

            // 4. Nome e titolo appaiono da destra a sinistra
            .to(
              nameRef.current,
              {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: "power2.out",
              },
              "-=0.2",
            );
        }
      },
      { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 lg:py-20">
      <div className="container-dmg">
        <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-20">
          {/* Photo - 50% width */}
          <div className="w-full lg:w-1/2 order-1 relative">
            <div
              ref={imageRef}
              className="group cursor-pointer overflow-hidden rounded-[30px] lg:rounded-[50px] w-full lg:absolute lg:inset-0 lg:h-full"
              onClick={() => setIsVideoOpen(true)}
            >
              <img
                src="/images/Luigi-Mercuri.jpg"
                alt={imageAlt}
                className="w-full h-auto lg:h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Play Overlay - Always visible on mobile (bottom-right), centered on desktop hover */}
              <div className="absolute inset-0 bg-black/20 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300">
                <div className="absolute bottom-4 right-4 lg:inset-0 lg:flex lg:items-center lg:justify-center">
                  <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-full border border-white flex items-center justify-center backdrop-blur-md transform scale-100 lg:scale-75 lg:group-hover:scale-100 transition-transform duration-300">
                    <img
                      src="/images/usefull-icons/play.svg"
                      alt={playVideoAlt}
                      className="w-6 h-6 lg:w-8 lg:h-8 ml-1" // ml-1 to visually center the play triangle
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Video Modal */}
          {isVideoOpen && (
            <div
              className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 ${
                isClosing ? "animate-fade-out" : "animate-fade-in"
              }`}
              onClick={handleClose}
              onAnimationEnd={(e) => {
                if (e.target === e.currentTarget) {
                  onAnimationEnd();
                }
              }}
            >
              <div
                className={`relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ${
                  isClosing ? "animate-zoom-out" : "animate-zoom-in"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 z-10 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-all"
                >
                  <X size={24} />
                </button>
                <video
                  src="/images/dmg-ceo.mp4"
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                >
                  {videoNotSupported}
                </video>
              </div>
            </div>
          )}

          {/* Content - 50% width */}
          <div className="w-full lg:w-1/2 order-2">
            <div>
              {/* Testo */}
              <div
                ref={paragraphRef}
                className="space-y-6 lg:space-y-8 text-black mb-8 lg:mb-12"
              >
                <p className="text-base lg:text-[18px] font-light leading-relaxed">
                  {paragraph1.split('"').map((part, i) => {
                    if (i === 1 || i === 3) {
                      return (
                        <span key={i} className="text-[#C34069]">
                          "{part}"
                        </span>
                      );
                    }
                    return part;
                  })}
                </p>

                <p className="text-base lg:text-[18px]  font-light leading-relaxed">
                  {paragraph2}
                </p>

                <p className="text-base lg:text-[18px]  font-light leading-relaxed">
                  {paragraph3.split("D.M.G. ITALIA").map((part, i) => {
                    if (i === 0) return <span key={i}>{part}</span>;
                    return (
                      <span key={i}>
                        <span className="text-[#C34069]">D.M.G. ITALIA</span>
                        {part}
                      </span>
                    );
                  })}
                </p>
              </div>

              {/* Separatore */}
              <div
                ref={lineRef}
                className="w-[50%] h-[1px] bg-[#D9D9D9] mb-6 lg:mb-8 origin-left"
              ></div>

              {/* Firma */}
              <div ref={nameRef} className="pt-4">
                <h3 className="text-base lg:text-[18px] font-normal text-black mb-1">
                  {name}
                </h3>
                <p className="text-base lg:text-[18px] font-light text-black">
                  {title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

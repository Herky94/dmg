"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface HeroProps {
  tagline: string;
  description: string;
  ctaText: string;
  ctaLink?: string;
}

export default function Hero({
  tagline,
  description,
  ctaText,
  ctaLink,
}: HeroProps) {
  const params = useParams();
  const locale = (params?.locale as string) || "it";
  const defaultCtaLink = `/${locale}/prodotti`;
  const finalCtaLink = ctaLink || defaultCtaLink;

  const [virtualScroll, setVirtualScroll] = useState(0);
  const [isScrollDisabled, setIsScrollDisabled] = useState(true);
  const [videoStarted, setVideoStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const touchStartY = useRef(0);
  const maxScrollForEffect = 150;

  useEffect(() => {
    // Tenta di avviare il video al mount
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        console.log("Autoplay blocked, waiting for interaction");
      });
    }

    // Check mobile/tablet - Disable scroll effect
    if (window.innerWidth < 1024) {
      if (isScrollDisabled) {
        setIsScrollDisabled(false);
        setVirtualScroll(maxScrollForEffect);
      }
      document.body.style.overflowY = "auto";
      document.body.style.height = "auto";
      document.body.style.position = "static";
      return;
    }

    // DISABILITA completamente lo scroll della pagina inizialmente
    if (isScrollDisabled) {
      document.body.style.overflowY = "hidden";
      document.body.style.height = "100dvh"; // Use dynamic viewport height for mobile
      document.body.style.position = "fixed"; // Force fixed to prevent scroll bounce
      document.body.style.width = "100%";
    } else {
      document.body.style.overflowY = "auto";
      document.body.style.height = "auto";
      document.body.style.position = "static";
    }

    const handleScrollLogic = (deltaY: number, event: Event) => {
      // Avvia il video al primo scroll se non ancora avviato
      if (!videoStarted && videoRef.current) {
        videoRef.current.play().catch(console.error);
        setVideoStarted(true);
      }

      if (isScrollDisabled) {
        if (event.cancelable) event.preventDefault();

        // Aggiorna il virtual scroll in base alla direzione
        setVirtualScroll((prev) => {
          let newScroll;
          const sensitivity = event.type.startsWith("touch") ? 2.5 : 0.5;

          if (deltaY > 0) {
            // Scroll verso il basso - aumenta il bianco
            newScroll = Math.min(
              prev + Math.abs(deltaY) * sensitivity,
              maxScrollForEffect,
            );
          } else {
            // Scroll verso l'alto - diminuisce il bianco (ritrae)
            newScroll = Math.max(0, prev - Math.abs(deltaY) * sensitivity);
          }

          // Se raggiungiamo il 100%, riabilita lo scroll
          if (newScroll >= maxScrollForEffect) {
            setTimeout(() => {
              setIsScrollDisabled(false);
            }, 100);
          }

          return newScroll;
        });
      } else {
        // Quando lo scroll è abilitato, controlla se siamo in cima e scrolliamo verso l'alto
        if (window.scrollY === 0 && deltaY < 0) {
          if (event.cancelable) event.preventDefault();
          setIsScrollDisabled(true);
          const sensitivity = event.type.startsWith("touch") ? 2.5 : 0.5;
          // Inizia a ridurre il bianco dalla posizione attuale
          setVirtualScroll((prev) =>
            Math.max(0, prev - Math.abs(deltaY) * sensitivity),
          );
        }
      }
    };

    const handleWheel = (event: WheelEvent) => {
      handleScrollLogic(event.deltaY, event);
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY.current = event.touches[0].clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0].clientY;
      const deltaY = touchStartY.current - currentY;
      touchStartY.current = currentY;
      handleScrollLogic(deltaY, event);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      let deltaY = 0;
      if (event.key === "ArrowDown") deltaY = 100;
      else if (event.key === "ArrowUp") deltaY = -100;
      else if (event.key === "PageDown" || event.key === " ") deltaY = 300;
      else if (event.key === "PageUp") deltaY = -300;

      if (deltaY !== 0) {
        handleScrollLogic(deltaY, event);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflowY = "";
      document.body.style.height = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isScrollDisabled, maxScrollForEffect, videoStarted]);

  // Funzione per avviare il video al clic
  const handleVideoStart = () => {
    if (!videoStarted && videoRef.current) {
      videoRef.current.play().catch(console.error);
      setVideoStarted(true);
    }
  };

  // Calcola quante lettere devono essere bianche in base al virtual scroll
  const getLetterColor = (index: number) => {
    const scrollProgress = Math.min(
      virtualScroll / (maxScrollForEffect / tagline.length),
      tagline.length,
    );
    return index < scrollProgress ? "text-white" : "text-gray-700/50";
  };

  // "Quando serve cura." -> break after "Quando" (index 5)
  // "When care is needed." -> break after "When care" (index 8)
  const breakIndex = tagline.includes("care is needed") ? 8 : 5;

  return (
    <>
      <section
        className="relative h-screen flex items-center overflow-hidden cursor-pointer"
        onClick={handleVideoStart}
      >
        {/* Background Video */}
        <div className="absolute inset-0 bg-gray-900">
          <video
            ref={videoRef}
            className="w-full h-full object-cover animate-hero-zoom"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/bg-hero.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Leggerissimo overlay nero */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 container-dmg mt-60 pointer-events-none">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between w-full gap-8 lg:gap-0">
            {/* Tagline */}
            <div className="w-full lg:flex-1 pointer-events-auto">
              <h2
                className="hero-title font-sans text-5xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-light transition-colors duration-300"
                style={{ lineHeight: "0.9" }}
              >
                {tagline.split("").map((letter, index) => (
                  <span key={index}>
                    <span
                      className={`transition-colors duration-500 ${getLetterColor(
                        index,
                      )}`}
                    >
                      {letter}
                    </span>
                    {index === breakIndex && <br />}
                  </span>
                ))}
              </h2>
            </div>

            {/* Description and CTA */}
            <div className="w-full max-w-md lg:w-auto lg:max-w-sm space-y-6 pointer-events-auto">
              <p className="  text-white leading-tight">{description}</p>

              {/* CTA Button */}
              <div>
                <Link
                  href={finalCtaLink}
                  className="group inline-flex items-center gap-3 bg-transparent border border-white text-white px-6 py-3 rounded-full text-base font-extralight hover:bg-[#C34069] hover:text-white hover:border-[#C34069] transition-all duration-300"
                >
                  <span>{ctaText}</span>
                  <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center group-hover:bg-white transition-all duration-300">
                    <svg
                      className="w-4 h-4 text-black transform transition-transform duration-300 group-hover:rotate-45 group-hover:text-[#C34069]"
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

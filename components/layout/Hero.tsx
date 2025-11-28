"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Hero() {
  const [virtualScroll, setVirtualScroll] = useState(0);
  const [isScrollDisabled, setIsScrollDisabled] = useState(true);
  const [videoStarted, setVideoStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const touchStartY = useRef(0);
  const tagline = "Quando serve cura.";
  const maxScrollForEffect = 150;

  useEffect(() => {
    // Tenta di avviare il video al mount
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        console.log("Autoplay blocked, waiting for interaction");
      });
    }

    // DISABILITA completamente lo scroll della pagina inizialmente
    if (isScrollDisabled) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
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
              maxScrollForEffect
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
            Math.max(0, prev - Math.abs(deltaY) * sensitivity)
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

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
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
      tagline.length
    );
    return index < scrollProgress ? "text-white" : "text-gray-700/50";
  };

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
        <div className="absolute inset-0 z-10 flex flex-col justify-end pb-10 px-[30px] lg:pb-30 lg:px-20 pointer-events-none">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between w-full gap-8 lg:gap-0">
            {/* Tagline */}
            <div className="w-full lg:flex-1 pointer-events-auto">
              <h2
                className="hero-title font-lexend-deca text-5xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-light transition-colors duration-300"
                style={{ lineHeight: "0.9" }}
              >
                {tagline.split("").map((letter, index) => (
                  <span key={index}>
                    <span
                      className={`transition-colors duration-500 ${getLetterColor(
                        index
                      )}`}
                    >
                      {letter}
                    </span>
                    {index === 6 && <br />}
                  </span>
                ))}
              </h2>
            </div>

            {/* Description and CTA */}
            <div className="w-full lg:w-auto lg:max-w-sm space-y-6 pointer-events-auto">
              <p className="text-sm text-white leading-relaxed">
                Offriamo soluzioni terapeutiche innovative, sicure ed efficaci a
                pazienti e a operatori sanitari, nonché nuove opportunità di
                business ad aziende farmaceutiche italiane ed estere.
              </p>

              {/* CTA Button */}
              <div>
                <Link
                  href="/azienda"
                  className="group inline-flex items-center gap-3 bg-transparent border border-white text-white px-6 py-3 rounded-full text-base font-medium hover:bg-[#C34069] hover:text-white hover:border-[#C34069] transition-all duration-300"
                >
                  <span>Scopri il nostro impegno</span>
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

      {/* Logo Accessibilità Fixed */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          className="bg-white/90 backdrop-blur-sm hover:bg-white p-1 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Accessibilità"
          title="Opzioni di accessibilità"
        >
          <img
            src="/images/usefull-icons/ax.svg"
            alt="Accessibilità"
            className="w8 h-8"
          />
        </button>
      </div>
    </>
  );
}

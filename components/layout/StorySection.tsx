"use client";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StorySection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentCardSet, setCurrentCardSet] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Timeline aziendale DMG Italia - 12 eventi divisi in 3 set da 4
  const allCards = [
    // Set 1 (1993-2003)
    {
      year: "1993",
      subtitle:
        "Viene pubblicata sulla GUCE La Direttiva CEE 93/42 sui dispositivi medici (abbreviata in MDD 93/42). NASCE D.M.G. ITALIA S.R.L. fondata da Luigi Mercuri e Antonio De Nisi.",
    },
    {
      year: "1997",
      subtitle:
        "La Direttiva 93/42 è attuata in Italia con il Decreto Legislativo 24 febbraio 1997, n. 46.",
    },
    {
      year: "2000",
      subtitle:
        "D.M.G. ITALIA si prepara, pioneristicamente, al lancio sul mercato italiano di RINOPANTEINA, primo dispositivo medico a marchio CE che inaugura il campo dell'otorinolaringoiatria nel portafoglio D.M.G. ITALIA.",
    },
    {
      year: "2002",
      subtitle:
        "D.M.G. ITALIA si afferma nel campo dell'oftalmologia con VISCOBLAST.",
    },

    // Set 2 (2003-2014)
    {
      year: "2003",
      subtitle:
        "Il portafoglio di prodotti di D.M.G. ITALIA si espande nell'area della gastroenterologia con il lancio di GASTROTUSS.",
    },
    {
      year: "2004",
      subtitle:
        "D.M.G. ITALIA firma il suo primo contratto di distribuzione estera e, nello stesso anno, trasferisce la sua sede da Roma a Pomezia, inaugurando il suo primo sito produttivo: Italdevice.",
    },
    {
      year: "2009-2012",
      subtitle:
        "Nascono a breve distanza l'una dall'altra DMG Bulgaria, prima filiale estera, a Sofia, DMG Turchia, a Istanbul e DMG Polonia a Varsavia.",
    },
    {
      year: "2014",
      subtitle: "D.M.G. ITALIA inaugura il suo nuovo magazzino.",
    },

    // Set 3 (2015-2024)
    {
      year: "2015",
      subtitle:
        "Vista la forte crescita, D.M.G. ITALIA trasferisce nuovamente i suoi uffici nell'attuale sede di via Nicaragua (Pomezia).",
    },
    {
      year: "2017",
      subtitle:
        "Il 25 maggio 2017 entra in vigore il Regolamento europeo sui dispositivi medici MDR con il 26 maggio 2021 come data di applicazione. E' destinato a sostituire l'MDD.",
    },
    {
      year: "2018",
      subtitle:
        "D.M.G. ITALIA si mette subito al lavoro per ricertificare i suoi prodotti secondo MDR.",
    },
    {
      year: "2024",
      subtitle:
        "Con la crescente presenza sul mercato italiano ed estero, D.M.G. ITALIA avvia un processo di notevole ampliamento dei suoi spazi destinati sia agli uffici sia alla produzione.",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(window.innerWidth < 1024 ? 2 : 4);
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSteps = Math.max(0, allCards.length - visibleCards);

  // Gestione scroll con GSAP ScrollTrigger
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * 1.5}`, // 1.5 volte l'altezza della viewport per lo scroll
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress * 100);

          const newCardSet = Math.min(
            Math.floor(progress * (totalSteps + 1)),
            totalSteps
          );

          setCurrentCardSet(newCardSet);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [totalSteps]);

  // Animazione iniziale del titolo e testo
  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power2.out" }
      );
    }
  }, []);

  // Card attualmente visibili
  const currentCards = allCards.slice(
    currentCardSet,
    currentCardSet + visibleCards
  );

  return (
    <div className="bg-[#f1f1f1]">
      <section ref={containerRef} className="relative h-screen">
        <div className="h-full flex flex-col justify-center overflow-hidden px-[30px] lg:px-20">
          <div className="w-full flex flex-col">
            {/* Header Section */}
            <div className="mb-0">
              <div className="flex justify-center mb-8">
                <h2
                  ref={titleRef}
                  className="text-5xl md:text-7xl lg:text-9xl font-extralight text-black text-center"
                >
                  milestones.
                </h2>
              </div>

              <div className="flex justify-center">
                <div className="max-w-3xl mx-auto">
                  <div
                    ref={textRef}
                    className="text-base lg:text-lg text-black leading-relaxed text-left"
                  >
                    <p>
                      La nostra storia inizia nel 1993 con una visione chiara:
                      portare innovazione nel settore dei dispositivi medici.
                      Dalla fondazione ad oggi, abbiamo costruito un percorso di
                      crescita costante e internazionalizzazione. Ogni milestone
                      rappresenta un passo verso l'eccellenza. La nostra
                      timeline racconta come siamo diventati leader nel settore,
                      espandendoci in Europa e innovando continuamente i nostri
                      processi produttivi.
                    </p>
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
                    className="absolute left-0 top-0 h-full bg-[#C34069] transition-all duration-100 ease-out"
                    style={{ width: `${scrollProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Cards Section */}
            <div className="w-full">
              <div
                className={`grid gap-8 ${
                  visibleCards <= 2 ? "grid-cols-2" : "grid-cols-4"
                }`}
              >
                {currentCards.map((card, index) => {
                  const isActive =
                    visibleCards <= 2 ? index === 0 : index === 1;
                  return (
                    <div
                      key={`${currentCardSet}-${index}`}
                      className="transform transition-all duration-700 ease-out"
                    >
                      <div className=" rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className={`transition-all duration-300 ${
                              isActive
                                ? "text-[#C34069] font-medium text-[48px] lg:text-[64px]"
                                : "text-[#D4D4D4] font-medium text-[32px] lg:text-[40px]"
                            }`}
                          >
                            {card.year}
                          </div>
                        </div>
                        <p className="text-black font-extralight text-[15px] lg:text-[18px] leading-relaxed">
                          {card.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

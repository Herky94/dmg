"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HistoryTimelineProps {
  preTitle?: string;
  description?: string;
}

export default function HistoryTimeline({
  preTitle = "Chi siamo",
  description = "Siamo un'azienda farmaceutica italiana specializzata nella ricerca, sviluppo e commercializzazione di dispositivi medici, integratori alimentari e farmaci. Il nostro obiettivo principale è quello di offrire soluzioni terapeutiche innovative, sicure ed efficaci a pazienti e a operatori sanitari, nonché nuove opportunità di business ad aziende farmaceutiche italiane ed estere. Condividiamo con i nostri partner un solido know-how, acquisito negli anni, per aiutarli a sviluppare il loro business in tutto il mondo.",
}: HistoryTimelineProps = {}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;

    if (!section || !text) return;

    const words = text.querySelectorAll(".word");

    gsap.fromTo(
      words,
      { opacity: 0.3 },
      {
        opacity: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "top 20%",
          scrub: 1,
        },
      },
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#DFDFDF] pt-20 pb-10 z-30"
      style={{ marginTop: "-100vh" }}
    >
      <div className="container-dmg">
        <div className="max-w-[1600px] mx-auto">
          <div className="w-full">
            <p className="text-[12px] text-[#C34069] font-medium mb-[30px] uppercase tracking-wider">
              {preTitle}
            </p>
            <p
              ref={textRef}
              className="text-[33px] leading-tight font-light text-black"
            >
              {description.split(" ").map((word, i) => (
                <span key={i} className="word inline-block mr-2 opacity-30">
                  {word}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

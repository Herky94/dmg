"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Milestone {
  year: string;
  text: string;
}

interface MilestonesProps {
  title?: string;
  description?: string;
  milestones?: Milestone[];
}

const defaultMilestones = [
  {
    year: "1993",
    text: "Viene pubblicata sulla GUCE La Direttiva CEE 93/42 sui dispositivi medici (abbreviata in MDD 93/42). NASCE D.M.G. ITALIA S.R.L. fondata da Luigi Mercuri e Antonio De Nisi.",
  },
  {
    year: "1997",
    text: "La Direttiva 93/42 è attuata in Italia con il Decreto Legislativo 24 febbraio 1997, n. 46.",
  },
  {
    year: "2000",
    text: "D.M.G. ITALIA si prepara, pionieristicamente, al lancio sul mercato italiano di RINOPANTEINA, primo dispositivo medico a marchio CE che inaugura il campo dell'otorinolaringoiatria nel portafoglio D.M.G. ITALIA.",
  },
  {
    year: "2002",
    text: "D.M.G. ITALIA si afferma nel campo dell'oftalmologia con VISCOBLAST.",
  },
];

export default function Milestones({
  title = "Le tappe principali",
  description = "La storia di D.M.G. ITALIA",
  milestones = defaultMilestones,
}: MilestonesProps = {}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const container = containerRef.current;
    const line = lineRef.current;

    if (!section || !left || !container || !line) return;

    const ctx = gsap.context(() => {
      // Pinning Left Side only on Desktop
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": function () {
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            pin: left,
            pinSpacing: false,
            scrub: true,
          });
        },
      });

      // Line animation
      gsap.fromTo(
        line,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top center",
            end: "bottom center",
            scrub: 0.5,
          },
        },
      );

      // Items animation
      itemsRef.current.forEach((item) => {
        if (!item) return;

        const year = item.querySelector(".year");
        const text = item.querySelector(".text");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 60%",
            end: "bottom 40%",
            toggleActions: "play reverse play reverse",
          },
        });

        tl.to(year, { color: "#C34069", scale: 1.5, duration: 0.3 }).to(
          text,
          { opacity: 1, duration: 0.3 },
          "<",
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#DFDFDF] pt-0 pb-20 relative z-40">
      <div className="container-dmg">
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row items-start">
          {/* Left Sticky */}
          <div
            ref={leftRef}
            className="lg:w-[50%] w-full flex flex-col justify-center lg:h-screen h-auto lg:pr-32 pr-0 lg:items-end items-start text-left mb-12 lg:mb-0 pt-20 lg:pt-0"
          >
            <div className="max-w-md w-full">
              <h2 className="text-[42px] lg:text-[64px] leading-tight mb-6 text-black font-extralight">
                {title}
              </h2>
              <p className="text-[16px] lg:text-[17px] font-extralight text-black leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {/* Right Timeline */}
          <div
            ref={containerRef}
            className="lg:w-[50%] w-full relative lg:pl-32 pl-8 border-l-[5px] border-gray-300 py-10 lg:py-[20vh]"
          >
            {/* Magenta Line Overlay */}
            <div
              ref={lineRef}
              className="absolute left-[-5px] top-0 w-[5px] bg-[#C34069] h-0"
            >
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-5 h-5 rounded-full bg-[#C34069] border-[3px] border-white shadow-sm"
                style={{ boxShadow: "0 0 0 2px #C34069" }}
              />
            </div>

            <div className="flex flex-col gap-20 lg:gap-32 py-10 lg:py-20">
              {milestones.map((m, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    itemsRef.current[i] = el;
                  }}
                  className="relative"
                >
                  <span className="year block text-[48px] lg:text-[64px] font-extralight text-[#9CA3AF] transition-all origin-left leading-none">
                    {m.year}
                  </span>
                  <p className="text text-[16px] lg:text-[17px] mt-4 text-black font-extralight leading-snug transition-opacity max-w-[300px]">
                    {m.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CountersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const countersRef = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hasAnimated, setHasAnimated] = useState(false);

  const counters = [
    {
      value: 23,
      suffix: "+",
      title: "Brevetti",
      description: "in 76+ Paesi",
    },
    {
      value: 34,
      suffix: "+",
      title: "Prodotti",
      description: "in svariate forme farmaceutiche e presentazioni",
    },
    {
      value: 4,
      suffix: "",
      title: "Aree Terapeutiche",
      description:
        "Otorinolaringoiatria, Pediatria, Oftalmologia, Gastroenterologia",
    },
    {
      value: 50,
      suffix: "+",
      title: "Paesi",
      description: "in cui sono distribuiti i nostri prodotti",
    },
  ];

  useEffect(() => {
    // Imposta stati iniziali degli elementi
    countersRef.current.forEach((counter) => {
      if (counter) {
        gsap.set(counter, {
          opacity: 0,
          y: 50,
        });
      }
    });

    // Intersection Observer per triggerare le animazioni
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          entry.intersectionRatio >= 0.3 &&
          !hasAnimated
        ) {
          setHasAnimated(true);

          // Timeline GSAP per sequenza di animazioni
          const tl = gsap.timeline();

          countersRef.current.forEach((counter, index) => {
            if (counter) {
              // Anima la card
              tl.to(
                counter,
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: "power2.out",
                },
                index * 0.2
              );

              // Anima il numero
              const numberEl = numberRefs.current[index];
              const counterData = counters[index];

              if (numberEl) {
                const obj = { val: 0 };
                gsap.to(obj, {
                  val: counterData.value,
                  duration: 2,
                  ease: "power2.out",
                  delay: index * 0.2, // Sincronizza con l'apparizione della card
                  onUpdate: () => {
                    numberEl.innerText =
                      Math.floor(obj.val) + counterData.suffix;
                  },
                });
              }
            }
          });
        }
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5] }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="pb-20 bg-[#f1f1f1] mt-0 md:-mt-40 lg:-mt-20 relative z-10"
    >
      <div className="mx-auto px-[30px] lg:px-20">
        {/* Grid dei counter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {counters.map((counter, index) => (
            <div
              key={counter.title}
              ref={(el) => {
                countersRef.current[index] = el;
              }}
              className={`flex flex-col justify-start p-[30px] lg:p-[50px] w-full max-w-[300px] lg:max-w-[360px] h-[350px] lg:h-[450px] rounded-[70px] text-white ${
                index % 2 === 0 ? "bg-[#C34069]" : "bg-[#E03F82]"
              }`}
            >
              {/* Numero principale */}
              <div
                ref={(el) => {
                  numberRefs.current[index] = el;
                }}
                className="text-[64px] font-light leading-none mb-[10px]"
              >
                0{counter.suffix}
              </div>

              {/* Titolo */}
              <div className="text-[30px] font-light leading-tight mb-[20px]">
                {counter.title}
              </div>

              {/* Descrizione */}
              <p className="text-[18px] font-extralight leading-relaxed">
                {counter.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

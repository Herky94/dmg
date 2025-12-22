"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function LeadershipSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
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
              "-=0.3"
            ) // Inizia 0.3s prima che finisca l'animazione precedente

            // 3. Linea si disegna
            .to(
              lineRef.current,
              {
                scaleX: 1,
                duration: 0.8,
                ease: "power2.out",
              },
              "-=0.2"
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
              "-=0.2"
            );
        }
      },
      { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-[#E5E5E5]">
      <div className="mx-auto px-[30px] lg:px-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Photo - 50% width */}
          <div className="w-full lg:w-1/2 order-1">
            <div ref={imageRef} className="relative">
              <img
                src="/images/Luigi-Mercuri.jpg"
                alt="Luigi Mercuri - CEO & Managing Director"
                className="w-full h-auto object-cover rounded-[50px]"
              />
            </div>
          </div>

          {/* Content - 50% width */}
          <div className="w-full lg:w-1/2 order-2">
            <div className="lg:pl-10">
              {/* Testo */}
              <div ref={paragraphRef} className="space-y-8 text-black mb-12">
                <p className="text-[20px] italic font-light leading-relaxed">
                  «Il nostro impegno, sintetizzato nel pay-off{" "}
                  <span className="text-[#C34069]">"Quando serve cura"</span>, è
                  costantemente rivolto a migliorare la qualità della vita e la
                  salute delle persone. Proponiamo, infatti, un approccio alla
                  tutela della salute secondo cui "Non si cura la malattia ma il
                  paziente"»
                </p>

                <p className="text-[20px] italic font-light leading-relaxed">
                  Innovazione, creatività e la costante ricerca di nuove
                  soluzioni sono i pilastri sui quali poggiamo i nostri
                  laboratori di Ricerca e Sviluppo, composti da un team di
                  professionisti e dotati di apparecchiature all'avanguardia
                  che, anno dopo anno, permettono una crescita costante.
                </p>

                <p className="text-[20px] italic font-light leading-relaxed">
                  L'entusiasmo, l'onestà e la volontà di innovare sono le
                  qualità fondamentali attraverso cui{" "}
                  <span className="text-[#C34069]">D.M.G. ITALIA</span> promuove
                  il progresso e la crescita dei propri dipendenti e
                  collaboratori, favorendo un clima di trasparenza e di
                  inclusione.
                </p>
              </div>

              {/* Separatore */}
              <div
                ref={lineRef}
                className="w-[50%] h-[1px] bg-[#D9D9D9] mb-8 origin-left"
              ></div>

              {/* Firma */}
              <div ref={nameRef} className="pt-4">
                <h3 className="text-[30px] font-normal text-black mb-1">
                  Luigi Mercuri
                </h3>
                <p className="text-[30px] font-light text-black">
                  CEO & Managing Director
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

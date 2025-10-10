"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

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

export default function ProductsSection() {
 const sectionRef = useRef<HTMLElement>(null);
 const preTitleRef = useRef<HTMLDivElement>(null);
 const titleRef = useRef<HTMLDivElement>(null);
 const paragraph1Ref = useRef<HTMLDivElement>(null);
 const paragraph2Ref = useRef<HTMLDivElement>(null);
 const paragraph3Ref = useRef<HTMLDivElement>(null);

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

  if (paragraph1Ref.current) {
   gsap.set(paragraph1Ref.current, {
    opacity: 0,
    y: -30,
   });
  }

  if (paragraph2Ref.current) {
   gsap.set(paragraph2Ref.current, {
    opacity: 0,
    y: -30,
   });
  }

  if (paragraph3Ref.current) {
   gsap.set(paragraph3Ref.current, {
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
     tl
      .to(preTitleRef.current, {
       opacity: 1,
       y: 0,
       duration: 0.8,
       ease: "power2.out",
      })

      // 2. Titolo da fuori schermo a sinistra
      .to(
       titleRef.current,
       {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power2.out",
       },
       "-=0.3"
      )

      // 3. Paragrafo 1 dall'alto al basso
      .to(
       paragraph1Ref.current,
       {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
       },
       "-=0.2"
      )

      // 4. Paragrafo 2 dall'alto al basso
      .to(
       paragraph2Ref.current,
       {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
       },
       "-=0.6"
      )

      // 5. Paragrafo 3 dall'alto al basso
      .to(
       paragraph3Ref.current,
       {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
       },
       "-=0.6"
      );
    }
   },
   { threshold: 0.1 }
  );

  if (sectionRef.current) {
   observer.observe(sectionRef.current);
  }

  return () => observer.disconnect();
 }, []);

 return (
  <section ref={sectionRef} className="pt-30">
   <style jsx>{customButtonStyles}</style>
   <div className="mx-auto px-20">
    {/* Pre-title */}
    <div ref={preTitleRef} className="text-center mb-4">
     <span className="text-sm text-gray-500 uppercase tracking-wider font-medium">
      Innovazione. Sicurezza. Efficacia.
     </span>
    </div>

    {/* Main Title */}
    <div className="text-center mb-8">
     <h2 className="text-8xl lg:text-9xl font-extralight text-gray-900 animate-fade-in-up">
      soluzioni terapeutiche.
     </h2>
    </div>

    {/* Description */}
    <div className="text-center mb-12">
     <div className="grid grid-cols-1 md:grid-cols-3 gap-18 max-w-6xl mx-auto px-8">
      {/* Column 1 */}
      <div ref={paragraph1Ref} className="text-justify">
       <p className="text-gray-700 leading-relaxed">
        Siamo un'azienda farmaceutica italiana specializzata nella ricerca,
        sviluppo e commercializzazione di dispositivi medici, integratori
        alimentari e farmaci.
       </p>
      </div>

      {/* Column 2 */}
      <div ref={paragraph2Ref} className="text-justify">
       <p className="text-gray-700 leading-relaxed">
        Il nostro obiettivo principale è quello di offrire soluzioni
        terapeutiche innovative, sicure ed efficaci a pazienti e a operatori
        sanitari, nonché nuove opportunità di business ad aziende farmaceutiche
        italiane ed estere.
       </p>
      </div>

      {/* Column 3 */}
      <div ref={paragraph3Ref} className="text-justify">
       <p className="text-gray-700 leading-relaxed">
        Condividiamo con i nostri partner un solido know-how, acquisito negli
        anni, per aiutarli a sviluppare il loro business in tutto il mondo.
       </p>
      </div>
     </div>
    </div>

    {/* Separator Line */}
    <div className="flex justify-center mb-20">
     <div className="w-24 h-px bg-gray-300"></div>
    </div>
   </div>

   
    {/* Specialization Areas Section */}
    <SpecializationSection />

   <div className="mx-auto">
    {/* Product Cards con effetto scroll stacking */}
    <div className="relative" style={{ height: "200vh" }}>
     {/* Card 1 - Dispositivi medici (Sticky Base) */}
     <div className="sticky top-20 z-10 bg-gray-50 py-30">
      <div className="max-w-6xl mx-auto px-20">
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group cursor-pointer">
        <div className="space-y-6">
         {/* Number Circle */}

         {/* Title */}
         <h3 className="text-2xl lg:text-3xl font-light text-gray-900">
          Dispositivi Medici
         </h3>

         {/* Description */}
         <p className="text-gray-700 leading-relaxed">
          I dispositivi medici rappresentano uno strumento essenziale per la
          prevenzione, la diagnosi e il trattamento delle patologie, garantendo
          standard elevati di sicurezza ed efficacia. Ogni area specialistica
          richiede soluzioni dedicate, progettate per rispondere alle esigenze
          specifiche di medici e pazienti.
         </p>

         {/* Button */}
         <div className="flex items-center gap-3 border border-[#C34069] text-[#C34069] px-6 py-3 rounded-full hover:bg-[#C34069] hover:text-white transition-all duration-300 cursor-pointer w-fit custom-button">
          <span className="text-sm font-medium">Scopri di più...</span>
          <div className="bg-[#C34069] rounded-full w-8 h-8 flex items-center justify-center button-circle transition-colors duration-300">
           <svg
            className="w-4 h-4 text-white button-arrow transition-all duration-300"
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
         </div>
        </div>

        {/* Image */}
        <div className="order-first lg:order-last">
         <div className="rounded-lg overflow-hidden">
          <img
           src="/images/at.webp"
           alt="Dispositivi Medici"
           className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-150"
          />
         </div>
        </div>
       </div>
      </div>
     </div>

     {/* Card 2 - Integratori alimentari (Sticky Overlay) */}
     <div className="sticky top-20 z-20 bg-gray-50 rounded-t-2xl py-16">
      <div className="max-w-6xl mx-auto px-20">
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group cursor-pointer">
        <div className="space-y-6">
         {/* Number Circle */}

         {/* Title */}
         <h3 className="text-2xl lg:text-3xl font-light text-gray-900">
          Integratori Alimentari
         </h3>

         {/* Description */}
         <p className="text-gray-700 leading-relaxed">
          Gli integratori alimentari sono formulazioni di nutrienti e altre
          sostanze con effetto fisiologico (vitamine, minerali, estratti
          botanici, probiotici, acidi grassi, aminoacidi) pensate per supportare
          il normale benessere quando l’alimentazione non è sufficiente a
          coprire specifici fabbisogni. Non sostituiscono una dieta equilibrata
          né terapie mediche; la loro efficacia dipende da formulazione,
          dosaggio, biodisponibilità e corretta aderenza.
         </p>

         {/* Button */}
         <div className="flex items-center gap-3 border border-[#C34069] text-[#C34069] px-6 py-3 rounded-full hover:bg-[#C34069] hover:text-white transition-all duration-300 cursor-pointer w-fit custom-button">
          <span className="text-sm font-medium">Scopri di più...</span>
          <div className="bg-[#C34069] rounded-full w-8 h-8 flex items-center justify-center button-circle transition-colors duration-300">
           <svg
            className="w-4 h-4 text-white button-arrow transition-all duration-300"
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
         </div>
        </div>

        {/* Image */}
        <div className="order-first lg:order-last">
         <div className="rounded-lg overflow-hidden">
          <img
           src="/images/at.webp"
           alt="Integratori Alimentari"
           className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-150"
          />
         </div>
        </div>
       </div>
      </div>
     </div>

     {/* Card 3 - Farmaci (Top Sticky Overlay) */}
     <div className="sticky top-20 z-30 bg-gray-50 rounded-t-2xl  py-16">
      <div className="max-w-6xl mx-auto px-20">
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
         {/* Number Circle */}

         {/* Title */}
         <h3 className="text-2xl lg:text-3xl font-light text-gray-900">
          Farmaci
         </h3>

         {/* Description */}
         <p className="text-gray-700 leading-relaxed">
          I farmaci sono sostanze con azione preventiva, diagnostica o
          terapeutica che agiscono su processi biologici specifici per
          ripristinare o modificare funzioni dell'organismo. La loro qualità,
          sicurezza ed efficacia sono garantite da rigorosi iter regolatori
          (AIC), controllo di produzione (GMP) e monitoraggio post-marketing
          (farmacovigilanza). L'uso corretto richiede prescrizione e controllo
          medico, rispetto di posologie e durate, attenzione alle interazioni e
          alle controindicazioni. L'automedicazione è limitata ai medicinali OTC
          e SOP, per disturbi lievi e temporanei.
         </p>

         {/* Button */}
         <div className="flex items-center gap-3 border border-[#C34069] text-[#C34069] px-6 py-3 rounded-full hover:bg-[#C34069] hover:text-white transition-all duration-300 cursor-pointer w-fit custom-button">
          <span className="text-sm font-medium">Scopri di più...</span>
          <div className="bg-[#C34069] rounded-full w-8 h-8 flex items-center justify-center button-circle transition-colors duration-300">
           <svg
            className="w-4 h-4 text-white button-arrow transition-all duration-300"
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
         </div>
        </div>

        {/* Image */}
        <div className="order-first lg:order-last">
         <div className="rounded-lg overflow-hidden group cursor-pointer">
          <img
           src="/images/at.webp"
           alt="Farmaci"
           className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-150"
          />
         </div>
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
   name: "Otorinolaringoiatra",
   image: "/images/otorinolaringoiatra.png",
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
    if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
     // Timeline GSAP per sequenza di animazioni con ritardo
     const tl = gsap.timeline();

     itemsRef.current.forEach((item, index) => {
      if (item) {
       tl.to(
        item,
        {
         opacity: 1,
         x: 0,
         duration: 0.8,
         ease: "power2.out",
        },
        index * 0.2
       ); // Ritardo di 0.2s tra ogni elemento
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
 }, []);

 return (
  <section ref={sectionRef} className="py-20 pb-30">
   <div className="mx-auto px-20">
    {/* Grid delle specializzazioni */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
     {specializations.map((spec, index) => (
      <div
       key={spec.name}
       ref={(el) => {
        itemsRef.current[index] = el;
       }}
       className="text-center space-y-6"
      >
       {/* Logo del cigno */}
       <div className="flex justify-center">
        <img
         src={spec.image}
         alt={spec.name}
         className="w-34 h-34 object-contain"
        />
       </div>

       {/* Nome specializzazione */}
       <h3 className="text-xl font-regular text-gray-900">{spec.name}</h3>
      </div>
     ))}
    </div>
   </div>
  </section>
 );
}

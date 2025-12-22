"use client";

import Link from "next/link";

export default function InternationalSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/AdobeStock_1571332070.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay per migliorare la leggibilità del testo */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-[30px] lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column: Title and Button */}
          <div className="flex flex-col items-start">
            {/* Title with line breaks */}
            <h1 className="text-5xl lg:text-[96px] font-[200] text-white leading-[1.1] mb-10">
              <span className="block">La nostra</span>
              <span className="block">vocazione</span>
              <span className="block">internazionale</span>
            </h1>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href="/scopri-di-piu"
                className="group inline-flex items-center gap-4 bg-transparent border border-white text-white px-10 py-3 rounded-full text-sm font-light hover:bg-white hover:text-[#C34069] transition-all duration-300"
              >
                <span>Scopri di più</span>
                <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center group-hover:bg-[#C34069]">
                  <svg
                    className="w-5 h-5 text-[#C34069] transform transition-transform duration-300 group-hover:rotate-45 group-hover:text-white"
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

          {/* Right Column: Paragraphs */}
          <div className="space-y-6 text-white font-extralight text-sm lg:text-[15px] leading-relaxed text-justify lg:text-left max-w-xl ml-auto">
            <p>
              Da azienda familiare profondamente radicata nel territorio
              italiano, negli anni abbiamo saputo evolvere in una realtà
              globale, portando nel mondo la nostra esperienza e la nostra
              visione, senza mai perdere il valore delle relazioni. Dal 2004
              abbiamo scelto di aprirci ai mercati internazionali,
              intraprendendo un percorso di crescita che oggi ci vede presenti
              in oltre 50 Paesi grazie a una rete solida e consolidata di
              Partner e Distributori.
            </p>

            <p>
              Operando in vari contesti culturali, lavoriamo sempre con
              sensibilità e rispetto verso le specificità locali, offrendo
              flessibilità nel rispondere alle diverse esigenze dei nostri
              Partner. Nonostante le distanze, garantiamo un supporto completo e
              costante: dall’elaborazione delle strategie di marketing
              all’assistenza negli aspetti regolatori e medico-scientifici, fino
              alla formazione dedicata alla forza vendita. Questo approccio
              collaborativo ci ha permesso di costruire con molti Distributori
              relazioni durature, fondate su fiducia, continuità e obiettivi
              condivisi.
            </p>

            <p>
              Guardiamo al futuro con la volontà di continuare ad ampliare la
              nostra rete internazionale. Per questo siamo sempre interessati a
              entrare in contatto con nuovi Partner che condividano i nostri
              valori e il desiderio di portare soluzioni affidabili e di qualità
              ai pazienti di tutto il mondo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

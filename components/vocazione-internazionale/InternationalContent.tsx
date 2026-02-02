"use client";

interface InternationalContentProps {
  title?: string;
  paragraph1?: string;
  paragraph2?: string;
  paragraph3?: string;
}

export default function InternationalContent({
  title = "La nostra\nvocazione\ninternazionale",
  paragraph1 = "Da azienda familiare profondamente radicata nel territorio italiano, negli anni abbiamo saputo evolvere in una realtà globale, portando nel mondo la nostra esperienza e la nostra visione, senza mai perdere il valore delle relazioni. Dal 2004 abbiamo scelto di aprirci ai mercati internazionali, intraprendendo un percorso di crescita che oggi ci vede presenti in oltre 50 Paesi grazie a una rete solida e consolidata di Partner e Distributori.",
  paragraph2 = "Operando in vari contesti culturali, lavoriamo sempre con sensibilità e rispetto verso le specificità locali, offrendo flessibilità nel rispondere alle diverse esigenze dei nostri Partner. Nonostante le distanze, garantiamo un supporto completo e costante: dall'elaborazione delle strategie di marketing all'assistenza negli aspetti regolatori e medico-scientifici, fino alla formazione dedicata alla forza vendita. Questo approccio collaborativo ci ha permesso di costruire con molti Distributori relazioni durature, fondate su fiducia, continuità e obiettivi condivisi.",
  paragraph3 = "Guardiamo al futuro con la volontà di continuare ad ampliare la nostra rete internazionale. Per questo siamo sempre interessati a entrare in contatto con nuovi Partner che condividano i nostri valori e il desiderio di portare soluzioni affidabili e di qualità ai pazienti di tutto il mondo.",
}: InternationalContentProps = {}) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden py-24 lg:py-0">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/video-sfera-dmg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay per migliorare la leggibilità del testo */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-dmg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 items-center">
          {/* Left Column: Title */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Title with line breaks */}
            <h1 className="text-5xl lg:text-[96px] font-[200] text-white leading-[1.1] mb-6 lg:mb-10">
              {title.split("\n").map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </div>

          {/* Right Column: Paragraphs */}
          <div className="space-y-6 text-white font-extralight text-sm lg:text-[15px] leading-relaxed text-center lg:text-left mx-auto lg:mx-0 lg:ml-auto">
            <p>{paragraph1}</p>
            <p>{paragraph2}</p>
            <p>{paragraph3}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

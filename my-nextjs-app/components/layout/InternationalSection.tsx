'use client'

import Link from 'next/link'

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
      <div className="relative z-10 w-full px-6 lg:px-20">
        <div className="max-w-2xl">
          {/* Title with line breaks */}
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-[2] text-white leading-[1] mb-10">
            <span className="block">La nostra vocazione</span>
            <span className="block">internazionale</span>
          </h1>

          {/* Paragraphs */}
          <div className="space-y-4 text-white/90 font-extralight">
            <p className="text-sm lg:text-base leading-[1.5]">
              Sin dalla sua internazionalizzazione nel 2004, D.M.G. ITALIA è sempre stata pronta ad accogliere nuovi partner che desiderano arricchire il loro portafoglio con prodotti unici. Grazie a una rete di distributori e filiali in continua crescita, l'azienda ha costruito negli anni una solida presenza internazionale, coprendo più di 50 paesi dentro e fuori l'Europa.
            </p>
            
            <p className="text-sm lg:text-base leading-[1.5]">
              Con l'obiettivo di stabilire partnership durature e fruttuose, D.M.G. ITALIA offre a tutti i suoi clienti la sua esperienza e le sue migliori qualità:
            </p>
            
            <p className="text-sm lg:text-base leading-[1.5]">
              Queste caratteristiche, insieme all'elevata qualità dei nostri prodotti, rendono D.M.G. ITALIA il partner di riferimento di oltre 25 aziende nel mondo. Con l'obiettivo di stabilire partnership durature e fruttuose, D.M.G. ITALIA offre a tutti i suoi clienti la sua esperienza e le sue migliori qualità:
            </p>
          </div>

          {/* CTA Button - styled like Hero button */}
          <div className="pt-6">
            <Link 
              href="/scopri-di-piu"
              className="group inline-flex items-center gap-3 bg-transparent border border-white text-white px-6 py-3 rounded-full text-base font-medium hover:bg-white hover:text-black transition-all duration-300"
            >
              <span>Scopri di più</span>
              <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
                <svg 
                  className="w-4 h-4 text-black transform transition-transform duration-300 group-hover:rotate-45" 
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
    </section>
  )
}
'use client'

import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative h-screen bg-black flex items-center">
      {/* Background Image Placeholder - Sostituisci con la tua immagine */}
      <div className="absolute inset-0 bg-black">
        {/* Qui andrà l'immagine di sfondo quando sarà pronta */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center">
        {/* Left Side - Main Title a 160px dal bordo sinistro */}
        <div className="absolute left-40 top-1/2 transform -translate-y-1/2">
          <h1 className="text-8xl lg:text-9xl xl:text-[10rem] font-light text-white leading-tight">
            Quando<br />
            <span>serve cura.</span>
          </h1>
        </div>
        
        {/* Right Side - Description and CTA a 160px dal bordo destro */}
        <div className="absolute right-40 top-1/2 transform -translate-y-1/2 space-y-6">
          <p className="text-sm text-gray-200 leading-relaxed max-w-sm">
            Offriamo soluzioni terapeutiche innovative, sicure ed efficaci a pazienti 
            e a operatori sanitari, nonché nuove opportunità di business ad aziende 
            farmaceutiche italiane ed estere.
          </p>
            
          {/* CTA Button */}
          <div>
            <Link 
              href="/azienda" 
              className="group inline-flex items-center gap-3 bg-transparent border border-white text-white px-6 py-3 rounded-full text-base font-medium hover:bg-white hover:text-black transition-all duration-300"
            >
              <span>Scopri il nostro impegno</span>
              <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
                <svg 
                  className="w-4 h-4 text-black transform transition-transform duration-300 group-hover:rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
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
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Hero() {
  const [virtualScroll, setVirtualScroll] = useState(0)
  const [isScrollDisabled, setIsScrollDisabled] = useState(true)
  const tagline = "Quando serve cura."
  const maxScrollForEffect = 150
  
  useEffect(() => {
    // DISABILITA completamente lo scroll della pagina inizialmente
    if (isScrollDisabled) {
      document.body.style.overflow = 'hidden'
      document.body.style.height = '100vh'
    } else {
      document.body.style.overflow = 'auto'
      document.body.style.height = 'auto'
    }
    
    const handleWheel = (event: WheelEvent) => {
      if (isScrollDisabled) {
        event.preventDefault()
        
        // Aggiorna il virtual scroll in base alla direzione
        setVirtualScroll(prev => {
          let newScroll
          
          if (event.deltaY > 0) {
            // Scroll verso il basso - aumenta il bianco
            newScroll = Math.min(prev + Math.abs(event.deltaY) * 0.5, maxScrollForEffect)
          } else {
            // Scroll verso l'alto - diminuisce il bianco (ritrae)
            newScroll = Math.max(0, prev - Math.abs(event.deltaY) * 0.5)
          }
          
          // Se raggiungiamo il 100%, riabilita lo scroll
          if (newScroll >= maxScrollForEffect) {
            setTimeout(() => {
              setIsScrollDisabled(false)
            }, 100)
          }
          
          return newScroll
        })
      } else {
        // Quando lo scroll è abilitato, controlla se siamo in cima e scrolliamo verso l'alto
        if (window.scrollY === 0 && event.deltaY < 0) {
          event.preventDefault()
          setIsScrollDisabled(true)
          // Inizia a ridurre il bianco dalla posizione attuale
          setVirtualScroll(prev => Math.max(0, prev - Math.abs(event.deltaY) * 0.5))
        }
      }
    }
    
    window.addEventListener('wheel', handleWheel, { passive: false })
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
      document.body.style.overflow = 'auto'
      document.body.style.height = 'auto'
    }
  }, [isScrollDisabled, maxScrollForEffect])

  // Calcola quante lettere devono essere bianche in base al virtual scroll
  const getLetterColor = (index: number) => {
    const scrollProgress = Math.min(virtualScroll / (maxScrollForEffect / tagline.length), tagline.length)
    return index < scrollProgress ? 'text-white' : 'text-gray-500'
  }

  return (
    <>
      <section className="relative h-screen bg-black flex items-center">
        {/* Background Image Placeholder - Sostituisci con la tua immagine */}
        <div className="absolute inset-0 bg-black">
          {/* Qui andrà l'immagine di sfondo quando sarà pronta */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 w-full h-full flex items-center">
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

        {/* Tagline ancorata al bottom a sinistra */}
        <div className="absolute bottom-0 left-0 pb-30 pl-20">
          <h2 
            className="text-6xl lg:text-6l xl:text-[10rem] max-w-[60%] font-light transition-colors duration-300"
            style={{ lineHeight: 1 }}
          >
            {tagline.split('').map((letter, index) => (
              <span 
                key={index} 
                className={`transition-colors duration-500 ${getLetterColor(index)}`}
              >
                {letter}
              </span>
            ))}
          </h2>
        </div>
      </section>

      {/* Logo Accessibilità Fixed */}
      <div className="fixed bottom-6 left-6 z-50">
        <button 
          className="bg-white/90 backdrop-blur-sm hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Accessibilità"
          title="Opzioni di accessibilità"
        >
          <svg 
            className="w-6 h-6 text-gray-800" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </button>
      </div>
    </>
  )
}
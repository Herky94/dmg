'use client'

import { useEffect, useRef } from 'react'

export default function ParallaxBuildingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !imageRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calcola la progressione dello scroll - inizia l'effetto prima che la sezione sia visibile
      const offsetStart = windowHeight * 0.5 // Inizia quando la sezione è ancora 30% sotto il viewport
      const scrollProgress = Math.max(0, Math.min(1, 
        (windowHeight + offsetStart - rect.top) / (windowHeight + rect.height + offsetStart)
      ))

      // Effetto parallasse: l'immagine si muove più lentamente dello scroll
      const parallaxOffset = scrollProgress * 100 - 50 // Da -50px a +50px
      
      // Effetto zoom: l'immagine si ingrandisce da 100% a 120%
      const scale = 1 + (scrollProgress * 0.2) // Da 1 a 1.2
      
      // Effetto larghezza: da 80% a 100%
      const width = 80 + (scrollProgress * 20) // Da 80% a 100%
      
      // Calcola il left per mantenere sempre centrato
      const leftOffset = 50 - (width / 2) // Centra sempre l'immagine

      // Applica gli effetti
      imageRef.current.style.transform = `translateX(-50%) translateY(${parallaxOffset}px) scale(${scale})`
      imageRef.current.style.width = `${width}%`
      imageRef.current.style.left = '50%'
    }

    // Aggiungi listener per lo scroll
    window.addEventListener('scroll', handleScroll)
    // Esegui una volta all'inizio
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative h-[80vh] overflow-hidden flex items-center justify-center bg-white pt-0"
    >
      {/* Immagine di sfondo con effetti parallasse e zoom */}
      <div 
        ref={imageRef}
        className="absolute h-full bg-cover bg-center bg-no-repeat transition-all duration-75 ease-out"
        style={{ 
          backgroundImage: 'url(/images/building.webp)',
          transformOrigin: 'center center',
          width: '80%', // Larghezza iniziale
          left: '50%',
          transform: 'translateX(-50%)' // Centra inizialmente
        }}
      />
      
      {/* Overlay scuro opzionale per migliorare la leggibilità se necessario */}
      <div className="absolute inset-0" />
      
      {/* Contenuto opzionale (se vuoi aggiungere testo sopra l'immagine) */}
      <div className="relative z-10 h-full flex items-center justify-center">
        {/* Puoi aggiungere contenuto qui se necessario */}
      </div>
    </section>
  )
}
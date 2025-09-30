'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

export default function InternationalSection() {
  const [virtualScroll, setVirtualScroll] = useState(0)
  const [isScrollDisabled, setIsScrollDisabled] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const phrasesRef = useRef<(HTMLDivElement | null)[]>([])
  const maxScrollForEffect = 300
  
  const phrases = [
    "Consapevolezza e rispetto culturale",
    "Flessibilità nel soddisfare le diverse esigenze", 
    "Collaborazione continua",
    "Mindset di crescita reciproca"
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const newIsInView = entry.isIntersecting && entry.intersectionRatio >= 0.8
        setIsInView(newIsInView)
        
        // Se non siamo più in view, resetta tutto
        if (!newIsInView && isScrollDisabled) {
          setIsScrollDisabled(false)
          setVirtualScroll(0)
          document.body.style.overflow = 'auto'
          document.body.style.height = 'auto'
        }
      },
      { threshold: [0, 0.2, 0.5, 0.8, 1] }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
      // Cleanup finale
      document.body.style.overflow = 'auto'
      document.body.style.height = 'auto'
    }
  }, [isScrollDisabled])

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (!isInView) return
      
      // Se siamo in view ma lo scroll non è ancora disabilitato, disabilitalo
      if (isInView && !isScrollDisabled) {
        setIsScrollDisabled(true)
        document.body.style.overflow = 'hidden'
        document.body.style.height = '100vh'
      }
      
      if (isScrollDisabled && isInView) {
        event.preventDefault()
        
        setVirtualScroll(prev => {
          let newScroll
          
          if (event.deltaY > 0) {
            // Scroll verso il basso - aumenta l'animazione (più fluido)
            newScroll = Math.min(prev + Math.abs(event.deltaY) * 0.4, maxScrollForEffect)
          } else {
            // Scroll verso l'alto - diminuisce l'animazione (più fluido)
            newScroll = Math.max(0, prev - Math.abs(event.deltaY) * 0.4)
          }
          
          // Se raggiungiamo il 100%, riabilita lo scroll e permetti di uscire dalla sezione
          if (newScroll >= maxScrollForEffect) {
            setTimeout(() => {
              setIsScrollDisabled(false)
              document.body.style.overflow = 'auto'
              document.body.style.height = 'auto'
              // Scorri la pagina per uscire dalla sezione
              window.scrollBy(0, 100)
            }, 200)
          }
          
          return newScroll
        })
      }
    }
    
    window.addEventListener('wheel', handleWheel, { passive: false })
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [isScrollDisabled, isInView, maxScrollForEffect])

  // Inizializza GSAP per le frasi
  useEffect(() => {
    // Imposta le posizioni iniziali delle frasi
    phrasesRef.current.forEach((phrase, index) => {
      if (phrase) {
        gsap.set(phrase, {
          y: '100vh',
          opacity: 0,
          scale: 0.8
        })
      }
    })
  }, [])

  // Anima le frasi in base al virtual scroll con GSAP
  useEffect(() => {
    const progress = virtualScroll / maxScrollForEffect

    phrasesRef.current.forEach((phrase, index) => {
      if (phrase) {
        const phraseProgress = Math.max(0, Math.min(1, (progress - index * 0.15) * 1.5))
        
        // Calcolo della posizione Y più fluido
        const startY = 100 // Inizia da sotto lo schermo
        const centerY = 20 + index * 25 // Posizione centrale per ogni frase
        const exitY = -50 // Esce completamente dallo schermo sopra
        
        let currentY
        if (phraseProgress < 0.7) {
          // Fase 1: Dal basso al centro (0 -> 0.7)
          const phase1Progress = phraseProgress / 0.7
          currentY = startY - (startY - centerY) * phase1Progress
        } else {
          // Fase 2: Dal centro fuori dallo schermo sopra (0.7 -> 1)
          const phase2Progress = (phraseProgress - 0.7) / 0.3
          currentY = centerY - (centerY - exitY) * phase2Progress
        }
        
        // Opacità: appare e poi scompare quando esce
        let opacity
        if (phraseProgress < 0.1) {
          opacity = phraseProgress * 10 // Fade in
        } else if (phraseProgress > 0.8) {
          opacity = Math.max(0, 1 - ((phraseProgress - 0.8) / 0.2)) // Fade out quando esce
        } else {
          opacity = 1 // Completamente visibile al centro
        }
        
        // Animazione GSAP smooth
        gsap.to(phrase, {
          y: `${currentY}vh`,
          opacity: opacity,
          scale: 0.8 + (Math.min(phraseProgress, 0.7) * 0.2),
          duration: 0.6,
          ease: "power2.out"
        })
        
        // Gestione del colore per la frase centrale (solo se visibile)
        if (opacity > 0.1) {
          const rect = phrase.getBoundingClientRect()
          const windowHeight = window.innerHeight
          const elementCenter = rect.top + rect.height / 2
          const isInCenter = elementCenter > windowHeight * 0.35 && elementCenter < windowHeight * 0.65
          
          gsap.to(phrase, {
            color: isInCenter ? '#C34069' : '#ffffff',
            duration: 0.4,
            ease: "power2.out"
          })
        }
      }
    })
  }, [virtualScroll, maxScrollForEffect])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Title with line breaks */}
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extralight text-white leading-tight">
              <span className="block">La</span>
              <span className="block">nostra</span>
              <span className="block">vocazione</span>
              <span className="block">internazionale</span>
            </h1>

            {/* Paragraphs */}
            <div className="space-y-6 text-white/90 font-extralight">
              <p className="text-sm lg:text-base leading-relaxed">
                Sin dalla sua internazionalizzazione nel 2004, D.M.G. ITALIA è sempre stata pronta ad accogliere nuovi partner che desiderano arricchire il loro portafoglio con prodotti unici. Grazie a una rete di distributori e filiali in continua crescita, l'azienda ha costruito negli anni una solida presenza internazionale, coprendo più di 50 paesi dentro e fuori l'Europa.
              </p>
              
              <p className="text-sm lg:text-base leading-relaxed">
                Con l'obiettivo di stabilire partnership durature e fruttuose, D.M.G. ITALIA offre a tutti i suoi clienti la sua esperienza e le sue migliori qualità:
              </p>
              
              <p className="text-sm lg:text-base leading-relaxed">
                Queste caratteristiche, insieme all'elevata qualità dei nostri prodotti, rendono D.M.G. ITALIA il partner di riferimento di oltre 25 aziende nel mondo. Con l'obiettivo di stabilire partnership durature e fruttuose, D.M.G. ITALIA offre a tutti i suoi clienti la sua esperienza e le sue migliori qualità:
              </p>
            </div>

            {/* CTA Button - styled like Hero button */}
            <div className="pt-4">
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

          {/* Right Column - Animated Phrases */}
          <div className="relative h-screen overflow-hidden">
            {phrases.map((phrase, index) => (
              <div
                key={index}
                ref={el => { phrasesRef.current[index] = el }}
                className="absolute left-0 w-full text-4xl lg:text-5xl xl:text-7xl 2xl:text-8xl font-extralight text-white leading-tight"
                style={{ 
                  willChange: 'transform, opacity, color',
                  backfaceVisibility: 'hidden',
                  perspective: '1000px'
                }}
              >
                {phrase}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
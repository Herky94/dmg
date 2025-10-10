'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function LogosHorizontalSection() {
  const [virtualScroll, setVirtualScroll] = useState(0)
  const [isScrollDisabled, setIsScrollDisabled] = useState(false) 
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)
  const row3Ref = useRef<HTMLDivElement>(null)
  
  const maxScrollForEffect = 400 // Scroll totale per completare tutte le animazioni
  
  // 3 righe di loghi sfalsate
  const logoRows = [
    [
      { name: "Selentuss", src: "/images/selentuss.png" },
      { name: "Rinopanteina", src: "/images/rinopanteina.png" },
      { name: "Pepsino", src: "/images/pepsino.png" }
    ],
    [
      { name: "Orogermina", src: "/images/orogermina.png" },
      { name: "Oftasiale", src: "/images/oftasiale.png" },
      { name: "Gastroftal", src: "/images/gastrooftal.png" }
    ],
    [
      { name: "Elastar", src: "/images/elastar.png" },
      { name: "Selentuss", src: "/images/selentuss.png" }, // Ripeti per riempire
      { name: "Rinopanteina", src: "/images/rinopanteina.png" }
    ]
  ]

  // Scroll listener per rilevamento preciso del bordo superiore
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        
        // Attiva SOLO quando il bordo superiore raggiunge il top della viewport (rect.top <= 0)
        const shouldBeInView = rect.top <= 0 && rect.bottom > 0
        
        console.log('Logos section - top:', rect.top, 'bottom:', rect.bottom, 'shouldBeInView:', shouldBeInView)
        
        if (shouldBeInView && !isInView) {
          // Il bordo superiore ha raggiunto il top - attiva la sezione
          console.log('🎯 BORDO SUPERIORE RAGGIUNTO - Attivando sezione logos')
          setIsInView(true)
          setIsScrollDisabled(true)
          document.body.style.overflow = 'hidden'
          document.body.style.height = '100vh'
          
          // Posiziona esattamente la sezione al top
          window.scrollTo({
            top: sectionRef.current.offsetTop,
            behavior: 'auto'
          })
        } else if (!shouldBeInView && isInView) {
          // Uscendo dalla sezione - reset completo
          console.log('📤 Uscendo dalla sezione logos - reset')
          setIsInView(false)
          setIsScrollDisabled(false)
          setVirtualScroll(0)
          document.body.style.overflow = 'auto'
          document.body.style.height = 'auto'
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Controlla stato iniziale
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.body.style.overflow = 'auto'
      document.body.style.height = 'auto'
    }

  }, [isInView])

  // Gestione scroll semplificato per animazioni progressive
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (!isInView) return
      
      if (!isScrollDisabled) {
        setIsScrollDisabled(true)
        document.body.style.overflow = 'hidden'
        document.body.style.height = '100vh'
      }
      
      if (isInView && isScrollDisabled) {
        event.preventDefault()
        
        setVirtualScroll(prev => {
          let newScroll
          
          if (event.deltaY > 0) {
            // Scroll verso il basso - continua animazione
            newScroll = Math.min(prev + Math.abs(event.deltaY) * 0.8, maxScrollForEffect)
            
            // Se completiamo l'animazione, rilascia controllo per andare alla sezione successiva
            if (newScroll >= maxScrollForEffect) {
              setTimeout(() => {
                setIsScrollDisabled(false)
                document.body.style.overflow = 'auto'
                document.body.style.height = 'auto'
                window.scrollBy(0, 100)
              }, 200)
            }
          } else {
            // Scroll verso l'alto - NON azzerare, ma permettere uscita se siamo all'inizio
            if (prev <= 0) {
              // Solo se siamo già a 0, permetti uscita verso l'alto
              setTimeout(() => {
                setIsScrollDisabled(false)
                document.body.style.overflow = 'auto'
                document.body.style.height = 'auto'
                window.scrollBy(0, -100)
              }, 100)
              return 0
            } else {
              // Altrimenti riduci il progresso ma mantieni l'effetto visivo
              newScroll = Math.max(0, prev - Math.abs(event.deltaY) * 0.8)
            }
          }
          
          return newScroll
        })
      }
    }
    
    window.addEventListener('wheel', handleWheel, { passive: false })
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [isScrollDisabled, isInView])

  // Animazioni GSAP per sfondo e righe progressive
  useEffect(() => {
    const progress = virtualScroll / maxScrollForEffect
    
    // Animazione sfondo rosa - RESTA ROSA UNA VOLTA ATTIVATO (non torna mai bianco)
    if (backgroundRef.current) {
      const backgroundProgress = Math.max(progress * 3, virtualScroll > 0 ? Math.max(progress, 0.3) : 0)
      const finalProgress = Math.min(backgroundProgress, 1)
      
      gsap.to(backgroundRef.current, {
        backgroundColor: `rgb(${255 - (255 - 195) * finalProgress}, ${255 - (255 - 64) * finalProgress}, ${255 - (255 - 105) * finalProgress})`,
        duration: 0.6,
        ease: "power2.out"
      })
    }
    
    // Animazione riga 1 - Mantiene posizione minima una volta attivata
    if (row1Ref.current) {
      const row1Progress = Math.max(0, Math.min((progress - 0.1) * 3, 1))
      const finalRow1Progress = virtualScroll > 0 ? Math.max(row1Progress, 0.2) : row1Progress
      
      gsap.to(row1Ref.current, {
        x: -100 + (finalRow1Progress * 60) + '%',
        opacity: Math.max(finalRow1Progress, virtualScroll > 0 ? 0.3 : 0),
        duration: 0.8,
        ease: "power2.out"
      })
    }
    
    // Animazione riga 2 - Mantiene posizione minima una volta attivata
    if (row2Ref.current) {
      const row2Progress = Math.max(0, Math.min((progress - 0.3) * 3, 1))
      const finalRow2Progress = virtualScroll > 50 ? Math.max(row2Progress, 0.15) : row2Progress
      
      gsap.to(row2Ref.current, {
        x: -100 + (finalRow2Progress * 80) + '%',
        opacity: Math.max(finalRow2Progress, virtualScroll > 50 ? 0.25 : 0),
        duration: 0.8,
        ease: "power2.out"
      })
    }
    
    // Animazione riga 3 - Mantiene posizione minima una volta attivata
    if (row3Ref.current) {
      const row3Progress = Math.max(0, Math.min((progress - 0.5) * 3, 1))
      const finalRow3Progress = virtualScroll > 100 ? Math.max(row3Progress, 0.1) : row3Progress
      
      gsap.to(row3Ref.current, {
        x: -100 + (finalRow3Progress * 100) + '%',
        opacity: Math.max(finalRow3Progress, virtualScroll > 100 ? 0.2 : 0),
        duration: 0.8,
        ease: "power2.out"
      })
    }
  }, [virtualScroll])

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Sfondo animato */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-white transition-colors duration-600"
      />
      
      {/* Content Container */}
      <div className="relative w-full px-6 lg:px-20 flex items-center justify-between h-screen">
        {/* Testo fisso a sinistra */}
        <div className="flex-shrink-0 z-10 max-w-md">
          <h2 className={`text-4xl lg:text-5xl xl:text-6xl font-extralight leading-tight transition-colors duration-600 ${
            virtualScroll >= 50 ? 'text-white' : 'text-black'
          }`}>
            <span className="block">I nostri</span>
            <span className="block">partner</span>
            <span className="block">nel mondo</span>
          </h2>
          <p className={`text-lg font-light mt-6 transition-colors duration-600 ${
            virtualScroll >= 50 ? 'text-white/80' : 'text-gray-600'
          }`}>
            I migliori brand per offrire prodotti sicuri, certificati e di qualità.
          </p>
        </div>

        {/* 3 Righe di loghi sfalsate a destra */}
        <div className="flex-1 flex flex-col justify-center items-end space-y-8 mr-20 overflow-hidden">
          {/* Riga 1 */}
          <div 
            ref={row1Ref}
            className="flex gap-8 opacity-0"
            style={{ transform: 'translateX(-100%)' }}
          >
            {logoRows[0].map((logo, index) => (
              <div
                key={`row1-${index}`}
                className="p-4"
                style={{ width: '220px', height: '150px' }}
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>

          {/* Riga 2 (sfalsata a sinistra) */}
          <div 
            ref={row2Ref}
            className="flex gap-8 opacity-0 ml-16"
            style={{ transform: 'translateX(-100%)' }}
          >
            {logoRows[1].map((logo, index) => (
              <div
                key={`row2-${index}`}
                className="p-4"
                style={{ width: '220px', height: '160px' }}
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>

          {/* Riga 3 (ancora più sfalsata) */}
          <div 
            ref={row3Ref}
            className="flex gap-8 opacity-0 ml-32"
            style={{ transform: 'translateX(-100%)' }}
          >
            {logoRows[2].map((logo, index) => (
              <div
                key={`row3-${index}`}
                className="p-4"
                style={{ width: '220px', height: '160px' }}
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
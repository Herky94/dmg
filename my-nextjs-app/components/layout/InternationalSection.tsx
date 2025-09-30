'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

export default function InternationalSection() {
  const [virtualScroll, setVirtualScroll] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [allAnimationsCompleted, setAllAnimationsCompleted] = useState(false)
  const [canExit, setCanExit] = useState(false) // 🔓 Variabile per bloccare/sbloccare il fix di posizione
  const sectionRef = useRef<HTMLElement>(null)
  const phrasesRef = useRef<(HTMLDivElement | null)[]>([])
  const maxScrollForEffect = 300
  const extraScrollAfterEnd = 300 // 300px aggiuntivi dopo la fine
  const positionCheckIntervalRef = useRef<NodeJS.Timeout | null>(null)
  
  const phrases = [
    "Consapevolezza e rispetto culturale",
    "Flessibilità nel soddisfare le diverse esigenze", 
    "Collaborazione continua",
    "Mindset di crescita reciproca"
  ]

  // 🆘 SISTEMA DI EMERGENZA - Sblocca automaticamente dopo 10 secondi
  useEffect(() => {
    let emergencyTimeout: NodeJS.Timeout
    
    if (isActive) {
      emergencyTimeout = setTimeout(() => {
        console.log('🆘 SBLOCCO DI EMERGENZA - 10 secondi scaduti')
        setIsActive(false)
        setCanExit(false)
        setAllAnimationsCompleted(false)
        setVirtualScroll(0)
        document.body.style.overflow = 'auto'
      }, 10000)
    }

    return () => {
      if (emergencyTimeout) {
        clearTimeout(emergencyTimeout)
      }
    }
  }, [isActive])
  
  // 🆘 TASTO ESC per uscita immediata
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isActive) {
        console.log('🆘 USCITA FORZATA CON ESC')
        setIsActive(false)
        setCanExit(false)
        setAllAnimationsCompleted(false)
        setVirtualScroll(0)
        document.body.style.overflow = 'auto'
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isActive])

  // 🔒 CONTROLLO POSIZIONE OTTIMIZZATO - Meno aggressivo per evitare rimbalzi
  useEffect(() => {
    if (isActive && sectionRef.current && !canExit) {
      positionCheckIntervalRef.current = setInterval(() => {
        if (sectionRef.current && !canExit) {
          const rect = sectionRef.current.getBoundingClientRect()
          
          // Correzione solo se si è spostata MOLTO (10px) per evitare micro-correzioni
          if (Math.abs(rect.top) > 10) {
            console.log('🔧 CORREZIONE MAGGIORE: top era', rect.top)
            const sectionOffsetTop = sectionRef.current.offsetTop
            window.scrollTo({
              top: sectionOffsetTop,
              behavior: 'auto'
            })
          }
        }
      }, 100) // Controllo meno frequente (10 FPS) per ridurre interferenze
    } else {
      if (positionCheckIntervalRef.current) {
        clearInterval(positionCheckIntervalRef.current)
      }
    }

    return () => {
      if (positionCheckIntervalRef.current) {
        clearInterval(positionCheckIntervalRef.current)
      }
    }
  }, [isActive, canExit])

  // 🎯 RILEVAMENTO PRECISO E CORREZIONE AUTOMATICA DELLA POSIZIONE
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        
        // ATTIVAZIONE: quando il top della sezione è vicino al top (50px di anticipo)
        const shouldActivate = rect.top <= 50 && rect.bottom > 0
        
        if (shouldActivate && !isActive) {
          console.log('🎯 ATTIVAZIONE SEZIONE - controllo posizione...')
          
          const rect = sectionRef.current.getBoundingClientRect()
          
          // CORREZIONE SOLO se necessaria (se non è già a top = 0)
          if (Math.abs(rect.top) > 5) {
            const currentScrollY = window.scrollY
            const sectionOffsetTop = sectionRef.current.offsetTop
            const targetScrollY = sectionOffsetTop
            
            // Scroll istantaneo alla posizione ESATTA
            window.scrollTo({
              top: targetScrollY,
              behavior: 'auto'
            })
            
            console.log(`📍 POSIZIONE CORRETTA: da scrollY=${currentScrollY} a scrollY=${targetScrollY}`)
          } else {
            console.log('📍 POSIZIONE GIÀ CORRETTA: top =', rect.top)
          }
          
          setIsActive(true)
          document.body.style.overflow = 'hidden'
          
        } else if (!shouldActivate && isActive) {
          setIsActive(false)
          setVirtualScroll(0)
          setAllAnimationsCompleted(false) // Reset del tracking animazioni
          setCanExit(false) // Reset della variabile di uscita
          document.body.style.overflow = 'auto'
          console.log('📤 Sezione disattivata - reset completo')
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isActive])

  // 🎯 GESTIONE WHEEL OTTIMIZZATA - Movimento fluido senza salti
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isActive) return

      e.preventDefault()
      e.stopPropagation()
      
      // 🎯 NON correggere la posizione durante il wheel - evita rimbalzi
      // La correzione avviene solo tramite l'interval, non ad ogni wheel event

      setVirtualScroll(prev => {
        const totalMaxScroll = maxScrollForEffect + extraScrollAfterEnd
        const newScroll = Math.max(0, Math.min(totalMaxScroll, prev + e.deltaY * 0.4)) // Velocità bilanciata
        
        console.log('🎡 Virtual scroll:', newScroll, '/', totalMaxScroll)
        
        // 🎯 USCITA VERSO IL BASSO: 
        if (e.deltaY > 0) {
          // Se può uscire O se lo scroll virtuale ha raggiunto il massimo, permetti uscita
          if (canExit || newScroll >= maxScrollForEffect) {
            console.log('✅ USCITA AUTORIZZATA - VERSO IL FOOTER!')
            setIsActive(false)
            setCanExit(false)
            setAllAnimationsCompleted(false)
            document.body.style.overflow = 'auto'
            setTimeout(() => window.scrollBy(0, 50), 50)
          } else {
            console.log('🚫 USCITA BLOCCATA - Le scritte non sono ancora tutte passate!')
          }
        }
        
        // Uscita verso l'alto: permetti sempre
        if (newScroll <= 0 && e.deltaY < 0) {
          console.log('⬆️ USCITA VERSO L\'ALTO - rilascio scroll')
          setTimeout(() => {
            setIsActive(false)
            setAllAnimationsCompleted(false) // Reset del tracking
            setCanExit(false) // Reset della variabile di uscita
            document.body.style.overflow = 'auto'
            window.scrollBy(0, -50) // Scroll più dolce
          }, 100)
        }
        
        return newScroll
      })
    }

    if (isActive) {
      window.addEventListener('wheel', handleWheel, { passive: false })
    }

    return () => window.removeEventListener('wheel', handleWheel)
  }, [isActive, virtualScroll, maxScrollForEffect])

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

  // 🎬 ANIMA LE FRASI E TRACCIA IL COMPLETAMENTO
  useEffect(() => {
    const progress = virtualScroll / maxScrollForEffect
    let completedCount = 0

    phrasesRef.current.forEach((phrase, index) => {
      if (phrase) {
        const phraseProgress = Math.max(0, Math.min(1, (progress - index * 0.15) * 1.5))
        
        // 🔍 TRACKING: Una frase è "completata" quando ha completato tutto il suo ciclo (phraseProgress >= 1)
        if (phraseProgress >= 1) {
          completedCount++
        }
        
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

    // 🎯 VERIFICA COMPLETAMENTO: Tutte le frasi devono aver completato il loro ciclo
    const allCompleted = completedCount === phrases.length
    
    if (allCompleted && !allAnimationsCompleted) {
      console.log('🎉 TUTTE LE ANIMAZIONI COMPLETATE! Sblocco uscita e disabilito fix posizione')
      setAllAnimationsCompleted(true)
      setCanExit(true) // 🔓 SBLOCCA L'USCITA e disabilita il fix di posizione
    } else if (!allCompleted && allAnimationsCompleted) {
      setAllAnimationsCompleted(false)
      setCanExit(false) // 🔒 Riabilita il fix se non sono più complete
    }
    
  }, [virtualScroll, maxScrollForEffect, phrases.length, allAnimationsCompleted])

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
          <div className="space-y-4">
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
'use client'
import { useState, useRef, useEffect } from 'react'

export default function StorySection() {
  const [firstDivVisible, setFirstDivVisible] = useState(false)
  const [secondDivVisible, setSecondDivVisible] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        
        // Quando la sezione entra nella viewport
        const sectionInView = rect.top <= windowHeight && rect.bottom >= 0
        
        if (sectionInView) {
          // Calcola quanto è stata scrollata la sezione (0 = appena entrata, positivo = più scrollata)
          const scrolledDistance = windowHeight - rect.top
          
          // Prima animazione: dopo 150px di scroll nella sezione
          if (scrolledDistance >= 150) {
            setFirstDivVisible(true)
            
            // Seconda animazione: dopo altri 100px (totale 250px)
            if (scrolledDistance >= 250) {
              setSecondDivVisible(true)
            } else {
              setSecondDivVisible(false)
            }
          } else {
            setFirstDivVisible(false)
            setSecondDivVisible(false)
          }
        } else {
          setFirstDivVisible(false)
          setSecondDivVisible(false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Controlla subito lo stato iniziale
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="bg-[#f1f1f1] pt-40">
      {/* Story Header */}
      <div ref={headerRef} className="max-w-6xl mx-auto mb-20">
        {/* Main layout container */}
        <div className="grid grid-rows-2 gap-16">
          
          {/* First row - Large "Story" text on the left */}
          <div className="flex justify-start">
            <h2 className="text-8xl lg:text-9xl font-extralight text-gray-900 animate-fade-in-up">
              milestones.
            </h2>
          </div>

          {/* Second row - Two text columns on the right */}
          <div className="flex justify-end">
            <div className="grid grid-cols-2 gap-8 max-w-2xl">
              {/* First column */}
              <div className={`text-sm text-gray-600 leading-relaxed transform transition-all duration-500 ease-out ${
                firstDivVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <p>
                  La nostra storia inizia nel 1993 con una visione chiara: portare innovazione 
                  nel settore dei dispositivi medici. Dalla fondazione ad oggi, abbiamo costruito 
                  un percorso di crescita costante e internazionalizzazione.
                </p>
              </div>

              {/* Second column */}
              <div className={`text-sm text-gray-600 leading-relaxed transform transition-all duration-500 ease-out ${
                secondDivVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <p>
                  Ogni milestone rappresenta un passo verso l'eccellenza. La nostra timeline 
                  racconta come siamo diventati leader nel settore, espandendoci in Europa 
                  e innovando continuamente i nostri processi produttivi.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Timeline Section */}
      <HorizontalTimeline />
    </section>
  )
}

function HorizontalTimeline() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentCardSet, setCurrentCardSet] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  
  // Timeline aziendale DMG Italia - 12 eventi divisi in 3 set da 4
  const allCards = [
    // Set 1 (1993-2003)
    { year: '1993', subtitle: 'Viene pubblicata sulla GUCE La Direttiva CEE 93/42 sui dispositivi medici (abbreviata in MDD 93/42). NASCE D.M.G. ITALIA S.R.L. fondata da Luigi Mercuri e Antonio De Nisi.' },
    { year: '1997', subtitle: 'La Direttiva 93/42 è attuata in Italia con il Decreto Legislativo 24 febbraio 1997, n. 46.' },
    { year: '2000', subtitle: 'D.M.G. ITALIA si prepara, pioneristicamente, al lancio sul mercato italiano di RINOPANTEINA, primo dispositivo medico a marchio CE che inaugura il campo dell\'otorinolaringoiatria nel portafoglio D.M.G. ITALIA.' },
    { year: '2002', subtitle: 'D.M.G. ITALIA si afferma nel campo dell\'oftalmologia con VISCOBLAST.' },
    
    // Set 2 (2003-2014)
    { year: '2003', subtitle: 'Il portafoglio di prodotti di D.M.G. ITALIA si espande nell\'area della gastroenterologia con il lancio di GASTROTUSS.' },
    { year: '2004', subtitle: 'D.M.G. ITALIA firma il suo primo contratto di distribuzione estera e, nello stesso anno, trasferisce la sua sede da Roma a Pomezia, inaugurando il suo primo sito produttivo: Italdevice.' },
    { year: '2009-2012', subtitle: 'Nascono a breve distanza l\'una dall\'altra DMG Bulgaria, prima filiale estera, a Sofia, DMG Turchia, a Istanbul e DMG Polonia a Varsavia.' },
    { year: '2014', subtitle: 'D.M.G. ITALIA inaugura il suo nuovo magazzino.' },
    
    // Set 3 (2015-2024)
    { year: '2015', subtitle: 'Vista la forte crescita, D.M.G. ITALIA trasferisce nuovamente i suoi uffici nell\'attuale sede di via Nicaragua (Pomezia).' },
    { year: '2017', subtitle: 'Il 25 maggio 2017 entra in vigore il Regolamento europeo sui dispositivi medici MDR con il 26 maggio 2021 come data di applicazione. E\' destinato a sostituire l\'MDD.' },
    { year: '2018', subtitle: 'D.M.G. ITALIA si mette subito al lavoro per ricertificare i suoi prodotti secondo MDR.' },
    { year: '2024', subtitle: 'Con la crescente presenza sul mercato italiano ed estero, D.M.G. ITALIA avvia un processo di notevole ampliamento dei suoi spazi destinati sia agli uffici sia alla produzione.' }
  ]

  const totalCards = allCards.length

  // Gestione scroll per controllare le card e il progresso della barra
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const centerOfPage = windowHeight / 2
        
        // Attiva lo scroll solo quando la sezione supera il centro della pagina
        if (rect.top <= centerOfPage && rect.bottom >= centerOfPage) {
          
          if (e.deltaY > 0) {
            // Scroll verso il basso
            if (currentCardSet < totalCards - 4) {
              // Ancora card da mostrare, previeni scroll normale
              e.preventDefault()
              setCurrentCardSet(prev => {
                const newCard = prev + 1
                setScrollProgress((newCard / (totalCards - 4)) * 100)
                return newCard
              })
            }
            // Se siamo all'ultima card, permetti scroll normale verso il basso
          } else {
            // Scroll verso l'alto
            if (currentCardSet > 0) {
              // Ancora card precedenti da mostrare, previeni scroll normale
              e.preventDefault()
              setCurrentCardSet(prev => {
                const newCard = prev - 1
                setScrollProgress((newCard / (totalCards - 4)) * 100)
                return newCard
              })
            }
            // Se siamo alla prima card, permetti scroll normale verso l'alto
          }
        }
      }
    }

    window.addEventListener('wheel', handleScroll, { passive: false })
    return () => window.removeEventListener('wheel', handleScroll)
  }, [totalCards, currentCardSet])

  // Card attualmente visibili (4 alla volta, scorrimento di 1)
  const currentCards = allCards.slice(currentCardSet, currentCardSet + 4)

  return (
    <div ref={sectionRef} className="text-black" style={{ backgroundColor: '#f1f1f1' }}>
      
      {/* Timeline Bar sopra - si riempie con il progresso */}
      <div className="w-full max-w-6xl mx-auto px-8 pt-0 pb-6">
        <div className="relative mb-20">
          {/* Linea grigia di sfondo */}
          <div className="w-full h-[2px] bg-gray-300 relative">
            {/* Barra di progresso che si riempie */}
            <div 
              className="absolute left-0 top-0 h-full bg-[#C34069] transition-all duration-700 ease-out"
              style={{ width: `${scrollProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="w-full max-w-6xl mx-auto px-8 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentCards.map((card, index) => (
            <div
              key={`${currentCardSet}-${index}`}
              className="transform transition-all duration-700 ease-out"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="p-6 card-timeline rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <img src="/images/usefull-icons/arrow.svg" alt="Arrow Icon" className="w-4 h-4" />
                  <div className="text-black text-2xl font-medium">
                    {card.year}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {card.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
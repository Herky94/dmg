'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function LeadershipSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const paragraphRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Imposta stati iniziali degli elementi
    if (imageRef.current) {
      gsap.set(imageRef.current, {
        opacity: 0,
        x: 100
      })
    }
    
    if (paragraphRef.current) {
      gsap.set(paragraphRef.current, {
        opacity: 0,
        y: -50
      })
    }
    
    if (lineRef.current) {
      gsap.set(lineRef.current, {
        scaleX: 0,
        transformOrigin: 'left'
      })
    }
    
    if (nameRef.current) {
      gsap.set(nameRef.current, {
        opacity: 0,
        x: 100
      })
    }

    // Intersection Observer per triggerare le animazioni
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          // Timeline GSAP per sequenza di animazioni
          const tl = gsap.timeline()
          
          // 1. Immagine appare da destra a sinistra
          tl.to(imageRef.current, {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: "power2.out"
          })
          
          // 2. Paragrafo appare dall'alto al basso
          .to(paragraphRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out"
          }, "-=0.3") // Inizia 0.3s prima che finisca l'animazione precedente
          
          // 3. Linea si disegna
          .to(lineRef.current, {
            scaleX: 1,
            duration: 0.8,
            ease: "power2.out"
          }, "-=0.2")
          
          // 4. Nome e titolo appaiono da destra a sinistra
          .to(nameRef.current, {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out"
          }, "-=0.2")
        }
      },
      { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-40 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <div className="order-2 lg:order-1">
            <div ref={imageRef} className="overflow-hidden shadow-lg">
              <img 
                src="/images/Luigi-Mercuri.jpg" 
                alt="Luigi Mercuri - CEO & Managing Director"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          
          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="max-w-2xl">
              {/* Testo sopra la linea divisoria */}
              <div ref={paragraphRef} className="space-y-4 text-gray-700 leading-relaxed mb-12">
                <p>
                  «Il nostro impegno, sintetizzato nel pay-off "<b>Quando serve cura</b>", è 
                  costantemente rivolto a migliorare la qualità della vita e la salute 
                  delle persone. Proponiamo, infatti, un approccio alla tutela della 
                  salute secondo cui "Non si cura la malattia ma il paziente"»
                </p>
                
                <p>
                  Innovazione, creatività e la costante ricerca di nuove soluzioni sono 
                  i pilastri sui quali poggiamo i nostri laboratori di Ricerca e Sviluppo, 
                  composti da un team di professionisti e dotati di apparecchiature 
                  all'avanguardia che, anno dopo anno, permettono una crescita 
                  costante.
                </p>
                
                <p>
                  L'entusiasmo, l'onestà e la volontà di innovare sono le qualità 
                  fondamentali attraverso cui <b style={{ color: '#c34069' }}>D.M.G. ITALIA</b> promuove il progresso e 
                  la crescita dei propri dipendenti e collaboratori, favorendo un clima 
                  di trasparenza e di inclusione.
                </p>
              </div>
              
              {/* Linea divisoria */}
              <div className="pt-12 relative">
                <div 
                  ref={lineRef}
                  className="border-t border-gray-300 w-full"
                ></div>
                <div ref={nameRef} className="pt-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Luigi Mercuri</h3>
                  <p className="text-lg text-gray-900 font-semibold">CEO & Managing Director</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
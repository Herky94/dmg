'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function CountersSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const countersRef = useRef<(HTMLDivElement | null)[]>([])
  const [hasAnimated, setHasAnimated] = useState(false)

  const counters = [
    {
      number: '23+',
      title: 'Brevetti',
      description: 'in 76+ Paesi'
    },
    {
      number: '34+',
      title: 'Prodotti',
      description: 'in svariate forme farmaceutiche e presentazioni'
    },
    {
      number: '4',
      title: 'Aree Terapeutiche',
      description: 'Otorinolaringoiatria, Pediatria, Oftalmologia, Gastroenterologia'
    },
    {
      number: '50+',
      title: 'Paesi',
      description: 'in cui sono distribuiti i nostri prodotti'
    }
  ]

  useEffect(() => {
    // Imposta stati iniziali degli elementi
    countersRef.current.forEach((counter) => {
      if (counter) {
        gsap.set(counter, {
          opacity: 0,
          y: 50
        })
      }
    })

    // Intersection Observer per triggerare le animazioni
    const observer = new IntersectionObserver(
      ([entry]) => {        
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3 && !hasAnimated) {
          setHasAnimated(true)
          
          // Timeline GSAP per sequenza di animazioni
          const tl = gsap.timeline()
          
          countersRef.current.forEach((counter, index) => {
            if (counter) {
              tl.to(counter, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out"
              }, index * 0.2) // Ritardo di 0.2s tra ogni elemento
            }
          })
        }
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5] }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  return (
    <section ref={sectionRef} className="pt-40 pb-10 bg-gray-50">
      <div className="mx-auto px-27">
        {/* Grid dei counter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {counters.map((counter, index) => (
            <div
              key={counter.title}
              ref={el => {
                countersRef.current[index] = el
              }}
              className="text-left space-y-4"
            >
              {/* Numero principale */}
              <div className="text-5xl lg:text-6xl font-light mb-0">
                {counter.number}
              </div>
              
              {/* Linea divisoria grigia */}
              <div className="w-full h-px my-5 bg-gray-300"></div>
              
              {/* Titolo */}
              <h3 className="text-xl mb-3 text-black">
                {counter.title}
              </h3>
              
              {/* Descrizione */}
              <p className="text-sm text-gray-700 mb-0 leading-[1.5] text-[14px]">
                {counter.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
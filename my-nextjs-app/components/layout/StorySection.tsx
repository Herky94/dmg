'use client'
import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section ref={sectionRef} className="bg-white">
      {/* Story Header - Fixed positioning during scroll */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-20">
          {/* Main layout container */}
          <div className="grid grid-rows-2 gap-16">
            
            {/* First row - Large "Story" text on the left */}
            <div className="flex justify-start">
              <h1 className="text-8xl lg:text-9xl font-light text-gray-900">
                Story
              </h1>
            </div>

            {/* Second row - Two text columns on the right */}
            <div className="flex justify-end">
              <div className="grid grid-cols-2 gap-8 max-w-2xl">
                {/* First column */}
                <div className="text-sm text-gray-600 leading-relaxed">
                  <p>
                    Brand or performance? Creative or conversion? Meaning or measurability? Most 
                    agencies make you choose. We don't. Your creative breaks through. Your spend 
                    works harder. Your outcomes compound.
                  </p>
                </div>

                {/* Second column */}
                <div className="text-sm text-gray-600 leading-relaxed">
                  <p>
                    Why? Because we don't believe in the false choice that's holding brands back. 
                    The truth? When brand and performance work together, everything works better. 
                    That's our difference. We're the catalyst at the heart of brand and performance.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <TimelineSection sectionRef={sectionRef} />
    </section>
  )
}

function TimelineSection({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const timelineRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])
  const dotsRef = useRef<HTMLDivElement[]>([])
  
  // Add refs to arrays
  const addToRefs = (el: HTMLDivElement | null, refsArray: React.MutableRefObject<HTMLDivElement[]>) => {
    if (el && !refsArray.current.includes(el)) {
      refsArray.current.push(el)
    }
  }
  
  const timelineData = [
    {
      year: '1993',
      events: [
        'Viene pubblicata sulla GUCE La Direttiva CEE 93/42 sui dispositivi medici (abbreviata in MDD 93/42).',
        'NASCE D.M.G. ITALIA S.R.L. fondata da Luigi Mercuri e Antonio De Nisi.'
      ]
    },
    {
      year: '1997',
      events: [
        'La Direttiva 93/42 è attuata in Italia con il Decreto Legislativo 24 febbraio 1997, n. 46.'
      ]
    },
    {
      year: '2000',
      events: [
        'D.M.G. ITALIA si prepara, pioneristicamente, al lancio sul mercato italiano di RINOPANTEINA, primo dispositivo medico a marchio CE che inaugura il campo dell\'otorinolaringoiatria nel portafoglio D.M.G. ITALIA.'
      ]
    },
    {
      year: '2002',
      events: [
        'D.M.G. ITALIA si afferma nel campo dell\'oftalmologia con VISCOBLAST.'
      ]
    },
    {
      year: '2003',
      events: [
        'Il portafoglio di prodotti di D.M.G. ITALIA si espande nell\'area della gastroenterologia con il lancio di GASTROTUSS.'
      ]
    },
    {
      year: '2004',
      events: [
        'D.M.G. ITALIA firma il suo primo contratto di distribuzione estera e, nello stesso anno, trasferisce la sua sede da Roma a Pomezia, inaugurando il suo primo sito produttivo: Italdevice.'
      ]
    },
    {
      year: '2009-2012',
      events: [
        'Nascono a breve distanza l\'una dall\'altra DMG Bulgaria, prima filiale estera, a Sofia, DMG Turchia, a Istanbul e DMG Polonia a Varsavia.'
      ]
    },
    {
      year: '2014',
      events: [
        'D.M.G. ITALIA inaugura il suo nuovo magazzino.'
      ]
    },
    {
      year: '2015',
      events: [
        'Vista la forte crescita, D.M.G. ITALIA trasferisce nuovamente i suoi uffici nell\'attuale sede di via Nicaragua (Pomezia).'
      ]
    },
    {
      year: '2017',
      events: [
        'Il 25 maggio 2017 entra in vigore il Regolamento europeo sui dispositivi medici MDR con il 26 maggio 2021 come data di applicazione. E\' destinato a sostituire l\'MDD.'
      ]
    },
    {
      year: '2018',
      events: [
        'D.M.G. ITALIA si mette subito al lavoro per ricertificare i suoi prodotti secondo MDR.'
      ]
    },
    {
      year: '2024',
      events: [
        'Con la crescente presenza sul mercato italiano ed estero, D.M.G. ITALIA avvia un processo di notevole ampliamento dei suoi spazi destinati sia agli uffici sia alla produzione.'
      ]
    }
  ]

  // GSAP Animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (sectionRef.current && lineRef.current) {
      const sectionContainer = sectionRef.current
      
      // Set initial states
      gsap.set(itemsRef.current, { 
        opacity: 0, 
        y: (index) => index % 2 === 0 ? -80 : 80, // Reduced distance for better spacing
        scale: 0.9
      })
      gsap.set(dotsRef.current, { scale: 0 })
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left center' })

      // Pin the entire section during scroll
      ScrollTrigger.create({
        trigger: sectionContainer,
        start: 'top top',
        end: '+=250%', // Extended scroll duration
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self: any) => {
          const progress = self.progress
          
          // Animate line drawing progressively
          gsap.to(lineRef.current, {
            scaleX: progress,
            duration: 0.1,
            ease: 'none'
          })
          
          // Animate items and dots appearing sequentially
          const totalItems = timelineData.length
          
          itemsRef.current.forEach((item, index) => {
            const itemProgress = (index + 1) / totalItems
            const shouldShow = progress >= itemProgress - 0.1
            
            if (shouldShow) {
              const isEven = index % 2 === 0
              gsap.to(item, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: 'back.out(1.7)',
                overwrite: true
              })
            }
          })
          
          // Animate dots
          dotsRef.current.forEach((dot, index) => {
            const dotProgress = (index + 1) / totalItems
            const shouldShow = progress >= dotProgress - 0.1
            
            if (shouldShow) {
              gsap.to(dot, {
                scale: 1,
                duration: 0.5,
                ease: 'back.out(2)',
                overwrite: true
              })
            }
          })
        }
      })

      return () => {
        ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill())
      }
    }
  }, [timelineData.length])

  return (
    <div ref={timelineRef} className="relative w-full overflow-hidden pt-12">
      {/* Full Width Timeline Container */}
      <div className="relative w-4/5 mx-auto h-[70vh]">
        {/* Main Horizontal Timeline Line */}
        <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-300 -translate-y-1/2">
          <div 
            ref={lineRef}
            className="absolute left-0 top-0 h-full bg-black"
          ></div>
        </div>

        {/* Timeline Events - Alternating Above/Below */}
        <div className="relative h-full">
          {timelineData.map((item, index) => {
            const isEven = index % 2 === 0
            const leftPosition = (index / (timelineData.length - 1)) * 100
            
            return (
              <div key={item.year} className="absolute" style={{ left: `${leftPosition}%` }}>
                {/* Timeline Dot */}
                <div
                  ref={(el) => addToRefs(el, dotsRef)}
                  className="absolute w-4 h-4 bg-black rounded-full -translate-x-1/2 z-20"
                  style={{ top: '50%', transform: 'translateX(-50%) translateY(-50%)' }}
                />

                {/* Event Content Box */}
                <div
                  ref={(el) => addToRefs(el, itemsRef)}
                  className={`absolute w-72 p-4 bg-white border border-gray-200 shadow-lg -translate-x-1/2 ${
                    isEven 
                      ? 'bottom-1/2 mb-6' // Above the line - reduced margin
                      : 'top-1/2 mt-6'    // Below the line - reduced margin
                  }`}
                >
                  {/* Arrow pointing to timeline */}
                  <div 
                    className={`absolute left-1/2 w-0 h-0 -translate-x-1/2 ${
                      isEven 
                        ? 'top-full border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white'
                        : 'bottom-full border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white'
                    }`}
                  />
                  
                  <h3 className="text-3xl font-light text-gray-900 mb-4">
                    {item.year}
                  </h3>
                  <div className="space-y-3">
                    {item.events.map((event, eventIndex) => (
                      <p key={eventIndex} className="text-sm text-gray-600 leading-relaxed">
                        {event}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
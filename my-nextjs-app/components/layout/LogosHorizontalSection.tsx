'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function LogosHorizontalSection() {
  const [virtualScroll, setVirtualScroll] = useState(0)
  const [isScrollDisabled, setIsScrollDisabled] = useState(false) 
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const logosContainerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const maxScrollForEffect = 400
  
  // Loghi di test - su due righe
  const logosRow1 = [
    { name: "Microsoft", src: "https://via.placeholder.com/150x80/333333/ffffff?text=Microsoft" },
    { name: "Google", src: "https://via.placeholder.com/150x80/4285f4/ffffff?text=Google" },
    { name: "Apple", src: "https://via.placeholder.com/150x80/000000/ffffff?text=Apple" },
    { name: "Amazon", src: "https://via.placeholder.com/150x80/ff9900/ffffff?text=Amazon" },
    { name: "Meta", src: "https://via.placeholder.com/150x80/1877f2/ffffff?text=Meta" },
    { name: "Tesla", src: "https://via.placeholder.com/150x80/cc0000/ffffff?text=Tesla" }
  ]
  
  const logosRow2 = [
    { name: "Netflix", src: "https://via.placeholder.com/150x80/e50914/ffffff?text=Netflix" },
    { name: "Spotify", src: "https://via.placeholder.com/150x80/1db954/ffffff?text=Spotify" },
    { name: "Adobe", src: "https://via.placeholder.com/150x80/ff0000/ffffff?text=Adobe" },
    { name: "Intel", src: "https://via.placeholder.com/150x80/0071c5/ffffff?text=Intel" },
    { name: "Samsung", src: "https://via.placeholder.com/150x80/1428a0/ffffff?text=Samsung" },
    { name: "Sony", src: "https://via.placeholder.com/150x80/000000/ffffff?text=Sony" }
  ]

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const newIsInView = entry.isIntersecting && entry.intersectionRatio >= 0.8
        setIsInView(newIsInView)
        
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
      document.body.style.overflow = 'auto'
      document.body.style.height = 'auto'
    }
  }, [isScrollDisabled])

  // Gestione scroll con virtual scroll
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (!isInView) return
      
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
            newScroll = Math.min(prev + Math.abs(event.deltaY) * 0.8, maxScrollForEffect)
          } else {
            newScroll = Math.max(0, prev - Math.abs(event.deltaY) * 0.8)
          }
          
          if (newScroll >= maxScrollForEffect) {
            setTimeout(() => {
              setIsScrollDisabled(false)
              document.body.style.overflow = 'auto'
              document.body.style.height = 'auto'
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
  }, [isScrollDisabled, isInView])

  // Animazioni GSAP
  useEffect(() => {
    const progress = virtualScroll / maxScrollForEffect
    
    // Animazione testo
    if (textRef.current) {
      gsap.to(textRef.current, {
        opacity: Math.max(0, 1 - progress * 1.5),
        x: -progress * 150,
        duration: 0.6,
        ease: "power2.out"
      })
    }
    
    // Animazione loghi - movimento orizzontale
    if (logosContainerRef.current) {
      // Calcolo movimento: da posizione iniziale (200px) verso sinistra
      const moveDistance = 1200 // Distanza totale di movimento
      const currentX = 200 - (progress * moveDistance)
      
      gsap.to(logosContainerRef.current, {
        x: currentX,
        duration: 0.6,
        ease: "power2.out"
      })
    }
  }, [virtualScroll])

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-white flex items-center overflow-hidden">
      {/* Content Container */}
      <div className="w-full px-6 lg:px-20">
        {/* Testo iniziale a sinistra */}
        <div 
          ref={textRef}
          className="absolute left-6 lg:left-20 top-1/2 transform -translate-y-1/2 z-10"
        >
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-extralight text-black leading-tight max-w-2xl">
            <span className="block">I nostri</span>
            <span className="block">partner</span>
            <span className="block">nel mondo</span>
          </h2>
          <p className="text-lg text-gray-600 font-light mt-6 max-w-lg">
            Collaboriamo con le migliori aziende internazionali per offrire 
            soluzioni innovative e di qualità superiore.
          </p>
        </div>

        {/* Container per i loghi con scroll orizzontale */}
        <div className="relative w-full h-screen flex items-center overflow-hidden">
          <div 
            ref={logosContainerRef}
            className="flex flex-col gap-16 whitespace-nowrap"
            style={{ 
              width: 'max-content',
              transform: 'translateX(200px)' // Posizione iniziale
            }}
          >
            {/* Prima riga di loghi */}
            <div className="flex gap-16 items-center">
              {logosRow1.map((logo, index) => (
                <div
                  key={`row1-${index}`}
                  className="flex-shrink-0 bg-white rounded-lg shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300"
                  style={{ width: '200px', height: '120px' }}
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Seconda riga di loghi */}
            <div className="flex gap-16 items-center ml-32">
              {logosRow2.map((logo, index) => (
                <div
                  key={`row2-${index}`}
                  className="flex-shrink-0 bg-white rounded-lg shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300"
                  style={{ width: '200px', height: '120px' }}
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
      </div>
    </section>
  )
}
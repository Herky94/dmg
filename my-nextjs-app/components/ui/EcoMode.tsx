'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function EcoMode() {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout

    const resetTimer = () => {
      // Se eco mode è attivo, disattivalo immediatamente
      setIsActive(false)
      
      // Resetta il timer
      clearTimeout(inactivityTimer)
      
      // Avvia nuovo timer per 30 secondi
      inactivityTimer = setTimeout(() => {
        setIsActive(true)
      }, 30000) // 30 secondi
    }

    // Eventi che resetano il timer - includendo più eventi mouse
    const events = [
      'mousedown',
      'mousemove', 
      'mouseup',
      'keydown',
      'keypress',
      'scroll',
      'touchstart',
      'touchmove',
      'click'
    ]

    // Aggiungi event listeners
    events.forEach(event => {
      document.addEventListener(event, resetTimer, { capture: true, passive: true })
    })

    // Avvia il timer iniziale
    resetTimer()

    // Cleanup
    return () => {
      clearTimeout(inactivityTimer)
      events.forEach(event => {
        document.removeEventListener(event, resetTimer, { capture: true })
      })
    }
  }, [])

  const handleExitEcoMode = () => {
    setIsActive(false)
  }

  if (!isActive) return null

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center cursor-pointer"
      onClick={handleExitEcoMode}
      onMouseMove={handleExitEcoMode}
      onKeyDown={handleExitEcoMode}
      onTouchStart={handleExitEcoMode}
      tabIndex={0}
    >
      <div className="text-center space-y-6 px-8">
        {/* Logo DMG */}
        <div className="flex justify-center mb-8">
          <Image
            src="/images/logos/DMG-logo-white.png"
            alt="DMG Logo"
            width={200}
            height={75}
            className="h-16 w-auto"
          />
        </div>
        
        {/* Testo principale */}
        <h1 className="text-xl lg:text-2xl font-extralight text-white tracking-wider">
          DRUGS MINERALS AND GENERICS ITALIA
        </h1>
        
        {/* Testo descrittivo */}
        <p className="text-sm lg:text-base text-white/90 font-extralight max-w-md mx-auto leading-relaxed">
          Questa schermata contribuisce al risparmio energetico quando ti allontani o resti inattivo
        </p>
        
        {/* Hint per uscire */}
        <p className="text-xs text-white/60 font-extralight mt-8">
          Muovi il mouse o premi un tasto per continuare
        </p>
      </div>
    </div>
  )
}
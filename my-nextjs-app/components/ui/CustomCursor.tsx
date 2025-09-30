'use client'

import { useEffect, useState, useRef } from 'react'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const animationRef = useRef<number>()

  useEffect(() => {
    setIsVisible(true)

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    document.addEventListener('mousemove', updateMousePosition)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const animate = () => {
      setCirclePosition(prev => {
        const dx = mousePosition.x - prev.x
        const dy = mousePosition.y - prev.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        // Elastic easing - più veloce quando è lontano, più lento quando è vicino
        const elasticFactor = Math.min(distance * 0.002 + 0.05, 0.15)
        
        return {
          x: prev.x + dx * elasticFactor,
          y: prev.y + dy * elasticFactor
        }
      })
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePosition])

  return (
    <>
      {/* Restore normal cursor */}
      <style jsx global>{`
        * {
          cursor: auto !important;
        }
      `}</style>
      
      <div
        className={`fixed pointer-events-none z-[9999] transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: circlePosition.x,
          top: circlePosition.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Large very thin black circle that follows cursor */}
        <div className="w-16 h-16 border-[0.5px] border-black rounded-full" />
      </div>
    </>
  )
}
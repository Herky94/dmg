'use client'

import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [cursorType, setCursorType] = useState('default')

  useEffect(() => {
    // Show cursor after component mounts
    setIsVisible(true)

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = (e: Event) => {
      setIsHovering(true)
      const target = e.target as HTMLElement
      
      // Different cursor styles based on element type
      if (target.tagName === 'A') {
        setCursorType('link')
      } else if (target.tagName === 'BUTTON' || target.hasAttribute('role') && target.getAttribute('role') === 'button') {
        setCursorType('button')
      } else {
        setCursorType('hover')
      }
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      setCursorType('default')
    }

    // Add mouse move listener
    document.addEventListener('mousemove', updatePosition)

    // Add hover listeners for interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
    )

    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter)
      element.addEventListener('mouseleave', handleMouseLeave)
    })

    // Hide cursor when leaving window
    const handleWindowMouseLeave = () => setIsVisible(false)
    const handleWindowMouseEnter = () => setIsVisible(true)
    
    document.addEventListener('mouseleave', handleWindowMouseLeave)
    document.addEventListener('mouseenter', handleWindowMouseEnter)

    return () => {
      document.removeEventListener('mousemove', updatePosition)
      document.removeEventListener('mouseleave', handleWindowMouseLeave)
      document.removeEventListener('mouseenter', handleWindowMouseEnter)
      
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter)
        element.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  const getCursorSize = () => {
    if (cursorType === 'link') return { outer: 'w-14 h-14', inner: 'w-3 h-3' }
    if (cursorType === 'button') return { outer: 'w-16 h-16', inner: 'w-4 h-4' }
    if (isHovering) return { outer: 'w-12 h-12', inner: 'w-2 h-2' }
    return { outer: 'w-8 h-8', inner: 'w-1 h-1' }
  }

  const getCursorStyle = () => {
    if (cursorType === 'link') return 'border-2 border-blue-600 bg-blue-600 bg-opacity-20'
    if (cursorType === 'button') return 'border-2 border-gray-800 bg-gray-800 bg-opacity-15'
    if (isHovering) return 'border-2 border-black bg-black bg-opacity-10'
    return 'border border-black'
  }

  const { outer, inner } = getCursorSize()

  return (
    <>      
      <div
        className={`fixed pointer-events-none z-[9999] transition-all duration-300 ease-out mix-blend-difference ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Main cursor circle */}
        <div
          className={`${outer} ${getCursorStyle()} rounded-full transition-all duration-300 ease-out`}
        />
        
        {/* Inner dot */}
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${inner} bg-black rounded-full transition-all duration-300 ${
            cursorType === 'link' ? 'bg-blue-600' : 
            cursorType === 'button' ? 'bg-gray-800' : 'bg-black'
          }`}
        />

        {/* Text indicator for links */}
        {cursorType === 'link' && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-blue-600 pointer-events-none">
            →
          </div>
        )}
        
        {/* Text indicator for buttons */}
        {cursorType === 'button' && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-gray-800 pointer-events-none">
            ●
          </div>
        )}
      </div>
    </>
  )
}
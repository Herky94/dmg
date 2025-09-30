'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { menuData, MenuItem } from './menuData'

export default function Header() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  // Calcola il progresso dello scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setScrollProgress(Math.min(progress, 100))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-sm">
      <div className="w-full px-20">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logos/DMG-logo-white.png"
                alt="DMG Logo"
                width={80}
                height={30}
                className="h-8 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Progress Bar Central */}
          <div className="flex-1 mx-8">
            <div className="w-full h-0.5 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-300 ease-out"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center space-x-1">
            {menuData.map((item: MenuItem) => (
              <div 
                key={item.name} 
                className="relative"
                onMouseEnter={() => item.hasDropdown && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="text-white hover:text-gray-300 px-4 py-2 text-sm transition-colors duration-200 flex items-center"
                  style={{ fontFamily: 'var(--font-lexend-deca)', fontWeight: 300 }}
                >
                  {item.name}
                  {item.hasDropdown && (
                    <svg 
                      className="ml-1 h-4 w-4" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 9l-7 7-7-7" 
                      />
                    </svg>
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.hasDropdown && item.submenu && openDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-black/90 backdrop-blur-sm rounded-md shadow-lg border border-gray-700">
                    <div className="py-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-white hover:text-gray-300 hover:bg-white/10 transition-colors duration-200"
                          style={{ fontFamily: 'var(--font-lexend-deca)', fontWeight: 300 }}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              type="button"
              className="text-white hover:text-gray-300 p-2"
              aria-label="Toggle menu"
            >
              <svg 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}   
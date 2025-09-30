'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function FeaturedProductsSection() {
  return (
    <section className="py-40 bg-white">
      <div className="max-w-[1650px] mx-auto px-12">
        {/* Pre-title */}
        <div className="text-center mb-6">
          <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">
            HOW WE WORK
          </span>
        </div>

        {/* Main Title with number and year */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-8xl lg:text-9xl font-extralight text-gray-900 text-center flex-1 animate-fade-in-up">
            prodotti.
          </h2>
        </div>

        {/* Description */}
        <div className="text-center mb-16">
          <p className="text-base text-gray-700 leading-relaxed max-w-3xl mx-auto">
            To ensure a seamless and effortless briefing on your side we have set 
            up a simple and efficient process that will help us get started working 
            together as quickly as possible
          </p>
        </div>

        {/* Separator Line */}
        <div className="flex justify-center mb-16">
          <div className="w-24 h-px bg-gray-300"></div>
        </div>

        {/* Products Carousel */}
        <ProductsCarousel />
      </div>
    </section>
  )
}

function ProductsCarousel() {
  const products = [
    {
      id: 1,
      name: 'Diplorin®',
      description: 'Spray nasale a base di Azelastina e Fluticasone per il trattamento della rinite allergica...',
      image: '/images/prodotti/diplorin.jpg'
    },
    {
      id: 2,
      name: 'Arinit®', 
      description: 'Spray nasale a base di Mometasone, indicato per la rinite allergica e la poliposi nasale...',
      image: '/images/prodotti/arint.png'
    },
    {
      id: 3,
      name: 'Linea Gastrotuss®',
      description: 'Dispositivi medici per la protezione della mucosa esofagea e gastrica in caso di reflusso...',
      image: '/images/prodotti/gastrotuss.png'
    },
    {
      id: 4,
      name: 'Emofix®',
      description: 'Unguento barriera emostatico per la prevenzione e gestione di sanguinamenti locali...',
      image: '/images/prodotti/emofix.webp'
    },
    {
      id: 5,
      name: 'Rinopanteina®',
      description: 'Unguento nasale con acido ialuronico e vitamine per idratare e proteggere la mucosa nasale...',
      image: '/images/prodotti/diplorin.jpg'
    }
  ]

  const [translateX, setTranslateX] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(true)
  
  // Create infinite array with 3 sets for seamless loop
  const infiniteProducts = [...products, ...products, ...products]
  const cardWidth = 25 // 100% / 4 cards = 25%
  
  // Start from middle set to allow backward scrolling
  const initialOffset = products.length * cardWidth

  useEffect(() => {
    setTranslateX(-initialOffset)
  }, [initialOffset])

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlay) return
    
    const interval = setInterval(() => {
      nextSlide()
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  const nextSlide = () => {
    setIsTransitioning(true)
    setTranslateX(prev => prev - cardWidth)
  }

  const prevSlide = () => {
    setIsTransitioning(true)
    setTranslateX(prev => prev + cardWidth)
  }

  // Handle infinite loop reset
  useEffect(() => {
    const handleTransitionEnd = () => {
      // If we've scrolled past the last set, jump back to the middle set
      if (translateX <= -(initialOffset + products.length * cardWidth)) {
        setIsTransitioning(false)
        setTranslateX(-initialOffset)
      }
      // If we've scrolled before the first set, jump to the middle set
      else if (translateX >= -initialOffset + cardWidth) {
        setIsTransitioning(false)
        setTranslateX(-(initialOffset + (products.length - 1) * cardWidth))
      }
    }

    const timer = setTimeout(() => {
      if (isTransitioning) {
        handleTransitionEnd()
      }
    }, 700) // Match transition duration

    return () => clearTimeout(timer)
  }, [translateX, isTransitioning, initialOffset, products.length, cardWidth])



  return (
    <div className="relative">
      {/* Products Grid */}
      <div 
        className="relative overflow-hidden"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        <div 
          className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
          style={{ transform: `translateX(${translateX}%)` }}
        >
          {infiniteProducts.map((product, index) => (
            <div 
              key={`${product.id}-${index}`} 
              className="w-1/4 flex-shrink-0 px-4 transform transition-all duration-500 hover:scale-105"
            >
              <div className="bg-white h-full border border-gray-200">
                {/* Product Image */}
                <div className="relative h-80 bg-gray-50 overflow-hidden group">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-8 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Product Info */}
                <div className="p-8">
                  {/* Circled Number */}
               
                  
                  {/* Title */}
                  <h3 className="text-[25px] font-medium text-gray-900 text-left mb-3 transition-colors duration-200 hover:text-gray-700">
                    {product.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed text-left transition-colors duration-200 hover:text-gray-800 mb-8">
                    {product.description}
                  </p>
                  
                  {/* Button */}
                  <div className="flex items-center gap-3 border border-black text-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition-all duration-300 cursor-pointer w-fit group">
                    <span className="text-sm font-medium">Vedi prodotto</span>
                    <div className="bg-black rounded-full w-8 h-8 flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                      <svg 
                        className="w-4 h-4 text-white transform transition-transform duration-300 group-hover:rotate-45 group-hover:text-black" 
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
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrow */}
      <div className="absolute top-1/2 -translate-y-1/2 left-full ml-8 z-20">
        <button 
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-black hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center shadow-lg"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
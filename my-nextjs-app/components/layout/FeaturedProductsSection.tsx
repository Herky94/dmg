'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function FeaturedProductsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-20">
        {/* Pre-title */}
        <div className="text-center mb-6">
          <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">
            • HOW WE WORK
          </span>
        </div>

        {/* Main Title with number and year */}
        <div className="flex justify-between items-center mb-8">
          <span className="text-sm text-gray-400">[03]</span>
          <h2 className="text-4xl lg:text-5xl font-light text-gray-900 text-center flex-1">
            Prodotti in evidenza
          </h2>
          <span className="text-sm text-gray-400">©2025</span>
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
      description: 'Spray nasale a base di Azelastina e Fluticasone per il trattamento della rinite allergica.',
      image: '/images/prodotti/diplorin.jpg'
    },
    {
      id: 2,
      name: 'Arinit®', 
      description: 'Spray nasale a base di Mometasone, indicato per la rinite allergica e la poliposi nasale.',
      image: '/images/prodotti/arint.png'
    },
    {
      id: 3,
      name: 'Linea Gastrotuss®',
      description: 'Dispositivi medici per la protezione della mucosa esofagea e gastrica in caso di reflusso.',
      image: '/images/prodotti/gastrotuss.png'
    },
    {
      id: 4,
      name: 'Emofix®',
      description: 'Unguento barriera emostatico per la prevenzione e gestione di sanguinamenti locali.',
      image: '/images/prodotti/emofix.webp'
    },
    {
      id: 5,
      name: 'Rinopanteina®',
      description: 'Unguento nasale con acido ialuronico e vitamine per idratare e proteggere la mucosa nasale.',
      image: '/images/prodotti/diplorin.jpg'
    }
  ]

  const [startIndex, setStartIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const itemsToShow = 4

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlay) return
    
    const interval = setInterval(() => {
      setStartIndex(prev => (prev + 1) % products.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlay, products.length])

  const nextSlide = () => {
    setStartIndex(prev => (prev + 1) % products.length)
  }

  const prevSlide = () => {
    setStartIndex(prev => (prev - 1 + products.length) % products.length)
  }

  // Get 4 visible products with infinite loop
  const getVisibleProducts = () => {
    const visible = []
    for (let i = 0; i < itemsToShow; i++) {
      const productIndex = (startIndex + i) % products.length
      visible.push({ ...products[productIndex], displayIndex: i + 1 })
    }
    return visible
  }

  const visibleProducts = getVisibleProducts()

  return (
    <div className="relative">
      {/* Products Grid */}
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        {visibleProducts.map((product, index) => (
          <div key={`${product.id}-${startIndex}-${index}`} className="bg-white">
            {/* Product Image */}
            <div className="relative h-64 bg-gray-50">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-6"
              />
            </div>

            {/* Product Info with border */}
            <div className="p-6 border-t border-gray-200">
              {/* Circled Number */}
              <div className="flex justify-start mb-4">
                <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
                  <span className="text-sm text-gray-600 font-medium">
                    {product.displayIndex}
                  </span>
                </div>
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-medium text-gray-900 text-left mb-3">
                {product.name}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed text-left">
                {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrow - Right side outside carousel */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-16">
        <button 
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-black hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
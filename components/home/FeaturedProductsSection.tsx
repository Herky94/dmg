"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { normalizeToSlug, getStrapiURL } from "@/lib/strapi";

interface Product {
  id: number;
  Name: string;
  Slug: string;
  sottotitolo: string;
  Images?: {
    url: string;
    alternativeText?: string;
  }[];
}

interface FeaturedProductsSectionProps {
  preTitle: string;
  title: string;
  cta: string;
  description: string;
  productCta: string;
  products?: Product[];
}

export default function FeaturedProductsSection({
  preTitle,
  title,
  cta,
  description,
  productCta,
  products = [],
}: FeaturedProductsSectionProps) {
  const params = useParams();
  const locale = (params?.locale as string) || "it";
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Imposta stato iniziale del titolo
    if (titleRef.current) {
      gsap.set(titleRef.current, {
        opacity: 0,
        x: -200,
      });
    }

    // Intersection Observer per l'animazione del titolo
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          // Anima il titolo da sinistra
          gsap.to(titleRef.current, {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: "power2.out",
          });
        }
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5] },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  return (
    <section
      ref={sectionRef}
      className="py-12 lg:py-[90px] bg-[#C34069] overflow-hidden"
    >
      <div className="container-dmg">
        {/* Pre-title */}
        <div className="text-center mb-6">
          <span className="text-sm lg:text-[16px] text-white uppercase tracking-widest font-normal">
            {preTitle}
          </span>
        </div>

        {/* Main Title with number and year */}
        <div className="flex flex-col justify-center items-center mb-8 gap-6">
          <h2 className="text-5xl lg:text-9xl font-extralight text-white text-center flex-1 animate-fade-in-up">
            {title}
          </h2>

          <Link
            href={`/${locale}/prodotti`}
            className="group flex items-center gap-3 border border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-[#C34069] transition-all duration-300 w-fit"
          >
            <span className="text-sm font-light uppercase tracking-wider">
              {cta}
            </span>
            <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center group-hover:bg-[#C34069] transition-colors duration-300">
              <svg
                className="w-4 h-4 text-[#C34069] group-hover:text-white transform transition-all duration-300 group-hover:rotate-45"
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
          </Link>
        </div>

        {/* Products Carousel */}
        <ProductsCarousel productCta={productCta} products={products} />
      </div>
    </section>
  );
}

function ProductsCarousel({
  productCta,
  products,
}: {
  productCta: string;
  products: Product[];
}) {
  const params = useParams();
  const locale = (params?.locale as string) || "it";

  const defaultProducts = [
    {
      id: 1,
      name: "Immunotrofina®",
      description:
        "Trattamento sintomatico della tosse e della raucedine nel bambino e nell'adulto",
      image: "/images/immunotrofina.webp",
      slug: "immunotrofina",
    },
    {
      id: 2,
      name: "Colinox®",
      description:
        "Trattamento di meteorismo, arofagia e coliche gassose del bambino e dell'adulto",
      image: "/images/colinox.webp",
      slug: "colinox",
    },
    {
      id: 3,
      name: "Linea Gastrotuss®",
      description:
        "Dispositivi medici per la protezione della mucosa esofagea e gastrica in caso di reflusso...",
      image: "/images/prodotti/gastrotuss.png",
      slug: "linea-gastrotuss",
    },
    {
      id: 4,
      name: "Emofix®",
      description:
        "Unguento barriera emostatico per la prevenzione e gestione di sanguinamenti locali...",
      image: "/images/prodotti/emofix.webp",
      slug: "emofix",
    },
    {
      id: 5,
      name: "Rinopanteina®",
      description:
        "Unguento nasale con acido ialuronico e vitamine per idratare e proteggere la mucosa nasale...",
      image: "/images/rinopanteina.webp",
      slug: "rinopanteina",
    },
  ];

  const displayProducts =
    products.length > 0
      ? products.map((p) => ({
          id: p.id,
          name: p.Name,
          description: p.sottotitolo,
          image:
            p.Images && p.Images.length > 0
              ? getStrapiURL(p.Images[0].url)
              : "/images/placeholder.jpg",
          slug: p.Slug,
        }))
      : defaultProducts;

  const [translateX, setTranslateX] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [itemsPerScreen, setItemsPerScreen] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);

  const minSwipeDistance = 50;

  // Create infinite array with 3 sets for seamless loop
  const infiniteProducts = [
    ...displayProducts,
    ...displayProducts,
    ...displayProducts,
  ];

  useEffect(() => {
    const handleResize = () => {
      let newItems = 1;
      if (window.innerWidth >= 1280) newItems = 5;
      else if (window.innerWidth >= 1024) newItems = 3;
      else if (window.innerWidth >= 640) newItems = 2;

      setItemsPerScreen(newItems);
      setIsReady(true);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardWidth = 100 / itemsPerScreen;

  // Start from middle set to allow backward scrolling
  const initialOffset = displayProducts.length * cardWidth;

  useEffect(() => {
    if (isReady) {
      setTranslateX(-initialOffset);
    }
  }, [initialOffset, isReady]);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlay || !isReady) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay, itemsPerScreen]); // Add itemsPerScreen dependency to update closure when width changes

  const nextSlide = () => {
    setIsTransitioning(true);
    setTranslateX((prev) => prev - cardWidth);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setTranslateX((prev) => prev + cardWidth);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlay(false);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    setIsAutoPlay(true);
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  // Handle infinite loop reset
  useEffect(() => {
    const handleTransitionEnd = () => {
      // If we've scrolled past the last set, jump back to the middle set
      if (translateX <= -(initialOffset + displayProducts.length * cardWidth)) {
        setIsTransitioning(false);
        setTranslateX(-initialOffset);
      }
      // If we've scrolled before the first set, jump to the middle set
      else if (translateX >= -initialOffset + cardWidth) {
        setIsTransitioning(false);
        setTranslateX(
          -(initialOffset + (displayProducts.length - 1) * cardWidth),
        );
      }
    };

    const timer = setTimeout(() => {
      if (isTransitioning) {
        handleTransitionEnd();
      }
    }, 700); // Match transition duration

    return () => clearTimeout(timer);
  }, [
    translateX,
    isTransitioning,
    initialOffset,
    displayProducts.length,
    cardWidth,
  ]);

  // Calculate active index
  const activeIndex =
    Math.round(Math.abs(translateX + initialOffset) / cardWidth) %
    displayProducts.length;

  return (
    <div
      className={`relative pb-8 transition-opacity duration-300 ${isReady ? "opacity-100" : "opacity-0"}`}
    >
      {/* Products Grid */}
      <div
        className="relative overflow-x-hidden"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="overflow-hidden py-12">
          <div
            className={`flex w-full ${
              isTransitioning
                ? "transition-transform duration-700 ease-in-out"
                : ""
            }`}
            style={{
              transform: `translateX(${translateX}%)`,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            {infiniteProducts.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className="flex-shrink-0 px-3 transform transition-all duration-500 hover:scale-105"
                style={{
                  width: `${cardWidth}%`,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <div className="bg-white h-full rounded-[15px] overflow-hidden flex flex-col shadow-lg">
                  {/* Product Image */}
                  <div className="relative h-60 bg-white overflow-hidden group flex-shrink-0">
                    <Link href={`/${locale}/prodotti/${product.slug}`}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-8 transition-transform duration-300 group-hover:scale-110 cursor-pointer"
                      />
                    </Link>
                  </div>

                  {/* Product Info */}
                  <div className="px-[35px] flex flex-col flex-1">
                    {/* Title */}
                    <h3 className="text-xl lg:text-2xl font-bold text-black leading-[1.2] text-left mb-3 transition-colors duration-200">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-[13px] font-light text-gray-600 leading-[1.5] text-left transition-colors duration-200 mb-4">
                      {product.description}
                    </p>

                    {/* Button */}
                    <Link
                      href={`/${locale}/prodotti/${product.slug}`}
                      className="mb-8 flex items-center gap-3 bg-[#C34069]/16 text-[#C34069] px-6 py-3 rounded-full hover:bg-[#C34069] hover:text-white transition-all duration-300 cursor-pointer w-fit group"
                    >
                      <span className="text-[12px] font-medium">
                        {productCta}
                      </span>
                      <div className="bg-[#C34069] rounded-full w-6 h-6 flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                        <svg
                          className="w-3 h-3 text-white transition-colors duration-300 group-hover:text-[#C34069]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {displayProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true);
              setTranslateX(-(initialOffset + index * cardWidth));
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
              index === activeIndex
                ? "bg-white scale-125"
                : "border border-white hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

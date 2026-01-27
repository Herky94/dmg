"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getStrapiURL } from "@/lib/strapi";

interface Product {
  id: number;
  documentId: string;
  Name: string;
  Slug: string;
  sottotitolo: string;
  Description: any[];
  Images?: {
    url: string;
    alternativeText?: string;
  }[];
}

interface RelatedProductsProps {
  currentProduct: Product;
  relatedProducts: Product[];
  discoverMore?: string;
  title?: string;
}

const extractTextFromBlocks = (blocks: any[], limit: number = 100): string => {
  if (!blocks || !Array.isArray(blocks)) return "";

  let text = "";
  for (const block of blocks) {
    if (block.type === "paragraph" || block.type === "heading") {
      if (block.children) {
        for (const child of block.children) {
          if (child.type === "text") {
            text += child.text + " ";
          }
        }
      }
    }
    if (text.length >= limit) break;
  }

  return text.length > limit ? text.substring(0, limit) + "..." : text.trim();
};

export default function RelatedProducts({
  currentProduct,
  relatedProducts,
  discoverMore = "Scopri di più",
  title = "Prodotti Correlati.",
}: RelatedProductsProps) {
  const pathname = usePathname();
  const currentLocale = pathname.startsWith("/it")
    ? "it"
    : pathname.startsWith("/en")
      ? "en"
      : "it";

  const [translateX, setTranslateX] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [itemsPerScreen, setItemsPerScreen] = useState(4);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  // Filter out current product just in case
  const products = relatedProducts.filter(
    (p) => p.documentId !== currentProduct.documentId,
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerScreen(1);
      else if (window.innerWidth < 1024) setItemsPerScreen(2);
      else if (window.innerWidth < 1280) setItemsPerScreen(3);
      else setItemsPerScreen(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // If no related products, don't render section
  if (products.length === 0) return null;

  // Create infinite array with 3 sets for seamless loop if we have enough products
  // If we have very few products, we might not need infinite loop or we need to duplicate more
  const infiniteProducts =
    products.length >= 4
      ? [...products, ...products, ...products]
      : [
          ...products,
          ...products,
          ...products,
          ...products,
          ...products,
          ...products,
        ]; // Ensure enough items

  const cardWidth = 100 / itemsPerScreen;

  // Start from middle set to allow backward scrolling
  const initialOffset =
    products.length * cardWidth * (products.length >= 4 ? 1 : 2); // Adjust offset based on duplication

  useEffect(() => {
    setTranslateX(-initialOffset);
  }, [initialOffset]);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay, itemsPerScreen]);

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
      const totalWidth = infiniteProducts.length * cardWidth;
      const singleSetWidth = products.length * cardWidth;

      // If we've scrolled past the last set
      if (translateX <= -(initialOffset + singleSetWidth)) {
        setIsTransitioning(false);
        setTranslateX(-initialOffset);
      }
      // If we've scrolled before the first set
      else if (translateX >= -initialOffset + cardWidth) {
        setIsTransitioning(false);
        setTranslateX(-(initialOffset + singleSetWidth - cardWidth));
      }
    };

    const timer = setTimeout(() => {
      if (isTransitioning) {
        handleTransitionEnd();
      }
    }, 700);

    return () => clearTimeout(timer);
  }, [
    translateX,
    isTransitioning,
    initialOffset,
    products.length,
    cardWidth,
    infiniteProducts.length,
  ]);

  // Calculate active index
  const activeIndex =
    Math.round(Math.abs(translateX + initialOffset) / cardWidth) %
    products.length;

  return (
    <section className="py-12 lg:py-[90px] bg-[#C34069] overflow-hidden">
      <div className="container-dmg">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-5xl lg:text-[80px] font-extralight text-white text-center">
            {title}
          </h2>
        </div>

        {/* Products Carousel */}
        <div className="relative pb-8">
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
                style={{ transform: `translateX(${translateX}%)` }}
              >
                {infiniteProducts.map((product, index) => (
                  <div
                    key={`${product.documentId}-${index}`}
                    className="flex-shrink-0 px-3 transform transition-all duration-500 hover:scale-105"
                    style={{ width: `${cardWidth}%` }}
                  >
                    <div className="bg-white h-full rounded-[15px] overflow-hidden flex flex-col shadow-lg">
                      {/* Product Image */}
                      <Link
                        href={`/${currentLocale}/prodotti/${product.Slug}`}
                        className="relative h-60 bg-white overflow-hidden group flex-shrink-0 block"
                      >
                        {product.Images && product.Images[0] ? (
                          <Image
                            src={getStrapiURL(product.Images[0].url)}
                            alt={
                              product.Images[0].alternativeText ||
                              "Immagine prodotto"
                            }
                            fill
                            className="object-contain p-8 transition-transform duration-300 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            No Image
                          </div>
                        )}
                      </Link>

                      {/* Product Info */}
                      <div className="px-[35px] flex flex-col flex-1 pb-8">
                        {/* Title */}
                        <h3 className="text-xl lg:text-2xl font-bold text-black leading-[1.2] text-left mb-3 transition-colors duration-200">
                          {product.Name}
                        </h3>

                        {/* Description */}
                        <p className="text-[13px] font-light text-gray-600 leading-[1.5] text-left transition-colors duration-200 mb-4 line-clamp-3">
                          {extractTextFromBlocks(product.Description, 100)}
                        </p>

                        {/* Button */}
                        <Link
                          href={`/${currentLocale}/prodotti/${product.Slug}`}
                          className="mt-auto flex items-center gap-3 bg-[#C34069]/16 text-[#C34069] px-6 py-3 rounded-full hover:bg-[#C34069] hover:text-white transition-all duration-300 cursor-pointer w-fit group"
                        >
                          <span className="text-[12px] font-medium">
                            {discoverMore}
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
            {products.map((_, index) => (
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
      </div>
    </section>
  );
}

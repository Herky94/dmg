"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  getStrapiURL,
  normalizeToSlug,
  findByNormalizedName,
  getName,
} from "@/lib/strapi";

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
  aree_terapeutiche?: any[];
  classificazioni?: any[];
  formulazioni?: any[];
}

interface Filters {
  search: string;
  areeTerapeutiche: string[];
  classificazioni: string[];
  formulazioni: string[];
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

export default function ProductsGrid({
  initialProducts = [],
  initialAreas = [],
  initialClassifications = [],
  initialFormulations = [],
  initialClassificazioneFilter,
  initialAreaFilter,
  initialFormulazioneFilter,
  searchLabel = "Ricerca Prodotto",
  searchPlaceholder = "Cerca",
  discoverMore = "Scopri di più",
}: {
  initialProducts?: Product[];
  initialAreas?: any[];
  initialClassifications?: any[];
  initialFormulations?: any[];
  initialClassificazioneFilter?: string;
  initialAreaFilter?: string;
  initialFormulazioneFilter?: string;
  searchLabel?: string;
  searchPlaceholder?: string;
  discoverMore?: string;
}) {
  const pathname = usePathname();
  const currentLocale = pathname.startsWith("/it")
    ? "it"
    : pathname.startsWith("/en")
      ? "en"
      : "it";

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [displayedProducts, setDisplayedProducts] =
    useState<Product[]>(initialProducts);
  const [itemsToShow, setItemsToShow] = useState(12); // Paginazione client-side
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [pendingFilters, setPendingFilters] = useState<Filters | null>(null);

  const loaderRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (
          target.isIntersecting &&
          itemsToShow < displayedProducts.length &&
          !isAnimatingOut
        ) {
          // Add small delay for user experience (optional)
          const timer = setTimeout(() => {
            setItemsToShow((prev) => prev + 12);
          }, 300);
          return () => clearTimeout(timer);
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [itemsToShow, displayedProducts.length, isAnimatingOut]);

  // Initialize filters from URL params using normalized name matching
  const [filters, setFilters] = useState<Filters>(() => {
    const initialFilters: Filters = {
      search: "",
      areeTerapeutiche: [],
      classificazioni: [],
      formulazioni: [],
    };

    // Match classificazione using normalized Name (Strapi doesn't have Slug for classifications)
    if (initialClassificazioneFilter && initialClassifications.length > 0) {
      const match = findByNormalizedName(
        initialClassifications,
        initialClassificazioneFilter,
      );
      if (match) {
        initialFilters.classificazioni = [match.documentId];
        console.log(
          `✅ Match classificazione: ${getName(match)} (documentId: ${match.documentId})`,
        );
      } else {
        console.log(
          `❌ Nessun match per classificazione: ${initialClassificazioneFilter}`,
        );
      }
    }

    // Match area terapeutica using normalized Name
    if (initialAreaFilter && initialAreas.length > 0) {
      const match = findByNormalizedName(initialAreas, initialAreaFilter);
      if (match) {
        initialFilters.areeTerapeutiche = [match.documentId];
        console.log(
          `✅ Match area terapeutica: ${getName(match)} (documentId: ${match.documentId})`,
        );
      } else {
        console.log(`❌ Nessun match per area: ${initialAreaFilter}`);
      }
    }

    // Match formulazione using normalized Name (some have Slug, some don't)
    if (initialFormulazioneFilter && initialFormulations.length > 0) {
      // Try Slug first, then normalized Name as fallback
      let match = initialFormulations.find(
        (f: any) => f.Slug === initialFormulazioneFilter,
      );
      if (!match) {
        match = findByNormalizedName(
          initialFormulations,
          initialFormulazioneFilter,
        );
      }
      if (match) {
        initialFilters.formulazioni = [match.documentId];
        console.log(
          `✅ Match formulazione: ${getName(match)} (documentId: ${match.documentId})`,
        );
      } else {
        console.log(
          `❌ Nessun match per formulazione: ${initialFormulazioneFilter}`,
        );
      }
    }

    return initialFilters;
  });

  const [areeTerapeutiche, setAreeTerapeutiche] = useState<any[]>(initialAreas);
  const [classificazioni, setClassificazioni] = useState<any[]>(
    initialClassifications,
  );
  const [formulazioni, setFormulazioni] = useState<any[]>(initialFormulations);

  // Sync filters when URL params change (e.g., navigation from menu)
  useEffect(() => {
    const newFilters: Filters = {
      search: "",
      areeTerapeutiche: [],
      classificazioni: [],
      formulazioni: [],
    };

    // Match classificazione
    if (initialClassificazioneFilter && initialClassifications.length > 0) {
      const match = findByNormalizedName(
        initialClassifications,
        initialClassificazioneFilter,
      );
      if (match) {
        newFilters.classificazioni = [match.documentId];
        console.log(`✅ [Sync] Match classificazione: ${getName(match)}`);
      }
    }

    // Match area terapeutica
    if (initialAreaFilter && initialAreas.length > 0) {
      const match = findByNormalizedName(initialAreas, initialAreaFilter);
      if (match) {
        newFilters.areeTerapeutiche = [match.documentId];
        console.log(`✅ [Sync] Match area: ${getName(match)}`);
      }
    }

    // Match formulazione
    if (initialFormulazioneFilter && initialFormulations.length > 0) {
      let match = initialFormulations.find(
        (f: any) => f.Slug === initialFormulazioneFilter,
      );
      if (!match) {
        match = findByNormalizedName(
          initialFormulations,
          initialFormulazioneFilter,
        );
      }
      if (match) {
        newFilters.formulazioni = [match.documentId];
        console.log(`✅ [Sync] Match formulazione: ${getName(match)}`);
      }
    }

    setFilters(newFilters);
  }, [
    initialClassificazioneFilter,
    initialAreaFilter,
    initialFormulazioneFilter,
    initialClassifications,
    initialAreas,
    initialFormulations,
  ]);

  /* 
    Removed legacy client-side fetching to support Static Export.
    Data is now passed as props from the parent server component.
  */

  // Apply filters whenever filters or products change
  useEffect(() => {
    // Se c'è un filtro pendente o stiamo già animando, non fare nulla nel flusso normale
    if (isAnimatingOut) return;

    const applyFilters = (currentFilters: Filters) => {
      let filtered = [...products];

      // Search filter
      if (currentFilters.search) {
        filtered = filtered.filter((p) => {
          const productName = getName(p);
          return productName
            .toLowerCase()
            .includes(currentFilters.search.toLowerCase());
        });
      }

      // Area Terapeutica filter
      if (currentFilters.areeTerapeutiche.length > 0) {
        filtered = filtered.filter((p) =>
          p.aree_terapeutiche?.some((area: any) =>
            currentFilters.areeTerapeutiche.includes(area.documentId),
          ),
        );
      }

      // Classificazione filter
      if (currentFilters.classificazioni.length > 0) {
        filtered = filtered.filter((p) =>
          p.classificazioni?.some((c: any) =>
            currentFilters.classificazioni.includes(c.documentId),
          ),
        );
      }

      // Formulazione filter
      if (currentFilters.formulazioni.length > 0) {
        filtered = filtered.filter((p) =>
          p.formulazioni?.some((f: any) =>
            currentFilters.formulazioni.includes(f.documentId),
          ),
        );
      }
      return filtered;
    };

    // Logica per gestire il cambio filtri con animazione
    // Se i filtri sono cambiati rispetto all'ultimo stato renderizzato...
    // Ma qui 'filters' è lo stato corrente.
    // Dobbiamo confrontare i prodotti visualizzati con quelli che risulterebbero dai nuovi filtri

    const newFilteredProducts = applyFilters(filters);

    // Se i prodotti sono diversi da quelli mostrati, avvia animazione uscita
    // Usiamo stringify per confronto rapido (o lunghezza + id primo elemento)
    const currentIds = displayedProducts
      .map((p) => p.documentId)
      .sort()
      .join(",");
    const newIds = newFilteredProducts
      .map((p) => p.documentId)
      .sort()
      .join(",");

    if (currentIds !== newIds) {
      setIsAnimatingOut(true);

      // Aspetta la fine dell'animazione di uscita (300ms)
      setTimeout(() => {
        setDisplayedProducts(newFilteredProducts);
        setItemsToShow(12); // Reset paginazione al cambio filtri
        setIsAnimatingOut(false);
      }, 300);
    }
  }, [filters, products]); // Rimuovi filteredProducts dalla dipendenza per evitare loop se lo usassimo

  const toggleFilter = (type: keyof Filters, value: string) => {
    setFilters((prev) => {
      const currentArray = prev[type] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((v) => v !== value)
        : [...currentArray, value];

      return { ...prev, [type]: newArray };
    });
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      areeTerapeutiche: [],
      classificazioni: [],
      formulazioni: [],
    });
  };

  return (
    <section className="py-20 bg-[#F5F5F5]">
      <div className="container-dmg">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:col-span-1 space-y-6 h-fit">
              {/* Search Box */}
              <div className="bg-white rounded-[13px] p-[30px]">
                <h3 className="text-[12px] font-medium text-[#E6E6EA] mb-4 uppercase tracking-wider">
                  {searchLabel}
                </h3>
                <div className="relative">
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#929292]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={filters.search}
                    onChange={(e) =>
                      setFilters({ ...filters, search: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2 rounded-full border-[0.75px] border-[#E6E6EA] bg-transparent text-sm text-center placeholder:text-[#E6E6EA] focus:outline-none focus:ring-2 focus:ring-[#C34069]"
                  />
                </div>
              </div>

              {/* Filters Box */}
              <div className="bg-white rounded-[13px] p-[30px]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[12px] font-medium text-[#E6E6EA] uppercase tracking-wider">
                    Filtra Prodotti
                  </h3>
                  <button
                    onClick={resetFilters}
                    className="relative group w-8 h-8 rounded-full border border-[#E6E6EA] flex items-center justify-center hover:bg-black hover:border-black hover:text-white transition-all duration-300 text-gray-400 cursor-pointer"
                    aria-label="Resetta filtri"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>

                    {/* Tooltip */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                      <div className="bg-black text-white text-xs px-3 py-1.5 rounded-full shadow-lg">
                        Resetta Filtri
                      </div>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black rotate-45"></div>
                    </div>
                  </button>
                </div>

                {/* Aree Terapeutiche */}
                <div className="mb-6">
                  <p className="text-[18px] font-semibold text-[#929292] mb-3">
                    Aree Terapeutiche
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {areeTerapeutiche.map((area) => (
                      <button
                        key={area.documentId}
                        onClick={() =>
                          toggleFilter("areeTerapeutiche", area.documentId)
                        }
                        className={`w-full py-2 rounded-full text-[13px] font-normal transition-all duration-300 border-[0.75px] cursor-pointer ${
                          filters.areeTerapeutiche.includes(area.documentId)
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-700 border-[#E6E6EA] hover:bg-black hover:text-white hover:border-black"
                        }`}
                      >
                        {getName(area)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-[1px] bg-[#E6E6EA] mb-6"></div>

                {/* Classificazione */}
                <div className="mb-6">
                  <p className="text-[18px] font-semibold text-[#929292] mb-3">
                    Classificazione
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {classificazioni.map((classe) => (
                      <button
                        key={classe.documentId}
                        onClick={() =>
                          toggleFilter("classificazioni", classe.documentId)
                        }
                        className={`w-full py-2 rounded-full text-[13px] font-normal transition-all duration-300 border-[0.75px] cursor-pointer ${
                          filters.classificazioni.includes(classe.documentId)
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-700 border-[#E6E6EA] hover:bg-black hover:text-white hover:border-black"
                        }`}
                      >
                        {getName(classe)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-[1px] bg-[#E6E6EA] mb-6"></div>

                {/* Formulazione */}
                <div className="mb-6">
                  <p className="text-[18px] font-semibold text-[#929292] mb-3">
                    Formulazione
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {formulazioni.map((form) => (
                      <button
                        key={form.documentId}
                        onClick={() =>
                          toggleFilter("formulazioni", form.documentId)
                        }
                        className={`w-full py-2 rounded-full text-[13px] font-normal transition-all duration-300 border-[0.75px] cursor-pointer ${
                          filters.formulazioni.includes(form.documentId)
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-700 border-[#E6E6EA] hover:bg-black hover:text-white hover:border-black"
                        }`}
                      >
                        {getName(form)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {displayedProducts
                  .slice(0, itemsToShow)
                  .map((product, index) => (
                    <div
                      key={product.documentId}
                      className={`bg-white h-full rounded-[12px] overflow-hidden flex flex-col shadow-lg transform transition-all duration-500 hover:scale-[1.02] ${
                        isAnimatingOut
                          ? "animate-fade-out-down"
                          : "animate-fade-in-up opacity-0"
                      }`}
                      style={{
                        animationDelay: isAnimatingOut
                          ? "0ms"
                          : `${(index % 12) * 50}ms`, // Stagger reset per ogni batch, più veloce
                      }}
                    >
                      {/* Product Image */}
                      <Link
                        href={`/${currentLocale}/prodotti/${product.Slug}`}
                        className="relative w-full aspect-[285/220] bg-white overflow-hidden group flex-shrink-0 block cursor-pointer"
                      >
                        {product.Images && product.Images[0] ? (
                          <Image
                            src={getStrapiURL(product.Images[0].url)}
                            alt={
                              product.Images[0].alternativeText ||
                              "Immagine prodotto"
                            }
                            fill
                            quality={100}
                            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            No Image
                          </div>
                        )}
                      </Link>

                      {/* Product Info */}
                      <div className="px-[55px] py-[25px] flex flex-col flex-1">
                        {/* Title */}
                        <h3 className="text-[18px] font-semibold text-black leading-[1.2] text-left mb-3 transition-colors duration-200">
                          {getName(product)}
                        </h3>

                        {/* Description */}
                        <p className="text-[14px] font-thin text-black leading-[1.5] text-left transition-colors duration-200 mb-4">
                          {extractTextFromBlocks(product.Description, 100)}
                        </p>

                        {/* Button */}
                        <Link
                          href={`/${currentLocale}/prodotti/${product.Slug}`}
                          className="mb-8 flex items-center gap-3 bg-[#C34069]/16 text-[#C34069] px-6 py-3 rounded-full hover:bg-[#C34069] hover:text-white transition-all duration-300 cursor-pointer w-fit group"
                        >
                          <span className="text-[12px] font-normal">
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
                  ))}
              </div>

              {!isAnimatingOut && displayedProducts.length === 0 && (
                <div className="text-center py-20 animate-fade-in-up">
                  <p className="text-gray-500 text-lg">
                    Nessun prodotto trovato con i filtri selezionati.
                  </p>
                </div>
              )}

              {/* Infinite Scroll Loader */}
              {!isAnimatingOut && itemsToShow < displayedProducts.length && (
                <div ref={loaderRef} className="flex justify-center mt-12 py-4">
                  <Loader2 className="w-8 h-8 text-[#C34069] animate-spin" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

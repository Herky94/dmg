"use client";

import { useState, useEffect, useRef, useMemo } from "react";
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
import { useProductFilters } from "@/lib/useProductFilters";

interface Product {
  id: number;
  documentId: string;
  Name: string;
  Slug: string;
  sottotitolo: string;
  Description: any[];
  sortOrder?: number;
  Images?: {
    url: string;
    alternativeText?: string;
  }[];
  aree_terapeutiche?: any[];
  classificazioni?: any[];
  formulazioni?: any[];
}

interface Drug {
  id: number;
  documentId: string;
  Nome?: string; // IT
  Name?: string; // EN
  Slug: string;
  LinkEsterno?: string; // IT
  ExternalLink?: string; // EN
  Descrizione?: string; // IT
  Description?: string; // EN
  sortOrder?: number;
  Attivo?: boolean; // IT
  Active?: boolean; // EN
  Logo?: {
    url: string;
    alternativeText?: string;
  };
}

interface Filters {
  search: string;
  areeTerapeutiche: string[];
  classificazioni: string[];
  formulazioni: string[];
}

type SortOption = "relevance" | "az" | "za";

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

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

const FilterSection = ({ title, children }: FilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center mb-3 lg:cursor-default focus:outline-none"
        type="button"
      >
        <p className="text-[18px] font-semibold text-[#929292]">{title}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-5 h-5 text-[#929292] lg:hidden transform transition-transform duration-500 ease-out ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-out lg:!grid-rows-[1fr] ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

export default function ProductsGrid({
  initialProducts = [],
  initialAreas = [],
  initialClassifications = [],
  initialFormulations = [],
  initialDrugs = [],
  initialClassificazioneFilter,
  initialAreaFilter,
  initialFormulazioneFilter,
  searchLabel = "Ricerca Prodotto",
  searchPlaceholder = "Cerca",
  discoverMore = "Scopri di più",
  filterProducts = "Filtra Prodotti",
  resetFiltersLabel = "Resetta Filtri",
  therapeuticAreas = "Aree Terapeutiche",
  classification = "Classificazione",
  formulation = "Formulazione",
  noProductsFound = "Nessun prodotto trovato con i filtri selezionati.",
  sortLabel = "Ordina",
  relevanceLabel = "Rilevanza",
  drugLeafletText = "Per consultare il foglietto illustrativo o il Riassunto delle Caratteristiche del Prodotto (RCP)",
  visitSiteLabel = "Visita il sito",
  noDrugsFound = "Nessun farmaco trovato.",
}: {
  initialProducts?: Product[];
  initialAreas?: any[];
  initialClassifications?: any[];
  initialFormulations?: any[];
  initialDrugs?: Drug[];
  initialClassificazioneFilter?: string;
  initialAreaFilter?: string;
  initialFormulazioneFilter?: string;
  searchLabel?: string;
  searchPlaceholder?: string;
  discoverMore?: string;
  filterProducts?: string;
  resetFiltersLabel?: string;
  therapeuticAreas?: string;
  classification?: string;
  formulation?: string;
  noProductsFound?: string;
  sortLabel?: string;
  relevanceLabel?: string;
  drugLeafletText?: string;
  visitSiteLabel?: string;
  noDrugsFound?: string;
}) {
  const pathname = usePathname();
  const currentLocale = pathname.startsWith("/it")
    ? "it"
    : pathname.startsWith("/en")
      ? "en"
      : "it";

  const { saveFilters } = useProductFilters();

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [drugs] = useState<Drug[]>(initialDrugs);
  const [displayedProducts, setDisplayedProducts] =
    useState<Product[]>(initialProducts);
  const [itemsToShow, setItemsToShow] = useState(12); // Paginazione client-side
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [pendingFilters, setPendingFilters] = useState<Filters | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>("relevance");

  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close sort dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const loaderRef = useRef<HTMLDivElement>(null);

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

  // Check if "Farmaci" classification is among the selected ones
  const isFarmaciSelected = useMemo(() => {
    if (filters.classificazioni.length === 0) return false;

    // Check if any of the selected classifications is "Farmaci" or "Drug"
    return filters.classificazioni.some((classId) => {
      const selectedClassification = classificazioni.find(
        (c: any) => c.documentId === classId,
      );

      if (!selectedClassification) return false;

      const classificationName = getName(selectedClassification).toLowerCase();
      return (
        classificationName === "farmaci" ||
        classificationName === "drug" ||
        classificationName === "drugs"
      );
    });
  }, [filters.classificazioni, classificazioni]);

  // Show drugs when: no classification filter OR Farmaci is among the selected
  const shouldShowDrugs = useMemo(() => {
    // If no classification filter is applied, show all including drugs
    if (filters.classificazioni.length === 0) return true;
    // If Farmaci is among the selected classifications, show drugs
    return isFarmaciSelected;
  }, [filters.classificazioni.length, isFarmaciSelected]);

  // Filter and sort drugs
  const displayedDrugs = useMemo(() => {
    if (!shouldShowDrugs) return [];

    // Filter only active drugs
    const activeDrugs = drugs.filter((drug) => {
      const isActive = drug.Attivo ?? drug.Active ?? true;
      return isActive;
    });

    // Apply sorting based on sortOption
    return [...activeDrugs].sort((a, b) => {
      const nameA = (a.Nome ?? a.Name ?? "").toLowerCase();
      const nameB = (b.Nome ?? b.Name ?? "").toLowerCase();

      switch (sortOption) {
        case "az":
          return nameA.localeCompare(nameB);
        case "za":
          return nameB.localeCompare(nameA);
        case "relevance":
        default:
          // Sort by sortOrder, then alphabetically
          const orderA = a.sortOrder ?? 999;
          const orderB = b.sortOrder ?? 999;
          if (orderA !== orderB) {
            return orderA - orderB;
          }
          return nameA.localeCompare(nameB);
      }
    });
  }, [shouldShowDrugs, drugs, sortOption]);

  // Combined items array for pagination - products first, then drugs
  const combinedItems = useMemo(() => {
    const items: Array<
      { type: "product"; data: Product } | { type: "drug"; data: Drug }
    > = [];

    // Add all displayed products
    displayedProducts.forEach((product) => {
      items.push({ type: "product", data: product });
    });

    // Add drugs if they should be shown
    if (shouldShowDrugs) {
      displayedDrugs.forEach((drug) => {
        items.push({ type: "drug", data: drug });
      });
    }

    return items;
  }, [displayedProducts, displayedDrugs, shouldShowDrugs]);

  // Total items count for infinite scroll
  const totalItemsCount = combinedItems.length;

  // Intersection Observer for Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (
          target.isIntersecting &&
          itemsToShow < totalItemsCount &&
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
  }, [itemsToShow, totalItemsCount, isAnimatingOut]);

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

    const applySorting = (
      productsToSort: Product[],
      sort: SortOption,
    ): Product[] => {
      const sorted = [...productsToSort];

      switch (sort) {
        case "relevance":
          // Sort by sortOrder (lower = higher priority), then alphabetically
          return sorted.sort((a, b) => {
            const orderA = a.sortOrder ?? 999;
            const orderB = b.sortOrder ?? 999;
            if (orderA !== orderB) {
              return orderA - orderB;
            }
            // If same order, sort alphabetically
            return getName(a).localeCompare(getName(b));
          });
        case "az":
          return sorted.sort((a, b) => getName(a).localeCompare(getName(b)));
        case "za":
          return sorted.sort((a, b) => getName(b).localeCompare(getName(a)));
        default:
          return sorted;
      }
    };

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

      // Apply sorting
      filtered = applySorting(filtered, sortOption);

      return filtered;
    };

    // Logica per gestire il cambio filtri con animazione
    // Se i filtri sono cambiati rispetto all'ultimo stato renderizzato...
    // Ma qui 'filters' è lo stato corrente.
    // Dobbiamo confrontare i prodotti visualizzati con quelli che risulterebbero dai nuovi filtri

    const newFilteredProducts = applyFilters(filters);

    // Se i prodotti sono diversi da quelli mostrati, avvia animazione uscita
    // Usiamo stringify per confronto rapido (o lunghezza + id primo elemento)
    const currentIds = displayedProducts.map((p) => p.documentId).join(",");
    const newIds = newFilteredProducts.map((p) => p.documentId).join(",");

    if (currentIds !== newIds) {
      setIsAnimatingOut(true);

      // Aspetta la fine dell'animazione di uscita (300ms)
      setTimeout(() => {
        setDisplayedProducts(newFilteredProducts);
        setItemsToShow(12); // Reset paginazione al cambio filtri
        setIsAnimatingOut(false);
      }, 300);
    }
  }, [filters, products, sortOption]); // Rimuovi filteredProducts dalla dipendenza per evitare loop se lo usassimo

  const toggleFilter = (type: keyof Filters, value: string) => {
    setFilters((prev) => {
      const currentArray = prev[type] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((v) => v !== value)
        : [...currentArray, value];

      const newFilters = { ...prev, [type]: newArray };

      // Salva i filtri nel sessionStorage per la persistenza (salva i nomi normalizzati)
      const classificazioneName = newFilters.classificazioni[0]
        ? normalizeToSlug(
            getName(
              classificazioni.find(
                (c: any) => c.documentId === newFilters.classificazioni[0],
              ),
            ),
          )
        : undefined;

      const areaName = newFilters.areeTerapeutiche[0]
        ? normalizeToSlug(
            getName(
              areeTerapeutiche.find(
                (a: any) => a.documentId === newFilters.areeTerapeutiche[0],
              ),
            ),
          )
        : undefined;

      const formulazioneName = newFilters.formulazioni[0]
        ? (
            formulazioni.find(
              (f: any) => f.documentId === newFilters.formulazioni[0],
            ) as any
          )?.Slug ||
          normalizeToSlug(
            getName(
              formulazioni.find(
                (f: any) => f.documentId === newFilters.formulazioni[0],
              ),
            ),
          )
        : undefined;

      saveFilters({
        classificazione: classificazioneName,
        area: areaName,
        formulazione: formulazioneName,
      });

      return newFilters;
    });
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      areeTerapeutiche: [],
      classificazioni: [],
      formulazioni: [],
    });
    setSortOption("relevance");
    saveFilters({});
  };

  // Helper to build query string from current filters
  const buildFilterQueryString = (): string => {
    const params = new URLSearchParams();

    if (filters.classificazioni.length > 0) {
      const classification = classificazioni.find(
        (c: any) => c.documentId === filters.classificazioni[0],
      );
      if (classification) {
        params.append(
          "classificazione",
          normalizeToSlug(getName(classification)),
        );
      }
    }

    if (filters.areeTerapeutiche.length > 0) {
      const area = areeTerapeutiche.find(
        (a: any) => a.documentId === filters.areeTerapeutiche[0],
      );
      if (area) {
        params.append("area", normalizeToSlug(getName(area)));
      }
    }

    if (filters.formulazioni.length > 0) {
      const formulazione = formulazioni.find(
        (f: any) => f.documentId === filters.formulazioni[0],
      );
      if (formulazione) {
        params.append(
          "formulazione",
          formulazione.Slug || normalizeToSlug(getName(formulazione)),
        );
      }
    }

    return params.toString() ? `?${params.toString()}` : "";
  };

  return (
    <section className="py-20 bg-[#F5F5F5]">
      <div className="container-dmg">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
                    {filterProducts}
                  </h3>
                  <div className="flex items-center gap-2">
                    {/* Sort Dropdown (Custom) */}
                    <div ref={sortRef} className="relative">
                      <button
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        className="flex items-center justify-between gap-3 bg-white border border-[#E6E6EA] rounded-full px-4 py-2 min-w-[100px] text-xs text-black hover:border-black transition-all duration-200"
                        title="Ordina prodotti"
                      >
                        <span className="select-none font-medium">
                          {sortOption === "relevance"
                            ? relevanceLabel
                            : sortOption === "az"
                              ? "A-Z"
                              : "Z-A"}
                        </span>
                        <svg
                          className={`w-3 h-3 text-black transform transition-transform duration-200 ${
                            isSortOpen ? "rotate-180" : ""
                          }`}
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
                      </button>

                      {/* Dropdown Menu */}
                      {isSortOpen && (
                        <div className="absolute top-full right-0 mt-2 w-32 bg-white border border-[#E6E6EA] rounded-[15px] p-2 z-20 shadow-lg flex flex-col gap-1">
                          <button
                            onClick={() => {
                              setSortOption("relevance");
                              setIsSortOpen(false);
                            }}
                            className={`px-3 py-2 rounded-[10px] text-left text-xs font-medium transition-colors duration-200 w-full flex items-center justify-between ${
                              sortOption === "relevance"
                                ? "bg-[#C34069] text-white"
                                : "text-black hover:bg-gray-50 hover:text-[#C34069]"
                            }`}
                          >
                            <span>{relevanceLabel}</span>
                            {sortOption === "relevance" && (
                              <span className="text-[10px]">✓</span>
                            )}
                          </button>
                          <button
                            onClick={() => {
                              setSortOption("az");
                              setIsSortOpen(false);
                            }}
                            className={`px-3 py-2 rounded-[10px] text-left text-xs font-medium transition-colors duration-200 w-full flex items-center justify-between ${
                              sortOption === "az"
                                ? "bg-[#C34069] text-white"
                                : "text-black hover:bg-gray-50 hover:text-[#C34069]"
                            }`}
                          >
                            <span>A-Z</span>
                            {sortOption === "az" && (
                              <span className="text-[10px]">✓</span>
                            )}
                          </button>
                          <button
                            onClick={() => {
                              setSortOption("za");
                              setIsSortOpen(false);
                            }}
                            className={`px-3 py-2 rounded-[10px] text-left text-xs font-medium transition-colors duration-200 w-full flex items-center justify-between ${
                              sortOption === "za"
                                ? "bg-[#C34069] text-white"
                                : "text-black hover:bg-gray-50 hover:text-[#C34069]"
                            }`}
                          >
                            <span>Z-A</span>
                            {sortOption === "za" && (
                              <span className="text-[10px]">✓</span>
                            )}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Reset Button */}
                    <button
                      onClick={resetFilters}
                      className="relative group w-8 h-8 rounded-full border border-[#E6E6EA] flex items-center justify-center hover:bg-black hover:border-black hover:text-white transition-all duration-300 text-gray-400 cursor-pointer"
                      aria-label={resetFiltersLabel}
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
                          {resetFiltersLabel}
                        </div>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black rotate-45"></div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Aree Terapeutiche */}
                <FilterSection title={therapeuticAreas}>
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
                            : "bg-white text-black border-[#E6E6EA] hover:bg-black hover:text-white hover:border-black"
                        }`}
                      >
                        {getName(area)}
                      </button>
                    ))}
                  </div>
                </FilterSection>

                {/* Divider */}
                <div className="h-[1px] bg-[#E6E6EA] mb-6 hidden lg:block"></div>

                {/* Classificazione */}
                <FilterSection title={classification}>
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
                            : "bg-white text-black border-[#E6E6EA] hover:bg-black hover:text-white hover:border-black"
                        }`}
                      >
                        {getName(classe)}
                      </button>
                    ))}
                  </div>
                </FilterSection>

                {/* Divider */}
                <div className="h-[1px] bg-[#E6E6EA] mb-6 hidden lg:block"></div>

                {/* Formulazione */}
                <FilterSection title={formulation}>
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
                            : "bg-white text-black border-[#E6E6EA] hover:bg-black hover:text-white hover:border-black"
                        }`}
                      >
                        {getName(form)}
                      </button>
                    ))}
                  </div>
                </FilterSection>
              </div>
            </aside>

            {/* Products/Drugs Grid */}
            <div className="lg:col-span-2 xl:col-span-3">
              {/* Combined Grid: Products + Drugs with unified pagination */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {combinedItems.slice(0, itemsToShow).map((item, index) => {
                  if (item.type === "product") {
                    const product = item.data as Product;
                    return (
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
                            : `${(index % 12) * 50}ms`,
                        }}
                      >
                        {/* Product Image */}
                        <Link
                          href={`/${currentLocale}/prodotti/${product.Slug}${buildFilterQueryString()}`}
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
                            href={`/${currentLocale}/prodotti/${product.Slug}${buildFilterQueryString()}`}
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
                    );
                  } else {
                    // Drug card
                    const drug = item.data as Drug;
                    const drugName = drug.Nome ?? drug.Name ?? "";
                    const drugLink =
                      drug.LinkEsterno ?? drug.ExternalLink ?? "";

                    return (
                      <div
                        key={`drug-${drug.documentId}`}
                        className={`bg-white h-full rounded-[12px] overflow-hidden flex flex-col shadow-lg transform transition-all duration-500 hover:scale-[1.02] ${
                          isAnimatingOut
                            ? "animate-fade-out-down"
                            : "animate-fade-in-up opacity-0"
                        }`}
                        style={{
                          animationDelay: isAnimatingOut
                            ? "0ms"
                            : `${(index % 12) * 50}ms`,
                        }}
                      >
                        {/* Drug Logo - Clickable */}
                        <a
                          href={drugLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative w-full aspect-[285/220] bg-white overflow-hidden group flex-shrink-0 flex items-center justify-center cursor-pointer"
                        >
                          {drug.Logo?.url ? (
                            <Image
                              src={getStrapiURL(drug.Logo.url)}
                              alt={drug.Logo.alternativeText || drugName}
                              fill
                              quality={100}
                              className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                              No Image
                            </div>
                          )}
                        </a>

                        {/* Drug Info */}
                        <div className="px-[55px] py-[25px] flex flex-col flex-1">
                          {/* Fixed Description Text */}
                          <p className="text-[14px] font-thin text-black leading-[1.5] text-left transition-colors duration-200 mb-4">
                            {drugLeafletText}
                          </p>

                          {/* External Link Button */}
                          <a
                            href={drugLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mb-8 flex items-center gap-3 bg-[#C34069]/16 text-[#C34069] px-6 py-3 rounded-full hover:bg-[#C34069] hover:text-white transition-all duration-300 cursor-pointer w-fit group"
                          >
                            <span className="text-[12px] font-normal">
                              {visitSiteLabel}
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
                          </a>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>

              {/* No results message */}
              {!isAnimatingOut && combinedItems.length === 0 && (
                <div className="text-center py-20 animate-fade-in-up">
                  <p className="text-gray-500 text-lg">{noProductsFound}</p>
                </div>
              )}

              {/* Infinite Scroll Loader */}
              {!isAnimatingOut && itemsToShow < totalItemsCount && (
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

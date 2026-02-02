"use client";

import { useEffect, useState } from "react";

interface ProductFilters {
  classificazione?: string;
  area?: string;
  formulazione?: string;
}

export function useProductFilters() {
  const [filters, setFilters] = useState<ProductFilters>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Save filters to sessionStorage
  const saveFilters = (newFilters: ProductFilters) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("productFilters", JSON.stringify(newFilters));
      setFilters(newFilters);
    }
  };

  // Get filters from sessionStorage
  const getFilters = (): ProductFilters => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("productFilters");
      return stored ? JSON.parse(stored) : {};
    }
    return {};
  };

  // Clear filters from sessionStorage
  const clearFilters = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("productFilters");
      setFilters({});
    }
  };

  // Build query string from filters
  const buildQueryString = (filtersToUse?: ProductFilters): string => {
    let filtersObj: ProductFilters;

    if (filtersToUse) {
      filtersObj = filtersToUse;
    } else {
      // Read directly from sessionStorage on demand
      if (typeof window !== "undefined") {
        const stored = sessionStorage.getItem("productFilters");
        filtersObj = stored ? JSON.parse(stored) : {};
      } else {
        filtersObj = {};
      }
    }

    const params = new URLSearchParams();

    if (filtersObj.classificazione) {
      params.append("classificazione", filtersObj.classificazione);
    }
    if (filtersObj.area) {
      params.append("area", filtersObj.area);
    }
    if (filtersObj.formulazione) {
      params.append("formulazione", filtersObj.formulazione);
    }

    const queryString = params.toString();
    return queryString ? `?${queryString}` : "";
  };

  return {
    filters,
    saveFilters,
    getFilters,
    clearFilters,
    buildQueryString,
    isClient,
  };
}

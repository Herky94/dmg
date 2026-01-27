/**
 * Utility per API Strapi
 */

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";
const API_URL = `${STRAPI_URL}/api`;

/**
 * Costruisce l'URL completo per le immagini/file di Strapi
 */
export function getStrapiURL(path: string = ""): string {
  if (!path) return STRAPI_URL;

  // Se il path inizia con http, è già un URL completo
  if (path.startsWith("http")) return path;

  // Rimuovi lo slash iniziale se presente per evitare doppioni
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  return `${STRAPI_URL}/${cleanPath}`;
}

/**
 * Costruisce l'URL per le chiamate API
 */
export function getAPIURL(path: string = ""): string {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${API_URL}/${cleanPath}`;
}

/**
 * Helper functions for localized Strapi endpoints
 */
export function getProductsEndpoint(locale: "it" | "en" = "it"): string {
  return locale === "en" ? "prodotto-ens" : "prodottos";
}

export function getAreasEndpoint(locale: "it" | "en" = "it"): string {
  return locale === "en" ? "aree-terapeutiche-ens" : "aree-terapeutiches";
}

export function getClassificationsEndpoint(locale: "it" | "en" = "it"): string {
  return locale === "en" ? "classificazioni-ens" : "classificazionis";
}

export function getFormulationsEndpoint(locale: "it" | "en" = "it"): string {
  return locale === "en" ? "formulazione-ens" : "formulaziones";
}

/**
 * Fetch con retry automatico
 */
export async function fetchAPI(
  path: string,
  options: RequestInit = {},
  retries: number = 3,
): Promise<any> {
  const url = getAPIURL(path);

  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;

      // Attendi prima di ritentare (exponential backoff)
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, i) * 1000),
      );
    }
  }
}

/**
 * Tempo di revalidation per ISR (in secondi)
 */
export const REVALIDATE_TIME = parseInt(
  process.env.REVALIDATE_TIME || "3600",
  10,
);

/**
 * Normalizza un nome (da Strapi) in formato URL slug
 * Es: "Integratori Alimentari" -> "integratori-alimentari"
 * Utilizzata per match bidirezionale URL <-> Strapi Name
 */
export function normalizeToSlug(name: string): string {
  if (!name) return "";
  return name
    .toLowerCase()
    .trim()
    .replace(/[àáâãäå]/g, "a")
    .replace(/[èéêë]/g, "e")
    .replace(/[ìíîï]/g, "i")
    .replace(/[òóôõö]/g, "o")
    .replace(/[ùúûü]/g, "u")
    .replace(/[ñ]/g, "n")
    .replace(/[ç]/g, "c")
    .replace(/[®™©]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Trova un elemento in un array confrontando il nome normalizzato con lo slug URL
 */
export function findByNormalizedName<
  T extends { name?: string; Name?: string; documentId: string },
>(items: T[], urlSlug: string): T | undefined {
  return items.find((item) => {
    const itemName = item.name || item.Name;
    return itemName && normalizeToSlug(itemName) === urlSlug;
  });
}

/**
 * Helper per ottenere il nome da un oggetto che può avere name o Name
 */
export function getName(
  item: { name?: string; Name?: string } | undefined,
): string {
  if (!item) return "";
  return item.name || item.Name || "";
}

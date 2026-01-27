import { Header, Footer } from "@/components/layout";
import { PageHero, ProductsGrid } from "@/components/shared";
import EcoMode from "@/components/ui/EcoMode";
import {
  getAPIURL,
  REVALIDATE_TIME,
  getProductsEndpoint,
  getAreasEndpoint,
  getClassificationsEndpoint,
  getFormulationsEndpoint,
} from "@/lib/strapi";
import { getTranslations, Locale } from "@/lib/translations";
import type { Metadata } from "next";

// Function to get hero configurations based on locale
function getHeroConfigs(t: ReturnType<typeof getTranslations>) {
  return {
    "dispositivi-medici": {
      title: (
        <>
          {t.pages.prodotti.dispositiviMedici.title
            .split("\n")
            .map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
        </>
      ),
      description: t.pages.prodotti.dispositiviMedici.description,
      backgroundImage: "/images/dispositivi-medici-bg.jpg",
    },
    "integratori-alimentari": {
      title: (
        <>
          {t.pages.prodotti.integratoriAlimentari.title
            .split("\n")
            .map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
        </>
      ),
      description: t.pages.prodotti.integratoriAlimentari.description,
      backgroundImage: "/images/integratori-alimentari-bg.jpg",
    },
    farmaci: {
      title: t.pages.prodotti.farmaci.title,
      description: t.pages.prodotti.farmaci.description,
      backgroundImage: "/images/dispositivi-medici-bg.jpg",
    },
    default: {
      title: (
        <>
          {t.pages.prodotti.default.title.split("\n").map((line, i, arr) => (
            <span key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </>
      ),
      description: t.pages.prodotti.default.description,
      backgroundImage: "/images/integratori-alimentari-bg.jpg",
    },
  };
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ classificazione?: string }>;
}): Promise<Metadata> {
  const { classificazione } = await searchParams;

  if (classificazione) {
    switch (classificazione) {
      case "dispositivi-medici":
        return { title: "Dispositivi Medici" };
      case "integratori-alimentari":
        return { title: "Integratori Alimentari" };
      case "farmaci":
        return { title: "Farmaci" };
    }
  }

  return { title: "Prodotti" };
}

// Funzione di fetch lato server con ISR
async function getData(locale: "it" | "en" = "it") {
  try {
    const productsEndpoint = getProductsEndpoint(locale);
    const areasEndpoint = getAreasEndpoint(locale);
    const classificationsEndpoint = getClassificationsEndpoint(locale);
    const formulationsEndpoint = getFormulationsEndpoint(locale);

    const [productsRes, areasRes, classificationsRes, formulationsRes] =
      await Promise.all([
        fetch(
          getAPIURL(`${productsEndpoint}?populate=*&pagination[pageSize]=1000`),
          {
            next: { revalidate: REVALIDATE_TIME },
          },
        ),
        fetch(getAPIURL(`${areasEndpoint}?pagination[pageSize]=100`), {
          next: { revalidate: REVALIDATE_TIME },
        }),
        fetch(
          getAPIURL(`${classificationsEndpoint}?pagination[pageSize]=100`),
          {
            next: { revalidate: REVALIDATE_TIME },
          },
        ),
        fetch(getAPIURL(`${formulationsEndpoint}?pagination[pageSize]=100`), {
          next: { revalidate: REVALIDATE_TIME },
        }),
      ]);

    const products = await productsRes.json();
    const areas = await areasRes.json();
    const classifications = await classificationsRes.json();
    const formulations = await formulationsRes.json();

    return {
      products: products.data || [],
      areas: areas.data || [],
      classifications: classifications.data || [],
      formulations: formulations.data || [],
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      products: [],
      areas: [],
      classifications: [],
      formulations: [],
    };
  }
}

export default async function ProdottiPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{
    classificazione?: string;
    area?: string;
    formulazione?: string;
  }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale);
  const heroConfigs = getHeroConfigs(t);

  const { products, areas, classifications, formulations } =
    await getData(locale);
  const searchParamsResolved = await searchParams;

  // Get filters from URL params
  const classificazioneFilter = searchParamsResolved.classificazione;
  const areaFilter = searchParamsResolved.area;
  const formulazioneFilter = searchParamsResolved.formulazione;

  // Get hero config based on classification filter (hero changes only for classification)
  const heroConfig = classificazioneFilter
    ? heroConfigs[classificazioneFilter] || heroConfigs.default
    : heroConfigs.default;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <PageHero
        title={heroConfig.title}
        description={heroConfig.description}
        backgroundImage={heroConfig.backgroundImage}
        className="h-[60vh] min-h-[500px] pt-16"
        contentAlignment="center"
      />

      <ProductsGrid
        initialProducts={products}
        initialAreas={areas}
        initialClassifications={classifications}
        initialFormulations={formulations}
        initialClassificazioneFilter={classificazioneFilter}
        initialAreaFilter={areaFilter}
        initialFormulazioneFilter={formulazioneFilter}
        searchLabel={t.common.searchProduct}
        searchPlaceholder={t.common.search}
        discoverMore={t.common.discoverMore}
      />

      <Footer />
      <EcoMode />
    </div>
  );
}

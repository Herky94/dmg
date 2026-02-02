import { Header, Footer } from "@/components/layout";
import { PageHero } from "@/components/shared";
import ProductDetails from "@/components/prodotti/ProductDetails";
import RelatedProducts from "@/components/prodotti/RelatedProducts";
import EcoMode from "@/components/ui/EcoMode";
import { notFound } from "next/navigation";
import {
  getAPIURL,
  REVALIDATE_TIME,
  getName,
  getProductsEndpoint,
} from "@/lib/strapi";
import { getTranslations, type Locale } from "@/lib/translations";
import type { Metadata } from "next";

interface Product {
  id: number;
  documentId: string;
  Name: string;
  sottotitolo: string;
  Description: any[];
  Images?: {
    url: string;
    alternativeText?: string;
  }[];
  video?: {
    url: string;
    alternativeText?: string;
  }[];
  Slug: string;
  classificazioni?: {
    id: number;
    documentId: string;
    Name: string;
  }[];
  aree_terapeutiche?: {
    id: number;
    documentId: string;
    Name: string;
  }[];
}

async function getProduct(
  slug: string,
  locale: "it" | "en" = "it",
): Promise<Product | null> {
  try {
    const endpoint = getProductsEndpoint(locale);
    const res = await fetch(
      getAPIURL(`${endpoint}?filters[Slug][$eq]=${slug}&populate=*`),
      { next: { revalidate: REVALIDATE_TIME } },
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data.data[0] || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

async function getRelatedProducts(
  currentProduct: Product,
  locale: "it" | "en" = "it",
): Promise<Product[]> {
  const hasAreas =
    currentProduct.aree_terapeutiche &&
    currentProduct.aree_terapeutiche.length > 0;
  const hasClassifications =
    currentProduct.classificazioni && currentProduct.classificazioni.length > 0;

  if (!hasAreas && !hasClassifications) {
    return [];
  }

  const endpoint = getProductsEndpoint(locale);
  let filterQuery = "";

  if (hasAreas) {
    // Priority 1: Filter by Therapeutic Areas (More specific)
    const areaIds = currentProduct.aree_terapeutiche!.map((c) => c.documentId);
    filterQuery = areaIds
      .map(
        (id, index) =>
          `filters[aree_terapeutiche][documentId][$in][${index}]=${id}`,
      )
      .join("&");
  } else {
    // Priority 2: Fallback to Classifications (Broader)
    const classIds = currentProduct.classificazioni!.map((c) => c.documentId);
    filterQuery = classIds
      .map(
        (id, index) =>
          `filters[classificazioni][documentId][$in][${index}]=${id}`,
      )
      .join("&");
  }

  try {
    const res = await fetch(
      getAPIURL(
        `${endpoint}?${filterQuery}&filters[documentId][$ne]=${currentProduct.documentId}&populate=*&pagination[pageSize]=100`,
      ),
      { next: { revalidate: REVALIDATE_TIME } },
    );

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    let products = data.data || [];

    // Randomize products
    products = products.sort(() => 0.5 - Math.random());

    // Limit to 8 products
    return products.slice(0, 8);
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
}

export async function generateStaticParams() {
  try {
    // Generate params for both Italian and English products
    const [resIT, resEN] = await Promise.all([
      fetch(getAPIURL("prodottos?fields[0]=Slug")),
      fetch(getAPIURL("prodotto-ens?fields[0]=Slug")),
    ]);
    const [dataIT, dataEN] = await Promise.all([resIT.json(), resEN.json()]);

    const itParams = (dataIT.data || []).map((product: any) => ({
      locale: "it",
      slug: product.Slug,
    }));

    const enParams = (dataEN.data || []).map((product: any) => ({
      locale: "en",
      slug: product.Slug,
    }));

    return [...itParams, ...enParams];
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const product = await getProduct(slug, locale);
  const t = getTranslations(locale);

  if (!product) {
    return {
      title: locale === "en" ? "Product Not Found" : "Prodotto Non Trovato",
    };
  }

  return {
    title: `${getName(product)} | D.M.G. Italia`,
    description: product.sottotitolo || t.pages.prodotti.default.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>;
}) {
  const { slug, locale } = await params;
  const t = getTranslations(locale);
  const product = await getProduct(slug, locale);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product, locale);

  // Determine hero content based on classification
  let heroTitle = (
    <>
      Dispositivi <br /> Medici
    </>
  );
  let heroDescription =
    "I dispositivi medici rappresentano uno strumento essenziale per la prevenzione, la diagnosi e il trattamento delle patologie, garantendo standard elevati di sicurezza ed efficacia. Ogni area specialistica richiede soluzioni dedicate, progettate per rispondere alle esigenze specifiche di medici e pazienti.";
  let heroImage = "/images/dispositivi-medici-bg.jpg";

  if (product.classificazioni && product.classificazioni.length > 0) {
    const classificationName = getName(
      product.classificazioni[0],
    ).toLowerCase();

    if (classificationName.includes("integratori")) {
      heroTitle = (
        <>
          Integratori <br /> Alimentari
        </>
      );
      heroDescription =
        "Gli integratori alimentari sono formulazioni di nutrienti e altre sostanze con effetto fisiologico (vitamine, minerali, estratti botanici, probiotici, acidi grassi, aminoacidi) pensate per supportare il normale benessere quando l’alimentazione non è sufficiente a coprire specifici fabbisogni. Non sostituiscono una dieta equilibrata né terapie mediche; la loro efficacia dipende da formulazione, dosaggio, biodisponibilità e corretta aderenza.";
      heroImage = "/images/integratori-alimentari-bg.jpg";
    } else if (classificationName.includes("farmaci")) {
      heroTitle = <>Farmaci</>;
      heroDescription =
        "I farmaci sono sostanze con azione preventiva, diagnostica o terapeutica che agiscono su processi biologici specifici per ripristinare o modificare funzioni dell'organismo. La loro qualità, sicurezza ed efficacia sono garantite da rigorosi iter regolatori (AIC), controllo di produzione (GMP) e monitoraggio post-marketing (farmacovigilanza). L'uso corretto richiede prescrizione e controllo medico, rispetto di posologie e durate, attenzione alle interazioni e alle controindicazioni. L'automedicazione è limitata ai medicinali OTC e SOP, per disturbi lievi e temporanei.";
      heroImage = "/images/dispositivi-medici-bg.jpg"; // Using same bg as Dispositivi Medici as per home component logic (or fallback)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* <PageHero
        title={heroTitle}
        description={heroDescription}
        backgroundImage={heroImage}
      /> */}

      <ProductDetails
        product={product}
        indications={t.product.indications}
        dosageAndUse={t.product.dosageAndUse}
        leaflet={t.product.leaflet}
        backToProducts={t.product.backToProducts}
        therapeuticAreas={t.product.therapeuticAreas}
        classification={t.product.classification}
        formulation={t.product.formulation}
        otherFormulation={t.product.otherFormulation}
      />

      <RelatedProducts
        currentProduct={product}
        relatedProducts={relatedProducts}
        discoverMore={t.common.discoverMore}
        title={t.relatedProducts.title}
        subtitle={t.relatedProducts.subtitle}
      />

      <Footer />
      <EcoMode />
    </div>
  );
}

import { Header, Footer } from "@/components/layout";
import { PageHero } from "@/components/shared";
import {
  LogosHorizontalSection,
  ParallaxBuildingSection,
} from "@/components/home";
import JobPositionsGrid from "@/components/lavora-con-noi/JobPositionsGrid";
import EcoMode from "@/components/ui/EcoMode";
import { getAPIURL, REVALIDATE_TIME } from "@/lib/strapi";
import { getTranslations, Locale } from "@/lib/translations";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale);

  return {
    title: t.pages.posizioniAperte.title.replace(/\n/g, " "),
    description: t.pages.posizioniAperte.description,
  };
}

async function getJobPositions() {
  try {
    const res = await fetch(
      getAPIURL(
        "posizioni-lavoratives?populate=*&filters[Attiva][$eq]=true&sort=publishedAt:desc",
      ),
      {
        next: { revalidate: REVALIDATE_TIME },
      },
    );
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching job positions:", error);
    return [];
  }
}

export default async function PosizioniApertePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale);
  const positions = await getJobPositions();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <PageHero
        title={
          <>
            {t.pages.posizioniAperte.title.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i < t.pages.posizioniAperte.title.split("\n").length - 1 && (
                  <br />
                )}
              </span>
            ))}
          </>
        }
        description={t.pages.posizioniAperte.description}
        backgroundImage=""
        showScrollIndicator={true}
      />

      {/* Carosello Loghi */}
      <LogosHorizontalSection />

      {/* Grid Posizioni */}
      <JobPositionsGrid positions={positions} applyLabel={t.common.apply} />

      {/* Sezione Zoom Immagine */}
      <ParallaxBuildingSection />

      <Footer />
      <EcoMode />
    </div>
  );
}

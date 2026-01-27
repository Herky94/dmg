import { Header, Footer } from "@/components/layout";
import { PageHero } from "@/components/shared";
import EcoMode from "@/components/ui/EcoMode";
import type { Metadata } from "next";
import { getTranslations, Locale } from "@/lib/translations";

export const metadata: Metadata = {
  title: "R&D",
};

export default async function RDPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <PageHero
        title={
          <>
            {t.pages.researchDevelopment.title.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i <
                  t.pages.researchDevelopment.title.split("\n").length - 1 && (
                  <br />
                )}
              </span>
            ))}
          </>
        }
        description={t.pages.researchDevelopment.description}
        backgroundImage=""
        showScrollIndicator={true}
      />

      <Footer />
      <EcoMode />
    </div>
  );
}

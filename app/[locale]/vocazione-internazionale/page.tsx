import { Header, Footer } from "@/components/layout";
import { PageHero } from "@/components/shared";
import LogosHorizontalSection from "@/components/home/LogosHorizontalSection";
import EcoMode from "@/components/ui/EcoMode";
import InternationalContent from "@/components/vocazione-internazionale/InternationalContent";
import type { Metadata } from "next";
import { getTranslations, Locale } from "@/lib/translations";

export const metadata: Metadata = {
  title: "Vocazione Internazionale",
};

export default async function InternationalVocationPage({
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
            {t.pages.vocazioneInternazionale.title
              .split("\n")
              .map((line, i) => (
                <span key={i}>
                  {line}
                  {i <
                    t.pages.vocazioneInternazionale.title.split("\n").length -
                      1 && <br />}
                </span>
              ))}
          </>
        }
        description={t.pages.vocazioneInternazionale.description}
        backgroundImage="/images/at.webp"
        showScrollIndicator={true}
      />

      <InternationalContent
        paragraph1={t.home.international.paragraph1}
        paragraph2={t.home.international.paragraph2}
        paragraph3={t.home.international.paragraph3}
      />
      <LogosHorizontalSection />

      <Footer />
      <EcoMode />
    </div>
  );
}

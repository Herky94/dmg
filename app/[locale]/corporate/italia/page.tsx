import { Header, Footer } from "@/components/layout";
import EcoMode from "@/components/ui/EcoMode";
import CorporateHero from "@/components/corporate/italia/CorporateHero";
import CorporateMapSection from "@/components/corporate/italia/CorporateMapSection";
import { getTranslations, type Locale } from "@/lib/translations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "D.M.G. Italia",
};

export default async function CorporateItaliaPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <CorporateHero
        sedeLegale={t.corporate.sedeLegale}
        sedeOperativa={t.corporate.sedeOperativa}
        magazzino={t.corporate.magazzino}
      />

      <CorporateMapSection />

      <Footer />
      <EcoMode />
    </div>
  );
}

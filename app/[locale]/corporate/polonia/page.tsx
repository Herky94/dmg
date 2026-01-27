import { Header, Footer } from "@/components/layout";
import PoloniaHero from "@/components/corporate/polonia/PoloniaHero";
import PoloniaMapSection from "@/components/corporate/polonia/PoloniaMapSection";
import EcoMode from "@/components/ui/EcoMode";
import { getTranslations, type Locale } from "@/lib/translations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "D.M.G. Polonia",
};

export default async function PoloniaPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <PoloniaHero
        sede={t.corporate.sede}
        sitoWeb={t.corporate.sitoWeb}
        email={t.corporate.email}
      />

      <PoloniaMapSection />

      <Footer />
      <EcoMode />
    </div>
  );
}

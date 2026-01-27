import { Header, Footer } from "@/components/layout";
import TurchiaHero from "@/components/corporate/turchia/TurchiaHero";
import TurchiaMapSection from "@/components/corporate/turchia/TurchiaMapSection";
import EcoMode from "@/components/ui/EcoMode";
import { getTranslations, type Locale } from "@/lib/translations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "D.M.G. Turchia",
};

export default async function TurchiaPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <TurchiaHero
        sede={t.corporate.sede}
        sitoWeb={t.corporate.sitoWeb}
        email={t.corporate.email}
      />

      <TurchiaMapSection />

      <Footer />
      <EcoMode />
    </div>
  );
}

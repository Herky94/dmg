import { Header, Footer } from "@/components/layout";
import BulgariaHero from "@/components/corporate/bulgaria/BulgariaHero";
import BulgariaMapSection from "@/components/corporate/bulgaria/BulgariaMapSection";
import EcoMode from "@/components/ui/EcoMode";
import { getTranslations, type Locale } from "@/lib/translations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "D.M.G. Bulgaria",
};

export default async function BulgariaPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <BulgariaHero
        sede={t.corporate.sede}
        sitoWeb={t.corporate.sitoWeb}
        email={t.corporate.email}
      />

      <BulgariaMapSection />

      <Footer />
      <EcoMode />
    </div>
  );
}

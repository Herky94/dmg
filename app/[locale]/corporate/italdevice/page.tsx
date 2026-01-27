import { Header, Footer } from "@/components/layout";
import ItaldeviceHero from "@/components/corporate/italdevice/ItaldeviceHero";
import ItaldeviceMapSection from "@/components/corporate/italdevice/ItaldeviceMapSection";
import EcoMode from "@/components/ui/EcoMode";
import { getTranslations, type Locale } from "@/lib/translations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ITALDEVICE",
};

export default async function ItaldevicePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <ItaldeviceHero
        sede={t.corporate.sede}
        sitoWeb={t.corporate.sitoWeb}
        email={t.corporate.email}
      />

      <ItaldeviceMapSection />

      <Footer />
      <EcoMode />
    </div>
  );
}

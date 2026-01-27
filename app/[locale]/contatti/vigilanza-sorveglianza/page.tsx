import { Header, Footer } from "@/components/layout";
import VigilanzaSorveglianzaHero from "@/components/contatti/VigilanzaSorveglianzaHero";
import EcoMode from "@/components/ui/EcoMode";
import { getTranslations, type Locale } from "@/lib/translations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vigilanza e Sorveglianza",
};

export default async function VigilanzaSorveglianzaPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <VigilanzaSorveglianzaHero title={t.vigilanzaSorveglianza.title} />
      <Footer />
      <EcoMode />
    </div>
  );
}

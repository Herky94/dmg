import { Header, Footer } from "@/components/layout";
import VigilanzaSorveglianzaHero from "@/components/contatti/VigilanzaSorveglianzaHero";
import VigilanzaSorveglianzaContent from "@/components/contatti/VigilanzaSorveglianzaContent";
import EcoMode from "@/components/ui/EcoMode";
import { getTranslations, type Locale } from "@/lib/translations";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale);

  return {
    title: t.vigilanzaSorveglianza.title,
  };
}

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
      <VigilanzaSorveglianzaHero
        title={t.vigilanzaSorveglianza.title}
        description={t.vigilanzaSorveglianza.mainTitle}
      />
      <VigilanzaSorveglianzaContent
        sections={t.vigilanzaSorveglianza.sections}
        emailText={t.vigilanzaSorveglianza.emailText}
        linkText={t.vigilanzaSorveglianza.linkText}
      />
      <Footer />
      <EcoMode />
    </div>
  );
}

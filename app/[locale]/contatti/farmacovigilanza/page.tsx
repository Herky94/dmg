import { Header, Footer } from "@/components/layout";
import FarmacovigilanzaHero from "@/components/farmacovigilanza/FarmacovigilanzaHero";
import FarmacovigilanzaContent from "@/components/farmacovigilanza/FarmacovigilanzaContent";
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
    title: t.farmacovigilanza.title,
  };
}

export default async function FarmacovigilanzaPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <FarmacovigilanzaHero title={t.farmacovigilanza.title} />
      <FarmacovigilanzaContent
        subtitle={t.farmacovigilanza.subtitle}
        description={t.farmacovigilanza.description}
        cards={t.farmacovigilanza.cards}
        bottomText={t.farmacovigilanza.bottomText}
        formLabels={t.farmacovigilanza.form}
        sendLabel={t.common.send}
        sendingLabel={t.common.sending}
        sentLabel={t.common.sent}
        successMessage={t.common.reportSent}
        declarationsRequired={t.common.declarationsRequired}
        locale={locale}
      />
      <Footer />
      <EcoMode />
    </div>
  );
}

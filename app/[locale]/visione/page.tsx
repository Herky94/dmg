import { Header, Footer } from "@/components/layout";
import { PageHero } from "@/components/shared";
import { LeadershipSection } from "@/components/home";
import VisionGallery from "@/components/visione/VisionGallery";
import EcoMode from "@/components/ui/EcoMode";
import type { Metadata } from "next";
import { getTranslations, Locale } from "@/lib/translations";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale);

  return {
    title: t.pages.visione.title.replace(/\n/g, " "),
    description: t.pages.visione.description,
  };
}

export default async function VisionePage({
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
            {t.pages.visione.title.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i < t.pages.visione.title.split("\n").length - 1 && <br />}
              </span>
            ))}
          </>
        }
        description={t.pages.visione.description}
        backgroundImage="/images/at.webp"
        showScrollIndicator={true}
      />

      <LeadershipSection
        paragraph1={t.home.leadership.paragraph1}
        paragraph2={t.home.leadership.paragraph2}
        paragraph3={t.home.leadership.paragraph3}
        name={t.home.leadership.name}
        title={t.home.leadership.title}
        imageAlt={t.home.leadership.imageAlt}
        playVideoAlt={t.home.leadership.playVideoAlt}
        videoNotSupported={t.home.leadership.videoNotSupported}
      />

      <VisionGallery />

      <Footer />
      <EcoMode />
    </div>
  );
}

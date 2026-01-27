import { Header, Footer } from "@/components/layout";
import { PageHero } from "@/components/shared";
import HistoryIntro from "@/components/storia/HistoryIntro";
import HistoryTimeline from "@/components/storia/HistoryTimeline";
import Milestones from "@/components/storia/Milestones";
import Achievements3DCarousel from "@/components/storia/Achievements3DCarousel";
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
    title: t.pages.storia.title.replace(/\n/g, " "),
    description: t.pages.storia.description,
  };
}

export default async function StoriaPage({
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
            {t.pages.storia.title.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i < t.pages.storia.title.split("\n").length - 1 && <br />}
              </span>
            ))}
          </>
        }
        description={t.pages.storia.description}
        backgroundImage="/images/at.webp"
        showScrollIndicator={true}
      />

      <HistoryIntro
        preTitle={t.storia.intro.preTitle}
        title={t.storia.intro.title}
      />
      <HistoryTimeline
        preTitle={t.storia.timeline.preTitle}
        description={t.storia.timeline.description}
      />
      <Milestones
        title={t.storia.milestones.title}
        description={t.storia.milestones.description}
        milestones={t.storia.milestones.items}
      />
      <Achievements3DCarousel
        title={t.storia.achievements.title}
        description={t.storia.achievements.description}
        cards={t.storia.achievements.cards}
      />

      <Footer />
      <EcoMode />
    </div>
  );
}

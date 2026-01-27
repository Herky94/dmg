import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { PageHero } from "@/components/shared";
import {
  LogosHorizontalSection,
  ParallaxBuildingSection,
} from "@/components/home";
import JobApplicationForm from "@/components/lavora-con-noi/JobApplicationForm";
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
    title: t.pages.lavoraConNoi.title.replace(/\n/g, " "),
    description: t.pages.lavoraConNoi.description,
  };
}

export default async function LavoraConNoiPage({
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
            {t.pages.lavoraConNoi.title.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i < t.pages.lavoraConNoi.title.split("\n").length - 1 && (
                  <br />
                )}
              </span>
            ))}
          </>
        }
        description={t.pages.lavoraConNoi.description}
        backgroundImage="" // No background image
        showScrollIndicator={true}
        actionButton={
          <Link
            href="/posizioni-aperte"
            className="mt-8 group inline-flex items-center gap-4 bg-transparent border border-white text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-white hover:text-black transition-all duration-300"
          >
            <span className="tracking-wider">{t.pages.lavoraConNoi.cta}</span>
            <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center group-hover:bg-black transition-colors duration-300">
              <svg
                className="w-4 h-4 text-black transform transition-transform duration-300 group-hover:rotate-90 group-hover:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3" // Standard arrow right
                />
              </svg>
            </div>
          </Link>
        }
      />

      <LogosHorizontalSection />

      <div id="job-application-form">
        <JobApplicationForm
          applyLabel={t.common.apply}
          sendingLabel={t.common.sending}
          successMessage={t.common.applicationSent}
          privacyRequired={t.common.privacyRequired}
          cvRequired={t.common.cvRequired}
        />
      </div>

      <ParallaxBuildingSection />

      <Footer />
      <EcoMode />
    </div>
  );
}

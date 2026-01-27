import { Header, Footer } from "@/components/layout";
import { PageHero } from "@/components/shared";
import EcoMode from "@/components/ui/EcoMode";
import CertificationsContent from "@/components/certificazioni/CertificationsContent";
import DepartmentsSection from "@/components/certificazioni/DepartmentsSection";
import MdrRegulationSection from "@/components/certificazioni/MdrRegulationSection";
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
    title: t.pages.certificazioni.title.replace(/\n/g, " "),
    description: t.pages.certificazioni.description,
  };
}

export default async function CertificazioniPage({
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
            {t.pages.certificazioni.title.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i < t.pages.certificazioni.title.split("\n").length - 1 && (
                  <br />
                )}
              </span>
            ))}
          </>
        }
        description={t.pages.certificazioni.description}
        backgroundImage="/images/at.webp"
        showScrollIndicator={true}
      />

      <CertificationsContent
        preTitle={t.certificazioni.certifiedCompany.preTitle}
        title={t.certificazioni.certifiedCompany.title}
      />
      <DepartmentsSection
        title={t.certificazioni.departments.title}
        subtitle={t.certificazioni.departments.subtitle}
        departments={t.certificazioni.departments.list}
      />
      <MdrRegulationSection
        paragraph1={t.certificazioni.mdr.paragraph1}
        paragraph2={t.certificazioni.mdr.paragraph2}
        listItem1={t.certificazioni.mdr.listItem1}
        listItem2={t.certificazioni.mdr.listItem2}
        paragraph3={t.certificazioni.mdr.paragraph3}
      />

      <Footer />
      <EcoMode />
    </div>
  );
}

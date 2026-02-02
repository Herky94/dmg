import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { PageHero } from "@/components/shared";
import {
  LogosHorizontalSection,
  ParallaxBuildingSection,
} from "@/components/home";
import ContactForm from "@/components/contatti/ContactForm";
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
    title: t.contatti.title,
  };
}

export default async function ContattiPage({
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
        title={t.contatti.title}
        description={t.contatti.description}
        backgroundImage="/images/at.webp"
        showScrollIndicator={true}
      />

      <LogosHorizontalSection />

      <div id="contact-form">
        <ContactForm
          labels={{
            firstName: t.contatti.form.firstName,
            lastName: t.contatti.form.lastName,
            address: t.contatti.form.address,
            postalCode: t.contatti.form.postalCode,
            city: t.contatti.form.city,
            country: t.contatti.form.country,
            company: t.contatti.form.company,
            jobTitle: t.contatti.form.jobTitle,
            phone: t.contatti.form.phone,
            email: t.contatti.form.email,
            website: t.contatti.form.website,
            requestType: t.contatti.form.requestType,
            message: t.contatti.form.message,
            selectRequest: t.contatti.form.selectRequest,
          }}
          requestTypes={t.contatti.form.requestTypes}
          sendLabel={t.common.send}
          sendingLabel={t.common.sending}
          successMessage={t.common.sent}
          privacyRequired={t.common.privacyRequired}
          privacyText={t.contatti.form.privacyText}
          locale={locale}
        />
      </div>

      <ParallaxBuildingSection />

      <Footer />
      <EcoMode />
    </div>
  );
}

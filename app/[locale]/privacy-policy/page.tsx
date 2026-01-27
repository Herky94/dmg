import { Header, Footer } from "@/components/layout";
import { getTranslations, Locale } from "@/lib/translations";

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container-dmg pt-32 pb-16">
        <h1 className="text-4xl font-light mb-8 text-black">
          {t.pages.privacyPolicy.title}
        </h1>
        <div className="text-black font-light leading-relaxed">
          <p>{t.pages.privacyPolicy.paragraph1}</p>
          <br />
          <p>{t.pages.privacyPolicy.paragraph2}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

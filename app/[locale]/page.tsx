import { Header, Footer } from "@/components/layout";
import {
  Hero,
  ProductsSection,
  FeaturedProductsSection,
  StorySection,
  LeadershipSection,
  LogosHorizontalSection,
  InternationalSection,
  ParallaxBuildingSection,
} from "@/components/home";
import Achievements3DCarousel from "@/components/storia/Achievements3DCarousel";
import EcoMode from "@/components/ui/EcoMode";
import { getTranslations, Locale } from "@/lib/translations";
import { getAPIURL, getProductsEndpoint, REVALIDATE_TIME } from "@/lib/strapi";

async function getFeaturedProducts(locale: "it" | "en") {
  try {
    const productsEndpoint = getProductsEndpoint(locale);
    const res = await fetch(
      getAPIURL(`${productsEndpoint}?populate=*&pagination[pageSize]=10`),
      { next: { revalidate: REVALIDATE_TIME } },
    );
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale);
  const featuredProducts = await getFeaturedProducts(locale);

  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content">
        <Hero
          tagline={t.home.hero.tagline}
          description={t.home.hero.description}
          ctaText={t.home.hero.cta}
        />
        <ProductsSection
          preTitle={t.home.products.preTitle}
          title={t.home.products.title}
          description={t.home.products.description}
          dm={t.home.products.dm}
          ia={t.home.products.ia}
          farmaci={t.home.products.farmaci}
        />
        <StorySection
          title={t.home.story.title}
          description={t.home.story.description}
          timeline={t.home.story.timeline}
        />
        <Achievements3DCarousel
          title={t.storia.achievements.title}
          description={t.storia.achievements.description}
          cards={t.storia.achievements.cards}
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
        <FeaturedProductsSection
          preTitle={t.home.featuredProducts.preTitle}
          title={t.home.featuredProducts.title}
          cta={t.home.featuredProducts.cta}
          description={t.home.featuredProducts.description}
          productCta={t.home.featuredProducts.productCta}
          products={featuredProducts}
        />
        <InternationalSection
          title={t.home.international.title}
          paragraph1={t.home.international.paragraph1}
          paragraph2={t.home.international.paragraph2}
          paragraph3={t.home.international.paragraph3}
          cta={t.home.international.cta}
          videoNotSupported={t.home.international.videoNotSupported}
        />
        <LogosHorizontalSection />
        <ParallaxBuildingSection />
      </main>
      <Footer />

      {/* Eco Mode Overlay */}
      <EcoMode />
    </div>
  );
}

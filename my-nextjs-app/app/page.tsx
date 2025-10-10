import { Header, Hero, LeadershipSection, ProductsSection, FeaturedProductsSection, ParallaxBuildingSection, CountersSection, StorySection, LogosHorizontalSection, InternationalSection, Footer } from '@/components/layout'
import EcoMode from '@/components/ui/EcoMode'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ProductsSection />
      <StorySection />
      <CountersSection />
      <LeadershipSection />
      <FeaturedProductsSection />
      <ParallaxBuildingSection />
      <LogosHorizontalSection />
      <InternationalSection /> 
      <Footer />
      
      {/* Eco Mode Overlay */}
      <EcoMode />
    </div>
  )
}
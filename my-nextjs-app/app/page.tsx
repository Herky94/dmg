import { Header, Hero, LeadershipSection, ProductsSection, FeaturedProductsSection, StorySection, LogosHorizontalSection, InternationalSection, Footer } from '@/components/layout'
import EcoMode from '@/components/ui/EcoMode'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ProductsSection />
      <StorySection />
      <LeadershipSection />
      <FeaturedProductsSection />
      {/* <LogosHorizontalSection /> */}
      <InternationalSection />
      <Footer />
      
      {/* Eco Mode Overlay */}
      <EcoMode />
    </div>
  )
}
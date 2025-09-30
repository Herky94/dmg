import { Header, Hero, LeadershipSection, ProductsSection, FeaturedProductsSection, StorySection, LogosHorizontalSection, InternationalSection, Footer } from '@/components/layout'


export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <LeadershipSection />
      <ProductsSection />
      <FeaturedProductsSection />
      <StorySection />
      {/* <LogosHorizontalSection /> */}
      <InternationalSection />
    
      <Footer />
    </div>
  )
}
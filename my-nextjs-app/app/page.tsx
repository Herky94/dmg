import { Header, Hero, LeadershipSection, ProductsSection, FeaturedProductsSection, StorySection, Footer } from '@/components/layout'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ProductsSection />
      <StorySection />
      <LeadershipSection />
      <FeaturedProductsSection />
      <Footer />
    </div>
  )
}
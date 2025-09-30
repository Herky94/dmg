import { Header, Hero, LeadershipSection, ProductsSection, FeaturedProductsSection, StorySection } from '@/components/layout'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <LeadershipSection />
      <ProductsSection />
      <FeaturedProductsSection />
      <StorySection />

      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">DMG</h4>
              <p className="text-gray-300">
                Leader nel settore farmaceutico e dei dispositivi medici.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Link Utili</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="/azienda" className="hover:text-white">Azienda</a></li>
                <li><a href="/prodotti" className="hover:text-white">Prodotti</a></li>
                <li><a href="/contatti" className="hover:text-white">Contatti</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contatti</h4>
              <p className="text-gray-300">
                Per informazioni e collaborazioni contattaci.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 DMG. Tutti i diritti riservati.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
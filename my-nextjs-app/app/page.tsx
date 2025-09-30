import { Header } from '@/components/layout'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <main className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-20">
          {/* Hero Content */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Welcome to{' '}
              <span className="text-blue-600">DMG</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
              Your modern Next.js application with Tailwind CSS, built for performance and designed for scale.
            </p>
            
            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/get-started"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors duration-200"
              >
                Get Started
              </a>
              <a
                href="/about"
                className="border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-8 py-3 rounded-lg text-lg font-medium transition-colors duration-200"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </main>
      
      {/* Content Sections per testare la barra di progresso */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">La nostra Azienda</h2>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
            DMG è un'azienda leader nel settore farmaceutico e dei dispositivi medici, 
            con una presenza internazionale consolidata e una lunga tradizione di eccellenza.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">I nostri Prodotti</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Dispositivi Medici</h3>
              <p className="text-gray-600">Soluzioni innovative per la diagnostica e il trattamento.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Integratori Alimentari</h3>
              <p className="text-gray-600">Prodotti per il benessere e la salute quotidiana.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Farmaci</h3>
              <p className="text-gray-600">Terapie farmacologiche di alta qualità.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Presenza Internazionale</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <h4 className="font-semibold">Italia</h4>
              <p className="text-gray-600">Sede principale</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold">Bulgaria</h4>
              <p className="text-gray-600">Filiale europea</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold">Polonia</h4>
              <p className="text-gray-600">Hub dell'est Europa</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold">Turchia</h4>
              <p className="text-gray-600">Ponte verso l'Asia</p>
            </div>
          </div>
        </div>
      </section>

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

import { Header, Hero } from '@/components/layout'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      
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

      {/* Team Leadership Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">La nostra Leadership</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <div className="order-2 lg:order-1">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="/images/Luigi-Mercuri.jpg" 
                  alt="Luigi Mercuri - CEO & Managing Director"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            
            {/* Content */}
            <div className="order-1 lg:order-2">
              <div className="max-w-2xl">
                {/* Testo sopra la linea divisoria */}
                <div className="space-y-4 text-gray-700 leading-relaxed mb-8">
                  <p>
                    «Il nostro impegno, sintetizzato nel pay-off "Quando serve cura", è 
                    costantemente rivolto a migliorare la qualità della vita e la salute 
                    delle persone. Proponiamo, infatti, un approccio alla tutela della 
                    salute secondo cui "Non si cura la malattia ma il paziente"»
                  </p>
                  
                  <p>
                    Innovazione, creatività e la costante ricerca di nuove soluzioni sono 
                    i pilastri sui quali poggiamo i nostri laboratori di Ricerca e Sviluppo, 
                    composti da un team di professionisti e dotati di apparecchiature 
                    all'avanguardia che, anno dopo anno, permettono una crescita 
                    costante.
                  </p>
                  
                  <p>
                    L'entusiasmo, l'onestà e la volontà di innovare sono le qualità 
                    fondamentali attraverso cui D.M.G. ITALIA promuove il progresso e 
                    la crescita dei propri dipendenti e collaboratori, favorendo un clima 
                    di trasparenza e di inclusione.
                  </p>
                </div>
                
                {/* Linea divisoria */}
                <div className="border-t border-gray-300 pt-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Luigi Mercuri</h3>
                  <p className="text-lg text-blue-600 font-semibold">CEO & Managing Director</p>
                </div>
              </div>
            </div>
          </div>
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
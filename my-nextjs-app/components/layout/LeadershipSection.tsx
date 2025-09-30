export default function LeadershipSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">La nostra Leadership</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <div className="order-2 lg:order-1">
            <div className=" overflow-hidden shadow-lg">
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
  )
}
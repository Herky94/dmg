export default function ProductsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-20">
        {/* Pre-title */}
        <div className="text-center mb-4">
          <span className="text-sm text-gray-500 uppercase tracking-wider font-medium">
            LINEE TERAPEUTICHE
          </span>
        </div>

        {/* Main Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl lg:text-5xl font-light text-gray-900">
            I nostri prodotti
          </h2>
        </div>

        {/* Description */}
        <div className="text-center mb-12">
          <p className="text-base text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Un team di professionisti altamente specializzati e un laboratorio di ricerca e sviluppo dotato di apparecchiature 
            all'avanguardia sono i pilastri su cui si basa DMG Italia per sviluppare prodotti innovativi: dispositivi medici e 
            integratori alimentari.
          </p>
        </div>

        {/* Separator Line */}
        <div className="flex justify-center mb-16">
          <div className="w-24 h-px bg-gray-300"></div>
        </div>

        {/* Product Cards con effetto scroll stacking */}
        <div className="relative" style={{ height: '200vh' }}>
          {/* Card 1 - Dispositivi medici (Sticky Base) */}
          <div className="sticky top-20 z-10 bg-gray-50 py-16">
            <div className="max-w-6xl mx-auto px-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  {/* Number Circle */}
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-900 text-white rounded-full text-lg font-semibold">
                    1
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl lg:text-3xl font-light text-gray-900">
                    Dispositivi medici
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed">
                    I dispositivi medici rappresentano uno strumento essenziale per la prevenzione, la diagnosi e il trattamento delle patologie, garantendo standard elevati di sicurezza ed efficacia. Ogni area specialistica richiede soluzioni dedicate, progettate per rispondere alle esigenze specifiche di medici e pazienti.
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                      Otorinolaringoiatria
                    </span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                      Pediatria
                    </span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                      Oftalmologia
                    </span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                      Gastroenterologia
                    </span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center gap-1">
                      +1 tutti i pr.
                      <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </span>
                  </div>
                </div>
                
                {/* Image */}
                <div className="order-first lg:order-last">
                  <div className="rounded-lg overflow-hidden">
                    <img 
                      src="/images/dispositivi-medici.svg" 
                      alt="Dispositivi medici"
                      className="w-full h-80 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - Integratori alimentari (Sticky Overlay) */}
          <div className="sticky top-20 z-20 bg-white rounded-t-2xl shadow-lg py-16">
            <div className="max-w-6xl mx-auto px-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  {/* Number Circle */}
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-900 text-white rounded-full text-lg font-semibold">
                    2
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl lg:text-3xl font-light text-gray-900">
                   Integratori Alimentari
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed">
                   Gli integratori alimentari sono formulazioni di nutrienti e altre sostanze con effetto fisiologico (vitamine, minerali, estratti botanici, probiotici, acidi grassi, aminoacidi) pensate per supportare il normale benessere quando l’alimentazione non è sufficiente a coprire specifici fabbisogni. Non sostituiscono una dieta equilibrata né terapie mediche; la loro efficacia dipende da formulazione, dosaggio, biodisponibilità e corretta aderenza.
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                      Vitamine
                    </span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                      Minerali
                    </span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                      Probiotici
                    </span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center gap-1">
                      +2 altre categorie
                      <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </span>
                  </div>
                </div>
                
                {/* Image */}
                <div className="order-first lg:order-last">
                  <div className="rounded-lg overflow-hidden">
                    <img 
                      src="/images/integratori-alimentari.svg" 
                      alt="Integratori alimentari"
                      className="w-full h-80 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 - Farmaci (Top Sticky Overlay) */}
          <div className="sticky top-20 z-30 bg-gray-100 rounded-t-2xl shadow-lg py-16">
            <div className="max-w-6xl mx-auto px-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  {/* Number Circle */}
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-900 text-white rounded-full text-lg font-semibold">
                    3
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl lg:text-3xl font-light text-gray-900">
                    Farmaci
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed">
                    I farmaci sono sostanze con azione preventiva, diagnostica o terapeutica che agiscono su processi biologici specifici per ripristinare o modificare funzioni dell’organismo. La loro qualità, sicurezza ed efficacia sono garantite da rigorosi iter regolatori (AIC), controllo di produzione (GMP) e monitoraggio post-marketing (farmacovigilanza). L’uso corretto richiede prescrizione e controllo medico, rispetto di posologie e durate, attenzione alle interazioni e alle controindicazioni. L’automedicazione è limitata ai medicinali OTC e SOP, per disturbi lievi e temporanei.
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                      Antibiotici
                    </span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                      Antinfiammatori
                    </span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                      Analgesici
                    </span>
                    <span className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm flex items-center gap-1">
                      +5 classi terapeutiche
                      <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </span>
                  </div>
                </div>
                
                {/* Image */}
                <div className="order-first lg:order-last">
                  <div className="rounded-lg overflow-hidden">
                    <img 
                      src="/images/farmaci.svg" 
                      alt="Farmaci"
                      className="w-full h-80 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
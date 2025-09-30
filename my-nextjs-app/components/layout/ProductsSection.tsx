export default function ProductsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto px-20">
        {/* Pre-title */}
        <div className="text-center mb-4">
          <span className="text-sm text-gray-500 uppercase tracking-wider font-medium">
            Innovazione. Sicurezza. Efficacia.
          </span>
        </div>

        {/* Main Title */}
        <div className="text-center mb-8">
          <h2 className="text-8xl lg:text-9xl font-light text-gray-900">
         soluzioni terapeutiche.
          </h2>
        </div>

        {/* Description */}
        <div className="text-center mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-18 max-w-6xl mx-auto px-8">
            {/* Column 1 */}
            <div className="text-justify">
              <p className="text-gray-700 leading-relaxed">
                Siamo un'azienda farmaceutica italiana specializzata nella ricerca, sviluppo e commercializzazione di dispositivi medici, integratori alimentari e farmaci.
              </p>
            </div>
            
            {/* Column 2 */}
            <div className="text-justify">
              <p className="text-gray-700 leading-relaxed">
                Il nostro obiettivo principale è quello di offrire soluzioni terapeutiche innovative, sicure ed efficaci a pazienti e a operatori sanitari, nonché nuove opportunità di business ad aziende farmaceutiche italiane ed estere.
              </p>
            </div>
            
            {/* Column 3 */}
            <div className="text-justify">
              <p className="text-gray-700 leading-relaxed">
               Condividiamo con i nostri partner un solido know-how, acquisito negli anni, per aiutarli a sviluppare il loro business in tutto il mondo.
              </p>
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div className="flex justify-center mb-10">
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
                  
                  {/* Button */}
                  <div className="flex items-center gap-3 border border-black text-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition-all duration-300 cursor-pointer w-fit group">
                    <span className="text-sm font-medium">Scopri di più</span>
                    <div className="bg-black rounded-full w-8 h-8 flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                      <svg 
                        className="w-4 h-4 text-white transform transition-transform duration-300 group-hover:rotate-45 group-hover:text-black" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M7 17L17 7M17 7H7M17 7V17" 
                        />
                      </svg>
                    </div>
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
          <div className="sticky top-20 z-20 bg-gray-50 rounded-t-2xl py-16">
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
                  
                  {/* Button */}
                 <div className="flex items-center gap-3 border border-black text-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition-all duration-300 cursor-pointer w-fit group">
                    <span className="text-sm font-medium">Scopri di più</span>
                    <div className="bg-black rounded-full w-8 h-8 flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                      <svg 
                        className="w-4 h-4 text-white transform transition-transform duration-300 group-hover:rotate-45 group-hover:text-black" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M7 17L17 7M17 7H7M17 7V17" 
                        />
                      </svg>
                    </div>
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
          <div className="sticky top-20 z-30 bg-gray-50 rounded-t-2xl  py-16">
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
                    I farmaci sono sostanze con azione preventiva, diagnostica o terapeutica che agiscono su processi biologici specifici per ripristinare o modificare funzioni dell'organismo. La loro qualità, sicurezza ed efficacia sono garantite da rigorosi iter regolatori (AIC), controllo di produzione (GMP) e monitoraggio post-marketing (farmacovigilanza). L'uso corretto richiede prescrizione e controllo medico, rispetto di posologie e durate, attenzione alle interazioni e alle controindicazioni. L'automedicazione è limitata ai medicinali OTC e SOP, per disturbi lievi e temporanei.
                  </p>
                  
                  
                  {/* Button */}
               <div className="flex items-center gap-3 border border-black text-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition-all duration-300 cursor-pointer w-fit group">
                    <span className="text-sm font-medium">Scopri di più</span>
                    <div className="bg-black rounded-full w-8 h-8 flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                      <svg 
                        className="w-4 h-4 text-white transform transition-transform duration-300 group-hover:rotate-45 group-hover:text-black" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M7 17L17 7M17 7H7M17 7V17" 
                        />
                      </svg>
                    </div>
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
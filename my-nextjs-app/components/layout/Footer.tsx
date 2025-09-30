import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-16 w-full">
      <div className="w-full px-24">
        <div className="grid grid-cols-11 ">
          
          {/* First Column - Navigation + ISO Logos */}
          <div className="col-span-2 space-y-6 flex">
            {/* Navigation Links */}
            <div className="flex-1">
              <div className="space-y-2">
                <Link href="#" className="block text-sm text-gray-600 hover:text-gray-900" data-cursor-hover>
                  HOMEPAGE
                </Link>
                <Link href="#" className="block text-sm text-gray-600 hover:text-gray-900" data-cursor-hover>
                  STORIA
                </Link>
                <Link href="#" className="block text-sm text-gray-600 hover:text-gray-900" data-cursor-hover>
                  MESSAGGIO DEL CEO
                </Link>
                <Link href="#" className="block text-sm text-gray-600 hover:text-gray-900">
                  CERTIFICAZIONI
                </Link>
                <Link href="#" className="block text-sm text-gray-600 hover:text-gray-900">
                  DISPOSITIVI MEDICI
                </Link>
                <Link href="#" className="block text-sm text-gray-600 hover:text-gray-900">
                  INTEGR. ALIMENTARI
                </Link>
                <Link href="#" className="block text-sm text-gray-600 hover:text-gray-900">
                  FARMACI
                </Link>
                <Link href="#" className="block text-sm text-gray-600 hover:text-gray-900">
                  FARMACOVIGILANZA
                </Link>
                <Link href="#" className="block text-sm text-gray-600 hover:text-gray-900">
                  VIOLANZA E SORVEGLIANZA
                </Link>
                <Link href="#" className="block text-sm text-gray-600 hover:text-gray-900">
                  LAVORA CON NOI
                </Link>
                <Link href="#" className="block text-sm text-gray-600 hover:text-gray-900">
                  CONTATTI
                </Link>
              </div>
            </div>
            
            {/* ISO Logos - Affianco alla navigazione */}
            <div className="flex flex-col space-y-4 ml-8">
              <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                <img src="/images/logos/209_isocertifiedcologoblue.svg" alt="ISO 9001" className="max-w-full max-h-full" />
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                <img src="/images/logos/ISO13485-2012-w.svg" alt="ISO 13485" className="max-w-full max-h-full" />
              </div>
            </div>
          </div>

          {/* Second Column - DMG ITALIA S.R.L. */}
          <div className="col-span-2 space-y-4 border-l border-[#D4D4D4] pl-8">
            <h4 className="text-sm font-medium text-gray-900 mb-4">DMG ITALIA S.R.L.</h4>
            <div className="text-xs text-gray-600 space-y-1">
              <p>Sede legale</p>
              <p>Via Lamontone km. 26,700</p>
              <p>-00071 Pomezia (RM)</p>
              <p><a href="mailto:info@dmgitalia.com" className="text-blue-600 hover:underline">info@dmgitalia.com</a></p>
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              <p>Filiale</p>
              <p>S.Ufficio Amministrativo</p>
              <p>Via Mazzagno, 76</p>
              <p>-00071 Pomezia (RM)</p>
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              <p>+39] 06 91886038</p>
              <p>+39] 06 91886093</p>
              <p>+39] 06 91886093</p>
              <p><a href="mailto:info@dmgitalia.com" className="text-blue-600 hover:underline">info@dmgitalia.com</a></p>
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              <p>Magazzino</p>
              <p>Via dei Opifici, 22</p>
              <p>00071 Pomezia (RM)</p>
              <p><a href="mailto:magazzino@dhool.com" className="text-blue-600 hover:underline">magazzino@dhool.com</a></p>
            </div>
          </div>

          {/* Third Column - DMG Polska sp. z o.o. */}
          <div className="col-span-2 space-y-4 border-l border-[#D4D4D4] pl-8">
            <h4 className="text-sm font-medium text-gray-900 mb-4">DMG Polska sp. z o.o.</h4>
            <div className="text-xs text-gray-600 space-y-1">
              <p>Sede legale</p>
              <p>Al. Jerozolimskie 65/79 lok.</p>
              <p>U 26, 00-697 Warszawa</p>
              <p>(Polonia)</p>
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              <p><a href="mailto:biuro@dmgpolska.eu" className="text-blue-600 hover:underline">biuro@dmgpolska.eu</a></p>
            </div>
          </div>

          {/* Fourth Column - DMG Bulgaria ltd. */}
          <div className="col-span-2 space-y-4 border-l border-[#D4D4D4] pl-8">
            <h4 className="text-sm font-medium text-gray-900 mb-4">DMG Bulgaria ltd.</h4>
            <div className="text-xs text-gray-600 space-y-1">
              <p>Sede legale</p>
              <p>Tsar Simeon st Ш2,</p>
              <p>ent 6, fl 5 – zona 1404</p>
              <p>Lozenets, Bulgaria</p>
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              <p><a href="mailto:info@dmgbg.com" className="text-blue-600 hover:underline">info@dmgbg.com</a></p>
            </div>
          </div>

          {/* Fifth Column - DMG Turkey */}
          <div className="col-span-2 space-y-4 border-l border-[#D4D4D4] pl-8">
            <h4 className="text-sm font-medium text-gray-900 mb-4">DMG Turkey</h4>
            <div className="text-xs text-gray-600 space-y-1">
              <p>Sede legale</p>
              <p>Buyukdere Cad. Vadistanbul</p>
              <p>odt. No:54 D:9№. Sar.</p>
              <p>Istanbul Turchia</p>
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              <p><a href="mailto:info@dmgturkiye.com.tr" className="text-blue-600 hover:underline">info@dmgturkiye.com.tr</a></p>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              {/* DMG Logo */}
              <div className="w-32 h-12 bg-gray-200 rounded flex items-center justify-center">
                <img src="/images/logos/DMG-logo-black.png" alt="DMG Logo" className="max-w-full max-h-full" />
              </div>
              {/* Navigation Links */}
              <nav className="flex space-x-6 text-xs text-gray-600">
                <Link href="#" className="hover:text-gray-900">FARMACEUTICA</Link>
                <Link href="#" className="hover:text-gray-900">DISPOSITIVI MEDICI</Link>
                <Link href="#" className="hover:text-gray-900">INTEGRATORI</Link>
                <Link href="#" className="hover:text-gray-900">TRASPARENZA</Link>
                <Link href="#" className="hover:text-gray-900">COOKIE POLICY</Link>
                <Link href="#" className="hover:text-gray-900">CONFORMITÀ</Link>
                <Link href="#" className="hover:text-gray-900">REGISTRESE</Link>
              </nav>
            </div>
            {/* Additional Company Info and Copyright */}
            <div className="flex flex-col items-end space-y-2">
              <div className="text-xs text-gray-600 text-right">
                <p><strong>D.M.G. ITALIA S.R.L.</strong></p>
                <img src="/images/usefull-icons/arrow-up-1--arrow-up-keyboard.svg" alt="DMG Logo" className="max-w-full max-h-full" />
                <p>Via Lamontone km. 26,700 – 00071 Pomezia (RM)</p>
                <p>Reference.com | <a href="mailto:info@dmgitalia.com" className="text-blue-600 hover:underline">info@dmgitalia.com</a></p>
              </div>
              <div className="text-xs text-gray-500 text-right">
                QUALSIASI DUBBIO, QUALSIASI QUESITO, CONTATTACI MA NOI RITENIAMO<br/>
                CHE DOVRESTI SEMPRE CHIEDERE AL TUO MEDICO.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
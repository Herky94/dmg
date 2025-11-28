import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer bg-gray-50 py-16 pt-30 w-full">
      <div className="w-full px-[30px] lg:px-24">
        <div className="flex flex-col xl:grid xl:grid-cols-12 gap-12">
          {/* First Main Column - Navigation + ISO Logos (25% width on desktop) */}
          <div className="xl:col-span-3 flex flex-col md:flex-row xl:flex-row flex-wrap justify-between gap-12 xl:pr-8">
            {/* Navigation Links */}
            <div className="flex-1 min-w-[240px]">
              <div className="space-y-2">
                <Link
                  href="#"
                  className="block text-base text-black hover:text-gray-700"
                >
                  HOMEPAGE
                </Link>
                <Link
                  href="#"
                  className="block text-base text-black hover:text-gray-700"
                >
                  STORIA
                </Link>
                <Link
                  href="#"
                  className="block text-base text-black hover:text-gray-700"
                >
                  MESSAGGIO DEL CEO
                </Link>
                <Link
                  href="#"
                  className="block text-base text-black hover:text-gray-700"
                >
                  CERTIFICAZIONI
                </Link>
                <Link
                  href="#"
                  className="block text-base text-black hover:text-gray-700"
                >
                  DISPOSITIVI MEDICI
                </Link>
                <Link
                  href="#"
                  className="block text-base text-black hover:text-gray-700"
                >
                  INTEG. ALIMENTARI
                </Link>
                <Link
                  href="#"
                  className="block text-base text-black hover:text-gray-700"
                >
                  FARMACI
                </Link>
                <Link
                  href="#"
                  className="block text-base text-black hover:text-gray-700"
                >
                  FARMACOVIGILANZA
                </Link>
                <Link
                  href="#"
                  className="block text-base text-black hover:text-gray-700"
                >
                  VIGILANZA E SORVEGLIANZA
                </Link>
                <Link
                  href="#"
                  className="block text-base text-black hover:text-gray-700"
                >
                  LAVORA CON NOI
                </Link>
                <Link
                  href="#"
                  className="block text-base text-black hover:text-gray-700"
                >
                  CONTATTI
                </Link>
              </div>
            </div>

            {/* ISO Logos */}
            <div className="flex gap-6 flex-row items-start">
              <div className="w-24 h-24 rounded flex items-center justify-center">
                <img
                  src="/images/logos/209_isocertifiedcologoblue.svg"
                  alt="ISO 9001"
                  className="max-w-full max-h-full"
                />
              </div>
              <div className="w-24 h-24 rounded flex items-center justify-center">
                <img
                  src="/images/logos/ISO13485-2012-w.svg"
                  alt="ISO 13485"
                  className="max-w-full max-h-full"
                />
              </div>
            </div>
          </div>

          {/* Second Main Column - Companies Grid (75% width on desktop) */}
          <div className="xl:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
              {/* DMG ITALIA S.R.L. */}
              <div className="space-y-4 border-l border-[#D4D4D4] pl-8">
                <h4 className="text-base font-[400] text-black mb-2">
                  DMG ITALIA S.R.L.
                </h4>
                <img
                  src="/images/usefull-icons/arrow.svg"
                  alt="Arrow Icon"
                  className="w-8 h-8 mb-4"
                />
                <div className="text-base text-black space-y-1">
                  <p className="font-[500]">Sede legale</p>
                  <p className="font-[300]">Via Laurentina km. 26,700</p>
                  <p className="font-[300]">00071 Pomezia (RM)</p>
                  <p>
                    <a
                      href="mailto:info@dmgit.com"
                      className="underline font-[300] hover:text-gray-700"
                    >
                      info@dmgit.com
                    </a>
                  </p>
                </div>
                <div className="text-base text-black space-y-1">
                  <p className="font-[500]">
                    Sede operativa e Uffici Amministrativi
                  </p>
                  <p className="font-[300]">Via Nicaragua, 10</p>
                  <p className="font-[300]">00071 Pomezia (RM)</p>
                </div>
                <div className="text-base text-black space-y-1">
                  <p className="font-[300]">(+39) 06 91968038 </p>
                  <p className="font-[300]">(+39) 06 91969082</p>
                  <p className="font-[300]">(+39) 06 9145963</p>
                  <p>
                    <a
                      href="mailto:info@dmgit.com"
                      className="underline font-[300] hover:text-gray-700"
                    >
                      info@dmgit.com
                    </a>
                  </p>
                </div>
                <div className="text-base text-black space-y-1">
                  <p className="font-[500]">Magazzino</p>
                  <p className="font-[300]">Via dei Cedri, 22</p>
                  <p className="font-[300]">00071 Pomezia (RM)</p>
                  <p>
                    <a
                      href="mailto:magazzino@dmgit.com"
                      className="underline font-[300] hover:text-gray-700"
                    >
                      magazzino@dmgit.com
                    </a>
                  </p>
                </div>
              </div>

              {/* DMG Polska sp. z o.o. */}
              <div className="space-y-4 border-l border-[#D4D4D4] pl-8">
                <h4 className="text-base font-[400] text-black mb-2">
                  DMG Polska sp. z o.o.
                </h4>
                <img
                  src="/images/usefull-icons/arrow.svg"
                  alt="Arrow Icon"
                  className="w-8 h-8 mb-4"
                />
                <div className="text-xs text-black space-y-1">
                  <p className="font-[500]">Sede legale</p>
                  <p className="font-[300]">Al. Jerozolimskie 65/79 lok.</p>
                  <p className="font-[300]">1219, 00-697 Warszawa</p>
                  <p className="font-[300]"> (Polska)</p>
                </div>
                <div className="text-xs text-black space-y-1">
                  <p className="font-[300]">dmgpolska.eu</p>
                  <p>
                    <a
                      href="mailto:biuro@dmgpolska.eu"
                      className="underline font-[300] hover:text-gray-700"
                    >
                      biuro@dmgpolska.eu
                    </a>
                  </p>
                </div>
              </div>

              {/* DMG Bulgaria ltd. */}
              <div className="space-y-4 border-l border-[#D4D4D4] pl-8">
                <h4 className="text-base font-[400] text-black mb-2">
                  DMG Bulgaria ltd.
                </h4>
                <img
                  src="/images/usefull-icons/arrow.svg"
                  alt="Arrow Icon"
                  className="w-8 h-8 mb-4"
                />
                <div className="text-xs text-black space-y-1">
                  <p className="font-[500]">Sede legale</p>
                  <p className="font-[300]">Ilka Popova st.N°2</p>
                  <p className="font-[300]">ent.B, fl.5 - Sofia 1404 </p>
                  <p className="font-[300]">Lozenets, Bulgaria</p>
                </div>
                <div className="text-xs text-black space-y-1">
                  <p className="font-[300]">dmgbg.com</p>
                  <p>
                    <a
                      href="mailto:info@dmgbg.com"
                      className="underline font-[300] hover:text-gray-700"
                    >
                      info@dmgbg.com
                    </a>
                  </p>
                </div>
              </div>

              {/* DMG Turkey */}
              <div className="space-y-4 border-l border-[#D4D4D4] pl-8">
                <h4 className="text-base font-[400] text-black mb-2">
                  DMG Turkey
                </h4>
                <img
                  src="/images/usefull-icons/arrow.svg"
                  alt="Arrow Icon"
                  className="w-8 h-8 mb-4"
                />
                <div className="text-xs text-black space-y-1">
                  <p className="font-[500]">Sede legale</p>
                  <p className="font-[300]">Teşvikiye mah. Valikonağı</p>
                  <p className="font-[300]">cad. No:74 D:7/A, Şişli, </p>
                  <p className="font-[300]">İstanbul (Turkey)</p>
                </div>
                <div className="text-xs text-black space-y-1">
                  <p className="font-[300]">dmgturkey.com.tr</p>
                  <p>
                    <a
                      href="mailto:info@dmgturkey.com.tr"
                      className="underline font-[300] hover:text-gray-700"
                    >
                      info@dmgturkey.com.tr
                    </a>
                  </p>
                </div>
              </div>

              {/* DMG Italia Reference */}
              <div className="space-y-4 border-l border-[#D4D4D4] pl-8">
                <h4 className="text-base font-[400] text-black mb-2">
                  D.M.G. ITALIA S.R.L.
                </h4>
                <img
                  src="/images/usefull-icons/arrow.svg"
                  alt="Arrow Icon"
                  className="w-8 h-8 mb-4"
                />
                <div className="text-xs text-black space-y-1">
                  <p className="font-[500]">Sede Legale</p>
                  <p className="font-[300]">Via Laurentina km. 26,700</p>
                  <p className="font-[300]">– 00071 Pomezia (RM)</p>
                </div>
                <div className="text-xs text-black space-y-1">
                  <p className="font-[300]">italdevice.com</p>
                  <p>
                    <a
                      href="mailto:info@italdevice.com"
                      className="underline font-[300] hover:text-gray-700"
                    >
                      info@italdevice.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col xl:flex-row justify-between items-center gap-8">
            {/* DMG Logo */}
            <div className="w-48 h-auto rounded flex items-center justify-center">
              <img
                src="/images/logos/DMG-logo-black.png"
                alt="DMG Logo"
                className="max-w-full max-h-full"
              />
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-wrap justify-center gap-4 lg:gap-6 text-xs [&>a]:!text-[#919191] [&>a]:!font-[300]">
              <Link href="#" className="hover:text-gray-700">
                FARMACOVIGILANZA
              </Link>
              <Link href="#" className="hover:text-gray-700">
                CERTIFICAZIONI
              </Link>
              <Link href="#" className="hover:text-gray-700">
                TRASPARENZA
              </Link>
              <Link href="#" className="hover:text-gray-700">
                PRIVACY POLICY
              </Link>
              <Link href="#" className="hover:text-gray-700">
                COOKIE POLICY
              </Link>
              <Link href="#" className="hover:text-gray-700">
                COMPLIANCE
              </Link>
              <Link href="#" className="hover:text-gray-700">
                WHISTLEBLOWING
              </Link>
            </nav>

            {/* Copyright */}
            <div className="text-xs text-[#919191] font-[300] text-center xl:text-right">
              <p>
                r.e.a. latina n. 198376 - capitale sociale € 200.000.000,00 -
                part. iva 02774840595
              </p>
              <p>
                © 2025 pfizer srl. società diretta e controllata da pfizer inc.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

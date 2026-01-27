"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getTranslations, type Locale } from "@/lib/translations";
import { LanguageSwitcher } from "./index";

export default function Footer() {
  const pathname = usePathname();
  const currentLocale: Locale = pathname.startsWith("/it")
    ? "it"
    : pathname.startsWith("/en")
      ? "en"
      : "it";
  const t = getTranslations(currentLocale);

  return (
    <footer className="footer bg-gray-50 py-16 pt-30 w-full">
      <div className="container-dmg">
        <div className="flex flex-col xl:grid xl:grid-cols-12 gap-12">
          {/* First Main Column - Navigation + ISO Logos (25% width on desktop) */}
          <div className="xl:col-span-3 flex flex-col md:flex-row xl:flex-row flex-wrap justify-between gap-12 xl:pr-8">
            {/* Navigation Links - Hidden on mobile/tablet */}
            <div className="hidden xl:flex flex-1 min-w-[240px]">
              <div className="space-y-4 ">
                <Link
                  href={`/${currentLocale}`}
                  className="block text-base text-black hover:!text-[#C34069] group-hover:text-[#C34069] leading-none font-normal uppercase transition-colors"
                >
                  {t.navigation.home}
                </Link>
                <Link
                  href={`/${currentLocale}/storia`}
                  className="block text-base text-black hover:!text-[#C34069] group-hover:text-[#C34069] leading-none font-normal uppercase transition-colors"
                >
                  {t.navigation.storia}
                </Link>
                <Link
                  href={`/${currentLocale}/visione`}
                  className="block text-base text-black hover:!text-[#C34069] group-hover:text-[#C34069] leading-none font-normal uppercase transition-colors"
                >
                  {t.navigation.visione}
                </Link>
                <Link
                  href={`/${currentLocale}/certificazioni`}
                  className="block text-base text-black hover:!text-[#C34069] group-hover:text-[#C34069] leading-none font-normal uppercase transition-colors"
                >
                  {t.navigation.certificazioni}
                </Link>
                <Link
                  href={`/${currentLocale}/prodotti?classificazione=dispositivi-medici`}
                  className="block text-base text-black hover:!text-[#C34069] group-hover:text-[#C34069] leading-none font-normal uppercase transition-colors"
                >
                  {t.navigation.dispositiviMedici}
                </Link>
                <Link
                  href={`/${currentLocale}/prodotti?classificazione=integratori-alimentari`}
                  className="block text-base text-black hover:!text-[#C34069] group-hover:text-[#C34069] leading-none font-normal uppercase transition-colors"
                >
                  {t.navigation.integratoriAlimentari}
                </Link>
                <Link
                  href={`/${currentLocale}/prodotti?classificazione=farmaci`}
                  className="block text-base text-black hover:!text-[#C34069] group-hover:text-[#C34069] leading-none font-normal uppercase transition-colors"
                >
                  {t.navigation.farmaci}
                </Link>
                <Link
                  href={`/${currentLocale}/research-development`}
                  className="block text-base text-black hover:!text-[#C34069] group-hover:text-[#C34069] leading-none font-normal uppercase transition-colors"
                >
                  {t.navigation.ricercaSviluppo}
                </Link>
                <Link
                  href={`/${currentLocale}/lavora-con-noi`}
                  className="block text-base text-black hover:!text-[#C34069] group-hover:text-[#C34069] leading-none font-normal uppercase transition-colors"
                >
                  {t.navigation.lavoraConNoi}
                </Link>
                <Link
                  href={`/${currentLocale}/contatti`}
                  className="block text-base text-black hover:!text-[#C34069] group-hover:text-[#C34069] leading-none font-normal uppercase transition-colors"
                >
                  {t.navigation.contatti}
                </Link>
                <Link
                  href="https://forms.zohopublic.eu/tickets/form/RICHIEDIASSISTENZADMG/formperma/xJ_xn4qlazGWSsZiHXhhwWDJNOzSq-5H2J0ubZnir3o"
                  target="_blank"
                  className="flex items-center gap-2 text-base text-black hover:!text-[#C34069] group-hover:text-[#C34069] mt-8 group h-5 font-normal uppercase transition-colors"
                >
                  <div className="w-5 h-5 flex items-center justify-center shrink-0">
                    <img
                      src="/images/usefull-icons/helpdesk.svg"
                      alt="Help Desk"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="leading-none group-hover:text-[#C34069] flex items-center h-full pt-1">
                    {t.footer.helpDesk}
                  </span>
                </Link>
              </div>
            </div>

            {/* ISO Logos */}
            <div className="flex gap-6 flex-row items-start justify-center xl:justify-start">
              <div className="w-16 h-16 rounded flex items-center justify-center">
                <img
                  src="/images/logos/209_isocertifiedcologoblue.svg"
                  alt="ISO 9001"
                  className="max-w-full max-h-full"
                />
              </div>
              <div className="w-16 h-16 rounded flex items-center justify-center">
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
              <div className="space-y-4 xl:border-l border-[#D4D4D4] xl:pl-8 text-center xl:text-left">
                <h4 className="text-base font-[400] text-black mb-2">
                  DMG ITALIA S.R.L.
                </h4>
                <img
                  src="/images/usefull-icons/arrow.svg"
                  alt="Arrow Icon"
                  className="w-8 h-8 mb-4 mx-auto xl:mx-0"
                />
                {/* Desktop version */}
                <div className="hidden xl:block text-base text-black space-y-1 ">
                  <p className="font-[500]">{t.footer.sedeLegale}</p>
                  <p className="font-[300]">Via Laurentina km. 26,700</p>
                  <p className="font-[300]">00071 Pomezia (RM)</p>
                  <p>
                    <a
                      href="mailto:info@dmgit.com"
                      className="underline font-[300] hover:!text-[#C34069] transition-colors"
                    >
                      info@dmgit.com
                    </a>
                  </p>
                </div>
                {/* Mobile version */}
                <div className="xl:hidden text-base text-black space-y-1">
                  <p className="font-[500]">{t.footer.sedeLegale}</p>
                  <p className="font-[300]">
                    Via Laurentina km. 26,700 - 00071 Pomezia (RM)
                  </p>
                  <p>
                    <a
                      href="mailto:info@dmgit.com"
                      className="underline font-[300] hover:!text-[#C34069] transition-colors"
                    >
                      info@dmgit.com
                    </a>
                  </p>
                </div>
                {/* Desktop version */}
                <div className="hidden xl:block text-base text-black space-y-1">
                  <p className="font-[500]">{t.footer.sedeOperativa}</p>
                  <p className="font-[300]">Via Nicaragua, 10</p>
                  <p className="font-[300]">00071 Pomezia (RM)</p>
                </div>
                <div className="hidden xl:block text-base text-black space-y-1">
                  <p className="font-[300]">(+39) 06 91968038 </p>
                  <p className="font-[300]">(+39) 06 91969082</p>
                  <p className="font-[300]">(+39) 06 9145963</p>
                  <p>
                    <a
                      href="mailto:info@dmgit.com"
                      className="underline font-[300] hover:!text-[#C34069] transition-colors"
                    >
                      info@dmgit.com
                    </a>
                  </p>
                </div>
                {/* Mobile version */}
                <div className="xl:hidden text-base text-black space-y-1">
                  <p className="font-[500]">{t.footer.sedeOperativa}</p>
                  <p className="font-[300]">
                    Via Nicaragua, 10 - 00071 Pomezia (RM) -{" "}
                    <span className="whitespace-nowrap">(+39) 06 91968038</span>{" "}
                    -{" "}
                    <span className="whitespace-nowrap">(+39) 06 91969082</span>{" "}
                    -{" "}
                    <span className="whitespace-nowrap">(+39) 06 9145963</span>
                  </p>
                  <p>
                    <a
                      href="mailto:info@dmgit.com"
                      className="underline font-[300] hover:!text-[#C34069] transition-colors"
                    >
                      info@dmgit.com
                    </a>
                  </p>
                </div>
                {/* Desktop version */}
                <div className="hidden xl:block text-base text-black space-y-1">
                  <p className="font-[500]">{t.footer.magazzino}</p>
                  <p className="font-[300]">Via dei Cedri, 22</p>
                  <p className="font-[300]">00071 Pomezia (RM)</p>
                  <p>
                    <a
                      href="mailto:magazzino@dmgit.com"
                      className="underline font-[300] hover:!text-[#C34069] transition-colors"
                    >
                      magazzino@dmgit.com
                    </a>
                  </p>
                </div>
                {/* Mobile version */}
                <div className="xl:hidden text-base text-black space-y-1">
                  <p className="font-[500]">{t.footer.magazzino}</p>
                  <p className="font-[300]">
                    Via dei Cedri, 22 - 00071 Pomezia (RM)
                  </p>
                  <p>
                    <a
                      href="mailto:magazzino@dmgit.com"
                      className="underline font-[300] hover:!text-[#C34069] transition-colors"
                    >
                      magazzino@dmgit.com
                    </a>
                  </p>
                </div>
              </div>

              {/* DMG Polska sp. z o.o. */}
              <div className="space-y-4 xl:border-l border-[#D4D4D4] xl:pl-8 text-center xl:text-left">
                <h4 className="text-base font-[400] text-black mb-2">
                  DMG Polska sp. z o.o.
                </h4>
                <img
                  src="/images/usefull-icons/arrow.svg"
                  alt="Arrow Icon"
                  className="w-8 h-8 mb-4 mx-auto xl:mx-0"
                />
                {/* Desktop version */}
                <div className="hidden xl:block text-xs text-black space-y-1">
                  <p className="font-[500]">{t.footer.sedeLegale}</p>
                  <p className="font-[300]">Al. Jerozolimskie 65/79 lok.</p>
                  <p className="font-[300]">1219, 00-697 Warszawa</p>
                  <p className="font-[300]"> (Polska)</p>
                </div>
                <div className="hidden xl:block text-xs text-black space-y-1">
                  <p className="font-[300]">dmgpolska.eu</p>
                  <p>
                    <a
                      href="mailto:biuro@dmgpolska.eu"
                      className="underline font-[300] hover:!text-[#C34069] transition-colors"
                    >
                      biuro@dmgpolska.eu
                    </a>
                  </p>
                </div>
                {/* Mobile version */}
                <div className="xl:hidden text-xs text-black space-y-1">
                  <p className="font-[500]">{t.footer.sedeLegale}</p>
                  <p className="font-[300]">
                    Al. Jerozolimskie 65/79 lok. - 1219, 00-697 Warszawa
                    (Polska)
                  </p>
                  <p className="font-[300]">dmgpolska.eu</p>
                  <p>
                    <a
                      href="mailto:biuro@dmgpolska.eu"
                      className="underline font-[300] hover:!text-[#C34069] transition-colors"
                    >
                      biuro@dmgpolska.eu
                    </a>
                  </p>
                </div>
              </div>

              {/* DMG Bulgaria ltd. */}
              <div className="space-y-4 xl:border-l border-[#D4D4D4] xl:pl-8 text-center xl:text-left">
                <h4 className="text-base font-[400] text-black mb-2">
                  DMG Bulgaria ltd.
                </h4>
                <img
                  src="/images/usefull-icons/arrow.svg"
                  alt="Arrow Icon"
                  className="w-8 h-8 mb-4 mx-auto xl:mx-0"
                />
                {/* Desktop version */}
                <div className="hidden xl:block text-xs text-black space-y-1">
                  <p className="font-[500]">{t.footer.sedeLegale}</p>
                  <p className="font-[300]">Ilka Popova st.N°2</p>
                  <p className="font-[300]">ent.B, fl.5 - Sofia 1404 </p>
                  <p className="font-[300]">Lozenets, Bulgaria</p>
                </div>
                <div className="hidden xl:block text-xs text-black space-y-1">
                  <p className="font-[300]">dmgbg.com</p>
                  <p>
                    <a
                      href="mailto:info@dmgbg.com"
                      className="underline font-[300] hover:!text-[#C34069] transition-colors"
                    >
                      info@dmgbg.com
                    </a>
                  </p>
                </div>
                {/* Mobile version */}
                <div className="xl:hidden text-xs text-black space-y-1">
                  <p className="font-[500]">{t.footer.sedeLegale}</p>
                  <p className="font-[300]">
                    Ilka Popova st.N°2 - ent.B, fl.5 - Sofia 1404 - Lozenets,
                    Bulgaria
                  </p>
                  <p className="font-[300]">dmgbg.com</p>
                  <p>
                    <a
                      href="mailto:info@dmgbg.com"
                      className="underline font-[300] hover:!text-[#C34069] transition-colors"
                    >
                      info@dmgbg.com
                    </a>
                  </p>
                </div>
              </div>

              {/* DMG Turkey */}
              <div className="space-y-4 xl:border-l border-[#D4D4D4] xl:pl-8 text-center xl:text-left">
                <h4 className="text-base font-[400] text-black mb-2">
                  DMG Turkey
                </h4>
                <img
                  src="/images/usefull-icons/arrow.svg"
                  alt="Arrow Icon"
                  className="w-8 h-8 mb-4 mx-auto xl:mx-0"
                />
                {/* Desktop version */}
                <div className="hidden xl:block text-xs text-black space-y-1">
                  <p className="font-[500]">{t.footer.sedeLegale}</p>
                  <p className="font-[300]">Teşvikiye mah. Valikonağı</p>
                  <p className="font-[300]">cad. No:74 D:7/A, Şişli, </p>
                  <p className="font-[300]">İstanbul (Turkey)</p>
                </div>
                <div className="hidden xl:block text-xs text-black space-y-1">
                  <p className="font-[300]">dmgturkey.com.tr</p>
                  <p>
                    <a
                      href="mailto:info@dmgturkey.com.tr"
                      className="underline font-[300] hover:!text-[#C34069] transition-colors"
                    >
                      info@dmgturkey.com.tr
                    </a>
                  </p>
                </div>
                {/* Mobile version */}
                <div className="xl:hidden text-xs text-black space-y-1">
                  <p className="font-[500]">{t.footer.sedeLegale}</p>
                  <p className="font-[300]">
                    Teşvikiye mah. Valikonağı - cad. No:74 D:7/A, Şişli -
                    İstanbul (Turkey)
                  </p>
                  <p className="font-[300]">dmgturkey.com.tr</p>
                  <p>
                    <a
                      href="mailto:info@dmgturkey.com.tr"
                      className="underline font-[300] hover:!text-[#C34069] transition-colors"
                    >
                      info@dmgturkey.com.tr
                    </a>
                  </p>
                </div>
              </div>

              {/* DMG Italia Reference */}
              <div className="space-y-4 xl:border-l border-[#D4D4D4] xl:pl-8 text-center xl:text-left">
                <h4 className="text-base font-[400] text-black mb-2">
                  D.M.G. ITALIA S.R.L.
                </h4>
                <img
                  src="/images/usefull-icons/arrow.svg"
                  alt="Arrow Icon"
                  className="w-8 h-8 mb-4 mx-auto xl:mx-0"
                />
                {/* Desktop version */}
                <div className="hidden xl:block text-xs text-black space-y-1">
                  <p className="font-[500]">{t.footer.sedeLegale}</p>
                  <p className="font-[300]">Via Laurentina km. 26,700</p>
                  <p className="font-[300]">– 00071 Pomezia (RM)</p>
                </div>
                <div className="hidden xl:block text-xs text-black space-y-1">
                  <p className="font-[300]">italdevice.com</p>
                  <p>
                    <a
                      href="mailto:info@italdevice.com"
                      className="underline font-[300] hover:!text-[#C34069] transition-colors"
                    >
                      info@italdevice.com
                    </a>
                  </p>
                </div>
                {/* Mobile version */}
                <div className="xl:hidden text-xs text-black space-y-1">
                  <p className="font-[500]">{t.footer.sedeLegale}</p>
                  <p className="font-[300]">
                    Via Laurentina km. 26,700 – 00071 Pomezia (RM)
                  </p>
                  <p className="font-[300]">italdevice.com</p>
                  <p>
                    <a
                      href="mailto:info@italdevice.com"
                      className="underline font-[300] hover:!text-[#C34069] transition-colors"
                    >
                      info@italdevice.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Help Desk - After companies on mobile/tablet */}
            <div className="xl:hidden mt-8 flex justify-center">
              <Link
                href="https://forms.zohopublic.eu/tickets/form/RICHIEDIASSISTENZADMG/formperma/xJ_xn4qlazGWSsZiHXhhwWDJNOzSq-5H2J0ubZnir3o"
                target="_blank"
                className="flex items-center gap-2 text-base text-black hover:!text-[#C34069] group-hover:text-[#C34069] transition-colors group h-5"
              >
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <img
                    src="/images/usefull-icons/helpdesk.svg"
                    alt="Help Desk"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="leading-none group-hover:text-[#C34069] flex items-center h-full pt-1">
                  {t.footer.helpDesk}
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col xl:flex-row justify-between items-center gap-4">
            {/* DMG Logo */}
            <div className="flex-shrink-0 ">
              <img
                src="/images/logos/dmg-logo.svg"
                alt="DMG Logo"
                className="h-11 w-auto"
              />
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[11px] [&>a]:!text-[#919191] [&>a]:!font-[300]">
              <Link
                href={`/${currentLocale}/certificazioni`}
                className="hover:!text-[#C34069] transition-colors"
              >
                {t.navigation.certificazioni.toUpperCase()}
              </Link>
              <Link
                href={`/${currentLocale}/trasparenza`}
                className="hover:!text-[#C34069] transition-colors"
              >
                {t.footer.trasparenza}
              </Link>
              <Link
                href={`/${currentLocale}/privacy-policy`}
                className="hover:!text-[#C34069] transition-colors"
              >
                {t.footer.privacyPolicy}
              </Link>
              <Link
                href={`/${currentLocale}/cookie-policy`}
                className="hover:!text-[#C34069] transition-colors"
              >
                {t.footer.cookiePolicy}
              </Link>
              <Link
                href={`/${currentLocale}/compliance`}
                className="hover:!text-[#C34069] transition-colors"
              >
                {t.footer.compliance}
              </Link>
              <Link
                href={`/${currentLocale}/whistleblowing`}
                className="hover:!text-[#C34069] transition-colors"
              >
                {t.footer.whistleblowing}
              </Link>
            </nav>

            {/* Copyright */}
            <div className="text-[8px] text-[#919191] font-[300] text-center xl:text-right">
              {/* Desktop version - single line */}
              <p className="hidden xl:block whitespace-nowrap !text-[11px]">
                {t.footer.copyright}
              </p>
              {/* Mobile/Tablet version - two lines */}
              <div className="xl:hidden">
                <p className="!text-[11px]">
                  r.e.a. latina n. 198376 - cap. soc. € 200.000.000,00 - p.iva
                  02774840595
                </p>
                <p className="!text-[11px]">
                  © 2025 pfizer srl. società diretta e controllata da pfizer
                  inc.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

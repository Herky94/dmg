import { getTranslations, Locale } from "@/lib/translations";
import { MenuItem } from "./menuData";

export function getMenuData(locale: Locale): MenuItem[] {
  const t = getTranslations(locale);

  return [
    {
      name: t.navigation.home,
      href: `/${locale}`,
    },
    {
      name: t.navigation.company,
      href: "",
      hasDropdown: true,
      submenu: [
        { name: t.navigation.storia, href: `/${locale}/storia` },
        { name: t.navigation.visione, href: `/${locale}/visione` },
        {
          name: t.navigation.certificazioni,
          href: `/${locale}/certificazioni`,
        },
        {
          name: t.navigation.vocazioneInternazionale,
          href: `/${locale}/vocazione-internazionale`,
        },
      ],
    },
    {
      name: t.navigation.corporate,
      href: "",
      hasDropdown: true,
      submenu: [
        { name: t.navigation.dmgItalia, href: `/${locale}/corporate/italia` },
        {
          name: t.navigation.dmgBulgaria,
          href: `/${locale}/corporate/bulgaria`,
        },
        { name: t.navigation.dmgPolonia, href: `/${locale}/corporate/polonia` },
        { name: t.navigation.dmgTurchia, href: `/${locale}/corporate/turchia` },
        {
          name: t.navigation.italdevice,
          href: `/${locale}/corporate/italdevice`,
        },
      ],
    },
    {
      name: t.navigation.rd,
      href: `/${locale}/research-development`,
    },
    {
      name: t.navigation.prodotti,
      href: `/${locale}/prodotti`,
      hasDropdown: true,
      submenu: [
        {
          name: t.navigation.dispositiviMedici,
          href: `/${locale}/prodotti?classificazione=dispositivi-medici`,
        },
        {
          name: t.navigation.integratoriAlimentari,
          href: `/${locale}/prodotti?classificazione=integratori-alimentari`,
        },
        {
          name: t.navigation.farmaci,
          href: `/${locale}/prodotti?classificazione=farmaci`,
        },
      ],
    },
    {
      name: t.navigation.lavoraConNoi,
      href: `/${locale}/lavora-con-noi`,
    },
    {
      name: t.navigation.contatti,
      href: "",
      hasDropdown: true,
      submenu: [
        {
          name: t.navigation.farmacovigilanza,
          href: `/${locale}/contatti/farmacovigilanza`,
        },
        {
          name: t.navigation.vigilanzaSorveglianza,
          href: `/${locale}/contatti/vigilanza-sorveglianza`,
        },
      ],
    },
  ];
}

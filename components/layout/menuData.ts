export interface MenuSubItem {
  name: string;
  href: string;
}

export interface MenuItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
  submenu?: MenuSubItem[];
}

export const menuData: MenuItem[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Azienda",
    href: "",
    hasDropdown: true,
    submenu: [
      { name: "Storia", href: "/storia" },
      { name: "Visione", href: "/visione" },
      { name: "Certificazioni", href: "/certificazioni" },
      { name: "Vocazione Internazionale", href: "/vocazione-internazionale" },
    ],
  },
  {
    name: "Corporate",
    href: "",
    hasDropdown: true,
    submenu: [
      { name: "D.M.G. Italia", href: "/corporate/italia" },
      { name: "D.M.G. Bulgaria", href: "/corporate/bulgaria" },
      { name: "D.M.G. Polonia", href: "/corporate/polonia" },
      { name: "D.M.G. Turchia", href: "/corporate/turchia" },
      { name: "ITALDEVICE", href: "/corporate/italdevice" },
    ],
  },
  {
    name: "R&D",
    href: "/research-development",
  },
  {
    name: "Prodotti",
    href: "/prodotti",
    hasDropdown: true,
    submenu: [
      {
        name: "Dispositivi Medici",
        href: "/prodotti?classificazione=dispositivi-medici",
      },
      {
        name: "Integratori Alimentari",
        href: "/prodotti?classificazione=integratori-alimentari",
      },
      { name: "Farmaci", href: "/prodotti?classificazione=farmaci" },
    ],
  },
  {
    name: "Lavora con noi",
    href: "/lavora-con-noi",
  },
  {
    name: "Contatti",
    href: "",
    hasDropdown: true,
    submenu: [
      { name: "Farmacovigilanza", href: "/contatti/farmacovigilanza" },
      {
        name: "Vigilanza e Sorveglianza",
        href: "/contatti/vigilanza-sorveglianza",
      },
    ],
  },
];

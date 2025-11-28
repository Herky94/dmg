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
    name: 'Home',
    href: '/',
  },
  {
    name: 'Azienda',
    href: '/azienda',
    hasDropdown: true,
    submenu: [
      { name: 'Storia', href: '/azienda/storia' },
      { name: 'Messaggio del CEO', href: '/azienda/messaggio-ceo' },
      { name: 'Certificazioni', href: '/azienda/certificazioni' },
      { name: 'Vocazione Internazionale', href: '/azienda/vocazione-internazionale' },
    ],
  },
  {
    name: 'Corporate',
    href: '/corporate',
    hasDropdown: true,
    submenu: [
      { name: 'D.M.G. Italia', href: '/corporate/italia' },
      { name: 'D.M.G. Bulgaria', href: '/corporate/bulgaria' },
      { name: 'D.M.G. Polonia', href: '/corporate/polonia' },
      { name: 'D.M.G. Turchia', href: '/corporate/turchia' },
      { name: 'ITALDEVICE', href: '/corporate/italdevice' },
    ],
  },
  {
    name: 'R&D',
    href: '/rd',
  },
  {
    name: 'Prodotti',
    href: '/prodotti',
    hasDropdown: true,
    submenu: [
      { name: 'Dispositivi Medici', href: '/prodotti/dispositivi-medici' },
      { name: 'Integratori Alimentari', href: '/prodotti/integratori-alimentari' },
      { name: 'Farmaci', href: '/prodotti/farmaci' },
    ],
  },
  {
    name: 'Lavora con noi',
    href: '/lavora-con-noi',
  },
  {
    name: 'Contatti',
    href: '/contatti',
    hasDropdown: true,
    submenu: [
      { name: 'Farmacovigilanza', href: '/contatti/farmacovigilanza' },
      { name: 'Vigilanza e Sorveglianza', href: '/contatti/vigilanza-sorveglianza' },
    ],
  },
];
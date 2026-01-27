# Implementazione Internazionalizzazione (IT/EN) - DMG Italia

**Obiettivo**: Aggiungere versione inglese del sito mantenendo quella italiana esistente.

---

## 📋 PANORAMICA

### Cosa Verrà Fatto

- Routing multilingua: `/it/*` (italiano) e `/en/*` (inglese)
- Traduzioni in file JSON (NON su Strapi per budget)
- Prodotti: 2 Collection Types Strapi separati (IT e EN)
- Geolocalizzazione automatica: visitatori esteri → versione EN
- SEO completo per entrambe le lingue
- Language switcher nel header

### Approccio Scelto

**File JSON per traduzioni** (NON Strapi)

- Motivo: Budget limitato (3.500€), troppo costoso gestire 200+ campi Strapi
- Vantaggi: Veloce, semplice, manutenibile
- Testi modificabili: editing di 2 file JSON

---

## 🏗️ ARCHITETTURA TECNICA

### 1. Struttura Route Next.js

**PRIMA**:

```
app/
├── page.tsx           → Homepage italiana
├── prodotti/
│   └── [slug]/
└── storia/
```

**DOPO**:

```
app/
├── [locale]/          ← NUOVO: parametro dinamico 'it' | 'en'
│   ├── page.tsx       → Homepage (riceve locale)
│   ├── prodotti/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── storia/
│   │   └── page.tsx
│   └── ... tutte le altre pagine
│
├── middleware.ts      ← NUOVO: gestione redirect e geolocation
└── not-found.tsx
```

### 2. URL Risultanti

**Italiano**:

- `dmgitalia.com/it`
- `dmgitalia.com/it/prodotti`
- `dmgitalia.com/it/prodotti/rinopanteina-spray`
- `dmgitalia.com/it/storia`

**Inglese**:

- `dmgitalia.com/en`
- `dmgitalia.com/en/products`
- `dmgitalia.com/en/products/rhinopantein-spray`
- `dmgitalia.com/en/about`

**Root** (redirect automatico):

- `dmgitalia.com` → `/it` (se IP italiano)
- `dmgitalia.com` → `/en` (se IP estero)

**Backward Compatibility**:

- `dmgitalia.com/prodotti` → redirect 301 a `/it/prodotti`
- Tutti i vecchi link restano funzionanti

### 3. Sistema Traduzioni

**File di traduzione**:

```
locales/
├── it.json    → Tutti i testi italiani (~120 variabili)
└── en.json    → Tutti i testi inglesi (~120 variabili)
```

**Struttura JSON Esempio**:

```json
{
  "home": {
    "hero": {
      "tagline": "Quando serve cura.",
      "description": "Offriamo soluzioni terapeutiche...",
      "cta": "Scopri di più"
    },
    "products": {
      "title": "I nostri prodotti",
      "dm_title": "Dispositivi Medici",
      "dm_description": "I dispositivi medici..."
    }
  },
  "storia": {
    "hero": {
      "title": "La nostra storia",
      "description": "Dal 1993..."
    },
    "timeline": [
      { "year": "1993", "text": "..." },
      { "year": "1997", "text": "..." }
    ]
  }
}
```

**Helper Traduzioni** (`lib/translations.ts`):

```typescript
import it from "@/locales/it.json";
import en from "@/locales/en.json";

export function getTranslations(locale: "it" | "en") {
  return locale === "it" ? it : en;
}
```

**Uso nei Componenti**:

```tsx
// PRIMA
export default function Hero() {
  return <h1>Quando serve cura.</h1>;
}

// DOPO
import { getTranslations } from "@/lib/translations";

export default function Hero({ locale }: { locale: "it" | "en" }) {
  const t = getTranslations(locale);
  return <h1>{t.home.hero.tagline}</h1>;
}
```

---

## 🗄️ STRAPI - PRODOTTI

### Collection Types

**Esistente**: `Prodotto` (italiano)

- Mantiene struttura attuale
- Nessuna modifica

**Nuovo**: `Prodotto EN` (inglese)

- Struttura identica a `Prodotto`
- Slug auto-generato da campo `Name` in inglese
- Relazioni: stesse di `Prodotto` (formulazioni, classificazioni, aree terapeutiche)

### Schema JSON Fornito

File: `prodotto-en-schema.json` (già creato nella root del progetto)

**Importazione**:

1. Zippa la cartella che verrà generata automaticamente da Strapi
2. Carica tramite File Manager backend
3. Unzip
4. Riavvia server Strapi

### Fetch Prodotti nel Frontend

**PRIMA** (solo italiano):

```tsx
const prodotti = await fetch(`${STRAPI_URL}/api/prodottos?populate=*`);
```

**DOPO** (in base al locale):

```tsx
// app/[locale]/prodotti/page.tsx
const endpoint =
  locale === "it"
    ? "/api/prodottos" // Collection Type italiano
    : "/api/prodotto-ens"; // Collection Type inglese

const prodotti = await fetch(`${STRAPI_URL}${endpoint}?populate=*`);
```

---

## 🧭 MIDDLEWARE & GEOLOCALIZZAZIONE

**File**: `middleware.ts` (root del progetto)

**Funzionalità**:

1. Rileva locale dall'URL (`/it/*` o `/en/*`)
2. Se manca locale → geolocalizzazione IP
   - IP italiano → redirect `/it`
   - IP estero → redirect `/en`
3. Salva preferenza in cookie `NEXT_LOCALE`
4. Redirect 301 per vecchi URL senza locale

**Esempio Logica**:

```typescript
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Se già ha locale, procedi
  if (pathname.startsWith("/it") || pathname.startsWith("/en")) {
    return NextResponse.next();
  }

  // Controlla cookie
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale) {
    return NextResponse.redirect(`/${cookieLocale}${pathname}`);
  }

  // Geolocalizzazione da headers
  const country = request.geo?.country || request.headers.get("cf-ipcountry");
  const locale = country === "IT" ? "it" : "en";

  // Redirect con cookie
  const response = NextResponse.redirect(`/${locale}${pathname}`);
  response.cookies.set("NEXT_LOCALE", locale);
  return response;
}
```

---

## 🎨 COMPONENTI UI

### Menu Header

**2 Versioni Separate** (hardcoded, NON da Strapi):

**Italiano**:

```tsx
const menuIT = [
  { label: "Prodotti", href: "/it/prodotti" },
  { label: "Storia", href: "/it/storia" },
  { label: "Certificazioni", href: "/it/certificazioni" },
  // ...
];
```

**Inglese**:

```tsx
const menuEN = [
  { label: "Products", href: "/en/products" },
  { label: "About", href: "/en/about" },
  { label: "Certifications", href: "/en/certifications" },
  // ...
];
```

**Componente**:

```tsx
export default function Header({ locale }) {
  const menu = locale === "it" ? menuIT : menuEN;
  return (
    <nav>
      {menu.map((item) => (
        <Link href={item.href}>...</Link>
      ))}
    </nav>
  );
}
```

### Language Switcher

**Posizione**: Header (dove ora c'è icona lingua)

**Funzionalità**:

- Toggle IT/EN
- Mantiene la stessa pagina (es: `/it/prodotti` → `/en/products`)
- Salva preferenza in cookie

**Esempio**:

```tsx
export default function LanguageSwitcher({ locale, pathname }) {
  const toggleLocale = locale === "it" ? "en" : "it";
  const newPath = pathname.replace(`/${locale}`, `/${toggleLocale}`);

  return (
    <Link href={newPath} onClick={() => setCookie("NEXT_LOCALE", toggleLocale)}>
      {locale === "it" ? "EN" : "IT"}
    </Link>
  );
}
```

### Form

**2 Versioni** (hardcoded):

- Label/placeholder tradotti
- Validazioni tradotte
- Stessa API backend

---

## 🔍 SEO & METADATA

### Metadata Dinamici per Pagina

**PRIMA**:

```tsx
// app/storia/page.tsx
export const metadata: Metadata = {
  title: "Storia",
};
```

**DOPO**:

```tsx
// app/[locale]/storia/page.tsx
import { getTranslations } from "@/lib/translations";

export async function generateMetadata({ params }) {
  const t = getTranslations(params.locale);

  return {
    title: t.storia.seo_title, // "Storia" o "Our Story"
    description: t.storia.seo_description,
    openGraph: {
      title: t.storia.seo_title,
      description: t.storia.seo_description,
    },
  };
}
```

**Aggiungere in JSON**:

```json
{
  "storia": {
    "seo_title": "La Nostra Storia | DMG Italia",
    "seo_description": "Dal 1993 a oggi...",
    "hero": { ... }
  }
}
```

### hreflang Tags

**Automatici nel layout**:

```tsx
// app/[locale]/layout.tsx
export default function LocaleLayout({ params, children }) {
  return (
    <html lang={params.locale}>
      <head>
        <link rel="alternate" hreflang="it" href="https://dmgitalia.com/it" />
        <link rel="alternate" hreflang="en" href="https://dmgitalia.com/en" />
        <link
          rel="alternate"
          hreflang="x-default"
          href="https://dmgitalia.com/it"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Sitemap

**File**: `app/sitemap.ts`

**Genera URL per entrambe le lingue**:

```typescript
export default function sitemap() {
  const pages = ['', 'prodotti', 'storia', 'certificazioni', ...]

  return pages.flatMap(page => [
    {
      url: `https://dmgitalia.com/it/${page}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          it: `https://dmgitalia.com/it/${page}`,
          en: `https://dmgitalia.com/en/${page}`
        }
      }
    },
    {
      url: `https://dmgitalia.com/en/${page}`,
      lastModified: new Date(),
    }
  ])
}
```

---

## 📦 MIGRAZIONE COMPONENTI

### Elenco Componenti da Modificare

**Home** (~20 testi):

- `components/home/Hero.tsx`
- `components/home/ProductsSection.tsx`
- `components/home/StorySection.tsx`
- `components/home/LeadershipSection.tsx`
- `components/home/InternationalSection.tsx`
- `components/home/LogosHorizontalSection.tsx`

**Pagine** (~100 testi):

- `app/[locale]/storia/page.tsx`
- `app/[locale]/prodotti/page.tsx`
- `app/[locale]/certificazioni/page.tsx`
- `app/[locale]/visione/page.tsx`
- `app/[locale]/research-development/page.tsx`
- `app/[locale]/vocazione-internazionale/page.tsx`
- `app/[locale]/lavora-con-noi/page.tsx`
- `app/[locale]/corporate/*/page.tsx` (5 pagine)
- `app/[locale]/contatti/*/page.tsx` (2 pagine)

**Shared**:

- `components/shared/PageHero.tsx` (riceve testi come props)
- `components/layout/Header.tsx` (menu + language switcher)
- `components/layout/Footer.tsx` (link tradotti)

### Pattern di Modifica Standard

**1. Aggiungere parametro locale**:

```tsx
// PRIMA
export default function Component() { ... }

// DOPO
export default function Component({ locale }: { locale: 'it' | 'en' }) { ... }
```

**2. Importare helper**:

```tsx
import { getTranslations } from "@/lib/translations";
```

**3. Sostituire testi hardcoded**:

```tsx
// PRIMA
const title = "Quando serve cura.";

// DOPO
const t = getTranslations(locale);
const title = t.home.hero.tagline;
```

**4. Propagare locale ai children**:

```tsx
<Hero locale={locale} />
<ProductsSection locale={locale} />
```

---

## 📝 CONTENUTI CLIENTE

### File Forniti

**Formato**: Word (confermato)
**Timing**: In giornata
**Contenuto**: Testi in italiano + traduzioni inglesi

### Processo Inserimento

1. **Ricevere file Word** dal cliente
2. **Estrarre testi** e organizzare in struttura JSON
3. **Popolare** `locales/it.json` con testi italiani
4. **Popolare** `locales/en.json` con traduzioni inglesi
5. **Verificare** che tutte le chiavi corrispondano
6. **Commit** dei file JSON

### Struttura Attesa JSON

```json
{
  "home": {
    "hero": { ... },
    "products": { ... },
    "story": { ... },
    "leadership": { ... },
    "international": { ... }
  },
  "storia": { ... },
  "prodotti": { ... },
  "certificazioni": { ... },
  "visione": { ... },
  "research": { ... },
  "vocazione": { ... },
  "lavora": { ... },
  "corporate": {
    "italia": { ... },
    "bulgaria": { ... },
    "polonia": { ... },
    "turchia": { ... },
    "italdevice": { ... }
  },
  "contatti": { ... }
}
```

**Totale stimato**: ~120-150 variabili per lingua

---

## 🧪 TESTING

### Checklist Funzionalità

**Routing**:

- [ ] `/it` mostra homepage italiana
- [ ] `/en` mostra homepage inglese
- [ ] Root `/` redirect corretto in base a IP
- [ ] Vecchi URL (`/prodotti`) redirect a `/it/prodotti`

**Traduzioni**:

- [ ] Tutti i testi homepage in IT
- [ ] Tutti i testi homepage in EN
- [ ] Tutte le pagine secondarie IT
- [ ] Tutte le pagine secondarie EN
- [ ] Nessun testo mancante (fallback a IT se assente)

**Menu & Navigation**:

- [ ] Menu italiano con link `/it/*`
- [ ] Menu inglese con link `/en/*`
- [ ] Language switcher funzionante
- [ ] Cookie salva preferenza lingua
- [ ] Footer link corretti per lingua

**Prodotti**:

- [ ] `/it/prodotti` mostra prodotti IT da Strapi
- [ ] `/en/products` mostra prodotti EN da Strapi
- [ ] Slug diversi per IT/EN
- [ ] Dettaglio prodotto funzionante in entrambe lingue

**SEO**:

- [ ] Metadata (title, description) corretti per ogni pagina IT
- [ ] Metadata corretti per ogni pagina EN
- [ ] hreflang tags presenti
- [ ] Sitemap contiene URL IT + EN
- [ ] robots.txt permette entrambe le lingue

**Performance**:

- [ ] Nessun rallentamento percepibile
- [ ] File JSON caricati correttamente
- [ ] Immagini/risorse condivise tra lingue

---

## 🚀 DEPLOY

### Ambiente Staging

**Frontend**: `https://dmg.altera.consulting/`
**Backend**: `https://dmg-backend.altera.consulting/`

### Procedura

1. **Branch**: `feature/i18n`
2. **Commit** progressivi durante sviluppo
3. **Push** a staging per testing
4. **Verifica** cliente (UAT)
5. **Fix** eventuali bug
6. **Merge** a `main`
7. **Deploy** produzione

### Rollback

In caso di problemi:

- Branch `feature/i18n` isolato
- Main resta funzionante
- Rollback immediato possibile

---

## 🔧 FILE DA CREARE/MODIFICARE

### Nuovi File

- [ ] `middleware.ts` (root)
- [ ] `locales/it.json`
- [ ] `locales/en.json`
- [ ] `lib/translations.ts`
- [ ] `prodotto-en-schema.json` (già creato)
- [ ] `app/[locale]/layout.tsx`
- [ ] `app/sitemap.ts` (aggiornare)

### Folder da Spostare

Spostare tutte le route esistenti dentro `[locale]`:

- [ ] `app/page.tsx` → `app/[locale]/page.tsx`
- [ ] `app/prodotti/*` → `app/[locale]/prodotti/*`
- [ ] `app/storia/*` → `app/[locale]/storia/*`
- [ ] Tutte le altre pagine

### Componenti da Modificare

- [ ] Tutti in `components/home/*` (6 file)
- [ ] Tutti in `components/layout/*` (3 file)
- [ ] `components/shared/PageHero.tsx`
- [ ] Form e componenti interattivi

---

## ⚠️ NOTE IMPORTANTI

### Cosa NON Fare

❌ **NON duplicare componenti** per IT/EN

- Un solo componente riceve `locale` come prop

❌ **NON usare Strapi per testi pagine**

- Solo JSON per budget

❌ **NON modificare Collection Type `Prodotto` esistente**

- Creare solo nuovo `Prodotto EN`

❌ **NON cambiare struttura URL produzione esistente**

- Solo aggiungere `/it` prefix

### Fallback & Sicurezza

**Se traduzione EN manca**:

- Mostrare testo italiano (fallback)
- NON crashare l'app
- Log warning in console

**Cookie Privacy**:

- Cookie `NEXT_LOCALE` è tecnico (nessun consenso richiesto)
- Durata: 1 anno

### Performance

**JSON vs Strapi**:

- JSON: 0ms (importato staticamente)
- Strapi: evitato per testi (solo prodotti)

**Cache**:

- Next.js cache automatica
- Nessuna configurazione speciale necessaria

---

## 📞 SUPPORTO

### In Caso di Dubbi

**Strapi Schema**:

- File `prodotto-en-schema.json` fornito
- Struttura identica a `Prodotto` esistente
- Slug auto-generato da `Name`

**JSON Traduzioni**:

- Struttura gerarchica logica
- Nomi chiave descrittivi
- Array per liste ripetitive

**Componenti**:

- Pattern uniforme per tutti
- Props `locale` sempre passato
- Helper `getTranslations()` centralizzato

---

## ✅ DELIVERABLE FINALE

### Cosa Verrà Consegnato

1. **Codice**:
   - Branch `feature/i18n` pronto per merge
   - Tutti i file necessari committati
   - Nessun file temporaneo

2. **Strapi**:
   - Collection Type "Prodotto EN" configurato
   - Schema JSON fornito per importazione

3. **Contenuti**:
   - `locales/it.json` popolato
   - `locales/en.json` popolato
   - Tutti i testi organizzati

4. **Testing**:
   - Deploy su staging funzionante
   - Checklist completata
   - Bug fix applicati

5. **Documentazione**:
   - Questo file (guida implementazione)
   - Commenti nel codice dove necessario
   - README aggiornato se necessario

### Pronto per Produzione

Quando tutti i deliverable sono completati:

- Cliente testa su staging
- Approva
- Merge a main
- Deploy produzione
- Monitoraggio post-lancio

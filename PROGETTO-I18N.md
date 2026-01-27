# Progetto Internazionalizzazione DMG Italia

**Data**: 23 Gennaio 2026  
**Obiettivo**: Versione inglese del sito (IT/EN) con routing dinamico

---

## 🎯 Soluzione Adottata

**Testi delle pagine**: File JSON (`locales/it.json`, `locales/en.json`)  
**Prodotti**: Strapi con 2 Collection Types separati (Prodotto IT + Prodotto EN)  
**Routing**: Dynamic `[locale]` con middleware per geolocation

### Vantaggi

- Testi facilmente modificabili via JSON
- Strapi solo per contenuti complessi (prodotti)
- Implementazione rapida
- Manutenzione semplice

---

## 🚀 Struttura Tecnica

### URL

```
IT: dmgitalia.com/it/prodotti
EN: dmgitalia.com/en/products
```

### Routing Next.js

```
app/
├── [locale]/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── prodotti/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── ... altre pagine
└── middleware.ts
```

### File Traduzioni

```
locales/
├── it.json  (~120-150 variabili)
├── en.json  (~120-150 variabili)
```

**Esempio struttura JSON:**

```json
{
  "home": {
    "hero": {
      "tagline": "Quando serve cura.",
      "title": "Dispositivi medici..."
    },
    "products": {
      "title": "I nostri prodotti"
    }
  },
  "prodotti": {
    "title": "I nostri prodotti",
    "filters": {
      "all": "Tutti",
      "category": "Categoria"
    }
  }
}
```

### Helper Traduzioni

```typescript
// lib/translations.ts
import it from "@/locales/it.json";
import en from "@/locales/en.json";

export function getTranslations(locale: "it" | "en") {
  return locale === "it" ? it : en;
}
```

### Uso nei Componenti

```tsx
import { getTranslations } from "@/lib/translations";

export default function HomePage({
  params,
}: {
  params: { locale: "it" | "en" };
}) {
  const t = getTranslations(params.locale);

  return <Hero title={t.home.hero.title} />;
}
```

---

## 🗄️ Strapi - Collection Types

### Collection Types Italiane (esistenti)

- `api::prodotto.prodotto` - Prodotti IT
- `api::formulazione.formulazione` - Formulazioni IT
- `api::classificazione.classificazione` - Classificazioni IT
- `api::area-terapeutica.area-terapeutica` - Aree terapeutiche IT

### Collection Types Inglesi (create 23/01/2026)

- `api::prodotto-en.prodotto-en` - Prodotti EN ✅
- `api::formulazione-en.formulazione-en` - Formulazioni EN ✅
- `api::classificazione-en.classificazione-en` - Classificazioni EN ✅
- `api::area-terapeutica-en.area-terapeutica-en` - Aree terapeutiche EN ✅

### Struttura Prodotto EN

**Campi principali**:

- Name (Text) → auto-genera slug
- Sottotitolo, Descrizione, Indicazione, Posologia (Blocks)
- Immagine, Video, PDF (Media)

**Relazioni**:

- Formulazioni → `api::formulazione-en.formulazione-en`
- Classificazioni → `api::classificazione-en.classificazione-en`
- Aree terapeutiche → `api::area-terapeutica-en.area-terapeutica-en`
- Altre formulazioni → `api::prodotto-en.prodotto-en` (self-referencing)
- Collegato a → `api::prodotto-en.prodotto-en` (self-referencing)

**Fetch separato per lingua:**

```tsx
async function getProducts(locale: "it" | "en") {
  const endpoint = locale === "it" ? "prodottos" : "prodotto-ens";
  const res = await fetch(`${STRAPI_URL}/api/${endpoint}?populate=*`);
  return res.json();
}
```

---

## 🌍 Middleware Geolocation

```tsx
// middleware.ts
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api") || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  const hasLocale = pathname.startsWith("/it") || pathname.startsWith("/en");

  if (!hasLocale) {
    const locale = detectLocale(request); // Cookie > IP > Accept-Language > 'en'
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  return NextResponse.next();
}

function detectLocale(request: NextRequest): "it" | "en" {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale === "it" || cookieLocale === "en") return cookieLocale;

  const country = request.headers.get("CF-IPCountry");
  if (country === "IT") return "it";

  const acceptLanguage = request.headers.get("Accept-Language");
  if (acceptLanguage?.includes("it")) return "it";

  return "en";
}
```

---

## ✅ Checklist Implementazione

### Setup Base

- [ ] Creare `locales/it.json` e `locales/en.json`
- [ ] Creare `lib/translations.ts`
- [ ] Ristrutturare app in `[locale]/`
- [ ] Creare `middleware.ts`
- [x] Collection Type "Prodotto EN" in Strapi (fatto)

### Estrazione Testi

- [ ] Estrarre testi da tutte le pagine (~15 pagine)
- [ ] Popolare `it.json` (~120 variabili)
- [ ] Ricevere traduzioni EN dal cliente
- [ ] Popolare `en.json`

### Componenti

- [ ] Modificare componenti per accettare `locale`
- [ ] Passare testi da JSON come props
- [ ] Aggiornare fetch prodotti (IT/EN)

### Navigation & SEO

- [ ] Menu IT/EN
- [ ] Footer IT/EN
- [ ] Language switcher
- [ ] Metadata localizzati
- [ ] Sitemap con hreflang
- [ ] Redirect 301 vecchi URL

### Testing & Deploy

- [ ] Test switching lingua
- [ ] Test link IT/EN
- [ ] Test prodotti separati
- [ ] Deploy staging
- [ ] Go-live

---

## ⚠️ Note Importanti

### Performance

- Testi JSON: zero latenza (importati a build time)
- Prodotti Strapi: cache ISR (`export const revalidate = 3600`)

### SEO

- Redirect 301 automatici: `/prodotti` → `/it/prodotti`
- hreflang tags per ogni pagina
- Metadata dinamici per locale

### Modifica Testi

- Sviluppatori: edit `locales/*.json` + commit
- Cliente: Pull Request o CMS leggero (Tina CMS)
- Migrazione a Strapi possibile in futuro

### FAQ

**Altre lingue?** Crea `locales/fr.json`, `locales/de.json`  
**Slug prodotti EN?** Auto-generati dal nome inglese  
**Cookie lingua?** Salva preferenza utente automaticamente

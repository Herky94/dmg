# Struttura Strapi - Posizioni Lavorative

## Collection Type: `posizione-lavorativa`

### Campi richiesti:

1. **TitoloPosizione** (Text)
   - Campo obbligatorio
   - Esempio: "Full Stack Developer"
   - Usato in: Card, Form select, Sidebar

2. **Slug** (UID - basato su TitoloPosizione)
   - Campo obbligatorio
   - Auto-generato da TitoloPosizione
   - Usato per: URL dinamici (/posizioni-aperte/[slug])

3. **Sottotitolo** (Text)
   - Campo obbligatorio
   - Esempio: "Specifica" o "Full-time"
   - Usato in: Card (sotto il titolo)

4. **Descrizione** (Rich Text / Long Text)
   - Campo obbligatorio
   - Descrizione completa della posizione
   - Usato in: Card (preview), Sidebar dettaglio

5. **Immagine** (Media - Single)
   - Campo opzionale
   - Se non presente: sfondo magenta (#C34069)
   - Formato: 1:1 (quadrato) - dimensione suggerita 800x800px
   - Alt text: "Posizione lavorativa" (se non specificato)

6. **Modalita** (Enumeration)
   - Campo obbligatorio
   - Valori possibili:
     - "da remoto"
     - "ibrido"
     - "in sede"
   - Usato in: Card footer, Sidebar

7. **Attiva** (Boolean)
   - Campo obbligatorio
   - Default: true
   - Determina se la posizione è visibile sul sito

8. **publishedAt** (Date)
   - Campo automatico Strapi
   - Usato per: "Pubblicato X giorni fa"

## Campi da RIMUOVERE (vecchia struttura):

- ❌ Titolo → TitoloPosizione
- ❌ Tipologia → Modalita
- ❌ DescrizioneBreve → Descrizione
- ❌ DescrizioneCompleta
- ❌ Requisiti
- ❌ Responsabilita
- ❌ CosaOffriamo
- ❌ Sede
- ❌ TipoContratto
- ❌ DataPubblicazione
- ❌ Ordine (non più necessario)

## API Endpoints utilizzati:

1. **Lista posizioni attive:**
   \`\`\`
   GET /api/posizione-lavorativas?populate=\*&filters[Attiva][$eq]=true
   \`\`\`

2. **Posizione singola per slug:**
   \`\`\`
   GET /api/posizione-lavorativas?populate=\*&filters[Slug][$eq]={slug}
   \`\`\`

3. **Solo titoli per select form:**
   \`\`\`
   GET /api/posizione-lavorativas?filters[Attiva][$eq]=true
   \`\`\`

## Integrazione Frontend:

### Card Posizione:

- **Immagine**: Sfondo magenta se mancante
- **Titolo**: `TitoloPosizione`
- **Sottotitolo**: `Sottotitolo`
- **Descrizione**: Prime 3 righe con `line-clamp-3`
- **Footer**: "Pubblicato {data} · {Modalita}"

### Pagina Dettaglio:

- **Sidebar magenta**:
  - Titolo: `TitoloPosizione`
  - Sottotitolo: `Sottotitolo`
  - Modalità: `Modalita`
  - Descrizione: `Descrizione`

### Form Candidatura:

- **Select Posizione**: Popolato dinamicamente con tutti i `TitoloPosizione` attivi
- **Pre-compilato**: Se arrivi da una posizione specifica

## Migrazione dati:

Se hai già dati in Strapi, mappa i vecchi campi così:

- `Titolo` → `TitoloPosizione`
- `Tipologia` → `Sottotitolo`
- `DescrizioneBreve` → `Descrizione`
- Aggiungi manualmente `Modalita` (scegli tra le 3 opzioni)
- Rimuovi gli altri campi dopo la migrazione

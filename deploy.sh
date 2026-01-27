#!/bin/bash

# Script di deployment per Next.js su Plesk con PM2
# Uso: ./deploy.sh

set -e

echo "🚀 Deployment DMG Frontend - Next.js + PM2"
echo "=========================================="

# Colori per output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Verifica file .env.production
echo -e "\n${YELLOW}📋 Step 1: Verifica configurazione...${NC}"
if [ ! -f .env.production ]; then
    echo -e "${RED}❌ File .env.production non trovato!${NC}"
    echo "Copia .env.example e configura le variabili:"
    echo "  cp .env.example .env.production"
    exit 1
fi
echo -e "${GREEN}✓ File .env.production trovato${NC}"

# Step 2: Installa dipendenze
echo -e "\n${YELLOW}📦 Step 2: Installazione dipendenze...${NC}"
npm ci --production=false
echo -e "${GREEN}✓ Dipendenze installate${NC}"

# Step 3: Build Next.js
echo -e "\n${YELLOW}🔨 Step 3: Build Next.js...${NC}"
npm run build
echo -e "${GREEN}✓ Build completata${NC}"

# Step 4: Crea cartella logs se non esiste
echo -e "\n${YELLOW}📁 Step 4: Preparazione logs...${NC}"
mkdir -p logs
echo -e "${GREEN}✓ Cartella logs pronta${NC}"

# Step 5: Gestione PM2
echo -e "\n${YELLOW}⚙️  Step 5: Gestione PM2...${NC}"

# Verifica se PM2 è disponibile
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}PM2 non trovato globalmente, uso npx pm2${NC}"
    PM2_CMD="npx pm2"
else
    PM2_CMD="pm2"
fi

# Stop e delete dell'istanza precedente (se esiste)
$PM2_CMD delete dmg-frontend 2>/dev/null || true

# Avvia nuova istanza
echo "Avvio nuova istanza..."
$PM2_CMD start ecosystem.config.js

# Salva configurazione PM2 (opzionale, non funziona senza sudo su Plesk)
$PM2_CMD save 2>/dev/null || echo -e "${YELLOW}⚠️  Impossibile salvare configurazione PM2 (no sudo)${NC}"

echo -e "\n${GREEN}✅ Deployment completato!${NC}"
echo -e "\n${YELLOW}📊 Comandi utili:${NC}"
echo "  $PM2_CMD status              # Stato del processo"
echo "  $PM2_CMD logs dmg-frontend   # Log in tempo reale"
echo "  $PM2_CMD restart dmg-frontend # Restart"
echo "  $PM2_CMD stop dmg-frontend    # Stop"
echo ""
echo -e "${GREEN}🌐 Il frontend dovrebbe essere accessibile su http://localhost:3000${NC}"
echo -e "${YELLOW}⚠️  Ricorda di configurare il reverse proxy Apache su Plesk!${NC}"

# Script di deployment per Windows (PowerShell)
# Uso: .\deploy.ps1

Write-Host "`n🚀 Deployment DMG Frontend - Next.js + PM2" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Step 1: Verifica file .env.production
Write-Host "`n📋 Step 1: Verifica configurazione..." -ForegroundColor Yellow
if (-not (Test-Path .env.production)) {
    Write-Host "❌ File .env.production non trovato!" -ForegroundColor Red
    Write-Host "Copia .env.example e configura le variabili:"
    Write-Host "  Copy-Item .env.example .env.production"
    exit 1
}
Write-Host "✓ File .env.production trovato" -ForegroundColor Green

# Step 2: Installa dipendenze
Write-Host "`n📦 Step 2: Installazione dipendenze..." -ForegroundColor Yellow
npm ci --production=false
Write-Host "✓ Dipendenze installate" -ForegroundColor Green

# Step 3: Build Next.js
Write-Host "`n🔨 Step 3: Build Next.js..." -ForegroundColor Yellow
npm run build
Write-Host "✓ Build completata" -ForegroundColor Green

# Step 4: Crea cartella logs
Write-Host "`n📁 Step 4: Preparazione logs..." -ForegroundColor Yellow
if (-not (Test-Path logs)) {
    New-Item -ItemType Directory -Path logs | Out-Null
}
Write-Host "✓ Cartella logs pronta" -ForegroundColor Green

# Step 5: Gestione PM2
Write-Host "`n⚙️  Step 5: Gestione PM2..." -ForegroundColor Yellow

# Stop e delete istanza precedente
npx pm2 delete dmg-frontend 2>$null

# Avvia nuova istanza
Write-Host "Avvio nuova istanza..."
npx pm2 start ecosystem.config.js

# Salva configurazione
try {
    npx pm2 save 2>$null
} catch {
    Write-Host "⚠️  Impossibile salvare configurazione PM2" -ForegroundColor Yellow
}

Write-Host "`n✅ Deployment completato!" -ForegroundColor Green
Write-Host "`n📊 Comandi utili:" -ForegroundColor Yellow
Write-Host "  npx pm2 status              # Stato del processo"
Write-Host "  npx pm2 logs dmg-frontend   # Log in tempo reale"
Write-Host "  npx pm2 restart dmg-frontend # Restart"
Write-Host "  npx pm2 stop dmg-frontend    # Stop"
Write-Host ""
Write-Host "🌐 Il frontend è in esecuzione su http://localhost:3000" -ForegroundColor Green

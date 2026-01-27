# 🔄 Guida Migrazione da Plesk a cPanel

## 📋 Panoramica

Questa guida spiega come migrare il progetto DMG da Plesk (setup temporaneo) a cPanel (setup definitivo).

**Vantaggi migrazione**:

- ✅ Configurazione più user-friendly
- ✅ Node.js app manager nativo di cPanel
- ✅ PM2 startup automatico possibile
- ✅ Domini definitivi
- ✅ Backup automatici più semplici

---

## 🎯 Preparazione Pre-Migrazione

### Checklist Files da Migrare

#### Backend Strapi

```
backend/
├── .env                    # IMPORTANTE: Backup sicuro!
├── config/
├── src/
├── database/migrations/
├── public/uploads/         # Tutte le immagini/PDF caricati
├── package.json
├── package-lock.json
├── server.js
└── ecosystem.config.js     # Configurazione PM2
```

#### Frontend Next.js

```
dmg/
├── .env.production         # IMPORTANTE: Backup sicuro!
├── app/
├── components/
├── lib/
├── public/
├── next.config.ts
├── package.json
├── package-lock.json
└── ecosystem.config.js
```

#### Database MySQL

- Esporta dump completo del database `dmg_strapi_`
- Include struttura + dati

---

## 📦 Step 1: Backup Completo

### 1.1 Database MySQL

```bash
# SSH su server Plesk
ssh altera.consulting_p2gljp5owhi@your-server

# Export database
mysqldump -u dmg_user -p dmg_strapi_ > ~/dmg_database_backup.sql

# Conferma dimensione file
ls -lh ~/dmg_database_backup.sql

# Download locale (da tua macchina)
scp altera.consulting_p2gljp5owhi@your-server:~/dmg_database_backup.sql ./
```

### 1.2 Files Backend

```bash
# Crea archivio backend
cd /var/www/vhosts/altera.consulting/dmg-backend.altera.consulting
tar -czf ~/dmg_backend_backup.tar.gz .

# Download locale
scp altera.consulting_p2gljp5owhi@your-server:~/dmg_backend_backup.tar.gz ./
```

### 1.3 Files Frontend

```bash
# Se hai i sorgenti su Git, fai semplicemente:
git push origin main

# Altrimenti backup manuale:
cd /var/www/vhosts/altera.consulting/dmg.altera.consulting
tar -czf ~/dmg_frontend_backup.tar.gz .

# Download locale
scp altera.consulting_p2gljp5owhi@your-server:~/dmg_frontend_backup.tar.gz ./
```

### 1.4 File .env (CRITICI)

⚠️ **ATTENZIONE**: Non committare mai i file .env su Git!

```bash
# Backend .env
scp altera.consulting_p2gljp5owhi@your-server:/var/www/vhosts/altera.consulting/dmg-backend.altera.consulting/.env ./backend.env.backup

# Frontend .env.production
scp altera.consulting_p2gljp5owhi@your-server:/var/www/vhosts/altera.consulting/dmg.altera.consulting/.env.production ./frontend.env.backup
```

---

## 🌐 Step 2: Setup Server cPanel

### 2.1 Requisiti Server

- **Node.js**: v18 o superiore (verifica disponibilità)
- **MySQL**: 5.7+ o MariaDB 10.3+
- **cPanel**: con "Setup Node.js App" feature
- **SSH Access**: Abilitato
- **PM2**: Installabile via npm

### 2.2 Domini

Decidi i nuovi domini definitivi:

```
Backend:   api.dmg.it (esempio)
Frontend:  www.dmg.it (esempio)
```

Configura DNS prima della migrazione:

- Record A puntano al nuovo server cPanel
- Tempo propagazione: 24-48 ore

---

## 🗄️ Step 3: Migrazione Database

### 3.1 Crea Database su cPanel

1. cPanel → **MySQL Databases**
2. Crea nuovo database: `dmg_production`
3. Crea utente: `dmg_prod_user`
4. Password sicura (salvala!)
5. Assegna tutti i privilegi all'utente

### 3.2 Importa Dump

**Via phpMyAdmin**:

1. cPanel → phpMyAdmin
2. Seleziona database `dmg_production`
3. Tab "Import"
4. Upload file `dmg_database_backup.sql`
5. Click "Go"

**Via SSH** (più veloce per DB grandi):

```bash
ssh user@new-cpanel-server
mysql -u dmg_prod_user -p dmg_production < dmg_database_backup.sql
```

### 3.3 Verifica Import

```bash
mysql -u dmg_prod_user -p dmg_production

# In MySQL:
SHOW TABLES;
SELECT COUNT(*) FROM prodottos;
SELECT COUNT(*) FROM upload_files;
EXIT;
```

---

## 🚀 Step 4: Deploy Backend Strapi su cPanel

### 4.1 Upload Files

**Opzione A - Git** (consigliato):

```bash
ssh user@new-cpanel-server
cd ~/domains/api.dmg.it/public_html
git clone <your-repo-url> .
```

**Opzione B - FTP/SCP**:
Carica l'archivio `dmg_backend_backup.tar.gz` ed estrailo.

### 4.2 Configura .env

```bash
cd ~/domains/api.dmg.it/public_html
nano .env
```

Aggiorna con i nuovi valori cPanel:

```env
# Server
HOST=0.0.0.0
PORT=1337
APP_KEYS=<usa i vecchi keys dal backup!>
API_TOKEN_SALT=<usa il vecchio salt!>
ADMIN_JWT_SECRET=<usa il vecchio secret!>
TRANSFER_TOKEN_SALT=<usa il vecchio salt!>
JWT_SECRET=<usa il vecchio secret!>

# Database - NUOVI VALORI cPanel
DATABASE_CLIENT=mysql
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=dmg_production
DATABASE_USERNAME=dmg_prod_user
DATABASE_PASSWORD=<password creata su cPanel>
DATABASE_SSL=false

# URLs - NUOVI DOMINI
URL=https://api.dmg.it
ADMIN_URL=https://api.dmg.it/admin

# Strapi
STRAPI_DISABLE_REMOTE_DATA_TRANSFER=false
```

⚠️ **IMPORTANTE**: Usa gli stessi **APP_KEYS**, **JWT_SECRET**, etc. del backup, altrimenti i dati non saranno accessibili!

### 4.3 Installa Dipendenze

```bash
# Usa la versione Node.js giusta
source ~/nodevenv/api.dmg.it/18/bin/activate  # Percorso cPanel

npm ci --production
```

### 4.4 Setup PM2

```bash
# Installa PM2 globalmente (se hai permessi)
npm install -g pm2

# O usa npx
npx pm2 start ecosystem.config.js
npx pm2 save
npx pm2 startup
# Segui le istruzioni per autostart
```

### 4.5 Reverse Proxy cPanel

1. cPanel → **Setup Node.js App**
2. Create Application:

   - Node.js version: 18.x
   - Application mode: Production
   - Application root: `domains/api.dmg.it/public_html`
   - Application URL: `api.dmg.it`
   - Application startup file: `server.js`
   - Passenger port: 1337

3. cPanel gestirà automaticamente il reverse proxy!

### 4.6 Verifica Backend

```bash
curl https://api.dmg.it/api/prodottos
```

Dovresti vedere il JSON dei prodotti.

---

## 🎨 Step 5: Deploy Frontend Next.js su cPanel

### 5.1 Upload Files

```bash
ssh user@new-cpanel-server
cd ~/domains/www.dmg.it/public_html
git clone <your-repo-url> .
```

### 5.2 Configura .env.production

```bash
nano .env.production
```

```env
# API Backend - NUOVO DOMINIO
NEXT_PUBLIC_STRAPI_URL=https://api.dmg.it
NEXT_PUBLIC_API_URL=https://api.dmg.it/api

# Revalidation
REVALIDATE_TIME=3600
```

### 5.3 Build & Deploy

```bash
source ~/nodevenv/www.dmg.it/18/bin/activate

npm ci --production=false
npm run build

# Avvia con PM2
npx pm2 start ecosystem.config.js
npx pm2 save
```

### 5.4 cPanel Node.js App

1. cPanel → **Setup Node.js App**
2. Create Application:
   - Application root: `domains/www.dmg.it/public_html`
   - Application URL: `www.dmg.it`
   - Application startup file: `node_modules/next/dist/bin/next`
   - Application arguments: `start -p 3000`

### 5.5 Verifica Frontend

Apri browser: `https://www.dmg.it`

---

## 🔄 Step 6: Aggiornamenti File Media

### 6.1 Copia Uploads da Plesk a cPanel

```bash
# Da server Plesk
cd /var/www/vhosts/altera.consulting/dmg-backend.altera.consulting
tar -czf uploads_backup.tar.gz public/uploads/

# Download locale
scp altera.consulting_p2gljp5owhi@plesk-server:~/uploads_backup.tar.gz ./

# Upload su cPanel
scp uploads_backup.tar.gz user@cpanel-server:~/

# Su cPanel: estrai
ssh user@cpanel-server
cd ~/domains/api.dmg.it/public_html/public
tar -xzf ~/uploads_backup.tar.gz
```

### 6.2 Verifica Permessi Files

```bash
chmod -R 755 public/uploads/
```

---

## ✅ Step 7: Verifica Completa

### Checklist Post-Migrazione

#### Backend

- [ ] Database importato correttamente
- [ ] Strapi si avvia senza errori
- [ ] Admin panel accessibile: `https://api.dmg.it/admin`
- [ ] API pubbliche funzionanti: `https://api.dmg.it/api/prodottos`
- [ ] Upload files/immagini accessibili
- [ ] PM2 attivo e configurato per autostart

#### Frontend

- [ ] Build completata senza errori
- [ ] Sito accessibile: `https://www.dmg.it`
- [ ] Prodotti caricati dalla nuova API
- [ ] Immagini visualizzate correttamente
- [ ] ISR funzionante (test modifica su Strapi)
- [ ] PM2 attivo

#### DNS

- [ ] DNS propagati completamente
- [ ] Certificati SSL attivi (HTTPS)
- [ ] Redirect www → non-www (o viceversa)

---

## 🗑️ Step 8: Cleanup (Dopo Verifica)

⚠️ **NON ELIMINARE nulla finché non sei SICURO che tutto funzioni!**

### Su Server Plesk (dopo 1-2 settimane di verifica)

```bash
# Stop PM2
npx pm2 stop all
npx pm2 delete all

# Backup finale di sicurezza
cd /var/www/vhosts/altera.consulting
tar -czf final_backup_$(date +%Y%m%d).tar.gz dmg*.altera.consulting

# Sposta in archivio (NON eliminare!)
mkdir ~/archive
mv final_backup_*.tar.gz ~/archive/
```

### Domini Temporanei Plesk

1. Disabilita i siti su Plesk (NON eliminare)
2. Tieni i backup per almeno 3 mesi
3. Eventualmente elimina dopo 6 mesi

---

## 📊 Differenze Plesk vs cPanel

| Feature         | Plesk (Temporaneo)        | cPanel (Definitivo)    |
| --------------- | ------------------------- | ---------------------- |
| Node.js Manager | Passenger (problematico)  | Node.js App (nativo)   |
| PM2 Startup     | Manuale (no sudo)         | Automatico             |
| Reverse Proxy   | Manuale Apache directives | Automatico             |
| Database        | phpMyAdmin                | phpMyAdmin             |
| Backup          | Manuale                   | Automatico (JetBackup) |
| SSL             | Let's Encrypt             | Let's Encrypt          |
| File Manager    | Web + FTP                 | Web + FTP              |
| Cron Jobs       | Sì                        | Sì                     |

---

## 🐛 Troubleshooting Migrazione

### ❌ Strapi non si connette al DB

**Verifica**:

1. Credenziali database in `.env` corrette
2. Database esiste e ha dati
3. Utente ha privilegi corretti

```bash
mysql -u dmg_prod_user -p dmg_production
SHOW TABLES;
```

### ❌ Next.js non carica prodotti

**Verifica**:

1. `NEXT_PUBLIC_STRAPI_URL` in `.env.production` è corretto
2. API Strapi accessibili pubblicamente
3. Permessi Public configurati su Strapi

```bash
curl https://api.dmg.it/api/prodottos
```

### ❌ Immagini 404

**Verifica**:

1. Files in `public/uploads/` esistono
2. Permessi files: `chmod -R 755 public/uploads/`
3. `remotePatterns` in `next.config.ts` include nuovo dominio

---

## 📞 Supporto

### Risorse

- Documentazione cPanel: https://docs.cpanel.net/
- Strapi Docs: https://docs.strapi.io/
- Next.js Docs: https://nextjs.org/docs

### Comandi Utili cPanel

```bash
# Gestione Node.js app
cPanel → Setup Node.js App

# Restart app
Restart button nell'interfaccia

# Logs
~/domains/your-domain.it/logs/
```

---

## ✅ Checklist Finale Migrazione

- [ ] Backup completo effettuato (DB + Files + .env)
- [ ] Database importato su cPanel
- [ ] Backend Strapi deployato e funzionante
- [ ] Frontend Next.js deployato e funzionante
- [ ] DNS aggiornati e propagati
- [ ] SSL attivi su entrambi domini
- [ ] PM2 configurato con autostart
- [ ] Uploads/media migrati
- [ ] Test completo di tutte le funzionalità
- [ ] Monitoraggio attivo per 2 settimane
- [ ] Backup vecchio server conservato

---

**Tempo stimato migrazione**: 4-6 ore  
**Downtime previsto**: 30-60 minuti (se preparato bene)

**Best practice**: Effettua la migrazione in orario a basso traffico (es: notturno).

---

**Versione**: 1.0.0  
**Ultima modifica**: 14 Gennaio 2026

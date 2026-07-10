# PolarDrive 🚗❄️

Repository sito vetrina per il progetto **PolarDrivePublic**.

---

## ⚙️ Comandi

### 🔷 FRONTEND POLARDRIVE PUBLIC

_(Tasto destro nel vuoto sotto `POLAR-DRIVE-PUBLIC` → Open in integrated Terminal)_

#### **🚀 SVILUPPO (Development)**

- `npm i` → Installa/reinstalla tutti i pacchetti
- `npm run dev` → Avvio in modalità sviluppo (hot reload, debug attivo)
- `npm list` → Visualizza tutti i pacchetti installati

#### **📦 PRODUZIONE (Production)**

- `npm run build` → Compila l'applicazione per produzione (ottimizzato, minificato)
- `npm run start` → Avvio in produzione (dopo build)

#### **🔧 UTILITY**

- `npm run lint` → Verifica qualità del codice
- `npm run type-check` → Verifica errori TypeScript
- `npm audit` → Controlla vulnerabilità di sicurezza

#### **🔧 .NET MAUI TESTING ENVIRONMENT**

- `& "$env:LOCALAPPDATA\Android\Sdk\emulator\emulator.exe" -list-avds` → Elenca gli AVD (emulatori) disponibili
- `& "$env:LOCALAPPDATA\Android\Sdk\emulator\emulator.exe" -avd Pixel5_API35` → Avvia emulatore specifico android
- `adb devices` → Verifica che l'emulatore sia connesso e visibile
- `dotnet build -t:Run -f net10.0-android` _(da eseguire dentro `PolarDrive.Maui/`)_ → Builda e avvia l'app sull'emulatore

#### **🎭 PLAYWRIGHT E2E TESTING**

_(Suite separata in `tests/playwright/`, Page Object Model, testa il sito Next.js su `localhost:3000`)_

- `cd tests/playwright && npm i` → Installa le dipendenze della suite Playwright
- `npx playwright install` → Installa i browser (Chromium, Firefox, WebKit)
- `npx playwright test` → Esegue tutta la suite E2E (avvia in automatico `npm run dev` se non già attivo)
- `npx playwright test --project=chromium` → Esegue i test solo su Chromium
- `npx playwright test --headed` → Esegue i test con il browser visibile
- `npx playwright test --ui` → Apre la UI mode interattiva per debug
- `npx playwright show-report` → Apre il report HTML dell'ultima esecuzione

#### **🧪 SELENIUM WEBDRIVER E2E TESTING (C#)**

_(Suite separata in `tests/selenium/`, Page Object Model, NUnit, testa lo stesso sito Next.js su `localhost:3000` — richiede il dev server già avviato con `npm run dev`)_

- `cd tests/selenium && dotnet restore` → Ripristina i pacchetti NuGet (Selenium.WebDriver, Selenium.Support, NUnit)
- `dotnet build` → Compila il progetto di test
- `dotnet test` → Esegue tutta la suite E2E su Chrome (Selenium Manager scarica/gestisce il chromedriver in automatico)
- `HEADLESS=true dotnet test` → Esegue i test in modalità headless (senza finestra Chrome visibile)
- `dotnet test --filter "FullyQualifiedName~ContactFormTests"` → Esegue solo i test del form contatti

---

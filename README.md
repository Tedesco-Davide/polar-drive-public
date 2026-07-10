# PolarDrive 🚗❄️

Repository sito vetrina per il progetto **PolarDrivePublic**.

---

## ⚙️ Comandi

### 🔷 FRONTEND POLARDRIVE PUBLIC

_(Tasto destro nel vuoto sotto `POLAR-DRIVE-PUBLIC` → Open in integrated Terminal)_

#### **🚀 SVILUPPO (Development) E PRODUZIONE (Production)**

- `npm i` → Installa/reinstalla tutti i pacchetti
- `npm run dev` → Avvio in modalità sviluppo (hot reload, debug attivo)
- `npm list` → Visualizza tutti i pacchetti installati
oppure
- `npm run build` → Compila l'applicazione per produzione (ottimizzato, minificato)
- `npm run start` → Avvio in produzione (dopo build)

#### **🔧 UTILITY**

- `npm run lint` → Verifica qualità del codice
- `npm run type-check` → Verifica errori TypeScript
- `npm audit` → Controlla vulnerabilità di sicurezza

#### **📦 .NET MAUI TESTING ENVIRONMENT**

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

#### **⚛️ CYPRESS COMPONENT TESTING**

_(Config in `cypress.config.ts` + `cypress/`, nel progetto root — a differenza delle suite E2E, il component testing monta i singoli componenti React in isolamento tramite il bundler di Next.js, senza bisogno del dev server né di una pagina reale)_

- `npm i` → Installa Cypress (già incluso tra le devDependencies del progetto)
- `npm run cypress:open` → Apre la Cypress UI in modalità component testing (interattiva, con browser visibile)
- `npm run cypress:run` → Esegue tutti i test di componente in headless (Electron)
- `npx cypress run --component --spec "cypress/component/Hero.cy.tsx"` → Esegue solo i test di un componente specifico

#### **📲 APPIUM E2E TESTING (C#, Android emulator)**

_(Suite separata in `tests/appium/`, Page Object Model, NUnit, testa `PolarDrive.Maui` sull'emulatore Android tramite `AutomationId` — richiede emulatore avviato e server Appium attivo)_

- `npm install -g appium && appium driver install uiautomator2` → Installa il server Appium e il driver Android (una tantum)
- `& "$env:LOCALAPPDATA\Android\Sdk\emulator\emulator.exe" -avd Pixel5_API35` → Avvia l'emulatore
- `appium` → Avvia il server Appium su `http://127.0.0.1:4723` (in un terminale dedicato)
- `dotnet build -f net10.0-android -c Debug` _(da eseguire dentro `PolarDrive.Maui/`)_ → Builda l'apk debug richiesto dai test
- `cd tests/appium && dotnet restore && dotnet test` → Esegue tutta la suite (Login, Navigazione lista→dettaglio, Form dettaglio)
- `dotnet test --filter "FullyQualifiedName~LoginTests"` → Esegue solo i test di login

**Configurazione Appium Inspector** _(GUI — server Appium e emulatore già avviati come sopra)_

- **Appium Server → Remote Host**: `127.0.0.1`
- **Appium Server → Remote Port**: `4723`
- **Appium Server → Remote Path**: `/`
- **Capability Builder** (colonna Name → colonna Value):
  - `platformName` → `Android`
  - `appium:automationName` → `UiAutomator2`
  - `appium:deviceName` → `Pixel5_API35`
  - `appium:app` → `C:\Users\david\source\repos\Tedesco-Davide\polar-drive-public\PolarDrive.Maui\bin\Debug\net10.0-android\com.companyname.polardrive.maui-Signed.apk`
- Click **Start Session** (in basso a destra) → si apre lo screenshot live dell'app sull'emulatore
- Click su un elemento nello screenshot → nel pannello destro compaiono i suoi attributi; il campo **resource-id** è il locator da usare (`com.companyname.polardrive.maui:id/<AutomationId>`, perché su Android l'AutomationId MAUI è mappato sul resource-id, non sul content-desc)
- Click **Quit Session** (in alto) quando hai finito di ispezionare, per liberare l'app prima di lanciare `dotnet test`

---

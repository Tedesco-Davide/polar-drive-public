# Pipeline Azure DevOps — note tecniche

Questa cartella contiene gli script di supporto usati da `azure-pipelines.yml`
(alla root del repo). Qui sotto le note "da colloquio": quale agent/immagine
serve per ogni stage, e perché lo stage Appium non può girare su un agent
Microsoft-hosted.

## Agent pool per stage

| Stage / job | Pool | Perché |
|---|---|---|
| `Build` → `BuildWebApp` | `ubuntu-latest` (hosted) | Solo Node.js, nessun requisito speciale |
| `Build` → `BuildAndroidApk` | `windows-latest` (hosted) | Buildare l'APK Android MAUI richiede solo l'SDK/workload `android` (via `dotnet workload install`), **non** un emulatore in esecuzione — nessuna virtualizzazione hardware necessaria per compilare |
| `Test` → `Playwright` / `Selenium` / `Cypress` | `ubuntu-latest` (hosted) | Browser desktop (Chrome/Chromium/Firefox/WebKit), nessun requisito hardware speciale |
| `AppiumTests` → `AppiumAndroid` | **self-hosted**, pool `Default`, demand `ANDROID_EMULATOR -equals true` | Vedi sotto |

## Perché l'emulatore Android non gira su un agent hosted

Far girare un emulatore Android (AVD) richiede virtualizzazione hardware
(Intel HAXM / AMD Hypervisor / KVM su Linux, Hyper-V su Windows). Sui pool
Microsoft-hosted di Azure DevOps:

- **Linux (`ubuntu-latest`)**: le VM hosted non espongono `/dev/kvm` (nessuna
  virtualizzazione annidata abilitata) — l'emulatore Android in queste
  condizioni non parte proprio, o al massimo gira in software puro
  (nessuna accelerazione), troppo lento perché un boot completi nei timeout
  tipici di una pipeline.
- **Windows (`windows-latest`)**: stesso problema, la virtualizzazione
  annidata non è abilitata sulle VM hosted condivise.
- **macOS hosted**: storicamente usato per bypassare il problema (era
  l'unica piattaforma con accelerazione disponibile in alcuni contesti CI),
  ma Microsoft **non garantisce** virtualizzazione annidata sulle sue VM
  macOS hosted; il comportamento è inaffidabile e non è un pattern
  supportato ufficialmente per l'emulatore Android.

**In pratica, per farlo girare davvero, servono due strade** (qui si è
scelta la prima, perché è quella riproducibile su questo stesso ambiente
usato per sviluppare la suite):

1. **Agent self-hosted** — una macchina propria (fisica o VM con
   virtualizzazione annidata abilitata) registrata come agent Azure DevOps,
   con Android SDK + emulatore + Appium già installati (esattamente
   l'ambiente usato in locale per questo progetto). È l'opzione scelta in
   `azure-pipelines.yml`.
2. **Device farm cloud** (alternativa "enterprise", non implementata qui) —
   servizi come BrowserStack App Automate, Sauce Labs o Firebase Test Lab
   espongono un endpoint Appium-compatibile su device/emulatori reali
   gestiti da loro: si punta `DriverFactory` a quell'URL invece che a
   `localhost:4723` e non serve nessun emulatore locale né virtualizzazione
   sull'agent. È la soluzione che sceglierebbe un team che non vuole
   gestire infrastruttura di emulatori proprio per questo motivo.

## Registrare il proprio PC come agent self-hosted (opzione 1)

1. In Azure DevOps: **Organization Settings → Agent pools → Default → New
   agent**, scarica il pacchetto per Windows.
2. Estrailo in una cartella (es. `C:\azagent`), poi da PowerShell:
   ```powershell
   cd C:\azagent
   .\config.cmd
   # segui il wizard: URL organizzazione, PAT token, pool "Default",
   # nome agent a piacere
   ```
3. Aggiungi la capability personalizzata richiesta dalla demand della
   pipeline: **Agent pools → Default → (il tuo agent) → Capabilities →
   User capabilities → Add** → `ANDROID_EMULATOR` = `true`.
4. Installa l'agent come servizio (`.\config.cmd` lo chiede a fine wizard) o
   avvialo manualmente con `.\run.cmd` quando vuoi far girare lo stage
   Appium.
5. Verifica che sulla stessa macchina siano già presenti (come lo sono in
   questo ambiente di sviluppo): Android SDK con l'AVD `Pixel5_API35`,
   Appium server (`npm install -g appium` + `appium driver install
   uiautomator2`), .NET SDK.

Senza un agent con quella capability disponibile, lo stage `AppiumTests`
resta in coda (non fallisce silenziosamente: Azure DevOps lo segnala come
"in attesa di un agent" finché non ne registri uno compatibile).

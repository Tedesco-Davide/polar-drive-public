# Usato dallo stage AppiumTests, che gira SOLO su agent self-hosted (vedi
# pipelines/README.md sul perché: nessun agent hosted Azure DevOps espone
# virtualizzazione hardware per l'emulatore Android).
#
# Avvia l'emulatore Android indicato e il server Appium, attende che
# entrambi siano pronti, poi ritorna. I PID vengono salvati in
# Agent.TempDirectory cosi' stop-appium-android.ps1 puo' fermarli a fine job.
param(
    [string]$AvdName = "Pixel5_API35",
    [int]$AppiumPort = 4723,
    [int]$BootTimeoutSeconds = 180
)

$ErrorActionPreference = "Stop"

$emulatorExe = "$env:LOCALAPPDATA\Android\Sdk\emulator\emulator.exe"
$adbExe = "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe"
$tempDir = $env:AGENT_TEMPDIRECTORY
if (-not $tempDir) { $tempDir = $env:TEMP }

if (-not (Test-Path $emulatorExe)) {
    throw "Emulator non trovato in $emulatorExe. Verifica che l'Android SDK sia installato sull'agent self-hosted."
}

Write-Host "Avvio emulatore Android '$AvdName'..."
$emulatorProcess = Start-Process -FilePath $emulatorExe `
    -ArgumentList "-avd", $AvdName, "-no-snapshot", "-no-boot-anim" `
    -PassThru -WindowStyle Hidden
$emulatorProcess.Id | Out-File "$tempDir\emulator.pid"

Write-Host "Attendo che il device sia visibile ad adb..."
& $adbExe wait-for-device

Write-Host "Attendo che il boot Android sia completato (timeout ${BootTimeoutSeconds}s)..."
$elapsed = 0
$bootCompleted = ""
while ($bootCompleted -ne "1") {
    if ($elapsed -ge $BootTimeoutSeconds) {
        throw "Timeout: l'emulatore non ha completato il boot entro ${BootTimeoutSeconds}s."
    }
    Start-Sleep -Seconds 3
    $elapsed += 3
    $bootCompleted = (& $adbExe shell getprop sys.boot_completed 2>$null).Trim()
}
Write-Host "Emulatore pronto (boot completato dopo ${elapsed}s)."

Write-Host "Avvio server Appium sulla porta $AppiumPort..."
$appiumProcess = Start-Process -FilePath "appium" `
    -ArgumentList "--port", $AppiumPort `
    -PassThru -WindowStyle Hidden `
    -RedirectStandardOutput "$tempDir\appium.log" `
    -RedirectStandardError "$tempDir\appium.err.log"
$appiumProcess.Id | Out-File "$tempDir\appium.pid"

Start-Sleep -Seconds 5
if ($appiumProcess.HasExited) {
    Get-Content "$tempDir\appium.err.log" -ErrorAction SilentlyContinue | Write-Host
    throw "Il server Appium si e' chiuso subito dopo l'avvio: controlla appium.err.log sopra."
}

Write-Host "Setup completato: emulatore '$AvdName' + Appium su porta $AppiumPort avviati."

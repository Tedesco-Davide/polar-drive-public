# Controparte di start-appium-android.ps1: ferma server Appium ed emulatore
# a fine job (va lanciato con condition: always(), anche se i test falliscono,
# altrimenti l'emulatore resta acceso sull'agent self-hosted da un job all'altro).
$ErrorActionPreference = "Continue"

$tempDir = $env:AGENT_TEMPDIRECTORY
if (-not $tempDir) { $tempDir = $env:TEMP }

$appiumPidFile = "$tempDir\appium.pid"
if (Test-Path $appiumPidFile) {
    $appiumProcessId = Get-Content $appiumPidFile
    Write-Host "Fermo il server Appium (PID $appiumProcessId)..."
    Stop-Process -Id $appiumProcessId -Force -ErrorAction SilentlyContinue
    Remove-Item $appiumPidFile -ErrorAction SilentlyContinue
}

$adbExe = "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe"
if (Test-Path $adbExe) {
    Write-Host "Fermo l'emulatore via 'adb emu kill'..."
    & $adbExe emu kill
    Start-Sleep -Seconds 3
}

$emulatorPidFile = "$tempDir\emulator.pid"
if (Test-Path $emulatorPidFile) {
    $emulatorProcessId = Get-Content $emulatorPidFile
    Stop-Process -Id $emulatorProcessId -Force -ErrorAction SilentlyContinue
    Remove-Item $emulatorPidFile -ErrorAction SilentlyContinue
}

Write-Host "Cleanup completato."

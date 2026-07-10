namespace PolarDrive.Appium.Tests.Support;

public static class ApkLocator
{
    private const string RelativeApkPath = "PolarDrive.Maui/bin/Debug/net10.0-android/com.companyname.polardrive.maui-Signed.apk";

    // Permette di puntare a un altro apk (es. Release, o un CI che builda altrove)
    // senza dover ricompilare/modificare il codice dei test.
    public static string FindDebugApkPath()
    {
        var overridePath = Environment.GetEnvironmentVariable("POLARDRIVE_APK_PATH");
        if (!string.IsNullOrWhiteSpace(overridePath))
        {
            if (!File.Exists(overridePath))
            {
                throw new FileNotFoundException(
                    $"POLARDRIVE_APK_PATH punta a un file inesistente: {overridePath}");
            }
            return overridePath;
        }

        var repoRoot = FindRepoRoot(AppContext.BaseDirectory);
        if (repoRoot is null)
        {
            throw new DirectoryNotFoundException(
                "Non trovo la cartella 'PolarDrive.Maui' risalendo da " + AppContext.BaseDirectory +
                ". Imposta la variabile d'ambiente POLARDRIVE_APK_PATH con il percorso completo dell'apk.");
        }

        var apkPath = Path.Combine(repoRoot, RelativeApkPath.Replace('/', Path.DirectorySeparatorChar));

        if (!File.Exists(apkPath))
        {
            throw new FileNotFoundException(
                $"Apk non trovato in {apkPath}. Buildalo prima con: dotnet build -f net10.0-android -c Debug " +
                "(da eseguire dentro PolarDrive.Maui/), oppure imposta POLARDRIVE_APK_PATH.");
        }

        return apkPath;
    }

    private static string? FindRepoRoot(string startDirectory)
    {
        var dir = new DirectoryInfo(startDirectory);
        while (dir is not null)
        {
            if (Directory.Exists(Path.Combine(dir.FullName, "PolarDrive.Maui")))
            {
                return dir.FullName;
            }
            dir = dir.Parent;
        }
        return null;
    }
}

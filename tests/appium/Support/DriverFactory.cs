using OpenQA.Selenium.Appium;
using OpenQA.Selenium.Appium.Android;

namespace PolarDrive.Appium.Tests.Support;

public static class DriverFactory
{
    private static readonly Uri AppiumServerUrl = new(
        Environment.GetEnvironmentVariable("APPIUM_SERVER_URL") ?? "http://127.0.0.1:4723");

    private const string TargetDeviceName = "Pixel5_API35";

    public static AndroidDriver CreateAndroidDriver()
    {
        var apkPath = ApkLocator.FindDebugApkPath();

        var options = new AppiumOptions
        {
            PlatformName = "Android",
            AutomationName = "UiAutomator2",
            App = apkPath,
            DeviceName = TargetDeviceName,
        };

        // Non specifichiamo appPackage/appActivity: UiAutomator2 li ricava da solo
        // leggendo il manifest dell'apk passato in "app".
        options.AddAdditionalAppiumOption("appium:autoGrantPermissions", true);
        options.AddAdditionalAppiumOption("appium:newCommandTimeout", 300);
        options.AddAdditionalAppiumOption("appium:noReset", false);
        // Forza reinstall dall'apk indicato, invece di riusare una installazione
        // già presente sul device (rilevante quando l'apk viene ricompilato spesso).
        options.AddAdditionalAppiumOption("appium:enforceAppInstall", true);
        // Senza questo, UiAutomator2 può restare in attesa indefinita che
        // l'app "torni idle" dopo un tap, interferendo con il dispatcher
        // .NET/MAUI e bloccando di fatto le continuation async dell'app
        // (osservato: un Task.Delay dopo il tap sul bottone Login non
        // riprendeva mai).
        options.AddAdditionalAppiumOption("appium:waitForIdleTimeout", 0);

        return new AndroidDriver(AppiumServerUrl, options, TimeSpan.FromMinutes(3));
    }
}

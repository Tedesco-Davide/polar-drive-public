using OpenQA.Selenium;

namespace PolarDrive.Appium.Tests.Support;

// Su Android, l'AutomationId di .NET MAUI viene mappato sul resource-id
// nativo della view (non sul content-desc, come in altri toolkit XF/Compose):
// verificato via `adb shell uiautomator dump` sull'apk buildato. Il locator
// Selenium/Appium corretto è quindi By.Id con il resource-id completo
// "<package>:id/<AutomationId>", non AccessibilityId.
public static class AutomationId
{
    private const string AppPackage = "com.companyname.polardrive.maui";

    public static By Locator(string automationId) => By.Id($"{AppPackage}:id/{automationId}");
}

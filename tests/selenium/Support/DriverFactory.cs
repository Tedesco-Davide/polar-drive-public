using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace PolarDrive.Selenium.Tests.Support;

public static class DriverFactory
{
    public static IWebDriver CreateChromeDriver()
    {
        var options = new ChromeOptions();
        options.AddArgument("--start-maximized");

        var headless = Environment.GetEnvironmentVariable("HEADLESS");
        if (string.Equals(headless, "true", StringComparison.OrdinalIgnoreCase))
        {
            options.AddArgument("--headless=new");
            options.AddArgument("--window-size=1920,1080");
        }

        // Selenium Manager (incluso in Selenium.WebDriver 4.6+) scarica/gestisce
        // automaticamente il chromedriver compatibile con il Chrome installato.
        return new ChromeDriver(options);
    }
}

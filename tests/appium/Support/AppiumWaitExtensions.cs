using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;

namespace PolarDrive.Appium.Tests.Support;

// Come nella suite Selenium: niente ExpectedConditions nel client .NET, quindi
// condizioni custom su WebDriverWait. Su Android, subito dopo l'installazione
// e il primo avvio a freddo dell'app, UiAutomator2 può impiegare qualche
// secondo prima che l'accessibility tree sia interrogabile (il servizio di
// accessibilità non ha ancora un nodo radice pronto): finché questo accade
// Appium risponde con un generico WebDriverException, non un NoSuchElement,
// quindi lo ignoriamo esplicitamente e ritentiamo invece di far fallire subito.
public static class AppiumWaitExtensions
{
    public static IWebElement WaitForVisible(this WebDriverWait wait, By locator)
    {
        return wait.Until(driver =>
        {
            try
            {
                var element = driver.FindElement(locator);
                return element.Displayed ? element : null;
            }
            catch (WebDriverException)
            {
                return null;
            }
        });
    }

    public static IWebElement WaitForClickable(this WebDriverWait wait, By locator)
    {
        return wait.Until(driver =>
        {
            try
            {
                var element = driver.FindElement(locator);
                return element.Displayed && element.Enabled ? element : null;
            }
            catch (WebDriverException)
            {
                return null;
            }
        });
    }

    public static bool WaitForTextNotEmpty(this WebDriverWait wait, By locator)
    {
        return wait.Until(driver =>
        {
            try
            {
                var element = driver.FindElement(locator);
                return !string.IsNullOrWhiteSpace(element.Text);
            }
            catch (WebDriverException)
            {
                return false;
            }
        });
    }
}

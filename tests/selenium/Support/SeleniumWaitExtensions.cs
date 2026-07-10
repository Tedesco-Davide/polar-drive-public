using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;

namespace PolarDrive.Selenium.Tests.Support;

// Selenium 4 ha rimosso la classe ExpectedConditions dal core (era in
// Selenium.Support fino alla v3): l'approccio idiomatico oggi è scrivere
// condizioni custom passate a WebDriverWait.Until(). WebDriverWait ignora
// di default NotFoundException, quindi FindElement può essere richiamato
// in loop finché l'elemento non compare nel DOM.
public static class SeleniumWaitExtensions
{
    public static IWebElement WaitForClickable(this WebDriverWait wait, By locator)
    {
        return wait.Until(driver =>
        {
            var element = driver.FindElement(locator);
            return element.Displayed && element.Enabled ? element : null;
        });
    }

    public static IWebElement WaitForVisible(this WebDriverWait wait, By locator)
    {
        return wait.Until(driver =>
        {
            var element = driver.FindElement(locator);
            return element.Displayed ? element : null;
        });
    }

    public static IAlert WaitForAlert(this WebDriverWait wait)
    {
        return wait.Until(driver =>
        {
            try
            {
                return driver.SwitchTo().Alert();
            }
            catch (NoAlertPresentException)
            {
                return null;
            }
        });
    }
}

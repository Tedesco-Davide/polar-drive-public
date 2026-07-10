using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using PolarDrive.Selenium.Tests.Support;

namespace PolarDrive.Selenium.Tests.Pages;

public class NavigationComponent
{
    private readonly WebDriverWait _wait;

    public NavigationComponent(IWebDriver driver)
    {
        _wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
    }

    private IWebElement PolarDriveLink =>
        _wait.WaitForClickable(By.CssSelector("[data-testid='nav-polardrive']"));

    public void GoToPolarDrive() => PolarDriveLink.Click();
}

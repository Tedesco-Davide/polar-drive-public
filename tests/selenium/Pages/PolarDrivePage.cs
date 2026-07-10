using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using PolarDrive.Selenium.Tests.Support;

namespace PolarDrive.Selenium.Tests.Pages;

public class PolarDrivePage
{
    private readonly IWebDriver _driver;
    private readonly WebDriverWait _wait;

    public NavigationComponent Nav { get; }

    public PolarDrivePage(IWebDriver driver)
    {
        _driver = driver;
        _wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
        Nav = new NavigationComponent(driver);
    }

    public void Goto(string baseUrl) => _driver.Navigate().GoToUrl($"{baseUrl}/polardrive");

    public IWebElement CtaButton =>
        _wait.WaitForVisible(By.CssSelector("[data-testid='polardrive-cta-button']"));
}

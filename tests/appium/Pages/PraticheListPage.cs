using OpenQA.Selenium.Appium.Android;
using OpenQA.Selenium.Support.UI;
using PolarDrive.Appium.Tests.Support;

namespace PolarDrive.Appium.Tests.Pages;

public class PraticheListPage
{
    private readonly AndroidDriver _driver;
    private readonly WebDriverWait _wait;

    public PraticheListPage(AndroidDriver driver)
    {
        _driver = driver;
        _wait = new WebDriverWait(driver, TimeSpan.FromSeconds(30));
    }

    public void WaitForLoaded()
    {
        _wait.WaitForVisible(AutomationId.Locator("PraticheCollectionView"));
    }

    public void SelezionaPratica(string praticaId)
    {
        var item = _wait.WaitForClickable(AutomationId.Locator($"PraticaItem_{praticaId}"));
        item.Click();
    }
}

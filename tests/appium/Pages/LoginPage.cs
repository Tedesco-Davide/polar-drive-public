using OpenQA.Selenium;
using OpenQA.Selenium.Appium.Android;
using OpenQA.Selenium.Support.UI;
using PolarDrive.Appium.Tests.Support;

namespace PolarDrive.Appium.Tests.Pages;

public class LoginPage
{
    private readonly AndroidDriver _driver;
    private readonly WebDriverWait _wait;

    public LoginPage(AndroidDriver driver)
    {
        _driver = driver;
        _wait = new WebDriverWait(driver, TimeSpan.FromSeconds(30));
    }

    private IWebElement EmailEntry =>
        _wait.WaitForVisible(AutomationId.Locator("LoginEmailEntry"));

    private IWebElement PasswordEntry =>
        _driver.FindElement(AutomationId.Locator("LoginPasswordEntry"));

    private IWebElement LoginButton =>
        _wait.WaitForClickable(AutomationId.Locator("LoginButton"));

    public void Login(string email, string password)
    {
        EmailEntry.Clear();
        EmailEntry.SendKeys(email);

        PasswordEntry.Clear();
        PasswordEntry.SendKeys(password);

        // Chiude la tastiera prima del tap sul bottone, altrimenti su alcuni
        // emulatori la tastiera copre il bottone e il tap rischia di fallire.
        _driver.HideKeyboard();

        LoginButton.Click();
    }

    public string WaitForErrorMessage()
    {
        _wait.WaitForTextNotEmpty(AutomationId.Locator("LoginErrorLabel"));
        return _driver.FindElement(AutomationId.Locator("LoginErrorLabel")).Text;
    }
}

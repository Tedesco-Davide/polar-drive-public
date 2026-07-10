using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using PolarDrive.Selenium.Tests.Support;

namespace PolarDrive.Selenium.Tests.Pages;

public class HomePage
{
    private readonly IWebDriver _driver;
    private readonly WebDriverWait _wait;

    public NavigationComponent Nav { get; }

    public HomePage(IWebDriver driver)
    {
        _driver = driver;
        _wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
        Nav = new NavigationComponent(driver);
    }

    public void Goto(string baseUrl) => _driver.Navigate().GoToUrl(baseUrl);

    private IWebElement HeroCtaButton =>
        _wait.WaitForClickable(By.CssSelector("[data-testid='hero-cta-button']"));

    public void ClickHeroCta() => HeroCtaButton.Click();

    private IWebElement ContactForm =>
        _wait.WaitForVisible(By.CssSelector("[data-testid='contact-form']"));

    private IWebElement NameInput =>
        _driver.FindElement(By.CssSelector("[data-testid='contact-name-input']"));

    private IWebElement EmailInput =>
        _driver.FindElement(By.CssSelector("[data-testid='contact-email-input']"));

    private IWebElement CompanyInput =>
        _driver.FindElement(By.CssSelector("[data-testid='contact-company-input']"));

    private IWebElement MessageTextarea =>
        _driver.FindElement(By.CssSelector("[data-testid='contact-message-textarea']"));

    private IWebElement SubmitButton =>
        _driver.FindElement(By.CssSelector("[data-testid='contact-submit-button']"));

    public string NameInputValue => NameInput.GetAttribute("value") ?? string.Empty;

    public string MessageInputValue => MessageTextarea.GetAttribute("value") ?? string.Empty;

    public void ScrollToContactForm()
    {
        var element = ContactForm;
        ((IJavaScriptExecutor)_driver).ExecuteScript(
            "arguments[0].scrollIntoView({ block: 'center' });", element);
    }

    // Selenium non ha un'API nativa di network interception paragonabile a
    // Playwright's page.route(): qui stubbiamo window.fetch via JS injection
    // per evitare di colpire il vero endpoint Google Apps Script durante il test.
    public void StubFetchForContactForm()
    {
        const string script = """
            window.fetch = function () {
                return Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({}) });
            };
            """;
        ((IJavaScriptExecutor)_driver).ExecuteScript(script);
    }

    public void FillContactForm(string name, string email, string message, string? company = null)
    {
        NameInput.Clear();
        NameInput.SendKeys(name);

        EmailInput.Clear();
        EmailInput.SendKeys(email);

        if (!string.IsNullOrEmpty(company))
        {
            CompanyInput.Clear();
            CompanyInput.SendKeys(company);
        }

        MessageTextarea.Clear();
        MessageTextarea.SendKeys(message);
    }

    public void SubmitContactForm() => SubmitButton.Click();
}

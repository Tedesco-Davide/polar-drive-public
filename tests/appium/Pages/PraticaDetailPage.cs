using OpenQA.Selenium;
using OpenQA.Selenium.Appium.Android;
using OpenQA.Selenium.Support.UI;
using PolarDrive.Appium.Tests.Support;

namespace PolarDrive.Appium.Tests.Pages;

public class PraticaDetailPage
{
    private readonly AndroidDriver _driver;
    private readonly WebDriverWait _wait;

    public PraticaDetailPage(AndroidDriver driver)
    {
        _driver = driver;
        _wait = new WebDriverWait(driver, TimeSpan.FromSeconds(30));
    }

    public IWebElement NumeroPraticaEntry =>
        _wait.WaitForVisible(AutomationId.Locator("DetailNumeroPraticaEntry"));

    private IWebElement ClienteEntry =>
        _driver.FindElement(AutomationId.Locator("DetailClienteEntry"));

    private IWebElement DescrizioneEditor =>
        _driver.FindElement(AutomationId.Locator("DetailDescrizioneEditor"));

    private IWebElement StatoPicker =>
        _driver.FindElement(AutomationId.Locator("DetailStatoPicker"));

    private IWebElement CaricaDocumentoButton =>
        _wait.WaitForClickable(AutomationId.Locator("DetailCaricaDocumentoButton"));

    public void WaitForLoaded() => _ = NumeroPraticaEntry;

    public void ImpostaCliente(string cliente)
    {
        ClienteEntry.Clear();
        ClienteEntry.SendKeys(cliente);
        _driver.HideKeyboard();
    }

    public string GetCliente() => ClienteEntry.Text;

    public void ImpostaDescrizione(string descrizione)
    {
        DescrizioneEditor.Clear();
        DescrizioneEditor.SendKeys(descrizione);
        _driver.HideKeyboard();
    }

    public string GetDescrizione() => DescrizioneEditor.Text;

    // Il Picker MAUI su Android apre un dialog nativo con l'elenco delle opzioni:
    // non ha un AutomationId dedicato per singola voce, quindi la selezioniamo
    // per testo visibile (comportamento tipico di un AlertDialog Android).
    public void SelezionaStato(string testoOpzione)
    {
        StatoPicker.Click();

        var opzione = _wait.WaitForClickable(By.XPath($"//*[@text='{testoOpzione}']"));
        opzione.Click();
    }

    public string GetStatoSelezionato() =>
        _wait.WaitForVisible(AutomationId.Locator("DetailStatoPicker")).Text;

    public void TapCaricaDocumento() => CaricaDocumentoButton.Click();

    public bool IsCaricaDocumentoButtonVisible()
    {
        try
        {
            return CaricaDocumentoButton.Displayed;
        }
        catch (WebDriverException)
        {
            return false;
        }
    }
}

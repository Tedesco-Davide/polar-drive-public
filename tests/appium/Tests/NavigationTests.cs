using PolarDrive.Appium.Tests.Pages;

namespace PolarDrive.Appium.Tests.Tests;

[TestFixture]
public class NavigationTests : BaseTest
{
    [Test]
    public void SelezionaPraticaDallaLista_ApreIlDettaglioCorretto()
    {
        var loginPage = new LoginPage(Driver);
        var listPage = new PraticheListPage(Driver);
        var detailPage = new PraticaDetailPage(Driver);

        loginPage.Login(ValidEmail, ValidPassword);
        listPage.WaitForLoaded();

        // Pratica seed "2" = PRT-2026-002 (Bianchi Immobiliare), vedi PraticheRepository.
        listPage.SelezionaPratica("2");

        detailPage.WaitForLoaded();
        Assert.That(detailPage.NumeroPraticaEntry.Text, Is.EqualTo("PRT-2026-002"));
        Assert.That(detailPage.GetCliente(), Is.EqualTo("Bianchi Immobiliare"));
    }
}

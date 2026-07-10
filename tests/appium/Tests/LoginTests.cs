using PolarDrive.Appium.Tests.Pages;

namespace PolarDrive.Appium.Tests.Tests;

[TestFixture]
public class LoginTests : BaseTest
{
    [Test]
    public void Login_ConCredenzialiValide_NavigaAllaListaPratiche()
    {
        var loginPage = new LoginPage(Driver);
        var listPage = new PraticheListPage(Driver);

        loginPage.Login(ValidEmail, ValidPassword);

        // Nessuna eccezione = la CollectionView della lista è apparsa: la
        // navigazione //PraticheListPage è avvenuta con successo.
        listPage.WaitForLoaded();
    }

    [Test]
    public void Login_ConEmailNonValida_MostraMessaggioErrore()
    {
        var loginPage = new LoginPage(Driver);

        loginPage.Login("email-non-valida", ValidPassword);

        var errore = loginPage.WaitForErrorMessage();
        Assert.That(errore, Does.Contain("email"));
    }

    [Test]
    public void Login_ConPasswordTroppoCorta_MostraMessaggioErrore()
    {
        var loginPage = new LoginPage(Driver);

        loginPage.Login(ValidEmail, "123");

        var errore = loginPage.WaitForErrorMessage();
        Assert.That(errore, Does.Contain("password").IgnoreCase);
    }
}

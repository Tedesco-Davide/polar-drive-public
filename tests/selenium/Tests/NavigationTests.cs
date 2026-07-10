using OpenQA.Selenium.Support.UI;
using PolarDrive.Selenium.Tests.Pages;

namespace PolarDrive.Selenium.Tests.Tests;

[TestFixture]
public class NavigationTests : BaseTest
{
    [Test]
    public void NavigaDallaHomeAPolarDrive_TramiteLinkNav()
    {
        var homePage = new HomePage(Driver);
        homePage.Goto(BaseUrl);

        homePage.Nav.GoToPolarDrive();

        var wait = new WebDriverWait(Driver, TimeSpan.FromSeconds(10));
        wait.Until(d => d.Url.Contains("/polardrive"));

        var polarDrivePage = new PolarDrivePage(Driver);
        Assert.That(polarDrivePage.CtaButton.Displayed, Is.True);
    }

    [Test]
    public void NavigaDallaHomeAPolarDrive_TramiteHeroCta()
    {
        var homePage = new HomePage(Driver);
        homePage.Goto(BaseUrl);

        homePage.ClickHeroCta();

        var wait = new WebDriverWait(Driver, TimeSpan.FromSeconds(10));
        wait.Until(d => d.Url.Contains("/polardrive"));

        Assert.That(Driver.Url, Does.Contain("/polardrive"));
    }
}

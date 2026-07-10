using OpenQA.Selenium.Support.UI;
using PolarDrive.Selenium.Tests.Pages;
using PolarDrive.Selenium.Tests.Support;

namespace PolarDrive.Selenium.Tests.Tests;

[TestFixture]
public class ContactFormTests : BaseTest
{
    [Test]
    public void CompilaEInviaIlForm_ConSuccesso()
    {
        var homePage = new HomePage(Driver);
        homePage.Goto(BaseUrl);
        homePage.StubFetchForContactForm();
        homePage.ScrollToContactForm();

        homePage.FillContactForm(
            name: "Mario Rossi",
            email: "mario.rossi@example.com",
            message: "Vorrei maggiori informazioni su PolarDrive.",
            company: "Acme Srl");

        homePage.SubmitContactForm();

        var wait = new WebDriverWait(Driver, TimeSpan.FromSeconds(10));
        var alert = wait.WaitForAlert();
        var message = alert.Text;
        alert.Accept();

        Assert.That(message, Does.Contain("successo"));
        Assert.That(homePage.NameInputValue, Is.Empty);
        Assert.That(homePage.MessageInputValue, Is.Empty);
    }
}

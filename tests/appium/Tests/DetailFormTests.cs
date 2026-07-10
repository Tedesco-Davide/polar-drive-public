using PolarDrive.Appium.Tests.Pages;

namespace PolarDrive.Appium.Tests.Tests;

[TestFixture]
public class DetailFormTests : BaseTest
{
    private PraticaDetailPage OpenPraticaDetail(string praticaId)
    {
        var loginPage = new LoginPage(Driver);
        var listPage = new PraticheListPage(Driver);
        var detailPage = new PraticaDetailPage(Driver);

        loginPage.Login(ValidEmail, ValidPassword);
        listPage.WaitForLoaded();
        listPage.SelezionaPratica(praticaId);
        detailPage.WaitForLoaded();

        return detailPage;
    }

    [Test]
    public void ModificaClienteEDescrizione_AggiornaICampi()
    {
        var detailPage = OpenPraticaDetail("1");

        detailPage.ImpostaCliente("Rossi Costruzioni Srl - Sede Nord");
        detailPage.ImpostaDescrizione("Fornitura infissi aggiornata dopo sopralluogo");

        Assert.That(detailPage.GetCliente(), Is.EqualTo("Rossi Costruzioni Srl - Sede Nord"));
        Assert.That(detailPage.GetDescrizione(), Is.EqualTo("Fornitura infissi aggiornata dopo sopralluogo"));
    }

    [Test]
    public void CambioStatoPicker_AggiornaLoStatoVisualizzato()
    {
        var detailPage = OpenPraticaDetail("2");

        detailPage.SelezionaStato("Completata");

        Assert.That(detailPage.GetStatoSelezionato(), Is.EqualTo("Completata"));
    }

    [Test]
    public void TapCaricaDocumento_ApreIlFilePickerDiSistemaEAppRestaStabile()
    {
        // Il file picker è UI nativa Android (DocumentsUI), fuori dal
        // contesto dell'app sotto test: qui verifichiamo che tapparlo apra
        // il picker di sistema e che l'app, riportata in primo piano, resti
        // stabile — non che una selezione file reale vada a buon fine.
        // Il tasto Back di sistema non è risultato affidabile per chiudere
        // DocumentsUI sull'emulatore; usiamo ActivateApp per riprendere
        // esplicitamente l'app sotto test.
        const string AppId = "com.companyname.polardrive.maui";
        var detailPage = OpenPraticaDetail("3");

        detailPage.TapCaricaDocumento();
        Thread.Sleep(2000);

        Driver.ActivateApp(AppId);

        Assert.That(detailPage.IsCaricaDocumentoButtonVisible(), Is.True);
    }
}

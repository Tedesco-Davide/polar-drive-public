using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using PolarDrive.Maui.Models;
using PolarDrive.Maui.Services;

namespace PolarDrive.Maui.ViewModels;

[QueryProperty(nameof(PraticaId), "praticaId")]
public partial class PraticaDetailViewModel : ObservableObject
{
    private readonly PraticheRepository _repository;

    [ObservableProperty]
    private string praticaId = string.Empty;

    [ObservableProperty]
    private string numeroPratica = string.Empty;

    [ObservableProperty]
    private string cliente = string.Empty;

    [ObservableProperty]
    private string descrizione = string.Empty;

    [ObservableProperty]
    private int statoSelezionatoIndex;

    [ObservableProperty]
    private string documentoCaricato = "Nessun documento caricato";

    [ObservableProperty]
    private string uploadMessage = string.Empty;

    public List<string> StatiDisponibili { get; } =
        ["In lavorazione", "In attesa documenti", "Completata"];

    private static readonly StatoPratica[] StatiValori =
        [StatoPratica.InLavorazione, StatoPratica.InAttesaDocumenti, StatoPratica.Completata];

    public PraticaDetailViewModel(PraticheRepository repository)
    {
        _repository = repository;
    }

    partial void OnPraticaIdChanged(string value)
    {
        var pratica = _repository.GetById(value);
        if (pratica is null)
        {
            return;
        }

        NumeroPratica = pratica.NumeroPratica;
        Cliente = pratica.Cliente;
        Descrizione = pratica.Descrizione;
        StatoSelezionatoIndex = Array.IndexOf(StatiValori, pratica.Stato);
        DocumentoCaricato = pratica.DocumentoCaricato ?? "Nessun documento caricato";
    }

    partial void OnStatoSelezionatoIndexChanged(int value)
    {
        var pratica = _repository.GetById(PraticaId);
        if (pratica is not null && value >= 0 && value < StatiValori.Length)
        {
            pratica.Stato = StatiValori[value];
        }
    }

    [RelayCommand]
    private async Task CaricaDocumentoAsync()
    {
        UploadMessage = string.Empty;
        try
        {
            var file = await FilePicker.Default.PickAsync(new PickOptions
            {
                PickerTitle = "Seleziona un documento da caricare"
            });

            if (file is null)
            {
                return;
            }

            DocumentoCaricato = file.FileName;
            var pratica = _repository.GetById(PraticaId);
            if (pratica is not null)
            {
                pratica.DocumentoCaricato = file.FileName;
            }

            UploadMessage = $"Documento \"{file.FileName}\" caricato con successo.";
        }
        catch (Exception ex)
        {
            UploadMessage = $"Caricamento annullato o non riuscito: {ex.Message}";
        }
    }
}

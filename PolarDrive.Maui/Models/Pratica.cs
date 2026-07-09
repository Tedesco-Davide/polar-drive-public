namespace PolarDrive.Maui.Models;

public enum StatoPratica
{
    InLavorazione,
    InAttesaDocumenti,
    Completata
}

public class Pratica
{
    public string Id { get; set; } = string.Empty;
    public string NumeroPratica { get; set; } = string.Empty;
    public string Cliente { get; set; } = string.Empty;
    public StatoPratica Stato { get; set; }
    public DateTime DataApertura { get; set; }
    public string Descrizione { get; set; } = string.Empty;
    public string? DocumentoCaricato { get; set; }

    public string StatoDisplay => Stato switch
    {
        StatoPratica.InLavorazione => "In lavorazione",
        StatoPratica.InAttesaDocumenti => "In attesa documenti",
        StatoPratica.Completata => "Completata",
        _ => "Sconosciuto"
    };
}

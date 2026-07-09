using PolarDrive.Maui.Models;

namespace PolarDrive.Maui.Services;

public class PraticheRepository
{
    private readonly List<Pratica> _pratiche =
    [
        new Pratica
        {
            Id = "1",
            NumeroPratica = "PRT-2026-001",
            Cliente = "Rossi Costruzioni Srl",
            Stato = StatoPratica.InLavorazione,
            DataApertura = new DateTime(2026, 6, 2),
            Descrizione = "Fornitura infissi per cantiere Via Roma 12"
        },
        new Pratica
        {
            Id = "2",
            NumeroPratica = "PRT-2026-002",
            Cliente = "Bianchi Immobiliare",
            Stato = StatoPratica.InAttesaDocumenti,
            DataApertura = new DateTime(2026, 6, 15),
            Descrizione = "Preventivo ristrutturazione facciata"
        },
        new Pratica
        {
            Id = "3",
            NumeroPratica = "PRT-2026-003",
            Cliente = "Verdi Logistica SpA",
            Stato = StatoPratica.Completata,
            DataApertura = new DateTime(2026, 5, 20),
            Descrizione = "Manutenzione ordinaria magazzino"
        }
    ];

    public IReadOnlyList<Pratica> GetAll() => _pratiche;

    public Pratica? GetById(string id) => _pratiche.FirstOrDefault(p => p.Id == id);
}

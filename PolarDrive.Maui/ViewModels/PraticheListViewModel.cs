using System.Collections.ObjectModel;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Microsoft.Extensions.DependencyInjection;
using PolarDrive.Maui.Models;
using PolarDrive.Maui.Services;
using PolarDrive.Maui.Views;

namespace PolarDrive.Maui.ViewModels;

public partial class PraticheListViewModel : ObservableObject
{
    private readonly PraticheRepository _repository;
    private readonly IServiceProvider _serviceProvider;

    public PraticheListViewModel(PraticheRepository repository, IServiceProvider serviceProvider)
    {
        _repository = repository;
        _serviceProvider = serviceProvider;
        Pratiche = new ObservableCollection<Pratica>(_repository.GetAll());
    }

    public ObservableCollection<Pratica> Pratiche { get; }

    [RelayCommand]
    private void SelezionaPratica(Pratica? pratica)
    {
        if (pratica is null)
        {
            return;
        }

        // Sostituzione diretta della pagina radice invece di
        // Shell.Current.GoToAsync con query string (stesso motivo del
        // login: la navigazione Shell è risultata bloccata in questa
        // versione di MAUI). Risolviamo il ViewModel dal DI, impostiamo
        // PraticaId a mano e costruiamo la pagina con quell'istanza.
        var detailViewModel = _serviceProvider.GetRequiredService<PraticaDetailViewModel>();
        detailViewModel.PraticaId = pratica.Id;

        var detailPage = new PraticaDetailPage(detailViewModel);
        Application.Current!.Windows[0].Page = detailPage;
    }
}

using System.Collections.ObjectModel;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using PolarDrive.Maui.Models;
using PolarDrive.Maui.Services;

namespace PolarDrive.Maui.ViewModels;

public partial class PraticheListViewModel : ObservableObject
{
    private readonly PraticheRepository _repository;

    public PraticheListViewModel(PraticheRepository repository)
    {
        _repository = repository;
        Pratiche = new ObservableCollection<Pratica>(_repository.GetAll());
    }

    public ObservableCollection<Pratica> Pratiche { get; }

    [RelayCommand]
    private async Task SelezionaPraticaAsync(Pratica? pratica)
    {
        if (pratica is null)
        {
            return;
        }

        await Shell.Current.GoToAsync($"{nameof(Views.PraticaDetailPage)}?praticaId={pratica.Id}");
    }
}

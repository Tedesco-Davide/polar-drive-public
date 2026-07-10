using System.Text.RegularExpressions;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Microsoft.Extensions.DependencyInjection;
using PolarDrive.Maui.Views;

namespace PolarDrive.Maui.ViewModels;

public partial class LoginViewModel : ObservableObject
{
    private readonly IServiceProvider _serviceProvider;

    [ObservableProperty]
    private string email = string.Empty;

    [ObservableProperty]
    private string password = string.Empty;

    [ObservableProperty]
    private string errorMessage = string.Empty;

    [ObservableProperty]
    private bool isBusy;

    public LoginViewModel(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    [RelayCommand]
    private void Login()
    {
        ErrorMessage = string.Empty;

        if (string.IsNullOrWhiteSpace(Email) || !Regex.IsMatch(Email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
        {
            ErrorMessage = "Inserisci un indirizzo email valido.";
            return;
        }

        if (string.IsNullOrWhiteSpace(Password) || Password.Length < 6)
        {
            ErrorMessage = "La password deve contenere almeno 6 caratteri.";
            return;
        }

        // Sostituzione diretta della pagina radice invece di
        // Shell.Current.GoToAsync(): in questa versione di MAUI un "await"
        // dopo un tap dispatchato da Appium/UiAutomator2 può restare bloccato
        // a tempo indeterminato (bug osservato in fase di test, isolato
        // rimuovendo ogni gap async dal comando). Login qui è quindi
        // volutamente sincrono.
        var praticheListPage = _serviceProvider.GetRequiredService<PraticheListPage>();
        Application.Current!.Windows[0].Page = praticheListPage;
    }
}

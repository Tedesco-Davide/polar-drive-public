namespace PolarDrive.Maui;

public partial class AppShell : Shell
{
    public AppShell()
    {
        InitializeComponent();

        // Un solo ShellContent (Login) dichiarato in XAML: avere due
        // ShellContent nella Items collection fa scattare un bug di
        // reentrancy in questa versione di MAUI ("Cannot change
        // ObservableCollection during a CollectionChanged event" in
        // ShellItemCollection.Add). Anche Shell.Current.GoToAsync() basato
        // su route è risultato inaffidabile (resta bloccato a tempo
        // indeterminato): la navigazione verso le altre pagine avviene quindi
        // con push diretto (Shell.Current.Navigation.PushAsync) dai
        // ViewModel, non con route Shell.
    }
}

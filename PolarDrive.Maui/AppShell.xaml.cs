using PolarDrive.Maui.Views;

namespace PolarDrive.Maui;

public partial class AppShell : Shell
{
    public AppShell()
    {
        InitializeComponent();

        Routing.RegisterRoute(nameof(PraticaDetailPage), typeof(PraticaDetailPage));
    }
}

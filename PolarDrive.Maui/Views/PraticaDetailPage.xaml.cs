using PolarDrive.Maui.ViewModels;

namespace PolarDrive.Maui.Views;

public partial class PraticaDetailPage : ContentPage
{
    public PraticaDetailPage(PraticaDetailViewModel viewModel)
    {
        InitializeComponent();
        BindingContext = viewModel;
    }
}

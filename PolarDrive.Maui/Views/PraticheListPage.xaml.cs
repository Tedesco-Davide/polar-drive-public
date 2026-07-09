using PolarDrive.Maui.ViewModels;

namespace PolarDrive.Maui.Views;

public partial class PraticheListPage : ContentPage
{
    public PraticheListPage(PraticheListViewModel viewModel)
    {
        InitializeComponent();
        BindingContext = viewModel;
    }
}

using Microsoft.Extensions.Logging;
using PolarDrive.Maui.Services;
using PolarDrive.Maui.ViewModels;
using PolarDrive.Maui.Views;

namespace PolarDrive.Maui;

public static class MauiProgram
{
	public static MauiApp CreateMauiApp()
	{
		var builder = MauiApp.CreateBuilder();
		builder
			.UseMauiApp<App>()
			.ConfigureFonts(fonts =>
			{
				fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
				fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
			});

#if DEBUG
		builder.Logging.AddDebug();
#endif

		builder.Services.AddSingleton<PraticheRepository>();

		builder.Services.AddTransient<LoginViewModel>();
		builder.Services.AddTransient<LoginPage>();

		builder.Services.AddTransient<PraticheListViewModel>();
		builder.Services.AddTransient<PraticheListPage>();

		builder.Services.AddTransient<PraticaDetailViewModel>();
		builder.Services.AddTransient<PraticaDetailPage>();

		return builder.Build();
	}
}

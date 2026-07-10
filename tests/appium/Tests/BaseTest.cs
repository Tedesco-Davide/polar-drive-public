using OpenQA.Selenium.Appium.Android;
using PolarDrive.Appium.Tests.Support;

namespace PolarDrive.Appium.Tests.Tests;

public abstract class BaseTest
{
    protected const string ValidEmail = "mario.rossi@example.com";
    protected const string ValidPassword = "Password123";

    protected AndroidDriver Driver { get; private set; } = null!;

    [SetUp]
    public void BaseSetUp()
    {
        Driver = DriverFactory.CreateAndroidDriver();
    }

    [TearDown]
    public void BaseTearDown()
    {
        Driver.Quit();
        Driver.Dispose();
    }
}

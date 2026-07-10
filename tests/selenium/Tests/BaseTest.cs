using OpenQA.Selenium;
using PolarDrive.Selenium.Tests.Support;

namespace PolarDrive.Selenium.Tests.Tests;

public abstract class BaseTest
{
    protected const string BaseUrl = "http://localhost:3000";
    protected IWebDriver Driver { get; private set; } = null!;

    [SetUp]
    public void BaseSetUp()
    {
        Driver = DriverFactory.CreateChromeDriver();
    }

    [TearDown]
    public void BaseTearDown()
    {
        Driver.Quit();
        Driver.Dispose();
    }
}

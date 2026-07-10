import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { PolarDrivePage } from "../pages/PolarDrivePage";

test.describe("Navigazione principale", () => {
  test("naviga dalla Home a PolarDrive tramite il link della nav", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const polarDrivePage = new PolarDrivePage(page);

    await homePage.goto();
    await homePage.nav.goToPolarDrive();

    await expect(page).toHaveURL(/\/polardrive$/);
    await expect(polarDrivePage.ctaButton).toBeVisible();
  });

  test("naviga dalla Home a PolarDrive tramite la CTA della Hero", async ({
    page,
  }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await homePage.clickHeroCta();

    await expect(page).toHaveURL(/\/polardrive$/);
  });
});

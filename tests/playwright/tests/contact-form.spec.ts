import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test.describe("Form di contatto", () => {
  test("compila e invia il form con successo", async ({ page }) => {
    const homePage = new HomePage(page);

    // Il form invia i dati a Google Apps Script: intercettiamo la chiamata
    // per non colpire l'endpoint reale durante i test E2E.
    await page.route("https://script.google.com/**", async (route) => {
      await route.fulfill({ status: 200, body: "ok" });
    });

    let dialogMessage = "";
    page.once("dialog", async (dialog) => {
      dialogMessage = dialog.message();
      await dialog.accept();
    });

    await homePage.goto();
    await homePage.contactForm.scrollIntoViewIfNeeded();

    await homePage.fillContactForm({
      name: "Mario Rossi",
      email: "mario.rossi@example.com",
      company: "Acme Srl",
      message: "Vorrei maggiori informazioni su PolarDrive.",
    });
    await homePage.submitContactForm();

    await expect(async () => {
      expect(dialogMessage).toContain("successo");
    }).toPass();

    await expect(homePage.contactNameInput).toHaveValue("");
    await expect(homePage.contactMessageTextarea).toHaveValue("");
  });
});

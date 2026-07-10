import type { Locator, Page } from "@playwright/test";
import { NavigationComponent } from "./NavigationComponent";

export class PolarDrivePage {
  readonly page: Page;
  readonly nav: NavigationComponent;
  readonly ctaButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nav = new NavigationComponent(page);
    this.ctaButton = page.getByTestId("polardrive-cta-button");
  }

  async goto() {
    await this.page.goto("/polardrive");
  }
}

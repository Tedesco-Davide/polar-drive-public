import type { Locator, Page } from "@playwright/test";

export class NavigationComponent {
  readonly page: Page;
  readonly nav: Locator;
  readonly logo: Locator;
  readonly homeLink: Locator;
  readonly missionLink: Locator;
  readonly polarDriveLink: Locator;
  readonly contactsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nav = page.getByTestId("main-nav");
    this.logo = page.getByTestId("nav-logo");
    this.homeLink = page.getByTestId("nav-home");
    this.missionLink = page.getByTestId("nav-mission");
    this.polarDriveLink = page.getByTestId("nav-polardrive");
    this.contactsLink = page.getByTestId("nav-contacts");
  }

  async goToPolarDrive() {
    await this.polarDriveLink.click();
  }
}

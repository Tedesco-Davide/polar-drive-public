import type { Locator, Page } from "@playwright/test";
import { NavigationComponent } from "./NavigationComponent";

export class HomePage {
  readonly page: Page;
  readonly nav: NavigationComponent;
  readonly heroCtaButton: Locator;

  readonly contactForm: Locator;
  readonly contactNameInput: Locator;
  readonly contactEmailInput: Locator;
  readonly contactCompanyInput: Locator;
  readonly contactWebsiteInput: Locator;
  readonly contactMessageTextarea: Locator;
  readonly contactSubmitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nav = new NavigationComponent(page);
    this.heroCtaButton = page.getByTestId("hero-cta-button");

    this.contactForm = page.getByTestId("contact-form");
    this.contactNameInput = page.getByTestId("contact-name-input");
    this.contactEmailInput = page.getByTestId("contact-email-input");
    this.contactCompanyInput = page.getByTestId("contact-company-input");
    this.contactWebsiteInput = page.getByTestId("contact-website-input");
    this.contactMessageTextarea = page.getByTestId("contact-message-textarea");
    this.contactSubmitButton = page.getByTestId("contact-submit-button");
  }

  async goto() {
    await this.page.goto("/");
  }

  async clickHeroCta() {
    await this.heroCtaButton.click();
  }

  async fillContactForm(data: {
    name: string;
    email: string;
    company?: string;
    website?: string;
    message: string;
  }) {
    await this.contactNameInput.fill(data.name);
    await this.contactEmailInput.fill(data.email);
    if (data.company) await this.contactCompanyInput.fill(data.company);
    if (data.website) await this.contactWebsiteInput.fill(data.website);
    await this.contactMessageTextarea.fill(data.message);
  }

  async submitContactForm() {
    await this.contactSubmitButton.click();
  }
}

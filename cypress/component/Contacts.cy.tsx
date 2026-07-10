import Contacts from "../../pages/contacts";
import { mountWithProviders } from "../support/mountWithProviders";

describe("Contacts form (component test)", () => {
  it("permette di compilare tutti i campi del form, senza toccare la rete", () => {
    // Nessun submit, nessuna fetch verso Google Apps Script: qui testiamo solo
    // il comportamento del componente in isolamento (rendering + input).
    mountWithProviders(<Contacts />);

    cy.get('[data-testid="contact-name-input"]')
      .type("Mario Rossi")
      .should("have.value", "Mario Rossi");

    cy.get('[data-testid="contact-email-input"]')
      .type("mario.rossi@example.com")
      .should("have.value", "mario.rossi@example.com");

    cy.get('[data-testid="contact-company-input"]')
      .type("Acme Srl")
      .should("have.value", "Acme Srl");

    cy.get('[data-testid="contact-message-textarea"]')
      .type("Vorrei maggiori informazioni su PolarDrive.")
      .should("have.value", "Vorrei maggiori informazioni su PolarDrive.");

    cy.get('[data-testid="contact-submit-button"]')
      .should("be.visible")
      .and("not.be.disabled");
  });
});

import Router from "next/router";
import Hero from "../../pages/hero";
import { mountWithProviders } from "../support/mountWithProviders";

describe("Hero (component test)", () => {
  it("mostra il bottone CTA", () => {
    mountWithProviders(<Hero />);

    cy.get('[data-testid="hero-cta-button"]').should("be.visible");
  });

  it("il click sulla CTA prova a navigare verso /polardrive", () => {
    // A differenza di un test E2E, qui non c'è una vera navigazione di pagina:
    // stubiamo il singleton "next/router" e verifichiamo solo l'intento del componente.
    cy.stub(Router, "push").as("routerPush").resolves(true);

    mountWithProviders(<Hero />);
    cy.get('[data-testid="hero-cta-button"]').click();

    cy.get("@routerPush").should("have.been.calledWith", "/polardrive");
  });
});

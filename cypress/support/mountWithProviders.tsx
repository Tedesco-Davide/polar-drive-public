import type { ReactNode } from "react";
import type { NextRouter } from "next/router";
// Nota per il colloquio: in Cypress Component Testing il componente viene
// montato isolato, senza il resto dell'app Next.js. Router (pages) e
// i18next non sono quindi disponibili "gratis" come in un test E2E: vanno
// forniti a mano tramite i loro React Context, esattamente come farebbe
// _app.tsx in produzione.
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18next from "i18next";

export function createMockRouter(overrides: Partial<NextRouter> = {}): NextRouter {
  return {
    basePath: "",
    pathname: "/",
    route: "/",
    asPath: "/",
    query: {},
    locale: "it",
    locales: ["it", "en"],
    defaultLocale: "it",
    isLocaleDomain: false,
    isReady: true,
    isPreview: false,
    push: cy.stub().as("contextRouterPush"),
    replace: cy.stub().as("contextRouterReplace"),
    reload: cy.stub(),
    back: cy.stub(),
    forward: cy.stub(),
    prefetch: cy.stub().resolves(undefined),
    beforePopState: cy.stub(),
    events: {
      on: cy.stub(),
      off: cy.stub(),
      emit: cy.stub(),
    },
    ...overrides,
  } as unknown as NextRouter;
}

function createTestI18n() {
  const instance = i18next.createInstance();
  instance.use(initReactI18next).init({
    lng: "it",
    fallbackLng: "it",
    resources: { it: { translation: {} } },
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
  return instance;
}

export function mountWithProviders(ui: ReactNode, router: NextRouter = createMockRouter()) {
  const testI18n = createTestI18n();

  return cy.mount(
    <RouterContext.Provider value={router}>
      <I18nextProvider i18n={testI18n}>{ui}</I18nextProvider>
    </RouterContext.Provider>
  );
}

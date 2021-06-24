// load the global Cypress types
/// <reference types="cypress" />

// no export, will cause errors

type TRegisterApiSchema = {
  email: string
  password: string
  name: string
}

type TLoginApiSchema = {
  email: string
  password: string
}

declare namespace Cypress {
  interface Chainable {
    // custom selector
    dataCy(
      dataTestAttribute: string,
      args?: Partial<
        Cypress.Loggable &
          Cypress.Timeoutable &
          Cypress.Withinable &
          Cypress.Shadow
      >
    ): Chainable<Element>

    // api - auth
    loginByApi(requestBody: TLoginApiSchema): Chainable<Response>
    registerByApi(requestBody: TRegisterApiSchema): Chainable<Response>

    // UI - auth
    loginAsAdmin(): Chainable<any>
    loginAsUser(): Chainable<any>
  }
}

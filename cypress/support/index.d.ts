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
    // api - auth
    loginByApi(requestBody: TLoginApiSchema): Chainable<Response>
    registerByApi(requestBody: TRegisterApiSchema): Chainable<Response>
  }
}

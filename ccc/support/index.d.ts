import { TRegisterApiSchema, TLoginApiSchema } from '../../src/yup/apiSchema'

declare namespace Cypress {
  interface Chainable {
    // auth
    loginUser(requestBody: TLoginApiSchema): Chainable<Response>
    registerUser(requestBody: TRegisterApiSchema): Chainable<Response>
  }
}

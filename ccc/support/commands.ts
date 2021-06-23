// ***********************************************
// https://on.cypress.io/custom-commands
// ***********************************************
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// POST /auth/login
Cypress.Commands.add('loginUser', (requestBody) => {
  return cy.request({
    method: 'POST',
    url: '/api/v1/auth/login',
    body: requestBody,
    // qs: {
    //   id,
    // },
    failOnStatusCode: false,
  })
})

// POST /auth/register
Cypress.Commands.add('registerUser', (requestBody) => {
  return cy.request({
    method: 'POST',
    url: '/api/v1/auth/register',
    body: requestBody,
    // qs: {
    //   id,
    // },
    failOnStatusCode: false,
  })
})

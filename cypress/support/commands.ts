// ***********************************************
// https://on.cypress.io/custom-commands
// ***********************************************

// POST /auth/login
Cypress.Commands.add('loginByApi', (requestBody) => {
  return cy.request({
    method: 'POST',
    url: '/api/v1/auth/login',
    body: requestBody,
    failOnStatusCode: false,
  })
})

// POST /auth/register
Cypress.Commands.add('registerByApi', (requestBody) => {
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

Cypress.Commands.add('dataCy', (value) => {
  return cy.get(`[data-cy=${value}]`)
})
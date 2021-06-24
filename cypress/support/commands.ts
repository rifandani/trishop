// ***********************************************
// https://on.cypress.io/custom-commands
// ***********************************************
/// <reference path="index.d.ts" />

const AUTH_LOGIN_API_URL = `${Cypress.env('apiUrl')}/auth/login`

const admin = {
  email: Cypress.env('adminEmail'),
  password: Cypress.env('adminPassword'),
}

const user = {
  email: Cypress.env('userEmail'),
  password: Cypress.env('userPassword'),
}

Cypress.Commands.add('dataCy', (dataTestAttribute, args = {}) => {
  return cy.get(`[data-cy=${dataTestAttribute}]`, ...args)
})

Cypress.Commands.add('loginAsAdmin', () => {
  // spying on POST login
  cy.intercept('POST', AUTH_LOGIN_API_URL).as('loginAsAdmin')

  // visit login page
  cy.visit('/login')

  // type in admin email and password field
  cy.dataCy('email').type(admin.email)
  cy.dataCy('password').type(admin.password)

  // click login button
  cy.dataCy('submit').click()

  // wait on POST /login call
  cy.wait('@loginAsAdmin')
})

Cypress.Commands.add('loginAsUser', () => {
  // spying on POST login
  cy.intercept('POST', AUTH_LOGIN_API_URL).as('loginAsUser')

  // visit login page
  cy.visit('/login')

  // type in user email and password field
  cy.dataCy('email').type(user.email)
  cy.dataCy('password').type(user.password)

  // click login button
  cy.dataCy('submit').click()

  // wait on POST /login call
  cy.wait('@loginAsUser')
})

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

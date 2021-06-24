/// <reference path="../../support/index.d.ts" />

describe('Login Page', () => {
  // beforeEach(() => {
  //   cy.clearCookies()
  //   cy.clearLocalStorage()
  // })

  const AUTH_LOGIN_API_URL = `${Cypress.env('apiUrl')}/auth/login`

  /* ---------------------------------- Unauthenticated --------------------------------- */
  context('Unauthenticated', () => {
    it('visit /*/dashboard should have redirected to /login', function () {
      // visit protected page
      cy.visit('/admin/dashboard')

      // should be redirected to /login
      cy.url().should('include', '/login')

      // visit protected page
      cy.visit('/user/dashboard')

      // should be redirected to /login
      cy.url().should('include', '/login')

      // auth cookie should NOT be present
      cy.getCookies().should('have.length', 0)

      // UI should reflect this user is in login page
      cy.dataCy('welcome').should('contain', 'Welcome')
      cy.dataCy('submit').should('contain', 'Login')
    })

    /* ---------------------------- ERROR - empty email & password field ---------------------------- */
    it('should ERROR - empty form fields', function () {
      // click submit button
      cy.dataCy('submit').click()

      // UI should reflect there is an formik errors
      cy.dataCy('error-email')
        .should('be.visible')
        .and('contain', 'email required')
      cy.dataCy('error-password')
        .should('be.visible')
        .and('contain', 'password required')
    })

    /* ---------------------------- ERROR - invalid email ---------------------------- */
    it('should ERROR - invalid email', function () {
      const user = {
        email: 'aaaaaaaaaaaaaaaa',
        password: 'aaaaaaaaaaaaaaaa',
      }

      // type in email and password field
      cy.dataCy('email').type(user.email)
      cy.dataCy('password').type(user.password)

      // click login button
      cy.dataCy('submit').click()

      // UI should reflect there is an formik errors
      cy.dataCy('error-email')
        .should('be.visible')
        .and('contain', 'email invalid')

      // clear email and password field
      cy.dataCy('email').clear()
      cy.dataCy('password').clear()
    })

    /* ---------------------------- ERROR - password less than 6 chars ---------------------------- */
    it('should ERROR - password less than 6 chars', function () {
      const user = {
        email: 'user@email.com',
        password: 'user',
      }

      // type in email and password field
      cy.dataCy('email').type(user.email)
      cy.dataCy('password').type(user.password)

      // click login button
      cy.dataCy('submit').click()

      // UI should reflect there is an formik errors
      cy.dataCy('error-password')
        .should('be.visible')
        .and('contain', 'password must be 6 characters or more')

      // clear email and password field
      cy.dataCy('email').clear()
      cy.dataCy('password').clear()
    })

    /* ---------------------------- ERROR - Email does not exists ---------------------------- */
    // karena ini untuk autentikasi login user, maka tidak perlu stub response
    // https://docs.cypress.io/guides/guides/network-requests
    it('should ERROR - Email does not exists', function () {
      const user = {
        email: 'user@email.com',
        password: 'password',
      }

      // spying on POST login
      cy.intercept('POST', AUTH_LOGIN_API_URL).as('login')

      // type in email and password field
      cy.dataCy('email').type(user.email)
      cy.dataCy('password').type(user.password)

      // click login button
      cy.dataCy('submit').click()

      // wait for the interception response
      cy.wait('@login').its('response.body').should('deep.equal', {
        error: true,
        message: 'Email does not exists',
      })

      // UI should reflect there is an formik errors
      cy.get('.Toastify__toast-body')
        .should('be.visible')
        .and('contain', 'Email does not exists')

      // clear email and password field
      cy.dataCy('email').clear()
      cy.dataCy('password').clear()
    })

    /* ---------------------------- ERROR - Password did not match ---------------------------- */
    it('should ERROR - Password did not match', function () {
      const user = {
        email: Cypress.env('adminEmail'),
        password: 'password',
      }

      // spying on POST login
      cy.intercept('POST', AUTH_LOGIN_API_URL).as('login')

      // type in email and password field
      cy.dataCy('email').type(user.email)
      cy.dataCy('password').type(user.password)

      // click login button
      cy.dataCy('submit').click()

      // wait for the interception response
      cy.wait('@login').its('response.body').should('deep.equal', {
        error: true,
        message: 'Password did not match',
      })

      // UI should reflect there is an formik errors
      cy.get('.Toastify__toast-body')
        .should('be.visible')
        .and('contain', 'Password did not match')

      // clear email and password field
      cy.dataCy('email').clear()
      cy.dataCy('password').clear()
    })

    /* ---------------------------- SUCCESS - as ADMIN ---------------------------- */
    it('should SUCCESS - as ADMIN ', function () {
      const user = {
        email: Cypress.env('adminEmail'),
        password: Cypress.env('adminPassword'),
      }

      // spying on POST login
      cy.intercept('POST', AUTH_LOGIN_API_URL).as('login')

      // type in email and password field
      cy.dataCy('email').type(user.email)
      cy.dataCy('password').type(user.password)

      // click login button
      cy.dataCy('submit').click()

      // wait for the interception response
      cy.wait('@login', { timeout: 10000 }).then(({ response }) => {
        // success response
        expect(response.statusCode).to.be.equal(201)
        expect(response.body).to.have.property('error', false)
        expect(response.body).to.have.property('message', 'Login success')

        // local storage should have 'user'
        expect(localStorage.getItem('user')).to.be.a('string')
      })

      // cookie should have 'auth'
      cy.getCookie('auth')
        .should('exist')
        .then((cookie) => {
          expect(cookie.value).to.be.a('string')
        })

      // url now should be /admin/dashboard
      cy.url().should('eq', `${Cypress.config().baseUrl}/admin/dashboard`)

      // UI should reflect on login success
      cy.get('.Toastify__toast-body').should('be.visible')
    })
  })

  /* ---------------------------------- Already authenticated as ADMIN --------------------------------- */
  context('Already authenticated as ADMIN', () => {
    it('visit /login should be redirected to /admin/dashboard', function () {
      // login as ADMIN
      cy.loginAsAdmin()

      // then, navigate back to /login
      cy.visit('/login')

      // should be redirected to /admin/dashboard
      cy.url().should('include', '/admin/dashboard')

      // auth cookie should be present
      cy.getCookie('auth').should('exist')

      // UI should reflect this user being logged in
      cy.dataCy('admin-dashboard').should('contain', 'Admin Dashboard')
    })
  })

  /* ---------------------------------- Already authenticated as USER --------------------------------- */
  context('Already authenticated as USER', () => {
    it('visit /login should be redirected to /user/dashboard', function () {
      // login as USER
      cy.loginAsUser()

      // then, navigate back to /login
      cy.visit('/login')

      // should be redirected to /user/dashboard
      cy.url().should('include', '/user/dashboard')

      // auth cookie should be present
      cy.getCookie('auth').should('exist')

      // UI should reflect this user being logged in
      cy.dataCy('user-dashboard').should('contain', 'User Dashboard')
    })
  })
})

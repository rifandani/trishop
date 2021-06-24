/// <reference path="../../../support/index.d.ts" />

describe('POST /api/v1/auth/login', () => {
  context('login', () => {
    /* --------------------------------- ERROR - empty req.body --------------------------------- */
    it('should ERROR - empty req.body', () => {
      const emptyBody = {
        email: '',
        password: '',
      }

      cy.loginByApi(emptyBody).should((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('error', true)
        expect(response.body).to.have.property('name', 'ValidationError')
        expect(response.body.message).to.be.a('string')
        expect(response.body.errors).to.satisfy(
          (errors: string[]) => errors.length > 0
        )
      })
    })

    /* -------------------------------- SUCCESS - valid req.body -------------------------------- */
    it('should SUCCESS - valid req.body', () => {
      const validBody = {
        email: Cypress.env('adminEmail'),
        password: Cypress.env('adminPassword'),
      }

      cy.loginByApi(validBody).should((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('error', false)
        expect(response.body.message).to.be.a('string')
        expect(response.body.data).to.have.keys(
          '_id',
          'createdAt',
          'email',
          'name',
          'role',
          'updatedAt'
        )
      })
    })
  })
})

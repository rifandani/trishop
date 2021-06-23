/// <reference types="cypress" />

describe('POST /api/v1/auth/login', () => {
  context('login as user', () => {
    /* ----------------- ANCHOR - ERROR - empty request.body ----------------- */
    it('should ERROR - empty request.body', () => {
      const requestBody = {
        id: '',
        username: '',
        email: '',
      }

      cy.loginUser(requestBody).should((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('error', true)
        expect(response.body).to.have.property('name', 'ValidationError')
        expect(response.body).to.have.property('errors')
      })
    })

    /* ------------------ ANCHOR - SUCCESS - valid request.body ----------------- */
    it('should SUCCESS - valid request.body', () => {
      const requestBody = {
        id: validId,
        username: 'username',
        email: 'username@email.com',
      }

      cy.registerUser(requestBody).should((response) => {
        cy.log('response body', response.body)
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('error', false)
        expect(response.body.message).to.be.a('string')
      })

      cy.deleteUser(validId).then((res) => {
        cy.log('delete user', res.body)
      })
    })
  })
})

describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })
})

describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(false)
  })
})

describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {

    //Given
    cy.visit('https://example.cypress.io')
    cy.pause()

    //when
    cy.contains('type').click()
    cy.get('.action-email')
    .type('fake@boye.com')

    //Then
    .should('have.value', 'fake@boye.com')
    cy.url().should('include', '/commands/actions')
  })
})
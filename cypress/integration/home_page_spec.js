describe('The Home Page exists', () => {
  it('successfully loads', () => {
    cy.visit('/') // change URL to match your dev URL
  })
})

describe('The Home Page form', () => {
  it('has the big 5 inputs', () => {
    cy.contains('Name');
    cy.contains('Colour');
    cy.contains('Animal');
    cy.contains('Country');
    cy.contains('Climbing Style');
  })

  it('Cannot submit empty', () => {
    //Given
    cy.contains('Submit');
    //When
    cy.contains('Submit').click();

    //Then
    cy.contains('required');
  })

  it('Can submit with data', () => {
    //When
    cy.get('#name').type('testName');
    cy.get('#colour').type('testColour');
    cy.get('#animal').type('exampleAnimal');
    cy.get('#country').type('exampleCountry');
    cy.get('#climbingStyle').type('exampleClimbingStyle');

    cy.get('[type=submit]').click()

    //Then
  })
})

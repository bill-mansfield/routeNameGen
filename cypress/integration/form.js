describe('The Home Page exists', () => {
  it('successfully loads', () => {
    cy.visit('/') // change URL to match your dev URL
  })
})

describe('Step One', () => {
  it('The inital 9 inputs', () => {
    cy.contains('First Name*');
    cy.contains('Last Name*');
    cy.contains('Address Line 1*');
    cy.contains('Address Line 2');
    cy.contains('City*');
    cy.contains('State');
    cy.contains('Zipcode*');
    cy.contains('Country*');
  })

  it('Cannot submit empty', () => {
    //Given
    cy.contains('Next');
    //When
    cy.contains('Next').click();
    //Then
    cy.contains('required');
  })


  it('Can collect user data', () => {
    cy.get('input[name=firstName]').type('testFname');
    cy.get('input[name=lastName]').type('testLname');
    cy.get('input[name=address1]').type('123 test st');
    cy.get('#mui-component-select-city').click();
    cy.contains('Natimuk').click();
    cy.get('#mui-component-select-state').click();
    cy.contains('VIC').click();
    cy.get('input[name=zipcode]').type('50121');
    cy.get('#mui-component-select-country').click();
    cy.contains('Italy').click();
    cy.get('input[name=useAddressForPaymentDetails]').click();

  })

  it('Testing picture uploading', () => {
    cy.fixture('testPicture.png').then(fileContent => {
        cy.get('input[type="file"]').attachFile({
            fileContent: fileContent.toString(),
            fileName: 'testPicture.png',
            mimeType: 'image/png'
        });
    });
    cy.get('[type=submit]').click()
});
})

describe('Step Two', () => {
  it('Can collect CC data', () => {
    cy.get('input[name=nameOnCard]').type('test name');
    cy.get('input[name=cardNumber').type('4111111111111')
    cy.get('input[name=expiryDate').type('10/28');
    cy.get('input[name=cvv').type('123');

    cy.get('[type=submit]').click();
  })
})

describe('Step Three', () => {
  it('Can submit all data', () => {
    
    cy.get('[type=submit]').click();
    cy.contains('Thank you for your order');
  })
})

const { appPageObj } = require("../../page_objects/AppPage");

//Possible improvements in the app:
//Custom  attribute for html elements to make automation reliable (data-cy="")
//App should not hang after calculating median for empty text field. User should be allowed to enter value again and submit enabled.
describe('App Test: ', () => {

    beforeEach(() => {
        cy.visit('http://127.0.0.1:3000');
        cy.clearCookies();
    })
    
    it('Verify UI elements exist when app loads', () => {
      appPageObj.getHeadingForForm().should('contain', 'Enter a number to get the median of primes:');
      appPageObj.getInputField().should('be.visible');
      appPageObj.getSubmitButton().should('be.visible');
    });


    it('Verify the median prime numbers for given inputs', () => {
      cy.intercept('GET','/api/*').as('apiCall');
      appPageObj.getInputField().type("10");
      appPageObj.getResultHeading().should('not.visible');
      
      appPageObj.getSubmitButton().click().wait('@apiCall');
      appPageObj.getResultHeading()
                .should('be.visible')
                .and('contain.text', "The median is: [3,5]");

      //Calculate for 0, 1, 2, negative numbers and verify empty array
      appPageObj.calculateMedianOfGivenInput("-67")
                .should('contain.text', "The median is: [,]")

      appPageObj.calculateMedianOfGivenInput("1")
                .should('contain.text', "The median is: [,]")

      appPageObj.calculateMedianOfGivenInput("2")
                .should('contain.text', "The median is: [,]")

      appPageObj.calculateMedianOfGivenInput("0")
                .should('contain.text', "The median is: [,]")

      //Calculate decimal numbers 
      appPageObj.calculateMedianOfGivenInput("8.95762874")
                .should('contain.text', "The median is: [3,5]")

    });

    it('Verify enter key returns the result', () => {
      cy.intercept('GET','/api/*').as('apiCall');
      
      //Send up and down keys to input the value
      var i = 0;
      for(i; i < 3; i++) {
        appPageObj.getInputField().type('{uparrow}');
      }
      appPageObj.getInputField().should('contain.value', 3);

      appPageObj.getInputField().trigger('input').type('{enter}').wait('@apiCall').then(() => {
          appPageObj.getResultHeading()
                .should('be.visible')
                .and('contain.text', "The median is: [2]");
      });
    });

    it('Verify 304 status code on inputting the same value in the same session', () => {
      cy.intercept('GET','/api/*').as('apiCall');
      
      appPageObj.getInputField().type("89");
      appPageObj.getResultHeading().should('not.visible');
      
      appPageObj.getSubmitButton().click().wait('@apiCall').its('response.statusCode').should('eq', 200);
      appPageObj.getResultHeading()
                .should('be.visible')
                .and('contain.text', "The median is: [37]");

      //Input a different value 
      appPageObj.getInputField().type("8");
      
      appPageObj.getSubmitButton().click().wait('@apiCall').its('response.statusCode').should('eq', 200);
      appPageObj.getResultHeading()
                .should('be.visible')
                .and('contain.text', "The median is: [3,5]");

      //Input the same value again as the first time, response should be 304
      appPageObj.getInputField().type("89");
      //Verify the previous result still appears
      appPageObj.getResultHeading().should('be.visible');
      
      appPageObj.getSubmitButton().click().wait('@apiCall').its('response.statusCode').should('eq', 304);
      appPageObj.getResultHeading()
                .should('be.visible')
                .and('contain.text', "The median is: [37]");
    });

    it('Verify 404 response on empty input and spinner shows up', () => {
      cy.intercept('GET','/api/').as('apiCall');

      appPageObj.getInputField().should('exist');
      appPageObj.getSubmitButton().click().wait('@apiCall').its('response.statusCode').should('eq', 404);

      //Verify spinner exists and user cannot give any new input
      
      //TODO (Bug: Application should not hang at this point, user should be able to enter and submit a new value) 
      appPageObj.verifySpinnerForInputIsVisible();

      // Input new value and verify submit is still disabled and spinner blocks the application.
      appPageObj.getInputField().type("4");
      appPageObj.getSubmitButton().should('be.disabled');
      appPageObj.verifySpinnerForInputIsVisible(); 
    });

    it('Verify the maximum input value', () => {
      cy.intercept('GET','/api/*').as('apiCall');
      
      //Input maximum valid value
      appPageObj.getInputField().type("10000000");
      appPageObj.getSubmitButton().click().wait('@apiCall');
      appPageObj.getResultHeading()
                .should('be.visible')
                .and('contain.text', "The median is: [4751053]");

      //Input maximum valid value with 0's in decimals
      appPageObj.getInputField().type("10000000.00000");
      appPageObj.getSubmitButton().click().wait('@apiCall');
      appPageObj.getResultHeading()
                .should('be.visible')
                .and('contain.text', "The median is: [4751053]");
          

      //Calculate for input values more than 10000000
      appPageObj.getInputField().type("10000001");
      appPageObj.getSubmitButton().click();
      cy.on('window:alert',(txt)=>{
        expect(txt).to.contains('Number exceeds limit');
      });

      appPageObj.getInputField().type("10000000.0001");
      appPageObj.getSubmitButton().click();
      cy.on('window:alert',(txt)=>{
        expect(txt).to.contains('Number exceeds limit');
      });
     });
  });
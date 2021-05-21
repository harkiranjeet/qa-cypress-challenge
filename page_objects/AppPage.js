class appPage {

    getHeadingForForm() {
        return cy.get('.mainContainer').find('h1');
    }

    getInputField() { 
        return cy.get('input[type="number"]');
    }

    getSubmitButton() {
        return cy.contains('Submit');
    }

    getResultHeading() {
        return cy.get('.mainContainer').find('h2');
    }

    verifySpinnerForInputIsVisible() {
        return cy.get('input[type="number"]').click().then(() => {
            cy.get('.fa-spinner').should('be.visible');

        });
    }

    calculateMedianOfGivenInput(input) {
        cy.intercept('/api/*').as('apiCall');
        appPageObj.getInputField().type(input);
        
        appPageObj.getSubmitButton().click().wait('@apiCall');
        return appPageObj.getResultHeading();
    }
}

const appPageObj = new appPage();
export {appPageObj}
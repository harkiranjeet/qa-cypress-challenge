describe('My First Test', () => {

    beforeEach(() => {
        cy.visit('http://127.0.0.1:3000');
    })
    
    
    it('Does not do much!', () => {
      expect(true).to.equal(true)
    });
  });
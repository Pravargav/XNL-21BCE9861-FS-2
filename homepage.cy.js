// cypress/e2e/homepage.cy.js
describe('Homepage', () => {
    it('should load the homepage', () => {
      cy.visit('/');
      cy.contains('Welcome to AI Health & Fitness Tracker');
      cy.get('h1').should('contain', 'Your Personal Health Assistant');
    });
  
    it('should have a working "Get Started" button', () => {
      cy.visit('/');
      cy.get('a[href="/signup"]').contains('Get Started').click();
      cy.url().should('include', '/signup');
    });
  });

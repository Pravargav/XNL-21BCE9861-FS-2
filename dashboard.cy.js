// cypress/e2e/dashboard.cy.js
describe('Dashboard', () => {
    beforeEach(() => {
      // Log in before each test
      cy.visit('/login');
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard');
    });
  
    it('should display the user dashboard', () => {
      cy.contains('Welcome, Test User');
      cy.get('.workout-plan').should('exist');
      cy.get('.health-insights').should('exist');
    });
  
    it('should allow users to log out', () => {
      cy.get('button').contains('Logout').click();
      cy.url().should('include', '/login');
    });
  });

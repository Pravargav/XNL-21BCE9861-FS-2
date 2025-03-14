// cypress/e2e/ai-features.cy.js
describe('AI Features', () => {
    beforeEach(() => {
      // Log in before each test
      cy.visit('/login');
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard');
    });
  
    it('should generate a workout plan', () => {
      cy.get('button').contains('Generate Workout Plan').click();
      cy.get('.workout-plan').should('contain', 'Your AI-Generated Workout Plan');
    });
  
    it('should provide health insights', () => {
      cy.get('button').contains('Get Health Insights').click();
      cy.get('.health-insights').should('contain', 'Your AI-Generated Health Insights');
    });
  });

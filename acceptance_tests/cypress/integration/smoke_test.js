describe('Smoke test', function() {
    it('Visit the application', function() {
        cy.visit('http://localhost:3000/');
        cy.contains('Eco Ideas');
        cy.contains('Home');
        cy.contains('Admin');
    })
});
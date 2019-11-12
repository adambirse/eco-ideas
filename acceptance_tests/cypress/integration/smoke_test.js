describe('Smoke test', function() {
    it('Visit the application', function() {
        cy.visit('http://localhost/');
        cy.contains('Eco Ideas');
        cy.contains('Home');
        cy.contains('Login');
        cy.contains('Register');
    })
});
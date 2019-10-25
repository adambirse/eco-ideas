describe('Smoke test', function () {

    it('Accessibility home page', function () {
        cy.visit('http://localhost:3000/');
        cy.injectAxe();
        cy.checkA11y();
    });

    it('Accessibility login page', function () {
        cy.visit('http://localhost:3000/login');
        cy.injectAxe();
        cy.checkA11y();
    });

    it('Accessibility register page', function () {
        cy.visit('http://localhost:3000/register');
        cy.injectAxe();
        cy.checkA11y();
    });
});
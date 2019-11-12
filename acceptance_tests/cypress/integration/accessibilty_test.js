describe('Smoke test', function () {

    it('Accessibility home page', function () {
        cy.visit('http://localhost/');
        cy.injectAxe();
        cy.checkA11y();
    });

    it('Accessibility login page', function () {
        cy.visit('http://localhost/login');
        cy.injectAxe();
        cy.checkA11y();
    });

    it('Accessibility register page', function () {
        cy.visit('http://localhost/register');
        cy.injectAxe();
        cy.checkA11y();
    });
});
describe('authentication', () => {
  it('shows error on failed login', () => {
    cy.visit('/login');

    const username = 'definitelynotauser99';
    const password = 'hunter2';
    cy.findByPlaceholderText(/username/i).type(username);
    cy.findByPlaceholderText(/password/i).type(`${password}{enter}`);

    cy.findByPlaceholderText(/username/i).should(
      'have.css',
      'background-color',
      'rgb(255, 205, 205)'
    );
    cy.findByPlaceholderText(/password/i).should(
      'have.css',
      'background-color',
      'rgb(255, 205, 205)'
    );
  });

  it('logs in valid user', () => {
    cy.visit('/login');

    const username = Cypress.env('USERNAME');
    const password = Cypress.env('PASSWORD');
    cy.findByPlaceholderText(/username/i).type(username);
    cy.findByPlaceholderText(/password/i).type(`${password}{enter}`, {
      log: false
    });

    // by default, valid logins take the user to the dashboard page
    cy.location('pathname').should('equal', '/');

    cy.waitForApp()
      .window()
      .its('localStorage')
      .invoke('getItem', 'access_token')
      .should('exist');

    // header (toolbar) profile section
    cy.get('header')
      .findByLabelText(/current user.*/)
      .click();

    // log user out
    cy.contains('button', 'Log out').click();

    // the homepage is public so we shouldn't have left
    cy.location('pathname').should('equal', '/');
  });
});

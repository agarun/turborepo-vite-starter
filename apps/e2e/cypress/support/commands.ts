import '@testing-library/cypress/add-commands';

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
      login(email: string, password: string): void;
      logout(): void;
      waitForApp(timeout?: string): void;
    }
  }
}

//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

export {};

// @myorg/login
let accessToken: string;
Cypress.Commands.add('login', () => {
  Cypress.log({ name: 'loginApiUser' });

  if (accessToken) {
    window.localStorage.setItem('access_token', accessToken);
  } else {
    cy.request('POST', '/auth/login', {
      username: Cypress.env('USERNAME'),
      password: Cypress.env('PASSWORD')
    })
      .its('body')
      .then(response => {
        expect(response).to.have.property('access_token');
        accessToken = response.access_token;
        window.localStorage.setItem('access_token', response.access_token);
      });
  }
});

Cypress.Commands.add('logout', () => {
  Cypress.log({ name: 'logoutApiUser' });

  window.localStorage.removeItem('access_token');
});

Cypress.Commands.add('waitForApp', timeout => {
  // Wait for all the JavaScript payloads to be lazily loaded inside the shell.
  // https://github.com/cypress-io/cypress/issues/5743#issuecomment-609972751
  cy.get('main', { log: false, timeout: 10000 }).should($main => {
    expect($main[0].childElementCount).to.be.greaterThan(1);
  });
});

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    fileServerFolder: '.',
    baseUrl: 'http://localhost:3000',
    specPattern: ['**/*.cy.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}']
  }
});

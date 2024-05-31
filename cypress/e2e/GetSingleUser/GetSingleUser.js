/// <reference types="cypress" />
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

// For Positive Case
const validUserId = 2;
const validUserApiUrl = `https://reqres.in/api/users/${validUserId}`;

// For Negative Case
const invalidUserId = 999;
const invalidUserApiUrl = `https://reqres.in/api/users/${invalidUserId}`;

Given("I make a GET request to the {string} API with a valid user ID", () => {
  cy.request('GET', validUserApiUrl).as('getResponse');
});

Given("I make a GET request to the {string} API with an invalid user ID", () => {
  cy.request({
    method: 'GET',
    url: invalidUserApiUrl,
    failOnStatusCode: false
  }).as('getResponse');
});

When('the response is successful', () => {
  cy.get('@getResponse').its('status').should('eq', 200);
});

Then('the response status should be {int}', (expectedStatus) => {
  cy.get('@getResponse').its('status').should('eq', expectedStatus);
});

Then('the response body should contain user details', () => {
  cy.get('@getResponse').its('body').should('have.property', 'data');
});

Then('the user details should include the correct user ID', () => {
  cy.get('@getResponse').its('body').should('have.property', 'data').should('have.property', 'id', validUserId);
});

Then('the response body should contain an error message indicating user not found', () => {
  cy.get('@getResponse').its('status').should('eq',404);
});
  
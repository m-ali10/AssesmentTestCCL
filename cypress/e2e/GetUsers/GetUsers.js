/// <reference types="cypress" />
import { Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

const apiUrl = "https://reqres.in/api/users?page=2";
Given("I make a GET request to the {string} API", () => {
  cy.request('GET', apiUrl).as('getResponse');
});

When('the response is successful', () => {
  cy.get('@getResponse').its('status').should('eq', 200);
});

Then('the response body should contain a list of users', () => {
  cy.get('@getResponse').its('body').should('have.property', 'data').should('be.an', 'array');
});

//For Second Scenario
Then('the response body should contain users for page {int}', () => {
  cy.get('@getResponse').its('body').then((responseBody) => {
    cy.log(JSON.stringify(responseBody))
    expect(responseBody.page).to.equal(1);
   
  });
});

Then('the number of users returned should be equal to the per-page limit', () => {
  cy.get('@getResponse').its('body').its('data').should('have.length', 6);
});

//For Scenario 3
Then('each user in the response should have an name field', () => {
  cy.get('@getResponse').its('body').its('data').each((user) => {
    expect(user).to.have.property('name');
  });
});



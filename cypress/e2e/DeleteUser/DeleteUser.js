/// <reference types="cypress" />
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

const apiUrl = "https://reqres.in/api/users/2";

Given("I make a DELETE request to the {string} API for user with ID {string}", (userId) => {
  cy.request(`DELETE`,`${apiUrl}/${userId}`).as('getResponse').then((resp)=>{
    cy.log(JSON.stringify(resp))
  });
 
});

Then('the response status should be 204', () => {
    cy.get('@getResponse').its('status').should('eq', 204);
  });

And('the response body should contain be empty', () => {
  cy.get('@getResponse').its('body').should('be.empty');
});
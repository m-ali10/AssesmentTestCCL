/// <reference types="cypress" />
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

const apiUrl = "https://reqres.in/api/users";

Given("I have an existing user with id {int}", (userId) => {
  cy.request(`GET`,`${apiUrl}/${userId}`).as('user')
});

When('I update user details with name {string} and job {string}', (name, job) => {
  cy.get('@user').then((response) => {
    const userId = response.body.id;
    cy.request('PATCH', `${apiUrl}/${userId}`, {
      name: name,
      job: job
    }).as('updateResponse');
  });
});

Then('the user details should be updated successfully', () => {
    cy.get('@updateResponse').its('status').should('eq', 200);
    cy.get('@updateResponse').its('body').should('have.property', 'updatedAt');
  });

  Given("I update user with invalid id {int}", (userId) => {
     cy.request({
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}/${userId}`
    }).as('updateResponse');
  });

  Then('response should be 404',()=>{
    cy.get('@updateResponse').its('status').should('eq',404)
  })

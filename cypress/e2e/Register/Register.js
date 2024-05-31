/// <reference types="cypress" />
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

const apiUrl = 'https://reqres.in/api/register';
let registrationData = {};

Given('I have valid registration data', () => {
  registrationData = {
    "email": "eve.holt@reqres.in",
    "password": "pistol"
  };
});
When('I send a POST request to register', () => {
  cy.request({
    method: "POST",
    url: apiUrl, 
    body: registrationData,
    failOnStatusCode: false,
  }).as('registrationResponse');
});

Then('the registration should be successful', () => {
  cy.get('@registrationResponse').its('status').should('eq', 201);
});

Then('the user should be registered successfully', () => {
  cy.get('@registrationResponse').its('status').should('eq', 200);
  cy.get('@registrationResponse').its('body').should('have.property', 'id');
  cy.get('@registrationResponse').its('body').should('have.property', 'token');
});

Given('I have invalid registration data', () => {
  registrationData = {
    "email": "sydney@fife"
  };
});

Then('the response should contain the error message {string} and status code 400', () => {
  cy.get('@registrationResponse').its('status').should('eq',400)
  cy.get('@registrationResponse').its('body').should('deep.equal', { error: 'Missing password' });
});


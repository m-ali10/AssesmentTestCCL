/// <reference types="cypress" />
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

const apiUrl = 'https://reqres.in/api/login';
let loginData = {};

Given('I have valid login data', () => {
  loginData = {
    
    "email": "eve.holt@reqres.in",
    "password": "cityslicka"

  };
});
When('I send a POST request to login', () => {
  cy.request({
    method: "POST",
    url: apiUrl, 
    body: loginData,
    failOnStatusCode: false,
  }).as('loginResponse');
});

Then('the user should be logged in successfully', () => {
  cy.get('@loginResponse').its('status').should('eq', 200);
  cy.get('@loginResponse').its('body').should('have.property', 'token');
});

Given('I have invalid login data', () => {
  loginData = {
    "email": "peter@klaven"
  };
});

Then('the response should contain the error message "Missing password"', () => {
  cy.get('@loginResponse').its('body').should('deep.equal', { error: 'Missing password' });
});


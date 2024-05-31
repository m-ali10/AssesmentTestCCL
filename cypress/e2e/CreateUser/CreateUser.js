/// <reference types="cypress" />
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

const apiURL = 'https://reqres.in/api/users';

Given("I have user data to create a new user",()=>{
    cy.fixture('user.json').as('userData');
});

When("I make a POST request to the {string} API",()=>{
    cy.get('@userData').then((userData)=>{
        cy.request('POST',apiURL, userData).as('postResponse')
    });
});

Then('the response status should be 201',()=>{
    cy.get('@postResponse').its('status').should('eq',201);
});

Then('the response body should contain the created user data',()=>{
    cy.get('@postResponse').then((res)=>{
        cy.log(JSON.stringify(res.body));
    });
});


/// <reference types="cypress" />
import {Given,When,And, Then} from 'cypress-cucumber-preprocessor/steps';

const apiURL = 'https://reqres.in/api/unknown'
Given("I make a GET request to the {string} API", ()=>{
     cy.request('GET',apiURL).as('getResponse');
});

When('the response is successful',()=>{
    cy.get('@getResponse').its('status').should('eq',200);
});

And('the response body should contain a list of resources',()=>{
    cy.get('@getResponse').its('body').should('have.property','data').should('be.an','array')
})

//Scenario 2

Then('the response body should contain resources for page {int}',(page) =>{
    cy.get('@getResponse').its('body').should('have.property', 'page', page);
});

And('the number of resources returned should be equal to the per-page limit',()=>{
    cy.get('@getResponse').its('body').its('data').should('have.length',6);
    });

//Scenario 3
Then('each resource in the response should have an id, name, year, color, and pantone value', ()=>{
    cy.get('@getResponse').its('body').its('data').each((val)=>{
        expect(val).to.have.all.keys('id','name','year','color','pantone_value');
    });
});

Given("I make a GET request to an invalid API endpoint",()=>{
    cy.request({url: apiURL+'/invalid',failOnStatusCode: false}).as('getResponse');
});

Then('the response status should be 404',()=>{
    cy.get('@getResponse').its('status').should('eq',404);
});
Then('the response body should be empty indicating resource not found', () => {
    cy.get('@getResponse').its('body').should('be.empty');
  });
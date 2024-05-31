Feature: Create User API

    Scenario: Create User Successfully
        Given I have user data to create a new user
        When I make a POST request to the "Create User" API
        Then the response status should be 201
        And the response body should contain the created user data

    
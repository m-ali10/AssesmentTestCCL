Feature: Delete API


    Scenario: Verify User Details

        Given I make a DELETE request to the "Delete User" API for user with ID "2"
        Then the response status should be 204
        And  the response body should contain be empty
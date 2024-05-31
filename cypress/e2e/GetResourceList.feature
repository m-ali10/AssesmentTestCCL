Feature: Get Resource List API

    Scenario: Ensure that a valid response is received when fetching the list of unknown resources.
        Given I make a GET request to the "Get Unknown Resources" API
        When the response is successful
        Then the response status should be 200
        And the response body should contain a list of resources

    Scenario: Verify that the correct page of resources is returned.
        Given I make a GET request to the "Get Unknown Resources" API
        When the response is successful
        Then the response body should contain resources for page 1
        And the number of resources returned should be equal to the per-page limit

    Scenario: Check that resource details are correct.
        Given I make a GET request to the "Get Unknown Resources" API
        When the response is successful
        Then each resource in the response should have an id, name, year, color, and pantone value

    Scenario: Verify that status is 404 and respone body is empty for an invalid API endpoint.
        Given I make a GET request to an invalid API endpoint
        Then the response status should be 404
        And the response body should be empty indicating resource not found
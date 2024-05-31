Feature: Get All Users

    Scenario: Validate The Response Received

        Given   I make a GET request to the "Get All Users" API
        When    the response is successful
        And     the response body should contain a list of users

    Scenario: Validate Page 2 Users Returned In Response

        Given I make a GET request to the "Get All Users" API
        When the response is successful
        Then the response body should contain users for page 2
        And the number of users returned should be equal to the per-page limit

    Scenario: Verify User Details
        Given I make a GET request to the "Get All Users" API
        When the response is successful
        Then each user in the response should have an name field
Feature: Get User by ID API

  Scenario: Positive - Valid User ID
    Given I make a GET request to the "Get User by ID" API with a valid user ID
    When the response is successful
    Then the response status should be 200
    And the response body should contain user details
    And the user details should include the correct user ID

  Scenario: Negative - Invalid User ID
    Given I make a GET request to the "Get User by ID" API with an invalid user ID
    Then the response status should be 404


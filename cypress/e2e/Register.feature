Feature: User Registration

  Scenario: Register a user successfully
    Given I have valid registration data
    When I send a POST request to register
    Then the user should be registered successfully

  Scenario: Attempt to register with invalid data
    Given I have invalid registration data
    When I send a POST request to register
    Then the response should contain the error message "Missing password" and status code 400

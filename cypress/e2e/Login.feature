Feature: User Registration

  Scenario: Login user successfully
    Given I have valid login data
    When I send a POST request to login
    Then the user should be logged in successfully

  Scenario: Attempt to login with invalid data
    Given I have invalid login data
    When I send a POST request to login
    Then the response should contain the error message "Missing password"

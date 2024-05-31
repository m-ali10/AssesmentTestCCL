Feature: Update User Details

  Scenario: Update user details successfully
    Given I have an existing user with id 2
    When I update user details with name "morpheus" and job "zion resident"
    Then the user details should be updated successfully

  Scenario: Negative Case - Attempt to update user details with invalid data
    Given I update user with invalid id 99
    Then  response should be 404

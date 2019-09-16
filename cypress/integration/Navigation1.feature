Feature: As a user I want to be able to naviate to all import and export options

    Scenario: Displaying cards on home page
        Given I am on the home page
        Then I should see a card menu with 8 cards

    Scenario: Displaying navigation in sidebar on the home page
        Given I am on the home page
        Then the sidebar should contain a link to the Metadata import page
        And the sidebar should contain a link to the Data import page
        And the sidebar should contain a link to the Event import page
        And the sidebar should contain a link to the GML import page
        And the sidebar should contain a link to the Metadata export page
        And the sidebar should contain a link to the Data export page
        And the sidebar should contain a link to the Event export page
        And the sidebar should contain a link to the Metadata Dependency export page

    Scenario: Displaying navigation in sidebar on the Metadata import
        Given I am on the Metadata import page
        Then the sidebar should contain a link to the Metadata import page
        And the sidebar should contain a link to the Data import page
        And the sidebar should contain a link to the Event import page
        And the sidebar should contain a link to the GML import page
        And the sidebar should contain a link to the Metadata export page
        And the sidebar should contain a link to the Data export page
        And the sidebar should contain a link to the Event export page
        And the sidebar should contain a link to the Metadata Dependency export page

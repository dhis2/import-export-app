Feature: 2: As a user I want to be able to naviate to all import and export options

    Scenario: Displaying cards on home page
        Given I am on the home page
        Then I should see a card menu with 8 cards

    Scenario: Displaying navigation in sidebar on the home page
        Given I am on the "home" page
        Then the sidebar should contain a link to the "Metadata Import" page
        And the sidebar should contain a link to the "Data Import" page
        And the sidebar should contain a link to the "Event Import" page
        And the sidebar should contain a link to the "GML Import" page
        And the sidebar should contain a link to the "Metadata Export" page
        And the sidebar should contain a link to the "Data Export" page
        And the sidebar should contain a link to the "Event Export" page
        And the sidebar should contain a link to the "Metadata Dependency Export" page

    Scenario: Displaying navigation in sidebar on the Metadata import
        Given I am on the "Metadata Import" page
        Then the sidebar should contain a link to the "Metadata Import" page
        And the sidebar should contain a link to the "Data Import" page
        And the sidebar should contain a link to the "Event Import" page
        And the sidebar should contain a link to the "GML Import" page
        And the sidebar should contain a link to the "Metadata Export" page
        And the sidebar should contain a link to the "Data Export" page
        And the sidebar should contain a link to the "Event Export" page
        And the sidebar should contain a link to the "Metadata Dependency Export" page

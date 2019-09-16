Feature: 3: As a user I want to be able to naviate to all import and export options

    Scenario: Displaying cards on home page
        Given I am on the home page
        Then I should see a card menu with 8 cards

    Scenario Outline: Displaying navigation in sidebar on the home page
        Given I am on the "<origin>" page
        Then the sidebar should contain a link to the "<name>" page

        Examples:
            | origin          | name                       |
            | home            | Metadata Import            |
            | home            | Data Import                |
            | home            | Event Import               |
            | home            | GML Import                 |
            | home            | Metadata Export            |
            | home            | Data Export                |
            | home            | Event Export               |
            | home            | Metadata Dependency Export |
            | Metadata Import | Metadata Import            |
            | Metadata Import | Data Import                |
            | Metadata Import | Event Import               |
            | Metadata Import | GML Import                 |
            | Metadata Import | Metadata Export            |
            | Metadata Import | Data Export                |
            | Metadata Import | Event Export               |
            | Metadata Import | Metadata Dependency Export |

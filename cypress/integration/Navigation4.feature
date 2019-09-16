Feature: As a user I want to be able to naviate to all import and export options

    Scenario: Displaying cards on home page
        Given I am on the home page
        Then I should see a card menu with 8 cards

    Scenario Outline: Displaying navigation on a page
        Given I am on the "<name>" page
        Then the sidebar should contain links to all pages
            | Metadata Import            |
            | Data Import                |
            | Event Import               |
            | GML Import                 |
            | Metadata Export            |
            | Data Export                |
            | Event Export               |
            | Metadata Dependency Export |
            | Metadata Import            |
            | Data Import                |
            | Event Import               |
            | GML Import                 |
            | Metadata Export            |
            | Data Export                |
            | Event Export               |
            | Metadata Dependency Export |

        Examples:
            | name                       |
            | home                       |
            | Metadata Import            |
            | Data Import                |
            | Event Import               |
            | GML Import                 |
            | Metadata Export            |
            | Data Export                |
            | Event Export               |
            | Metadata Dependency Export |

Feature: The user should be able to export events

    # Use defaults explicitly
    Background:
        Given the user is on the event export page
        And the more options are visible
        And the following options are set
            | name                | value       | label                                     |
            | program             | IpHINAT79UW | Child Programme                      |
            | programStages       | A03MvHHogjR | Birth                      |
            | idScheme            | UID         | Uid                                       |
            | dataElementIdScheme | UID         | Uid                                       |
            | orgUnitIdScheme     | UID         | Uid                                       |
            | occurredAfter       | 2020-01-03  |                                           |
            | occurredBefore      | 2020-01-05  |                                           |
            | format              | json        |                                           |
            | compression         | zip         |                                           |
            | includeDeleted      | false       |                                           |
            | inclusion           | SELECTED    |                                           |
        And the Sierra Leone org unit has been selected

    Scenario: The user submits the form with the default values
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user selects a different org unit
        Given the user expands the root level of the org unit tree
        When the user selects the "Bo" org unit
        And the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user selects a different program
        Given the "program" input is set to "MNCH / PNC (Adult Woman)"
        And the "programStages" input is set to "PNC Visit"
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user selects an event program
        Given the "program" input is set to "Antenatal care visit"
        And the program stages have finished loading
        Then the program stage input is hidden

    Scenario: The user submits an event program
        Given the "program" input is set to "Antenatal care visit"
        And the program stages have finished loading
        And the program stage selection is cleared
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user selects a different id scheme
        Given the "idScheme" input is set to "Code"
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user selects a different data element id scheme
        Given the "dataElementIdScheme" input is set to "Code"
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user selects a different org unit id scheme
        Given the "orgUnitIdScheme" input is set to "Code"
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user selects a different start date
        Given the "occurredAfter" input is set to "2020-01-04"
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user selects a different end date
        Given the "occurredBefore" input is set to "2020-01-06"
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user selects a different format
        Given the "format" input is set to "csv"
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user selects a no compression
        Given the "compression" input is set to ""
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user selects to include deleted
        Given the "includeDeleted" input is set to "true"
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user selects a different inclusion
        Given the "inclusion" input is set to "CHILDREN"
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The export request fails
        Given the event export request will fail
        When the export form is submitted
        Then a warning alert is shown with the error message

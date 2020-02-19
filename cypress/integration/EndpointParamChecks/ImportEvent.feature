Feature: The user should be able to import events

    # Use defaults explicitly
    Background:
        Given the user is on the event page
        And the more options are visible
        And a file has been selected
        And the following options are set
            | name            | value |
            | format          | json  |
            | dryRun          | false |
            | eventIdScheme   | UID   |
            | orgUnitIdScheme | UID   |

    Scenario: The user submits the form with the default values
        When the import form is submitted
        Then the upload request is sent with the right parameters

    Scenario: The user selects a different format
        Given the "format" input is set to "xml"
        When the import form is submitted
        Then the upload request is sent with the right parameters

    Scenario: The user selects a dry run
        Given the "dryRun" input is set to "true"
        When the import form is submitted as a dry run
        Then the upload request is sent with the right parameters

    Scenario: The user selects a different event id scheme
        Given the "eventIdScheme" input is set to "CODE"
        When the import form is submitted
        Then the upload request is sent with the right parameters

    Scenario: The user selects a different org unit id scheme
        Given the "orgUnitIdScheme" input is set to "CODE"
        When the import form is submitted
        Then the upload request is sent with the right parameters

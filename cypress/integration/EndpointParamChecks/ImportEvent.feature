Feature: The user should be able to import events

    # Use defaults explicitly
    Background:
        Given the user is on the event page
        And a file has been selected
        And the following options are set
            | name            | value | label |
            | format          | .json |       |
            | dryRun          | false |       |
            | eventIdScheme   | UID   | UID   |
            | orgUnitIdScheme | UID   | UID   |

    Scenario: The user submits the form with the default values
        When the form is submitted
        Then the upload request is sent with the right parameters

    Scenario: The user selects a different format
        Given the "format" input is set to ".xml"
        When the form is submitted
        Then the upload request is sent with the right parameters

    Scenario: The user selects a dry run
        Given the "dryRun" input is set to "true"
        When the form is submitted
        Then the upload request is sent with the right parameters

    Scenario: The user selects a different event id scheme
        Given the "eventIdScheme" input is set to "CODE" / "Code"
        When the form is submitted
        Then the upload request is sent with the right parameters

    Scenario: The user selects a different org unit id scheme
        Given the "orgUnitIdScheme" input is set to "CODE" / "Code"
        When the form is submitted
        Then the upload request is sent with the right parameters

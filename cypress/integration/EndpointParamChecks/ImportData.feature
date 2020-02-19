Feature: The user should be able to import meta data

    # Use defaults explicitly
    Background:
        Given the user is on the data import page
        And the more options are visible
        And a file has been selected
        And the following options are set
            | name                | value           |
            | format              | json            |
            | dryRun              | false           |
            | strategy            | NEW_AND_UPDATES |
            | preheatCache        | false           |
            | skipAudit           | false           |
            | dataElementIdScheme | UID             |
            | orgUnitIdScheme     | UID             |
            | idScheme            | UID             |
            | skipExistingCheck   | false           |

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

    Scenario: The user selects a different strategy
        Given the "strategy" input is set to "NEW"
        When the import form is submitted
        Then the upload request is sent with the right parameters

    Scenario: The user selects preheat cache to skip
        Given the "preheatCache" input is set to "true"
        When the import form is submitted
        Then the upload request is sent with the right parameters

    Scenario: The user selects skip the audit
        Given the "skipAudit" input is set to "true"
        When the import form is submitted
        Then the upload request is sent with the right parameters

    Scenario: The user selects a different data element id scheme
        Given the "dataElementIdScheme" input is set to "CODE"
        When the import form is submitted
        Then the upload request is sent with the right parameters

    Scenario: The user selects a different org unit id scheme
        Given the "orgUnitIdScheme" input is set to "CODE"
        When the import form is submitted
        Then the upload request is sent with the right parameters

    Scenario: The user selects a different id scheme
        Given the "idScheme" input is set to "CODE"
        When the import form is submitted
        Then the upload request is sent with the right parameters

    Scenario: The user selects skip existing check to true
        Given the "skipExistingCheck" input is set to "true"
        When the import form is submitted
        Then the upload request is sent with the right parameters

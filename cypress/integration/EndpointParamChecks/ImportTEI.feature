Feature: The user should be able to import tracked entity instances

    # Use defaults explicitly
    Background:
        Given the user is on the tracked entity instances import page
        And the more options are visible
        And a file has been selected
        And the following options are set
            | name                | value             | label |
            | format              | json              |       |
            | importMode          | COMMIT            |       |
            | identifier          | UID               |       |
            | importReportMode    | ERRORS            |       |
            | preheatMode         | REFERENCE         |       |
            | strategy            | NEW_AND_UPDATES   |       |
            | atomicMode          | ALL               |       |
            | mergeMode           | MERGE             |       |
            | flushMode           | AUTO              |       |
            | skipSharing         | false             |       |
            | skipValidation      | false             |       |
            | inclusionStrategy   | NON_NULL          |       |
            | dataElementIdScheme | UID               | Uid   |
            | idScheme            | UID               | Uid   |
            | orgUnitIdScheme     | UID               | Uid   |

    Scenario: The user submits the form with the default values
        When the import form is submitted
        Then the upload request is sent with the right parameters

    Scenario: The user selects a different format
        Given the "format" input is set to "xml"
        When the import form is submitted
        Then the upload request is sent with the right parameters

    Scenario: The user selects a import mode
        Given the "importMode" input is set to "VALIDATE"
        When the import form is submitted as a dry run
        Then the upload request is sent with the right parameters

    Scenario: The user selects a different identifier
        Given the "identifier" input is set to "CODE"
        When the import form is submitted
        Then the upload request is sent with the right parameters

    Scenario: The user selects a different import report mode
        Given the "importReportMode" input is set to "FULL"
        When the import form is submitted
        Then the upload request is sent with the right parameters

    Scenario: The user selects a different preheat mode
        Given the "preheatMode" input is set to "ALL"
        When the import form is submitted
        Then the upload request is sent with the right parameters

    Scenario: The user selects a different strategy
        Given the "strategy" input is set to "NEW"
        When the import form is submitted
        Then the upload request is sent with the right parameters

    Scenario: The user selects a different atomic mode
        Given the "atomicMode" input is set to "NONE"
        When the import form is submitted
        Then the upload request is sent with the right parameters

    Scenario: The user selects a different merge mode
        Given the "mergeMode" input is set to "REPLACE"
        When the import form is submitted
        Then the upload request is sent with the right parameters

    Scenario: The user selects a different flush mode
        Given the "flushMode" input is set to "OBJECT"
        When the import form is submitted
        Then the upload request is sent with the right parameters

    Scenario: The user selects skip sharing to be true
        Given the "skipSharing" input is set to "true"
        When the import form is submitted
        Then the upload request is sent with the right parameters

    Scenario: The user selects skip validation to be true
        Given the "skipValidation" input is set to "true"
        When the import form is submitted
        Then the upload request is sent with the right parameters

    Scenario: The user selects a different inclusion strategy
        Given the "inclusionStrategy" input is set to "ALWAYS"
        When the import form is submitted
        Then the upload request is sent with the right parameters

    Scenario: The user selects a different data element id scheme
        Given the "dataElementIdScheme" input is set to "Code"
        When the import form is submitted
        Then the upload request is sent with the right parameters

    Scenario: The user selects a different id scheme
        Given the "idScheme" input is set to "Code"
        When the import form is submitted
        Then the upload request is sent with the right parameters

    Scenario: The user selects a different org unit id scheme
        Given the "orgUnitIdScheme" input is set to "Code"
        When the import form is submitted
        Then the upload request is sent with the right parameters

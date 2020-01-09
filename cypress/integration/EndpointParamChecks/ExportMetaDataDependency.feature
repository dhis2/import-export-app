Feature: The user should be able to meta data dependency events

    # Use defaults explicitly
    Background:
        Given the user is on the meta data dependency export page
        And the following options are set
            | name        | value       |
            | objectType  | dataSets    |
            | objectList  | lyLU2wR22tC |
            | format      | json        |
            | compression | zip         |
            | skipSharing | false       |

    Scenario: The user submits the form with the default values
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user selects a different object type
        Given the "objectType" input is set to "programs"
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user selects a different object list
        Given the "objectList" input is set to "BfMAe6Itzgt"
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user selects a different format
        Given the "format" input is set to "xml"
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user selects a no compression
        Given the "compression" input is set to ""
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user selects a different skip sharing option
        Given the "skipSharing" input is set to "true"
        When the export form is submitted
        Then the download request is sent with the right parameters

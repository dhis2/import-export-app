Feature: The user should be able to import GML

    # Use defaults explicitly
    Background:
        Given the user is on the gml page
        And a file has been selected
        And the following options are set
            | name   | value |
            | dryRun | false |

    Scenario: The user submits the form with the default values
        When the form is submitted
        Then the upload request is sent with the right parameters

    Scenario: The user selects a dry run
        Given the "dryRun" input is set to "true"
        When the form is submitted
        Then the upload request is sent with the right parameters

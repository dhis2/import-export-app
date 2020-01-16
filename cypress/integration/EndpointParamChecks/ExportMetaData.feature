Feature: The user should be able to export meta data

    # Use defaults explicitly
    Background:
        Given the user is on the meta data export page
        And the following options are set
            | name        | value | label |
            | format      | .json | true  |
            | compression | .zip  | true  |
            | sharing     | false | true  |
        And all schemas have been selected

    Scenario: The user submits the form with the default values
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user deselects all schemas
        Given the schemas are all deselected
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user selects only the first schema
        Given the schemas are all deselected
        And the category option schema is selected
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user selects a different format
        Given the "format" input is set to ".xml" / "true"
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user selects a no compression
        Given the "compression" input is set to "none" / "true"
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user selects a different sharing option
        Given the "sharing" input is set to "true" / "true"
        When the export form is submitted
        Then the download request is sent with the right parameters

Feature: The user should be able to export tracked entity instances

    # Use defaults explicitly
    Background:
        Given the user is on the tracked entity instances export page
        And the more options are visible
        And the following options are set
            | name                   | value      | label |
            | orgUnitMode            | :MANUAL:   |       |
            | teiTypeFilter          | NONE       |       |
            | format                 | json       |       |
            | lastUpdatedFilter      | NONE       |       |
            | assignedUserModeFilter | true       |       |
            | assignedUserMode       | ANY        |       |
            | includeDeleted         | false      |       |
            | includeAllAttributes   | false      |       |
            | dataElementIdScheme    | UID        | Uid   |
            | orgUnitIdScheme        | UID        | Uid   |
            | idScheme               | UID        | Uid   |
        And the Sierra Leone org unit has been selected

    Scenario: The user submits the form with the default values
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user selects multiple org units
        When the user expands the root level of the org unit tree
        And the user selects the "Bo" org unit
        And the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user selects "Include children of selected organisation units"
              as organisation unit selection mode
        Given the "orgUnitMode" input is set to "CAPTURE"
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user selects a different format
        Given the "format" input is set to "xml"
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user selects to include deleted
        Given the "includeDeleted" input is set to "true"
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user selects to include all attributes
        Given the "includeAllAttributes" input is set to "true"
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

    Scenario: The user selects a different id scheme
        Given the "idScheme" input is set to "Code"
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user filters by a program
        Given the "teiTypeFilter" input is set to "PROGRAM"
        And the "program" input is set to "Child Programme"
        # programStatus "All" has value ''
        And the 'programStatus' input is set to ''
        And the 'followUpStatus' input is set to 'ALL'
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user filters by a program status
        Given the "teiTypeFilter" input is set to "PROGRAM"
        And the "program" input is set to "Child Programme"
        And the 'programStatus' input is set to 'ACTIVE'
        And the 'followUpStatus' input is set to 'ALL'
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user filters by a program follow up status
        Given the "teiTypeFilter" input is set to "PROGRAM"
        And the "program" input is set to "Child Programme"
        And the 'programStatus' input is set to ''
        And the 'followUpStatus' input is set to 'TRUE'
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user filters by a program start date
        Given the "teiTypeFilter" input is set to "PROGRAM"
        And the "program" input is set to "Child Programme"
        And the 'programStatus' input is set to ''
        And the 'followUpStatus' input is set to 'ALL'
        And the 'programStartDate' input is set to '2019-12-12'
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user filters by a program end date
        Given the "teiTypeFilter" input is set to "PROGRAM"
        And the "program" input is set to "Child Programme"
        And the 'programStatus' input is set to ''
        And the 'followUpStatus' input is set to 'ALL'
        And the 'programEndDate' input is set to '2019-12-12'
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user filters by a tracked entity type
        Given the "teiTypeFilter" input is set to "TE"
        And the "trackedEntityType" input is set to "Person"
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user filters by a last updated start date
        Given the "lastUpdatedFilter" input is set to "DATE"
        And the 'lastUpdatedStartDate' input is set to '2019-12-12'
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user filters by a last updated end date
        Given the "lastUpdatedFilter" input is set to "DATE"
        And the 'lastUpdatedEndDate' input is set to '2019-12-12'
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user filters by a last updated duration
        Given the "lastUpdatedFilter" input is set to "DURATION"
        And the 'lastUpdatedDuration' input is set to '100d50h25m12s'
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user selects a different assigned user mode
        Given the "assignedUserMode" input is set to "CURRENT"
        When the export form is submitted
        Then the download request is sent with the right parameters

    Scenario: The user filters by a provided user
        Given the "assignedUserMode" input is set to "PROVIDED"
        And the "assignedUser" input is set to "John Barnes"
        When the export form is submitted
        Then the download request is sent with the right parameters

Feature: The user should be able to import meta data

    # Use defaults explicitly
    Background:
        Given the user is on the meta data import page
        And the more options are visible
        And a file has been selected
        And the following options are set
            | name              | value             |
            | format            | json              |
            | importMode        | COMMIT            |
            | identifier        | UID               |
            | importReportMode  | ERRORS            |
            | importStrategy    | CREATE_AND_UPDATE |
            | atomicMode        | ALL               |
            | flushMode         | AUTO              |
            | skipSharing       | false             |
            | skipValidation    | false             |
            | async             | true              |

    Scenario: The user submits the form with the default values
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

    Scenario: The user selects a different import strategy
        Given the "importStrategy" input is set to "CREATE"
        When the import form is submitted
        Then the upload request is sent with the right parameters

    Scenario: The user selects a different atomic mode
        Given the "atomicMode" input is set to "NONE"
        When the import form is submitted
        Then the upload request is sent with the right parameters

    # Merge mode is no longer user-selectable on this page - it is always
    # sent as REPLACE (see src/components/MergeOperation/MergeOperation.jsx
    # and src/pages/MetadataImport/MetadataImport.jsx, which renders
    # <MergeOperationNotice /> instead of the interactive <MergeMode />
    # radio group), so there is no way to select a different one.
    # Scenario: The user selects a different merge mode
    #     Given the "mergeMode" input is set to "REPLACE"
    #     When the import form is submitted
    #     Then the upload request is sent with the right parameters

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

    Scenario: The user selects async to be false
        Given the "async" input is set to "false"
        When the import form is submitted
        Then the upload request is sent with the right parameters

    # Inclusion strategy moved from this page to the metadata export page
    # (see src/pages/MetadataImport/MetadataImport.jsx and
    # src/pages/MetadataExport/MetadataExport.jsx, commit
    # c772035d60d18a98ad4a1ad5fe761a5986668d44 "fix: move inclusion
    # strategy to export") - there is no <InclusionStrategy /> control on
    # this page any more and the upload request no longer includes an
    # inclusionStrategy param, so this scenario has no equivalent here.
    # See ExportMetaData.feature's "The user selects a different inclusion
    # strategy" scenario for the migrated version of this test.
    # Scenario: The user selects a different inclusion strategy
    #     Given the "inclusionStrategy" input is set to "ALWAYS"
    #     When the import form is submitted
    #     Then the upload request is sent with the right parameters

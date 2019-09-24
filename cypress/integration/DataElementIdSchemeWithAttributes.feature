Feature: Offer attributes as options in data element id scheme input

    All unique attributes associated with data elements should
    be available as options in the data element id scheme input

    Scenario: An attribute is associated with data elements when importing data
        Given an attribute is associated with data elements
        And the user is on the data import page
        Then it should be a selectable option in the data element id scheme input

    Scenario: An attribute is associated with data elements when exporting data
        Given an attribute is associated with data elements
        And the user is on the data export page
        Then it should be a selectable option in the data element id scheme input

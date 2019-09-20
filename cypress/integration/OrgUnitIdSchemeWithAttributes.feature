Feature: Offer attributes as options in organisation unit id scheme input

    All unique attributes assiciated with organisation units should
    be available as options in the organisation unit id scheme input

    Scenario: An attribute is associated with organisation units when importing data
        Given the user is on the data import page
        And an attribute is associated with organisation units
        Then it should be a selectable option in the organisation unit id scheme input

    Scenario: An attribute is associated with organisation units when exporting data
        Given the user is on the data export page
        And an attribute is associated with organisation units
        Then it should be a selectable option in the organisation unit id scheme input

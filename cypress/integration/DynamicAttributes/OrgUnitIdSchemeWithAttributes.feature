Feature: Offer attributes as options in organisation unit id scheme input

    All unique attributes assiciated with organisation units should
    be available as options in the organisation unit id scheme input

    Scenario: A unique attribute is associated with organisation units when importing data
        Given a unique attribute is associated with organisation units
        And the user is on the data import page
        Then it should be a selectable option in the organisation unit id scheme input

    Scenario: A unique attribute is associated with organisation units when exporting data
        Given a unique attribute is associated with organisation units
        And the user is on the data export page
        Then it should be a selectable option in the organisation unit id scheme input

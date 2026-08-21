Feature: Offer common attributes as options in id scheme input

    All unique attributes associated with data elements and org units should
    be available as option in the id scheme input

    Scenario Outline: A unique attribute is only associated with data elements
        Given a unique attribute is associated with "data elements" but not with "org units"
        And the user is on the data <type> page
        Then it should not be an option in the id scheme input

        Examples:
            | type   |
            | import |
            | export |

    Scenario Outline: A unique attribute is only associated with organisation units
        Given a unique attribute is associated with "org units" but not with "data elements"
        And the user is on the data <type> page
        Then it should not be an option in the id scheme input

        Examples:
            | type   |
            | import |
            | export |

    Scenario Outline: A unique attribute is associated with both data elements and organisation units
        Given a unique attribute is associated with org units and data elements
        And the user is on the data <type> page
        Then it should be a selectable option in the id scheme input

        Examples:
            | type   |
            | import |
            | export |

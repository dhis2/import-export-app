Feature: Offer common attributes as options in id scheme input

    All unique attributes associated with data elements and org units should
    be available as option in the id scheme input

    Scenario Outline: An attribute is only associated with data elements
        Given the user is on the data <type> page
        Given an attribute is associated with "data elemnts" but not with "org units"
        Then it should not be an option in the id scheme input

        Examples:
            | type   |
            | import |
            | export |

    Scenario Outline: An attribute is only associated with organisation units
        Given the user is on the data <type> page
        Given an attribute is associated with "org units" but not with "data elements"
        Then it should not be an option in the id scheme input

        Examples:
            | type   |
            | import |
            | export |

    Scenario Outline: An attribute is associated with both data elements and organisation units
        Given the user is on the data <type> page
        Given an attribute is associated with org units and data elements
        Then it should be a selectable option in the id scheme input

        Examples:
            | type   |
            | import |
            | export |

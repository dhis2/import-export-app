const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

const selectYear = (prevYear, nextYear) => {
    cy.get(`div[style="cursor: pointer;"]:contains("${prevYear}")`).click()

    cy.get(`button > span:contains("${nextYear}")`).click()
}

const selectMonth = (nextYear, prevMonth, nextMonth) => {
    const prevMonthNum = parseInt(prevMonth, 10)
    const nextMonthNum = parseInt(nextMonth, 10)
    const diff = nextMonthNum - prevMonthNum

    const monthLabel = months[parseInt(prevMonth, 10) - 1]
    cy.get(
        `div[style="height: inherit; padding-top: 12px;"]:contains("${monthLabel} ${nextYear}")`
    ).as('$$selectDate__monthLabel')

    cy.get('@$$selectDate__monthLabel')
        .parent()
        .parent()
        // get the button to change the month
        .then($parent =>
            diff < 0 ? cy.wrap($parent).prev() : cy.wrap($parent).next()
        )
        .then($button => {
            const absDiff = Math.abs(diff)
            for (let i = 0; i < absDiff; ++i) {
                cy.wrap($button).click()
                const curMonthLabel = months[parseInt(prevMonth, 10) - 2 - i]
                cy.get(
                    `div[style="height: inherit; padding-top: 12px;"]:contains("${curMonthLabel} ${nextYear}")`
                )
            }
        })
}

const selectDay = nextDay => {
    cy.get('button > div + span:visible').then($spans => {
        const nextDayNum = parseInt(nextDay, 10)
        const $actualButton = $spans
            .filter((_, span) => {
                const spanDayNum = parseInt(Cypress.$(span).text(), 10)
                return nextDayNum === spanDayNum
            })
            .filter(':visible')

        cy.wrap($actualButton)
            .parents('button')
            .click()
    })
}

const selectDate = (name, value) => {
    const prevDate = cy.get(`[name="${name}"]`).then($input => {
        const prevDate = $input.val()

        const [prevYear, prevMonth, prevDay] = prevDate.split('-')
        const [nextYear, nextMonth, nextDay] = value.split('-')

        // open mui date picker
        cy.wrap($input).click()

        if (prevYear !== nextYear) {
            selectYear(prevYear, nextYear)
        }

        if (prevMonth !== nextMonth) {
            selectMonth(nextYear, prevMonth, nextMonth)
            cy.wait(1000)
        }

        selectDay(nextDay)
    })

    return cy
}

Cypress.Commands.add('selectDate', selectDate)

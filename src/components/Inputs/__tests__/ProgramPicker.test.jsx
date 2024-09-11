import { ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import { render } from '@testing-library/react'

import { useDataQuery } from '@dhis2/app-runtime'
import { ProgramPicker } from '../ProgramPicker.jsx'
import {
    programQuery,
    programWithEventsQuery,
} from '../../ResourcePicker/queries.js'

jest.mock('@dhis2/app-runtime', () => ({
    ...jest.requireActual('@dhis2/app-runtime'),
    // eslint-disable-next-line no-unused-vars
    useDataQuery: jest.fn((query, options) => ({ refetch: () => {} })),
}))

const renderWithFormWrapper = (children) =>
    render(
        <ReactFinalForm.Form onSubmit={() => {}}>
            {() => <form>{children}</form>}
        </ReactFinalForm.Form>
    )

describe('ProgramPicker', () => {
    test('it invokes useDataQuery with programs query by default', () => {
        renderWithFormWrapper(<ProgramPicker />)
        expect(useDataQuery).toHaveBeenCalledWith(
            programQuery,
            expect.anything()
        )
    })

    test('it invokes useDataQuery with programs and events query if includeEvents is true', () => {
        renderWithFormWrapper(<ProgramPicker includeEvents />)
        expect(useDataQuery).toHaveBeenCalledWith(
            programWithEventsQuery,
            expect.anything()
        )
    })
})

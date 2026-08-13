import { ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import { render, fireEvent } from 'test-utils'
import { useObjects } from '../../../hooks/index.js'
import { Objects } from '../Objects.jsx'

jest.mock('../../../hooks/index.js', () => ({
    useObjects: jest.fn(),
}))

const { Form } = ReactFinalForm

const renderWithFormWrapper = (objectType) =>
    render(
        <Form onSubmit={() => {}}>
            {({ form }) => (
                <form>
                    <Objects form={form} objectType={objectType} />
                </form>
            )}
        </Form>
    )

describe('Objects', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('shows the empty message when the select is opened and there are no available objects', () => {
        useObjects.mockReturnValue({
            loading: false,
            error: undefined,
            validationText: undefined,
            objects: [],
        })

        const { getByDataTest, getByText } =
            renderWithFormWrapper('dataElement')

        fireEvent.click(getByDataTest('dhis2-uicore-select-input'))

        expect(
            getByText(
                'There are no objects of the selected object type, or you do not have permission to view them'
            )
        ).toBeInTheDocument()
    })
})

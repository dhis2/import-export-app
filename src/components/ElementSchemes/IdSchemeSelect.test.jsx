import { ReactFinalForm } from '@dhis2/ui'
import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { fetchAttributes } from '../../utils/helper.js'
import { IdSchemeSelect } from './IdSchemeSelect.jsx'

jest.mock('@dhis2/app-runtime', () => ({
    ...jest.requireActual('@dhis2/app-runtime'),
    useConfig: () => ({ baseUrl: 'http://test' }),
}))

jest.mock('../../utils/helper.js', () => ({
    ...jest.requireActual('../../utils/helper.js'),
    fetchAttributes: jest.fn(() => Promise.resolve([])),
}))

const renderInForm = (children) =>
    render(
        <ReactFinalForm.Form onSubmit={() => {}}>
            {() => <form>{children}</form>}
        </ReactFinalForm.Form>
    )

beforeEach(() => {
    fetchAttributes.mockClear()
})

describe('IdSchemeSelect', () => {
    it('does not fetch attribute schemes when none are configured', () => {
        renderInForm(
            <IdSchemeSelect name="idScheme" label="ID scheme" dataTest="x" />
        )

        expect(fetchAttributes).not.toHaveBeenCalled()
    })

    it('fetches every configured attribute type', async () => {
        renderInForm(
            <IdSchemeSelect
                name="idScheme"
                label="ID scheme"
                dataTest="x"
                attributeTypes={[
                    'dataElementAttribute',
                    'organisationUnitAttribute',
                ]}
            />
        )

        await waitFor(() =>
            expect(fetchAttributes).toHaveBeenCalledWith(
                'http://test/api/',
                'dataElementAttribute'
            )
        )
        expect(fetchAttributes).toHaveBeenCalledWith(
            'http://test/api/',
            'organisationUnitAttribute'
        )
    })

    it('renders the field label', () => {
        const { getByText } = renderInForm(
            <IdSchemeSelect
                name="categoryIdScheme"
                label="Category ID scheme"
                dataTest="x"
            />
        )

        expect(getByText('Category ID scheme')).toBeInTheDocument()
    })
})

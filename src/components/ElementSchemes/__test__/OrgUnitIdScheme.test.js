import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { render, waitForElement, fireEvent, cleanup } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'

import { SchemeContext } from '../../../contexts/'
import { orgUnitIdSchemeOptions } from '../../../utils/options'
import { OrgUnitIdScheme } from '../'

import '@dhis2/app-runtime'
import { fetchAttributes } from '../../../utils/helper'

jest.mock('@dhis2/app-runtime', () => ({
    useConfig: jest.fn(() => ({ baseUrl: 'http://localhost:8080' })),
}))

const mockFetchAttributesSuccessResponse = [
    { value: 'abc', label: 'ABC' },
    { value: 'def', label: 'DEF' },
]

jest.mock('../../../utils/helper', () => ({
    fetchAttributes: jest.fn(() =>
        Promise.resolve(mockFetchAttributesSuccessResponse)
    ),
}))

const props = {
    selected: orgUnitIdSchemeOptions[0],
    setSelected: jest.fn(),
    dataTest: 'org-unit-id-scheme',
}

afterEach(() => {
    cleanup()
    jest.clearAllMocks()
})

const renderContext = (contextValue, props) =>
    render(
        <SchemeContext.Provider value={contextValue}>
            <OrgUnitIdScheme {...props} />
        </SchemeContext.Provider>
    )

test('additonal schemas are fetched when not loaded', async () => {
    const updateSchema = jest.fn()
    const contextValue = {
        OrgUnitId: {
            options: [],
            loaded: false,
            error: false,
        },
        updateSchema,
    }

    const { getByDataTest, getByText } = renderContext(contextValue, props)

    // loading icon should be showing in drop down
    fireEvent.click(getByText(orgUnitIdSchemeOptions[0].label))
    const loading = await waitForElement(() =>
        getByDataTest('dhis2-uicore-circularloader')
    )
    expect(loading).toBeInTheDocument()

    // updateSchema is called with new value for OrgUnitId
    expect(fetchAttributes).toHaveBeenCalledTimes(1)
    expect(fetchAttributes).toHaveBeenCalledWith(
        'http://localhost:8080/api/',
        'organisationUnitAttribute'
    )
    expect(updateSchema).toHaveBeenCalledWith('OrgUnitId', {
        options: mockFetchAttributesSuccessResponse,
        loaded: true,
        error: false,
    })
})

test('additional schemas are shown when loaded', async () => {
    const updateSchema = jest.fn()
    const contextValue = {
        OrgUnitId: {
            options: mockFetchAttributesSuccessResponse,
            loaded: true,
            error: false,
        },
        updateSchema,
    }

    const {
        getByDataTest,
        queryByDataTest,
        getAllByDataTest,
        getByText,
    } = renderContext(contextValue, props)

    // loading icon should not be showing
    fireEvent.click(getByText(orgUnitIdSchemeOptions[0].label))
    await waitForElement(() => getByDataTest('dhis2-uicore-backdrop'))
    const loading = queryByDataTest('dhis2-uicore-circularloader')
    expect(loading).toEqual(null)

    // additional attributes should be showing
    const firstAdditonal = getByText(
        mockFetchAttributesSuccessResponse[0].label
    )
    expect(firstAdditonal).toBeVisible()
    const listElements = getAllByDataTest('dhis2-uicore-singleselectoption')
    expect(listElements).toHaveLength(
        orgUnitIdSchemeOptions.length +
            mockFetchAttributesSuccessResponse.length
    )
})

test('additional schemas fail to load and an error is shown ', async () => {
    const updateSchema = jest.fn()
    const contextValue = {
        OrgUnitId: {
            options: [],
            loaded: false,
            error: false,
        },
        updateSchema,
    }

    fetchAttributes.mockImplementation(() => Promise.reject(new Error('404')))

    const { getByDataTest, getByText } = renderContext(contextValue, props)

    // loading icon should be showing in drop down
    fireEvent.click(getByText(orgUnitIdSchemeOptions[0].label))
    const loading = await waitForElement(() =>
        getByDataTest('dhis2-uicore-circularloader')
    )
    expect(loading).toBeInTheDocument()

    // fetchAttributes rejects and updateSchema is not called
    expect(fetchAttributes).toHaveBeenCalledTimes(1)
    expect(updateSchema).toHaveBeenCalledTimes(0)

    // error message should be showing
    const errorMessage = getByDataTest('org-unit-id-scheme-ssf-validation')
    expect(errorMessage).toBeInTheDocument()
    expect(errorMessage).toHaveTextContent(
        i18n.t(
            'Something went wrong when loading the additional organisation unit ID schemes : 404'
        )
    )
})

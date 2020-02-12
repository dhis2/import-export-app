import React from 'react'
import { render, waitForElement, fireEvent, cleanup } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'

import { SchemeContext } from '../../../contexts/'
import { idSchemeOptions } from '../../../utils/options'
import { IdScheme } from '../'

import '@dhis2/app-runtime'

jest.mock('@dhis2/app-runtime', () => ({
    useConfig: jest.fn(() => ({ baseUrl: 'http://localhost:8080' })),
}))

const props = {
    selected: idSchemeOptions[0],
    setSelected: jest.fn(),
    dataTest: 'id-scheme',
}

afterEach(() => {
    cleanup()
    jest.clearAllMocks()
})

const renderContext = (contextValue, props) =>
    render(
        <SchemeContext.Provider value={contextValue}>
            <IdScheme {...props} />
        </SchemeContext.Provider>
    )

test('loading when OrgUnitId or DataElementId schemas are not loaded', async () => {
    const updateSchema = jest.fn()
    const contextValue = {
        OrgUnitId: {
            options: [],
            loaded: false,
            error: false,
        },
        DataElementId: {
            options: [],
            loaded: false,
            error: false,
        },
        Id: {
            options: [],
            loaded: false,
            error: false,
        },
        updateSchema,
    }

    const { getByDataTest, getByText } = renderContext(contextValue, props)

    // loading icon should be showing in drop down
    fireEvent.click(getByText(idSchemeOptions[0].label))
    const loading = await waitForElement(() =>
        getByDataTest('dhis2-uicore-circularloader')
    )
    expect(loading).toBeInTheDocument()
})

test('additional schemas have been fetched', async () => {
    const additionalOrgUnitIdSchemas = [
        { value: 'abc', label: 'ABC' },
        { value: 'def', label: 'DEF' },
        { value: 'ghi', label: 'GHI' },
    ]

    const additionalDataElementIdSchemas = [
        { value: 'abc', label: 'ABC' },
        { value: 'def', label: 'DEF' },
    ]

    const updateSchema = jest.fn()
    const contextValue = {
        OrgUnitId: {
            options: additionalOrgUnitIdSchemas,
            loaded: true,
            error: false,
        },
        DataElementId: {
            options: additionalDataElementIdSchemas,
            loaded: true,
            error: false,
        },
        Id: {
            options: [],
            loaded: false,
            error: false,
        },
        updateSchema,
    }

    const { getByDataTest, getByText } = renderContext(contextValue, props)

    // loading icon should be showing
    fireEvent.click(getByText(idSchemeOptions[0].label))
    await waitForElement(() => getByDataTest('dhis2-uicore-backdrop'))
    const loading = getByDataTest('dhis2-uicore-circularloader')
    expect(loading).toBeVisible()

    // updateSchema should be called with the shared attributes
    expect(updateSchema).toHaveBeenCalledTimes(1)
    expect(updateSchema).toHaveBeenCalledWith('Id', {
        options: [
            { value: 'abc', label: 'ABC' },
            { value: 'def', label: 'DEF' },
        ],
        loaded: true,
        error: false,
    })
})

test('shared schemas should be showing', async () => {
    const additionalOrgUnitIdSchemas = [
        { value: 'abc', label: 'ABC' },
        { value: 'def', label: 'DEF' },
        { value: 'ghi', label: 'GHI' },
    ]

    const additionalDataElementIdSchemas = [
        { value: 'abc', label: 'ABC' },
        { value: 'def', label: 'DEF' },
    ]

    const updateSchema = jest.fn()
    const contextValue = {
        OrgUnitId: {
            options: additionalOrgUnitIdSchemas,
            loaded: true,
            error: false,
        },
        DataElementId: {
            options: additionalDataElementIdSchemas,
            loaded: true,
            error: false,
        },
        Id: {
            options: [
                { value: 'abc', label: 'ABC' },
                { value: 'def', label: 'DEF' },
            ],
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

    // loading icon should be showing
    fireEvent.click(getByText(idSchemeOptions[0].label))
    await waitForElement(() => getByDataTest('dhis2-uicore-backdrop'))
    const loading = queryByDataTest('dhis2-uicore-circularloader')
    expect(loading).toEqual(null)

    // shared attributes should be showing
    const firstShared = getByText(contextValue.Id.options[0].label)
    expect(firstShared).toBeVisible()
    const listElements = getAllByDataTest('dhis2-uicore-singleselectoption')
    expect(listElements).toHaveLength(
        idSchemeOptions.length + contextValue.Id.options.length
    )
})

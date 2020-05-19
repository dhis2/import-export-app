import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { render, waitFor, fireEvent } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'
import { CustomDataProvider } from '@dhis2/app-runtime'

import { DataSetPicker } from '../'

const customData = {
    dataSets: {
        dataSets: [
            { id: 'lyLU2wR22tC', displayName: 'ART monthly summary' },
            { id: 'BfMAe6Itzgt', displayName: 'Child Health' },
            { id: 'Lpw6GcnTrmS', displayName: 'Emergency Response' },
        ],
    },
}

const props = {
    selected: [],
    setSelected: () => 1,
    multiSelect: false,
    withFilter: false,
    withActions: false,
    meta: {},
    label: 'Data set',
    dataTest: 'data-set-picker',
}

test('data sets load and are shown in a list', async () => {
    const setSelected = jest.fn()

    const { getByDataTest, getAllByDataTest, getByText } = render(
        <CustomDataProvider data={customData}>
            <DataSetPicker {...props} setSelected={setSelected} />
        </CustomDataProvider>
    )

    const loading = getByDataTest('data-set-picker-loading')
    expect(loading).toBeInTheDocument()

    // loading has finished
    await waitFor(() => getByDataTest('data-set-picker-list'))
    expect(loading).not.toBeInTheDocument()

    const listElements = getAllByDataTest(/data-set-picker-list-body-li-*/)
    expect(listElements).toHaveLength(customData.dataSets.dataSets.length)

    // all data sets are in the document
    customData.dataSets.dataSets.forEach(d => {
        const el = getByDataTest(`data-set-picker-list-body-li-${d.id}`)
        expect(el).toHaveTextContent(d.displayName)
    })

    // clicking on first item fires setSelected
    const firstItem = customData.dataSets.dataSets[0]
    fireEvent.click(getByText(firstItem.displayName))
    expect(setSelected).toHaveBeenCalledTimes(1)
    expect(setSelected).toHaveBeenLastCalledWith([firstItem.id])
})

test('data sets fail to load and an error is shown', async () => {
    // suppress console errors
    console.error = jest.fn()

    const { getByDataTest, getByText } = render(
        <CustomDataProvider data={{}}>
            <DataSetPicker {...props} />
        </CustomDataProvider>
    )

    const loading = getByDataTest('data-set-picker-loading')
    expect(loading).toBeInTheDocument()

    // loading has finished
    await waitFor(() =>
        getByText(i18n.t('Something went wrong when loading the data sets!'))
    )
    expect(loading).not.toBeInTheDocument()
})

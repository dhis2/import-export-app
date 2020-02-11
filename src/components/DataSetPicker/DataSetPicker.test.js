import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { render, waitForElement } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'
import { CustomDataProvider } from '@dhis2/app-runtime'

import { DataSetPicker } from '.'

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
    dataTest: 'data-set-picker',
}

test('data sets load and are shown in a list', async () => {
    const { getByDataTest, getAllByDataTest } = render(
        <CustomDataProvider data={customData}>
            <DataSetPicker {...props} />
        </CustomDataProvider>
    )

    const loading = getByDataTest('data-set-picker-loading')
    expect(loading).toBeInTheDocument()

    await waitForElement(() => getByDataTest('data-set-picker-list'))
    expect(loading).not.toBeInTheDocument()

    const listElements = getAllByDataTest(/data-set-picker-list-body-li-*/)
    expect(listElements).toHaveLength(customData.dataSets.dataSets.length)

    customData.dataSets.dataSets.forEach(d => {
        const el = getByDataTest(`data-set-picker-list-body-li-${d.id}`)
        expect(el).toHaveTextContent(d.displayName)
    })
})

test('data sets fails to load and an error is shown', async () => {
    console.error = jest.fn()

    const { getByDataTest, getByText } = render(
        <CustomDataProvider data={{}}>
            <DataSetPicker {...props} />
        </CustomDataProvider>
    )

    const loading = getByDataTest('data-set-picker-loading')
    expect(loading).toBeInTheDocument()

    await waitForElement(() =>
        getByText(i18n.t('Something went wrong when loading the data sets!'))
    )
    expect(loading).not.toBeInTheDocument()
})

import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { render, waitForElement, fireEvent } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'
import { CustomDataProvider } from '@dhis2/app-runtime'

import { TETypePicker } from '../'

const customData = {
    trackedEntityTypes: {
        trackedEntityTypes: [
            { id: 'lxAQ7Zs9VYR', displayName: 'Antenatal care visit' },
            { id: 'IpHINAT79UW', displayName: 'Child Programme' },
            { id: 'kla3mAPgvCH', displayName: 'Contraceptives Program' },
        ],
    },
}

const props = {
    selected: [],
    setSelected: () => 1,
    multiSelect: false,
    withFilter: false,
    withActions: false,
    autoSelectFirst: true,
    meta: {},
    label: 'Tracked entity type',
    dataTest: 'te-type-picker',
}

test('tracked entity types load and are shown in a list', async () => {
    const setSelected = jest.fn()

    const { getByDataTest, getAllByDataTest, getByText } = render(
        <CustomDataProvider data={customData}>
            <TETypePicker {...props} setSelected={setSelected} />
        </CustomDataProvider>
    )

    const loading = getByDataTest('te-type-picker-loading')
    expect(loading).toBeInTheDocument()

    // loading has finished
    await waitForElement(() => getByDataTest('te-type-picker-list'))
    expect(loading).not.toBeInTheDocument()

    const listElements = getAllByDataTest(/te-type-picker-list-body-li-*/)
    expect(listElements).toHaveLength(
        customData.trackedEntityTypes.trackedEntityTypes.length
    )

    // all tracked entity types are in the document
    customData.trackedEntityTypes.trackedEntityTypes.forEach(d => {
        const el = getByDataTest(`te-type-picker-list-body-li-${d.id}`)
        expect(el).toHaveTextContent(d.displayName)
    })

    // clicking on first item fires setSelected
    const firstItem = customData.trackedEntityTypes.trackedEntityTypes[0]
    fireEvent.click(getByText(firstItem.displayName))
    expect(setSelected).toHaveBeenCalledTimes(2)
    expect(setSelected).toHaveBeenLastCalledWith([firstItem.id])
})

test('tracked entity types fail to load and an error is shown', async () => {
    // suppress console errors
    console.error = jest.fn()

    const { getByDataTest, getByText } = render(
        <CustomDataProvider data={{}}>
            <TETypePicker {...props} />
        </CustomDataProvider>
    )

    const loading = getByDataTest('te-type-picker-loading')
    expect(loading).toBeInTheDocument()

    // loading has finished
    await waitForElement(() =>
        getByText(
            i18n.t(
                'Something went wrong when loading the tracked entity types!'
            )
        )
    )
    expect(loading).not.toBeInTheDocument()
})

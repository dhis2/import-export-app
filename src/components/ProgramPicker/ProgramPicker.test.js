import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { render, waitForElement, fireEvent } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'
import { CustomDataProvider } from '@dhis2/app-runtime'

import { ProgramPicker } from '.'

const customData = {
    programs: {
        programs: [
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
    meta: {},
    label: 'Program',
    dataTest: 'program-picker',
}

test('programs load and are shown in a list', async () => {
    const setSelected = jest.fn()

    const { getByDataTest, getAllByDataTest, getByText } = render(
        <CustomDataProvider data={customData}>
            <ProgramPicker {...props} setSelected={setSelected} />
        </CustomDataProvider>
    )

    const loading = getByDataTest('program-picker-loading')
    expect(loading).toBeInTheDocument()

    // loading has finished
    await waitForElement(() => getByDataTest('program-picker-list'))
    expect(loading).not.toBeInTheDocument()

    const listElements = getAllByDataTest(/program-picker-list-body-li-*/)
    expect(listElements).toHaveLength(customData.programs.programs.length)

    // all data sets are in the document
    customData.programs.programs.forEach(d => {
        const el = getByDataTest(`program-picker-list-body-li-${d.id}`)
        expect(el).toHaveTextContent(d.displayName)
    })

    // clicking on first item fires setSelected
    const firstItem = customData.programs.programs[0]
    fireEvent.click(getByText(firstItem.displayName))
    expect(setSelected).toHaveBeenCalledTimes(1)
    expect(setSelected).toHaveBeenLastCalledWith([firstItem.id])
})

test('programs fail to load and an error is shown', async () => {
    // suppress console errors
    console.error = jest.fn()

    const { getByDataTest, getByText } = render(
        <CustomDataProvider data={{}}>
            <ProgramPicker {...props} />
        </CustomDataProvider>
    )

    const loading = getByDataTest('program-picker-loading')
    expect(loading).toBeInTheDocument()

    // loading has finished
    await waitForElement(() =>
        getByText(i18n.t('Something went wrong when loading the programs!'))
    )
    expect(loading).not.toBeInTheDocument()
})

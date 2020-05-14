import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { render, waitForElement, fireEvent } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'
import { CustomDataProvider } from '@dhis2/app-runtime'

import { UserPicker } from '../'

const customData = {
    users: {
        users: [
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
    label: 'Users',
    dataTest: 'user-picker',
}

test('users load and are shown in a list', async () => {
    const setSelected = jest.fn()

    const { getByDataTest, getAllByDataTest, getByText } = render(
        <CustomDataProvider data={customData}>
            <UserPicker {...props} setSelected={setSelected} />
        </CustomDataProvider>
    )

    const loading = getByDataTest('user-picker-loading')
    expect(loading).toBeInTheDocument()

    // loading has finished
    await waitForElement(() => getByDataTest('user-picker-list'))
    expect(loading).not.toBeInTheDocument()

    const listElements = getAllByDataTest(/user-picker-list-body-li-*/)
    expect(listElements).toHaveLength(customData.users.users.length)

    // all tracked entity types are in the document
    customData.users.users.forEach(d => {
        const el = getByDataTest(`user-picker-list-body-li-${d.id}`)
        expect(el).toHaveTextContent(d.displayName)
    })

    // clicking on first item fires setSelected
    const firstItem = customData.users.users[0]
    fireEvent.click(getByText(firstItem.displayName))
    expect(setSelected).toHaveBeenCalledTimes(2)
    expect(setSelected).toHaveBeenLastCalledWith([firstItem.id])
})

test('users fail to load and an error is shown', async () => {
    // suppress console errors
    console.error = jest.fn()

    const { getByDataTest, getByText } = render(
        <CustomDataProvider data={{}}>
            <UserPicker {...props} />
        </CustomDataProvider>
    )

    const loading = getByDataTest('user-picker-loading')
    expect(loading).toBeInTheDocument()

    // loading has finished
    await waitForElement(() =>
        getByText(i18n.t('Something went wrong when loading the users!'))
    )
    expect(loading).not.toBeInTheDocument()
})

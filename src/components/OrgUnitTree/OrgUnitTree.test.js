import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { render, waitForElement, fireEvent } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'
import { CustomDataProvider } from '@dhis2/app-runtime'

import { OrgUnitTree } from '.'

// maybe use a function resource here for children instead?
// https://github.com/dhis2/app-runtime/blob/master/services/data/src/links/CustomDataLink.ts#L61-L68
const customData = {
    organisationUnits: {
        organisationUnits: [
            {
                id: 'ImspTQPwCqd',
                path: '/ImspTQPwCqd',
                children: true,
                displayName: 'Sierra Leone',
            },
            {
                id: 'abcdef',
                path: '/abcdef',
                children: false,
                displayName: 'Norway',
            },
        ],
        children: [
            {
                id: 'eIQbndfxQMb',
                path: '/ImspTQPwCqd/eIQbndfxQMb',
                children: true,
                displayName: 'Tonkolili',
            },
            {
                id: 'jUb8gELQApl',
                path: '/ImspTQPwCqd/jUb8gELQApl',
                children: true,
                displayName: 'Kailahun',
            },
            {
                id: 'fdc6uOvgoji',
                path: '/ImspTQPwCqd/fdc6uOvgoji',
                children: true,
                displayName: 'Bombali',
            },
        ],
    },
}

const renderWithData = (props, customData) =>
    render(
        <CustomDataProvider data={customData}>
            <OrgUnitTree {...props} />
        </CustomDataProvider>
    )

const props = {
    selected: [],
    setSelected: jest.fn(),
    multiSelect: true,
    meta: {},
    dataTest: 'out',
}

test('root organisation units load and are shown', async () => {
    const setSelected = jest.fn()

    const { getByDataTest } = renderWithData(
        { ...props, setSelected },
        customData
    )

    const loading = getByDataTest('out-loading')
    expect(loading).toBeInTheDocument()

    // loading has finished
    await waitForElement(() => getByDataTest('out-tree'))
    expect(loading).not.toBeInTheDocument()

    // all root org units are in the document
    customData.organisationUnits.organisationUnits.forEach(ou => {
        const el = getByDataTest(`out-tree-${ou.path}-select`)
        expect(el).toHaveTextContent(ou.displayName)
        expect(el).toBeInTheDocument()
        expect(el).toBeVisible()
    })

    // clicking on 'Sierre Leone' should trigger setSelected
    const sl = customData.organisationUnits.organisationUnits[0]
    const slSelect = getByDataTest(`out-tree-${sl.path}-select`)
    fireEvent.click(slSelect)
    expect(setSelected).toHaveBeenCalledTimes(1)
    expect(setSelected).toHaveBeenCalledWith([sl.path])
})

test('child organisation units load and are shown as nodes in the tree', async () => {
    const setSelected = jest.fn()

    const { getByDataTest } = renderWithData(
        { ...props, setSelected },
        customData
    )

    const loading = getByDataTest('out-loading')
    expect(loading).toBeInTheDocument()

    // loading has finished
    await waitForElement(() => getByDataTest('out-tree'))
    expect(loading).not.toBeInTheDocument()

    // clicking on 'Sierre Leone' toggle should trigger a query
    // and result in child nodes being rendered
    const sl = customData.organisationUnits.organisationUnits[0]
    const slToggle = getByDataTest(`out-tree-${sl.path}-toggle`)
    fireEvent.click(slToggle.firstChild)

    const tonkolili = customData.organisationUnits.children[0]
    await waitForElement(() => getByDataTest(`out-tree-${tonkolili.path}`))

    // // all child org units of Sierra Leone are in the document
    customData.organisationUnits.children.forEach(ou => {
        const el = getByDataTest(`out-tree-${ou.path}-select`)
        expect(el).toHaveTextContent(ou.displayName)
        expect(el).toBeInTheDocument()
        expect(el).toBeVisible()
    })
})

test('root organisation units fali load and an error is shown', async () => {
    // suppress console errors
    console.error = jest.fn()

    const setSelected = jest.fn()

    const { getByDataTest, getByText } = renderWithData(
        { ...props, setSelected },
        []
    )

    const loading = getByDataTest('out-loading')
    expect(loading).toBeInTheDocument()

    // loading has finished
    await waitForElement(() =>
        getByText(
            i18n.t('Something went wrong when loading the organisation units!')
        )
    )
    expect(loading).not.toBeInTheDocument()
})

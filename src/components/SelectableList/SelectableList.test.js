import React from 'react'
import { render, fireEvent, cleanup } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'

import { SelectableList } from '../'

const setSelected = jest.fn().mockName('setSelected')

const list = [
    { value: 'a', label: 'Abc' },
    { value: 'b', label: 'Def' },
    { value: 'c', label: 'Ghi' },
]

const props = {
    name: 'data-sets',
    label: 'Data sets',
    selected: [],
    list: list,
    setSelected: setSelected,
    multiSelect: true,
    withFilter: true,
    withActions: true,
    dataTest: 'list-data-sets',
}

afterEach(() => {
    cleanup()
    jest.clearAllMocks()
})

describe('clicking on an option triggers select', () => {
    test('when multi-select and selected is empty', () => {
        const { getByDataTest } = render(<SelectableList {...props} />)
        const firstOption = getByDataTest('list-data-sets-body-li-a')
        fireEvent.click(firstOption.firstChild)
        expect(setSelected).toHaveBeenCalledTimes(1)
        expect(setSelected).toHaveBeenCalledWith(['a'])
    })

    test('when multi-select and selected already contains clicked element', () => {
        const { getByDataTest } = render(
            <SelectableList {...props} selected={['a']} />
        )
        const firstOption = getByDataTest('list-data-sets-body-li-a')
        fireEvent.click(firstOption.firstChild)
        expect(setSelected).toHaveBeenCalledTimes(1)
        expect(setSelected).toHaveBeenCalledWith([])
    })

    test('when single-select and selected is empty', () => {
        const { getByDataTest } = render(
            <SelectableList {...props} multiSelect={false} />
        )
        const firstOption = getByDataTest('list-data-sets-body-li-a')
        fireEvent.click(firstOption.firstChild)
        expect(setSelected).toHaveBeenCalledTimes(1)
        expect(setSelected).toHaveBeenCalledWith(['a'])
    })

    test('when single-select and selected already contains clicked element', () => {
        const { getByDataTest } = render(
            <SelectableList {...props} selected={['a']} multiSelect={false} />
        )
        const firstOption = getByDataTest('list-data-sets-body-li-a')
        fireEvent.click(firstOption.firstChild)
        expect(setSelected).toHaveBeenCalledTimes(1)
        expect(setSelected).toHaveBeenCalledWith(['a'])
    })
})

test('clicking on "Select All" triggers setSelected', () => {
    const { getByDataTest } = render(<SelectableList {...props} />)
    const selectAll = getByDataTest('list-data-sets-actions-select-all')
    fireEvent.click(selectAll)
    expect(setSelected).toHaveBeenCalledTimes(1)
    expect(setSelected).toHaveBeenCalledWith(list.map(e => e.value))
})

test('clicking on "Clear All" triggers setSelected', () => {
    const { getByDataTest } = render(<SelectableList {...props} />)
    const clearAll = getByDataTest('list-data-sets-actions-clear-all')
    fireEvent.click(clearAll)
    expect(setSelected).toHaveBeenCalledTimes(1)
    expect(setSelected).toHaveBeenCalledWith([])
})

it('matches snapshot', () => {
    const { asFragment } = render(<SelectableList {...props} />)
    expect(asFragment()).toMatchSnapshot()
})

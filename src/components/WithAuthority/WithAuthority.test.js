import React from 'react'
import { render } from 'test-utils'
import '@testing-library/jest-dom/extend-expect.js'

import { UserContext } from '../../contexts/index.js'
import { WithAuthority } from '../index.js'

const rejectAllPredicate = () => false
const testPredicate = (authorities) => authorities.includes('TEST')

const renderContext = (contextValue, props) =>
    render(
        <UserContext.Provider value={contextValue}>
            <WithAuthority {...props} />
        </UserContext.Provider>
    )

const contextValue = { name: 'Ole', authorities: ['ABC', 'DEF', 'TEST'] }

test("doesn't render children when user has insufficient authority", () => {
    const { queryByDataTest } = renderContext(contextValue, {
        pred: rejectAllPredicate,
        children: <div data-test="child-div"></div>,
    })
    const childDiv = queryByDataTest('child-div')
    expect(childDiv).toEqual(null)
})

test('renders children when user has sufficient authority', () => {
    const { queryByDataTest } = renderContext(contextValue, {
        pred: testPredicate,
        children: <div data-test="child-div"></div>,
    })
    const childDiv = queryByDataTest('child-div')
    expect(childDiv).not.toEqual(null)
    expect(childDiv).toBeInTheDocument()
    expect(childDiv).toBeVisible()
})

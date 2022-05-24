import React from 'react'
import { render } from 'test-utils'
import '@testing-library/jest-dom/extend-expect.js'

import { FormAlerts } from '../index.js'

const alerts = [
    { id: '0', message: 'Alert 0 - info', info: true },
    { id: '1', message: 'Alert 1 - warning', warning: true },
    { id: '2', message: 'Alert 2 - critical', critical: true },
    { id: '3', message: 'Alert 3 - success', success: true },
]

const props = {
    dataTest: 'form-alerts',
    alerts: [],
}

it('matches snapshot when no alerts', () => {
    const { asFragment } = render(<FormAlerts {...props} />)
    expect(asFragment()).toMatchSnapshot()
})

it('matches snapshot when multiple alerts', () => {
    const { asFragment } = render(<FormAlerts {...props} alerts={alerts} />)
    expect(asFragment()).toMatchSnapshot()
})

import React from 'react'
import renderer from 'react-test-renderer'
import { DryRun } from '../DryRun'

describe('Input component - DryRun', () => {
    it('should render correctly', () => {
        const file = renderer.create(<DryRun />).toJSON()

        expect(file).toMatchSnapshot()
    })
})

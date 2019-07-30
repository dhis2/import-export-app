import React from 'react'
import renderer from 'react-test-renderer'
import { SkipExisting } from '../SkipExisting'

describe('Input component - SkipExisting', () => {
    it('should render correctly', () => {
        const file = renderer.create(<SkipExisting />).toJSON()

        expect(file).toMatchSnapshot()
    })
})

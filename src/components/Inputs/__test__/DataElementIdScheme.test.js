import React from 'react'
import renderer from 'react-test-renderer'
import { DataElementIdScheme } from '../DataElementIdScheme'

describe('Input component - DataElementIdScheme', () => {
    it('should render correctly', () => {
        const file = renderer.create(<DataElementIdScheme />).toJSON()

        expect(file).toMatchSnapshot()
    })
})

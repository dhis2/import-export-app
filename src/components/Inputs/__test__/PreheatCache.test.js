import React from 'react'
import renderer from 'react-test-renderer'
import { PreheatCache } from '../PreheatCache'

describe('Input component - PreheatCache', () => {
    it('should render correctly', () => {
        const file = renderer.create(<PreheatCache />).toJSON()

        expect(file).toMatchSnapshot()
    })
})

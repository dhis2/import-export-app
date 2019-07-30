import React from 'react'
import renderer from 'react-test-renderer'
import { Strategy } from '../Strategy'

describe('Input component - Strategy', () => {
    it('should render correctly', () => {
        const file = renderer.create(<Strategy />).toJSON()

        expect(file).toMatchSnapshot()
    })
})

import React from 'react'
import renderer from 'react-test-renderer'
import { IdScheme } from '../idScheme'

describe('Input component - IdScheme', () => {
    it('should render correctly', () => {
        const file = renderer.create(<IdScheme />).toJSON()

        expect(file).toMatchSnapshot()
    })
})

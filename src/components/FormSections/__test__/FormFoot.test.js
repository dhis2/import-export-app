import React from 'react'
import renderer from 'react-test-renderer'
import { FormHead } from '../FormHead'

describe('Input component - FormHead', () => {
    it('should render correctly', () => {
        const file = renderer
            .create(<FormHead icon={<span />} label="Form head" />)
            .toJSON()

        expect(file).toMatchSnapshot()
    })
})

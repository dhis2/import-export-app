import React from 'react'
import renderer from 'react-test-renderer'
import { File } from '../File'

describe('Form component - File', () => {
    it('should render correctly', () => {
        const file = renderer.create(<File name="upload" />).toJSON()

        expect(file).toMatchSnapshot()
    })
})

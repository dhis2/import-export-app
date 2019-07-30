import React from 'react'
import renderer from 'react-test-renderer'
import { Format, OPTION_CSV, OPTION_JSON, OPTION_XML } from '../Format'

describe('Input component - Format', () => {
    it('should render correctly', () => {
        const file = renderer
            .create(<Format options={[OPTION_JSON, OPTION_XML, OPTION_CSV]} />)
            .toJSON()

        expect(file).toMatchSnapshot()
    })
})

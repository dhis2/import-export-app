import React from 'react'
import renderer from 'react-test-renderer'
import { FormContent } from '../FormContent'

describe('Input component - FormContent', () => {
    it('should render correctly', () => {
        const file = renderer
            .create(
                <FormContent>
                    <span>Test</span>
                    Foobar
                </FormContent>
            )
            .toJSON()

        expect(file).toMatchSnapshot()
    })
})

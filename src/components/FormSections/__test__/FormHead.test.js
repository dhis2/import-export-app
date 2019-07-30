import React from 'react'
import renderer from 'react-test-renderer'
import { FormFoot } from '../FormFoot'

describe('Input component - FormFoot', () => {
    it('should render correctly', () => {
        const file = renderer
            .create(
                <FormFoot>
                    <span>Test</span>
                    Foobar
                </FormFoot>
            )
            .toJSON()

        expect(file).toMatchSnapshot()
    })
})

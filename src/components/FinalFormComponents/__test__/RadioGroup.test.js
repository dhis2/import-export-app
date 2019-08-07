import React from 'react'
import { mount } from 'enzyme'
import { Form } from 'react-final-form'

import { RadioGroup } from '../RadioGroup'

describe('RadioGroup', () => {
    it('should render 3 options', () => {
        const radioGroup = mount(
            <Form onSubmit={() => null}>
                {() => (
                    <RadioGroup
                        label="Foobar"
                        name="barbaz"
                        options={[
                            { label: 'FOO', value: 'foo' },
                            { label: 'BAR', value: 'bar' },
                            { label: 'BAZ', value: 'baz' },
                        ]}
                    />
                )}
            </Form>
        )

        const inputs = radioGroup.find('input')
        expect(inputs).toHaveLength(3)
    })

    it('should render a correct input for each option', () => {
        const radioGroup = mount(
            <Form onSubmit={() => null}>
                {() => (
                    <RadioGroup
                        label="Foobar"
                        name="barbaz"
                        options={[
                            { label: 'FOO', value: 'foo' },
                            { label: 'BAR', value: 'bar' },
                            { label: 'BAZ', value: 'baz' },
                        ]}
                    />
                )}
            </Form>
        )

        const inputs = radioGroup.find('input')
        const input0 = inputs.at(0)
        const input1 = inputs.at(1)
        const input2 = inputs.at(2)

        expect(input0.prop('type')).toBe('radio')
        expect(input0.prop('name')).toBe('barbaz')
        expect(input0.prop('value')).toBe('foo')

        expect(input1.prop('type')).toBe('radio')
        expect(input1.prop('name')).toBe('barbaz')
        expect(input1.prop('value')).toBe('bar')

        expect(input2.prop('type')).toBe('radio')
        expect(input2.prop('name')).toBe('barbaz')
        expect(input2.prop('value')).toBe('baz')
    })
})

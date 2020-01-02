import { useField } from 'react-final-form'
import { Checkbox as CoreCheckbox } from '@dhis2/ui-core'
import React from 'react'
import propTypes from 'prop-types'

export const Checkbox = ({
    label,
    name,
    checkedInitially: initialValue,
    dataTest,
}) => {
    const { input } = useField(name, {
        initialValue,
        type: 'checkbox',
        format: v => v.toString(),
        parse: v => Boolean(v),
    })

    return (
        <div data-test={dataTest}>
            <CoreCheckbox
                {...input}
                checked={input.value === 'true'}
                label={label}
            />
        </div>
    )
}

Checkbox.propTypes = {
    label: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    checkedInitially: propTypes.bool,
}

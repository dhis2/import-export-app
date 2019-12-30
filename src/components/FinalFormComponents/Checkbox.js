import { useField } from 'react-final-form'
import { Checkbox as CoreCheckbox } from '@dhis2/ui-core'
import React from 'react'
import propTypes from 'prop-types'

export const Checkbox = ({
    label,
    name,
    dataTest,
    value,
    initialValue,
    format,
    multiple,
    parse,
}) => {
    const { input } = useField(name, {
        initialValue,
        type: 'checkbox',
        format,
        parse,
        multiple,
        value,
    })

    return (
        <div data-test={dataTest}>
            <CoreCheckbox
                {...input}
                label={label}
            />
        </div>
    )
}

Checkbox.propTypes = {
    label: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    value: propTypes.string.isRequired,
    format: propTypes.func,
    initialValue: propTypes.string,
    multiple: propTypes.bool,
    parse: propTypes.func,
}

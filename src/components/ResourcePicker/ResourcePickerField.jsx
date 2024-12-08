import { ReactFinalForm } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { ResourcePicker } from '../index.js'
const { Field } = ReactFinalForm

const Wrapper = ({ input: { value, onChange }, meta, ...rest }) => (
    <ResourcePicker
        meta={meta}
        selected={value}
        setSelected={({ selected }) => onChange(selected)}
        {...rest}
    />
)

Wrapper.propTypes = {
    input: PropTypes.shape({
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string),
        ]).isRequired,
        onChange: PropTypes.func,
    }).isRequired,
    meta: PropTypes.shape({
        error: PropTypes.string,
        pristine: PropTypes.bool,
        touched: PropTypes.bool,
    }).isRequired,
}

const ResourcePickerField = ({ name, validator, ...rest }) => {
    return (
        <Field component={Wrapper} name={name} validate={validator} {...rest} />
    )
}

ResourcePickerField.propTypes = {
    name: PropTypes.string.isRequired,
    validator: PropTypes.func,
}

export { ResourcePickerField }

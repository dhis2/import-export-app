import React from 'react'
import PropTypes from 'prop-types'
import { Field } from '@dhis2/ui-forms'

import { ResourcePicker } from '../index'

const Wrapper = ({ input: { value, onChange }, meta, ...rest }) => (
    <ResourcePicker
        meta={meta}
        selected={value}
        setSelected={onChange}
        {...rest}
    />
)

Wrapper.propTypes = {
    input: PropTypes.shape({
        value: PropTypes.arrayOf(PropTypes.string).isRequired,
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

import { ReactFinalForm } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { Select } from '../index.js'
const { Field } = ReactFinalForm

const Wrapper = ({ input: { value, onChange }, meta, inputName, ...rest }) => (
    <Select
        name={inputName}
        meta={meta}
        selected={value || undefined}
        setValue={onChange}
        {...rest}
    />
)

Wrapper.propTypes = {
    input: PropTypes.shape({
        value: PropTypes.any,
        onChange: PropTypes.func,
    }).isRequired,
    inputName: PropTypes.string.isRequired,
    meta: PropTypes.shape({
        error: PropTypes.string,
        pristine: PropTypes.bool,
        touched: PropTypes.bool,
    }).isRequired,
}

const SelectField = ({ name, ...rest }) => {
    return <Field component={Wrapper} name={name} inputName={name} {...rest} />
}

SelectField.propTypes = {
    name: PropTypes.string.isRequired,
}

export { SelectField }

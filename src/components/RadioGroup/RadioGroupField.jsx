import { ReactFinalForm } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { RadioGroup } from '../index.js'
const { Field } = ReactFinalForm

const Wrapper = ({
    input: { value, onChange },
    meta: { error },
    inputName,
    ...rest
}) => (
    <RadioGroup
        name={inputName}
        error={error}
        checked={value}
        setValue={onChange}
        {...rest}
    />
)

Wrapper.propTypes = {
    input: PropTypes.shape({
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func,
    }).isRequired,
    inputName: PropTypes.string.isRequired,
    meta: PropTypes.shape({
        error: PropTypes.string,
        pristine: PropTypes.bool,
        touched: PropTypes.bool,
    }).isRequired,
}

const RadioGroupField = ({ name, ...rest }) => {
    return <Field component={Wrapper} name={name} inputName={name} {...rest} />
}

RadioGroupField.propTypes = {
    name: PropTypes.string.isRequired,
}

export { RadioGroupField }

import React from 'react'
import PropTypes from 'prop-types'
import { Field } from '@dhis2/ui-forms'

import { RadioGroup } from '../index'
import { optionPropType } from '../../utils/options'

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
        value: optionPropType.isRequired,
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

import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Field } from '@dhis2/ui-forms'

import { TETypePicker } from '../'

const SINGLE_TETYPE_VALIDATOR = selectedTypes =>
    selectedTypes.length == 0
        ? i18n.t('At least one tracked entity type must be selected')
        : undefined

const SINGLE_EXACT_TETYPE_VALIDATOR = selectedTypes =>
    selectedTypes.length != 1
        ? i18n.t('One tracked entity type must be selected')
        : undefined

const Wrapper = ({ input: { value, onChange }, meta, ...rest }) => (
    <TETypePicker
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

const TETypePickerField = ({ name, validator, ...rest }) => {
    return (
        <Field component={Wrapper} name={name} validate={validator} {...rest} />
    )
}

TETypePickerField.propTypes = {
    name: PropTypes.string.isRequired,
    validator: PropTypes.func,
}

export {
    TETypePickerField,
    SINGLE_TETYPE_VALIDATOR,
    SINGLE_EXACT_TETYPE_VALIDATOR,
}

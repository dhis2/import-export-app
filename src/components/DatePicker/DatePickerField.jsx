import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { DatePicker } from '../index.js'
const { Field } = ReactFinalForm

const OPTIONAL_DATE_VALIDATOR = (date) =>
    date ? DATE_VALIDATOR(date) : undefined
const DATE_VALIDATOR = (date) =>
    new Date(date) == 'Invalid Date' ? i18n.t('Invalid date') : undefined
const DATE_BEFORE_VALIDATOR = (date1, date2) =>
    date1 > date2 ? i18n.t('Start date must be before end date') : undefined
const DATE_AFTER_VALIDATOR = (date2, date1) =>
    date2 < date1 ? i18n.t('End date must be after start date') : undefined

const Wrapper = ({
    input: { value, onChange },
    meta: { error },
    inputName,
    ...rest
}) => (
    <DatePicker
        name={inputName}
        error={error}
        date={value}
        onChange={onChange}
        {...rest}
    />
)

Wrapper.propTypes = {
    input: PropTypes.shape({
        value: PropTypes.string,
        onChange: PropTypes.func,
    }).isRequired,
    inputName: PropTypes.string.isRequired,
    meta: PropTypes.shape({
        error: PropTypes.string,
        pristine: PropTypes.bool,
        touched: PropTypes.bool,
    }).isRequired,
}

const DatePickerField = ({ name, validator, ...rest }) => (
    <Field
        component={Wrapper}
        name={name}
        validate={validator}
        inputName={name}
        {...rest}
    />
)

DatePickerField.propTypes = {
    name: PropTypes.string.isRequired,
    validator: PropTypes.func,
}

export {
    DatePickerField,
    DATE_VALIDATOR,
    DATE_BEFORE_VALIDATOR,
    DATE_AFTER_VALIDATOR,
    OPTIONAL_DATE_VALIDATOR,
}

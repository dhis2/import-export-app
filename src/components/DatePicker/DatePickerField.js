import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Field } from '@dhis2/ui-forms'

import { DatePicker } from '../'

const DATE_VALIDATOR = date =>
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
        value: PropTypes.instanceOf(Date).isRequired,
        onChange: PropTypes.func,
    }).isRequired,
    inputName: PropTypes.string.isRequired,
    meta: PropTypes.shape({
        error: PropTypes.string,
        pristine: PropTypes.bool,
        touched: PropTypes.bool,
    }).isRequired,
}

const DatePickerField = ({ name, validator, ...rest }) => {
    return (
        <Field
            component={Wrapper}
            name={name}
            validate={validator}
            inputName={name}
            type="date"
            inputWidth="200px"
            {...rest}
        />
    )
}

DatePickerField.propTypes = {
    name: PropTypes.string.isRequired,
    validator: PropTypes.func,
}

export {
    DatePickerField,
    DATE_VALIDATOR,
    DATE_BEFORE_VALIDATOR,
    DATE_AFTER_VALIDATOR,
}

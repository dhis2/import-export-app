import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { InputField } from '@dhis2/ui-core'
import { Field } from '@dhis2/ui-forms'

import { jsDateToISO8601 } from '../../utils/helper'
import { FormField } from '../FormField'

const DATE_VALIDATOR = date =>
    new Date(date) == 'Invalid Date' ? i18n.t('Invalid date') : undefined
const DATE_BEFORE_VALIDATOR = (date1, date2) =>
    date1 > date2 ? i18n.t('Start date must be before end date') : undefined
const DATE_AFTER_VALIDATOR = (date2, date1) =>
    date2 < date1 ? i18n.t('End date must be after start date') : undefined

const CustomFieldComponent = ({
    input: { value, onChange },
    meta: { error },
    dateName,
}) => (
    <InputField
        value={jsDateToISO8601(value)}
        name={dateName}
        type="date"
        inputWidth="200px"
        onChange={payload => onChange(new Date(payload.value))}
        error={!!error}
        validationText={error}
    />
)

CustomFieldComponent.propTypes = {
    dateName: PropTypes.string.isRequired,
    input: PropTypes.shape({
        value: PropTypes.instanceOf(Date).isRequired,
        onChange: PropTypes.func.isRequired,
    }).isRequired,
    meta: PropTypes.object.isRequired,
}

const DatePicker = ({ name, label, dataTest, required = true }) => {
    return (
        <FormField label={label} dataTest={dataTest}>
            <Field
                component={CustomFieldComponent}
                name={name}
                dateName={name}
                type="date"
                required={required}
                inputWidth="200px"
            />
        </FormField>
    )
}

DatePicker.propTypes = {
    dataTest: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    required: PropTypes.bool,
}

export {
    DatePicker,
    DATE_VALIDATOR,
    DATE_BEFORE_VALIDATOR,
    DATE_AFTER_VALIDATOR,
}

import React from 'react'
import PropTypes from 'prop-types'
import { InputField } from '@dhis2/ui-core'

import { jsDateToISO8601 } from '../../utils/helper'
import { FormField } from '../FormField'

const DatePicker = ({
    name,
    error,
    label,
    date,
    onChange,
    dataTest,
    required = true,
}) => {
    const onChangeHelper = ({ value }) => {
        onChange(new Date(value))
    }

    const value = jsDateToISO8601(date)

    return (
        <FormField label={label} dataTest={dataTest}>
            <InputField
                type="date"
                name={name}
                value={value}
                onChange={onChangeHelper}
                required={required}
                inputWidth="200px"
                error={!!error}
                validationText={error}
            />
        </FormField>
    )
}

DatePicker.propTypes = {
    dataTest: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    required: PropTypes.bool,
}

export { DatePicker }

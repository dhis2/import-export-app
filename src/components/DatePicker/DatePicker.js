import React from 'react'
import PropTypes from 'prop-types'
import { InputField } from '@dhis2/ui'

import { jsDateToISO8601 } from '../../utils/helper'

const DatePicker = ({ name, error, label, date, onChange, dataTest }) => {
    const onChangeHelper = ({ value }) => {
        if (!value) {
            onChange(value)
        } else {
            onChange(new Date(value))
        }
    }

    const value = date && jsDateToISO8601(date)

    return (
        <InputField
            type="date"
            name={name}
            value={value}
            label={label}
            onChange={onChangeHelper}
            inputWidth="200px"
            error={!!error}
            validationText={error}
            dataTest={dataTest}
        />
    )
}

DatePicker.propTypes = {
    dataTest: PropTypes.string.isRequired,
    date: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string])
        .isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
}

export { DatePicker }

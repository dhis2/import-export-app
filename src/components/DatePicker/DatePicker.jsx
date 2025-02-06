import { InputField } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'

const DatePicker = ({ name, error, label, date, onChange, dataTest }) => {
    const onChangeHelper = ({ value }) => onChange(value)

    return (
        <InputField
            type="date"
            name={name}
            value={date}
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

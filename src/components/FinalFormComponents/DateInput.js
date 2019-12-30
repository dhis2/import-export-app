import { useField } from 'react-final-form'
import DatePicker from 'material-ui/DatePicker'
import React from 'react'
import propTypes from 'prop-types'

import styles from './DateInput.module.css'

export const DateInput = ({ minDate, name, initialValue }) => {
    const { input } = useField(name, {
        type: 'input',
        initialValue,
        format: value => new Date(value),
    })

    const onChange = (_, date) => input.onChange(date)

    return (
        <div>
            <DatePicker
                className={styles.datePicker}
                textFieldStyle={{ height: 36, fontSize: 15, fontWeight: 500 }}
                autoOk={true}
                key={name}
                name={name}
                minDate={minDate}
                value={input.value}
                onChange={onChange}
            />
        </div>
    )
}

DateInput.propTypes = {
    name: propTypes.string.isRequired,
    format: propTypes.func,
    initialValue: propTypes.instanceOf(Date),
    minDate: propTypes.string,
}

DateInput.defaultProps = {
    initialValue: new Date(),
}

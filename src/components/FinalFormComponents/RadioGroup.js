import { useField } from 'react-final-form'
import { Radio } from '@dhis2/ui-core'
import React from 'react'
import propTypes from 'prop-types'
import styles from './RadioGroup.module.css'

const RadioComponent = ({ name, label, value, defaultValue }) => {
    const { input, meta } = useField(name, {
        type: 'radio',
        value,
        defaultValue: defaultValue,
    })

    return (
        <Radio
            {...input}
            key={value}
            label={label}
            valid={!!input.value && !meta.error}
            error={meta.touched && !!meta.error}
            className={styles.radio}
        />
    )
}

export const RadioGroup = ({ label, name, options, defaultValue }) => {
    return (
        <div className={styles.container}>
            <span className={styles.label}>{label}</span>

            <div className={styles.inputs}>
                {options.map(option => (
                    <RadioComponent
                        name={name}
                        key={option.value}
                        value={option.value}
                        label={option.label}
                        defaultValue={defaultValue}
                    />
                ))}
            </div>
        </div>
    )
}

RadioGroup.propTypes = {
    label: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    options: propTypes.arrayOf(
        propTypes.shape({
            value: propTypes.string.isRequired,
            label: propTypes.string.isRequired,
        })
    ).isRequired,

    defaultValue: propTypes.string,
}

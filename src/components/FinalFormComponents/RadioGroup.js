import { useField } from 'react-final-form'
import { Radio } from '@dhis2/ui-core'
import React from 'react'
import propTypes from 'prop-types'
import styles from './RadioGroup.module.css'

const RadioComponent = ({ name, label, value, defaultValue }) => {
    const { input, meta } = useField(name, {
        type: 'radio',
        value,
        defaultValue,
    })

    return (
        <Radio
            {...input}
            key={value}
            label={label}
            error={meta.touched && !!meta.error}
            className={styles.radio}
        />
    )
}

export const RadioGroupContainer = ({ children }) => (
    <div className={styles.container}>{children}</div>
)

export const RadioGroupLabel = ({ children }) => (
    <span className={styles.label}>{children}</span>
)

export const RadioGroup = ({ label, name, options, defaultValue, ...rest }) => {
    return (
        <RadioGroupContainer {...rest}>
            <RadioGroupLabel>{label}</RadioGroupLabel>

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
        </RadioGroupContainer>
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

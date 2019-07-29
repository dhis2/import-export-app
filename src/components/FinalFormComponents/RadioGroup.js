import { useField } from 'react-final-form'
import { Radio } from '@dhis2/ui-core'
import React, { useEffect } from 'react'
import propTypes from 'prop-types'
import styles from './RadioGroup.module.css'

const Resetter = ({ name, value }) => {
    const { input } = useField(name, { type: 'radio', value: null })

    useEffect(() => () => input.onChange(value), [input])

    return <span />
}

const RadioComponent = ({ name, label, value }) => {
    const { input, meta } = useField(name, { type: 'radio', value })

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

export const RadioGroup = ({ label, name, options, resetOnUnmount }) => {
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
                    />
                ))}
            </div>

            {resetOnUnmount && <Resetter name={name} />}
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
    ),

    resetOnUnmount: propTypes.bool,
}

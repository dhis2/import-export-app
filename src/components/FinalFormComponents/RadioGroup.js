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
        allowNull: true,
        parse: value => (value === '' ? null : value),
    })

    return (
        <Radio
            {...input}
            value={input.value || ''}
            key={value}
            label={label}
            error={meta.touched && !!meta.error}
            className={styles.radio}
        />
    )
}

export const RadioGroup = ({ label, name, options, defaultValue, dataTest, ...rest }) => {
    return (
        <div data-test={dataTest}>
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
            label: propTypes.string.isRequired,
            value: propTypes.string,
        })
    ).isRequired,

    defaultValue: propTypes.string,
}

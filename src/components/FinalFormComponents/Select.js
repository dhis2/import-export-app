import { useField } from 'react-final-form'
import { SingleSelectField, SingleSelectOption } from '@dhis2/ui-core'
import React from 'react'
import propTypes from 'prop-types'
import styles from './RadioGroup.module.css'

export const Select = ({
    label,
    name,
    options,
    resetOnUnmount,
    defaultValue,
    dataTest,
}) => {
    const { input } = useField(name, {
        type: 'select',
        defaultValue: defaultValue,
    })

    return (
        <div className={styles.container} data-test={dataTest}>
            <SingleSelectField {...input} label={label} outlined>
                {options.map(option => (
                    <SingleSelectOption
                        key={option.value}
                        value={option.value}
                        label={option.label}
                    />
                ))}
            </SingleSelectField>
        </div>
    )
}

Select.propTypes = {
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

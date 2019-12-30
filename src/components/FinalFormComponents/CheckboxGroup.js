import { Button } from '@dhis2/ui-core'
import { useForm } from 'react-final-form'
import React from 'react'
import propTypes from 'prop-types'

import { Checkbox } from './Checkbox'
import styles from './CheckboxGroup.module.css'

export const CheckboxGroup = ({ name, options }) => {
    const form = useForm()

    const selectAll = () =>
        form.change(
            name,
            options.map(({ value }) => value)
        )
    const clearAll = () => form.change(name, [])

    return (
        <div>
            <div className={styles.actions}>
                <Button className={styles.selectAll} onClick={selectAll}>
                    Select all
                </Button>
                <Button onClick={clearAll}>Clear all</Button>
            </div>

            <div className={styles.options}>
                {options.map(({ label, value }) => (
                    <Checkbox
                        key={label}
                        name={name}
                        label={label}
                        value={value}
                        multiple
                    />
                ))}
            </div>
        </div>
    )
}

CheckboxGroup.propTypes = {
    name: propTypes.string.isRequired,
    options: propTypes.arrayOf(
        propTypes.shape({
            label: propTypes.string.isRequired,
            value: propTypes.string.isRequired,
        })
    ).isRequired,
}

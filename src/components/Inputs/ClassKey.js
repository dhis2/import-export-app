import { useForm } from 'react-final-form'
import React, { Fragment } from 'react'
import i18n from '@dhis2/d2-i18n'
import propTypes from 'prop-types'

import { Field } from '../Field/Field'
import { RadioGroup } from '../FinalFormComponents/RadioGroup'
import { Select } from '../FinalFormComponents/Select'

export const CLASS_KEY_KEY = 'classKey'

export const ClassKey = ({ show, options, defaultValue }) => {
    const { change, getState } = useForm()
    const currentValue = getState().values[CLASS_KEY_KEY]

    // not directly imported so the `useEffect` hook
    // can be stubbed so the callback is not called async'ly
    React.useEffect(() => {
        if (!show && currentValue) {
            change(CLASS_KEY_KEY, null)
        }
    }, [change, show, currentValue])

    return (
        <Fragment>
            {show && (
                <Field>
                    <Select
                        dataTest="input-class-key"
                        name={CLASS_KEY_KEY}
                        label={i18n.t('Class key')}
                        options={options}
                        defaultValue={defaultValue}
                    />
                </Field>
            )}
        </Fragment>
    )
}

ClassKey.propTypes = {
    options: RadioGroup.propTypes.options,
    show: propTypes.bool.isRequired,
    defaultValue: propTypes.string.isRequired,
}

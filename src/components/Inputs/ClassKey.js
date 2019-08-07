import { FormSpy } from 'react-final-form'
import React, { Fragment } from 'react'
import i18n from '@dhis2/d2-i18n'
import propTypes from 'prop-types'

import { FORMAT_KEY, OPTION_CSV } from './Format'
import { RadioGroup } from '../FinalFormComponents/RadioGroup'
import { Select } from '../FinalFormComponents/Select'

export const CLASS_KEY_KEY = 'classKey'

export const ClassKey = ({ show, options, defaultValue }) => (
    <Fragment>
        {show && (
            <Select
                name={CLASS_KEY_KEY}
                label={i18n.t('Class key')}
                options={options}
                defaultValue={defaultValue}
            />
        )}

        <FormSpy
            render={({ values, form }) => {
                if (
                    values[FORMAT_KEY] !== OPTION_CSV.value &&
                    values[CLASS_KEY_KEY]
                ) {
                    form.change(CLASS_KEY_KEY, null)
                }

                return <Fragment />
            }}
        />
    </Fragment>
)

ClassKey.propTypes = {
    options: RadioGroup.propTypes.options,
    show: propTypes.bool.isRequired,
    defaultValue: propTypes.string.isRequired,
}

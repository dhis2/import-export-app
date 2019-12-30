import React from 'react'
import i18n from '@dhis2/d2-i18n'

import { DateInput } from '../FinalFormComponents/DateInput'
import { Field } from '../Field/Field'
import { Label } from '../Field/Label'

const createDefaultValue = () => {
    const date = new Date()
    const month = date.getMonth()

    date.setMonth(month - 3)

    return date
}

export const START_DATE_KEY = 'startDate'
export const START_DATE_DEFAULT_VALUE = createDefaultValue()

export const StartDate = () => (
    <Field>
        <Label>{i18n.t('StartDate')}</Label>
        <DateInput name={START_DATE_KEY} label={i18n.t('Start date')} />
    </Field>
)

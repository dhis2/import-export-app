import React from 'react'
import i18n from '@dhis2/d2-i18n'

import { DateInput } from '../FinalFormComponents/DateInput'
import { Field } from '../Field/Field'
import { Label } from '../Field/Label'

export const END_DATE_KEY = 'endDate'
export const END_DATE_DEFAULT_VALUE = new Date()

export const EndDate = () => (
    <Field>
        <Label>{i18n.t('EndDate')}</Label>
        <DateInput name={END_DATE_KEY} label={i18n.t('End date')} />
    </Field>
)

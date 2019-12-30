import React from 'react'
import i18n from '@dhis2/d2-i18n'

import { Field } from '../Field/Field'
import { Label } from '../Field/Label'
import { RadioGroup } from '../FinalFormComponents/RadioGroup'

export const OPTION_YES = { value: 'true', label: i18n.t('Yes') }
export const OPTION_NO = { value: 'false', label: i18n.t('No') }
export const ASYNC_KEY = 'async'
export const ASYNC_DEFAULT_VALUE = OPTION_YES.value

export const Async = () => (
    <Field>
        <Label>{i18n.t('Async')}</Label>
        <RadioGroup
            dataTest="input-async"
            name={ASYNC_KEY}
            label={i18n.t('Async')}
            options={[OPTION_YES, OPTION_NO]}
        />
    </Field>
)

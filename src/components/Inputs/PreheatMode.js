import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { RadioGroup } from '../FinalFormComponents/RadioGroup'
import { Field } from '../Field/Field'
import { Label } from '../Field/Label'

export const OPTION_REFERENCE = {
    value: 'REFERENCE',
    label: i18n.t('Reference'),
}
export const OPTION_ALL = { value: 'ALL', label: i18n.t('All') }
export const OPTION_NONE = { value: 'NONE', label: i18n.t('None') }

export const PREHEAT_MODE_KEY = 'preheatMode'
export const PREHEAT_MODE_DEFAULT_VALUE = OPTION_REFERENCE.value

export const PreheatMode = () => (
    <Field>
        <Label>{i18n.t('Preheat mode')}</Label>
        <RadioGroup
            name={PREHEAT_MODE_KEY}
            label={i18n.t('Preheat mode')}
            options={[OPTION_REFERENCE, OPTION_ALL, OPTION_NONE]}
            dataTest="input-preheat-mode"
        />
    </Field>
)

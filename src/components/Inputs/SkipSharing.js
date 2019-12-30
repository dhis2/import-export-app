import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { RadioGroup } from '../FinalFormComponents/RadioGroup'
import { Field } from '../Field/Field'
import { Label } from '../Field/Label'

export const OPTION_YES = { value: 'true', label: i18n.t('Yes') }
export const OPTION_NO = { value: 'false', label: i18n.t('No') }
export const SKIP_SHARING_KEY = 'skipSharing'
export const SKIP_SHARING_DEFAULT_VALUE = OPTION_NO.value

export const SkipSharing = () => (
    <Field>
        <Label>{i18n.t('Skip sharing')}</Label>
        <RadioGroup
            name={SKIP_SHARING_KEY}
            label={i18n.t('Skip sharing')}
            options={[OPTION_YES, OPTION_NO]}
            dataTest="input-skip-sharing"
        />
    </Field>
)

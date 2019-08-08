import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { RadioGroup } from '../FinalFormComponents/RadioGroup'

export const OPTION_YES = { value: 'true', label: i18n.t('Yes') }
export const OPTION_NO = { value: 'false', label: i18n.t('No') }
export const SKIP_AUDIT_KEY = 'skipAudit'
export const SKIP_AUDIT_DEFAULT_VALUE = OPTION_NO.value

export const SkipAudit = () => (
    <RadioGroup
        name={SKIP_AUDIT_KEY}
        label={i18n.t('Skip audit')}
        options={[OPTION_YES, OPTION_NO]}
        defaultValue={OPTION_NO.value}
    />
)

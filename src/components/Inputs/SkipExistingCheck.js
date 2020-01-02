import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { RadioGroup } from '../FinalFormComponents/RadioGroup'

export const OPTION_SKIP = { value: 'true', label: i18n.t('Skip check (fast)') }
export const OPTION_CHECK = {
    value: 'false',
    label: i18n.t('Check (safe, recommended)'),
}
export const SKIP_EXISTING_CHECK_KEY = 'skipExistingCheck'
export const SKIP_EXISTING_CHECK_DEFAULT_VALUE = OPTION_CHECK.value

export const SkipExistingCheck = () => (
    <RadioGroup
        name={SKIP_EXISTING_CHECK_KEY}
        label={i18n.t('Skip existing check')}
        options={[OPTION_SKIP, OPTION_CHECK]}
        dataTest="input-skip-existing-check"
    />
)

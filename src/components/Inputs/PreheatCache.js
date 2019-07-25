import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { RadioGroup } from '../form/RadioGroup'

export const OPTION_YES = {
    value: 'true',
    label: i18n.t('Yes (faster for large imports)'),
}
export const OPTION_NO = { value: 'false', label: i18n.t('No') }
export const PREHEAT_CACHE_KEY = 'preheatCache'
export const PREHEAT_CACHE_DEFAULT_VALUE = OPTION_NO.value

export const PreheatCache = () => (
    <RadioGroup
        name={PREHEAT_CACHE_KEY}
        label={i18n.t('Preheat cache')}
        options={[OPTION_YES, OPTION_NO]}
    />
)

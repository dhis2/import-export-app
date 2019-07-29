import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { RadioGroup } from '../FinalFormComponents/RadioGroup'

export const OPTION_NON_NULL = { value: 'NON_NULL', label: i18n.t('Non Null') }
export const OPTION_ALWAYS = { value: 'ALWAYS', label: i18n.t('Always') }
export const OPTION_NON_EMPTY = {
    value: 'NON_EMPTY',
    label: i18n.t('Non Empty'),
}
export const INCLUSION_STRATEGY_KEY = 'inclusionStrategy'
export const INCLUSION_STRATEGY_DEFAULT_VALUE = OPTION_NON_NULL.value

export const InclusionStrategy = () => (
    <RadioGroup
        name={INCLUSION_STRATEGY_KEY}
        label={i18n.t('Inclusion strategy')}
        options={[OPTION_NON_NULL, OPTION_ALWAYS, OPTION_NON_EMPTY]}
    />
)

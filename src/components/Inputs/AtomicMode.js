import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { RadioGroup } from '../FinalFormComponents/RadioGroup'

export const OPTION_ALL = { value: 'ALL', label: i18n.t('All') }
export const OPTION_NONE = { value: 'NONE', label: i18n.t('None') }
export const ATOMIC_MODE_KEY = 'atomicMode'
export const ATOMIC_MODE_DEFAULT_VALUE = OPTION_ALL.value

export const AtomicMode = () => (
    <RadioGroup
        name={ATOMIC_MODE_KEY}
        label={i18n.t('Atomic mode')}
        options={[OPTION_ALL, OPTION_NONE]}
    />
)

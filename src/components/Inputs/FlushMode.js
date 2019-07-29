import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { RadioGroup } from '../FinalFormComponents/RadioGroup'

export const OPTION_AUTO = { value: 'AUTO', label: i18n.t('Auto') }
export const OPTION_OBJECT = { value: 'OBJECT', label: i18n.t('Object') }
export const FLUSH_MODE_KEY = 'flushMode'
export const FLUSH_MODE_DEFAULT_VALUE = OPTION_AUTO.value

export const FlushMode = () => (
    <RadioGroup
        name={FLUSH_MODE_KEY}
        label={i18n.t('Flush mode')}
        options={[OPTION_AUTO, OPTION_OBJECT]}
    />
)

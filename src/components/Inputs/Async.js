import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { RadioGroup } from '../FinalFormComponents/RadioGroup'

export const OPTION_YES = { value: 'true', label: i18n.t('Yes') }
export const OPTION_NO = { value: 'false', label: i18n.t('No') }
export const ASYNC_KEY = 'async'
export const ASYNC_DEFAULT_VALUE = OPTION_YES.value

export const Async = () => (
    <RadioGroup
        name={ASYNC_KEY}
        label={i18n.t('Async')}
        options={[OPTION_YES, OPTION_NO]}
    />
)

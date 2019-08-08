import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { RadioGroup } from '../FinalFormComponents/RadioGroup'

export const OPTION_UID = { value: 'UID', label: i18n.t('UID') }
export const OPTION_CODE = { value: 'CODE', label: i18n.t('Code') }
export const OPTION_AUTO = { value: 'AUTO', label: i18n.t('Auto') }
export const IDENTIFIER_KEY = 'identifier'
export const IDENTIFIER_DEFAULT_VALUE = OPTION_UID.value

export const Identifier = () => (
    <RadioGroup
        name={IDENTIFIER_KEY}
        label={i18n.t('Identifier')}
        options={[OPTION_UID, OPTION_CODE, OPTION_AUTO]}
    />
)

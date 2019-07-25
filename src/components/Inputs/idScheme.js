import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { RadioGroup } from '../form/RadioGroup'

export const OPTION_UID = { value: 'UID', label: i18n.t('Uid') }
export const OPTION_CODE = { value: 'CODE', label: i18n.t('Code') }
export const ID_SCHEME_KEY = 'IdScheme'
export const ID_SCHEME_DEFAULT_VALUE = OPTION_UID.value

export const IdScheme = () => (
    <RadioGroup
        name={ID_SCHEME_KEY}
        label={i18n.t('Id scheme')}
        options={[OPTION_UID, OPTION_CODE]}
    />
)

import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { RadioGroup } from '../FinalFormComponents/RadioGroup'

export const OPTION_UID = { value: 'UID', label: i18n.t('Uid') }
export const OPTION_CODE = { value: 'CODE', label: i18n.t('Code') }
export const OPTION_NAME = { value: 'NAME', label: i18n.t('Name') }
export const DATA_ELEMENT_ID_SCHEME_KEY = 'dataElementIdScheme'
export const DATA_ELEMENT_ID_SCHEME_DEFAULT_VALUE = OPTION_UID.value

export const DataElementIdScheme = () => (
    <RadioGroup
        name={DATA_ELEMENT_ID_SCHEME_KEY}
        label={i18n.t('Data element id scheme')}
        options={[OPTION_UID, OPTION_CODE, OPTION_NAME]}
    />
)

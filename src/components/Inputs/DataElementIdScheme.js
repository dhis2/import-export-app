import i18n from '@dhis2/d2-i18n'
import React from 'react'
import {
    RadioGroup,
    RadioGroupContainer,
    RadioGroupLabel,
} from '../FinalFormComponents/RadioGroup'

export const OPTION_UID = { value: 'UID', label: i18n.t('Uid') }
export const OPTION_CODE = { value: 'CODE', label: i18n.t('Code') }
export const OPTION_NAME = { value: 'NAME', label: i18n.t('Name') }

export const DATA_ELEMENT_ID_SCHEME_DEFAULT_OPTIONS = [
    OPTION_UID,
    OPTION_CODE,
    OPTION_NAME,
]
export const DATA_ELEMENT_ID_SCHEME_KEY = 'dataElementIdScheme'
export const DATA_ELEMENT_ID_SCHEME_DEFAULT_VALUE = OPTION_UID.value

const dataElementIdSchemeLabel = i18n.t('Data element id scheme')
export const DataElementIdScheme = ({ options }) => (
    <RadioGroup
        name={DATA_ELEMENT_ID_SCHEME_KEY}
        label={dataElementIdSchemeLabel}
        options={options}
    />
)

DataElementIdScheme.propTypes = {
    options: RadioGroup.propTypes.options,
}

DataElementIdScheme.defaultProps = {
    options: DATA_ELEMENT_ID_SCHEME_DEFAULT_OPTIONS,
}

export const DataElementIdSchemeLoading = () => (
    <RadioGroupContainer>
        <RadioGroupLabel>{dataElementIdSchemeLabel}</RadioGroupLabel>
        {i18n.t('Loading data element id scheme options...')}
    </RadioGroupContainer>
)

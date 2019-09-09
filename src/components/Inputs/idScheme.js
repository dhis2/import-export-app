import i18n from '@dhis2/d2-i18n'
import React from 'react'
import {
    RadioGroupContainer,
    RadioGroupLabel,
} from '../FinalFormComponents/RadioGroup'
import { Select } from '../FinalFormComponents/Select'

export const OPTION_UID = { value: 'UID', label: i18n.t('Uid') }
export const OPTION_CODE = { value: 'CODE', label: i18n.t('Code') }

export const ID_SCHEME_DEFAULT_OPTIONS = [OPTION_UID, OPTION_CODE]
export const ID_SCHEME_KEY = 'idScheme'
export const ID_SCHEME_DEFAULT_VALUE = OPTION_UID.value

const idSchemeLabel = i18n.t('Id scheme')
export const IdScheme = ({ options }) => (
    <Select name={ID_SCHEME_KEY} label={idSchemeLabel} options={options} />
)

IdScheme.propTypes = {
    options: Select.propTypes.options,
}

IdScheme.defaultProps = {
    options: ID_SCHEME_DEFAULT_OPTIONS,
}

export const IdSchemeLoading = () => (
    <RadioGroupContainer>
        <RadioGroupLabel>{idSchemeLabel}</RadioGroupLabel>
        {i18n.t('Loading organisation unit id scheme options...')}
    </RadioGroupContainer>
)

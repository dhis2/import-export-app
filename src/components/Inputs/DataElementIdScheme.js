import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { DataElementIdScheme as DataElementIdSchemeGeneric } from '../index'

const dataElementIdSchemeOptions = [
    { value: 'UID', label: i18n.t('UID') },
    { value: 'CODE', label: i18n.t('CODE') },
    { value: 'NAME', label: i18n.t('NAME') },
]
const defaultDataElementIdSchemeOption = dataElementIdSchemeOptions[0].value

const NAME = 'dataElementIdScheme'
const DATATEST = 'input-data-element-id-scheme'
const LABEL = i18n.t('Data element ID scheme')

const DataElementIdScheme = () => (
    <DataElementIdSchemeGeneric
        name={NAME}
        label={LABEL}
        dataElementIdSchemeOptions={dataElementIdSchemeOptions}
        dataTest={DATATEST}
    />
)

export { DataElementIdScheme, defaultDataElementIdSchemeOption }

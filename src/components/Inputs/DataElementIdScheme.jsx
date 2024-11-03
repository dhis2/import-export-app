import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { DataElementIdScheme as DataElementIdSchemeGeneric } from '../index.js'

const dataElementIdSchemeOptions = [
    { value: 'UID', label: i18n.t('Uid') },
    { value: 'CODE', label: i18n.t('Code') },
    { value: 'NAME', label: i18n.t('Name') },
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

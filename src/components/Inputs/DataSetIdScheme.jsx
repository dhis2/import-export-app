import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { DataSetIdScheme as DataSetIdSchemeGeneric } from '../index.js'

const dataSetIdSchemeOptions = [
    { value: '', label: i18n.t('(Default)') },
    { value: 'UID', label: i18n.t('Uid') },
    { value: 'CODE', label: i18n.t('Code') },
    { value: 'NAME', label: i18n.t('Name') },
]
const defaultDataSetIdSchemeOption = dataSetIdSchemeOptions[0].value

const NAME = 'dataSetIdScheme'
const DATATEST = 'input-data-set-id-scheme'
const LABEL = i18n.t('Data set ID scheme')

const DataSetIdScheme = () => (
    <DataSetIdSchemeGeneric
        name={NAME}
        label={LABEL}
        dataSetIdSchemeOptions={dataSetIdSchemeOptions}
        dataTest={DATATEST}
    />
)

export { DataSetIdScheme, defaultDataSetIdSchemeOption }

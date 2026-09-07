import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { IdSchemeSelect } from '../index.js'

const defaultDataSetIdSchemeOption = ''

const NAME = 'dataSetIdScheme'
const DATATEST = 'input-data-set-id-scheme'
const LABEL = i18n.t('Data set ID scheme')
const ATTRIBUTE_TYPES = ['dataSetAttribute']

const DataSetIdScheme = () => (
    <IdSchemeSelect
        name={NAME}
        label={LABEL}
        dataTest={DATATEST}
        attributeTypes={ATTRIBUTE_TYPES}
    />
)

export { DataSetIdScheme, defaultDataSetIdSchemeOption }

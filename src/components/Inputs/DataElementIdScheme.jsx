import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { IdSchemeSelect } from '../index.js'

const defaultDataElementIdSchemeOption = 'UID'

const NAME = 'dataElementIdScheme'
const DATATEST = 'input-data-element-id-scheme'
const LABEL = i18n.t('Data element ID scheme')
const ATTRIBUTE_TYPES = ['dataElementAttribute']

const DataElementIdScheme = () => (
    <IdSchemeSelect
        name={NAME}
        label={LABEL}
        dataTest={DATATEST}
        attributeTypes={ATTRIBUTE_TYPES}
    />
)

export { DataElementIdScheme, defaultDataElementIdSchemeOption }

import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { IdSchemeSelect } from '../index.js'

const defaultIdSchemeOption = ''

const NAME = 'idScheme'
const DATATEST = 'input-id-scheme'
const LABEL = i18n.t('ID scheme')
const ATTRIBUTE_TYPES = ['dataElementAttribute', 'organisationUnitAttribute']

const IdScheme = () => (
    <IdSchemeSelect
        name={NAME}
        label={LABEL}
        dataTest={DATATEST}
        attributeTypes={ATTRIBUTE_TYPES}
        isFallback
    />
)

export { IdScheme, defaultIdSchemeOption }

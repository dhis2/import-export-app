import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { DataElementIdScheme as DataElementIdSchemeGeneric } from '../'

const NAME = 'dataElementIdScheme'
const DATATEST = 'input-data-element-id-scheme'
const LABEL = i18n.t('Data element ID scheme')

const DataElementIdScheme = () => (
    <DataElementIdSchemeGeneric name={NAME} label={LABEL} dataTest={DATATEST} />
)

export { DataElementIdScheme }

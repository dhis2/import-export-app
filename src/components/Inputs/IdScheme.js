import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { IdScheme as IdSchemeGeneric } from '../'

const NAME = 'idScheme'
const DATATEST = 'input-id-scheme'
const LABEL = i18n.t('ID scheme')

const IdScheme = () => (
    <IdSchemeGeneric name={NAME} label={LABEL} dataTest={DATATEST} />
)

export { IdScheme }

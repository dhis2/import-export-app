import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { IdScheme as IdSchemeGeneric } from '../index.js'

const idSchemeOptions = [
    { value: 'UID', label: i18n.t('Uid') },
    { value: 'CODE', label: i18n.t('Code') },
]
const defaultIdSchemeOption = idSchemeOptions[0].value

const NAME = 'idScheme'
const DATATEST = 'input-id-scheme'
const LABEL = i18n.t('ID scheme')

const IdScheme = () => (
    <IdSchemeGeneric
        name={NAME}
        label={LABEL}
        idSchemeOptions={idSchemeOptions}
        dataTest={DATATEST}
    />
)

export { IdScheme, defaultIdSchemeOption }

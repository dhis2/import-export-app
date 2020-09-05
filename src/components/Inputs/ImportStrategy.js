import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { RadioGroupField } from '../index'

const importStrategyOptions = [
    {
        value: 'CREATE_AND_UPDATE',
        label: i18n.t('Import new values and update existing'),
    },
    {
        value: 'CREATE',
        label: i18n.t('Import new values only'),
    },
    {
        value: 'UPDATES',
        label: i18n.t('Only update existing values, ignore new values'),
    },
    {
        value: 'DELETE',
        label: i18n.t('Remove values not included in uploaded file'),
    },
]
const defaultImportStrategyOption = importStrategyOptions[0]

const NAME = 'importStrategy'
const DATATEST = 'input-import-strategy'
const LABEL = i18n.t('Import strategy')

const ImportStrategy = () => (
    <RadioGroupField
        name={NAME}
        label={LABEL}
        options={importStrategyOptions}
        dataTest={DATATEST}
        vertical
    />
)

export { ImportStrategy, defaultImportStrategyOption }

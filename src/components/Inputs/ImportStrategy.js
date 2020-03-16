import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { importStrategyOptions } from '../../utils/options'
import { RadioGroupField } from '../'

const NAME = 'importStrategy'
const DATATEST = 'input-import-strategy'
const LABEL = i18n.t('Import strategy')

const ImportStrategy = () => (
    <RadioGroupField
        name={NAME}
        label={LABEL}
        options={importStrategyOptions}
        dataTest={DATATEST}
    />
)

export { ImportStrategy }

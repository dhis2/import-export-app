import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { Switch } from '../index'

const NAME = 'includeDeleted'
const DATATEST = 'input-include-deleted'
const LABEL = i18n.t('Include deleted')

const IncludeDeleted = () => (
    <Switch name={NAME} label={LABEL} dataTest={DATATEST} />
)

export { IncludeDeleted }

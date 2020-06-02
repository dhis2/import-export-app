import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { Switch } from '../'

const NAME = 'includeChildren'
const DATATEST = 'input-include-children'
const LABEL = i18n.t('Include children')

const IncludeChildren = () => (
    <Switch name={NAME} label={LABEL} dataTest={DATATEST} />
)

export { IncludeChildren }

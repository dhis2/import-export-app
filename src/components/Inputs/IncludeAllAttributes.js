import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { Switch } from '../'

const NAME = 'includeAllAttributes'
const DATATEST = 'input-include-all-attributes'
const LABEL = i18n.t('Include all attributes')

const IncludeAllAttributes = () => (
    <Switch name={NAME} label={LABEL} dataTest={DATATEST} />
)

export { IncludeAllAttributes }

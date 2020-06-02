import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { Switch } from '../'

const NAME = 'skipSharing'
const DATATEST = 'input-skip-sharing'
const LABEL = i18n.t('Skip sharing')

const SkipSharing = () => (
    <Switch name={NAME} label={LABEL} dataTest={DATATEST} />
)

export { SkipSharing }

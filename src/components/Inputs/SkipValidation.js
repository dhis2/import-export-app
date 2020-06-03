import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { Switch } from '../index'

const NAME = 'skipValidation'
const DATATEST = 'input-skip-validation'
const LABEL = i18n.t('Skip validation')

const SkipValidation = () => (
    <Switch name={NAME} label={LABEL} dataTest={DATATEST} />
)

export { SkipValidation }

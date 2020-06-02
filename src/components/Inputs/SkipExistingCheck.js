import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { Switch } from '../'

const NAME = 'skipExistingCheck'
const DATATEST = 'input-skip-exisiting-check'
const LABEL = i18n.t('Skip exisiting check')
const HELPTEXT = i18n.t('Faster, but unsafe')

const SkipExistingCheck = () => (
    <Switch name={NAME} label={LABEL} dataTest={DATATEST} help={HELPTEXT} />
)

export { SkipExistingCheck }

import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { Switch } from '../index'

const NAME = 'preheatCache'
const DATATEST = 'input-preheat-cache'
const LABEL = i18n.t('Preheat cache')
const HELPTEXT = i18n.t('Faster for large imports')

const PreheatCache = () => (
    <Switch name={NAME} label={LABEL} dataTest={DATATEST} help={HELPTEXT} />
)

export { PreheatCache }

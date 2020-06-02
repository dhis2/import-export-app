import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { Switch } from '../'

const NAME = 'isAsync'
const DATATEST = 'input-is-async'
const LABEL = i18n.t('Async')

const IsAsync = () => <Switch name={NAME} label={LABEL} dataTest={DATATEST} />

export { IsAsync }

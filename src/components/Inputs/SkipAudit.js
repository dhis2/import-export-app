import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { Switch } from '../'

const NAME = 'skipAudit'
const DATATEST = 'input-has-authority-to-skip-audit'
const LABEL = i18n.t('Skip audit')
const HELPTEXT = i18n.t(
    'Improves performance at the cost of ability to audit changes'
)

const SkipAudit = () => (
    <Switch name={NAME} label={LABEL} dataTest={DATATEST} help={HELPTEXT} />
)

export { SkipAudit }

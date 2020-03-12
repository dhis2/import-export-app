import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Switch } from '../Switch'

const NAME = 'skipAudit'
const DATATEST = 'input-has-authority-to-skip-audit'
const LABEL = i18n.t('Skip audit')
const HELPTEXT = i18n.t(
    'Improves performance at the cost of ability to audit changes'
)

const SkipAudit = ({ value }) => (
    <Switch
        name={NAME}
        label={LABEL}
        value={value}
        dataTest={DATATEST}
        help={HELPTEXT}
    />
)

SkipAudit.propTypes = {
    value: PropTypes.bool.isRequired,
}

export { SkipAudit }

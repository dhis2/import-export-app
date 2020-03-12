import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Switch } from '../Switch'

const NAME = 'includeDeleted'
const DATATEST = 'input-include-deleted'
const LABEL = i18n.t('Include deleted')

const IncludeDeleted = ({ value }) => (
    <Switch name={NAME} label={LABEL} value={value} dataTest={DATATEST} />
)

IncludeDeleted.propTypes = {
    value: PropTypes.bool.isRequired,
}

export { IncludeDeleted }

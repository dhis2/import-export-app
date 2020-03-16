import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Switch } from '../'

const NAME = 'skipSharing'
const DATATEST = 'input-skip-sharing'
const LABEL = i18n.t('Skip sharing')

const SkipSharing = ({ value }) => (
    <Switch name={NAME} label={LABEL} value={value} dataTest={DATATEST} />
)

SkipSharing.propTypes = {
    value: PropTypes.bool.isRequired,
}

export { SkipSharing }

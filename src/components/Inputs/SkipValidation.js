import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Switch } from '../'

const NAME = 'skipValidation'
const DATATEST = 'input-skip-validation'
const LABEL = i18n.t('Skip validation')

const SkipValidation = ({ value }) => (
    <Switch name={NAME} label={LABEL} value={value} dataTest={DATATEST} />
)

SkipValidation.propTypes = {
    value: PropTypes.bool.isRequired,
}

export { SkipValidation }

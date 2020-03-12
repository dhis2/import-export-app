import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Switch } from '../Switch'

const NAME = 'isAsync'
const DATATEST = 'input-is-async'
const LABEL = i18n.t('Async')

const IsAsync = ({ value }) => (
    <Switch name={NAME} label={LABEL} value={value} dataTest={DATATEST} />
)

IsAsync.propTypes = {
    value: PropTypes.bool.isRequired,
}

export { IsAsync }

import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Switch } from '../'

const NAME = 'includeAllAttributes'
const DATATEST = 'input-include-all-attributes'
const LABEL = i18n.t('Include all attributes')

const IncludeAllAttributes = ({ value }) => (
    <Switch name={NAME} label={LABEL} value={value} dataTest={DATATEST} />
)

IncludeAllAttributes.propTypes = {
    value: PropTypes.bool.isRequired,
}

export { IncludeAllAttributes }

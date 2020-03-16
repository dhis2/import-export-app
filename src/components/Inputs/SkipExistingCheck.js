import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Switch } from '../'

const NAME = 'skipExistingCheck'
const DATATEST = 'input-skip-exisiting-check'
const LABEL = i18n.t('Skip exisiting check')
const HELPTEXT = i18n.t('Faster, but unsafe')

const SkipExistingCheck = ({ value }) => (
    <Switch
        name={NAME}
        label={LABEL}
        value={value}
        dataTest={DATATEST}
        help={HELPTEXT}
    />
)

SkipExistingCheck.propTypes = {
    value: PropTypes.bool.isRequired,
}

export { SkipExistingCheck }

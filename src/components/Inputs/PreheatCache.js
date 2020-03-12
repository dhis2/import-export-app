import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Switch } from '../Switch'

const NAME = 'preheatCache'
const DATATEST = 'input-preheat-cache'
const LABEL = i18n.t('Preheat cache')
const HELPTEXT = i18n.t('Faster for large imports')

const PreheatCache = ({ value }) => (
    <Switch
        name={NAME}
        label={LABEL}
        value={value}
        dataTest={DATATEST}
        help={HELPTEXT}
    />
)

PreheatCache.propTypes = {
    value: PropTypes.bool.isRequired,
}

export { PreheatCache }

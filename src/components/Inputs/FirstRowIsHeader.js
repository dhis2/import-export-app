import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Switch } from '../Switch'

const NAME = 'firstRowIsHeader'
const DATATEST = 'input-first-row-is-header'
const LABEL = i18n.t('First row is header')

const FirstRowIsHeader = ({ show, value }) =>
    show && (
        <Switch name={NAME} label={LABEL} value={value} dataTest={DATATEST} />
    )

FirstRowIsHeader.propTypes = {
    show: PropTypes.bool.isRequired,
    value: PropTypes.bool.isRequired,
}

export { FirstRowIsHeader }

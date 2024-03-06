import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { RadioGroupField } from '../index.js'

const followUpStatusOptions = [
    { value: 'ALL', label: i18n.t('All') },
    { value: 'true', label: i18n.t('Marked for follow-up') },
    { value: 'false', label: i18n.t('Not marked for follow-up') },
]
const defaultFollowUpStatusOption = followUpStatusOptions[0].value

const NAME = 'followup'
const DATATEST = 'input-follow-up-status'
const LABEL = i18n.t('Include only entities with follow-up status')

const FollowUpStatus = ({ show }) =>
    show && (
        <RadioGroupField
            name={NAME}
            label={LABEL}
            options={followUpStatusOptions}
            dataTest={DATATEST}
        />
    )

FollowUpStatus.propTypes = {
    show: PropTypes.bool,
}

export { FollowUpStatus, defaultFollowUpStatusOption }

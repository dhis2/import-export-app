import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { RadioGroupField } from '../index'

const followUpStatusOptions = [
    { value: 'ALL', label: i18n.t('All') },
    { value: 'TRUE', label: i18n.t('Marked for follow-up') },
    { value: 'FALSE', label: i18n.t('Not marked for follow-up') },
]
const defaultFollowUpStatusOption = followUpStatusOptions[0]

const NAME = 'followUpStatus'
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

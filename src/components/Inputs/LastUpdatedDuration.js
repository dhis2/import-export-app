import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { hasValue, composeValidators } from '@dhis2/ui'
import { DurationField } from '../index'
import { DURATION_VALIDATOR } from '../Duration/DurationField'

const NAME = 'lastUpdatedDuration'
const DATATEST = 'input-last-updated-duration'
const LABEL = i18n.t('Last updated duration')
const VALIDATOR = composeValidators(hasValue, DURATION_VALIDATOR)

const LastUpdatedDuration = ({ show }) =>
    show && (
        <DurationField
            name={NAME}
            validator={VALIDATOR}
            label={LABEL}
            dataTest={DATATEST}
        />
    )

LastUpdatedDuration.propTypes = {
    show: PropTypes.bool,
}

export { LastUpdatedDuration }

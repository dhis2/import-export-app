import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { RadioGroupField } from '../index.js'

const programStatusOptions = [
    { value: '', label: i18n.t('All statuses') },
    { value: 'ACTIVE', label: i18n.t('Active') },
    { value: 'COMPLETED', label: i18n.t('Completed') },
    { value: 'CANCELLED', label: i18n.t('Cancelled') },
]
const defaultProgramStatusOption = programStatusOptions[0].value

const NAME = 'programStatus'
const DATATEST = 'input-program-status'
const LABEL = i18n.t('Include only entities with status')

const ProgramStatus = ({ show }) =>
    show && (
        <RadioGroupField
            name={NAME}
            label={LABEL}
            options={programStatusOptions}
            dataTest={DATATEST}
        />
    )

ProgramStatus.propTypes = {
    show: PropTypes.bool,
}

export { ProgramStatus, defaultProgramStatusOption }

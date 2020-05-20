import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { RadioGroupField } from '../'
import { programStatusOptions } from '../../utils/options'

const NAME = 'programStatus'
const DATATEST = 'input-program-status'
const LABEL = i18n.t('Program status')

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

export { ProgramStatus }

import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { hasValue, composeValidators } from '@dhis2/ui-forms'
import {
    ProgramPickerField,
    SINGLE_PROGRAM_VALIDATOR,
    SINGLE_EXACT_PROGRAM_VALIDATOR,
} from '../../components/ProgramPicker'

const NAME = 'selectedPrograms'
const LABEL = i18n.t('Programs')
const DATATEST = 'input-program-picker'

const ProgramPicker = ({ multiSelect = false, ...rest }) => {
    const programValidator = multiSelect
        ? SINGLE_PROGRAM_VALIDATOR
        : SINGLE_EXACT_PROGRAM_VALIDATOR
    const validator = composeValidators(hasValue, programValidator)

    return (
        <ProgramPickerField
            name={NAME}
            multiSelect={multiSelect}
            validator={validator}
            label={LABEL}
            dataTest={DATATEST}
            {...rest}
        />
    )
}

ProgramPicker.propTypes = {
    multiSelect: PropTypes.bool,
}

export { ProgramPicker }

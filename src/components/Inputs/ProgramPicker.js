import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { hasValue, composeValidators } from '@dhis2/ui-forms'
import { ProgramPickerField } from '../../components/'
import {
    SINGLE_PROGRAM_VALIDATOR,
    SINGLE_EXACT_PROGRAM_VALIDATOR,
} from '../../components/ProgramPicker/ProgramPickerField'

const NAME = 'selectedPrograms'
const LABEL = i18n.t('Programs')
const DATATEST = 'input-program-picker'

const ProgramPicker = ({ multiSelect, show, ...rest }) => {
    const programValidator = multiSelect
        ? SINGLE_PROGRAM_VALIDATOR
        : SINGLE_EXACT_PROGRAM_VALIDATOR
    const validator = composeValidators(hasValue, programValidator)

    return (
        show && (
            <ProgramPickerField
                name={NAME}
                multiSelect={multiSelect}
                validator={validator}
                withActions={false}
                label={LABEL}
                dataTest={DATATEST}
                {...rest}
            />
        )
    )
}

ProgramPicker.defaultProps = {
    multiSelect: false,
    show: true,
}

ProgramPicker.propTypes = {
    multiSelect: PropTypes.bool,
    show: PropTypes.bool,
}

export { ProgramPicker }

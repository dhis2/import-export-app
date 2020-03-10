import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Field } from '@dhis2/ui-forms'

import { ProgramPicker } from '.'

const SINGLE_PROGRAM_VALIDATOR = selectedPrograms =>
    selectedPrograms.length == 0
        ? i18n.t('At least one program must be selected')
        : undefined

const SINGLE_EXACT_PROGRAM_VALIDATOR = selectedPrograms =>
    selectedPrograms.length != 1
        ? i18n.t('One program must be selected')
        : undefined

const ProgramPickerField = ({ name, ...rest }) => {
    return <Field component={ProgramPicker} name={name} {...rest} />
}

ProgramPickerField.propTypes = {
    name: PropTypes.string.isRequired,
}

export {
    ProgramPickerField,
    SINGLE_PROGRAM_VALIDATOR,
    SINGLE_EXACT_PROGRAM_VALIDATOR,
}

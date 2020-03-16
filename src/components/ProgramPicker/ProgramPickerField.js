import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Field } from '@dhis2/ui-forms'

import { ProgramPicker } from '../'

const SINGLE_PROGRAM_VALIDATOR = selectedPrograms =>
    selectedPrograms.length == 0
        ? i18n.t('At least one program must be selected')
        : undefined

const SINGLE_EXACT_PROGRAM_VALIDATOR = selectedPrograms =>
    selectedPrograms.length != 1
        ? i18n.t('One program must be selected')
        : undefined

const Wrapper = ({ input: { value, onChange }, meta, ...rest }) => (
    <ProgramPicker
        meta={meta}
        selected={value}
        setSelected={onChange}
        {...rest}
    />
)

Wrapper.propTypes = {
    input: PropTypes.shape({
        value: PropTypes.arrayOf(PropTypes.string).isRequired,
        onChange: PropTypes.func,
    }).isRequired,
    meta: PropTypes.shape({
        error: PropTypes.string,
        pristine: PropTypes.bool,
        touched: PropTypes.bool,
    }).isRequired,
}

const ProgramPickerField = ({ name, ...rest }) => {
    return <Field component={Wrapper} name={name} {...rest} />
}

ProgramPickerField.propTypes = {
    name: PropTypes.string.isRequired,
}

export {
    ProgramPickerField,
    SINGLE_PROGRAM_VALIDATOR,
    SINGLE_EXACT_PROGRAM_VALIDATOR,
}

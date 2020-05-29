import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { hasValue, composeValidators } from '@dhis2/ui-forms'
import { ResourcePickerField } from '../index'
import { resourceTypes } from '../ResourcePicker/resourceTypes'

const NAME = 'selectedPrograms'
const LABEL = i18n.t('Programs')
const DATATEST = 'input-program-picker'
const LISTNAME = 'programPicker'
const FILTERLABEL = i18n.t('Filter programs by name')
const ERRORMESSAGE = i18n.t('Something went wrong when loading the programs!')
const RESOURCETYPE = resourceTypes.PROGRAM

const SINGLE_PROGRAM_VALIDATOR = selectedPrograms =>
    selectedPrograms.length == 0
        ? i18n.t('At least one program must be selected')
        : undefined

const SINGLE_EXACT_PROGRAM_VALIDATOR = selectedPrograms =>
    selectedPrograms.length != 1
        ? i18n.t('One program must be selected')
        : undefined

const ProgramPicker = ({ multiSelect, show, ...rest }) => {
    const programValidator = multiSelect
        ? SINGLE_PROGRAM_VALIDATOR
        : SINGLE_EXACT_PROGRAM_VALIDATOR
    const validator = composeValidators(hasValue, programValidator)

    return (
        show && (
            <ResourcePickerField
                name={NAME}
                resourceType={RESOURCETYPE}
                errorMessage={ERRORMESSAGE}
                listName={LISTNAME}
                label={LABEL}
                filterLabel={FILTERLABEL}
                dataTest={DATATEST}
                multiSelect={multiSelect}
                validator={validator}
                withActions={false}
                autoSelectFirst={true}
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

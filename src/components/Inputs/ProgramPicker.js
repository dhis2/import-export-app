import i18n from '@dhis2/d2-i18n'
import { hasValue, composeValidators } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { ResourcePickerField } from '../index.js'
import { resourceTypes } from '../ResourcePicker/resourceTypes.js'

const NAME = 'selectedPrograms'
const LABEL = i18n.t('Program to export events from')
const DATATEST = 'input-program-picker'
const LISTNAME = 'selectedPrograms'
const FILTERLABEL = i18n.t('Filter programs')
const SELECTEDLABEL = i18n.t('Selected programs')
const ERRORMESSAGE = i18n.t('Something went wrong when loading the programs!')
const PROGRAM_RESOURCE_TYPE = resourceTypes.PROGRAM
const PROGRAM_WITH_EVENTS_RESOURCE_TYPE = resourceTypes.PROGRAM_WITH_EVENTS

const SINGLE_PROGRAM_VALIDATOR = (selectedPrograms) =>
    selectedPrograms.length == 0
        ? i18n.t('At least one program must be selected')
        : undefined

const SINGLE_EXACT_PROGRAM_VALIDATOR = (selectedPrograms) =>
    !selectedPrograms ? i18n.t('One program must be selected') : undefined

const ProgramPicker = ({
    multiSelect,
    label,
    show,
    includeEvents,
    ...rest
}) => {
    const programValidator = multiSelect
        ? SINGLE_PROGRAM_VALIDATOR
        : SINGLE_EXACT_PROGRAM_VALIDATOR
    const validator = composeValidators(hasValue, programValidator)
    const resourceType = includeEvents
        ? PROGRAM_WITH_EVENTS_RESOURCE_TYPE
        : PROGRAM_RESOURCE_TYPE

    return (
        show && (
            <div style={{ maxWidth: '480px' }}>
                <ResourcePickerField
                    name={NAME}
                    resourceType={resourceType}
                    errorMessage={ERRORMESSAGE}
                    listName={LISTNAME}
                    label={label}
                    filterLabel={FILTERLABEL}
                    selectedLabel={SELECTEDLABEL}
                    dataTest={DATATEST}
                    multiSelect={multiSelect}
                    validator={validator}
                    autoSelectFirst
                    {...rest}
                />
            </div>
        )
    )
}

ProgramPicker.defaultProps = {
    label: LABEL,
    multiSelect: false,
    show: true,
    includeEvents: false,
}

ProgramPicker.propTypes = {
    includeEvents: PropTypes.bool,
    label: PropTypes.string,
    multiSelect: PropTypes.bool,
    show: PropTypes.bool,
}

export { ProgramPicker }

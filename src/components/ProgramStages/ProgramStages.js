import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'

import { SelectField } from '../'
import { useProgramStages } from '../../hooks/'

const SINGLE_EXACT_PROGRAMSTAGE_VALIDATOR = programStage =>
    !programStage ? i18n.t('One program stage must be selected') : undefined

const ProgramStages = ({
    name,
    label,
    selectedPrograms,
    form,
    validator,
    dataTest,
}) => {
    const setProgramStage = val => form.change(name, val)
    const program =
        selectedPrograms.length > 0 ? selectedPrograms[0] : undefined

    const {
        loading: programStagesLoading,
        error: programStagesError,
        validationText: programStagesValidationText,
        programStages,
    } = useProgramStages(program, setProgramStage)

    return (
        <SelectField
            name={name}
            loading={programStagesLoading}
            label={label}
            validate={validator}
            dataTest={dataTest}
            options={programStages}
            validationText={programStagesValidationText}
            error={!!programStagesError}
            dense
        />
    )
}

ProgramStages.propTypes = {
    dataTest: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    selectedPrograms: PropTypes.array.isRequired,
    validator: PropTypes.func,
}

export { ProgramStages, SINGLE_EXACT_PROGRAMSTAGE_VALIDATOR }

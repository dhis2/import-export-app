import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'

import { Select } from '../Select'
import { useProgramStages } from '../../hooks/useProgramStages'

const SINGLE_EXACT_PROGRAMSTAGE_VALIDATOR = programStage =>
    !programStage ? i18n.t('One program stage must be selected') : undefined

const ProgramStages = ({ selectedPrograms, form, dataTest }) => {
    const setProgramStage = val => form.change('programStage', val)
    const program =
        selectedPrograms.length > 0 ? selectedPrograms[0] : undefined

    const {
        loading: programStagesLoading,
        error: programStagesError,
        validationText: programStagesValidationText,
        programStages,
    } = useProgramStages(program, setProgramStage)

    return (
        <Select
            name="programStage"
            loading={programStagesLoading}
            label={i18n.t('Program stage')}
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
    selectedPrograms: PropTypes.array.isRequired,
}

export { ProgramStages, SINGLE_EXACT_PROGRAMSTAGE_VALIDATOR }

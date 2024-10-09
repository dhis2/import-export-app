import i18n from '@dhis2/d2-i18n'
import { SingleSelectFieldFF } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { useProgramStages } from '../../hooks/index.js'
import { StyledField } from '../index.js'
import styles from './ProgramStages.module.css'

const SINGLE_EXACT_PROGRAMSTAGE_VALIDATOR = (programStage) =>
    !programStage ? i18n.t('One program stage must be selected') : undefined

const ProgramStages = ({
    name,
    label,
    selectedProgram,
    form,
    validator,
    dataTest,
}) => {
    const setProgramStage = (val) => form.change(name, val)

    const {
        loading: programStagesLoading,
        error: programStagesError,
        validationText: programStagesValidationText,
        programStages,
    } = useProgramStages(selectedProgram, setProgramStage)

    return (
        <div className={styles.container}>
            <StyledField
                component={SingleSelectFieldFF}
                name={name}
                loading={programStagesLoading}
                label={label}
                validate={validator}
                dataTest={dataTest}
                options={programStages}
                validationText={programStagesValidationText}
                error={!!programStagesError}
            />
        </div>
    )
}

ProgramStages.propTypes = {
    dataTest: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    selectedProgram: PropTypes.string.isRequired,
    validator: PropTypes.func,
}

export { ProgramStages, SINGLE_EXACT_PROGRAMSTAGE_VALIDATOR }

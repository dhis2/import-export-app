import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { hasValue, composeValidators } from '@dhis2/ui-forms'
import { ProgramStages as ProgramStagesGeneric } from '../'
import { SINGLE_EXACT_PROGRAMSTAGE_VALIDATOR } from '../ProgramStages/ProgramStages'

const VALIDATOR = composeValidators(
    hasValue,
    SINGLE_EXACT_PROGRAMSTAGE_VALIDATOR
)

const NAME = 'programStage'
const LABEL = i18n.t('Program stage')
const DATATEST = 'input-program-stage-select'

const ProgramStages = props => (
    <ProgramStagesGeneric
        name={NAME}
        label={LABEL}
        validator={VALIDATOR}
        dataTest={DATATEST}
        {...props}
    />
)

export { ProgramStages }

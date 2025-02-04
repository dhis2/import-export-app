import i18n from '@dhis2/d2-i18n'
import { hasValue, composeValidators } from '@dhis2/ui'
import React from 'react'
import { ProgramStages as ProgramStagesGeneric } from '../index.js'
import { SINGLE_EXACT_PROGRAMSTAGE_VALIDATOR } from '../ProgramStages/ProgramStages.jsx'

const VALIDATOR = composeValidators(
    hasValue,
    SINGLE_EXACT_PROGRAMSTAGE_VALIDATOR
)

const NAME = 'programStage'
const LABEL = i18n.t('Which program stage should be included?')
const DATATEST = 'input-program-stage-select'

const ProgramStages = (props) => (
    <ProgramStagesGeneric
        name={NAME}
        label={LABEL}
        validator={VALIDATOR}
        dataTest={DATATEST}
        {...props}
    />
)

export { ProgramStages }

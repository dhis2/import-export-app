import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { RadioGroupField } from '../'
import { assignedUserModeOptions } from '../../utils/options'

const NAME = 'assignedUserMode'
const DATATEST = 'input-assigned-user-mode'
const LABEL = i18n.t('Assigned user mode')

const AssignedUserMode = () => (
    <RadioGroupField
        name={NAME}
        label={LABEL}
        options={assignedUserModeOptions}
        dataTest={DATATEST}
    />
)

export { AssignedUserMode }

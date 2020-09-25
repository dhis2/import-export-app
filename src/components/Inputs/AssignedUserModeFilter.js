import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm, CheckboxFieldFF } from '@dhis2/ui'
import { FormField } from '../index'

const { Field } = ReactFinalForm

const NAME = 'assignedUserModeFilter'
const DATATEST = 'input-assigned-user-mode-filter'
const SHORT_LABEL = i18n.t('Filter by assigned user mode')
const LABEL = i18n.t(
    'Filter tracked entity instances with events assigned to specific users'
)

const AssignedUserModeFilter = () => (
    <FormField label={SHORT_LABEL} dataTest={DATATEST}>
        <Field
            type="checkbox"
            component={CheckboxFieldFF}
            name={NAME}
            label={LABEL}
            dataTest={`${DATATEST}-sf`}
        />
    </FormField>
)

export { AssignedUserModeFilter }

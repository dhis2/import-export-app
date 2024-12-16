import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm, CheckboxFieldFF } from '@dhis2/ui'
import React from 'react'
import { FormField, RadioGroupField } from '../index.js'
import { UserPicker } from './index.js'

const { useField, Field } = ReactFinalForm

const assignedUserModeOptions = [
    { value: 'ANY', label: i18n.t('Any user') },
    { value: 'CURRENT', label: i18n.t('Current user') },
    { value: 'NONE', label: i18n.t('No user/unassigned') },
    { value: 'PROVIDED', label: i18n.t('Selected users') },
]
const defaultAssignedUserModeOption = assignedUserModeOptions[0].value

const FILTER_NAME = 'assignedUserModeFilter'
const FILTER_DATATEST = 'input-assigned-user-mode-filter'
const FILTER_SHORT_LABEL = i18n.t('Filter by assigned user')
const FILTER_LABEL = i18n.t(
    'Export only instances with events assigned to specific users'
)

const NAME = 'assignedUserMode'
const DATATEST = 'input-assigned-user-mode'
const LABEL = i18n.t('Assigned user(s)')

const AssignedUserMode = () => {
    const { input: filterInput } = useField(FILTER_NAME)
    const { value: showOptions } = filterInput

    const { input: userInput } = useField(NAME)
    const { value: userMode } = userInput
    const showUserPicker = userMode === 'PROVIDED'

    return (
        <>
            <FormField label={FILTER_SHORT_LABEL} dataTest={FILTER_DATATEST}>
                <Field
                    type="checkbox"
                    component={CheckboxFieldFF}
                    name={FILTER_NAME}
                    label={FILTER_LABEL}
                    dataTest={`${FILTER_DATATEST}-sf`}
                />
                {showOptions && (
                    <div
                        style={{
                            marginLeft: 'var(--spacers-dp16)',
                            marginTop: 'var(--spacers-dp16)',
                        }}
                    >
                        <RadioGroupField
                            name={NAME}
                            options={assignedUserModeOptions}
                            dataTest={DATATEST}
                            label={LABEL}
                        />
                        <UserPicker show={showUserPicker} />
                    </div>
                )}
            </FormField>
        </>
    )
}

export { AssignedUserMode, defaultAssignedUserModeOption }

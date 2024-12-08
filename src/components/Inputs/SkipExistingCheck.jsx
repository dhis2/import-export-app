import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm, CheckboxFieldFF } from '@dhis2/ui'
import React from 'react'
import { FormField } from '../index.js'

const { Field } = ReactFinalForm

const defaultSkipExistingCheckOption = false

const NAME = 'skipExistingCheck'
const DATATEST = 'input-skip-exisiting-check'
const SHORT_LABEL = i18n.t('Skip exisiting check')
const LABEL = i18n.t('Skip checks for existing data values')
const HELPTEXT = i18n.t(
    'Improves performance and should only be used for empty databases or when the data values to import do not exist already'
)

const SkipExistingCheck = () => (
    <FormField label={SHORT_LABEL} dataTest={DATATEST}>
        <Field
            type="checkbox"
            component={CheckboxFieldFF}
            name={NAME}
            label={LABEL}
            helpText={HELPTEXT}
            dataTest={`${DATATEST}-sf`}
        />
    </FormField>
)

export { SkipExistingCheck, defaultSkipExistingCheckOption }

import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm, CheckboxFieldFF } from '@dhis2/ui'
import React from 'react'
import { FormField } from '../index.js'

const { Field } = ReactFinalForm
const defaultSkipValidationOption = false

const NAME = 'skipValidation'
const DATATEST = 'input-skip-validation'
const SHORT_LABEL = i18n.t('Skip validation')
const LABEL = i18n.t('Skip validation for import (not recommended)')

const SkipValidation = () => (
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

export { SkipValidation, defaultSkipValidationOption }

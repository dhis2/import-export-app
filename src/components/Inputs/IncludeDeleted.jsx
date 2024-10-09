import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm, CheckboxFieldFF } from '@dhis2/ui'
import React from 'react'
import { FormField } from '../index.js'

const { Field } = ReactFinalForm

const NAME = 'includeDeleted'
const DATATEST = 'input-include-deleted'
const SHORT_LABEL = i18n.t('Include deleted')
const LABEL = i18n.t('Include deleted data in export')

const IncludeDeleted = () => (
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

export { IncludeDeleted }

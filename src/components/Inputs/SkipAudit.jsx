import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm, CheckboxFieldFF } from '@dhis2/ui'
import React from 'react'
import { FormField } from '../index.js'

const { Field } = ReactFinalForm

const defaultSkipAuditOption = false

const NAME = 'skipAudit'
const DATATEST = 'input-has-authority-to-skip-audit'
const SHORT_LABEL = i18n.t('Skip audit')
const LABEL = i18n.t('Skip audit, meaning audit values will not be generated')
const HELPTEXT = i18n.t(
    'Improves performance at the cost of ability to audit changes'
)

const SkipAudit = () => (
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

export { SkipAudit, defaultSkipAuditOption }

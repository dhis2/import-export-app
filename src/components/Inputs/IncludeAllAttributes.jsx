import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm, CheckboxFieldFF } from '@dhis2/ui'
import React from 'react'
import { FormField } from '../index.js'

const { Field } = ReactFinalForm

const NAME = 'includeAllAttributes'
const DATATEST = 'input-include-all-attributes'
const SHORT_LABEL = i18n.t('Include all attributes')
const LABEL = i18n.t('Include all attributes')

const IncludeAllAttributes = () => (
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

export { IncludeAllAttributes }

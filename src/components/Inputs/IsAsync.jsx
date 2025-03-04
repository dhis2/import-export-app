import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm, CheckboxFieldFF } from '@dhis2/ui'
import React from 'react'
import { FormField } from '../index.js'

const { Field } = ReactFinalForm

const defaultIsAsyncOption = true

const NAME = 'isAsync'
const DATATEST = 'input-is-async'
const SHORT_LABEL = i18n.t('Async')
const LABEL = i18n.t('Asynchronous import')
const HELPTEXT = i18n.t('Controls whether the import is done asynchronously')

const IsAsync = () => (
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

export { IsAsync, defaultIsAsyncOption }

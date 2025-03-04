import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm, CheckboxFieldFF } from '@dhis2/ui'
import React from 'react'
import { FormField } from '../index.js'

const { Field } = ReactFinalForm

const defaultPreheatCacheOption = false

const NAME = 'preheatCache'
const DATATEST = 'input-preheat-cache'
const SHORT_LABEL = i18n.t('Preheat cache')
const LABEL = i18n.t('Preheat cache to make large imports faster')
const HELPTEXT = i18n.t(
    'Large imports will be processed faster but will consume more resources'
)

const PreheatCache = () => (
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

export { PreheatCache, defaultPreheatCacheOption }

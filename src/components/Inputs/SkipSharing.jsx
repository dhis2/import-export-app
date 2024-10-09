import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm, CheckboxFieldFF } from '@dhis2/ui'
import React from 'react'
import { FormField } from '../index.js'

const { Field } = ReactFinalForm

const defaultSkipSharingOption = false

const NAME = 'skipSharing'
const DATATEST = 'input-skip-sharing'
const SHORT_LABEL = i18n.t('Skip sharing')
const LABEL = i18n.t('Skip sharing and access settings')
const HELPTEXT = i18n.t(
    'Skip sharing properties, do not merge sharing when doing updates, and do not add user group access when creating new objects'
)

const SkipSharing = () => (
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

export { SkipSharing, defaultSkipSharingOption }

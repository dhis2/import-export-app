import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm, CheckboxFieldFF } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { FormField } from '../index.js'

const { Field } = ReactFinalForm

const defaultFirstRowIsHeaderOption = false

const NAME = 'firstRowIsHeader'
const DATATEST = 'input-first-row-is-header'
const SHORT_LABEL = i18n.t('Is the first row a header row?')
const LABEL = i18n.t('First row is header')
const HELPTEXT = i18n.t('A header row will be ignored during import')

const FirstRowIsHeader = ({ show }) =>
    show && (
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

FirstRowIsHeader.propTypes = {
    show: PropTypes.bool.isRequired,
}

export { FirstRowIsHeader, defaultFirstRowIsHeaderOption }

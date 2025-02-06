import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm, FileInputFieldFF } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { FormField } from '../index.js'
const { Field } = ReactFinalForm

const SINGLE_FILE_VALIDATOR = (files) =>
    !files || files.length == 0 ? i18n.t('Please select a file') : undefined

const FileUpload = ({
    initialValue,
    required,
    name,
    label,
    helpText,
    accept = '*',
    validator,
    dataTest,
}) => {
    return (
        <FormField label={label} required={required} dataTest={dataTest}>
            <Field
                component={FileInputFieldFF}
                name={name}
                accept={accept}
                required={required}
                initialValue={initialValue}
                validate={validator}
                dataTest={`${dataTest}-fileinput`}
                helpText={helpText}
            />
        </FormField>
    )
}

FileUpload.propTypes = {
    dataTest: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    accept: PropTypes.string,
    helpText: PropTypes.string,
    initialValue: PropTypes.instanceOf(File),
    required: PropTypes.bool,
    validator: PropTypes.func,
}

export { FileUpload, SINGLE_FILE_VALIDATOR }

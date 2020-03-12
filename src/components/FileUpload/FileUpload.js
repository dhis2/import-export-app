import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import { Field, FileInput } from '@dhis2/ui-forms'

import { FormField } from '../FormField'

const SINGLE_FILE_VALIDATOR = files =>
    !files || files.length == 0 ? i18n.t('Please select a file') : undefined

const FileUpload = ({
    initialValue,
    required,
    name,
    label,
    accept = '*',
    validator,
    dataTest,
}) => {
    return (
        <FormField label={label} required={required} dataTest={dataTest}>
            <Field
                component={FileInput}
                name={name}
                accept={accept}
                required={required}
                initialValue={initialValue}
                validate={validator}
                dataTest={`${dataTest}-fileinput`}
            />
        </FormField>
    )
}

FileUpload.propTypes = {
    dataTest: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    accept: PropTypes.string,
    initialValue: PropTypes.instanceOf(File),
    required: PropTypes.bool,
    validator: PropTypes.func,
}

export { FileUpload, SINGLE_FILE_VALIDATOR }

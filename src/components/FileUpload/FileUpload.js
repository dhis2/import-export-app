import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { FileInput } from '@dhis2/ui-core'

// import s from './FileUpload.module.css';
import { FormField } from '../FormField'

const FileUpload = ({
    file,
    setFile,
    required,
    name,
    label = i18n.t('File'),
    accept = '*',
    dataTest,
}) => {
    const fileLabel = file ? file.name : i18n.t('Choose a file to upload')

    const onFileSelect = ({ files }) => {
        setFile(files[0])
    }

    return (
        <FormField label={label} required={required} dataTest={dataTest}>
            <FileInput
                accept={accept}
                name={name}
                onChange={onFileSelect}
                buttonLabel={fileLabel}
                dataTest={`${dataTest}-fileinput`}
            />
        </FormField>
    )
}

FileUpload.propTypes = {
    dataTest: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    setFile: PropTypes.func.isRequired,
    accept: PropTypes.string,
    file: PropTypes.instanceOf(File),
    label: PropTypes.string,
    required: PropTypes.bool,
}

export { FileUpload }

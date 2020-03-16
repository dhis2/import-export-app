import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { FileUpload as FileUploadGeneric } from '../'
import { SINGLE_FILE_VALIDATOR } from '../FileUpload/FileUpload'

const NAME = 'files'
const LABEL = i18n.t('File')
const DATATEST = 'input-file-upload'
const VALIDATOR = SINGLE_FILE_VALIDATOR

const FileUpload = () => (
    <FileUploadGeneric
        name={NAME}
        label={LABEL}
        validator={VALIDATOR}
        dataTest={DATATEST}
    />
)

export { FileUpload }

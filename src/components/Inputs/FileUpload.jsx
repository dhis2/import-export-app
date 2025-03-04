import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { SINGLE_FILE_VALIDATOR } from '../FileUpload/FileUpload.jsx'
import { FileUpload as FileUploadGeneric } from '../index.js'

const NAME = 'files'
const LABEL = i18n.t('Select a file to import values from')
const DATATEST = 'input-file-upload'
const VALIDATOR = SINGLE_FILE_VALIDATOR

const FileUpload = ({ helpText }) => (
    <FileUploadGeneric
        name={NAME}
        label={LABEL}
        validator={VALIDATOR}
        dataTest={DATATEST}
        helpText={helpText}
    />
)

FileUpload.propTypes = {
    helpText: PropTypes.string,
}

export { FileUpload }

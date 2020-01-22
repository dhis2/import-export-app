import React, { useCallback, useRef } from 'react';
import i18n from '@dhis2/d2-i18n';
import { FileInput } from '@dhis2/ui-core';

import s from './FileUpload.module.css';
import { FormField } from '../FormField';

const FileUpload = ({
    file,
    setFile,
    required = true,
    name,
    label = i18n.t('File'),
    accept = '*',
}) => {
    const fileLabel = file ? file.name : i18n.t('Choose a file to upload');

    const onFileSelect = ({ files }, e) => {
        setFile(files[0]);
    };

    return (
        <FormField label={label}>
            <FileInput
                accept={accept}
                name={name}
                onChange={onFileSelect}
                buttonLabel={fileLabel}
            />
        </FormField>
    );
};

export { FileUpload };

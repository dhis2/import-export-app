import React, { useCallback, useRef } from 'react';
import i18n from '@dhis2/d2-i18n';
import { Button } from '@dhis2/ui-core';

import s from './FileUpload.module.css';
import { FormField } from '../FormField';
import { UploadIcon } from '../Icon';

const FileUpload = ({
    file,
    setFile,
    required = true,
    label = i18n.t('File'),
}) => {
    const inputRef = useRef();
    const fileLabel = file ? file.name : i18n.t('Choose a file to upload');

    const onButtonClick = useCallback(() => {
        inputRef.current.click();
    }, [inputRef]);

    const onFileSelect = () => {
        setFile(inputRef.current.files[0]);
    };

    return (
        <FormField label={label}>
            <input
                onChange={onFileSelect}
                ref={inputRef}
                type="file"
                className={s.input}
            />

            <Button type="button" onClick={onButtonClick}>
                <UploadIcon />
                <span className={s.label}>{fileLabel}</span>
            </Button>
        </FormField>
    );
};

export { FileUpload };

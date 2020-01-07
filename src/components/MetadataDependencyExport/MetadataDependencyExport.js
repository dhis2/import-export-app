import React, { useState } from 'react';
import { useConfig } from '@dhis2/app-runtime';
import i18n from '@dhis2/d2-i18n';
import { Button } from '@dhis2/ui-core';

import { metadataDependencyExportPage as p } from '../../utils/pages';
import {
    formatNoCsvOptions,
    compressionOptions,
    sharingOptions,
    objectTypeOptions,
    defaultFormatOption,
    defaultCompressionOption,
    defaultSharingOption,
    defaultObjectTypeOption,
} from '../../utils/options';
import { Page } from '../Page';
import { RadioGroup } from '../RadioGroup';
import { Select } from '../Select';
import { ObjectSelect } from './ObjectSelect/';

const MetadataDependencyExport = () => {
    const [objectType, setObjectType] = useState(defaultObjectTypeOption.value);
    const [objectListSelected, setObjectListSelected] = useState(undefined);
    const [format, setFormat] = useState(defaultFormatOption.value);
    const [compression, setCompression] = useState(
        defaultCompressionOption.value
    );
    const [sharing, setSharing] = useState(defaultSharingOption.value);
    const { baseUrl } = useConfig();

    const exportHandler = () => {
        const apiBaseUrl = `${baseUrl}/api/`;
        const endpoint = `${objectType}/${objectListSelected}/metadata`;
        const endpointExtension = compression
            ? `${format}.${compression}`
            : format;
        const downloadUrlParams = `skipSharing=${sharing}&download=true`;
        const url = `${apiBaseUrl}${endpoint}.${endpointExtension}?${downloadUrlParams}`;
        window.location = url;
    };

    return (
        <Page title={p.name} desc={p.description} icon={p.icon}>
            <Select
                filled
                initialFocus
                name="objectType"
                label={i18n.t('Object type')}
                options={objectTypeOptions}
                setValue={setObjectType}
                selected={objectType}
            />
            <ObjectSelect
                name="objectList"
                label={i18n.t('Object')}
                type={objectType}
                setSelected={setObjectListSelected}
                selected={objectListSelected}
            />
            <RadioGroup
                name="format"
                label={i18n.t('Format')}
                options={formatNoCsvOptions}
                setValue={setFormat}
                checked={format}
            />
            <RadioGroup
                name="compression"
                label={i18n.t('Compression')}
                options={compressionOptions}
                setValue={setCompression}
                checked={compression}
            />
            <RadioGroup
                name="sharing"
                label={i18n.t('Sharing')}
                options={sharingOptions}
                setValue={setSharing}
                checked={sharing}
            />
            <Button
                primary
                disabled={objectListSelected == undefined}
                onClick={exportHandler}
            >
                {i18n.t('Export')}
            </Button>
        </Page>
    );
};

export { MetadataDependencyExport };

import React, { useState } from 'react'
import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { Button } from '@dhis2/ui-core'

import { locationAssign } from '../../utils/helper'
import {
    formatNoCsvOptions,
    compressionOptions,
    objectTypeOptions,
    defaultFormatOption,
    defaultCompressionOption,
    defaultObjectTypeOption,
} from '../../utils/options'
import { useObjects } from '../../hooks/useObjects'
import { Page } from '../../components/Page'
import { Switch } from '../../components/Switch'
import { RadioGroup } from '../../components/RadioGroup'
import { Select } from '../../components/Select'
import { MetadataDependencyExportIcon } from '../../components/Icon'

const MetadataDependencyExport = () => {
    const [objectType, setObjectType] = useState(defaultObjectTypeOption)
    const [objectListSelected, setObjectListSelected] = useState(undefined)
    const [format, setFormat] = useState(defaultFormatOption)
    const [compression, setCompression] = useState(defaultCompressionOption)
    const [skipSharing, setSkipSharing] = useState(false)
    const { baseUrl } = useConfig()

    const {
        loading: objectsLoading,
        error: objectsError,
        validationText: objectsValidationText,
        objects,
    } = useObjects(objectType, setObjectListSelected)

    const onExport = () => {
        const apiBaseUrl = `${baseUrl}/api/`
        const endpoint = `${objectType.value}/${objectListSelected.value}/metadata`
        const endpointExtension = compression.value
            ? `${format.value}.${compression.value}`
            : format.value
        const downloadUrlParams = `skipSharing=${skipSharing}&download=true`
        const url = `${apiBaseUrl}${endpoint}.${endpointExtension}?${downloadUrlParams}`
        locationAssign(url)
    }

    return (
        <Page
            title={PAGE_NAME}
            desc={PAGE_DESCRIPTION}
            icon={PAGE_ICON}
            dataTest="page-export-metadata-dependency"
        >
            <Select
                filled
                initialFocus
                name="objectType"
                label={i18n.t('Object type')}
                options={objectTypeOptions}
                setValue={setObjectType}
                selected={objectType}
                dataTest="input-object-type"
            />
            <Select
                loading={objectsLoading}
                name="object"
                label={i18n.t('Object')}
                options={objects}
                selected={objectListSelected}
                setValue={setObjectListSelected}
                dataTest="input-object-select"
                validationText={objectsValidationText}
                error={!!objectsError}
                filterable
                dense
            />
            <RadioGroup
                name="format"
                label={i18n.t('Format')}
                options={formatNoCsvOptions}
                setValue={setFormat}
                checked={format}
                dataTest="input-format"
            />
            <RadioGroup
                name="compression"
                label={i18n.t('Compression')}
                options={compressionOptions}
                setValue={setCompression}
                checked={compression}
                dataTest="input-compression"
            />
            <Switch
                name="skipSharing"
                label={i18n.t('Skip sharing')}
                checked={skipSharing}
                setChecked={setSkipSharing}
                dataTest="input-skip-sharing"
            />
            <Button
                primary
                disabled={objectListSelected == undefined}
                onClick={onExport}
                dataTest="input-export-submit"
            >
                {i18n.t('Export')}
            </Button>
        </Page>
    )
}

// PAGE INFO
const PAGE_NAME = i18n.t('Metadata dependency export')
const PAGE_DESCRIPTION = i18n.t(
    'Export metadata like data sets and programs including related metadata objects in the XML or JSON format.'
)
const PAGE_ICON = <MetadataDependencyExportIcon />

export { MetadataDependencyExport }

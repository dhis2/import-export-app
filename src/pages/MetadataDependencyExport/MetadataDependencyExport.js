import React, { useState } from 'react'
import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { Button } from '@dhis2/ui-core'

import { metadataDependencyExportPage as p } from '../../utils/pages'
import { testIds } from '../../utils/testIds'
import {
    formatNoCsvOptions,
    compressionOptions,
    objectTypeOptions,
    defaultFormatOption,
    defaultCompressionOption,
    defaultObjectTypeOption,
} from '../../utils/options'
import { Page } from '../../components/Page'
import { Switch } from '../../components/Switch'
import { RadioGroup } from '../../components/RadioGroup'
import { Select } from '../../components/Select'
import { ObjectSelect } from './ObjectSelect/'

const MetadataDependencyExport = () => {
    const [objectType, setObjectType] = useState(defaultObjectTypeOption)
    const [objectListSelected, setObjectListSelected] = useState(undefined)
    const [format, setFormat] = useState(defaultFormatOption)
    const [compression, setCompression] = useState(defaultCompressionOption)
    const [skipSharing, setSkipSharing] = useState(false)
    const { baseUrl } = useConfig()

    const onExport = () => {
        const apiBaseUrl = `${baseUrl}/api/`
        const endpoint = `${objectType.value}/${objectListSelected.value}/metadata`
        const endpointExtension = compression.value
            ? `${format.value}.${compression.value}`
            : format.value
        const downloadUrlParams = `skipSharing=${skipSharing}&download=true`
        const url = `${apiBaseUrl}${endpoint}.${endpointExtension}?${downloadUrlParams}`
        window.location = url
    }

    return (
        <Page
            title={p.name}
            desc={p.description}
            icon={p.icon}
            dataTest={testIds.MetadataDependencyExport.Page}
        >
            <Select
                filled
                initialFocus
                name="objectType"
                label={i18n.t('Object type')}
                options={objectTypeOptions}
                setValue={setObjectType}
                selected={objectType}
                dataTest={testIds.MetadataDependencyExport.objectType}
            />
            <ObjectSelect
                name="objectList"
                label={i18n.t('Object')}
                type={objectType}
                setSelected={setObjectListSelected}
                selected={objectListSelected}
                filterable
                dataTest={testIds.MetadataDependencyExport.ObjectSelect}
            />
            <RadioGroup
                name="format"
                label={i18n.t('Format')}
                options={formatNoCsvOptions}
                setValue={setFormat}
                checked={format}
                dataTest={testIds.MetadataDependencyExport.format}
            />
            <RadioGroup
                name="compression"
                label={i18n.t('Compression')}
                options={compressionOptions}
                setValue={setCompression}
                checked={compression}
                dataTest={testIds.MetadataDependencyExport.compression}
            />
            <Switch
                name="skipSharing"
                label={i18n.t('Skip sharing')}
                checked={skipSharing}
                setChecked={setSkipSharing}
                dataTest={testIds.MetadataDependencyExport.skipSharing}
            />
            <Button
                primary
                disabled={objectListSelected == undefined}
                onClick={onExport}
                dataTest={testIds.MetadataDependencyExport.submit}
            >
                {i18n.t('Export')}
            </Button>
        </Page>
    )
}

export { MetadataDependencyExport }

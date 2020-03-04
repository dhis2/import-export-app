import React, { useState } from 'react'
import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { Button } from '@dhis2/ui-core'

import { metadataExportPage as p } from '../../utils/pages'
import { locationAssign } from '../../utils/helper'
import {
    formatOptions,
    compressionOptions,
    defaultFormatOption,
    defaultCompressionOption,
} from '../../utils/options'
import { EXCLUDE_SCHEMAS } from './helper'
import { Schemas } from '../../components/Schemas'
import { Page } from '../../components/Page'
import { Switch } from '../../components/Switch'
import { RadioGroup } from '../../components/RadioGroup'
import { FormAlerts } from '../../components/FormAlerts'

const MetadataExport = () => {
    const [checkedSchemas, setCheckedSchemas] = useState([])
    const [format, setFormat] = useState(defaultFormatOption)
    const [compression, setCompression] = useState(defaultCompressionOption)
    const [skipSharing, setSkipSharing] = useState(false)
    const [alerts, setAlerts] = useState([])
    const { baseUrl } = useConfig()

    const onExport = () => {
        // validate
        const alerts = []
        const timestamp = new Date().getTime()

        if (checkedSchemas.length == 0) {
            alerts.push({
                id: `schemas-length-${timestamp}`,
                warning: true,
                message: i18n.t('At least one schema must be selected'),
            })
        }

        setAlerts(alerts)

        if (alerts.length != 0) {
            return
        }

        // generate download url
        const apiBaseUrl = `${baseUrl}/api/`
        const endpoint = `metadata`
        const endpointExtension = compression.value
            ? `${format.value}.${compression.value}`
            : format.value
        const schemaParams = checkedSchemas
            .map(name => `${name}=true`)
            .join('&')
        const downloadUrlParams = `skipSharing=${skipSharing}&download=true&${schemaParams}`
        const url = `${apiBaseUrl}${endpoint}.${endpointExtension}?${downloadUrlParams}`
        locationAssign(url)
    }

    return (
        <Page
            title={p.name}
            desc={p.description}
            icon={p.icon}
            dataTest="page-export-metadata"
        >
            <Schemas
                excludeSchemas={EXCLUDE_SCHEMAS}
                setCheckedSchemas={setCheckedSchemas}
                checkedByDefault
                dataTest="input-schemas"
            />
            <RadioGroup
                name="format"
                label={i18n.t('Format')}
                options={formatOptions}
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
            <Button primary onClick={onExport} dataTest="input-export-submit">
                {i18n.t('Export')}
            </Button>
            <FormAlerts alerts={alerts} dataTest="input-form-alerts" />
        </Page>
    )
}

export { MetadataExport }

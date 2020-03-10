import React from 'react'
import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { Form, hasValue, composeValidators } from '@dhis2/ui-forms'
import { Button } from '@dhis2/ui-core'

import { locationAssign } from '../../utils/helper'
import {
    formatOptions,
    compressionOptions,
    defaultFormatOption,
    defaultCompressionOption,
} from '../../utils/options'
import { EXCLUDE_SCHEMAS } from './helper'
import { SchemasField, SINGLE_SCHEMA_VALIDATOR } from '../../components/Schemas'
import { Page } from '../../components/Page'
import { Switch } from '../../components/Switch'
import { RadioGroupField } from '../../components/RadioGroup'
import { MetadataExportIcon } from '../../components/Icon'

const initialValues = {
    checkedSchemas: [],
    format: defaultFormatOption,
    compression: defaultCompressionOption,
    skipSharing: false,
}

const MetadataExport = () => {
    const { baseUrl } = useConfig()

    const onExport = values => {
        const { checkedSchemas, format, compression, skipSharing } = values

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

    const validate = values => ({
        checkedSchemas: composeValidators(
            hasValue,
            SINGLE_SCHEMA_VALIDATOR
        )(values.checkedSchemas),
    })

    return (
        <Page
            title={PAGE_NAME}
            desc={PAGE_DESCRIPTION}
            icon={PAGE_ICON}
            dataTest="page-export-metadata"
        >
            <Form
                onSubmit={onExport}
                initialValues={initialValues}
                validate={validate}
                render={({ handleSubmit, form }) => (
                    <form onSubmit={handleSubmit}>
                        <SchemasField
                            name="checkedSchemas"
                            excludeSchemas={EXCLUDE_SCHEMAS}
                            checkedByDefault
                            dataTest="input-schemas"
                        />
                        <RadioGroupField
                            name="format"
                            label={i18n.t('Format')}
                            options={formatOptions}
                            dataTest="input-format"
                        />
                        <RadioGroupField
                            name="compression"
                            label={i18n.t('Compression')}
                            options={compressionOptions}
                            dataTest="input-compression"
                        />
                        <Switch
                            name="skipSharing"
                            label={i18n.t('Skip sharing')}
                            dataTest="input-skip-sharing"
                        />
                        <Button
                            primary
                            type="submit"
                            dataTest="input-export-submit"
                        >
                            {i18n.t('Export')}
                        </Button>
                    </form>
                )}
            />
        </Page>
    )
}

// PAGE INFO
const PAGE_NAME = i18n.t('Metadata export')
const PAGE_DESCRIPTION = i18n.t(
    'Export meta data like data elements and organisation units in the XML, JSON or CSV format.'
)
const PAGE_ICON = <MetadataExportIcon />

export { MetadataExport }

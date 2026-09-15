import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm } from '@dhis2/ui'
import React, { useState } from 'react'
import {
    Page,
    MetadataExportIcon,
    MoreOptions,
    ValidationSummary,
} from '../../components/index.js'
import {
    Format,
    formatNoXmlNoCsvOptions,
    defaultFormatOption,
    Schemas,
    Compression,
    defaultCompressionOption,
    SkipSharing,
    InclusionStrategy,
    defaultInclusionStrategyOption,
    ExportButton,
    FormAlerts,
} from '../../components/Inputs/index.js'
import { onExport } from './form-helper.js'

const { Form } = ReactFinalForm

// PAGE INFO
export const PAGE_NAME = i18n.t('Metadata export')
export const PAGE_DESCRIPTION = i18n.t(
    'Export metadata, such as data elements and organisation units, in JSON format.'
)
const PAGE_ICON = <MetadataExportIcon />

const initialValues = {
    checkedSchemas: [],
    format: defaultFormatOption,
    compression: defaultCompressionOption,
    skipSharing: false,
    inclusionStrategy: defaultInclusionStrategyOption,
}

const MetadataExport = () => {
    const [exportEnabled, setExportEnabled] = useState(true)
    const { baseUrl } = useConfig()
    const onSubmit = onExport(baseUrl, setExportEnabled)

    return (
        <Page
            title={PAGE_NAME}
            desc={PAGE_DESCRIPTION}
            icon={PAGE_ICON}
            limitWidth={false}
            loading={!exportEnabled}
            dataTest="page-export-metadata"
        >
            <Form
                onSubmit={onSubmit}
                initialValues={initialValues}
                subscription={{
                    values: true,
                    submitError: true,
                }}
                render={({ handleSubmit, submitError }) => (
                    <form onSubmit={handleSubmit}>
                        <Schemas />
                        <Format availableFormats={formatNoXmlNoCsvOptions} />
                        <Compression />
                        <SkipSharing />
                        <MoreOptions>
                            <InclusionStrategy />
                        </MoreOptions>
                        <ValidationSummary />
                        <ExportButton
                            label={i18n.t('Export metadata')}
                            disabled={!exportEnabled}
                        />
                        <FormAlerts alerts={submitError} />
                    </form>
                )}
            />
        </Page>
    )
}

export { MetadataExport }

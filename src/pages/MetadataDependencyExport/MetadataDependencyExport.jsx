import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm } from '@dhis2/ui'
import React, { useState } from 'react'
import {
    Page,
    MetadataDependencyExportIcon,
    ValidationSummary,
} from '../../components/index.js'
import {
    Format,
    formatNoXmlNoCsvOptions,
    defaultFormatOption,
    Compression,
    defaultCompressionOption,
    ObjectType,
    defaultObjectTypeOption,
    Objects,
    SkipSharing,
    ExportButton,
} from '../../components/Inputs/index.js'
import { onExport } from './form-helper.js'

const { Form } = ReactFinalForm

// PAGE INFO
export const PAGE_NAME = i18n.t('Metadata dependency export')
export const PAGE_DESCRIPTION = i18n.t(
    'Export metadata dependencies, such as data sets and programs, including related metadata objects, in JSON format.'
)
const PAGE_ICON = <MetadataDependencyExportIcon />

const initialValues = {
    objectType: defaultObjectTypeOption,
    object: undefined,
    format: defaultFormatOption,
    compression: defaultCompressionOption,
    skipSharing: false,
}

const MetadataDependencyExport = () => {
    const [exportEnabled, setExportEnabled] = useState(true)
    const { baseUrl } = useConfig()
    const onSubmit = onExport(baseUrl, setExportEnabled)

    return (
        <Page
            title={PAGE_NAME}
            desc={PAGE_DESCRIPTION}
            icon={PAGE_ICON}
            loading={!exportEnabled}
            dataTest="page-export-metadata-dependency"
        >
            <Form
                onSubmit={onSubmit}
                initialValues={initialValues}
                subscription={{
                    values: true,
                }}
                render={({ handleSubmit, form, values }) => (
                    <form onSubmit={handleSubmit}>
                        <ObjectType />
                        <Objects objectType={values.objectType} form={form} />
                        <Format availableFormats={formatNoXmlNoCsvOptions} />
                        <Compression />
                        <SkipSharing />
                        <ValidationSummary />
                        <ExportButton
                            label={i18n.t('Export metadata dependencies')}
                            disabled={!exportEnabled}
                        />
                    </form>
                )}
            />
        </Page>
    )
}

export { MetadataDependencyExport }

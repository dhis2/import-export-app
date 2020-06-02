import React from 'react'
import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { Form } from '@dhis2/ui-forms'

import {
    Format,
    formatNoCsvOptions,
    defaultFormatOption,
    Compression,
    defaultCompressionOption,
    ObjectType,
    defaultObjectTypeOption,
    Objects,
    SkipSharing,
    ExportButton,
} from '../../components/Inputs'
import { Page, MetadataDependencyExportIcon } from '../../components/'
import { onExport } from './form-helper'

// PAGE INFO
const PAGE_NAME = i18n.t('Metadata dependency export')
const PAGE_DESCRIPTION = i18n.t(
    'Export metadata like data sets and programs including related metadata objects in the XML or JSON format.'
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
    const { baseUrl } = useConfig()
    const onSubmit = onExport(baseUrl)

    return (
        <Page
            title={PAGE_NAME}
            desc={PAGE_DESCRIPTION}
            icon={PAGE_ICON}
            dataTest="page-export-metadata-dependency"
        >
            <Form
                onSubmit={onSubmit}
                initialValues={initialValues}
                render={({ handleSubmit, form, values }) => (
                    <form onSubmit={handleSubmit}>
                        <ObjectType />
                        <Objects objectType={values.objectType} form={form} />
                        <Format availableFormats={formatNoCsvOptions} />
                        <Compression />
                        <SkipSharing />
                        <ExportButton />
                    </form>
                )}
            />
        </Page>
    )
}

export { MetadataDependencyExport }

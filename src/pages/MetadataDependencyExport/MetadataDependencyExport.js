import React from 'react'
import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { Form, hasValue, composeValidators } from '@dhis2/ui-forms'
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
import { Page } from '../../components/Page'
import { Switch } from '../../components/Switch'
import { RadioGroupField } from '../../components/RadioGroup'
import {
    Objects,
    SINGLE_EXACT_OBJECT_VALIDATOR,
} from '../../components/Objects'
import { SelectField } from '../../components/Select'
import { MetadataDependencyExportIcon } from '../../components/Icon'

const initialValues = {
    objectType: defaultObjectTypeOption,
    object: undefined,
    format: defaultFormatOption,
    compression: defaultCompressionOption,
    skipSharing: false,
}

const MetadataDependencyExport = () => {
    const { baseUrl } = useConfig()

    const onExport = values => {
        const { objectType, object, format, compression, skipSharing } = values

        const apiBaseUrl = `${baseUrl}/api/`
        const endpoint = `${objectType.value}/${object.value}/metadata`
        const endpointExtension = compression.value
            ? `${format.value}.${compression.value}`
            : format.value
        const downloadUrlParams = `skipSharing=${skipSharing}&download=true`
        const url = `${apiBaseUrl}${endpoint}.${endpointExtension}?${downloadUrlParams}`
        locationAssign(url)
    }

    const validate = values => ({
        object: composeValidators(
            hasValue,
            SINGLE_EXACT_OBJECT_VALIDATOR
        )(values.object),
    })

    return (
        <Page
            title={PAGE_NAME}
            desc={PAGE_DESCRIPTION}
            icon={PAGE_ICON}
            dataTest="page-export-metadata-dependency"
        >
            <Form
                onSubmit={onExport}
                initialValues={initialValues}
                validate={validate}
                render={({ handleSubmit, form, values }) => (
                    <form onSubmit={handleSubmit}>
                        <SelectField
                            filled
                            initialFocus
                            name="objectType"
                            label={i18n.t('Object type')}
                            options={objectTypeOptions}
                            dataTest="input-object-type"
                        />
                        <Objects
                            objectType={values.objectType}
                            form={form}
                            dataTest="input-object-select"
                        />
                        <RadioGroupField
                            name="format"
                            label={i18n.t('Format')}
                            options={formatNoCsvOptions}
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
                            disabled={values.object == undefined}
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
const PAGE_NAME = i18n.t('Metadata dependency export')
const PAGE_DESCRIPTION = i18n.t(
    'Export metadata like data sets and programs including related metadata objects in the XML or JSON format.'
)
const PAGE_ICON = <MetadataDependencyExportIcon />

export { MetadataDependencyExport }

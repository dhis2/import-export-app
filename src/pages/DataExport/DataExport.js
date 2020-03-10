import React, { useState } from 'react'
import { useDataEngine } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { Form, hasValue, composeValidators } from '@dhis2/ui-forms'
import { Button } from '@dhis2/ui-core'
import JSZip from 'jszip'

import {
    createBlob,
    downloadBlob,
    jsDateToISO8601,
    pathToId,
} from '../../utils/helper'
import {
    formatAdxOptions,
    compressionOptions,
    defaultFormatOption,
    defaultCompressionOption,
    defaultDataElementIdSchemeOption,
    defaultOrgUnitIdSchemeOption,
    defaultIdSchemeOption,
} from '../../utils/options'
import { Page } from '../../components/Page'
import { RadioGroup } from '../../components/RadioGroup'
import {
    DatePicker,
    DATE_VALIDATOR,
    DATE_BEFORE_VALIDATOR,
    DATE_AFTER_VALIDATOR,
} from '../../components/DatePicker'
import { Switch } from '../../components/Switch'
import {
    OrgUnitTreeField,
    SINGLE_ORG_VALIDATOR,
} from '../../components/OrgUnitTree'
import {
    DataSetPickerField,
    SINGLE_DATASET_VALIDATOR,
} from '../../components/DataSetPicker'
import { MoreOptions } from '../../components/MoreOptions'
import {
    DataElementIdScheme,
    IdScheme,
    OrgUnitIdScheme,
} from '../../components/ElementSchemes'
import { FormAlerts } from '../../components/FormAlerts'
import { DataIcon } from '../../components/Icon'

const dataValueSetQuery = {
    sets: {
        resource: 'dataValueSets',
        params: ({
            dataElementIdScheme,
            orgUnitIdScheme,
            idScheme,
            includeDeleted,
            children,
            startDate,
            endDate,
            orgUnit,
            dataSet,
            format,
        }) => ({
            dataElementIdScheme,
            orgUnitIdScheme,
            idScheme,
            includeDeleted,
            children,
            startDate,
            endDate,
            orgUnit,
            dataSet,
            format,
        }),
    },
}

const today = new Date()
const initialValues = {
    selectedOrgUnits: [],
    includeChildren: true,
    selectedDataSets: [],
    format: defaultFormatOption,
    compression: defaultCompressionOption,
    startDate: new Date(
        today.getFullYear(),
        today.getMonth() - 3,
        today.getDate()
    ),
    endDate: today,
    includeDeleted: false,
    dataElementIdScheme: defaultDataElementIdSchemeOption,
    orgUnitIdScheme: defaultOrgUnitIdSchemeOption,
    idScheme: defaultIdSchemeOption,
}

const DataExport = () => {
    const engine = useDataEngine()
    const [alerts, setAlerts] = useState([])

    const onExport = values => {
        const {
            selectedOrgUnits,
            includeChildren,
            selectedDataSets,
            format,
            compression,
            startDate,
            endDate,
            includeDeleted,
            dataElementIdScheme,
            orgUnitIdScheme,
            idScheme,
        } = values

        // fetch data
        engine.query(dataValueSetQuery, {
            variables: {
                dataElementIdScheme: dataElementIdScheme.value,
                orgUnitIdScheme: orgUnitIdScheme.value,
                idScheme: idScheme.value,
                includeDeleted: includeDeleted.toString(),
                children: includeChildren.toString(),
                startDate: jsDateToISO8601(startDate),
                endDate: jsDateToISO8601(endDate),
                orgUnit: selectedOrgUnits.map(o => pathToId(o)),
                dataSet: selectedDataSets,
                format: format.value,
            },
            onComplete: ({ sets }) => {
                const dataStr =
                    format.value === 'json' ? JSON.stringify(sets) : sets
                const filename = `data.${format.value}`
                if (compression.value !== '') {
                    const zip = new JSZip()
                    zip.file(filename, dataStr)
                    zip.generateAsync({ type: 'blob' }).then(content => {
                        const url = URL.createObjectURL(content)
                        downloadBlob(url, `${filename}.${compression.value}`)
                    })
                } else {
                    const url = createBlob(dataStr, format.value)
                    downloadBlob(url, filename)
                }
            },
            onError: error => {
                console.error('DataExport onExport error: ', error)
                setAlerts([
                    {
                        id: `http-${new Date().getTime()}`,
                        critical: true,
                        message: `${i18n.t('HTTP error when fetching data')}. ${
                            error.message
                        }`,
                    },
                ])
            },
        })
    }

    const validate = values => ({
        selectedOrgUnits: composeValidators(
            hasValue,
            SINGLE_ORG_VALIDATOR
        )(values.selectedOrgUnits),
        selectedDataSets: composeValidators(
            hasValue,
            SINGLE_DATASET_VALIDATOR
        )(values.selectedDataSets),
        startDate: composeValidators(
            hasValue,
            DATE_VALIDATOR,
            DATE_BEFORE_VALIDATOR
        )(values.startDate, values.endDate),
        endDate: composeValidators(
            hasValue,
            DATE_VALIDATOR,
            DATE_AFTER_VALIDATOR
        )(values.endDate, values.startDate),
    })

    return (
        <Page
            title={PAGE_NAME}
            desc={PAGE_DESCRIPTION}
            icon={PAGE_ICON}
            dataTest="page-export-data"
        >
            <Form
                onSubmit={onExport}
                initialValues={initialValues}
                validate={validate}
                render={({ handleSubmit, form }) => (
                    <form onSubmit={handleSubmit}>
                        <OrgUnitTreeField
                            name="selectedOrgUnits"
                            dataTest="input-org-unit-tree"
                        />
                        <Switch
                            label={i18n.t('Include children')}
                            name="includeChildren"
                            dataTest="input-include-children"
                        />
                        <DataSetPickerField
                            name="selectedDataSets"
                            dataTest="input-data-set-picker"
                        />
                        <RadioGroup
                            name="format"
                            label={i18n.t('Format')}
                            options={formatAdxOptions}
                            dataTest="input-format"
                        />
                        <RadioGroup
                            name="compression"
                            label={i18n.t('Compression')}
                            options={compressionOptions}
                            dataTest="input-compression"
                        />
                        <DatePicker
                            name="startDate"
                            label={i18n.t('Start date')}
                            dataTest="input-start-date"
                        />
                        <DatePicker
                            name="endDate"
                            label={i18n.t('End date')}
                            dataTest="input-end-date"
                        />
                        <MoreOptions dataTest="interaction-more-options">
                            <Switch
                                label={i18n.t('Include deleted')}
                                name="includeDeleted"
                                dataTest="input-include-deleted"
                            />
                            <DataElementIdScheme dataTest="input-data-element-id-scheme" />
                            <OrgUnitIdScheme dataTest="input-org-unit-id-scheme" />
                            <IdScheme dataTest="input-id-scheme" />
                        </MoreOptions>
                        <Button
                            primary
                            type="submit"
                            dataTest="input-export-submit"
                        >
                            {i18n.t('Export')}
                        </Button>
                        <FormAlerts
                            alerts={alerts}
                            dataTest="input-form-alerts"
                        />
                    </form>
                )}
            />
        </Page>
    )
}

// PAGE INFO
const PAGE_NAME = i18n.t('Data export')
const PAGE_DESCRIPTION = i18n.t(
    'Export data values as ADX XML, DFX 2 XML, JSON or CSV files.'
)
const PAGE_ICON = <DataIcon />

export { DataExport }

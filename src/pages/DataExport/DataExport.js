import React, { useState } from 'react'
import { useDataEngine } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
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
import { DatePicker } from '../../components/DatePicker'
import { Switch } from '../../components/Switch'
import { OrgUnitTree } from '../../components/OrgUnitTree'
import { DataSetPicker } from '../../components/DataSetPicker'
import { MoreOptions } from '../../components/MoreOptions'
import {
    DataElementIdScheme,
    IdScheme,
    OrgUnitIdScheme,
} from '../../components/ElementSchemes'
import { FormAlerts } from '../../components/FormAlerts'
import { DataIcon } from '../../components/Icon'

const today = new Date()

/*
const attributesQuery = {
    dataElement: {
        resource: 'attributes',
        params: {
            filter: ['unique:eq:true', 'dataElementAttribute:eq:true'],
            fields: 'id,displayName',
            paging: 'false',
        },
    },
    orgUnit: {
        resource: 'attributes',
        params: {
            filter: ['unique:eq:true', 'organisationUnitAttribute:eq:true'],
            fields: 'id,displayName',
            paging: 'false',
        },
    },
};
*/

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

const DataExport = () => {
    // const { loading, error, data } = useDataQuery(attributesQuery);
    const engine = useDataEngine()
    const [selectedOrgUnits, setSelectedOrgUnits] = useState([])
    const [includeChildren, setIncludeChildren] = useState(true)
    const [selectedDataSets, setSelectedDataSets] = useState([])
    const [format, setFormat] = useState(defaultFormatOption)
    const [compression, setCompression] = useState(defaultCompressionOption)
    const [startDate, setStartDate] = useState(
        new Date(today.getFullYear(), today.getMonth() - 3, today.getDate())
    )
    const [endDate, setEndDate] = useState(today)
    const [includeDeleted, setIncludeDeleted] = useState(false)
    const [dataElementIdScheme, setDataElementIdScheme] = useState(
        defaultDataElementIdSchemeOption
    )
    const [orgUnitIdScheme, setOrgUnitIdScheme] = useState(
        defaultOrgUnitIdSchemeOption
    )
    const [idScheme, setIdScheme] = useState(defaultIdSchemeOption)
    const [alerts, setAlerts] = useState([])

    const onExport = () => {
        // validate
        const alerts = []
        const timestamp = new Date().getTime()

        if (selectedOrgUnits.length == 0) {
            alerts.push({
                id: `org-unit-length-${timestamp}`,
                warning: true,
                message: i18n.t(
                    'At least one organisation unit must be selected'
                ),
            })
        }

        if (selectedDataSets.length == 0) {
            alerts.push({
                id: `data-set-length-${timestamp}`,
                warning: true,
                message: i18n.t('At least one data set must be selected'),
            })
        }

        if (endDate < startDate) {
            alerts.push({
                id: `period-${timestamp}`,
                warning: true,
                message: i18n.t('End date must be after start date'),
            })
        }

        setAlerts(alerts)

        if (alerts.length != 0) {
            return
        }

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
                        id: `http-${timestamp}`,
                        critical: true,
                        message: `${i18n.t('HTTP error when fetching data')}. ${
                            error.message
                        }`,
                    },
                ])
            },
        })
    }

    const onDateChange = stateFn => date => {
        stateFn(date)
    }

    return (
        <Page
            title={PAGE_NAME}
            desc={PAGE_DESCRIPTION}
            icon={PAGE_ICON}
            dataTest="page-export-data"
        >
            <OrgUnitTree
                selected={selectedOrgUnits}
                setSelected={setSelectedOrgUnits}
                dataTest="input-org-unit-tree"
            />
            <Switch
                label={i18n.t('Include children')}
                name="includeChildren"
                checked={includeChildren}
                setChecked={setIncludeChildren}
                dataTest="input-include-children"
            />
            <DataSetPicker
                selected={selectedDataSets}
                setSelected={setSelectedDataSets}
                dataTest="input-data-set-picker"
            />
            <RadioGroup
                name="format"
                label={i18n.t('Format')}
                options={formatAdxOptions}
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
            <DatePicker
                name="startDate"
                label={i18n.t('Start date')}
                date={startDate}
                onChange={onDateChange(setStartDate)}
                dataTest="input-start-date"
            />
            <DatePicker
                name="endDate"
                label={i18n.t('End date')}
                date={endDate}
                onChange={onDateChange(setEndDate)}
                dataTest="input-end-date"
            />
            <MoreOptions dataTest="interaction-more-options">
                <Switch
                    label={i18n.t('Include deleted')}
                    name="includeDeleted"
                    checked={includeDeleted}
                    setChecked={setIncludeDeleted}
                    dataTest="input-include-deleted"
                />
                <DataElementIdScheme
                    selected={dataElementIdScheme}
                    setSelected={setDataElementIdScheme}
                    dataTest="input-data-element-id-scheme"
                />
                <OrgUnitIdScheme
                    selected={orgUnitIdScheme}
                    setSelected={setOrgUnitIdScheme}
                    dataTest="input-org-unit-id-scheme"
                />
                <IdScheme
                    selected={idScheme}
                    setSelected={setIdScheme}
                    dataTest="input-id-scheme"
                />
            </MoreOptions>
            <Button primary onClick={onExport} dataTest="input-export-submit">
                {i18n.t('Export')}
            </Button>
            <FormAlerts alerts={alerts} dataTest="input-form-alerts" />
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

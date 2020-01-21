import React, { useState } from 'react';
import { useDataEngine, useDataQuery } from '@dhis2/app-runtime';
import i18n from '@dhis2/d2-i18n';
import { Button } from '@dhis2/ui-core';
import JSZip from 'jszip';

import s from './DataExport.module.css';
import { dataExportPage as p } from '../../utils/pages';
import {
    createBlob,
    downloadBlob,
    jsDateToISO8601,
    pathToId,
} from '../../utils/helper';
import {
    formatAdxOptions,
    compressionOptions,
    defaultFormatOption,
    defaultCompressionOption,
    defaultDataElementIdSchemeOption,
    defaultOrgUnitIdSchemeOption,
    defaultIdSchemeOption,
} from '../../utils/options';
import { Page } from '../../components/Page';
import { RadioGroup } from '../../components/RadioGroup';
import { DatePicker } from '../../components/DatePicker';
import { Switch } from '../../components/Switch';
import { Select } from '../../components/Select';
import { OrgUnitTree } from '../../components/OrgUnitTree';
import { DataSetPicker } from '../../components/DataSetPicker';
import { MoreOptions } from '../../components/MoreOptions';
import {
    DataElementIdScheme,
    IdScheme,
    OrgUnitIdScheme,
} from '../../components/ElementSchemes';
import { FormAlerts } from '../../components/FormAlerts';

const today = new Date();

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
            includeDeleted: `${includeDeleted}`,
            children: `${children}`,
            startDate,
            endDate,
            orgUnit,
            dataSet,
            format,
            paging: 'false',
        }),
    },
};

const DataExport = () => {
    // const { loading, error, data } = useDataQuery(attributesQuery);
    const engine = useDataEngine();
    const [selectedOrgUnits, setSelectedOrgUnits] = useState([]);
    const [includeChildren, setIncludeChildren] = useState(true);
    const [selectedDataSets, setSelectedDataSets] = useState([]);
    const [format, setFormat] = useState(defaultFormatOption.value);
    const [compression, setCompression] = useState(
        defaultCompressionOption.value
    );
    const [startDate, setStartDate] = useState(
        new Date(today.getFullYear(), today.getMonth() - 3, today.getDate())
    );
    const [endDate, setEndDate] = useState(today);
    const [includeDeleted, setIncludeDeleted] = useState(false);
    const [dataElementIdScheme, setDataElementIdScheme] = useState(
        defaultDataElementIdSchemeOption.value
    );
    const [orgUnitIdScheme, setOrgUnitIdScheme] = useState(
        defaultOrgUnitIdSchemeOption.value
    );
    const [idScheme, setIdScheme] = useState(defaultIdSchemeOption.value);
    const [alerts, setAlerts] = useState([]);

    const onExport = () => {
        // validate
        let alerts = [];
        const timestamp = new Date().getTime();

        if (selectedOrgUnits.length == 0) {
            alerts.push({
                id: `org-unit-length-${timestamp}`,
                warning: true,
                message: i18n.t(
                    'At least one organisation unit must be selected'
                ),
            });
        }

        if (selectedDataSets.length == 0) {
            alerts.push({
                id: `data-set-length-${timestamp}`,
                warning: true,
                message: i18n.t('At least one data set must be selected'),
            });
        }

        if (endDate <= startDate) {
            alerts.push({
                id: `period-${timestamp}`,
                warning: true,
                message: i18n.t('End date must be before start date'),
            });
        }

        setAlerts(alerts);

        if (alerts.length != 0) {
            return;
        }

        // fetch data
        engine.query(dataValueSetQuery, {
            variables: {
                dataElementIdScheme,
                orgUnitIdScheme,
                idScheme,
                includeDeleted,
                children: includeChildren,
                startDate: jsDateToISO8601(startDate),
                endDate: jsDateToISO8601(endDate),
                orgUnit: selectedOrgUnits.map(o => pathToId(o)),
                dataSet: selectedDataSets,
                format,
            },
            onComplete: ({ sets }) => {
                const dataStr = format === 'json' ? JSON.stringify(sets) : sets;
                const filename = `data.${format}`;
                if (compression !== '') {
                    const zip = new JSZip();
                    zip.file(filename, dataStr);
                    zip.generateAsync({ type: 'blob' }).then(content => {
                        const url = URL.createObjectURL(content);
                        downloadBlob(url, `${filename}.${compression}`);
                    });
                } else {
                    const url = createBlob(dataStr, format);
                    downloadBlob(url, filename);
                }
            },
            onError: e => {
                console.log('DataExport onExport error: ', e);
                setAlerts([
                    {
                        id: `http-${timestamp}`,
                        critical: true,
                        message: `${i18n.t(
                            'HTTP error when fetching data'
                        )}. ${e}`,
                    },
                ]);
            },
        });
    };

    const onDateChange = stateFn => date => {
        stateFn(date);
    };

    return (
        <Page title={p.name} desc={p.description} icon={p.icon}>
            <OrgUnitTree
                selected={selectedOrgUnits}
                setSelected={setSelectedOrgUnits}
            />
            <Switch
                label={i18n.t('Include children')}
                name="includeChildren"
                checked={includeChildren}
                setChecked={setIncludeChildren}
            />
            <DataSetPicker
                selected={selectedDataSets}
                setSelected={setSelectedDataSets}
            />
            <RadioGroup
                name="format"
                label={i18n.t('Format')}
                options={formatAdxOptions}
                setValue={setFormat}
                checked={format}
            />
            <RadioGroup
                name="compression"
                label={i18n.t('Compression')}
                options={compressionOptions}
                setValue={setCompression}
                checked={compression}
            />
            <DatePicker
                name="startDate"
                label={i18n.t('Start date')}
                date={startDate}
                onChange={onDateChange(setStartDate)}
            />
            <DatePicker
                name="endDate"
                label={i18n.t('End date')}
                date={endDate}
                onChange={onDateChange(setEndDate)}
            />
            <MoreOptions>
                <Switch
                    label={i18n.t('Include deleted')}
                    name="includeDeleted"
                    checked={includeDeleted}
                    setChecked={setIncludeDeleted}
                />
                <DataElementIdScheme
                    selected={dataElementIdScheme}
                    setSelected={setDataElementIdScheme}
                />
                <OrgUnitIdScheme
                    selected={orgUnitIdScheme}
                    setSelected={setOrgUnitIdScheme}
                />
                <IdScheme selected={idScheme} setSelected={setIdScheme} />
            </MoreOptions>
            <Button primary initialFocus onClick={onExport}>
                {i18n.t('Export')}
            </Button>
            <FormAlerts alerts={alerts} />
        </Page>
    );
};

export { DataExport };

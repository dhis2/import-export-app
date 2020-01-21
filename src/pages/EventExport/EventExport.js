import React, { useEffect, useState } from 'react';
import { useConfig, useDataEngine, useDataQuery } from '@dhis2/app-runtime';
import i18n from '@dhis2/d2-i18n';
import { Button } from '@dhis2/ui-core';

import s from './EventExport.module.css';
import { eventExportPage as p } from '../../utils/pages';
import { jsDateToISO8601, pathToId } from '../../utils/helper';
import {
    formatOptions,
    compressionOptions,
    inclusionOptions,
    defaultFormatOption,
    defaultCompressionOption,
    defaultIdSchemeOption,
    defaultInclusionOption,
} from '../../utils/options';
import { Page } from '../../components/Page';
import { RadioGroup } from '../../components/RadioGroup';
import { DatePicker } from '../../components/DatePicker';
import { Switch } from '../../components/Switch';
import { Select } from '../../components/Select';
import { OrgUnitTree } from '../../components/OrgUnitTree';
import { ProgramPicker } from '../../components/ProgramPicker';
import { MoreOptions } from '../../components/MoreOptions';
import { IdScheme } from '../../components/ElementSchemes';
import { FormAlerts } from '../../components/FormAlerts';
import { ProgramStageSelect, ALL_VALUE } from './ProgramStageSelect/';

const today = new Date();

const EventExport = ({}) => {
    const engine = useDataEngine();
    const [selectedOrgUnits, setSelectedOrgUnits] = useState([]);
    const [selectedPrograms, setSelectedPrograms] = useState([]);
    const [programStage, setProgramStage] = useState(undefined);
    const [format, setFormat] = useState(defaultFormatOption);
    const [compression, setCompression] = useState(defaultCompressionOption);
    const [startDate, setStartDate] = useState(
        new Date(today.getFullYear(), today.getMonth() - 3, today.getDate())
    );
    const [endDate, setEndDate] = useState(today);
    const [includeDeleted, setIncludeDeleted] = useState(false);
    const [idScheme, setIdScheme] = useState(defaultIdSchemeOption);
    const [inclusion, setInclusion] = useState(defaultInclusionOption);
    const [alerts, setAlerts] = useState([]);
    const { baseUrl } = useConfig();

    const onExport = () => {
        // validate
        let alerts = [];
        const timestamp = new Date().getTime();

        if (selectedOrgUnits.length == 0) {
            alerts.push({
                id: `org-unit-length-${timestamp}`,
                warning: true,
                message: i18n.t('One organisation unit must be selected'),
            });
        }

        if (selectedPrograms.length == 0) {
            alerts.push({
                id: `program-length-${timestamp}`,
                warning: true,
                message: i18n.t('One program must be selected'),
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

        // generate URL and redirect
        const apiBaseUrl = `${baseUrl}/api/`;
        const endpoint = `events`;
        const endpointExtension = compression.value
            ? `${format.value}.${compression.value}`
            : format.value;
        const filename = `${endpoint}.${endpointExtension}`;
        const downloadUrlParams = [
            `orgUnit=${pathToId(selectedOrgUnits[0])}`,
            `programs=${selectedPrograms[0]}`,
            `includeDeleted=${includeDeleted}`,
            `idScheme=${idScheme.value}`,
            `attachment=${filename}`,
            `startDate=${jsDateToISO8601(startDate)}`,
            `endDate=${jsDateToISO8601(endDate)}`,
            `ouMode=${inclusion.value}`,
            `format=${format.value}`,
            'links=false',
            'skipPaging=true',
            ...[
                programStage.value != ALL_VALUE
                    ? [`programStage=${programStage.value}`]
                    : [],
            ],
        ].join('&');
        const url = `${apiBaseUrl}${endpoint}.${endpointExtension}?${downloadUrlParams}`;
        window.location = url;
    };

    const onDateChange = stateFn => date => {
        stateFn(date);
    };

    return (
        <Page title={p.name} desc={p.description} icon={p.icon}>
            <OrgUnitTree
                selected={selectedOrgUnits}
                setSelected={setSelectedOrgUnits}
                multiSelect={false}
            />
            <ProgramPicker
                selected={selectedPrograms}
                setSelected={setSelectedPrograms}
                multiSelect={false}
                withActions={false}
                autoSelectFirst
            />
            <ProgramStageSelect
                name="programStage"
                label={i18n.t('Program stage')}
                program={
                    selectedPrograms.length == 0 ? null : selectedPrograms[0]
                }
                setSelected={setProgramStage}
                selected={programStage}
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
            <RadioGroup
                name="format"
                label={i18n.t('Format')}
                options={formatOptions}
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
            <MoreOptions>
                <Switch
                    label={i18n.t('Include deleted')}
                    name="includeDeleted"
                    checked={includeDeleted}
                    setChecked={setIncludeDeleted}
                />
                <IdScheme selected={idScheme} setSelected={setIdScheme} />
                <RadioGroup
                    name="inclusion"
                    label={i18n.t('Inclusion')}
                    options={inclusionOptions}
                    setValue={setInclusion}
                    checked={inclusion}
                />
            </MoreOptions>
            <Button primary initialFocus onClick={onExport}>
                {i18n.t('Export')}
            </Button>
            <FormAlerts alerts={alerts} />
        </Page>
    );
};

export { EventExport };

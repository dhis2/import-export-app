import React, { useContext, useState } from 'react';
import { useConfig, useDataEngine, useDataQuery } from '@dhis2/app-runtime';
import i18n from '@dhis2/d2-i18n';
import { Button } from '@dhis2/ui-core';

import s from './DataImport.module.css';
import { dataImportPage as p } from '../../utils/pages';
import { uploadFile } from '../../utils/helper';
import { helpText } from '../../utils/text';
import {
    formatAdxPdfOptions,
    strategyOptions,
    defaultFormatOption,
    defaultStrategyOption,
    defaultDataElementIdSchemeOption,
    defaultOrgUnitIdSchemeOption,
    defaultIdSchemeOption,
} from '../../utils/options';
import { Page } from '../../components/Page';
import { FileUpload } from '../../components/FileUpload';
import { RadioGroup } from '../../components/RadioGroup';
import { Switch } from '../../components/Switch';
import { Select } from '../../components/Select';
import {
    WithAuthority,
    hasAuthorityToSkipAudit,
} from '../../components/WithAuthority';
import { MoreOptions } from '../../components/MoreOptions';
import {
    DataElementIdScheme,
    IdScheme,
    OrgUnitIdScheme,
} from '../../components/ElementSchemes';
import { FormAlerts } from '../../components/FormAlerts';
import { TaskContext } from '../../contexts/';

const today = new Date();

const DataImport = () => {
    const { data, addTask } = useContext(TaskContext);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(undefined);
    const [format, setFormat] = useState(defaultFormatOption);
    const [dryRun, setDryRun] = useState(false);
    const [strategy, setStrategy] = useState(defaultStrategyOption);
    const [firstRowIsHeader, setFirstRowIsHeader] = useState(false);
    const [preheatCache, setPreheatCache] = useState(false);
    const [skipAudit, setSkipAudit] = useState(false);
    const [dataElementIdScheme, setDataElementIdScheme] = useState(
        defaultDataElementIdSchemeOption
    );
    const [orgUnitIdScheme, setOrgUnitIdScheme] = useState(
        defaultOrgUnitIdSchemeOption
    );
    const [idScheme, setIdScheme] = useState(defaultIdSchemeOption);
    const [skipExistingCheck, setSkipExistingCheck] = useState(false);
    const [alerts, setAlerts] = useState([]);
    const { baseUrl } = useConfig();

    const onImport = () => {
        // validate
        let alerts = [];
        const timestamp = new Date().getTime();

        setAlerts(alerts);

        if (!file) {
            alerts.push({
                id: `file-${timestamp}`,
                warning: true,
                message: i18n.t('An import file must be selected'),
            });
        }

        if (alerts.length != 0) {
            return;
        }

        // send xhr
        const apiBaseUrl = `${baseUrl}/api/`;
        const endpoint = 'dataValueSets.json';
        const params = [
            `dryRun=${dryRun}`,
            `strategy=${strategy}`,
            `preheatCache=${preheatCache}`,
            `skipAudit=${skipAudit}`,
            `dataElementIdScheme=${dataElementIdScheme.value}`,
            `orgUnitIdScheme=${orgUnitIdScheme.value}`,
            `idScheme=${idScheme.value}`,
            `skipExistingCheck=${skipExistingCheck}`,
            `format=${format.value}`,
            'async=true',
            ...[
                format.value == 'csv'
                    ? [`firstRowIsHeader=${firstRowIsHeader}`]
                    : [],
            ],
        ].join('&');
        const url = `${apiBaseUrl}${endpoint}?${params}`;

        uploadFile(
            url,
            file,
            format.value,
            'DATAVALUE_IMPORT',
            setLoading,
            setAlerts,
            (id, entry) => addTask('data', id, entry)
        );
    };

    return (
        <Page
            title={p.name}
            desc={p.description}
            icon={p.icon}
            loading={loading}
        >
            <FileUpload name="upload" file={file} setFile={setFile} />
            <RadioGroup
                name="format"
                label={i18n.t('Format')}
                options={formatAdxPdfOptions}
                setValue={setFormat}
                checked={format}
            />
            <Switch
                label={i18n.t('Dry run')}
                name="dryRun"
                checked={dryRun}
                setChecked={setDryRun}
                help={helpText.dryRun}
            />
            {format.value == 'csv' && (
                <Switch
                    label={i18n.t('First row is header')}
                    name="firstRowIsHeader"
                    checked={firstRowIsHeader}
                    setChecked={setFirstRowIsHeader}
                />
            )}
            <RadioGroup
                name="strategy"
                label={i18n.t('Strategy')}
                options={strategyOptions}
                setValue={setStrategy}
                checked={strategy}
            />
            <Switch
                label={i18n.t('Preheat cache')}
                name="preheatCache"
                checked={preheatCache}
                setChecked={setPreheatCache}
                help={helpText.preheatCache}
            />
            <WithAuthority pred={hasAuthorityToSkipAudit}>
                <Switch
                    label={i18n.t('Skip audit')}
                    name="skipAudit"
                    checked={skipAudit}
                    setChecked={setSkipAudit}
                    help={helpText.skipAudit}
                />
            </WithAuthority>
            <MoreOptions>
                <DataElementIdScheme
                    selected={dataElementIdScheme}
                    setSelected={setDataElementIdScheme}
                />
                <OrgUnitIdScheme
                    selected={orgUnitIdScheme}
                    setSelected={setOrgUnitIdScheme}
                />
                <IdScheme selected={idScheme} setSelected={setIdScheme} />
                <Switch
                    name="skipExistingCheck"
                    label={i18n.t('Skip exisiting check')}
                    checked={skipExistingCheck}
                    setChecked={setSkipExistingCheck}
                    help={helpText.skipExistingCheck}
                />
            </MoreOptions>
            <Button primary initialFocus onClick={onImport}>
                {i18n.t('Import')}
            </Button>
            <FormAlerts alerts={alerts} />
        </Page>
    );
};

export { DataImport };

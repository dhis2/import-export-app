import React, { useContext, useState } from 'react';
import { useConfig, useDataEngine, useDataQuery } from '@dhis2/app-runtime';
import i18n from '@dhis2/d2-i18n';
import { Button } from '@dhis2/ui-core';

import s from './DataImport.module.css';
import { dataImportPage as p } from '../../utils/pages';
import { uploadFile } from '../../utils/helper';
import {
    formatAdxPdfOptions,
    strategyOptions,
    defaultFormatOption,
    defaultStrategyOption,
    defaultDataElementIdSchemeOption,
    defaultOrgUnitIdSchemeOption,
    defaultIdSchemeOption,
} from '../../utils/options';
import { Page } from '../Page';
import { FileUpload } from '../FileUpload';
import { RadioGroup } from '../RadioGroup';
import { Switch } from '../Switch';
import { Select } from '../Select';
import { WithAuthority, hasAuthorityToSkipAudit } from '../WithAuthority';
import { MoreOptions } from '../MoreOptions';
import {
    DataElementIdScheme,
    IdScheme,
    OrgUnitIdScheme,
} from '../ElementSchemes';
import { FormAlerts } from '../FormAlerts';
import { TaskContext } from '../../contexts/';

const today = new Date();

const DataImport = () => {
    const { data, addTask } = useContext(TaskContext);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(undefined);
    const [format, setFormat] = useState(defaultFormatOption.value);
    const [dryRun, setDryRun] = useState(false);
    const [strategy, setStrategy] = useState(defaultStrategyOption.value);
    const [firstRowIsHeader, setFirstRowIsHeader] = useState(false);
    const [preheatCache, setPreheatCache] = useState(false);
    const [skipAudit, setSkipAudit] = useState(false);
    const [dataElementIdScheme, setDataElementIdScheme] = useState(
        defaultDataElementIdSchemeOption.value
    );
    const [orgUnitIdScheme, setOrgUnitIdScheme] = useState(
        defaultOrgUnitIdSchemeOption.value
    );
    const [idScheme, setIdScheme] = useState(defaultIdSchemeOption.value);
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
            `dataElementIdScheme=${dataElementIdScheme}`,
            `orgUnitIdScheme=${orgUnitIdScheme}`,
            `idScheme=${idScheme}`,
            `skipExistingCheck=${skipExistingCheck}`,
            `format=${format}`,
            'async=true',
            ...[
                format == 'csv' ? [`firstRowIsHeader=${firstRowIsHeader}`] : [],
            ],
        ].join('&');
        const url = `${apiBaseUrl}${endpoint}?${params}`;

        uploadFile(
            url,
            file,
            format,
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
                help={i18n.t(
                    'Will do a test run without importing any data into the database'
                )}
            />
            {format == 'csv' && (
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
                help={i18n.t('Faster for large imports')}
            />
            <WithAuthority pred={hasAuthorityToSkipAudit}>
                <Switch
                    label={i18n.t('Skip audit')}
                    name="skipAudit"
                    checked={skipAudit}
                    setChecked={setSkipAudit}
                    help={i18n.t(
                        'Improves performance at the cost of ability to audit changes'
                    )}
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
                    help={i18n.t('Faster, but unsafe')}
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

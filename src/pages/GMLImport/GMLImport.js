import React, { useContext, useState } from 'react';
import { useConfig, useDataEngine, useDataQuery } from '@dhis2/app-runtime';
import i18n from '@dhis2/d2-i18n';
import { Button } from '@dhis2/ui-core';

import s from './GMLImport.module.css';
import { gmlImportPage as p } from '../../utils/pages';
import { uploadFile } from '../../utils/helper';
import { helpText } from '../../utils/text';
import { Page } from '../../components/Page';
import { FileUpload } from '../../components/FileUpload';
import { Switch } from '../../components/Switch';
import { FormAlerts } from '../../components/FormAlerts';
import { TaskContext } from '../../contexts/';

const today = new Date();

const GMLImport = () => {
    const { data, addTask } = useContext(TaskContext);
    const [progress, setProgress] = useState(0);
    const [file, setFile] = useState(undefined);
    const [dryRun, setDryRun] = useState(false);
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
        const endpoint = 'metadata/gml.json';
        const params = [`dryRun=${dryRun}`, 'format=json'].join('&');
        const url = `${apiBaseUrl}${endpoint}?${params}`;

        uploadFile(
            url,
            file,
            'gml',
            'GML_IMPORT',
            setProgress,
            setAlerts,
            (id, entry) => addTask('gml', id, entry)
        );
    };

    return (
        <Page
            title={p.name}
            desc={p.description}
            icon={p.icon}
            loading={progress}
        >
            <FileUpload name="upload" file={file} setFile={setFile} />
            <Switch
                label={i18n.t('Dry run')}
                name="dryRun"
                checked={dryRun}
                setChecked={setDryRun}
                help={helpText.dryRun}
            />
            <Button primary initialFocus onClick={onImport}>
                {i18n.t('Import')}
            </Button>
            <FormAlerts alerts={alerts} />
        </Page>
    );
};

export { GMLImport };

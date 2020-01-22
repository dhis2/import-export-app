import React, { useContext, useState } from 'react';
import { useConfig } from '@dhis2/app-runtime';
import i18n from '@dhis2/d2-i18n';
import { Button } from '@dhis2/ui-core';

// import s from './GMLImport.module.css';
import { gmlImportPage as p } from '../../utils/pages';
import { uploadFile } from '../../utils/helper';
import { testIds } from '../../utils/testIds';
import { helpText } from '../../utils/text';
import { Page } from '../../components/Page';
import { FileUpload } from '../../components/FileUpload';
import { Switch } from '../../components/Switch';
import { FormAlerts } from '../../components/FormAlerts';
import { TaskContext } from '../../contexts/';

const GMLImport = () => {
    const { addTask } = useContext(TaskContext);
    const [progress, setProgress] = useState(0);
    const [file, setFile] = useState(undefined);
    const [dryRun, setDryRun] = useState(false);
    const [alerts, setAlerts] = useState([]);
    const { baseUrl } = useConfig();

    const onImport = () => {
        // validate
        const alerts = [];
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

        uploadFile({
            url,
            file,
            format: 'gml',
            type: 'GML_IMPORT',
            setProgress,
            setAlerts,
            addEntry: (id, entry) => addTask('gml', id, entry),
        });
    };

    return (
        <Page
            title={p.name}
            desc={p.description}
            icon={p.icon}
            loading={progress}
            dataTest={testIds.GMLImport.Page}
        >
            <FileUpload
                name="upload"
                file={file}
                setFile={setFile}
                dataTest={testIds.GMLImport.FileUpload}
            />
            <Switch
                label={i18n.t('Dry run')}
                name="dryRun"
                checked={dryRun}
                setChecked={setDryRun}
                help={helpText.dryRun}
                dataTest={testIds.GMLImport.dryRun}
            />
            <Button
                primary
                onClick={onImport}
                dataTest={testIds.GMLImport.submit}
            >
                {i18n.t('Import')}
            </Button>
            <FormAlerts
                alerts={alerts}
                dataTest={testIds.GMLImport.FormAlerts}
            />
        </Page>
    );
};

export { GMLImport };

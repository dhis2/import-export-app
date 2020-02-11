import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useConfig, useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'

// import s from './MetadataImport.module.css';
import { metadataImportPage as p } from '../../utils/pages'
import { uploadFile } from '../../utils/helper'
import { testIds } from '../../utils/testIds'
import {
    formatOptions,
    identifierOptions,
    importReportModeOptions,
    preheatModeOptions,
    importStrategyOptions,
    atomicModeOptions,
    mergeModeOptions,
    flushModeOptions,
    inclusionStrategyOptions,
    defaultFormatOption,
    defaultIdentifierOption,
    defaultImportReportModeOption,
    defaultPreheatModeOption,
    defaultImportStrategyOption,
    defaultAtomicModeOption,
    defaultMergeModeOption,
    defaultFlushModeOption,
    defaultInclusionStrategyOption,
} from '../../utils/options'
import { Page } from '../../components/Page'
import { FileUpload } from '../../components/FileUpload'
import { RadioGroup } from '../../components/RadioGroup'
import { Switch } from '../../components/Switch'
import { Select } from '../../components/Select'
import { MoreOptions } from '../../components/MoreOptions'
import { ImportButtonStrip } from '../../components/ImportButtonStrip'
import { FormAlerts } from '../../components/FormAlerts'
import { TaskContext, getNewestTask } from '../../contexts/'

const classKeyQuery = {
    keys: {
        resource: 'metadata/csvImportClasses',
    },
}

const MetadataImport = ({ query }) => {
    const { loading: classLoading } = useDataQuery(classKeyQuery, {
        onComplete: classData => {
            setClassKeyOptions(
                classData.keys.map(k => ({ value: k, label: k }))
            )
            if (prevJobDetails) {
                setClassKey(prevJobDetails.classKey)
            } else {
                setClassKey({
                    value: classData.keys[0],
                    label: classData.keys[0],
                })
            }
        },
        onError: error => {
            console.error('MetadataImport error: ', error)
        },
    })
    const { metadata: metadataTasks, addTask } = useContext(TaskContext)

    // recreating a previously run job
    let prevJobDetails = undefined
    if (query && query.id) {
        const job = metadataTasks[query.id]
        if (job) {
            prevJobDetails = job.jobDetails
        }
    }

    const initialState = {
        file: prevJobDetails ? prevJobDetails.file : undefined,
        format: prevJobDetails ? prevJobDetails.format : defaultFormatOption,
        identifier: prevJobDetails
            ? prevJobDetails.identifier
            : defaultIdentifierOption,
        importReportMode: prevJobDetails
            ? prevJobDetails.importReportMode
            : defaultImportReportModeOption,
        preheatMode: prevJobDetails
            ? prevJobDetails.preheatMode
            : defaultPreheatModeOption,
        importStrategy: prevJobDetails
            ? prevJobDetails.importStrategy
            : defaultImportStrategyOption,
        firstRowIsHeader: prevJobDetails
            ? prevJobDetails.firstRowIsHeader
            : false,
        // classKey: prevJobDetails ? prevJobDetails.classKey : undefined,
        atomicMode: prevJobDetails
            ? prevJobDetails.atomicMode
            : defaultAtomicModeOption,
        mergeMode: prevJobDetails
            ? prevJobDetails.mergeMode
            : defaultMergeModeOption,
        flushMode: prevJobDetails
            ? prevJobDetails.flushMode
            : defaultFlushModeOption,
        inclusionStrategy: prevJobDetails
            ? prevJobDetails.inclusionStrategy
            : defaultInclusionStrategyOption,
        skipSharing: prevJobDetails ? prevJobDetails.skipSharing : false,
        skipValidation: prevJobDetails ? prevJobDetails.skipValidation : false,
        isAsync: prevJobDetails ? prevJobDetails.isAsync : true,
    }

    const [progress, setProgress] = useState(0)
    const [file, setFile] = useState(initialState.file)
    const [format, setFormat] = useState(initialState.format)
    const [identifier, setIdentifier] = useState(initialState.identifier)
    const [importReportMode, setImportReportMode] = useState(
        initialState.importReportMode
    )
    const [preheatMode, setPreheatMode] = useState(initialState.preheatMode)
    const [importStrategy, setImportStrategy] = useState(
        initialState.importStrategy
    )
    const [firstRowIsHeader, setFirstRowIsHeader] = useState(
        initialState.firstRowIsHeader
    )
    const [classKeyOptions, setClassKeyOptions] = useState([])
    const [classKey, setClassKey] = useState(initialState.classKey)
    const [atomicMode, setAtomicMode] = useState(initialState.atomicMode)
    const [mergeMode, setMergeMode] = useState(initialState.mergeMode)
    const [flushMode, setFlushMode] = useState(initialState.flushMode)
    const [inclusionStrategy, setInclusionStrategy] = useState(
        initialState.inclusionStrategy
    )
    const [skipSharing, setSkipSharing] = useState(initialState.skipSharing)
    const [skipValidation, setSkipValidation] = useState(
        initialState.skipValidation
    )
    const [isAsync, setIsAsync] = useState(initialState.isAsync)
    const [alerts, setAlerts] = useState([])
    const [showFullSummaryTask, setShowFullSummaryTask] = useState(false)
    const { baseUrl } = useConfig()

    const onSubmit = ({ dryRun }) => {
        // validate
        const alerts = []
        const timestamp = new Date().getTime()

        setAlerts(alerts)

        if (!file) {
            alerts.push({
                id: `file-${timestamp}`,
                warning: true,
                message: i18n.t('An import file must be selected'),
            })
        }

        if (alerts.length != 0) {
            return
        }

        // send xhr
        const apiBaseUrl = `${baseUrl}/api/`
        const endpoint = 'metadata.json'
        const params = [
            `dryRun=${dryRun}`,
            `importMode=${dryRun ? 'VALIDATE' : 'COMMIT'}`,
            `identifier=${identifier.value}`,
            `importReportMode=${importReportMode.value}`,
            `preheatMode=${preheatMode.value}`,
            `importStrategy=${importStrategy.value}`,
            `atomicMode=${atomicMode.value}`,
            `mergeMode=${mergeMode.value}`,
            `flushMode=${flushMode.value}`,
            `skipSharing=${skipSharing}`,
            `skipValidation=${skipValidation}`,
            `inclusionStrategy=${inclusionStrategy.value}`,
            `async=${isAsync}`,
            'format=json',
            format.value == 'csv'
                ? `firstRowIsHeader=${firstRowIsHeader}&classKey=${classKey.value}`
                : '',
        ].join('&')
        const url = `${apiBaseUrl}${endpoint}?${params}`

        const jobDetails = {
            file,
            format,
            dryRun,
            identifier,
            importReportMode,
            preheatMode,
            importStrategy,
            firstRowIsHeader,
            classKey,
            atomicMode,
            mergeMode,
            flushMode,
            inclusionStrategy,
            skipSharing,
            skipValidation,
            isAsync,
        }

        uploadFile({
            url,
            file,
            format: format.value,
            type: 'METADATA_IMPORT',
            setProgress,
            setAlerts,
            addEntry: (id, entry) =>
                addTask('metadata', id, { ...entry, jobDetails: jobDetails }),
        })
        setShowFullSummaryTask(true)
    }

    return (
        <Page
            title={p.name}
            desc={p.description}
            icon={p.icon}
            loading={progress}
            dataTest={testIds.MetadataImport.Page}
            summaryTask={getNewestTask(metadataTasks)}
            showFullSummaryTask={showFullSummaryTask}
        >
            <FileUpload
                name="upload"
                file={file}
                setFile={setFile}
                dataTest={testIds.MetadataImport.FileUpload}
            />
            <RadioGroup
                name="format"
                label={i18n.t('Format')}
                options={formatOptions}
                setValue={setFormat}
                checked={format}
                dataTest={testIds.MetadataImport.format}
            />
            {format.value == 'csv' && (
                <>
                    <Switch
                        name="firstRowIsHeader"
                        label={i18n.t('First row is header')}
                        checked={firstRowIsHeader}
                        setChecked={setFirstRowIsHeader}
                        dataTest={testIds.MetadataImport.firstRowIsHeader}
                    />
                    <Select
                        name="classKey"
                        label={i18n.t('Class key')}
                        options={classKeyOptions}
                        selected={classKey}
                        setValue={setClassKey}
                        loading={classLoading}
                        dense
                        dataTest={testIds.MetadataImport.classKey}
                    />
                </>
            )}
            <RadioGroup
                name="identifier"
                label={i18n.t('Identifier')}
                options={identifierOptions}
                setValue={setIdentifier}
                checked={identifier}
                dataTest={testIds.MetadataImport.identifier}
            />
            <RadioGroup
                name="importReportMode"
                label={i18n.t('Import report mode')}
                options={importReportModeOptions}
                setValue={setImportReportMode}
                checked={importReportMode}
                dataTest={testIds.MetadataImport.importReportMode}
            />
            <RadioGroup
                name="preheatMode"
                label={i18n.t('Preheat mode')}
                options={preheatModeOptions}
                setValue={setPreheatMode}
                checked={preheatMode}
                dataTest={testIds.MetadataImport.preheatMode}
            />
            <RadioGroup
                name="importStrategy"
                label={i18n.t('Import strategy')}
                options={importStrategyOptions}
                setValue={setImportStrategy}
                checked={importStrategy}
                dataTest={testIds.MetadataImport.importStrategy}
            />
            <RadioGroup
                name="atomicMode"
                label={i18n.t('Atomic mode')}
                options={atomicModeOptions}
                setValue={setAtomicMode}
                checked={atomicMode}
                dataTest={testIds.MetadataImport.atomicMode}
            />
            <RadioGroup
                name="mergeMode"
                label={i18n.t('Merge mode')}
                options={mergeModeOptions}
                setValue={setMergeMode}
                checked={mergeMode}
                dataTest={testIds.MetadataImport.mergeMode}
            />
            <MoreOptions dataTest={testIds.MetadataImport.MoreOptions}>
                <RadioGroup
                    name="flushMode"
                    label={i18n.t('Flush mode')}
                    options={flushModeOptions}
                    setValue={setFlushMode}
                    checked={flushMode}
                    dataTest={testIds.MetadataImport.flushMode}
                />
                <Switch
                    name="skipSharing"
                    label={i18n.t('Skip sharing')}
                    checked={skipSharing}
                    setChecked={setSkipSharing}
                    dataTest={testIds.MetadataImport.skipSharing}
                />
                <Switch
                    name="skipValidation"
                    label={i18n.t('Skip validation')}
                    checked={skipValidation}
                    setChecked={setSkipValidation}
                    dataTest={testIds.MetadataImport.skipValidation}
                />
                <Switch
                    name="isAsync"
                    label={i18n.t('Async')}
                    checked={isAsync}
                    setChecked={setIsAsync}
                    dataTest={testIds.MetadataImport.isAsync}
                />
                <RadioGroup
                    name="inclusionStrategy"
                    label={i18n.t('Inclusion strategy')}
                    options={inclusionStrategyOptions}
                    setValue={setInclusionStrategy}
                    checked={inclusionStrategy}
                    dataTest={testIds.MetadataImport.inclusionStrategy}
                />
            </MoreOptions>
            <ImportButtonStrip
                onSubmit={onSubmit}
                dryRunDataTest={testIds.DataImport.dryRun}
                importDataTest={testIds.DataImport.submit}
                dataTest={testIds.DataImport.ImportButtonStrip}
            />
            <FormAlerts
                alerts={alerts}
                dataTest={testIds.MetadataImport.FormAlerts}
            />
        </Page>
    )
}

MetadataImport.propTypes = {
    query: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }),
}

export { MetadataImport }

import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'

import { metadataImportPage as p } from '../../utils/pages'
import { getPrevJobDetails, uploadFile } from '../../utils/helper'
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
import { useClassKeys } from '../../hooks/useClassKeys'
import { Page } from '../../components/Page'
import { FileUpload } from '../../components/FileUpload'
import { RadioGroup } from '../../components/RadioGroup'
import { Switch } from '../../components/Switch'
import { MoreOptions } from '../../components/MoreOptions'
import { ImportButtonStrip } from '../../components/ImportButtonStrip'
import { FormAlerts } from '../../components/FormAlerts'
import { Select } from '../../components/Select'
import { TaskContext, getNewestTask } from '../../contexts/'

const createInitialState = prevJobDetails => ({
    file: prevJobDetails.file,
    format: prevJobDetails.format || defaultFormatOption,
    identifier: prevJobDetails.identifier || defaultIdentifierOption,
    importReportMode:
        prevJobDetails.importReportMode || defaultImportReportModeOption,
    preheatMode: prevJobDetails.preheatMode || defaultPreheatModeOption,
    importStrategy:
        prevJobDetails.importStrategy || defaultImportStrategyOption,
    firstRowIsHeader: !!prevJobDetails.firstRowIsHeader,
    atomicMode: prevJobDetails.atomicMode || defaultAtomicModeOption,
    mergeMode: prevJobDetails.mergeMode || defaultMergeModeOption,
    flushMode: prevJobDetails.flushMode || defaultFlushModeOption,
    inclusionStrategy:
        prevJobDetails.inclusionStrategy || defaultInclusionStrategyOption,
    skipSharing: !!prevJobDetails.skipSharing,
    skipValidation: !!prevJobDetails.skipValidation,
    isAsync: !prevJobDetails.isAsync,
})

const MetadataImport = ({ query }) => {
    const {
        tasks: { metadata: metadataTasks },
        addTask,
    } = useContext(TaskContext)

    // recreating a previously run job
    const prevJobDetails = getPrevJobDetails(query, metadataTasks)
    const initialState = createInitialState(prevJobDetails)

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

    const {
        loading: classKeysLoading,
        error: classKeysError,
        validationText: classKeysValidationText,
        classKeys,
    } = useClassKeys(
        classKey,
        setClassKey,
        prevJobDetails.classKey || undefined
    )

    const onImport = ({ dryRun }) => {
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

        if (format.value == 'csv' && !classKey) {
            alerts.push({
                id: `classKey-${timestamp}`,
                warning: true,
                message: i18n.t('A class key must be selected'),
            })
        }

        if (alerts.length != 0) {
            return
        }

        // send xhr
        const apiBaseUrl = `${baseUrl}/api/`
        const endpoint = 'metadata.json'
        const params = [
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
            `format=${format.value}`,
            format.value == 'csv'
                ? `firstRowIsHeader=${firstRowIsHeader}&classKey=${classKey.value}`
                : '',
        ]
            .filter(s => s != '')
            .join('&')
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
            dataTest="page-import-metadata"
            summaryTask={getNewestTask(metadataTasks)}
            showFullSummaryTask={showFullSummaryTask}
        >
            <FileUpload
                name="upload"
                file={file}
                setFile={setFile}
                dataTest="input-file-upload"
            />
            <RadioGroup
                name="format"
                label={i18n.t('Format')}
                options={formatOptions}
                setValue={setFormat}
                checked={format}
                dataTest="input-format"
            />
            {format.value == 'csv' && (
                <>
                    <Switch
                        name="firstRowIsHeader"
                        label={i18n.t('First row is header')}
                        checked={firstRowIsHeader}
                        setChecked={setFirstRowIsHeader}
                        dataTest="input-first-row-is-header"
                    />
                    <Select
                        name="classKey"
                        label={i18n.t('Class key')}
                        options={classKeys}
                        selected={classKeysLoading ? undefined : classKey}
                        setValue={setClassKey}
                        loading={classKeysLoading}
                        dataTest="input-class-key"
                        validationText={classKeysValidationText}
                        error={!!classKeysError}
                        dense
                    />
                </>
            )}
            <RadioGroup
                name="identifier"
                label={i18n.t('Identifier')}
                options={identifierOptions}
                setValue={setIdentifier}
                checked={identifier}
                dataTest="input-identifier"
            />
            <RadioGroup
                name="importReportMode"
                label={i18n.t('Import report mode')}
                options={importReportModeOptions}
                setValue={setImportReportMode}
                checked={importReportMode}
                dataTest="input-import-report-mode"
            />
            <RadioGroup
                name="preheatMode"
                label={i18n.t('Preheat mode')}
                options={preheatModeOptions}
                setValue={setPreheatMode}
                checked={preheatMode}
                dataTest="input-preheat-mode"
            />
            <RadioGroup
                name="importStrategy"
                label={i18n.t('Import strategy')}
                options={importStrategyOptions}
                setValue={setImportStrategy}
                checked={importStrategy}
                dataTest="input-import-strategy"
            />
            <RadioGroup
                name="atomicMode"
                label={i18n.t('Atomic mode')}
                options={atomicModeOptions}
                setValue={setAtomicMode}
                checked={atomicMode}
                dataTest="input-atomic-mode"
            />
            <RadioGroup
                name="mergeMode"
                label={i18n.t('Merge mode')}
                options={mergeModeOptions}
                setValue={setMergeMode}
                checked={mergeMode}
                dataTest="input-merge-mode"
            />
            <MoreOptions dataTest="interaction-more-options">
                <RadioGroup
                    name="flushMode"
                    label={i18n.t('Flush mode')}
                    options={flushModeOptions}
                    setValue={setFlushMode}
                    checked={flushMode}
                    dataTest="input-flush-mode"
                />
                <Switch
                    name="skipSharing"
                    label={i18n.t('Skip sharing')}
                    checked={skipSharing}
                    setChecked={setSkipSharing}
                    dataTest="input-skip-sharing"
                />
                <Switch
                    name="skipValidation"
                    label={i18n.t('Skip validation')}
                    checked={skipValidation}
                    setChecked={setSkipValidation}
                    dataTest="input-skip-validation"
                />
                <Switch
                    name="isAsync"
                    label={i18n.t('Async')}
                    checked={isAsync}
                    setChecked={setIsAsync}
                    dataTest="input-is-async"
                />
                <RadioGroup
                    name="inclusionStrategy"
                    label={i18n.t('Inclusion strategy')}
                    options={inclusionStrategyOptions}
                    setValue={setInclusionStrategy}
                    checked={inclusionStrategy}
                    dataTest="input-inclusion-strategy"
                />
            </MoreOptions>
            <ImportButtonStrip
                onImport={onImport}
                dryRunDataTest="input-dry-run"
                importDataTest="input-import-submit"
                dataTest="input-import-button-strip"
            />
            <FormAlerts alerts={alerts} dataTest="input-form-alerts" />
        </Page>
    )
}

MetadataImport.propTypes = {
    query: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }),
}

export { MetadataImport }

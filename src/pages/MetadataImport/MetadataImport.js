import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useConfig } from '@dhis2/app-runtime'
import { Form } from '@dhis2/ui-forms'
import i18n from '@dhis2/d2-i18n'

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
import { FileUpload, SINGLE_FILE_VALIDATOR } from '../../components/FileUpload'
import { RadioGroup } from '../../components/RadioGroup'
import { Switch } from '../../components/Switch'
import { MoreOptions } from '../../components/MoreOptions'
import { ImportButtonStrip } from '../../components/ImportButtonStrip'
import { FormAlerts } from '../../components/FormAlerts'
import { MetadataImportIcon } from '../../components/Icon'
import { Select } from '../../components/Select'
import { TaskContext, getNewestTask } from '../../contexts/'

const createInitialValues = prevJobDetails => ({
    files: prevJobDetails.files,
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
    const [initialValues, setInitialValues] = useState(
        createInitialValues(prevJobDetails)
    )

    const [progress, setProgress] = useState(0)
    const [alerts, setAlerts] = useState([])
    const [showFullSummaryTask, setShowFullSummaryTask] = useState(false)
    const { baseUrl } = useConfig()

    const {
        loading: classKeysLoading,
        error: classKeysError,
        validationText: classKeysValidationText,
        classKeys,
    } = useClassKeys(
        classKey =>
            setInitialValues(initialValues => ({
                ...initialValues,
                classKey: classKey,
            })),
        prevJobDetails.classKey || undefined
    )

    const onImport = values => {
        const {
            dryRun,
            files,
            format,
            identifier,
            importReportMode,
            preheatMode,
            importStrategy,
            atomicMode,
            mergeMode,
            flushMode,
            skipSharing,
            skipValidation,
            inclusionStrategy,
            isAsync,
            firstRowIsHeader,
            classKey,
        } = values

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

        uploadFile({
            url,
            file: files[0],
            format: format.value,
            type: 'METADATA_IMPORT',
            setProgress,
            setAlerts,
            addEntry: (id, entry) =>
                addTask('metadata', id, { ...entry, jobDetails: values }),
        })
        setShowFullSummaryTask(true)
    }

    const validate = values => {
        const classKeyValidator = (format, classKey) =>
            format.value == 'csv' && !classKey
                ? i18n.t('A class key must be selected')
                : undefined

        return {
            files: SINGLE_FILE_VALIDATOR(values.files),
            classKey: classKeyValidator(values.format, values.classKey),
        }
    }

    return (
        <Page
            title={PAGE_NAME}
            desc={PAGE_DESCRIPTION}
            icon={PAGE_ICON}
            loading={progress}
            dataTest="page-import-metadata"
            summaryTask={getNewestTask(metadataTasks)}
            showFullSummaryTask={showFullSummaryTask}
        >
            <Form
                onSubmit={onImport}
                initialValues={initialValues}
                validate={validate}
                render={({ handleSubmit, form, values }) => (
                    <form onSubmit={handleSubmit}>
                        <FileUpload name="files" dataTest="input-file-upload" />
                        <RadioGroup
                            name="format"
                            label={i18n.t('Format')}
                            options={formatOptions}
                            dataTest="input-format"
                        />
                        {values.format.value == 'csv' && (
                            <>
                                <Switch
                                    name="firstRowIsHeader"
                                    label={i18n.t('First row is header')}
                                    dataTest="input-first-row-is-header"
                                />
                                <Select
                                    name="classKey"
                                    label={i18n.t('Class key')}
                                    options={classKeys}
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
                            dataTest="input-identifier"
                        />
                        <RadioGroup
                            name="importReportMode"
                            label={i18n.t('Import report mode')}
                            options={importReportModeOptions}
                            dataTest="input-import-report-mode"
                        />
                        <RadioGroup
                            name="preheatMode"
                            label={i18n.t('Preheat mode')}
                            options={preheatModeOptions}
                            dataTest="input-preheat-mode"
                        />
                        <RadioGroup
                            name="importStrategy"
                            label={i18n.t('Import strategy')}
                            options={importStrategyOptions}
                            dataTest="input-import-strategy"
                        />
                        <RadioGroup
                            name="atomicMode"
                            label={i18n.t('Atomic mode')}
                            options={atomicModeOptions}
                            dataTest="input-atomic-mode"
                        />
                        <RadioGroup
                            name="mergeMode"
                            label={i18n.t('Merge mode')}
                            options={mergeModeOptions}
                            dataTest="input-merge-mode"
                        />
                        <MoreOptions dataTest="interaction-more-options">
                            <RadioGroup
                                name="flushMode"
                                label={i18n.t('Flush mode')}
                                options={flushModeOptions}
                                dataTest="input-flush-mode"
                            />
                            <Switch
                                name="skipSharing"
                                label={i18n.t('Skip sharing')}
                                dataTest="input-skip-sharing"
                            />
                            <Switch
                                name="skipValidation"
                                label={i18n.t('Skip validation')}
                                dataTest="input-skip-validation"
                            />
                            <Switch
                                name="isAsync"
                                label={i18n.t('Async')}
                                dataTest="input-is-async"
                            />
                            <RadioGroup
                                name="inclusionStrategy"
                                label={i18n.t('Inclusion strategy')}
                                options={inclusionStrategyOptions}
                                dataTest="input-inclusion-strategy"
                            />
                        </MoreOptions>
                        <ImportButtonStrip
                            form={form}
                            dryRunDataTest="input-dry-run"
                            importDataTest="input-import-submit"
                            dataTest="input-import-button-strip"
                        />
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

MetadataImport.propTypes = {
    query: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }),
}

// PAGE INFO
const PAGE_NAME = i18n.t('Metadata import')
const PAGE_DESCRIPTION = i18n.t(
    'Import metadata like data elements and organisation units using the DXF 2 format.'
)
const PAGE_ICON = <MetadataImportIcon />

export { MetadataImport }

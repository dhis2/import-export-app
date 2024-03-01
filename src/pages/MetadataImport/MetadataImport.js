import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm } from '@dhis2/ui'
import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
    Page,
    MetadataImportIcon,
    MoreOptions,
    BasicOptions,
    ValidationSummary,
    mergeOperation,
    MergeOperationNotice,
} from '../../components/index.js'
import {
    FileUpload,
    Format,
    formatNoXmlOptions,
    defaultFormatOption,
    FirstRowIsHeader,
    defaultFirstRowIsHeaderOption,
    ClassKey,
    Identifier,
    defaultIdentifierOption,
    ImportReportMode,
    defaultImportReportModeOption,
    ImportStrategy,
    defaultImportStrategyOption,
    AtomicMode,
    defaultAtomicModeOption,
    FlushMode,
    defaultFlushModeOption,
    SkipSharing,
    defaultSkipSharingOption,
    SkipValidation,
    defaultSkipValidationOption,
    IsAsync,
    defaultIsAsyncOption,
    InclusionStrategy,
    defaultInclusionStrategyOption,
    ImportButtonStrip,
    FormAlerts,
} from '../../components/Inputs/index.js'
import { TaskContext, getNewestTask } from '../../contexts/index.js'
import { getPrevJobDetails, getInitialBoolValue } from '../../utils/helper.js'
import { onImport } from './form-helper.js'

const { Form } = ReactFinalForm

// PAGE INFO
export const PAGE_NAME = i18n.t('Metadata import')
export const PAGE_DESCRIPTION = i18n.t(
    'Import metadata like data elements and organisation units using the JSON and CSV format.'
)
const PAGE_ICON = <MetadataImportIcon />

const createInitialValues = (prevJobDetails) => ({
    files: prevJobDetails.files,
    format: prevJobDetails.format || defaultFormatOption,
    identifier: prevJobDetails.identifier || defaultIdentifierOption,
    importReportMode:
        prevJobDetails.importReportMode || defaultImportReportModeOption,
    importStrategy:
        prevJobDetails.importStrategy || defaultImportStrategyOption,
    firstRowIsHeader: getInitialBoolValue(
        prevJobDetails.firstRowIsHeader,
        defaultFirstRowIsHeaderOption
    ),
    atomicMode: prevJobDetails.atomicMode || defaultAtomicModeOption,
    mergeMode: prevJobDetails.mergeMode || mergeOperation,
    flushMode: prevJobDetails.flushMode || defaultFlushModeOption,
    inclusionStrategy:
        prevJobDetails.inclusionStrategy || defaultInclusionStrategyOption,
    skipSharing: getInitialBoolValue(
        prevJobDetails.skipSharing,
        defaultSkipSharingOption
    ),
    skipValidation: getInitialBoolValue(
        prevJobDetails.skipValidation,
        defaultSkipValidationOption
    ),
    isAsync: getInitialBoolValue(prevJobDetails.isAsync, defaultIsAsyncOption),
})

const MetadataImport = () => {
    const {
        tasks: { metadata: metadataTasks },
        addTask,
    } = useContext(TaskContext)

    // recreating a previously run job
    const query = useLocation().query
    const prevJobDetails = getPrevJobDetails(query, metadataTasks)
    const initialValues = createInitialValues(prevJobDetails)

    const [progress, setProgress] = useState(0)
    const [showFullSummaryTask, setShowFullSummaryTask] = useState(false)
    const { baseUrl } = useConfig()

    const onSubmit = onImport({
        baseUrl,
        setProgress,
        addTask,
        setShowFullSummaryTask,
    })

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
                onSubmit={onSubmit}
                initialValues={initialValues}
                subscription={{
                    values: true,
                    submitError: true,
                }}
                render={({ handleSubmit, form, values, submitError }) => (
                    <form onSubmit={handleSubmit}>
                        <BasicOptions>
                            <FileUpload
                                helpText={i18n.t(
                                    'Supported file types: JSON and CSV.',
                                    {
                                        nsSeparator: '>',
                                    }
                                )}
                            />
                            <Format
                                availableFormats={formatNoXmlOptions}
                                type="import"
                            />
                            <FirstRowIsHeader show={values.format == 'csv'} />
                            <ClassKey
                                show={values.format == 'csv'}
                                form={form}
                                prevValue={prevJobDetails.classKey}
                            />
                            <Identifier />
                            <ImportReportMode />
                            <ImportStrategy value={values.importStrategy} />
                            <AtomicMode />
                            <MergeOperationNotice />
                        </BasicOptions>
                        <MoreOptions>
                            <FlushMode />
                            <SkipSharing />
                            <SkipValidation />
                            <IsAsync />
                            <InclusionStrategy />
                        </MoreOptions>
                        <ValidationSummary />
                        <ImportButtonStrip form={form} />
                        <FormAlerts alerts={submitError} />
                    </form>
                )}
            />
        </Page>
    )
}

export { MetadataImport }

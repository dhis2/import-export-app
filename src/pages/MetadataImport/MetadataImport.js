import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useConfig } from '@dhis2/app-runtime'
import { Form } from '@dhis2/ui-forms'
import i18n from '@dhis2/d2-i18n'

import { getPrevJobDetails } from '../../utils/helper'
import {
    formatOptions,
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
import {
    FileUpload,
    Format,
    FirstRowIsHeader,
    ClassKey,
    Identifier,
    ImportReportMode,
    PreheatMode,
    ImportStrategy,
    AtomicMode,
    MergeMode,
    FlushMode,
    SkipSharing,
    SkipValidation,
    IsAsync,
    InclusionStrategy,
    ImportButtonStrip,
    FormAlerts,
} from '../../components/Inputs'
import { MoreOptions } from '../../components/MoreOptions'
import { MetadataImportIcon } from '../../components/Icon'
import { TaskContext, getNewestTask } from '../../contexts/'
import { onImport, validate } from './form-helper'

// PAGE INFO
const PAGE_NAME = i18n.t('Metadata import')
const PAGE_DESCRIPTION = i18n.t(
    'Import metadata like data elements and organisation units using the DXF 2 format.'
)
const PAGE_ICON = <MetadataImportIcon />

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
                validate={validate}
                subscription={{ values: true }}
                render={({ handleSubmit, form, values, submitError }) => (
                    <form onSubmit={handleSubmit}>
                        <FileUpload />
                        <Format availableFormats={formatOptions} />
                        <FirstRowIsHeader
                            show={values.format.value == 'csv'}
                            value={values.firstRowIsHeader}
                        />
                        <ClassKey
                            show={values.format.value == 'csv'}
                            form={form}
                            prevValue={prevJobDetails.classKey}
                        />
                        <Identifier />
                        <ImportReportMode />
                        <PreheatMode />
                        <ImportStrategy />
                        <AtomicMode />
                        <MergeMode />
                        <MoreOptions>
                            <FlushMode />
                            <SkipSharing value={values.skipSharing} />
                            <SkipValidation value={values.skipValidation} />
                            <IsAsync value={values.isAsync} />
                            <InclusionStrategy />
                        </MoreOptions>
                        <ImportButtonStrip form={form} />
                        <FormAlerts alerts={submitError} />
                    </form>
                )}
            />
        </Page>
    )
}

export { MetadataImport }

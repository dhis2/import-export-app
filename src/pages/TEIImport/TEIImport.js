import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useConfig } from '@dhis2/app-runtime'
import { Form } from '@dhis2/ui-forms'
import i18n from '@dhis2/d2-i18n'

import { getPrevJobDetails } from '../../utils/helper'
import {
    FileUpload,
    Format,
    formatNoCsvOptions,
    defaultFormatOption,
    Identifier,
    defaultIdentifierOption,
    ImportReportMode,
    defaultImportReportModeOption,
    PreheatMode,
    defaultPreheatModeOption,
    ImportStrategy,
    defaultImportStrategyOption,
    AtomicMode,
    defaultAtomicModeOption,
    MergeMode,
    defaultMergeModeOption,
    FlushMode,
    defaultFlushModeOption,
    SkipSharing,
    SkipValidation,
    IsAsync,
    InclusionStrategy,
    defaultInclusionStrategyOption,
    ImportButtonStrip,
    FormAlerts,
    DataElementIdScheme,
    defaultDataElementIdSchemeOption,
    EventIdScheme,
    defaultEventIdSchemeOption,
    IdScheme,
    defaultIdSchemeOption,
    OrgUnitIdScheme,
    defaultOrgUnitIdSchemeOption,
} from '../../components/Inputs'
import { Page, TEIIcon, MoreOptions } from '../../components/'
import { TaskContext, getNewestTask } from '../../contexts/'
import { onImport } from './form-helper'

// PAGE INFO
const PAGE_NAME = i18n.t('Tracked entity instances import')
const PAGE_DESCRIPTION = i18n.t(
    'Import tracked entity instances from JSON or XML files.'
)
const PAGE_ICON = <TEIIcon />

const createInitialValues = prevJobDetails => ({
    files: prevJobDetails.files,
    format: prevJobDetails.format || defaultFormatOption,
    identifier: prevJobDetails.identifier || defaultIdentifierOption,
    importReportMode:
        prevJobDetails.importReportMode || defaultImportReportModeOption,
    preheatMode: prevJobDetails.preheatMode || defaultPreheatModeOption,
    importStrategy:
        prevJobDetails.importStrategy || defaultImportStrategyOption,
    atomicMode: prevJobDetails.atomicMode || defaultAtomicModeOption,
    mergeMode: prevJobDetails.mergeMode || defaultMergeModeOption,
    flushMode: prevJobDetails.flushMode || defaultFlushModeOption,
    inclusionStrategy:
        prevJobDetails.inclusionStrategy || defaultInclusionStrategyOption,
    skipSharing: !!prevJobDetails.skipSharing,
    skipValidation: !!prevJobDetails.skipValidation,
    isAsync: !prevJobDetails.isAsync,
    dataElementIdScheme:
        prevJobDetails.dataElementIdScheme || defaultDataElementIdSchemeOption,
    orgUnitIdScheme:
        prevJobDetails.orgUnitIdScheme || defaultOrgUnitIdSchemeOption,
    eventIdScheme: prevJobDetails.eventIdScheme || defaultEventIdSchemeOption,
    idScheme: prevJobDetails.idScheme || defaultIdSchemeOption,
})

const TEIImport = () => {
    const {
        tasks: { tei: teiTasks },
        addTask,
    } = useContext(TaskContext)

    // recreating a previously run job
    const query = useLocation().query
    const prevJobDetails = getPrevJobDetails(query, teiTasks)
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
            dataTest="page-import-tei"
            summaryTask={getNewestTask(teiTasks)}
            showFullSummaryTask={showFullSummaryTask}
        >
            <Form
                onSubmit={onSubmit}
                initialValues={initialValues}
                subscription={{ values: true, submitError: true }}
                render={({ handleSubmit, form, submitError }) => (
                    <form onSubmit={handleSubmit}>
                        <FileUpload />
                        <Format availableFormats={formatNoCsvOptions} />
                        <Identifier />
                        <ImportReportMode />
                        <PreheatMode />
                        <ImportStrategy />
                        <AtomicMode />
                        <MergeMode />
                        <MoreOptions>
                            <FlushMode />
                            <SkipSharing />
                            <SkipValidation />
                            <IsAsync />
                            <InclusionStrategy />
                            <DataElementIdScheme />
                            <EventIdScheme />
                            <OrgUnitIdScheme />
                            <IdScheme />
                        </MoreOptions>
                        <ImportButtonStrip form={form} />
                        <FormAlerts alerts={submitError} />
                    </form>
                )}
            />
        </Page>
    )
}

export { TEIImport }

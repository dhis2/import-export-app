import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useConfig } from '@dhis2/app-runtime'
import { ReactFinalForm } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'

import { getPrevJobDetails, getInitialBoolValue } from '../../utils/helper'
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
    defaultSkipSharingOption,
    SkipValidation,
    defaultSkipValidationOption,
    IsAsync,
    defaultIsAsyncOption,
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
} from '../../components/Inputs/index'
import {
    Page,
    TEIIcon,
    MoreOptions,
    SchemeContainer,
    BasicOptions,
} from '../../components/index'
import { TaskContext, getNewestTask } from '../../contexts/index'
import { onImport } from './form-helper'

const { Form } = ReactFinalForm

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
    skipSharing: getInitialBoolValue(
        prevJobDetails.skipSharing,
        defaultSkipSharingOption
    ),
    skipValidation: getInitialBoolValue(
        prevJobDetails.skipValidation,
        defaultSkipValidationOption
    ),
    isAsync: getInitialBoolValue(prevJobDetails.isAsync, defaultIsAsyncOption),
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
                render={({ handleSubmit, values, form, submitError }) => (
                    <form onSubmit={handleSubmit}>
                        <BasicOptions>
                            <FileUpload
                                helpText={i18n.t(
                                    'Supported file types: JSON and XML.',
                                    {
                                        nsSeparator: '>',
                                    }
                                )}
                            />
                            <Format
                                availableFormats={formatNoCsvOptions}
                                type="import"
                            />
                            <Identifier />
                            <ImportReportMode />
                            <PreheatMode />
                            <ImportStrategy value={values.importStrategy} />
                            <AtomicMode />
                            <MergeMode />
                        </BasicOptions>
                        <MoreOptions>
                            <FlushMode />
                            <SkipSharing />
                            <SkipValidation />
                            <IsAsync />
                            <InclusionStrategy />
                            <SchemeContainer>
                                <DataElementIdScheme />
                                <EventIdScheme />
                                <OrgUnitIdScheme />
                                <IdScheme />
                            </SchemeContainer>
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

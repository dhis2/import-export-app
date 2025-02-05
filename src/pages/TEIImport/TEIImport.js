import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm } from '@dhis2/ui'
import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
    Page,
    TEIIcon,
    MoreOptions,
    SchemeContainer,
    BasicOptions,
    ValidationSummary,
} from '../../components/index.js'
import {
    FileUpload,
    Format,
    defaultFormatOption,
    Identifier,
    defaultIdentifierOption,
    ImportReportMode,
    defaultImportReportModeOption,
    PreheatMode,
    defaultPreheatModeOption,
    Strategy,
    defaultStrategyOption,
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
    InclusionStrategy,
    defaultInclusionStrategyOption,
    ImportButtonStrip,
    FormAlerts,
    DataElementIdScheme,
    defaultDataElementIdSchemeOption,
    IdScheme,
    defaultIdSchemeOption,
    OrgUnitIdScheme,
    defaultOrgUnitIdSchemeOption,
    formatNoXmlNoCsvOptions,
} from '../../components/Inputs/index.js'
import { TaskContext, getNewestTask } from '../../contexts/index.js'
import { getPrevJobDetails, getInitialBoolValue } from '../../utils/helper.js'
import { onImport } from './form-helper.js'

const { Form } = ReactFinalForm

// PAGE INFO
export const PAGE_NAME = i18n.t('Tracked entities import')
export const PAGE_DESCRIPTION = i18n.t(
    'Import tracked entities using JSON format.'
)
const PAGE_ICON = <TEIIcon />

const createInitialValues = (prevJobDetails) => ({
    files: prevJobDetails.files,
    format: prevJobDetails.format || defaultFormatOption,
    identifier: prevJobDetails.identifier || defaultIdentifierOption,
    importReportMode:
        prevJobDetails.importReportMode || defaultImportReportModeOption,
    preheatMode: prevJobDetails.preheatMode || defaultPreheatModeOption,
    strategy: prevJobDetails.strategy || defaultStrategyOption,
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
    isAsync: true,
    dataElementIdScheme:
        prevJobDetails.dataElementIdScheme || defaultDataElementIdSchemeOption,
    orgUnitIdScheme:
        prevJobDetails.orgUnitIdScheme || defaultOrgUnitIdSchemeOption,
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
                subscription={{
                    values: true,
                    submitError: true,
                }}
                render={({ handleSubmit, values, form, submitError }) => (
                    <form onSubmit={handleSubmit}>
                        <BasicOptions>
                            <FileUpload
                                helpText={i18n.t(
                                    'Supported file types: JSON.',
                                    {
                                        nsSeparator: '>',
                                    }
                                )}
                            />
                            <Format
                                availableFormats={formatNoXmlNoCsvOptions}
                                type="import"
                            />
                            <Identifier />
                            <ImportReportMode />
                            <PreheatMode />
                            <Strategy value={values.strategy} />
                            <AtomicMode />
                            <MergeMode />
                        </BasicOptions>
                        <MoreOptions>
                            <FlushMode />
                            <SkipSharing />
                            <SkipValidation />
                            <InclusionStrategy />
                            <SchemeContainer>
                                <DataElementIdScheme />
                                <OrgUnitIdScheme />
                                <IdScheme />
                            </SchemeContainer>
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

export { TEIImport }

import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm } from '@dhis2/ui'
import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
    Page,
    WithAuthority,
    BasicOptions,
    MoreOptions,
    SchemeContainer,
    DataIcon,
    ValidationSummary,
} from '../../components/index.js'
import {
    FileUpload,
    Format,
    formatAdxPdfOptions,
    defaultFormatOption,
    FirstRowIsHeader,
    defaultFirstRowIsHeaderOption,
    Strategy,
    defaultStrategyOption,
    PreheatCache,
    defaultPreheatCacheOption,
    SkipAudit,
    defaultSkipAuditOption,
    SkipExistingCheck,
    defaultSkipExistingCheckOption,
    DataElementIdScheme,
    defaultDataElementIdSchemeOption,
    IdScheme,
    defaultIdSchemeOption,
    OrgUnitIdScheme,
    defaultOrgUnitIdSchemeOption,
    ImportButtonStrip,
    FormAlerts,
} from '../../components/Inputs/index.js'
import { hasAuthorityToSkipAudit } from '../../components/WithAuthority/predicates.js'
import { TaskContext, getNewestTask } from '../../contexts/index.js'
import { getPrevJobDetails, getInitialBoolValue } from '../../utils/helper.js'
import { onImport } from './form-helper.js'

const { Form } = ReactFinalForm

// PAGE INFO
export const PAGE_NAME = i18n.t('Data import')
export const PAGE_DESCRIPTION = i18n.t(
    'Import data values using ADX XML, DXF 2 XML, JSON, CSV or PDF format.'
)
const PAGE_ICON = <DataIcon />

const createInitialValues = (prevJobDetails) => ({
    files: prevJobDetails.files,
    format: prevJobDetails.format || defaultFormatOption,
    strategy: prevJobDetails.strategy || defaultStrategyOption,
    firstRowIsHeader: getInitialBoolValue(
        prevJobDetails.firstRowIsHeader,
        defaultFirstRowIsHeaderOption
    ),
    preheatCache: getInitialBoolValue(
        prevJobDetails.preheatCache,
        defaultPreheatCacheOption
    ),
    skipAudit: getInitialBoolValue(
        prevJobDetails.skipAudit,
        defaultSkipAuditOption
    ),
    dataElementIdScheme:
        prevJobDetails.dataElementIdScheme || defaultDataElementIdSchemeOption,
    orgUnitIdScheme:
        prevJobDetails.orgUnitIdScheme || defaultOrgUnitIdSchemeOption,
    idScheme: prevJobDetails.idScheme || defaultIdSchemeOption,
    skipExistingCheck: getInitialBoolValue(
        prevJobDetails.skipExistingCheck,
        defaultSkipExistingCheckOption
    ),
})

const DataImport = () => {
    const {
        tasks: { data: dataTasks },
        addTask,
    } = useContext(TaskContext)

    // recreating a previously run job
    const query = useLocation().query
    const prevJobDetails = getPrevJobDetails(query, dataTasks)
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
            dataTest="page-import-data"
            summaryTask={getNewestTask(dataTasks)}
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
                                    'Supported file types: JSON, CSV, XML, ADX and PDF.',
                                    {
                                        nsSeparator: '>',
                                    }
                                )}
                            />
                            <Format
                                availableFormats={formatAdxPdfOptions}
                                type="import"
                            />
                            <FirstRowIsHeader show={values.format == 'csv'} />
                            <Strategy value={values.strategy} />
                            <PreheatCache />
                            <WithAuthority pred={hasAuthorityToSkipAudit}>
                                <SkipAudit />
                            </WithAuthority>
                        </BasicOptions>
                        <MoreOptions>
                            <SchemeContainer>
                                <DataElementIdScheme />
                                <OrgUnitIdScheme />
                                <IdScheme />
                            </SchemeContainer>
                            <SkipExistingCheck />
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

export { DataImport }

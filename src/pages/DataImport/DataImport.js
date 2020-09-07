import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useConfig } from '@dhis2/app-runtime'
import { ReactFinalForm } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'

import { getPrevJobDetails } from '../../utils/helper'
import {
    FileUpload,
    Format,
    formatAdxPdfOptions,
    defaultFormatOption,
    FirstRowIsHeader,
    Strategy,
    defaultStrategyOption,
    PreheatCache,
    SkipAudit,
    SkipExistingCheck,
    DataElementIdScheme,
    defaultDataElementIdSchemeOption,
    IdScheme,
    defaultIdSchemeOption,
    OrgUnitIdScheme,
    defaultOrgUnitIdSchemeOption,
    ImportButtonStrip,
    FormAlerts,
} from '../../components/Inputs/index'
import { hasAuthorityToSkipAudit } from '../../components/WithAuthority/predicates'
import {
    Page,
    WithAuthority,
    BasicOptions,
    MoreOptions,
    SchemeContainer,
    DataIcon,
} from '../../components/index'
import { TaskContext, getNewestTask } from '../../contexts/index'
import { onImport } from './form-helper'

const { Form } = ReactFinalForm

// PAGE INFO
const PAGE_NAME = i18n.t('Data import')
const PAGE_DESCRIPTION = i18n.t(
    'Import data values from ADX XML, DXF 2 XML, JSON, CSV or PDF files.'
)
const PAGE_ICON = <DataIcon />

const createInitialValues = prevJobDetails => ({
    files: prevJobDetails.files,
    format: prevJobDetails.format || defaultFormatOption,
    strategy: prevJobDetails.strategy || defaultStrategyOption,
    firstRowIsHeader: !!prevJobDetails.firstRowIsHeader,
    preheatCache: !!prevJobDetails.preheatCache,
    skipAudit: !!prevJobDetails.skipAudit,
    dataElementIdScheme:
        prevJobDetails.dataElementIdScheme || defaultDataElementIdSchemeOption,
    orgUnitIdScheme:
        prevJobDetails.orgUnitIdScheme || defaultOrgUnitIdSchemeOption,
    idScheme: prevJobDetails.idScheme || defaultIdSchemeOption,
    skipExistingCheck: !!prevJobDetails.skipExistingCheck,
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
                subscription={{ values: true, submitError: true }}
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
                            <FirstRowIsHeader
                                show={values.format.value == 'csv'}
                            />
                            <Strategy />
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
                        <ImportButtonStrip form={form} />
                        <FormAlerts alerts={submitError} />
                    </form>
                )}
            />
        </Page>
    )
}

export { DataImport }

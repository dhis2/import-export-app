import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useConfig } from '@dhis2/app-runtime'
import { Form } from '@dhis2/ui-forms'
import i18n from '@dhis2/d2-i18n'

import { getPrevJobDetails, uploadFile } from '../../utils/helper'
import { helpText } from '../../utils/text'
import {
    formatAdxPdfOptions,
    strategyOptions,
    defaultFormatOption,
    defaultStrategyOption,
    defaultDataElementIdSchemeOption,
    defaultOrgUnitIdSchemeOption,
    defaultIdSchemeOption,
} from '../../utils/options'
import { Page } from '../../components/Page'
import { FileUpload, SINGLE_FILE_VALIDATOR } from '../../components/FileUpload'
import { RadioGroupField } from '../../components/RadioGroup'
import { Switch } from '../../components/Switch'
import {
    WithAuthority,
    hasAuthorityToSkipAudit,
} from '../../components/WithAuthority'
import { MoreOptions } from '../../components/MoreOptions'
import {
    DataElementIdScheme,
    IdScheme,
    OrgUnitIdScheme,
} from '../../components/ElementSchemes'
import { ImportButtonStrip } from '../../components/ImportButtonStrip'
import { FormAlerts } from '../../components/FormAlerts'
import { DataIcon } from '../../components/Icon'
import { TaskContext, getNewestTask } from '../../contexts/'

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

const DataImport = ({ query }) => {
    const {
        tasks: { data: dataTasks },
        addTask,
    } = useContext(TaskContext)

    // recreating a previously run job
    const prevJobDetails = getPrevJobDetails(query, dataTasks)
    const initialValues = createInitialValues(prevJobDetails)

    const [progress, setProgress] = useState(0)
    const [alerts, setAlerts] = useState([])
    const [showFullSummaryTask, setShowFullSummaryTask] = useState(false)
    const { baseUrl } = useConfig()

    const onImport = values => {
        const {
            dryRun,
            files,
            strategy,
            preheatCache,
            skipAudit,
            dataElementIdScheme,
            orgUnitIdScheme,
            idScheme,
            skipExistingCheck,
            format,
            firstRowIsHeader,
        } = values

        // send xhr
        const apiBaseUrl = `${baseUrl}/api/`
        const endpoint = 'dataValueSets.json'
        const params = [
            'async=true',
            `dryRun=${dryRun}`,
            `strategy=${strategy.value}`,
            `preheatCache=${preheatCache}`,
            `skipAudit=${skipAudit}`,
            `dataElementIdScheme=${dataElementIdScheme.value}`,
            `orgUnitIdScheme=${orgUnitIdScheme.value}`,
            `idScheme=${idScheme.value}`,
            `skipExistingCheck=${skipExistingCheck}`,
            `format=${format.value}`,
            format == 'csv' ? `firstRowIsHeader=${firstRowIsHeader}` : '',
        ]
            .filter(s => s != '')
            .join('&')
        const url = `${apiBaseUrl}${endpoint}?${params}`

        uploadFile({
            url,
            file: files[0],
            format: format.value,
            type: 'DATAVALUE_IMPORT',
            setProgress,
            setAlerts,
            addEntry: (id, entry) =>
                addTask('data', id, { ...entry, jobDetails: values }),
        })
        setShowFullSummaryTask(true)
    }

    const validate = values => {
        return {
            files: SINGLE_FILE_VALIDATOR(values.files),
        }
    }

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
                onSubmit={onImport}
                initialValues={initialValues}
                validate={validate}
                subscription={{ values: true }}
                render={({ handleSubmit, form, values }) => (
                    <form onSubmit={handleSubmit}>
                        <FileUpload name="files" dataTest="input-file-upload" />
                        <RadioGroupField
                            name="format"
                            label={i18n.t('Format')}
                            options={formatAdxPdfOptions}
                            dataTest="input-format"
                        />
                        {values.format.value == 'csv' && (
                            <Switch
                                label={i18n.t('First row is header')}
                                name="firstRowIsHeader"
                                value={values.firstRowIsHeader}
                                dataTest="input-first-row-is-header"
                            />
                        )}
                        <RadioGroupField
                            name="strategy"
                            label={i18n.t('Strategy')}
                            options={strategyOptions}
                            dataTest="input-strategy"
                        />
                        <Switch
                            label={i18n.t('Preheat cache')}
                            name="preheatCache"
                            value={values.preheatCache}
                            help={helpText.preheatCache}
                            dataTest="input-preheat-cache"
                        />
                        <WithAuthority pred={hasAuthorityToSkipAudit}>
                            <Switch
                                label={i18n.t('Skip audit')}
                                name="skipAudit"
                                value={values.skipAudit}
                                help={helpText.skipAudit}
                                dataTest="input-has-authority-to-skip-audit"
                            />
                        </WithAuthority>
                        <MoreOptions dataTest="interaction-more-options">
                            <DataElementIdScheme dataTest="input-data-element-id-scheme" />
                            <OrgUnitIdScheme dataTest="input-org-unit-id-scheme" />
                            <IdScheme dataTest="input-id-scheme" />
                            <Switch
                                name="skipExistingCheck"
                                label={i18n.t('Skip exisiting check')}
                                value={values.skipExistingCheck}
                                help={helpText.skipExistingCheck}
                                dataTest="input-skip-exisiting-check"
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

DataImport.propTypes = {
    query: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }),
}

// PAGE INFO
const PAGE_NAME = i18n.t('Data import')
const PAGE_DESCRIPTION = i18n.t(
    'Import data values from ADX XML, DXF 2 XML, JSON, CSV or PDF files.'
)
const PAGE_ICON = <DataIcon />

export { DataImport }

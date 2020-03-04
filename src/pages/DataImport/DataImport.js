import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useConfig } from '@dhis2/app-runtime'
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
import { FileUpload } from '../../components/FileUpload'
import { RadioGroup } from '../../components/RadioGroup'
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

const createInitialState = prevJobDetails => ({
    file: prevJobDetails.file,
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
    const initialState = createInitialState(prevJobDetails)

    const [progress, setProgress] = useState(0)
    const [file, setFile] = useState(initialState.file)
    const [format, setFormat] = useState(initialState.format)
    const [strategy, setStrategy] = useState(initialState.strategy)
    const [firstRowIsHeader, setFirstRowIsHeader] = useState(
        initialState.firstRowIsHeader
    )
    const [preheatCache, setPreheatCache] = useState(initialState.preheatCache)
    const [skipAudit, setSkipAudit] = useState(initialState.skipAudit)
    const [dataElementIdScheme, setDataElementIdScheme] = useState(
        initialState.dataElementIdScheme
    )
    const [orgUnitIdScheme, setOrgUnitIdScheme] = useState(
        initialState.orgUnitIdScheme
    )
    const [idScheme, setIdScheme] = useState(initialState.idScheme)
    const [skipExistingCheck, setSkipExistingCheck] = useState(
        initialState.skipExistingCheck
    )
    const [alerts, setAlerts] = useState([])
    const [showFullSummaryTask, setShowFullSummaryTask] = useState(false)
    const { baseUrl } = useConfig()

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

        if (alerts.length != 0) {
            return
        }

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
            format.value == 'csv' ? `firstRowIsHeader=${firstRowIsHeader}` : '',
        ]
            .filter(s => s != '')
            .join('&')
        const url = `${apiBaseUrl}${endpoint}?${params}`

        const jobDetails = {
            file,
            format,
            dryRun,
            strategy,
            preheatCache,
            skipAudit,
            dataElementIdScheme,
            orgUnitIdScheme,
            idScheme,
            skipExistingCheck,
            firstRowIsHeader,
        }

        uploadFile({
            url,
            file,
            format: format.value,
            type: 'DATAVALUE_IMPORT',
            setProgress,
            setAlerts,
            addEntry: (id, entry) =>
                addTask('data', id, { ...entry, jobDetails: jobDetails }),
        })
        setShowFullSummaryTask(true)
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
            <FileUpload
                name="upload"
                file={file}
                setFile={setFile}
                dataTest="input-file-upload"
            />
            <RadioGroup
                name="format"
                label={i18n.t('Format')}
                options={formatAdxPdfOptions}
                setValue={setFormat}
                checked={format}
                dataTest="input-format"
            />
            {format.value == 'csv' && (
                <Switch
                    label={i18n.t('First row is header')}
                    name="firstRowIsHeader"
                    checked={firstRowIsHeader}
                    setChecked={setFirstRowIsHeader}
                    dataTest="input-first-row-is-header"
                />
            )}
            <RadioGroup
                name="strategy"
                label={i18n.t('Strategy')}
                options={strategyOptions}
                setValue={setStrategy}
                checked={strategy}
                dataTest="input-strategy"
            />
            <Switch
                label={i18n.t('Preheat cache')}
                name="preheatCache"
                checked={preheatCache}
                setChecked={setPreheatCache}
                help={helpText.preheatCache}
                dataTest="input-preheat-cache"
            />
            <WithAuthority pred={hasAuthorityToSkipAudit}>
                <Switch
                    label={i18n.t('Skip audit')}
                    name="skipAudit"
                    checked={skipAudit}
                    setChecked={setSkipAudit}
                    help={helpText.skipAudit}
                    dataTest="input-has-authority-to-skip-audit"
                />
            </WithAuthority>
            <MoreOptions dataTest="interaction-more-options">
                <DataElementIdScheme
                    selected={dataElementIdScheme}
                    setSelected={setDataElementIdScheme}
                    dataTest="input-data-element-id-scheme"
                />
                <OrgUnitIdScheme
                    selected={orgUnitIdScheme}
                    setSelected={setOrgUnitIdScheme}
                    dataTest="input-org-unit-id-scheme"
                />
                <IdScheme
                    selected={idScheme}
                    setSelected={setIdScheme}
                    dataTest="input-id-scheme"
                />
                <Switch
                    name="skipExistingCheck"
                    label={i18n.t('Skip exisiting check')}
                    checked={skipExistingCheck}
                    setChecked={setSkipExistingCheck}
                    help={helpText.skipExistingCheck}
                    dataTest="input-skip-exisiting-check"
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

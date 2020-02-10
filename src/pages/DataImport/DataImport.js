import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'

// import s from './DataImport.module.css'
import { dataImportPage as p } from '../../utils/pages'
import { uploadFile } from '../../utils/helper'
import { testIds } from '../../utils/testIds'
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
import { TaskContext, getNewestTask } from '../../contexts/'

const DataImport = ({ query }) => {
    const { data: dataTasks, addTask } = useContext(TaskContext)

    // recreating a previously run job
    let prevJobDetails = undefined
    if (query && query.id) {
        const job = dataTasks[query.id]
        if (job) {
            prevJobDetails = job.jobDetails
        }
    }

    const initialState = {
        file: prevJobDetails ? prevJobDetails.file : undefined,
        format: prevJobDetails ? prevJobDetails.format : defaultFormatOption,
        strategy: prevJobDetails
            ? prevJobDetails.strategy
            : defaultStrategyOption,
        firstRowIsHeader: prevJobDetails
            ? prevJobDetails.firstRowIsHeader
            : false,
        preheatCache: prevJobDetails ? prevJobDetails.preheatCache : false,
        skipAudit: prevJobDetails ? prevJobDetails.skipAudit : false,
        dataElementIdScheme: prevJobDetails
            ? prevJobDetails.dataElementIdScheme
            : defaultDataElementIdSchemeOption,
        orgUnitIdScheme: prevJobDetails
            ? prevJobDetails.orgUnitIdScheme
            : defaultOrgUnitIdSchemeOption,
        idScheme: prevJobDetails
            ? prevJobDetails.idScheme
            : defaultIdSchemeOption,
        skipExistingCheck: prevJobDetails
            ? prevJobDetails.skipExistingCheck
            : false,
    }

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

    const onSubmit = ({ dryRun }) => {
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
            `dryRun=${dryRun}`,
            `strategy=${strategy.value}`,
            `preheatCache=${preheatCache}`,
            `skipAudit=${skipAudit}`,
            `dataElementIdScheme=${dataElementIdScheme.value}`,
            `orgUnitIdScheme=${orgUnitIdScheme.value}`,
            `idScheme=${idScheme.value}`,
            `skipExistingCheck=${skipExistingCheck}`,
            `format=${format.value}`,
            'async=true',
            format.value == 'csv' ? `firstRowIsHeader=${firstRowIsHeader}` : '',
        ].join('&')
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
            title={p.name}
            desc={p.description}
            icon={p.icon}
            loading={progress}
            dataTest={testIds.DataImport.Page}
            summaryTask={getNewestTask(dataTasks)}
            showFullSummaryTask={showFullSummaryTask}
        >
            <FileUpload
                name="upload"
                file={file}
                setFile={setFile}
                dataTest={testIds.DataImport.FileUpload}
            />
            <RadioGroup
                name="format"
                label={i18n.t('Format')}
                options={formatAdxPdfOptions}
                setValue={setFormat}
                checked={format}
                dataTest={testIds.DataImport.format}
            />
            {format.value == 'csv' && (
                <Switch
                    label={i18n.t('First row is header')}
                    name="firstRowIsHeader"
                    checked={firstRowIsHeader}
                    setChecked={setFirstRowIsHeader}
                    dataTest={testIds.DataImport.firstRowIsHeader}
                />
            )}
            <RadioGroup
                name="strategy"
                label={i18n.t('Strategy')}
                options={strategyOptions}
                setValue={setStrategy}
                checked={strategy}
                dataTest={testIds.DataImport.strategy}
            />
            <Switch
                label={i18n.t('Preheat cache')}
                name="preheatCache"
                checked={preheatCache}
                setChecked={setPreheatCache}
                help={helpText.preheatCache}
                dataTest={testIds.DataImport.preheatCache}
            />
            <WithAuthority pred={hasAuthorityToSkipAudit}>
                <Switch
                    label={i18n.t('Skip audit')}
                    name="skipAudit"
                    checked={skipAudit}
                    setChecked={setSkipAudit}
                    help={helpText.skipAudit}
                    dataTest={testIds.DataImport.hasAuthorityToSkipAudit}
                />
            </WithAuthority>
            <MoreOptions dataTest={testIds.DataImport.MoreOptions}>
                <DataElementIdScheme
                    selected={dataElementIdScheme}
                    setSelected={setDataElementIdScheme}
                    dataTest={testIds.DataImport.DataElementIdScheme}
                />
                <OrgUnitIdScheme
                    selected={orgUnitIdScheme}
                    setSelected={setOrgUnitIdScheme}
                    dataTest={testIds.DataImport.OrgUnitIdScheme}
                />
                <IdScheme
                    selected={idScheme}
                    setSelected={setIdScheme}
                    dataTest={testIds.DataImport.IdScheme}
                />
                <Switch
                    name="skipExistingCheck"
                    label={i18n.t('Skip exisiting check')}
                    checked={skipExistingCheck}
                    setChecked={setSkipExistingCheck}
                    help={helpText.skipExistingCheck}
                    dataTest={testIds.DataImport.skipExisitingCheck}
                />
            </MoreOptions>
            <ImportButtonStrip
                onSubmit={onSubmit}
                dryRunDataTest={testIds.DataImport.dryRun}
                importDataTest={testIds.DataImport.submit}
                dataTest={testIds.DataImport.ImportButtonStrip}
            />
            <FormAlerts
                alerts={alerts}
                dataTest={testIds.DataImport.FormAlerts}
            />
        </Page>
    )
}

DataImport.propTypes = {
    query: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }),
}

export { DataImport }

import { useDataEngine } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm, Divider, Button } from '@dhis2/ui'
import arrayMutators from 'final-form-arrays'
import PropTypes from 'prop-types'
import React, { useState, useContext, useRef } from 'react'
import { Page, DataIcon } from '../../components/index.js'
import { FormAlerts, ImportButtonStrip } from '../../components/Inputs/index.js'
import { TaskContext, getNewestTask } from '../../contexts/index.js'
import { AssociatedGeometry } from './components/AssociatedGeometry.js'
import { DataElements } from './components/DataElements.js'
import { DataPreview } from './components/DataPreview.js'
import { EarthEngineId } from './components/EarthEngineId.js'
import { MappingTable } from './components/MapGenderAgeGroupsTable.js'
import { OrganisationUnits } from './components/OrganisationUnits.js'
import { Periods } from './components/Periods.js'
import { Rounding, defaultRoundingOption } from './components/Rounding.js'
import { Tooltip } from './components/Tooltip.js'
import styles from './EarthEngineImportForm.module.css'
import { onImport } from './form-helper.js'
import { getPeriods, getAggregations } from './util/earthEngineHelper.js'
import {
    POPULATION_AGE_GROUPS_DATASET_ID,
    getDefaultAggregation,
} from './util/earthEngines.js'
import {
    ORGANISATION_UNITS,
    ROUNDING,
    DATA_ELEMENT_ID,
    EARTH_ENGINE_ID,
} from './util/formFieldConstants.js'
import { getEarthEngineConfig } from './util/getEarthEngineConfig.js'
import { getStructuredData } from './util/getStructuredData.js'

const { Form, Field, FormSpy } = ReactFinalForm

const Condition = ({ when, is, children }) => (
    <Field name={when} subscription={{ value: true }}>
        {({ input: { value } }) => (value === is ? children : null)}
    </Field>
)

Condition.propTypes = {
    children: PropTypes.node,
    is: PropTypes.string,
    when: PropTypes.string,
}

const EarthEngineImportForm = () => {
    const {
        tasks: { earthengine: earthengineTasks },
        addTask,
    } = useContext(TaskContext)
    const engine = useDataEngine()

    const [progress, setProgress] = useState(false)
    const [showFullSummaryTask, setShowFullSummaryTask] = useState(false)
    const [eeData, setEeData] = useState([])
    const [pointOuRows, setPointOuRows] = useState(null)
    const [fetching, setFetching] = useState(false)
    const [doSubmit, setDoSubmit] = useState(false)
    const [requestFailedMessage, setRequestFailedMessage] = useState(null)

    // for scrolling to the Job summary which is placed at the top
    const hiddenTopElRef = useRef(null)

    const initialValues = {
        [ROUNDING]: defaultRoundingOption,
        [ORGANISATION_UNITS]: [],
        [DATA_ELEMENT_ID]: null,
    }

    const fetchEeData = async ({
        earthEngineId,
        organisationUnits,
        associatedGeometry,
        period,
        rounding,
        bandCocs = [],
    }) => {
        const selectedBandCocs = bandCocs.filter((bc) => !!bc.coc)

        const aggregationType = getDefaultAggregation(earthEngineId)

        setDoSubmit(false)
        setFetching(true)
        setRequestFailedMessage(null)

        try {
            const periods = await getPeriods(earthEngineId, engine)

            const { config, pointOrgUnits } = await getEarthEngineConfig(
                {
                    earthEngineId,
                    organisationUnits,
                    associatedGeometry,
                    period,
                    periods,
                    aggregationType,
                    selectedBandCocs,
                },
                engine
            )

            const data = await getAggregations(engine, config)

            const ouIdNameMap = config.data?.reduce((acc, curr) => {
                acc[curr.id] = curr.properties
                return acc
            }, {})

            const structuredData = getStructuredData({
                data,
                selectedBandCocs,
                ouIdNameMap,
                rounding,
                aggregationType,
            })

            setEeData(structuredData)
            setPointOuRows(pointOrgUnits)
            setFetching(false)
            setDoSubmit(true)
        } catch (error) {
            console.log('Error while fetching Earth Engine data', error)
            setEeData([])
            setFetching(false)
            const message = error.message || error

            let msg = i18n.t(
                'An error occurred while trying to fetch Earth Engine data'
            )

            if (message.includes('Output of image computation is too large')) {
                msg = i18n.t(
                    'The Earth Engine data set is too large. Try reducing the number of groups or organisation units'
                )
            } else if (
                message.includes(
                    'Dimension is present in query without any valid dimension options: `ou`'
                )
            ) {
                msg = i18n.t('The organisation units selection is invalid')
            } else if (message.length) {
                msg = msg.concat(`: ${message}`)
            }
            setRequestFailedMessage(msg)

            return
        }
    }

    const previewIsAllowed = ({ valid, values, modifiedSinceLastSubmit }) => {
        // there should be at least one band for Population Age groups
        const bandsValid =
            values.earthEngineId === POPULATION_AGE_GROUPS_DATASET_ID
                ? !!values.bandCocs?.find((bc) => !!bc.coc)
                : true

        const otherCheck = requestFailedMessage ? modifiedSinceLastSubmit : true

        return valid && bandsValid && otherCheck
    }

    const wrappedSetShowFullSummaryTask = (val) => {
        setShowFullSummaryTask(val)
        hiddenTopElRef?.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const onImportInternal = onImport({
        engine,
        setProgress,
        addTask,
        setShowFullSummaryTask: wrappedSetShowFullSummaryTask,
    })

    const onSubmit = (values) => {
        if (doSubmit) {
            onImportInternal({ eeData, ...values })
        }
    }

    const getAlerts = (submitError) => {
        const internalErrors = []
        if (requestFailedMessage) {
            internalErrors.push({
                id: 'getEeDataFailed',
                message: requestFailedMessage,
                critical: true,
                info: false,
                warning: false,
            })
        }
        return Array.isArray(submitError)
            ? submitError.concat(internalErrors)
            : internalErrors
    }

    return (
        <>
            <div ref={hiddenTopElRef} className={styles.hiddenTopElement}></div>
            <Page
                title={i18n.t('Earth Engine import')}
                desc={i18n.t(
                    'Import WorldPop population data from Google Earth Engine to a DHIS2 data element'
                )}
                icon={<DataIcon />}
                loading={progress}
                dataTest="page-import-earthengine"
                summaryTask={getNewestTask(earthengineTasks)}
                showFullSummaryTask={showFullSummaryTask}
            >
                <Form
                    onSubmit={onSubmit}
                    initialValues={initialValues}
                    keepDirtyOnReinitialize
                    mutators={{
                        ...arrayMutators,
                    }}
                    render={({ handleSubmit, submitError, form }) => {
                        return (
                            <form onSubmit={handleSubmit}>
                                <div className={styles.wrapper}>
                                    <h2 className={styles.sectionHeader}>
                                        {i18n.t('Earth Engine source')}
                                    </h2>
                                    <Divider />
                                    <EarthEngineId />
                                    <Periods />
                                    <Rounding />
                                    <h2 className={styles.sectionHeader}>
                                        {i18n.t('Organisation units')}
                                    </h2>
                                    <Divider />
                                    <OrganisationUnits />
                                    <AssociatedGeometry />
                                    <h2 className={styles.sectionHeader}>
                                        {i18n.t('Import setup')}
                                    </h2>
                                    <Divider />
                                    <DataElements />
                                    <Condition
                                        when={EARTH_ENGINE_ID}
                                        is={POPULATION_AGE_GROUPS_DATASET_ID}
                                    >
                                        <MappingTable />
                                    </Condition>
                                    <FormSpy
                                        subscription={{
                                            values: true,
                                            valid: true,
                                            modifiedSinceLastSubmit: true,
                                        }}
                                    >
                                        {({
                                            valid,
                                            values,
                                            modifiedSinceLastSubmit,
                                        }) => (
                                            <Tooltip
                                                disabled={!valid}
                                                content={i18n.t(
                                                    'Some required fields are missing'
                                                )}
                                            >
                                                <Button
                                                    className={
                                                        styles.buttonWrapper
                                                    }
                                                    primary
                                                    type="submit"
                                                    disabled={
                                                        !previewIsAllowed({
                                                            valid,
                                                            values,
                                                            modifiedSinceLastSubmit,
                                                        })
                                                    }
                                                    onClick={() =>
                                                        fetchEeData(values)
                                                    }
                                                >
                                                    {i18n.t(
                                                        'Preview before import'
                                                    )}
                                                </Button>
                                            </Tooltip>
                                        )}
                                    </FormSpy>
                                    <FormSpy
                                        subscription={{
                                            modifiedSinceLastSubmit: true,
                                        }}
                                    >
                                        {({ modifiedSinceLastSubmit }) =>
                                            !modifiedSinceLastSubmit ? (
                                                <DataPreview
                                                    fetching={fetching}
                                                    eeData={eeData}
                                                    pointOuRows={pointOuRows}
                                                />
                                            ) : null
                                        }
                                    </FormSpy>
                                    <FormSpy
                                        subscription={{
                                            modifiedSinceLastSubmit: true,
                                        }}
                                    >
                                        {({ modifiedSinceLastSubmit }) =>
                                            !modifiedSinceLastSubmit &&
                                            !fetching &&
                                            eeData?.length ? (
                                                <div
                                                    className={
                                                        styles.buttonWrapper
                                                    }
                                                >
                                                    <ImportButtonStrip
                                                        form={form}
                                                    />
                                                </div>
                                            ) : null
                                        }
                                    </FormSpy>
                                    <FormAlerts
                                        alerts={getAlerts(submitError)}
                                    />
                                </div>
                            </form>
                        )
                    }}
                ></Form>
            </Page>
        </>
    )
}

export { EarthEngineImportForm }

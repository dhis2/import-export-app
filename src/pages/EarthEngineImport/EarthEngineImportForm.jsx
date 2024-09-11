import { useDataEngine } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm, Divider, Button } from '@dhis2/ui'
import arrayMutators from 'final-form-arrays'
import React, { useState, useContext, useRef } from 'react'
import { Page, DataIcon, Tooltip } from '../../components/index.js'
import { FormAlerts, ImportButtonStrip } from '../../components/Inputs/index.js'
import { TaskContext, getNewestTask } from '../../contexts/index.js'
import { AssociatedGeometry } from './components/AssociatedGeometry.jsx'
import { BandCocMappingTable } from './components/BandCocMappingTable.jsx'
import { DataElements } from './components/DataElements.jsx'
import { DataPreview } from './components/DataPreview.jsx'
import { EarthEngineId } from './components/EarthEngineId.jsx'
import { OrganisationUnits } from './components/OrganisationUnits.jsx'
import { Periods } from './components/Periods.jsx'
import { Rounding, defaultRoundingOption } from './components/Rounding.jsx'
import { useEeData } from './components/useEeData.js'
import styles from './EarthEngineImportForm.module.css'
import { onImport } from './form-helper.js'
import { getEarthEngineBands } from './util/earthEngines.js'
import {
    ORGANISATION_UNITS,
    ROUNDING,
    DATA_ELEMENT_ID,
    EARTH_ENGINE_ID,
} from './util/formFieldConstants.js'

const { Form, FormSpy } = ReactFinalForm

const EarthEngineImportForm = () => {
    const {
        tasks: { earthengine: earthengineTasks },
        addTask,
    } = useContext(TaskContext)
    const engine = useDataEngine()

    const [progress, setProgress] = useState(false)
    const [showFullSummaryTask, setShowFullSummaryTask] = useState(false)

    const { eeData, pointOuRows, loading, errorMessage, fetchEeData } =
        useEeData()

    // for scrolling to the Job summary which is placed at the top
    const hiddenTopElRef = useRef(null)

    const initialValues = {
        [ROUNDING]: defaultRoundingOption,
        [ORGANISATION_UNITS]: [],
        [DATA_ELEMENT_ID]: null,
    }

    const mappingTableShouldDisplay = ({ values }) =>
        values &&
        getEarthEngineBands(values[EARTH_ENGINE_ID]).length &&
        values[DATA_ELEMENT_ID]

    const previewIsAllowed = ({ valid, values, modifiedSinceLastSubmit }) => {
        // no preview until there are some valid bands
        const bandsValid = getEarthEngineBands(values[EARTH_ENGINE_ID]).length
            ? !!values.bandCocs?.find((bc) => !!bc.coc)
            : true

        const modified = errorMessage ? modifiedSinceLastSubmit : true

        return valid && bandsValid && modified
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
        if (!loading && !errorMessage) {
            onImportInternal({ eeData, ...values })
        }
    }

    const getAlerts = (submitError) => {
        const internalErrors = []
        if (errorMessage) {
            internalErrors.push({
                id: 'getEeDataFailed',
                message: errorMessage,
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
                    'Import high resolution population data from WorldPop using Google Earth Engine.'
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

                                    <FormSpy
                                        subscription={{
                                            values: true,
                                        }}
                                    >
                                        {({ values }) =>
                                            mappingTableShouldDisplay({
                                                values,
                                            }) ? (
                                                <BandCocMappingTable />
                                            ) : null
                                        }
                                    </FormSpy>
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
                                        }) => {
                                            return !modifiedSinceLastSubmit &&
                                                !loading &&
                                                eeData?.length ? (
                                                <>
                                                    <h2
                                                        className={
                                                            styles.sectionHeader
                                                        }
                                                    >
                                                        {i18n.t('Data preview')}
                                                    </h2>
                                                    <Divider />
                                                </>
                                            ) : (
                                                <Tooltip
                                                    disabled={!valid}
                                                    content={i18n.t(
                                                        'Some required fields are missing'
                                                    )}
                                                >
                                                    <Button
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
                                            )
                                        }}
                                    </FormSpy>
                                    <FormSpy
                                        subscription={{
                                            modifiedSinceLastSubmit: true,
                                        }}
                                    >
                                        {({ modifiedSinceLastSubmit }) => (
                                            <DataPreview
                                                modifiedSinceLastSubmit={
                                                    modifiedSinceLastSubmit
                                                }
                                                loading={loading}
                                                eeData={eeData}
                                                pointOuRows={pointOuRows}
                                            />
                                        )}
                                    </FormSpy>
                                    <FormSpy
                                        subscription={{
                                            modifiedSinceLastSubmit: true,
                                        }}
                                    >
                                        {({ modifiedSinceLastSubmit }) =>
                                            !modifiedSinceLastSubmit &&
                                            !loading &&
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

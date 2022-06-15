import { useDataEngine, useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import {
    ReactFinalForm,
    Button,
    Divider,
    // NoticeBox,
} from '@dhis2/ui'
import cx from 'classnames'
import React, { useState } from 'react'
import { Page } from '../../../components/index'
import { useCachedDataQuery } from '../util/CachedQueryProvider.js'
// import { getAggregations } from '../util/earthEngineHelper'
// import getEarthEngineConfig from '../util/earthEngineLoader'
// import { POPULATION_AGE_GROUPS_DATASET_ID } from '../util/earthEngines'
// import { postDataWithFetch } from '../util/postData'
import { AggregationType } from './AggregationType'
import { Tooltip } from './ButtonTooltip.js'
import { DataElements } from './DataElements'
import { DataPreview } from './DataPreview'
import { DataSets } from './DataSets'
import { EarthEngineId } from './EarthEngineId'
// import { MappingTable } from './MapGenderAgeGroupsTable'
import { OrganisationUnits } from './OrganisationUnits'
import { Periods } from './Periods'
import { Rounding, defaultRoundingOption } from './Rounding'
import styles from './styles/EarthEngineImportForm.module.css'

const { Form } = ReactFinalForm

const EarthEngineImportForm = () => {
    const engine = useDataEngine()
    const { baseUrl } = useConfig()
    const { userSettings, dataSets } = useCachedDataQuery()

    // resulting data and display options
    const [eeData, setEeData] = useState(null)
    const [showPreview, setShowPreview] = useState(false)

    const eeDatasetChanged = async ({ selected }) => {
        setPeriod(NO_VALUE)
        setAggregation(NO_VALUE)
        // setEeId(selected)
    }

    const showData = async () => {
        console.log('showData')
        // setShowPreview(true)
        // const data = {
        //     id: eeId,
        //     rows: orgUnits,
        //     filter: periods.filter(p => period === p.name),
        //     aggregationType: [aggregation],
        // }
        // const config = await getEarthEngineConfig(
        //     data,
        //     engine,
        //     userSettings.keyAnalysisDisplayProperty
        // )

        // getAggregations(engine, config)
        //     .then(aggregations => {
        //         setEeData(JSON.stringify(aggregations))
        //     })
        //     .catch(e => {
        //         // TODO handle the error in a better way
        //         console.log('something went wrong', e)
        //     })
    }

    const isMissingRequiredInputs = () => {
        return true
        // return !eeId || !period || !orgUnits || !aggregation || !dataElement
    }

    const clearEeData = () => {
        console.log('clearEeData')
        setShowPreview(false)
        setEeData(null)
        window.scrollTo(0, 0)
    }

    // const importData = () => console.log('clicked to import data')
    const importData = async () => {
        console.log('importData')
        // const eeOptions = {
        //     id: eeId,
        //     rows: orgUnits,
        //     filter: periods.filter(p => period === p.name),
        //     aggregationType: [aggregation],
        // }

        // if (eeId === POPULATION_AGE_GROUPS_DATASET_ID) {
        //     eeOptions.band = ['M_0', 'F_0']
        // }
        // const config = await getEarthEngineConfig(
        //     eeOptions,
        //     engine,
        //     userSettings.keyAnalysisDisplayProperty
        // )

        // const data = await getAggregations(engine, config)
        // setEeData(JSON.stringify(data))

        // postDataWithFetch({
        //     baseUrl,
        //     data,
        //     dataElement: dataElement,
        //     period,
        //     valueType: aggregation,
        //     precision: rounding,
        // })
    }

    const initialValues = {
        rounding: defaultRoundingOption,
        organisationUnits: [],
        dataSets: null,
        dataElements: null,
    }

    const onSubmit = () => console.log('submit')

    return (
        <Page
            title={i18n.t('Earth Engine import')}
            desc={i18n.t(
                'Import Earth Engine data to data sets and data elements'
            )}
            // icon={PAGE_ICON}
            // loading={progress}
            dataTest="page-import-earthengine"
            // summaryTask={getNewestTask(dataTasks)}
            // showFullSummaryTask={showFullSummaryTask}
        >
            <Form
                onSubmit={onSubmit}
                initialValues={initialValues}
                render={({ handleSubmit, form, submitError }) => (
                    <form onSubmit={handleSubmit}>
                        <div className={styles.container}>
                            <h2>{i18n.t('Earth Engine source')}</h2>
                            <Divider />
                            <EarthEngineId />
                            <Periods form={form} />
                            <Rounding />
                            <h2>{i18n.t('Organisation units')}</h2>
                            <Divider />
                            <OrganisationUnits />
                            <h2>{i18n.t('Import setup')}</h2>
                            <Divider />
                            <AggregationType />
                            <div className={cx(styles.set)}>
                                <DataSets />
                                <DataElements />
                            </div>

                            {/* <div className={styles.row}>
                                {eeId === POPULATION_AGE_GROUPS_DATASET_ID && (
                                    <>
                                        <NoticeBox
                                            title={i18n.t(
                                                'Import bands to category option combinations'
                                            )}
                                        >
                                            {i18n.t(
                                                'Earth Engine data set "Population age groups" has disaggregation bands. Choose the category option combinations to import each band into.'
                                            )}
                                        </NoticeBox>
                                        <MappingTable eeId={eeId} />
                                    </>
                                )}
                            </div> */}

                            <Divider />

                            {eeData && showPreview && (
                                <div className={styles.row}>
                                    <DataPreview
                                        dataSet={dataSets[dataSet]}
                                        orgUnits={orgUnits}
                                        period={period}
                                        valueType={aggregation}
                                        dataElement={dataSets[
                                            dataSet
                                        ].dataElements.find(
                                            ({ id }) => id === dataElement
                                        )}
                                        data={eeData}
                                        precision={rounding}
                                    />
                                </div>
                            )}

                            <div className={styles.row}>
                                {!showPreview || !eeData ? (
                                    <>
                                        <Tooltip
                                            content={i18n.t(
                                                "Some required options haven't been selected"
                                            )}
                                            disabled={isMissingRequiredInputs()}
                                        >
                                            <Button
                                                primary
                                                name="preview"
                                                onClick={showData}
                                                value="default"
                                                className={styles.leftButton}
                                                disabled={isMissingRequiredInputs()}
                                            >
                                                {i18n.t(
                                                    'Preview import summary'
                                                )}
                                            </Button>
                                        </Tooltip>
                                        <Tooltip
                                            content={i18n.t(
                                                "Some required options haven't been selected"
                                            )}
                                            disabled={isMissingRequiredInputs()}
                                        >
                                            <Button
                                                name="import"
                                                onClick={importData}
                                                value="default"
                                                disabled={isMissingRequiredInputs()}
                                            >
                                                {i18n.t(
                                                    'Import without previewing'
                                                )}
                                            </Button>
                                        </Tooltip>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            primary
                                            name="import"
                                            onClick={importData}
                                            value="default"
                                            className={styles.leftButton}
                                        >
                                            {i18n.t('Import')}
                                        </Button>
                                        <Button
                                            name="make-changes"
                                            onClick={clearEeData}
                                            value="default"
                                        >
                                            {i18n.t(
                                                'Make changes to selections'
                                            )}
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                        {/* <ImportButtonStrip form={form} /> */}
                        {/* <FormAlerts alerts={submitError} /> */}
                    </form>
                )}
            ></Form>
        </Page>
    )
}

export { EarthEngineImportForm }

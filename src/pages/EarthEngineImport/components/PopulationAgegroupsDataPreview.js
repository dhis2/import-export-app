import { useConfig, useDataEngine } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import {
    Table,
    TableHead,
    TableRowHead,
    TableCellHead,
    TableBody,
    TableRow,
    TableCell,
    ReactFinalForm,
} from '@dhis2/ui'
import React, { useState, useEffect } from 'react'
import { fetchCurrentValues } from '../api/fetchCurrentValues.js'
import { useCachedDataQuery } from '../util/CachedQueryProvider.js'
import { getPrecisionFn } from './Rounding'
import styles from './styles/DataPreview.module.css'
import { getAggregations } from '../util/earthEngineHelper'
import getEarthEngineConfig from '../util/earthEngineLoader'
import { usePeriods } from './usePeriods.js'
import { ALL_AGGREGATION_TYPES } from './AggregationType.js'

const { useField } = ReactFinalForm

const PopulationAgegroupsDataPreview = () => {
    const { input: earthEngineIdInput } = useField('earthEngineId')
    const { value: eeId } = earthEngineIdInput
    const { input: orgUnitInput } = useField('organisationUnits')
    const { value: orgUnits } = orgUnitInput
    const { input: roundingInput } = useField('rounding')
    const { value: precision } = roundingInput
    const { input: dataElementInput } = useField('dataElement')
    const { value: dataElementId } = dataElementInput
    const { input: periodInput } = useField('period')
    const { value: period } = periodInput
    const { input: aggTypeInput } = useField('aggregationType')
    const { value: aggregationType } = aggTypeInput
    const { input: m0Input } = useField('M_0')
    const { value: cocM0 } = m0Input
    const { input: m1Input } = useField('M_1')
    const { value: cocM1 } = m1Input
    const { input: m5Input } = useField('M_5')
    const { value: cocM5 } = m5Input
    const { input: f0Input } = useField('F_0')
    const { value: cocF0 } = f0Input
    const { input: f1Input } = useField('F_1')
    const { value: cocF1 } = f1Input
    const { input: f5Input } = useField('F_5')
    const { value: cocF5 } = f5Input
    const { input: degInput } = useField('dataElementGroup')
    const { value: dataElementGroupId } = degInput

    const [eeData, setEeData] = useState(null)
    const [tableData, setTableData] = useState([])
    const { baseUrl } = useConfig()
    const { periods } = usePeriods(eeId, Function.prototype)
    const { userSettings, dataElements } = useCachedDataQuery()
    const engine = useDataEngine()

    const getValueWithPrecision = getPrecisionFn(precision)

    const bandMap = {
        M_0: cocM0,
        M_1: cocM1,
        M_5: cocM5,
        F_0: cocF0,
        F_1: cocF1,
        F_5: cocF5,
    }

    useEffect(() => {
        const fetchEeAggregations = async () => {
            const eeOptions = {
                id: eeId,
                rows: orgUnits,
                filter: periods.filter((p) => period === p.name),
                aggregationType: [aggregationType],
                band: Object.keys(bandMap),
            }

            const config = await getEarthEngineConfig(
                eeOptions,
                engine,
                userSettings.keyAnalysisDisplayProperty
            )

            const data = await getAggregations(engine, config)
            const structuredData = Object.entries(data).reduce((acc, curr) => {
                const [ouId, valueSet] = curr
                Object.entries(valueSet).forEach(([bandId, rawValue]) => {
                    if (!ALL_AGGREGATION_TYPES.includes(bandId)) {
                        acc.push({
                            ouId,
                            bandId,
                            value: getValueWithPrecision(rawValue),
                        })
                    }
                })

                return acc
            }, [])

            console.log('structuredData', structuredData)
            setEeData(structuredData)
        }

        if (
            eeId &&
            period &&
            orgUnits &&
            aggregationType &&
            precision &&
            dataElementId
        ) {
            fetchEeAggregations()
        }
    }, [eeId, period, orgUnits, aggregationType, precision, dataElementId])

    useEffect(() => {
        const fetchCurrVals = async (url, newEEData) => {
            const { dataValues } = await fetchCurrentValues(url)
            const currentValues = dataValues.filter(
                (v) => v.dataElement === dataElementId
            )
            const newArr = newEEData.map(({ ouId, ouName, bandId, value }) => {
                const cocId = bandMap[bandId]

                const current = currentValues
                    .filter((v) => v.orgUnit === ouId)
                    .find((v) => v.categoryOptionCombo === cocId)

                // find the name of the cat option combo from dataElements
                const cocs = dataElements.find(({ id }) => id === dataElementId)
                    .categoryCombo.categoryOptionCombos

                const categoryOptionCombo = cocs.find(
                    (coc) => coc.id === cocId
                )?.name

                return {
                    ouId,
                    ouName,
                    categoryOptionCombo,
                    value,
                    current: current?.value,
                }
            })

            setTableData(newArr)
        }

        if (
            eeData &&
            orgUnits &&
            period &&
            dataElementId &&
            dataElementGroupId &&
            cocM0 &&
            cocM1 &&
            cocM5 &&
            cocF0 &&
            cocF1 &&
            cocF5
        ) {
            const normalizedData = eeData.map(({ ouId, bandId, value }) => {
                //TODO handle missing name better, or does it need handling at all?
                const ouName =
                    orgUnits.find((ou) => ou.id === ouId)?.name || 'no-name OU'
                return { ouId, ouName, bandId, value }
            })

            const ouQueryParams = normalizedData
                .map(({ ouId }) => `orgUnit=${ouId}`)
                .join('&')

            fetchCurrVals(
                `${baseUrl}/api/dataValueSets?dataElementGroup=${dataElementGroupId}&period=${period}&${ouQueryParams}`,
                normalizedData
            )
        }
    }, [
        dataElementId,
        dataElementGroupId,
        period,
        eeData,
        orgUnits,
        cocM0,
        cocM1,
        cocM5,
        cocF0,
        cocF1,
        cocF5,
    ])

    if (!tableData.length) {
        return null
    }

    return (
        <Table dense className={styles.table}>
            <TableHead>
                <TableRowHead>
                    <TableCellHead dense>{i18n.t('Org Unit')}</TableCellHead>
                    <TableCellHead dense>
                        {i18n.t('Category option combo')}
                    </TableCellHead>
                    <TableCellHead dense className={styles.right}>
                        {i18n.t('Current value')}
                    </TableCellHead>
                    <TableCellHead dense className={styles.right}>
                        {i18n.t('New value')}
                    </TableCellHead>
                </TableRowHead>
            </TableHead>
            <TableBody>
                {tableData.map(
                    (
                        { ouId, ouName, categoryOptionCombo, value, current },
                        i
                    ) => {
                        return (
                            <TableRow key={`${ouId}-${i}`}>
                                <TableCell dense>{ouName}</TableCell>
                                <TableCell dense>
                                    {categoryOptionCombo}
                                </TableCell>
                                <TableCell dense className={styles.current}>
                                    {current || ''}
                                </TableCell>
                                <TableCell dense className={styles.right}>
                                    {getValueWithPrecision(value)}
                                </TableCell>
                            </TableRow>
                        )
                    }
                )}
            </TableBody>
        </Table>
    )
}

export { PopulationAgegroupsDataPreview }

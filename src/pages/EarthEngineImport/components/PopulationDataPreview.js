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
import { getAggregations } from '../util/earthEngineHelper'
import getEarthEngineConfig from '../util/earthEngineLoader'
import { getPrecisionFn } from './Rounding'
import styles from './styles/DataPreview.module.css'
import { usePeriods } from './usePeriods.js'

const { useField } = ReactFinalForm

const PopulationDataPreview = () => {
    const { input: earthEngineIdInput } = useField('earthEngineId')
    const { value: earthEngineId } = earthEngineIdInput
    const { input: orgUnitInput } = useField('organisationUnits')
    const { value: orgUnits } = orgUnitInput
    const { input: roundingInput } = useField('rounding')
    const { value: precision } = roundingInput
    const { input: dataElementsInput } = useField('dataElements')
    const { value: dataElement } = dataElementsInput
    const { input: periodInput } = useField('period')
    const { value: period } = periodInput
    const { input: aggTypeInput } = useField('aggregationType')
    const { value: aggregationType } = aggTypeInput
    // data: PropTypes.string,

    const [eeData, setEeData] = useState(null)
    const [formattedData, setFormattedData] = useState([])
    const { baseUrl } = useConfig()
    const { periods } = usePeriods(earthEngineId, Function.prototype)
    const { userSettings } = useCachedDataQuery()

    const engine = useDataEngine()

    const getValueWithPrecision = getPrecisionFn(precision)

    useEffect(() => {
        const fetchEeAggregations = async () => {
            // fetch the ee data and display it.
            const eeOptions = {
                id: earthEngineId,
                rows: orgUnits,
                filter: periods.filter(p => period === p.name),
                aggregationType: [aggregationType],
            }

            const config = await getEarthEngineConfig(
                eeOptions,
                engine,
                userSettings.keyAnalysisDisplayProperty
            )

            const data = await getAggregations(engine, config)
            setEeData(data)
        }
        if (
            earthEngineId &&
            period &&
            orgUnits &&
            aggregationType &&
            precision &&
            dataElement
        ) {
            fetchEeAggregations()
        }
    }, [
        earthEngineId,
        period,
        orgUnits,
        aggregationType,
        precision,
        dataElement,
    ])

    useEffect(() => {
        const fetchCurrVals = async (url, normalizedData) => {
            const { dataValues } = await fetchCurrentValues(url)
            const newArr = normalizedData.map(ou => {
                const val = dataValues.find(v => v.orgUnit === ou.ouId)

                return val ? { ...ou, current: val.value } : ou
            })

            setFormattedData(newArr)
        }

        if (eeData && orgUnits && period && dataElement) {
            // const normalizedData = Object.entries(JSON.parse(eeData)).map(
            const normalizedData = Object.entries(eeData).map(
                ([ouId, valueSet]) => {
                    //TODO handle missing name better, or does it need handling at all?
                    const ouName =
                        orgUnits.find(ou => ou.id === ouId)?.name ||
                        'no-name OU'
                    return { ouId, ouName, value: valueSet[aggregationType] }
                }
            )

            const dataElementGroupId = 'sP7jTt3YGBb'

            const ouQueryParams = normalizedData
                .map(({ ouId }) => `orgUnit=${ouId}`)
                .join('&')

            // console.log('period', period, periods)
            fetchCurrVals(
                `${baseUrl}/api/dataValueSets?dataElementGroup=${dataElementGroupId}&period=${period}&${ouQueryParams}`,
                normalizedData
            )
        }
    }, [dataElement, period, eeData, orgUnits])

    if (!formattedData.length) {
        return null
    }

    return (
        <Table dense className={styles.table}>
            <TableHead>
                <TableRowHead>
                    <TableCellHead dense>{i18n.t('Org Unit')}</TableCellHead>
                    <TableCellHead dense className={styles.right}>
                        {i18n.t('Current value')}
                    </TableCellHead>
                    <TableCellHead dense className={styles.right}>
                        {i18n.t('New value')}
                    </TableCellHead>
                </TableRowHead>
            </TableHead>
            <TableBody>
                {formattedData.map(({ ouId, ouName, value, current }) => {
                    const val = getValueWithPrecision(value)

                    return (
                        <TableRow key={ouId}>
                            <TableCell dense>{ouName}</TableCell>
                            <TableCell dense className={styles.current}>
                                {current !== undefined ? current : ''}
                            </TableCell>
                            <TableCell dense className={styles.right}>
                                {val}
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}

export { PopulationDataPreview }

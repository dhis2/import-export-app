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
import { useFetchAggregations } from './useFetchAggregations.js'
import { useCatOptComboSelections } from './useCatOptComboSelections.js'
import { getPrecisionFn } from './Rounding'
import styles from './styles/DataPreview.module.css'

const { useField } = ReactFinalForm

const PopulationAgegroupsDataPreview = () => {
    const { input: orgUnitInput } = useField('organisationUnits')
    const { value: orgUnits } = orgUnitInput
    const { input: roundingInput } = useField('rounding')
    const { value: precision } = roundingInput
    const { input: dataElementInput } = useField('dataElement')
    const { value: dataElementId } = dataElementInput
    const { input: periodInput } = useField('period')
    const { value: period } = periodInput
    const { input: degInput } = useField('dataElementGroup')
    const { value: dataElementGroupId } = degInput

    const [tableData, setTableData] = useState([])
    const { baseUrl } = useConfig()
    const { dataElements } = useCachedDataQuery()

    const { eeData } = useFetchAggregations()
    const { bandMap, allBandsSelected } = useCatOptComboSelections()

    const getValueWithPrecision = getPrecisionFn(precision)

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
            allBandsSelected
        ) {
            const normalizedData = eeData.map(({ ouId, bandId, value }) => {
                const ouName = orgUnits.find((ou) => ou.id === ouId)?.name
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
        allBandsSelected,
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

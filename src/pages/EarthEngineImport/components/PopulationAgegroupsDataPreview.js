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
import { useCachedDataQuery } from '../util/CachedQueryProvider.js'
import { getPrecisionFn } from './Rounding.js'
import styles from './styles/DataPreview.module.css'
import { useCatOptComboSelections } from './useCatOptComboSelections.js'
import { useFetchAggregations } from './useFetchAggregations.js'
import { useFetchCurrentValues } from './useFetchCurrentValues.js'

const { useField } = ReactFinalForm

const PopulationAgegroupsDataPreview = () => {
    const { input: roundingInput } = useField('rounding')
    const { value: precision } = roundingInput
    const { input: dataElementInput } = useField('dataElement')
    const { value: dataElementId } = dataElementInput

    const [tableData, setTableData] = useState([])
    const { dataElements } = useCachedDataQuery()

    const { eeData } = useFetchAggregations()
    const { bandMap, allBandsSelected } = useCatOptComboSelections()
    const { currentValues } = useFetchCurrentValues(eeData)

    const getValueWithPrecision = getPrecisionFn(precision)

    useEffect(() => {
        if (currentValues && eeData) {
            const newArr = eeData.map(({ ouId, ouName, bandId, value }) => {
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
    }, [currentValues, eeData])

    if (!tableData.length || !allBandsSelected) {
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

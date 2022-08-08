import i18n from '@dhis2/d2-i18n'
import {
    Table,
    TableHead,
    TableRowHead,
    TableCellHead,
    TableBody,
    TableRow,
    TableCell,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { useCachedDataQuery } from '../util/CachedQueryProvider.js'
import styles from './styles/DataPreview.module.css'
import { useCatOptComboSelections } from './useCatOptComboSelections.js'
import { useFetchCurrentValues } from './useFetchCurrentValues.js'

const PopulationAgegroupsDataPreview = (props) => {
    const { dataElementId, eeData } = props
    const [tableData, setTableData] = useState([])
    const { dataElements } = useCachedDataQuery()
    const { bandMap } = useCatOptComboSelections()
    const { currentValues } = useFetchCurrentValues()

    useEffect(() => {
        if (currentValues && eeData) {
            const newArr = eeData.map(({ ouId, ouName, bandId, value }) => {
                const cocId = bandMap[bandId]

                const current = currentValues
                    .filter((v) => v.orgUnit === ouId)
                    .find((v) => v.categoryOptionCombo === cocId)

                // find the name of the cat option combo from dataElements
                const cocs =
                    dataElements.find(({ id }) => id === dataElementId)
                        .categoryCombo?.categoryOptionCombos || []

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
    }, [currentValues, eeData, dataElementId])

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
                                    {value}
                                </TableCell>
                            </TableRow>
                        )
                    }
                )}
            </TableBody>
        </Table>
    )
}

PopulationAgegroupsDataPreview.propTypes = {
    dataElementId: PropTypes.string,
    eeData: PropTypes.array,
}

export { PopulationAgegroupsDataPreview }

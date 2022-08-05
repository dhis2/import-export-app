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
import styles from './styles/DataPreview.module.css'
import { useFetchCurrentValues } from './useFetchCurrentValues.js'

const PopulationDataPreview = ({ eeData }) => {
    const [tableData, setTableData] = useState([])
    const { currentValues } = useFetchCurrentValues(eeData)

    useEffect(() => {
        if (currentValues && eeData) {
            const newArr = eeData.map(({ ouId, ouName, value }) => {
                const current = currentValues.find((v) => v.orgUnit === ouId)

                return { ouId, ouName, value, current: current?.value }
            })

            setTableData(newArr)
        }
    }, [currentValues, eeData])

    if (!tableData.length) {
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
                {tableData.map(({ ouId, ouName, value, current }) => {
                    return (
                        <TableRow key={ouId}>
                            <TableCell dense>{ouName}</TableCell>
                            <TableCell dense className={styles.current}>
                                {current || ''}
                            </TableCell>
                            <TableCell dense className={styles.right}>
                                {value}
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}

PopulationDataPreview.propTypes = {
    eeData: PropTypes.array,
}

export { PopulationDataPreview }

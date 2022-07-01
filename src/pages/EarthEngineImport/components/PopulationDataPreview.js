import { useConfig } from '@dhis2/app-runtime'
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
import styles from './styles/DataPreview.module.css'
import { useFetchAggregations } from './useFetchAggregations.js'

const { useField } = ReactFinalForm

const PopulationDataPreview = () => {
    const { input: periodInput } = useField('period')
    const { value: period } = periodInput
    const { input: orgUnitInput } = useField('organisationUnits')
    const { value: orgUnits } = orgUnitInput
    const { input: dataElementInput } = useField('dataElement')
    const { value: dataElementId } = dataElementInput
    const { input: dataElementGroupInput } = useField('dataElementGroup')
    const { value: dataElementGroupId } = dataElementGroupInput
    const { eeData } = useFetchAggregations()
    const [tableData, setTableData] = useState([])
    const { baseUrl } = useConfig()

    useEffect(() => {
        const fetchCurrVals = async (url) => {
            const { dataValues } = await fetchCurrentValues(url)
            const currentValues = dataValues.filter(
                (v) => v.dataElement === dataElementId
            )
            const newArr = eeData.map(({ ouId, ouName, value }) => {
                const current = currentValues.find((v) => v.orgUnit === ouId)

                return { ouId, ouName, value, current: current?.value }
            })

            setTableData(newArr)
        }

        if (
            eeData &&
            orgUnits &&
            period &&
            dataElementId &&
            dataElementGroupId
        ) {
            const ouQueryParams = eeData
                .map(({ ouId }) => `orgUnit=${ouId}`)
                .join('&')

            fetchCurrVals(
                `${baseUrl}/api/dataValueSets?dataElementGroup=${dataElementGroupId}&period=${period}&${ouQueryParams}`
            )
        }
    }, [dataElementId, dataElementGroupId, period, eeData, orgUnits])

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

export { PopulationDataPreview }

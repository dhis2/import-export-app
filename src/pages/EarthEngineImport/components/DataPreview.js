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
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { fetchCurrentValues } from '../api/fetchCurrentValues.js'
import { getPrecisionFn } from './Rounding'
import styles from './styles/DataPreview.module.css'

const DataPreview = ({
    dataSet,
    orgUnits,
    period,
    valueType,
    dataElement,
    data,
    precision,
}) => {
    const [formattedData, setFormattedData] = useState([])
    const { baseUrl } = useConfig()

    const getValueWithPrecision = getPrecisionFn(precision)

    useEffect(() => {
        const fetchCurrVals = async (url, normalizedData) => {
            const { dataValues } = await fetchCurrentValues(url)
            const newArr = normalizedData.map(ou => {
                const val = dataValues.find(v => v.orgUnit === ou.ouId)

                return val ? { ...ou, current: val.value } : ou
            })

            setFormattedData(newArr)
        }

        const normalizedData = Object.entries(JSON.parse(data)).map(
            ([ouId, valueSet]) => {
                //TODO handle missing name better, or does it need handling at all?
                const ouName =
                    orgUnits.find(ou => ou.id === ouId)?.name || 'no-name OU'
                return { ouId, ouName, value: valueSet[valueType] }
            }
        )

        const ouQueryParams = normalizedData
            .map(({ ouId }) => `orgUnit=${ouId}`)
            .join('&')

        fetchCurrVals(
            `${baseUrl}/api/dataValueSets?dataSet=${dataSet.id}&period=${period}&${ouQueryParams}`,
            normalizedData
        )
    }, [dataSet, dataElement, period, data])

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

DataPreview.propTypes = {
    dataElement: PropTypes.object.isRequired,
    dataSet: PropTypes.object.isRequired,
    orgUnits: PropTypes.array.isRequired,
    period: PropTypes.string.isRequired,
    valueType: PropTypes.string.isRequired,
    data: PropTypes.string,
    precision: PropTypes.number,
}

export default DataPreview

export { DataPreview }

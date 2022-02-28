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
import styles from './styles/DataPreview.module.css'
import { numberPrecision, getPropName } from './util'

const fetchCurrentValues = async url => {
    console.log('url', url)
    const fetcher = url =>
        fetch(url, { credentials: 'include' })
            .then(resp => {
                if (resp.status >= 200 && resp.status < 300) {
                    return Promise.resolve(resp.json())
                } else {
                    throw resp
                }
            })
            .catch(resp => {
                const error = new Error(resp.statusText || resp.status)
                console.error(`fetchCurrentValues error: `, error)
                return Promise.reject(error)
            })

    return await fetcher(url).catch(error => Promise.reject(error))
}

const DataPreview = ({
    dataSet,
    orgUnits,
    period,
    valueType,
    dataElement,
    data,
    precision,
    // name,
}) => {
    const valueFormat = numberPrecision(precision)
    const [formattedData, setFormattedData] = useState([])
    const { baseUrl } = useConfig()

    useEffect(() => {
        const fetchCurrVals = async (url, parsedData) => {
            const { dataValues } = await fetchCurrentValues(url)
            const newArr = parsedData.map(d => {
                const val = dataValues.find(v => v.orgUnit === d.ouId)

                return val ? { ...d, current: val.value } : d
            })

            setFormattedData(newArr)
        }

        const parsedData = Object.entries(JSON.parse(data)).map(entry => {
            const ouId = entry[0]
            const ouName = orgUnits.find(ou => ou.id === ouId).name
            return { ouId, ouName, value: entry[1][valueType] }
        })

        const ous = parsedData.map(({ ouId }) => `orgUnit=${ouId}`).join('&')

        fetchCurrVals(
            `${baseUrl}/api/dataValueSets?dataSet=${dataSet.id}&period=${period}&${ous}`,
            parsedData
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
                    // const propName = getPropName(valueType, name)
                    // const value = valueFormat(properties[propName])
                    const val = valueFormat(value)

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
    // name: PropTypes.string,
    precision: PropTypes.number,
}

DataPreview.defaultValues = {
    precision: 1,
    name: '',
}

export default DataPreview

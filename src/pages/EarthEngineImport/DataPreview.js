import { useDataEngine } from '@dhis2/app-runtime'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
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
// import { numberPrecision, getPropName } from '.util'
import styles from './styles/DataPreview.module.css'

const getDataValueSetsQuery = (dataSetId, period, ous) => ({
    resource: 'dataValueSets',
    params: {
        dataSet: dataSetId,
        period: period,
        orgUnit: ous,
    },
})

// const ous = data.map(({ id }) => `orgUnit=${id}`).join('&')
// const url = `/dataValueSets?dataSet=${dataSet.id}&period=${period}&${ous}`

const DataPreview = ({
    dataSet,
    orgUnits,
    period,
    valueType,
    dataElement,
    data,
    precision,
    name,
}) => {
    const [currentValues, setCurrentValues] = useState({})
    const valueFormat = numberPrecision(precision)
    const engine = useDataEngine()

    useEffect(() => {
        const ous = data.map(({ id }) => `orgUnit=${id}`).join('&')

        // TODO: Possible to specify dataElement.id?
        // const url = `/dataValueSets?dataSet=${dataSet.id}&period=${period}&${ouParam}`
        const query = getDataValueSetsQuery(dataSet.id, period, ous)

        apiFetch(url).then(({ dataValues = [] }) =>
            setCurrentValues(
                dataValues
                    .filter(d => d.dataElement === dataElement.id)
                    .reduce(
                        (obj, { orgUnit, value }) => ({
                            ...obj,
                            [orgUnit]: Number(value),
                        }),
                        {}
                    )
            )
        )
        // .catch(console.error); // TODO
    }, [dataSet, dataElement, period, data])

    return (
        <Table dense className={styles.table}>
            <TableHead>
                <TableRowHead>
                    <TableCellHead dense>{i18n.t('Name')}</TableCellHead>
                    <TableCellHead dense className={styles.right}>
                        {i18n.t('Current value')}
                    </TableCellHead>
                    <TableCellHead dense className={styles.right}>
                        {i18n.t('New value')}
                    </TableCellHead>
                </TableRowHead>
            </TableHead>
            <TableBody>
                {data.map(({ properties }) => {
                    const { id, name: orgUnit } = properties
                    const current = currentValues[id]
                    const propName = getPropName(valueType.id, name)
                    const value = valueFormat(properties[propName])

                    return (
                        <TableRow key={id}>
                            <TableCell dense>{orgUnit}</TableCell>
                            <TableCell dense className={styles.current}>
                                {current !== undefined ? current : ''}
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

DataPreview.propTypes = {
    period: PropTypes.string.isRequired,
    valueType: PropTypes.object.isRequired,
    dataSet: PropTypes.object.isRequired,
    dataElement: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    precision: PropTypes.number,
    name: PropTypes.string,
}

DataPreview.defaultValues = {
    precision: 1,
    name: '',
}

export default DataPreview

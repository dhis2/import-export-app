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
import { getPrecisionFn } from './Rounding'
import styles from './styles/DataPreview.module.css'

const { useField } = ReactFinalForm

const PopulationAgegroupsDataPreview = () => {
    const { input: orgUnitInput } = useField('organisationUnits')
    const { value: orgUnits } = orgUnitInput
    const { input: roundingInput } = useField('rounding')
    const { value: precision } = roundingInput
    const { input: dataElementInput } = useField('dataElement')
    const { value: dataElement } = dataElementInput
    const { input: periodInput } = useField('period')
    const { value: period } = periodInput
    const { input: aggTypeInput } = useField('aggregationType')
    const { value: aggregationType } = aggTypeInput
    const { input: m0Input } = useField('band-M_0')
    const { value: cocM0 } = m0Input
    const { input: m1Input } = useField('band-M_1')
    const { value: cocM1 } = m1Input
    const { input: m5Input } = useField('band-M_5')
    const { value: cocM5 } = m5Input
    const { input: f0Input } = useField('band-F_0')
    const { value: cocF0 } = f0Input
    const { input: f1Input } = useField('band-F_1')
    const { value: cocF1 } = f1Input
    const { input: f5Input } = useField('band-F_5')
    const { value: cocF5 } = f5Input
    // data: PropTypes.string,

    const [formattedData, setFormattedData] = useState([])
    const { baseUrl } = useConfig()

    const getValueWithPrecision = getPrecisionFn(precision)

    useEffect(() => {
        const fetchCurrVals = async (url, normalizedData) => {
            const { dataValues } = await fetchCurrentValues(url)
            const newArr = normalizedData.map((ou) => {
                const val = dataValues.find((v) => v.orgUnit === ou.ouId)

                return val ? { ...ou, current: val.value } : ou
            })

            setFormattedData(newArr)
        }

        if (eeData && orgUnits && period && dataElement) {
            const normalizedData = Object.entries(JSON.parse(data)).map(
                ([ouId, valueSet]) => {
                    //TODO handle missing name better, or does it need handling at all?
                    const ouName =
                        orgUnits.find((ou) => ou.id === ouId)?.name ||
                        'no-name OU'
                    return { ouId, ouName, value: valueSet[aggregationType] }
                }
            )

            const dataElementGroupId = 'VZ4MxIbOCXd' // Earth engine populations

            const ouQueryParams = normalizedData
                .map(({ ouId }) => `orgUnit=${ouId}`)
                .join('&')

            fetchCurrVals(
                `${baseUrl}/api/dataValueSets?dataElementGroup=${dataElementGroupId}&period=${period}&${ouQueryParams}`,
                normalizedData
            )
        }
    }, [dataElement, period, data])

    return (
        <Table dense className={styles.table}>
            <TableHead>
                <TableRowHead>
                    <TableCellHead dense>{i18n.t('Org Unit')}</TableCellHead>
                    <TableCellHead dense>
                        {i18n.t('Cat option combo')}
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
                {formattedData.map(
                    ({ ouId, ouName, catOptCombo, value, current }) => {
                        const val = getValueWithPrecision(value)

                        return (
                            <TableRow key={ouId}>
                                <TableCell dense>{ouName}</TableCell>
                                <TableCell dense>{catOptCombo}</TableCell>
                                <TableCell dense className={styles.current}>
                                    {current !== undefined ? current : ''}
                                </TableCell>
                                <TableCell dense className={styles.right}>
                                    {val}
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

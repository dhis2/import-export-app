import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableRowHead,
    TableCellHead,
} from '@dhis2/ui-core'

import { statsPropTypeObj } from '../helper'
import { testIds } from '../../../utils/testIds'
import { FormField } from '../../FormField'

const TypeCount = ({ stats }) => {
    if (stats.length == 0) return null
    return (
        <FormField
            label={`${i18n.t('Type count')}`}
            dataTest={testIds.JobSummary.typeCount}
            name="typeCount"
        >
            <Table>
                <TableHead>
                    <TableRowHead>
                        <TableCellHead>{i18n.t('Type')}</TableCellHead>
                        <TableCellHead>{i18n.t('Created')}</TableCellHead>
                        <TableCellHead>{i18n.t('Deleted')}</TableCellHead>
                        <TableCellHead>{i18n.t('Ignored')}</TableCellHead>
                        <TableCellHead>{i18n.t('Updated')}</TableCellHead>
                        <TableCellHead>{i18n.t('Total')}</TableCellHead>
                    </TableRowHead>
                </TableHead>
                <TableBody>
                    {stats.map((s, i) => (
                        <TableRow key={`${testIds.JobSummary.typeCount}-${i}`}>
                            <TableCell>{s.type}</TableCell>
                            <TableCell>{s.created}</TableCell>
                            <TableCell>{s.deleted}</TableCell>
                            <TableCell>{s.ignored}</TableCell>
                            <TableCell>{s.updated}</TableCell>
                            <TableCell>{s.total}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </FormField>
    )
}

const typeCountStatsPropTypeObj = {
    ...statsPropTypeObj,
    type: PropTypes.string.isRequired,
}

TypeCount.propTypes = {
    stats: PropTypes.arrayOf(PropTypes.shape(typeCountStatsPropTypeObj))
        .isRequired,
}

export { TypeCount, typeCountStatsPropTypeObj }

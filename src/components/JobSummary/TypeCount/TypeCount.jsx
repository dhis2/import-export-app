import i18n from '@dhis2/d2-i18n'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableRowHead,
    TableCellHead,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { FormField } from '../../index.js'
import { statsPropTypeObj } from '../helper.js'

const TypeCount = ({ stats }) => {
    if (stats.length == 0) {
        return null
    }
    return (
        <FormField
            label={`${i18n.t('Details by type')}`}
            dataTest="job-summary-type-count"
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
                        <TableRow key={`job-summary-type-count-${i}`}>
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

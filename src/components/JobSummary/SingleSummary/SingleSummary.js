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
import { FormField } from '../../index'
import { statsPropType } from '../helper'
import { SingleStatusTable } from '../SingleStatusTable/SingleStatusTable'

const SingleSummary = ({
    importType,
    importCount,
    status,
    description,
    conflicts,
    id,
}) => (
    <div>
        <FormField
            label={id ? `${i18n.t('Summary')} #${id}` : i18n.t('Summary')}
            dataTest="job-summary-single-summary"
            name="summary"
        >
            <>
                {status && (
                    <SingleStatusTable
                        description={description}
                        status={status}
                    />
                )}
                <Table>
                    <TableHead>
                        <TableRowHead>
                            <TableCellHead>{i18n.t('Created')}</TableCellHead>
                            <TableCellHead>{i18n.t('Deleted')}</TableCellHead>
                            <TableCellHead>{i18n.t('Ignored')}</TableCellHead>
                            <TableCellHead>{i18n.t('Updated')}</TableCellHead>
                            <TableCellHead>{i18n.t('Total')}</TableCellHead>
                        </TableRowHead>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{importCount.imported}</TableCell>
                            <TableCell>{importCount.deleted}</TableCell>
                            <TableCell>{importCount.ignored}</TableCell>
                            <TableCell>{importCount.updated}</TableCell>
                            <TableCell>{importCount.total}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </>
        </FormField>
        {conflicts && (
            <FormField
                label={`${i18n.t('Conflicts')}`}
                dataTest="job-summary-conflicts"
                name="conflicts"
            >
                <Table>
                    <TableHead>
                        <TableRowHead>
                            <TableCellHead>
                                {importType !== 'GEOJSON_IMPORT'
                                    ? i18n.t('Object')
                                    : i18n.t('Indexes')}
                            </TableCellHead>
                            <TableCellHead>{i18n.t('Value')}</TableCellHead>
                        </TableRowHead>
                    </TableHead>
                    <TableBody>
                        {conflicts.map((c, i) => (
                            <TableRow
                                key={`job-summary-conflicts-${c.object}-${i}`}
                            >
                                <TableCell>
                                    {importType !== 'GEOJSON_IMPORT'
                                        ? c.object
                                        : c.indexes.join(',')}
                                </TableCell>
                                <TableCell>{c.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </FormField>
        )}
    </div>
)

SingleSummary.propTypes = {
    importCount: statsPropType.isRequired,
    conflicts: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            indexes: PropTypes.arrayOf(PropTypes.number),
            object: PropTypes.string,
        })
    ),
    description: PropTypes.string,
    id: PropTypes.string,
    importType: PropTypes.string,
    status: PropTypes.string,
}

export { SingleSummary }

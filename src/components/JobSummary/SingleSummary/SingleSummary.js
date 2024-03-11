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
import { statsPropType } from '../helper.js'
import { SingleStatusTable } from '../SingleStatusTable/SingleStatusTable.js'

const SingleSummary = ({
    importType,
    importCount,
    status,
    description,
    conflicts,
    validationReport,
    id,
}) => (
    <div>
        <FormField
            label={id ? `${i18n.t('Summary')} #${id}` : i18n.t('Summary')}
            dataTest="job-summary-single-summary"
            name="summary"
        >
            <>
                {status && description && (
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
                            <TableCell>
                                {importCount?.imported ??
                                    importCount?.created ??
                                    '0'}
                            </TableCell>
                            <TableCell>{importCount?.deleted}</TableCell>
                            <TableCell>{importCount?.ignored}</TableCell>
                            <TableCell>{importCount?.updated}</TableCell>
                            <TableCell>{importCount?.total}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </>
        </FormField>
        {!!validationReport?.errorReports?.length && (
            <FormField
                label={`${i18n.t('Reports')}`}
                dataTest="tracker-summary-reports"
                name="tracker-reports"
            >
                <Table>
                    <TableHead>
                        <TableRowHead>
                            <TableCellHead>{i18n.t('UID')}</TableCellHead>
                            <TableCellHead>
                                {i18n.t('Error Code')}
                            </TableCellHead>
                            <TableCellHead>{i18n.t('Message')}</TableCellHead>
                            <TableCellHead>
                                {i18n.t('Tracker Type')}
                            </TableCellHead>
                            {/* <TableCellHead>{i18n.t('')}</TableCellHead> */}
                        </TableRowHead>
                    </TableHead>
                    <TableBody>
                        {validationReport.errorReports.map((c, i) => (
                            <TableRow
                                key={`job-summary-report-${c.object}-${i}`}
                            >
                                <TableCell>{c.uid}</TableCell>
                                <TableCell>
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        href="https://docs.dhis2.org/en/develop/using-the-api/dhis-core-version-master/tracker.html#webapi_nti_error_codes"
                                    >
                                        {c.warningCode ?? c.errorCode}
                                    </a>
                                </TableCell>
                                <TableCell>{c.message}</TableCell>
                                <TableCell>{c.trackerType}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </FormField>
        )}
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
                                        : (c.indexes || []).join(',')}
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
    validationReport: PropTypes.shape({
        errorReports: PropTypes.arrayOf(
            PropTypes.shape({
                errorCode: PropTypes.string,
                message: PropTypes.string,
                trackerType: PropTypes.string,
                uid: PropTypes.string,
            })
        ),
        warningReports: PropTypes.arrayOf(
            PropTypes.shape({
                errorCode: PropTypes.string,
                message: PropTypes.string,
                trackerType: PropTypes.string,
                uid: PropTypes.string,
            })
        ),
    }),
}

export { SingleSummary }

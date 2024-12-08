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

const SingleStatusTable = ({ status, description }) => (
    <Table>
        <TableHead>
            <TableRowHead>
                <TableCellHead>{i18n.t('Status')}</TableCellHead>
                <TableCellHead>{i18n.t('Description')}</TableCellHead>
            </TableRowHead>
        </TableHead>
        <TableBody>
            <TableRow>
                <TableCell>{status}</TableCell>
                <TableCell>{description}</TableCell>
            </TableRow>
        </TableBody>
    </Table>
)

SingleStatusTable.propTypes = {
    description: PropTypes.string,
    status: PropTypes.string,
}

export { SingleStatusTable }

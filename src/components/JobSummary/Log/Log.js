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
import { jsDateToString } from '../../../utils/helper.js'
import { FormField } from '../../index.js'

const Log = ({ events }) => {
    return (
        <FormField
            label={`${i18n.t('Log')}`}
            dataTest="job-summary-log"
            name="log"
        >
            <Table>
                <TableHead>
                    <TableRowHead>
                        <TableCellHead>{i18n.t('Time')}</TableCellHead>
                        <TableCellHead>{i18n.t('Message')}</TableCellHead>
                        <TableCellHead>{i18n.t('ID')}</TableCellHead>
                    </TableRowHead>
                </TableHead>
                <TableBody>
                    {(events || null) &&
                        events.map((e, i) => (
                            <TableRow key={`job-summary-log-${e.id}-${i}`}>
                                <TableCell>{jsDateToString(e.date)}</TableCell>
                                <TableCell>{e.text}</TableCell>
                                <TableCell>{e.id}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </FormField>
    )
}

const eventPropType = PropTypes.shape({
    date: PropTypes.instanceOf(Date).isRequired,
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
})

Log.propTypes = {
    events: PropTypes.arrayOf(eventPropType),
}

export { Log }

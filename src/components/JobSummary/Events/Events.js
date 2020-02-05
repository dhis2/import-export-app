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

import { testIds } from '../../../utils/testIds'
import { jsDateToString } from '../../../utils/helper'
import { FormField } from '../../FormField'

const Events = ({ events }) => {
    return (
        <FormField
            label={`${i18n.t('Events')}`}
            dataTest={testIds.JobSummary.events}
            name="events"
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
                    {events.map(e => (
                        <TableRow key={`${testIds.JobSummary.events}-${e.id}`}>
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

Events.propTypes = {
    events: PropTypes.arrayOf(eventPropType).isRequired,
}

export { Events }

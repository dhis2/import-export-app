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

import { FormField } from '../../FormField'

const Messages = ({ messages }) => {
    if (messages.length == 0) return null
    return (
        <FormField
            label={`${i18n.t('Messages')}`}
            dataTest="job-summary-messages"
            name="messages"
        >
            <Table>
                <TableHead>
                    <TableRowHead>
                        <TableCellHead>{i18n.t('UID')}</TableCellHead>
                        <TableCellHead>{i18n.t('Type')}</TableCellHead>
                        <TableCellHead>{i18n.t('Property')}</TableCellHead>
                        <TableCellHead>{i18n.t('Message')}</TableCellHead>
                    </TableRowHead>
                </TableHead>
                <TableBody>
                    {messages.map((m, i) => (
                        <TableRow key={`job-summary-messages-${i}`}>
                            <TableCell>{m.uid}</TableCell>
                            <TableCell>{m.type}</TableCell>
                            <TableCell>{m.property}</TableCell>
                            <TableCell>{m.message}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </FormField>
    )
}

const messagesPropType = PropTypes.arrayOf(
    PropTypes.exact({
        uid: PropTypes.string,
        type: PropTypes.string,
        property: PropTypes.string,
        message: PropTypes.string,
    })
)

Messages.propTypes = {
    messages: messagesPropType.isRequired,
}

export { Messages, messagesPropType }

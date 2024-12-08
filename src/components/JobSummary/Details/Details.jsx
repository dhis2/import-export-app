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

const valueToString = (value) => {
    if (value instanceof File) {
        return value.name
    } else if (Array.isArray(value)) {
        return value.map((v) => valueToString(v)).join(',')
    } else if (value instanceof Object) {
        return value.label
    }
    return `${value}`
}

const Details = ({ details }) => {
    return (
        <FormField
            label={`${i18n.t('Job details')}`}
            dataTest="job-summary-job-details"
            name="details"
        >
            <Table>
                <TableHead>
                    <TableRowHead>
                        <TableCellHead>{i18n.t('Key')}</TableCellHead>
                        <TableCellHead>{i18n.t('Value')}</TableCellHead>
                    </TableRowHead>
                </TableHead>
                <TableBody>
                    {Object.keys(details).map((key) => (
                        <TableRow key={`job-summary-job-details-${key}`}>
                            <TableCell>{key}</TableCell>
                            <TableCell>{valueToString(details[key])}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </FormField>
    )
}

Details.propTypes = {
    details: PropTypes.object.isRequired,
}

export { Details }

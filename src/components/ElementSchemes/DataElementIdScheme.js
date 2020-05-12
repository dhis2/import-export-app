import React from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'

import { dataElementIdSchemeOptions } from '../../utils/options'
import { SelectField } from '../'

const schemeQuery = {
    dataElements: {
        resource: 'attributes',
        params: {
            filter: ['unique:eq:true', 'dataElementAttribute:eq:true'],
            fields: ['id', 'displayName'],
            paging: 'false',
        },
    },
}

const DataElementIdScheme = ({ name, label, dataTest }) => {
    const { loading, error, data } = useDataQuery(schemeQuery)

    const validationText =
        error &&
        `${i18n.t(
            'Something went wrong when loading the additional data element ID schemes'
        )} : ${error.message}`

    const schemes = data
        ? data.dataElements.attributes.map(({ id, displayName }) => ({
              value: `ATTRIBUTE:${id}`,
              label: displayName,
          }))
        : []

    const options = [...dataElementIdSchemeOptions, ...schemes]

    return (
        <SelectField
            name={name}
            label={label}
            options={options}
            dataTest={dataTest}
            loading={loading}
            validationText={validationText}
            error={!!error}
            dense
        />
    )
}

DataElementIdScheme.propTypes = {
    dataTest: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}

export { DataElementIdScheme }

import React from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'

import { orgUnitIdSchemeOptions } from '../../utils/options'
import { SelectField } from '../'

const schemeQuery = {
    orgUnits: {
        resource: 'attributes',
        params: {
            filter: ['unique:eq:true', 'organisationUnitAttribute:eq:true'],
            fields: ['id', 'displayName'],
            paging: 'false',
        },
    },
}

const OrgUnitIdScheme = ({ name, label, dataTest }) => {
    const { loading, error, data } = useDataQuery(schemeQuery)

    const validationText =
        error &&
        `${i18n.t(
            'Something went wrong when loading the additional organisation unit ID schemes'
        )} : ${error.message}`

    const schemes = data
        ? data.orgUnits.attributes.map(({ id, displayName }) => ({
              value: `ATTRIBUTE:${id}`,
              label: displayName,
          }))
        : []

    const options = [...orgUnitIdSchemeOptions, ...schemes]

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

OrgUnitIdScheme.propTypes = {
    dataTest: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}

export { OrgUnitIdScheme }

import React from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'

import { idSchemeOptions } from '../../utils/options'
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
    dataElements: {
        resource: 'attributes',
        params: {
            filter: ['unique:eq:true', 'dataElementAttribute:eq:true'],
            fields: ['id', 'displayName'],
            paging: 'false',
        },
    },
}

const attributeFoundIn = (attribute, collection) =>
    !!collection.find(({ id }) => id === attribute.id)

const findSharedAttributes = (
    dataElementAttributes,
    organisationUnitAttributes
) =>
    dataElementAttributes
        .reduce((shared, attribute) => {
            const foundInOrgUnits = attributeFoundIn(
                attribute,
                organisationUnitAttributes
            )
            return foundInOrgUnits ? [...shared, attribute] : shared
        }, [])
        .map(({ id, displayName }) => ({
            value: `ATTRIBUTE:${id}`,
            label: displayName,
        }))

const IdScheme = ({ name, label, dataTest }) => {
    const { loading, error, data } = useDataQuery(schemeQuery)

    const validationText =
        error &&
        `${i18n.t(
            'Something went wrong when loading the additional ID schemes'
        )} : ${error.message}`

    const schemes = data
        ? findSharedAttributes(
              data.dataElements.attributes,
              data.orgUnits.attributes
          )
        : []

    const options = [...idSchemeOptions, ...schemes]

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

IdScheme.propTypes = {
    dataTest: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}

export { IdScheme }

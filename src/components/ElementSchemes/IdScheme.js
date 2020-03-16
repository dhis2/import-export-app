import React, { useState, useEffect } from 'react'
import { useConfig } from '@dhis2/app-runtime'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'

import { fetchAttributes } from '../../utils/helper'
import { idSchemeOptions } from '../../utils/options'
import { SelectField } from '../'

const attributeFoundIn = (attribute, collection) =>
    !!collection.find(({ value }) => value === attribute.value)

const IdScheme = ({ name, label, dataTest }) => {
    const { baseUrl } = useConfig()
    const [loading, setLoading] = useState(true)
    const [schemes, setSchemes] = useState([])
    const [error, setError] = useState(undefined)

    useEffect(() => {
        const f = async () => {
            let err

            const dataElementAttributes = await fetchAttributes(
                `${baseUrl}/api/`,
                'dataElementAttribute'
            ).catch(error => (err = error))
            const organisationUnitAttributes = await fetchAttributes(
                `${baseUrl}/api/`,
                'organisationUnitAttribute'
            ).catch(error => (err = error))

            setError(err)

            if (!err) {
                const sharedAttributes = dataElementAttributes.reduce(
                    (shared, attribute) => {
                        const foundInOrgUnits = attributeFoundIn(
                            attribute,
                            organisationUnitAttributes
                        )
                        return foundInOrgUnits ? [...shared, attribute] : shared
                    },
                    []
                )

                setSchemes(sharedAttributes)
            }

            setLoading(false)
        }
        f()
    }, [])

    const validationText =
        error &&
        `${i18n.t(
            'Something went wrong when loading the additional ID schemes'
        )} : ${error.message}`

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

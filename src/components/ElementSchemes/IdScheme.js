import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { SingleSelectFieldFF } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { fetchAttributes } from '../../utils/helper.js'
import { optionsPropType } from '../../utils/options.js'
import { StyledField } from '../index.js'

const attributeFoundIn = (attribute, collection) =>
    !!collection.find(({ value }) => value === attribute.value)

const IdScheme = ({ name, label, idSchemeOptions, dataTest }) => {
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
            ).catch((error) => (err = error))
            const organisationUnitAttributes = await fetchAttributes(
                `${baseUrl}/api/`,
                'organisationUnitAttribute'
            ).catch((error) => (err = error))

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
        <StyledField
            component={SingleSelectFieldFF}
            name={name}
            label={label}
            options={options}
            dataTest={dataTest}
            loading={loading}
            validationText={validationText}
            error={!!error}
        />
    )
}

IdScheme.propTypes = {
    dataTest: PropTypes.string.isRequired,
    idSchemeOptions: optionsPropType.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}

export { IdScheme }

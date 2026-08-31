import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { SingleSelectFieldFF } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { fetchAttributes } from '../../utils/helper.js'
import { StyledField } from '../index.js'

// The "(Default)" option maps to an empty value. When it is selected the
// matching `*IdScheme` URL parameter is left out entirely, so the server
// applies its own default (usually UID, occasionally CODE) for that object
// type. Picking "UID" instead sends the scheme explicitly, e.g. idScheme=UID.
const ID_SCHEME_OPTIONS = [
    { value: '', label: i18n.t('(Default)') },
    { value: 'UID', label: i18n.t('Uid') },
    { value: 'CODE', label: i18n.t('Code') },
    { value: 'NAME', label: i18n.t('Name') },
]

const hasScheme = (schemes, scheme) =>
    schemes.some(({ value }) => value === scheme.value)

// A single ID scheme dropdown. Pass `attributeTypes` (e.g.
// ['dataElementAttribute']) to also offer unique metadata attributes as
// schemes. When more than one type is given, only the attributes shared by all
// of them are offered, which mirrors how the generic `idScheme` param behaves
// server-side. Object types without an `attributeTypes` prop just get the
// static UID / CODE / NAME / (Default) options.
const IdSchemeSelect = ({ name, label, dataTest, attributeTypes = [] }) => {
    const { baseUrl } = useConfig()
    const [loading, setLoading] = useState(attributeTypes.length > 0)
    const [attributeOptions, setAttributeOptions] = useState([])
    const [error, setError] = useState(undefined)

    useEffect(() => {
        if (attributeTypes.length === 0) {
            return
        }

        const loadAttributeSchemes = async () => {
            let err

            const schemesByType = await Promise.all(
                attributeTypes.map((type) =>
                    fetchAttributes(`${baseUrl}/api/`, type).catch((error) => {
                        err = error
                        return []
                    })
                )
            )

            setError(err)

            if (!err) {
                const [baseSchemes = [], ...otherSchemes] = schemesByType
                const sharedSchemes = otherSchemes.reduce(
                    (shared, schemes) =>
                        shared.filter((attribute) =>
                            hasScheme(schemes, attribute)
                        ),
                    baseSchemes
                )
                setAttributeOptions(sharedSchemes)
            }

            setLoading(false)
        }

        loadAttributeSchemes()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const validationText =
        error &&
        `${i18n.t(
            'Something went wrong when loading the additional ID schemes'
        )} : ${error.message}`

    return (
        <StyledField
            component={SingleSelectFieldFF}
            name={name}
            label={label}
            options={[...ID_SCHEME_OPTIONS, ...attributeOptions]}
            dataTest={dataTest}
            loading={loading}
            validationText={validationText}
            error={!!error}
        />
    )
}

IdSchemeSelect.propTypes = {
    dataTest: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    attributeTypes: PropTypes.arrayOf(PropTypes.string),
}

export { IdSchemeSelect }

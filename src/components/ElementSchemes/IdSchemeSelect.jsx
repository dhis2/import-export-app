import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { SingleSelectFieldFF } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { fetchAttributes } from '../../utils/helper.js'
import { StyledField } from '../index.js'

const ID_SCHEME_OPTIONS = [
    { value: '', label: i18n.t('(Default)') },
    { value: 'UID', label: i18n.t('Uid') },
    { value: 'CODE', label: i18n.t('Code') },
    { value: 'NAME', label: i18n.t('Name') },
]

const NO_ATTRIBUTE_TYPES = []

const intersectByValue = (a, b) =>
    a.filter((item) => b.some((other) => other.value === item.value))

const IdSchemeSelect = ({
    name,
    label,
    dataTest,
    attributeTypes = NO_ATTRIBUTE_TYPES,
}) => {
    const { baseUrl } = useConfig()
    const [loading, setLoading] = useState(attributeTypes.length > 0)
    const [attributeOptions, setAttributeOptions] = useState([])
    const [error, setError] = useState(undefined)

    useEffect(() => {
        if (attributeTypes.length === 0) {
            return undefined
        }

        let cancelled = false

        const loadAttributeSchemes = async () => {
            let err

            const schemesByType = await Promise.all(
                attributeTypes.map((type) =>
                    fetchAttributes(`${baseUrl}/api/`, type).catch((e) => {
                        err = e
                        return []
                    })
                )
            )

            if (cancelled) {
                return
            }

            setError(err)
            if (!err) {
                const [first, ...rest] = schemesByType
                setAttributeOptions(
                    rest.reduce(
                        (shared, schemes) => intersectByValue(shared, schemes),
                        first
                    )
                )
            }
            setLoading(false)
        }

        loadAttributeSchemes()

        return () => {
            cancelled = true
        }
    }, [baseUrl, attributeTypes])

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

import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { SingleSelectFieldFF } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { fetchAttributes } from '../../utils/helper.js'
import { optionsPropType } from '../../utils/options.js'
import { StyledField } from '../index.js'

const CategoryOptionComboIdScheme = ({
    name,
    label,
    categoryOptionComboIdSchemeOptions,
    dataTest,
}) => {
    const { baseUrl } = useConfig()
    const [loading, setLoading] = useState(true)
    const [schemes, setSchemes] = useState([])
    const [error, setError] = useState(undefined)

    useEffect(() => {
        fetchAttributes(`${baseUrl}/api/`, 'categoryOptionComboAttribute')
            .then((attributes) => setSchemes(attributes))
            .catch((error) => setError(error))
            .finally(() => setLoading(false))
    }, [])

    const validationText =
        error &&
        `${i18n.t(
            'Something went wrong when loading the additional category option combo ID schemes'
        )} : ${error.message}`

    const options = [...categoryOptionComboIdSchemeOptions, ...schemes]
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

CategoryOptionComboIdScheme.propTypes = {
    categoryOptionComboIdSchemeOptions: optionsPropType.isRequired,
    dataTest: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}

export { CategoryOptionComboIdScheme }

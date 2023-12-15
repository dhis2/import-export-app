import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { SingleSelectFieldFF } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { fetchAttributes } from '../../utils/helper.js'
import { optionsPropType } from '../../utils/options.js'
import { StyledField } from '../index.js'

const OrgUnitIdScheme = ({ name, label, orgUnitIdSchemeOptions, dataTest }) => {
    const { baseUrl } = useConfig()
    const [loading, setLoading] = useState(true)
    const [schemes, setSchemes] = useState([])
    const [error, setError] = useState(undefined)

    useEffect(() => {
        fetchAttributes(`${baseUrl}/api/`, 'organisationUnitAttribute')
            .then((attributes) => setSchemes(attributes))
            .catch((error) => setError(error))
            .finally(() => setLoading(false))
    }, [])

    const validationText =
        error &&
        `${i18n.t(
            'Something went wrong when loading the additional organisation unit ID schemes'
        )} : ${error.message}`

    const options = [...orgUnitIdSchemeOptions, ...schemes]
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

OrgUnitIdScheme.propTypes = {
    dataTest: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    orgUnitIdSchemeOptions: optionsPropType.isRequired,
}

export { OrgUnitIdScheme }

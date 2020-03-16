import React, { useEffect, useState } from 'react'
import { useConfig } from '@dhis2/app-runtime'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'

import { fetchAttributes } from '../../utils/helper'
import { orgUnitIdSchemeOptions } from '../../utils/options'
import { SelectField } from '../'

const OrgUnitIdScheme = ({ name, label, dataTest }) => {
    const { baseUrl } = useConfig()
    const [loading, setLoading] = useState(true)
    const [schemes, setSchemes] = useState([])
    const [error, setError] = useState(undefined)

    useEffect(() => {
        fetchAttributes(`${baseUrl}/api/`, 'organisationUnitAttribute')
            .then(attributes => setSchemes(attributes))
            .catch(error => setError(error))
        setLoading(false)
    }, [])

    const validationText =
        error &&
        `${i18n.t(
            'Something went wrong when loading the additional organisation unit ID schemes'
        )} : ${error.message}`

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

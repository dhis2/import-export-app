import React, { useEffect, useState } from 'react'
import { useConfig } from '@dhis2/app-runtime'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'

import { fetchAttributes } from '../../utils/helper'
import { orgUnitIdSchemeOptions, optionPropType } from '../../utils/options'
import { Select } from '../Select'

const OrgUnitIdScheme = ({ selected, setSelected, dataTest }) => {
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
        <Select
            name="OrgUnitIdScheme"
            label={i18n.t('Organisation unit ID scheme')}
            options={options}
            selected={selected}
            setValue={setSelected}
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
    selected: optionPropType.isRequired,
    setSelected: PropTypes.func.isRequired,
}

export { OrgUnitIdScheme }

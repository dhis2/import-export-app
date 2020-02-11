import React, { useContext, useEffect, useState } from 'react'
import { useConfig } from '@dhis2/app-runtime'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'

import { fetchAttributes } from '../../utils/helper'
import { orgUnitIdSchemeOptions, optionPropType } from '../../utils/options'
import { SchemeContext } from '../../contexts/'
import { Select } from '../Select'

const OrgUnitIdScheme = ({ selected, setSelected, dataTest }) => {
    const { baseUrl } = useConfig()
    const [error, setError] = useState(undefined)
    const { OrgUnitId, updateSchema } = useContext(SchemeContext)

    useEffect(() => {
        const f = async () => {
            await fetchAttributes(
                `${baseUrl}/api/`,
                'organisationUnitAttribute'
            )
                .then(attributes =>
                    updateSchema('OrgUnitId', {
                        options: attributes,
                        loaded: true,
                        error: false,
                    })
                )
                .catch(error => setError(error))
        }
        if (!OrgUnitId.loaded) {
            f()
        }
    }, [])

    const validationText =
        error &&
        `${i18n.t(
            'Something went wrong when loading the additional organisation unit ID schemes'
        )} : ${error.message}`

    const options = [...orgUnitIdSchemeOptions, ...OrgUnitId.options]
    return (
        <Select
            name="OrgUnitIdScheme"
            label={i18n.t('Organisation unit ID scheme')}
            options={options}
            selected={selected}
            setValue={setSelected}
            dataTest={dataTest}
            loading={!OrgUnitId.loaded}
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

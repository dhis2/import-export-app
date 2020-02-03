import React, { useContext, useEffect } from 'react'
import { useConfig } from '@dhis2/app-runtime'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'

import { fetchAttributes } from '../../utils/helper'
import { orgUnitIdSchemeOptions, optionPropType } from '../../utils/options'
import { SchemeContext } from '../../contexts/'
import { Select } from '../Select'

const OrgUnitIdScheme = ({ selected, setSelected, dataTest }) => {
    const { baseUrl } = useConfig()
    const { OrgUnitId, updateSchema } = useContext(SchemeContext)

    useEffect(() => {
        const f = async () => {
            const attributes = await fetchAttributes(
                `${baseUrl}/api/`,
                'organisationUnitAttribute'
            )
            updateSchema('OrgUnitId', {
                options: attributes,
                loaded: true,
                error: false,
            })
        }
        if (!OrgUnitId.loaded) {
            f()
        }
    }, [])

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

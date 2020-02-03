import React, { useContext, useEffect } from 'react'
import { useConfig } from '@dhis2/app-runtime'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'

import { fetchAttributes } from '../../utils/helper'
import { dataElementIdSchemeOptions, optionPropType } from '../../utils/options'
import { SchemeContext } from '../../contexts/'
import { Select } from '../Select'

const DataElementIdScheme = ({ selected, setSelected, dataTest }) => {
    const { baseUrl } = useConfig()
    const { DataElementId, updateSchema } = useContext(SchemeContext)

    useEffect(() => {
        const f = async () => {
            const attributes = await fetchAttributes(
                `${baseUrl}/api/`,
                'dataElementAttribute'
            )
            updateSchema('DataElementId', {
                options: attributes,
                loaded: true,
                error: false,
            })
        }
        if (!DataElementId.loaded) {
            f()
        }
    }, [])

    const options = [...dataElementIdSchemeOptions, ...DataElementId.options]
    return (
        <Select
            name="dataElementIdScheme"
            label={i18n.t('Data element ID scheme')}
            options={options}
            selected={selected}
            setValue={setSelected}
            dataTest={dataTest}
            loading={!DataElementId.loaded}
            dense
        />
    )
}

DataElementIdScheme.propTypes = {
    dataTest: PropTypes.string.isRequired,
    selected: optionPropType.isRequired,
    setSelected: PropTypes.func.isRequired,
}

export { DataElementIdScheme }
